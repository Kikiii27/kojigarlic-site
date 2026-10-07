/* KOJI storefront runtime — no external libraries.
   Pages arrive pre-rendered in Arabic (scripts/build.mjs + js/ui.js). This file adds: the English
   re-render, live prices from Supabase, cart, checkout, restaurant trials, order tracking, and a light
   motion layer. All animation is CSS (transform/opacity); JS only toggles classes, and in the 21-day
   section sets a few custom properties while that section is on screen. */
(() => {
"use strict";
const K = window.KOJI, C = K.CONFIG, D = document, H = D.documentElement;
const $ = (s, r = D) => r.querySelector(s), $$ = (s, r = D) => [...r.querySelectorAll(s)];
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d } catch { return d } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} },
};
let lang = store.get("koji-lang", "ar"); if (lang !== "en") lang = "ar";
const U = K.UI(lang), { t, L, num, money, esc } = U;
const LI = lang === "ar" ? 1 : 2;
const PAGE = D.body.dataset.page, PID = D.body.dataset.id;
const RETAIL = Object.fromEntries(K.PRODUCTS.map(p => [p.id, p]));
const CHEF = Object.fromEntries(K.CHEF.map(p => [p.id, p]));
const param = k => new URLSearchParams(location.search).get(k);
const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============ LANGUAGE ============ */
if (lang === "en") {
  H.lang = "en"; H.dir = "ltr";
  D.body.innerHTML = U.top(PAGE) + `<main id="main">${U.main(PAGE, PID)}</main>` + U.bottom();
  D.title = U.title(PAGE, PID);
}
H.classList.remove("i18n");

/* ============ BACKEND (plain fetch to Supabase RPCs) ============ */
const STORE = { accepting_orders: true, preorder: true, whatsapp: null, delivery_fees: {} };
async function rpc(fn, args) {
  let r;
  try {
    r = await fetch(`${C.supabaseUrl}/rest/v1/rpc/${fn}`, { method: "POST", headers: { apikey: C.supabaseKey, "Content-Type": "application/json" }, body: JSON.stringify(args) });
  } catch { throw new Error("network") }
  const j = await r.json().catch(() => null);
  if (!r.ok) throw new Error(j?.message || "generic");
  return j;
}
/* prices + settings: a plain GET (no CORS preflight, one round trip), remembered for 3 minutes in this tab
   so moving between pages doesn't refetch. Orders are re-priced on the server anyway. */
const SF_KEY = "koji-sf", SF_TTL = 180e3;
function useStore(d) {
  (d.products || []).forEach(p => { const x = RETAIL[p.id] || CHEF[p.id]; if (x) { x.price = p.price; x.available = p.available; x.live = true } });
  Object.values(RETAIL).forEach(p => { if (!p.live) p.available = false });
  Object.assign(STORE, d.settings || {});
  applyStore();
}
async function loadStore() {
  try { const c = JSON.parse(sessionStorage.getItem(SF_KEY)); if (c && Date.now() - c.at < SF_TTL) { useStore(c.d); return } } catch {}
  try {
    const r = await fetch(`${C.supabaseUrl}/rest/v1/rpc/get_storefront?apikey=${encodeURIComponent(C.supabaseKey)}`);
    if (!r.ok) return;
    const d = await r.json();
    try { sessionStorage.setItem(SF_KEY, JSON.stringify({ at: Date.now(), d })) } catch {}
    useStore(d);
  } catch { /* offline: fallback prices stay; checkout reports the error */ }
}
function applyStore() {
  $$("[data-price]").forEach(el => { const p = RETAIL[el.dataset.price] || CHEF[el.dataset.price]; if (p) el.textContent = money(p.price) });
  $$(".prod[data-id], .pc[data-id]").forEach(el => {
    const p = RETAIL[el.dataset.id], out = p && p.available === false;
    el.classList.toggle("sold", out);
    $$("[data-add]", el).forEach(b => { b.disabled = out; b.textContent = out ? t("soldout") : t("add") });
  });
  /* orders paused from the dashboard: the shop stays browsable, buttons say "coming soon" */
  if (!STORE.accepting_orders) {
    $("[data-add]").forEach(b => { if (b.disabled) return; b.disabled = true; b.textContent = t("soon") });
    const s0 = $("#bar span"); if (s0) s0.textContent = t("bar.closed");
  }
  const wa = $("#waLink"); if (wa && STORE.whatsapp) { wa.href = `https://wa.me/${String(STORE.whatsapp).replace(/\D/g, "")}`; wa.hidden = false }
  renderCart();
}

/* ============ CART ============ */
let cart = store.get("koji-cart", {}); for (const id in cart) if (!RETAIL[id]) delete cart[id];
const items = () => Object.entries(cart).filter(([id, q]) => RETAIL[id] && q > 0).map(([id, q]) => ({ ...RETAIL[id], q }));
const count = () => items().reduce((s, i) => s + i.q, 0), total = () => items().reduce((s, i) => s + i.q * i.price, 0);
function save() { store.set("koji-cart", cart); renderCart() }
let pdpQty = 1;
function add(id, btn, q = 1) {
  const p = RETAIL[id]; if (!p || p.available === false || !STORE.accepting_orders) return;
  cart[id] = Math.min(50, (cart[id] || 0) + q); save();
  if (btn && !btn.classList.contains("btn")) { btn.textContent = t("added"); btn.classList.add("ok"); setTimeout(() => { btn.textContent = t("add"); btn.classList.remove("ok") }, 1400) }
  const cc = $("#cartCount"); cc.classList.remove("bump"); void cc.offsetWidth; cc.classList.add("bump");
  toast(`${L(p).n} — ${t("toast.add")}`);
}
function renderCart() {
  const n = count(), cc = $("#cartCount"); cc.textContent = num(n); cc.classList.toggle("zero", n === 0);
  const it = items();
  if (!it.length) { $("#cartBd").innerHTML = `<div class="empty"><h4>${t("cart.empty")}</h4><p>${t("cart.emptyp")}</p><a class="btn btn-dark" href="${U.purl(RETAIL["cloves-100"])}">${L(RETAIL["cloves-100"]).n}</a></div>`; $("#cartFt").innerHTML = ""; return }
  const blocked = it.some(i => i.available === false);
  const up = STORE.accepting_orders && K.PRODUCTS.find(p => !cart[p.id] && p.available !== false);
  $("#cartBd").innerHTML = it.map(i => { const c = L(i); return `<div class="li ${i.available === false ? "sold" : ""}"><img src="${U.sm(i.img)}" alt="" style="background:${i.bg}" width="72" height="90">
    <div><h4>${esc(c.n)}</h4><span class="s">${i.available === false ? t("soldout") : esc(c.s)}</span><div><span class="qty"><button data-dec="${i.id}" aria-label="−">−</button><span>${num(i.q)}</span><button data-inc="${i.id}" aria-label="+">+</button></span></div></div>
    <div><div class="p">${money(i.q * i.price)}</div><button class="rm" data-rm="${i.id}">${t("cart.rm")}</button></div></div>` }).join("")
    + (up ? `<div class="up"><span class="small">${t("cart.up")}</span><div class="up-i"><img src="${U.sm(up.img)}" alt="" style="background:${up.bg}" width="56" height="70"><div><b>${esc(L(up).n)}</b><span>${money(up.price)}</span></div><button class="pc-add" data-add="${up.id}">${t("add")}</button></div></div>` : "");
  $("#cartFt").innerHTML = `<div class="sum"><span>${t("cart.items")}</span><span>${money(total())}</span></div>
    <div class="sum"><span>${t("cart.ship")}</span><span>${t("cart.shipv")}</span></div>
    <div class="sum t"><span>${t("cart.total")}</span><span>${money(total())}</span></div>
    ${STORE.accepting_orders ? "" : `<p class="warn">${t("cart.closed")}</p>`}${blocked ? `<p class="warn">${t("err.bad_product")}</p>` : ""}
    <button class="btn btn-dark btn-lg" id="checkout" ${STORE.accepting_orders && !blocked ? "" : "disabled"}>${t("cart.co")} ${U.arrow}</button>
    <p class="dr-note">${t("cart.note")}</p>`;
}
function toast(m) { const e = $("#toast"); e.textContent = m; e.classList.add("on"); clearTimeout(e._t); e._t = setTimeout(() => e.classList.remove("on"), 2400) }

/* ============ DRAWER / MODAL ============ */
let lastFocus = null;
const lock = on => { D.body.style.overflow = on ? "hidden" : "" };
const show = (el, on) => { el.classList.toggle("on", on); el.setAttribute("aria-hidden", !on); el.inert = !on };
const openDrawer = () => { lastFocus = D.activeElement; show($("#drawer"), true); $("#scrim").classList.add("on"); lock(true); $("#drawer .x").focus() };
const closeDrawer = () => { show($("#drawer"), false); if (!$("#modal").classList.contains("on")) { $("#scrim").classList.remove("on"); lock(false) } };
function openModal(html) { lastFocus = lastFocus || D.activeElement; $("#mbox").innerHTML = `<button class="x" data-close aria-label="${lang === "ar" ? "اقفل" : "Close"}">×</button>${html}`; show($("#modal"), true); $("#scrim").classList.add("on"); lock(true); $("#mbox").scrollTop = 0; $("#mbox .x").focus() }
function closeModal() { show($("#modal"), false); if (!$("#drawer").classList.contains("on")) { $("#scrim").classList.remove("on"); lock(false) } lastFocus?.focus?.(); lastFocus = null }

/* ============ CHECKOUT & TRIAL ============ */
const opts = (rows, sel) => rows.map(r => `<option value="${r[0]}" ${r[0] === sel ? "selected" : ""}>${r[LI]}</option>`).join("");
function openCheckout() {
  if (!items().length) { openDrawer(); return }
  const sv = store.get("koji-customer", {});
  const payOpt = (v, k, d) => `<label><input type="radio" name="pay" value="${v}" ${v === (sv.pay || "cod") ? "checked" : ""}><span>${t(k)}<small>${d}</small></span></label>`;
  openModal(`<div class="co">
   <p class="kick">${t("co.k")}</p><h3>${t("co.h")}</h3><p>${STORE.preorder ? t("co.p") : t("co.pnp")}</p>
   <form id="coForm" novalidate>
    <div class="fld"><label for="f1">${t("co.name")}</label><input id="f1" name="name" autocomplete="name" required maxlength="80" value="${esc(sv.name)}"><span class="err"></span></div>
    <div class="fld"><label for="f2">${t("co.phone")}</label><input id="f2" name="phone" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" placeholder="01xxxxxxxxx" required value="${esc(sv.phone)}"><span class="err"></span></div>
    <div class="fld"><label for="f3">${t("co.city")}</label><select id="f3" name="city">${opts(K.CITIES, sv.city || "cairo")}</select></div>
    <div class="fld"><label for="f4">${t("co.area")}</label><input id="f4" name="area" required maxlength="80" value="${esc(sv.area)}"><span class="err"></span></div>
    <div class="fld full"><label for="f5">${t("co.addr")}</label><input id="f5" name="address" autocomplete="street-address" required maxlength="300" placeholder="${t("co.addrph")}" value="${esc(sv.address)}"><span class="err"></span></div>
    <div class="fld full"><span class="lbl">${t("co.pay")}</span><div class="pay">${payOpt("cod", "co.cod", t("co.codd"))}${payOpt("instapay", "co.insta", t("co.instad"))}${payOpt("vfcash", "co.vf", t("co.vfd"))}</div></div>
    <div class="co-sum">${items().map(i => `<div class="sum"><span>${esc(L(i).n)} × ${num(i.q)}</span><span>${money(i.q * i.price)}</span></div>`).join("")}
      <div class="sum"><span>${t("co.fee")}</span><span id="coFee">${t("cart.shipv")}</span></div>
      <div class="sum t" style="margin-bottom:0"><span>${t("co.sum")}</span><span>${money(total())}</span></div></div>
    <div class="fld full"><label for="f6">${t("co.notes")}</label><textarea id="f6" name="notes" rows="2" maxlength="500"></textarea></div>
    <p class="form-err" id="coErr" role="alert"></p>
    <div class="fld full"><button class="btn btn-dark btn-lg" type="submit" style="width:100%">${t("co.submit")}</button>
      <span class="consent">${t("co.consent")} <a class="u" href="terms.html" target="_blank">${t("co.terms")}</a> ${t("co.and")} <a class="u" href="privacy.html" target="_blank">${t("co.privacy")}</a>.</span></div>
   </form></div>`);
  const f = $("#coForm");
  const showFee = () => { const v = STORE.delivery_fees?.[f.city.value]; $("#coFee").textContent = v != null && v !== "" ? money(v) : t("cart.shipv") };
  f.city.addEventListener("change", showFee); showFee();
  f.addEventListener("submit", e => { e.preventDefault(); submitOrder(f) });
}
async function submitOrder(f) {
  if (!valid(f)) return;
  const btn = $("button[type=submit]", f), err = $("#coErr"); err.textContent = "";
  btn.disabled = true; btn.textContent = t("co.sending");
  const d = Object.fromEntries(new FormData(f));
  try {
    const r = await rpc("place_order", { p: { ...d, lang, items: items().map(i => ({ id: i.id, qty: i.q })) } });
    store.set("koji-customer", { name: d.name, phone: d.phone, city: d.city, area: d.area, address: d.address, pay: d.pay });
    cart = {}; save();
    openModal(`<div class="done"><span class="done-ic">✓</span><p class="kick">${t("done.code")}</p><h3>${esc(r.code)}</h3>
      <p>${t("done.p")} <b dir="ltr">${esc(d.phone)}</b> ${t("done.p2")}</p>
      <div class="done-btns"><a class="btn btn-dark" href="track.html?code=${encodeURIComponent(r.code)}">${t("done.track")}</a><a class="btn btn-out" href="shop.html">${t("done.more")}</a></div></div>`);
  } catch (e) { err.textContent = K.T[lang]["err." + e.message] || t("err.generic"); btn.disabled = false; btn.textContent = t("co.submit") }
}
function openTrial(product = "") {
  const sv = store.get("koji-customer", {});
  openModal(`<div class="co">
   <p class="kick">${t("co.tk")}</p><h3>${t("co.th")}</h3><p>${t("co.tp")}</p>
   <form id="trForm" novalidate>
    <div class="fld"><label for="g1">${t("co.name")}</label><input id="g1" name="name" autocomplete="name" required maxlength="80" value="${esc(sv.name)}"><span class="err"></span></div>
    <div class="fld"><label for="g2">${t("co.phone")}</label><input id="g2" name="phone" type="tel" inputmode="tel" dir="ltr" placeholder="01xxxxxxxxx" required value="${esc(sv.phone)}"><span class="err"></span></div>
    <div class="fld"><label for="g3">${t("co.venue")}</label><input id="g3" name="venue" required maxlength="120"><span class="err"></span></div>
    <div class="fld"><label for="g4">${t("co.role")}</label><select id="g4" name="role">${t("roles").map(r => `<option>${r}</option>`).join("")}</select></div>
    <div class="fld"><label for="g5">${t("co.product")}</label><select id="g5" name="product"><option value="">${t("co.anyproduct")}</option>${K.CHEF.map(p => `<option value="${p.id}" ${p.id === product ? "selected" : ""}>${L(p).n} · ${L(p).s}</option>`).join("")}</select></div>
    <div class="fld"><label for="g6">${t("co.kg")}</label><select id="g6" name="kg_month">${opts(K.KG, "unknown")}</select></div>
    <div class="fld full"><label for="g7">${t("co.dish")}</label><input id="g7" name="dish" maxlength="200"></div>
    <div class="fld full"><label for="g8">${t("co.notes")}</label><textarea id="g8" name="notes" rows="2" maxlength="500"></textarea></div>
    <p class="form-err" id="trErr" role="alert"></p>
    <div class="fld full"><button class="btn btn-dark btn-lg" type="submit" style="width:100%">${t("co.tsubmit")}</button>
      <span class="consent">${t("co.consent")} <a class="u" href="privacy.html" target="_blank">${t("co.privacy")}</a>.</span></div>
   </form></div>`);
  $("#trForm").addEventListener("submit", async e => {
    e.preventDefault(); const f = e.currentTarget; if (!valid(f)) return;
    const btn = $("button[type=submit]", f); btn.disabled = true; btn.textContent = t("co.sending");
    try {
      const r = await rpc("request_trial", { p: { ...Object.fromEntries(new FormData(f)), lang } });
      openModal(`<div class="done"><span class="done-ic">✓</span><p class="kick">${t("done.code")}</p><h3>${esc(r.code)}</h3><p>${t("done.tp")}</p><button class="btn btn-dark" data-close>${t("done.ok")}</button></div>`);
    } catch (er) { $("#trErr").textContent = K.T[lang]["err." + er.message] || t("err.generic"); btn.disabled = false; btn.textContent = t("co.tsubmit") }
  });
}
function valid(form) {
  let ok = true;
  form.querySelectorAll("[required]").forEach(el => {
    const err = el.parentElement.querySelector(".err"); let m = ""; const v = el.value.trim();
    if (!v) m = t("co.req");
    else if (el.type === "tel") { const d = v.replace(/[٠-٩]/g, x => "٠١٢٣٤٥٦٧٨٩".indexOf(x)).replace(/[\s-]/g, ""); if (!/^(\+?20|0020|0)?1[0125]\d{8}$/.test(d)) m = t("co.badphone") }
    if (err) err.textContent = m; el.setAttribute("aria-invalid", !!m); if (m && ok) { el.focus(); ok = false }
  }); return ok;
}

/* ============ TRACKING ============ */
const FLOW = ["new", "confirmed", "out_for_delivery", "delivered"];
function initTrack() {
  const f = $("#trackForm"); if (!f) return;
  f.code.value = param("code") || ""; f.phone.value = store.get("koji-customer", {}).phone || "";
  f.addEventListener("submit", async e => {
    e.preventDefault(); if (!valid(f)) return;
    const btn = $("button[type=submit]", f); btn.disabled = true;
    try { const o = await rpc("track_order", { p_code: f.code.value, p_phone: f.phone.value }); $("#trackOut").innerHTML = o ? trackHtml(o) : `<p class="track-nf">${t("track.nf")}</p>` }
    catch (err) { $("#trackOut").innerHTML = `<p class="track-nf">${K.T[lang]["err." + err.message] || t("err.generic")}</p>` }
    btn.disabled = false;
  });
  if (f.code.value && f.phone.value) f.requestSubmit();
}
function trackHtml(o) {
  const si = FLOW.indexOf(o.status), S = s => K.STATUS[s][lang === "ar" ? 0 : 1];
  const d = new Date(o.created_at).toLocaleString(lang === "ar" ? "ar-EG" : "en-GB", { dateStyle: "medium", timeStyle: "short" });
  return `<div class="track-card">
    <div class="track-top"><div><span class="small">${t("track.code")}</span><h2>${esc(o.code)}</h2></div><span class="small">${t("track.placed")} · ${d}</span></div>
    ${o.status === "cancelled" ? `<p class="track-x">${S("cancelled")}</p>` : `<ol class="track-steps">${FLOW.map((s, i) => `<li class="${i <= si ? "done" : ""} ${i === si ? "now" : ""}"><i></i><span>${S(s)}</span></li>`).join("")}</ol>`}
    <div class="track-items">${(o.items || []).map(i => `<div class="sum"><span>${esc(lang === "ar" ? i.name_ar : i.name_en)} × ${num(i.qty)}</span><span>${money(i.qty * i.price)}</span></div>`).join("")}
      <div class="sum"><span>${t("track.fee")}</span><span>${o.delivery_fee == null ? t("track.feetbd") : money(o.delivery_fee)}</span></div>
      <div class="sum t"><span>${t("track.total")}</span><span>${money(o.total)}</span></div>
      ${o.pay_to ? `<p>${t("track.payto")}: <b dir="ltr">${esc(o.pay_to)}</b></p>` : ""}</div></div>`;
}

/* ============ FILTERS (shop + recipes): hide cards, keep the DOM ============ */
function filter(groupSel, itemSel, f) {
  $$(`${groupSel} button`).forEach(b => b.setAttribute("aria-pressed", b.dataset.f === f));
  $$(itemSel).forEach(el => { el.hidden = f !== "all" && !el.dataset.cat.split(" ").includes(f) });
  const u = new URL(location.href); f === "all" ? u.searchParams.delete("f") : u.searchParams.set("f", f); history.replaceState(null, "", u);
}

/* ============ MOTION ============ */
/* split headings into words so CSS can raise them one by one (spaces and <br>/<i> are kept) */
function split(el) {
  let i = 0;
  const walk = node => [...node.childNodes].forEach(n => {
    if (n.nodeType === 3) {
      const frag = D.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(s => {
        if (!s) return;
        if (/^\s+$/.test(s)) { frag.append(s); return }
        const w = D.createElement("span"), inner = D.createElement("span");
        w.className = "w"; inner.textContent = s; inner.style.setProperty("--i", i++); w.append(inner); frag.append(w);
      });
      n.replaceWith(frag);
    } else if (n.nodeType === 1 && n.tagName !== "BR") walk(n);
  });
  walk(el); el.classList.add("split");
}
function countUp(el) {
  const to = +el.dataset.count; if (!to || RM) return;
  const t0 = performance.now(), dur = 1400;
  const step = now => { const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(to * e); if (k < 1) requestAnimationFrame(step) };
  el.textContent = 0; requestAnimationFrame(step);
}
/* one IntersectionObserver for every reveal; elements entering together get a small stagger */
let io = null;
function reveal() {
  const els = $$(".rv:not(.in), .rv-img:not(.in), [data-split]:not(.in), .facts:not(.in)").filter(el => !el.closest(".hero"));
  if (RM || !("IntersectionObserver" in window)) { els.forEach(el => el.classList.add("in")); return }
  io = io || new IntersectionObserver(es => { let n = 0; es.forEach(e => { if (!e.isIntersecting) return; const el = e.target; el.style.setProperty("--d", `${Math.min(n++, 6) * 90}ms`); el.classList.add("in"); io.unobserve(el) }) }, { rootMargin: "0px 0px -8% 0px" });
  /* whatever is already on screen at load animates in right away, without waiting for the observer.
     Sections are measured first, so content in off-screen (content-visibility) sections is never laid out early. */
  const vh = innerHeight * .92, near = new Map(); let n = 0;
  const inView = el => { const r = el.getBoundingClientRect(); return r.top < vh && r.bottom > 0 };
  const now = els.filter(el => { const s = el.closest("section") || el; if (!near.has(s)) near.set(s, inView(s)); return near.get(s) && inView(el) });
  now.forEach(el => el.style.setProperty("--d", `${Math.min(n++, 6) * 90}ms`));
  setTimeout(() => now.forEach(el => el.classList.add("in")), 40);
  els.filter(el => !now.includes(el)).forEach(el => io.observe(el));
}
function hero() {
  const h = $(".hero"); if (!h) return;
  setTimeout(() => { h.classList.add("in"); $$("[data-split]", h).forEach(x => x.classList.add("in")) }, 60);
  setTimeout(() => $$("[data-count]", h).forEach(countUp), RM ? 0 : 900);
}
/* top bar: rotate the three short messages */
/* the marquee only animates while it is on screen */
function marquee() {
  const m = $(".mq"); if (!m || RM) return;
  new IntersectionObserver(([e]) => m.classList.toggle("off", !e.isIntersecting)).observe(m);
}
function bar() {
  const s = $$("#bar span"); if (s.length < 2 || RM) return;
  let i = 0; setInterval(() => { if (D.hidden) return; s[i].classList.remove("on"); i = (i + 1) % s.length; s[i].classList.add("on") }, 4200);
}
/* header: solid after the hero, hides while scrolling down, returns on the way up */
function header() {
  const hd = $("#hd"), hr = $(".hero"); let lastY = scrollY, tick = false;
  const upd = () => {
    tick = false; const y = scrollY;
    hd.classList.toggle("solid", y > (hd.classList.contains("over") && hr ? hr.offsetHeight - hd.offsetHeight - 40 : 8));
    if (!H.classList.contains("menu-open")) {
      if (y > 400 && y > lastY + 6) hd.classList.add("hide");
      else if (y < lastY - 6 || y < 400) hd.classList.remove("hide");
    }
    lastY = y;
  };
  addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(upd) } }, { passive: true });
  hd.addEventListener("focusin", () => hd.classList.remove("hide"));
  upd();
}
/* 21 days: the page itself darkens from fresh garlic to black garlic while the section scrolls by */
function ageStory() {
  const sec = $("#age"); if (!sec || RM) return;
  sec.classList.add("live");
  const day = $("#ageDay"), st = $$(".age-st li", sec);
  const BG = [[244, 239, 230], [236, 222, 196], [120, 84, 58], [23, 17, 14]];
  const BULB = [[246, 240, 228], [222, 184, 128], [96, 60, 38], [26, 18, 14]];
  const LINE = [[58, 51, 46], [92, 66, 40], [230, 207, 164], [230, 207, 164]];
  const mix = (S, p) => { const x = p * (S.length - 1), i = Math.min(S.length - 2, Math.floor(x)), f = x - i; return S[i].map((v, k) => Math.round(v + (S[i + 1][k] - v) * f)) };
  let raf = 0, lastD = -1, lastS = -1, lastDark = null;
  const frame = () => {
    raf = 0;
    const r = sec.getBoundingClientRect(), span = r.height - innerHeight;
    const p = Math.min(1, Math.max(0, -r.top / span));
    const bg = mix(BG, p);
    sec.style.setProperty("--p", p.toFixed(4));
    sec.style.setProperty("--bg", `rgb(${bg})`);
    sec.style.setProperty("--bulb", `rgb(${mix(BULB, p)})`);
    sec.style.setProperty("--line", `rgb(${mix(LINE, p)})`);
    const d = Math.round(p * 21); if (d !== lastD) { day.textContent = String(d).padStart(2, "0"); lastD = d }
    const s = Math.min(3, Math.round(p * 3)); if (s !== lastS) { st.forEach((li, i) => li.classList.toggle("on", i === s)); lastS = s }
    const dark = (0.2126 * bg[0] + 0.7152 * bg[1] + 0.0722 * bg[2]) < 140; if (dark !== lastDark) { sec.classList.toggle("dark-on", dark); lastDark = dark }
  };
  const req = () => { if (!raf) raf = requestAnimationFrame(frame) };
  new IntersectionObserver(([e]) => { if (e.isIntersecting) { addEventListener("scroll", req, { passive: true }); req() } else removeEventListener("scroll", req) }).observe(sec);
  addEventListener("resize", req, { passive: true });
  frame();
}
/* product page: sticky buy bar on phones once the main button has scrolled away */
function stickyBuy() {
  const b = $("#buy"), s = $("#sbar"); if (!b || !s) return;
  new IntersectionObserver(([e]) => { const on = !e.isIntersecting && e.boundingClientRect.top < 0; s.classList.toggle("on", on); s.setAttribute("aria-hidden", !on); $("button", s).tabIndex = on ? 0 : -1 }).observe(b);
}
/* view transitions: the tapped product photo morphs into the product page's main photo */
function vtNames() {
  D.addEventListener("click", e => {
    const a = e.target.closest("a.pc-img"); if (!a) return;
    $$("img[style*='view-transition-name']").forEach(x => x.style.viewTransitionName = "none");
    const img = $("img", a); if (img) img.style.viewTransitionName = "pimg";
  }, true);
  addEventListener("pageshow", e => { if (e.persisted) $$("a.pc-img img").forEach(x => x.style.viewTransitionName = "") });
}

/* ============ EVENTS ============ */
function bind() {
  D.addEventListener("click", e => {
    const el = e.target.closest("[data-add],[data-inc],[data-dec],[data-rm],[data-close],[data-q],[data-trial],[data-gal],#checkout,#cartOpen,.trialBtn,#langBtn,#burger,#filters button,#rfilters button,#mnav a");
    if (!el) return;
    if (el.dataset.add) add(el.dataset.add, el, el.hasAttribute("data-addq") ? pdpQty : 1);
    else if (el.dataset.q) { pdpQty = Math.min(50, Math.max(1, pdpQty + +el.dataset.q)); $("#pq").textContent = num(pdpQty) }
    else if (el.dataset.inc) { cart[el.dataset.inc] = Math.min(50, cart[el.dataset.inc] + 1); save() }
    else if (el.dataset.dec) { if (--cart[el.dataset.dec] <= 0) delete cart[el.dataset.dec]; save() }
    else if (el.dataset.rm) { delete cart[el.dataset.rm]; save() }
    else if (el.dataset.trial !== undefined) openTrial(el.dataset.trial);
    else if (el.dataset.gal) {
      const img = $(".gal-img"), g = el.dataset.gal; img.src = g; img.srcset = U.set(g, 1136); img.previousElementSibling.srcset = U.set(g, 1136, "avif");
      $$("[data-gal]").forEach(b => b.setAttribute("aria-pressed", b === el));
    }
    else if (el.id === "cartOpen") openDrawer();
    else if (el.id === "checkout") { closeDrawer(); openCheckout() }
    else if (el.classList.contains("trialBtn")) openTrial();
    else if (el.id === "langBtn") { store.set("koji-lang", lang === "ar" ? "en" : "ar"); location.reload() }
    else if (el.id === "burger") { const o = H.classList.toggle("menu-open"); el.setAttribute("aria-expanded", o); lock(o) }
    else if (el.closest("#mnav")) { H.classList.remove("menu-open"); lock(false) }
    else if (el.closest("#filters")) filter("#filters", "#grid .pc", el.dataset.f);
    else if (el.closest("#rfilters")) filter("#rfilters", "#rcards .rc", el.dataset.f);
    else if (el.hasAttribute("data-close")) { closeDrawer(); closeModal() }
  });
  $("#scrim").addEventListener("click", () => { closeDrawer(); closeModal() });
  $("#modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal() });
  D.addEventListener("keydown", e => { if (e.key === "Escape") { closeDrawer(); closeModal(); H.classList.remove("menu-open"); $("#burger").setAttribute("aria-expanded", false); lock(false) } });
}

/* ============ BOOT ============ */
renderCart(); bind();
if (!RM) $$("[data-split]").forEach(split);
header(); stickyBuy(); vtNames(); initTrack();
/* entrance motion waits until the page is actually shown (it may have been prerendered on hover) */
const motion = () => { hero(); reveal(); bar(); marquee(); ageStory() };
/* a prerendered or back-button (bfcache) page may hold an old bag: re-read it when shown */
const syncCart = () => { cart = store.get("koji-cart", {}); renderCart() };
addEventListener("pageshow", e => { if (e.persisted) syncCart() });
if (D.prerendering) D.addEventListener("prerenderingchange", () => { syncCart(); motion() }, { once: true }); else motion();
const f0 = param("f");
if (["kitchen", "gift", "daily"].includes(f0) && $("#filters")) filter("#filters", "#grid .pc", f0);
if (["breakfast", "main", "sauce"].includes(f0) && $("#rfilters")) filter("#rfilters", "#rcards .rc", f0);
loadStore();
window.KOJI_READY = true;
})();
