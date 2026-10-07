/* KOJI dashboard — orders, restaurant requests, products, settings, team (Supabase + RLS) */
(() => {
const K = window.KOJI, C = K.CONFIG;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const egp = n => n == null ? "—" : `${Number(n).toLocaleString("en-US")} ج`;
const when = d => new Date(d).toLocaleString("ar-EG", { dateStyle: "medium", timeStyle: "short" });
const ago = d => { const m = Math.round((Date.now() - new Date(d)) / 60000); return m < 1 ? "دلوقتي" : m < 60 ? `من ${m} دقيقة` : m < 1440 ? `من ${Math.round(m / 60)} ساعة` : `من ${Math.round(m / 1440)} يوم` };
const sb = window.supabase.createClient(C.supabaseUrl, C.supabaseKey, { auth: { persistSession: true, storageKey: "koji-admin" } });
const app = $("#app");

const CITY = Object.fromEntries(K.CITIES.map(c => [c[0], c[1]]));
const PAY = { cod: "كاش عند الاستلام", instapay: "إنستاباي", vfcash: "فودافون كاش" };
const OST = { new: "جديد", confirmed: "اتأكد", out_for_delivery: "خرج للتوصيل", delivered: "اتسلّم", cancelled: "اتلغى" };
const RST = { new: "جديد", contacted: "اتكلمنا", trial_sent: "العينة اتبعتت", won: "بقى عميل", lost: "مش مهتم" };
const KG = Object.fromEntries(K.KG.map(k => [k[0], k[1]]));
const KGMID = { lt_half: .25, half_1: .75, "1_3": 2, gt_3: 4 };          // bucket midpoints (kg/month) for the fs_rate estimate
const PNAME = Object.fromEntries([...K.PRODUCTS, ...K.CHEF].map(p => [p.id, p.ar.n + " · " + p.ar.s]));

const S = { user: null, tab: "orders", orders: [], reqs: [], products: [], settings: null, admins: [], of: "all", rf: "all", q: "", sel: null, fresh: new Set(), live: false };

function toast(m) { let t = $(".toast"); if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t) } t.textContent = m; t.classList.add("on"); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("on"), 2400) }
const wa = (phone, text) => `https://wa.me/2${phone}?text=${encodeURIComponent(text || "")}`;

/* ============ AUTH ============ */
function renderAuth(mode = "in", msg = "") {
  app.innerHTML = `<div class="auth"><div class="auth-box">
    <h1>KOJI</h1><p class="sub">لوحة تحكم الفريق</p>
    <div class="tabs2"><button data-mode="in" class="${mode === "in" ? "on" : ""}">دخول</button><button data-mode="first" class="${mode === "first" ? "on" : ""}">أول مرة؟ اعمل باسورد</button></div>
    <form id="authF">
      <div class="f"><label for="ae">الإيميل</label><input id="ae" name="email" type="email" autocomplete="username" required dir="ltr"></div>
      <div class="f"><label for="ap">الباسورد</label><input id="ap" name="password" type="password" autocomplete="${mode === "in" ? "current-password" : "new-password"}" required minlength="${mode === "in" ? 1 : 10}" dir="ltr"></div>
      ${mode === "first" ? `<div class="f"><label for="ap2">الباسورد تاني</label><input id="ap2" name="password2" type="password" autocomplete="new-password" required dir="ltr"><span class="hint">١٠ حروف على الأقل. الإيميل لازم يكون متضاف للفريق من أدمن.</span></div>` : ""}
      <p class="msg ${msg ? "err" : ""}" id="am">${esc(msg)}</p>
      <button class="b wide" type="submit">${mode === "in" ? "ادخل" : "اعمل الحساب وادخل"}</button>
    </form></div></div>`;
  $$("[data-mode]").forEach(b => b.onclick = () => renderAuth(b.dataset.mode));
  $("#authF").onsubmit = async e => {
    e.preventDefault(); const f = e.target, m = $("#am"), btn = $("button[type=submit]", f);
    const email = f.email.value.trim().toLowerCase(), password = f.password.value;
    m.className = "msg"; m.textContent = ""; btn.disabled = true;
    try {
      if (mode === "first") {
        if (password !== f.password2.value) throw new Error("الباسوردين مش زي بعض.");
        const r = await fetch(`${C.supabaseUrl}/functions/v1/admin-signup`, { method: "POST", headers: { "Content-Type": "application/json", apikey: C.supabaseKey }, body: JSON.stringify({ email, password }) });
        const j = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error({ not_invited: "الإيميل ده مش متضاف للفريق. اطلب من أدمن يضيفه من تبويب «الفريق».", exists: "الإيميل ده عنده حساب بالفعل. ادخل بالباسورد من «دخول».", weak_password: "الباسورد لازم يكون ١٠ حروف على الأقل.", bad_email: "الإيميل مش صحيح." }[j.error] || "حصلت مشكلة. جرّب تاني.");
      }
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) throw new Error(/invalid/i.test(error.message) ? "الإيميل أو الباسورد غلط." : error.message);
      await enter();
    } catch (err) { m.className = "msg err"; m.textContent = err.message; btn.disabled = false }
  };
}

async function enter() {
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return renderAuth();
  S.user = user;
  const { data: ok } = await sb.rpc("is_admin");
  if (!ok) { await sb.auth.signOut(); return renderAuth("in", "الحساب ده مش من الفريق.") }
  await loadAll(); shell(); subscribe();
}

/* ============ DATA ============ */
async function loadAll() {
  const [o, r, p, s, a] = await Promise.all([
    sb.from("orders").select("*").order("created_at", { ascending: false }).limit(1000),
    sb.from("chef_requests").select("*").order("created_at", { ascending: false }).limit(1000),
    sb.from("products").select("*").order("sort"),
    sb.from("settings").select("*").eq("id", 1).single(),
    sb.from("admins").select("*").order("added_at"),
  ]);
  S.orders = o.data || []; S.reqs = r.data || []; S.products = p.data || []; S.settings = s.data; S.admins = a.data || [];
}
function subscribe() {
  sb.channel("koji-dash")
    .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, ev => upsert(S.orders, ev, "طلب جديد"))
    .on("postgres_changes", { event: "*", schema: "public", table: "chef_requests" }, ev => upsert(S.reqs, ev, "طلب عينة مطعم جديد"))
    .subscribe(st => { S.live = st === "SUBSCRIBED"; const d = $(".live"); if (d) d.classList.toggle("on", S.live) });
}
function upsert(list, ev, label) {
  const row = ev.new; if (!row || !row.id) return;
  const i = list.findIndex(x => x.id === row.id);
  if (i >= 0) list[i] = row; else { list.unshift(row); S.fresh.add(row.id); alertNew(`${label}: ${row.code} — ${row.name}`) }
  if (S.sel && S.sel.id === row.id) S.sel = row;
  render();
}
function alertNew(text) {
  toast(text);
  try { const a = new AudioContext(), o = a.createOscillator(), g = a.createGain(); o.frequency.value = 880; g.gain.setValueAtTime(.15, a.currentTime); g.gain.exponentialRampToValueAtTime(.001, a.currentTime + .6); o.connect(g).connect(a.destination); o.start(); o.stop(a.currentTime + .6) } catch {}
  if ("Notification" in window && Notification.permission === "granted" && document.hidden) new Notification("KOJI", { body: text });
}

/* ============ SHELL ============ */
function shell() {
  app.innerHTML = `
  <header class="top"><div class="top-in">
    <div class="brand">KOJI<small>لوحة التحكم</small></div>
    <nav class="nav" id="nav"></nav>
    <div class="me"><span class="live ${S.live ? "on" : ""}" title="تحديث مباشر"></span>
      ${"Notification" in window && Notification.permission !== "granted" ? `<button class="b sm" id="notif">فعّل التنبيهات</button>` : ""}
      <span class="mono">${esc(S.user.email)}</span><button class="b sm" id="out">خروج</button></div>
  </div></header>
  <main id="view"></main>
  <div class="scrim" id="scrim"></div><aside class="panel" id="panel" aria-hidden="true"></aside>`;
  $("#out").onclick = async () => { await sb.auth.signOut(); location.reload() };
  const n = $("#notif"); if (n) n.onclick = async () => { await Notification.requestPermission(); n.remove() };
  $("#scrim").onclick = closePanel;
  document.addEventListener("keydown", e => { if (e.key === "Escape") closePanel() });
  render();
  setInterval(() => { if (S.tab === "orders" || S.tab === "reqs") renderView() }, 60000);   // refresh "x minutes ago"
}
function render() {
  const nNew = S.orders.filter(o => o.status === "new").length, rNew = S.reqs.filter(r => r.status === "new").length;
  document.title = `${nNew + rNew ? `(${nNew + rNew}) ` : ""}لوحة التحكم — كوجي`;
  const tabs = [["orders", "الطلبات", nNew], ["reqs", "المطاعم", rNew], ["products", "المنتجات"], ["settings", "الإعدادات"], ["team", "الفريق"]];
  $("#nav").innerHTML = tabs.map(([k, l, b]) => `<button class="${S.tab === k ? "on" : ""}" data-tab="${k}">${l}${b ? `<span class="badge">${b}</span>` : ""}</button>`).join("");
  $$("#nav [data-tab]").forEach(b => b.onclick = () => { S.tab = b.dataset.tab; closePanel(); render() });
  renderView();
  if (S.sel) renderPanel();
}
function renderView() {
  const v = $("#view"); if (!v) return;
  ({ orders: viewOrders, reqs: viewReqs, products: viewProducts, settings: viewSettings, team: viewTeam })[S.tab](v);
}

/* ============ ORDERS ============ */
const match = (o, q) => !q || [o.code, o.name, o.phone, o.area, o.address].some(x => String(x || "").toLowerCase().includes(q));
function viewOrders(v) {
  const q = S.q.toLowerCase(), all = S.orders;
  const cnt = s => all.filter(o => o.status === s).length;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const delivered = all.filter(o => o.status === "delivered");
  const list = all.filter(o => (S.of === "all" || o.status === S.of) && match(o, q));
  v.innerHTML = `
    <div class="stats">
      <div class="stat"><span>طلبات جديدة</span><b>${cnt("new")}</b></div>
      <div class="stat"><span>اتأكدت</span><b>${cnt("confirmed")}</b></div>
      <div class="stat"><span>في الطريق</span><b>${cnt("out_for_delivery")}</b></div>
      <div class="stat"><span>اتسلّمت</span><b>${delivered.length}</b></div>
      <div class="stat"><span>إيراد المسلَّم</span><b>${egp(delivered.reduce((s, o) => s + o.total, 0))}</b></div>
      <div class="stat"><span>النهارده</span><b>${all.filter(o => new Date(o.created_at) >= today).length}</b></div>
    </div>
    <div class="bar">
      <div class="chips">${[["all", "الكل", all.length], ...Object.entries(OST).map(([k, l]) => [k, l, cnt(k)])].map(([k, l, n]) => `<button class="chip ${S.of === k ? "on" : ""}" data-of="${k}">${l}<i>${n}</i></button>`).join("")}</div>
      <input class="search" id="q" placeholder="دوّر برقم الطلب أو الاسم أو الموبايل" value="${esc(S.q)}">
      <button class="b ghost sm" id="csv">تصدير Excel</button>
    </div>
    ${list.length ? `<table class="tbl"><thead><tr><th>الطلب</th><th>العميل</th><th class="hide-m">العنوان</th><th class="hide-m">المنتجات</th><th>الإجمالي</th><th>الحالة</th></tr></thead><tbody>
      ${list.map(o => `<tr data-o="${o.id}" class="${S.fresh.has(o.id) ? "fresh" : ""}">
        <td><b class="mono">${esc(o.code)}</b><span class="cell-sub">${ago(o.created_at)}</span></td>
        <td>${esc(o.name)}<span class="cell-sub mono">${esc(o.phone)}</span></td>
        <td class="hide-m">${esc(CITY[o.city] || o.city)}<span class="cell-sub">${esc(o.area)}</span></td>
        <td class="hide-m">${(o.items || []).map(i => `${esc(i.name_ar)} × ${i.qty}`).join("<br>")}</td>
        <td>${egp(o.total)}<span class="cell-sub">${PAY[o.pay] || o.pay}${o.delivery_fee == null ? " · التوصيل لسه" : ""}</span></td>
        <td><span class="st ${o.status}">${OST[o.status]}</span></td></tr>`).join("")}
    </tbody></table>` : `<div class="empty">${all.length ? "مفيش طلبات بالفلتر ده." : "لسه مفيش طلبات. أول ما حد يطلب من الموقع هيظهر هنا على طول."}</div>`}`;
  $$("[data-of]", v).forEach(b => b.onclick = () => { S.of = b.dataset.of; renderView() });
  const qi = $("#q", v); qi.oninput = () => { S.q = qi.value; const pos = qi.selectionStart; renderView(); const n = $("#q"); n.focus(); n.setSelectionRange(pos, pos) };
  $("#csv", v).onclick = () => csv(list);
  $$("[data-o]", v).forEach(tr => tr.onclick = () => { const o = S.orders.find(x => x.id === tr.dataset.o); S.fresh.delete(o.id); openPanel(o) });
}
function csv(list) {
  const cols = ["code", "created_at", "status", "name", "phone", "city", "area", "address", "pay", "items", "subtotal", "delivery_fee", "total", "notes", "admin_note"];
  const cell = v => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const rows = list.map(o => cols.map(c => cell(c === "items" ? (o.items || []).map(i => `${i.name_ar} x${i.qty}`).join(" | ") : c === "city" ? CITY[o.city] : c === "status" ? OST[o.status] : c === "pay" ? PAY[o.pay] : o[c])).join(","));
  const blob = new Blob(["﻿" + [cols.join(","), ...rows].join("\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `koji-orders-${new Date().toISOString().slice(0, 10)}.csv`; a.click(); URL.revokeObjectURL(a.href);
}

/* ---------- panel ---------- */
function openPanel(row) { S.sel = row; renderPanel(); $("#panel").classList.add("on"); $("#panel").setAttribute("aria-hidden", "false"); $("#scrim").classList.add("on") }
function closePanel() { S.sel = null; const p = $("#panel"); if (!p) return; p.classList.remove("on"); p.setAttribute("aria-hidden", "true"); $("#scrim").classList.remove("on") }
function renderPanel() {
  const p = $("#panel"), x = S.sel; if (!p || !x) return;
  if (x.items) orderPanel(p, x); else reqPanel(p, x);
}
function orderPanel(p, o) {
  const itemsTxt = (o.items || []).map(i => `${i.name_ar} × ${i.qty}`).join("، ");
  const msg = `أهلاً ${o.name}، معاك فريق كوجي بخصوص طلبك ${o.code} (${itemsTxt}). الإجمالي ${o.subtotal} ج${o.delivery_fee != null ? ` + التوصيل ${o.delivery_fee} ج = ${o.total} ج` : " + مصاريف التوصيل"}. ممكن نأكد ميعاد التسليم والعنوان؟`;
  const slip = [`طلب ${o.code}`, `${o.name} — ${o.phone}`, `${CITY[o.city] || o.city} — ${o.area}`, o.address, `المنتجات: ${itemsTxt}`, o.pay === "cod" ? `المطلوب تحصيله: ${o.total} ج` : `مدفوع ${PAY[o.pay]}`, o.notes ? `ملاحظة العميل: ${o.notes}` : ""].filter(Boolean).join("\n");
  p.innerHTML = `
    <div class="panel-hd"><h3>${esc(o.code)}</h3><button class="b ghost sm" data-x>قفل</button></div>
    <div class="panel-bd">
      <div class="box"><h4>الحالة</h4><div class="statusbar">${Object.entries(OST).map(([k, l]) => `<button data-st="${k}" class="${o.status === k ? "cur" : ""}">${l}</button>`).join("")}</div>
        <p class="hint" style="margin-top:10px">اتطلب ${when(o.created_at)} · آخر تعديل ${ago(o.updated_at)}</p></div>
      <div class="box"><h4>العميل</h4><dl class="kv">
        <dt>الاسم</dt><dd>${esc(o.name)}</dd><dt>الموبايل</dt><dd class="mono">${esc(o.phone)}</dd>
        <dt>المحافظة</dt><dd>${esc(CITY[o.city] || o.city)}</dd><dt>المنطقة</dt><dd>${esc(o.area)}</dd><dt>العنوان</dt><dd>${esc(o.address)}</dd>
        <dt>الدفع</dt><dd>${PAY[o.pay] || o.pay}</dd>${o.notes ? `<dt>ملاحظة</dt><dd>${esc(o.notes)}</dd>` : ""}<dt>اللغة</dt><dd>${o.lang === "en" ? "إنجليزي" : "عربي"}</dd></dl>
        <div class="acts"><a class="b sm" href="tel:+2${esc(o.phone)}">اتصل</a><a class="b sm" href="${wa(o.phone, msg)}" target="_blank" rel="noopener">واتساب برسالة تأكيد</a><button class="b ghost sm" data-copy>انسخ بيانات المندوب</button></div></div>
      <div class="box"><h4>المنتجات</h4>
        ${(o.items || []).map(i => `<div class="line"><span>${esc(i.name_ar)} <span class="soft">(${esc(i.size_ar)})</span> × ${i.qty}</span><span>${egp(i.qty * i.price)}</span></div>`).join("")}
        <div class="line"><span>المنتجات</span><span>${egp(o.subtotal)}</span></div>
        <div class="line"><span>التوصيل</span><span class="inline" style="max-width:220px"><input id="fee" type="number" min="0" step="5" placeholder="مثلاً 60" value="${o.delivery_fee ?? ""}" dir="ltr"><button class="b sm" data-fee>حفظ</button></span></div>
        <div class="line t"><span>الإجمالي</span><span>${egp(o.total)}</span></div></div>
      <div class="box"><h4>ملاحظة داخلية (العميل مش بيشوفها)</h4><textarea class="note" id="an">${esc(o.admin_note || "")}</textarea><div class="acts"><button class="b sm" data-note>حفظ الملاحظة</button></div></div>
    </div>`;
  $("[data-x]", p).onclick = closePanel;
  $("[data-copy]", p).onclick = async () => { await navigator.clipboard.writeText(slip); toast("اتنسخ") };
  $$("[data-st]", p).forEach(b => b.onclick = async () => {
    if (b.dataset.st === "cancelled" && !confirm("تلغي الطلب ده؟")) return;
    await patch("orders", o.id, { status: b.dataset.st }, `الحالة بقت: ${OST[b.dataset.st]}`);
  });
  $("[data-fee]", p).onclick = async () => { const v = $("#fee").value.trim(); const n = v === "" ? null : Math.max(0, Math.round(+v)); if (v !== "" && !Number.isFinite(n)) return toast("رقم غلط"); await patch("orders", o.id, { delivery_fee: n }, "اتحفظ التوصيل") };
  $("[data-note]", p).onclick = () => patch("orders", o.id, { admin_note: $("#an").value.trim() || null }, "اتحفظت الملاحظة");
}
async function patch(table, id, values, okMsg) {
  const { data, error } = await sb.from(table).update(values).eq("id", id).select().single();
  if (error) { toast("ماتحفظش: " + error.message); return }
  const list = table === "orders" ? S.orders : S.reqs; const i = list.findIndex(x => x.id === id); if (i >= 0) list[i] = data;
  if (S.sel && S.sel.id === id) S.sel = data;
  toast(okMsg); render();
}

/* ============ RESTAURANT REQUESTS ============ */
function viewReqs(v) {
  const q = S.q.toLowerCase(), all = S.reqs;
  const list = all.filter(r => (S.rf === "all" || r.status === S.rf) && (!q || [r.code, r.name, r.phone, r.venue].some(x => String(x || "").toLowerCase().includes(q))));
  const known = all.filter(r => KGMID[r.kg_month] != null);
  const est = known.length ? known.reduce((s, r) => s + KGMID[r.kg_month], 0) / known.length : null;
  v.innerHTML = `
    <div class="fs"><div><span class="soft" style="color:#cfc6b8">fs_rate من الطلبات (تقدير)</span><br><b>${est == null ? "—" : est.toFixed(2) + " كجم/مطعم/شهر"}</b> <span style="color:#cfc6b8">من ${known.length} إجابة</span></div>
      <p>ده متوسط اللي المطاعم <b>قالت</b> إنها هتستخدمه (منتصف كل خانة)، مش استهلاك فعلي. الموديل بيفترض <b>٠.٩١</b>، وتحت <b>١.١</b> الشيفات لوحدهم بيخسّروا المشروع. اعتبره أول قياس، وأكّده بالطلبات الحقيقية.</p></div>
    <div class="kgsum">${K.KG.map(([k, l]) => `<div><b>${all.filter(r => r.kg_month === k).length}</b><span>${l}</span></div>`).join("")}</div>
    <div class="bar">
      <div class="chips">${[["all", "الكل", all.length], ...Object.entries(RST).map(([k, l]) => [k, l, all.filter(r => r.status === k).length])].map(([k, l, n]) => `<button class="chip ${S.rf === k ? "on" : ""}" data-rf="${k}">${l}<i>${n}</i></button>`).join("")}</div>
      <input class="search" id="q" placeholder="دوّر بالمطعم أو الاسم أو الموبايل" value="${esc(S.q)}">
    </div>
    ${list.length ? `<table class="tbl"><thead><tr><th>الطلب</th><th>المطعم</th><th>الشخص</th><th class="hide-m">المنتج</th><th>في الشهر</th><th>الحالة</th></tr></thead><tbody>
      ${list.map(r => `<tr data-r="${r.id}" class="${S.fresh.has(r.id) ? "fresh" : ""}">
        <td><b class="mono">${esc(r.code)}</b><span class="cell-sub">${ago(r.created_at)}</span></td>
        <td>${esc(r.venue)}<span class="cell-sub">${esc(r.dish || "")}</span></td>
        <td>${esc(r.name)}<span class="cell-sub mono">${esc(r.phone)}</span></td>
        <td class="hide-m">${esc(PNAME[r.product] || "مش متأكد")}</td>
        <td>${esc(KG[r.kg_month] || "—")}</td>
        <td><span class="st ${r.status}">${RST[r.status]}</span></td></tr>`).join("")}
    </tbody></table>` : `<div class="empty">${all.length ? "مفيش طلبات بالفلتر ده." : "لسه مفيش طلبات عينات من مطاعم."}</div>`}`;
  $$("[data-rf]", v).forEach(b => b.onclick = () => { S.rf = b.dataset.rf; renderView() });
  const qi = $("#q", v); qi.oninput = () => { S.q = qi.value; const pos = qi.selectionStart; renderView(); const n = $("#q"); n.focus(); n.setSelectionRange(pos, pos) };
  $$("[data-r]", v).forEach(tr => tr.onclick = () => { const r = S.reqs.find(x => x.id === tr.dataset.r); S.fresh.delete(r.id); openPanel(r) });
}
function reqPanel(p, r) {
  const msg = `أهلاً ${r.name}، معاك فريق كوجي بخصوص طلب عينة الثوم الأسود لـ${r.venue}. إمتى يناسبك نبعت العينة؟`;
  p.innerHTML = `
    <div class="panel-hd"><h3>${esc(r.code)}</h3><button class="b ghost sm" data-x>قفل</button></div>
    <div class="panel-bd">
      <div class="box"><h4>الحالة</h4><div class="statusbar">${Object.entries(RST).map(([k, l]) => `<button data-st="${k}" class="${r.status === k ? "cur" : ""}">${l}</button>`).join("")}</div>
        <p class="hint" style="margin-top:10px">اتطلب ${when(r.created_at)}</p></div>
      <div class="box"><h4>المطعم</h4><dl class="kv">
        <dt>المطعم</dt><dd>${esc(r.venue)}</dd><dt>الشخص</dt><dd>${esc(r.name)}${r.role ? ` · ${esc(r.role)}` : ""}</dd><dt>الموبايل</dt><dd class="mono">${esc(r.phone)}</dd>
        <dt>المنتج</dt><dd>${esc(PNAME[r.product] || "مش متأكد")}</dd><dt>في الشهر</dt><dd>${esc(KG[r.kg_month] || "—")}</dd>
        ${r.dish ? `<dt>الطبق</dt><dd>${esc(r.dish)}</dd>` : ""}${r.notes ? `<dt>ملاحظة</dt><dd>${esc(r.notes)}</dd>` : ""}</dl>
        <div class="acts"><a class="b sm" href="tel:+2${esc(r.phone)}">اتصل</a><a class="b sm" href="${wa(r.phone, msg)}" target="_blank" rel="noopener">واتساب</a></div></div>
      <div class="box"><h4>ملاحظة داخلية: رأي الشيف، الكمية الحقيقية، السعر اللي بيدفعه دلوقتي</h4><textarea class="note" id="an">${esc(r.admin_note || "")}</textarea><div class="acts"><button class="b sm" data-note>حفظ الملاحظة</button></div></div>
    </div>`;
  $("[data-x]", p).onclick = closePanel;
  $$("[data-st]", p).forEach(b => b.onclick = () => patch("chef_requests", r.id, { status: b.dataset.st }, `الحالة بقت: ${RST[b.dataset.st]}`));
  $("[data-note]", p).onclick = () => patch("chef_requests", r.id, { admin_note: $("#an").value.trim() || null }, "اتحفظت الملاحظة");
}

/* ============ PRODUCTS ============ */
function viewProducts(v) {
  v.innerHTML = `<h2 class="pg">المنتجات والأسعار</h2>
    <p class="soft" style="margin-bottom:16px">أي تعديل هنا بيظهر على الموقع على طول. السعر بيتحسب على السيرفر وقت الطلب، فمحدش يقدر يغيّره من المتصفح.</p>
    <div class="grid2">${S.products.map(p => `<div class="pcard" data-p="${p.id}">
      <div class="row"><h4>${esc(p.name_ar)} <span class="soft" style="font-weight:400">· ${esc(p.size_ar)}</span></h4><span class="st ${p.channel === "chef" ? "confirmed" : "delivered"}">${p.channel === "chef" ? "مطاعم" : "تجزئة"}</span></div>
      <div class="row"><label class="tog">السعر <input class="price-in" type="number" min="1" step="5" value="${p.price}"> ج</label></div>
      <div class="row"><label class="tog"><input type="checkbox" data-k="available" ${p.available ? "checked" : ""}> متاح للطلب</label><label class="tog"><input type="checkbox" data-k="active" ${p.active ? "checked" : ""}> ظاهر في الموقع</label></div>
      <div class="row"><span class="hint">${p.channel === "chef" ? "بيظهر في صفحة المطاعم (طلب عينة، مش سلة)" : "آخر تعديل " + ago(p.updated_at)}</span><button class="b sm" data-save>حفظ</button></div>
    </div>`).join("")}</div>`;
  $$("[data-p]", v).forEach(c => $("[data-save]", c).onclick = async () => {
    const price = Math.round(+$(".price-in", c).value);
    if (!(price > 0)) return toast("السعر لازم يكون أكبر من صفر");
    const vals = { price, available: $("[data-k=available]", c).checked, active: $("[data-k=active]", c).checked };
    const { data, error } = await sb.from("products").update(vals).eq("id", c.dataset.p).select().single();
    if (error) return toast("ماتحفظش: " + error.message);
    S.products[S.products.findIndex(x => x.id === data.id)] = data; toast("اتحفظ"); renderView();
  });
}

/* ============ SETTINGS ============ */
function viewSettings(v) {
  const s = S.settings || {}, fees = s.delivery_fees || {};
  v.innerHTML = `<h2 class="pg">الإعدادات</h2>
    <div class="sect"><h3>استقبال الطلبات</h3><p>لو قفلت الطلبات، الموقع بيفضل شغال بس زرار «كمّل الطلب» بيتقفل.</p>
      <div class="row" style="justify-content:flex-start;gap:30px"><label class="tog"><input type="checkbox" id="acc" ${s.accepting_orders ? "checked" : ""}> بنستقبل طلبات</label>
      <label class="tog"><input type="checkbox" id="pre" ${s.preorder ? "checked" : ""}> طلب مسبق (بنأكد الميعاد قبل الدفع)</label></div></div>
    <div class="sect"><h3>التواصل والدفع</h3><p>رقم الواتساب بيظهر في فوتر الموقع. أرقام إنستاباي وفودافون كاش بتظهر للعميل في صفحة التتبّع بس، بعد ما تأكد طلبه.</p>
      <div class="grid2" style="grid-template-columns:repeat(auto-fill,minmax(240px,1fr))">
        <div class="f"><label for="wa">رقم الواتساب</label><input id="wa" dir="ltr" value="${esc(s.whatsapp || "")}"></div>
        <div class="f"><label for="ip">إنستاباي (عنوان الدفع أو الرقم)</label><input id="ip" dir="ltr" value="${esc(s.instapay || "")}"></div>
        <div class="f"><label for="vf">فودافون كاش</label><input id="vf" dir="ltr" value="${esc(s.vodafone_cash || "")}"></div>
      </div></div>
    <div class="sect"><h3>مصاريف التوصيل (ج)</h3><p>سيبها فاضية لو مش محددة، وساعتها بتتحدد يدوي في كل طلب. لو كتبت رقم، بيتحط على الطلب لوحده وبيبان للعميل وهو بيطلب.</p>
      <div class="fees">${K.CITIES.map(([k, ar]) => `<label>${ar}<input type="number" min="0" step="5" data-city="${k}" value="${fees[k] ?? ""}"></label>`).join("")}</div></div>
    <button class="b" id="saveS">حفظ الإعدادات</button>`;
  $("#saveS").onclick = async () => {
    const df = {}; $$("[data-city]").forEach(i => { if (i.value.trim() !== "") df[i.dataset.city] = Math.max(0, Math.round(+i.value)) });
    let w = $("#wa").value.replace(/\D/g, "");
    if (/^01[0125]\d{8}$/.test(w)) w = "2" + w;                       // 010... → 2010...
    if (w && !/^201[0125]\d{8}$/.test(w)) return toast("رقم الواتساب مش صحيح. اكتبه كده: 01012345678");
    const vals = { accepting_orders: $("#acc").checked, preorder: $("#pre").checked, whatsapp: w || null, instapay: $("#ip").value.trim() || null, vodafone_cash: $("#vf").value.trim() || null, delivery_fees: df };
    const { data, error } = await sb.from("settings").update(vals).eq("id", 1).select().single();
    if (error) return toast("ماتحفظش: " + error.message);
    S.settings = data; toast("اتحفظت الإعدادات");
  };
}

/* ============ TEAM ============ */
function viewTeam(v) {
  const link = new URL("admin.html", location.href).href;
  v.innerHTML = `<h2 class="pg">الفريق</h2>
    <div class="sect"><h3>اللي يقدروا يدخلوا اللوحة</h3><p>ضيف إيميل الشريك هنا، وابعتله اللينك ده: <span class="mono">${esc(link)}</span>. يفتحه ويختار «أول مرة؟ اعمل باسورد» بنفس الإيميل.</p>
      <table class="tbl" style="margin-bottom:14px"><thead><tr><th>الإيميل</th><th>الاسم</th><th>اتضاف</th><th></th></tr></thead><tbody>
      ${S.admins.map(a => `<tr style="cursor:default"><td class="mono">${esc(a.email)}</td><td>${esc(a.name || "")}</td><td>${when(a.added_at)}</td><td>${a.email === S.user.email ? '<span class="soft">إنت</span>' : `<button class="b ghost sm" data-rm="${esc(a.email)}">شيل</button>`}</td></tr>`).join("")}
      </tbody></table>
      <form class="inline" id="addA"><input name="email" type="email" required placeholder="الإيميل" dir="ltr"><input name="name" placeholder="الاسم"><button class="b sm">ضيف</button></form></div>
    <div class="sect"><h3>غيّر الباسورد بتاعك</h3><p>١٠ حروف على الأقل.</p>
      <form class="inline" id="pw"><input name="p1" type="password" required minlength="10" placeholder="باسورد جديد" autocomplete="new-password" dir="ltr"><input name="p2" type="password" required placeholder="تاني" autocomplete="new-password" dir="ltr"><button class="b sm">غيّر</button></form></div>`;
  $("#addA").onsubmit = async e => {
    e.preventDefault(); const f = e.target, email = f.email.value.trim().toLowerCase();
    const { data, error } = await sb.from("admins").insert({ email, name: f.name.value.trim() || null }).select().single();
    if (error) return toast(/duplicate/i.test(error.message) ? "الإيميل ده موجود بالفعل" : "ماتضافش: " + error.message);
    S.admins.push(data); toast("اتضاف. ابعتله اللينك."); renderView();
  };
  $$("[data-rm]", v).forEach(b => b.onclick = async () => {
    if (!confirm(`تشيل ${b.dataset.rm} من الفريق؟`)) return;
    const { error } = await sb.from("admins").delete().eq("email", b.dataset.rm);
    if (error) return toast("ماتشالش: " + error.message);
    S.admins = S.admins.filter(a => a.email !== b.dataset.rm); toast("اتشال"); renderView();
  });
  $("#pw").onsubmit = async e => {
    e.preventDefault(); const f = e.target;
    if (f.p1.value !== f.p2.value) return toast("الباسوردين مش زي بعض");
    const { error } = await sb.auth.updateUser({ password: f.p1.value });
    if (error) return toast("ماتغيّرش: " + error.message);
    f.reset(); toast("الباسورد اتغيّر");
  };
}

/* ============ BOOT ============ */
(async () => {
  const { data: { session } } = await sb.auth.getSession();
  if (session) { try { await enter() } catch { renderAuth() } } else renderAuth();
})();
})();
