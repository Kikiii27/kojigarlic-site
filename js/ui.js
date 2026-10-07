/* KOJI — page templates, shared by two callers:
   - scripts/build.mjs runs this in Node and writes every page pre-rendered in Arabic (fast first paint,
     crawlable text, per-product link previews on WhatsApp/Instagram);
   - app.js runs it in the browser to re-render the page when the visitor has chosen English.
   Pure string functions: no DOM, no network. Copy lives in data.js. */
(function (K) {
"use strict";
const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ESC[c]);

const sv = d => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
const ICON = {
  bag: sv('<path d="M5.5 8h13l-1 12.5h-11z"/><path d="M9 10V6.5a3 3 0 0 1 6 0V10"/>'),
  phone: sv('<path d="M6.6 3.5h3l1.6 4.6-2.1 1.3a11.5 11.5 0 0 0 5.5 5.5l1.3-2.1 4.6 1.6v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z"/>'),
  wallet: sv('<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18M15.5 14.5h2.5"/>'),
  clove: sv('<path d="M12 3.5c-1.2 3.4-6 6-6 10.8a6 6 0 0 0 12 0C18 9.5 13.2 6.9 12 3.5z"/><path d="M12 9.5v10.8"/>'),
  truck: sv('<path d="M2.5 6.5h11v10h-11zM13.5 10h4.2l3 3.2v3.3h-7.2"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>'),
  flame: sv('<path d="M12 3c.5 3.5 5 5.5 5 10.5a5 5 0 0 1-10 0c0-2.4 1.3-3.8 2.4-5 .3 1.6 1 2.6 2.1 3C11 9 11.2 5.6 12 3z"/>'),
  mail: sv('<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m4 7 8 6 8-6"/>'),
  ig: sv('<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6"/>'),
};

/* the 21-day garlic bulb: fill + line colours are driven by CSS custom properties */
const BODY = "M130 40C136 72 214 86 226 150c10 56-34 94-96 96-62-2-106-40-96-96C46 86 124 72 130 40z";
const BULB = `<svg class="bulb" viewBox="0 0 260 280" aria-hidden="true">
<defs><radialGradient id="kojiSheen" cx=".34" cy=".36" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".4" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
<ellipse cx="130" cy="262" rx="84" ry="7" fill="currentColor" opacity=".08"/>
<path class="b-body" d="${BODY}"/>
<path d="${BODY}" fill="url(#kojiSheen)"/>
<g class="b-ln">
<path d="M130 40c-2-12 3-20-1-34M134 41c0-11 4-20 1-33"/>
<path d="M130 54c-8 58-8 136 0 190"/><path d="M133 58c27 40 45 112 23 184"/><path d="M127 58c-27 40-45 112-23 184"/><path d="M136 64c54 38 78 108 48 172"/><path d="M124 64c-54 38-78 108-48 172"/>
<path d="M108 246q22 7 44 0M114 249l-6 12M122 251l-2 14M130 251v15M138 251l2 14M146 249l6 12"/>
</g></svg>`;

const RC = [["#3a2230", "#f4efe6"], ["#e6d9c2", "#141110"], ["#1d1714", "#f4efe6"], ["#c9b48f", "#141110"], ["#4f5236", "#f4efe6"], ["#ebe4d7", "#141110"]];
const NAV = [["shop.html", "nav.shop", "shop"], ["recipes.html", "nav.recipes", "recipes"], ["chefs.html", "nav.chefs", "chefs"], ["story.html", "nav.story", "story"]];

K.UI = function (lang) {
  const ar = lang === "ar", T = K.T[lang];
  const t = k => T[k] ?? k, L = o => o[lang];
  const loc = ar ? "ar-EG" : "en-US";
  const num = n => Number(n).toLocaleString(loc);
  const num2 = n => Number(n).toLocaleString(loc, { minimumIntegerDigits: 2 });
  const dn = n => String(n).padStart(2, "0"); // decorative numerals (01, 02…) stay Latin in both languages
  const money = n => ar ? `${num(n)} ج.م` : `EGP ${num(n)}`;
  const P = Object.fromEntries(K.PRODUCTS.map(p => [p.id, p]));
  const R = Object.fromEntries(K.RECIPES.map(r => [r.id, r]));
  const purl = p => `${p.slug}.html`, rurl = r => `${r.slug}.html`;
  const sm = src => src.replace(/\.webp$/, "-640.webp");
  const brand = ar ? "كوجي" : "KOJI";
  const arrow = `<span class="arrow" aria-hidden="true">→</span>`;
  const kick = k => k ? `<p class="kick">${t(k)}</p>` : "";
  /* responsive product/stock image: a 640w copy for phones and grids, the full one for big screens */
  /* AVIF (~25% smaller) where supported, WebP otherwise; app.js swaps both when the gallery changes photo */
  const set = (src, w, ext = "webp") => `${sm(src).replace(/webp$/, ext)} 640w, ${src.replace(/webp$/, ext)} ${w}w`;
  const pic = (src, alt, o = {}) => { const w = o.w || 1136, sizes = o.sizes || "(max-width:760px) 50vw, 30vw"; return `<picture><source type="image/avif" srcset="${set(src, w, "avif")}" sizes="${sizes}"><img${o.cls ? ` class="${o.cls}"` : ""} src="${src}" srcset="${set(src, w)}" sizes="${sizes}" alt="${esc(alt)}" width="${w}" height="${o.h || 1408}"${o.eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"${o.style ? ` style="${o.style}"` : ""}></picture>` };

  /* ---------------- cards ---------------- */
  const prodCard = (p, o = {}) => { const c = L(p); return `
<article class="pc${o.big ? " pc-big" : ""} rv" data-id="${p.id}" data-cat="${p.cat.join(" ")}">
  <a class="pc-img" href="${purl(p)}" style="--bg:${p.bg}" aria-label="${esc(c.n)}">
    ${pic(p.img, c.n, { sizes: o.big ? "(max-width:760px) 100vw, 50vw" : "(max-width:760px) 50vw, (max-width:1100px) 33vw, 25vw" })}
    ${c.tag ? `<span class="tag">${esc(c.tag)}</span>` : ""}<span class="sold-tag">${t("soldout")}</span>
  </a>
  <div class="pc-meta">
    <h3><a href="${purl(p)}">${esc(c.n)}</a></h3>
    <span class="price" data-price="${p.id}">${money(p.price)}</span>
    <span class="size">${esc(c.s)}</span>
    ${o.big ? `<p class="pc-d">${esc(c.d)}</p>` : ""}
  </div>
  <button class="pc-add" data-add="${p.id}">${t("add")}</button>
</article>` };

  const recCard = r => { const i = K.RECIPES.indexOf(r), c = L(r), [bg, fg] = RC[i % RC.length], u = P[r.uses]; return `
<a class="rc rv" href="${rurl(r)}" data-cat="${r.cat}" style="--rbg:${bg};--rfg:${fg}">
  <span class="rc-n">${dn(i + 1)}</span>
  <h3>${esc(c.n)}</h3><p>${esc(c.b)}</p>
  <span class="rc-ft"><img src="${sm(u.img)}" alt="" width="40" height="40" loading="lazy" decoding="async"><span>${esc(c.t)} · ${t("rc." + r.cat)}</span>${arrow}</span>
</a>` };

  const factsHtml = () => K.FACTS.map(([k, b, f]) => `<div class="fact"><span>${t(k)}</span>
  <div class="dots" role="img" aria-label="${t(k)} ${b}/10">${Array.from({ length: 10 }, (_, i) => `<i style="--k:${i}" class="${i < b ? "on" : ""}${i === f - 1 ? " fresh" : ""}"></i>`).join("")}</div>
  <span class="n">${num(b)}/${num(10)}</span></div>`).join("");

  const specHtml = () => K.CHEF.map(p => { const c = L(p); return `<div class="spec-row"><div><h3>${esc(c.n)}</h3><span class="s">${esc(c.s)}</span></div>
  <span class="price" data-price="${p.id}">${money(p.price)}</span><button data-trial="${p.id}">${t("chefs.req")}</button></div>` }).join("");

  const faqHtml = () => K.FAQ[lang].map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("");

  /* ---------------- shared sections ---------------- */
  const phead = (k, h, p) => `
<section class="phead"><div class="wrap">
  ${kick(k)}<h1 class="h1" data-split>${t(h)}</h1>${p ? `<p class="phead-p rv">${t(p)}</p>` : ""}
</div></section>`;

  const secHd = (k, h, more) => `<div class="sec-hd"><div>${kick(k)}<h2 class="h2" data-split>${t(h)}</h2></div>${more || ""}</div>`;

  const promise = () => `
<section class="sec promise"><div class="wrap">
  ${secHd("pr.k", "pr.h")}
  <ul class="pr">${[["phone", 1], ["wallet", 2], ["clove", 3], ["truck", 4]].map(([ic, i]) => `<li class="rv">${ICON[ic]}<h3>${i === 4 ? `<a href="track.html">${t("pr4.h")} ${arrow}</a>` : t(`pr${i}.h`)}</h3><p>${t(`pr${i}.p`)}</p></li>`).join("")}</ul>
</div></section>`;

  const band = () => `
<section class="band"><div class="wrap band-in">
  <div>
    ${kick("chefs.k")}<h2 class="h1" data-split>${t("chefs.h")}</h2><p class="band-p rv">${t("chefs.p")}</p>
    <div class="band-ctas rv"><button class="btn btn-light btn-lg trialBtn">${t("chefs.cta")}</button><a class="btn btn-out btn-lg" href="chefs.html">${t("chefs.more")}</a></div>
  </div>
  <ul class="band-list rv">${K.CHEF.map(p => `<li><span>${esc(L(p).n)}<small>${esc(L(p).s)}</small></span><b data-price="${p.id}">${money(p.price)}</b></li>`).join("")}</ul>
</div></section>`;

  const taste = () => `
<section class="sec dark taste"><div class="wrap two">
  <div>${kick("taste.k")}<h2 class="h1" data-split>${t("taste.h")}</h2><p class="taste-p rv">${t("taste.p")}</p></div>
  <div class="rv">
    <div class="facts">${factsHtml()}</div>
    <div class="facts-key"><span><i></i>${t("taste.black")}</span><span><i class="f"></i>${t("taste.fresh")}</span></div>
    <p class="fine">${t("taste.note")}</p>
  </div>
</div></section>`;

  const ways = () => `
<section class="sec"><div class="wrap">
  ${secHd("ways.k", "ways.h")}
  <ol class="ways">${[1, 2, 3].map(i => `<li class="way rv"><span class="way-n">${dn(i)}</span><h3>${t(`w${i}.h`)}</h3><p>${t(`w${i}.p`)}</p><span class="way-d">${t(`w${i}.d`)}</span></li>`).join("")}</ol>
</div></section>`;

  const guide = () => `
<section class="sec tint"><div class="wrap">
  ${secHd("guide.k", "guide.h")}
  <div class="gd">${[["cloves-100", "g.cloves"], ["paste-100", "g.paste"], ["bulbs-2", "g.bulbs"]].map(([id, k]) => { const p = P[id], c = L(p); return `
    <a class="gd-i rv" href="${purl(p)}"><span class="gd-img" style="--bg:${p.bg}">${pic(p.img, "", { sizes: "120px" })}</span>
      <span class="gd-tx"><h3>${esc(c.n)}</h3><p>${t(k)}</p><span class="small">${esc(c.u)}</span></span>${arrow}</a>` }).join("")}</div>
</div></section>`;

  const age = () => `
<section class="age" id="age" aria-labelledby="ageH">
  <div class="age-stick">
    <div class="wrap age-in">
      <div class="age-tx">
        <h2 class="kick" id="ageH">${t("days.h")}</h2>
        <div class="age-day" aria-hidden="true"><b id="ageDay">00</b><span>${t("days.day")}</span></div>
        <ol class="age-st">${[0, 1, 2, 3].map(i => `<li${i ? "" : ' class="on"'}><span class="age-d">${t("days.day")} ${num([0, 7, 14, 21][i])}</span><h3>${t(`d${i}.h`)}</h3><p>${t(`d${i}.p`)}</p></li>`).join("")}</ol>
      </div>
      <div class="age-art">${BULB}</div>
    </div>
    <div class="wrap"><div class="age-rail" aria-hidden="true"><i></i><div>${[0, 7, 14, 21].map(d => `<span>${num(d)}</span>`).join("")}</div></div></div>
  </div>
</section>`;

  /* ---------------- pages ---------------- */
  const home = () => `
<section class="hero">
  <div class="hero-media"><picture><source type="image/avif" srcset="assets/shot-hero.avif"><img src="assets/shot-hero.webp" alt="" width="1680" height="944" fetchpriority="high" decoding="async"></picture></div>
  <div class="wrap hero-in">
    <p class="kick hero-k">${t("kick.hero")}</p>
    <h1 class="display" data-split>${t("hero.h")}</h1>
    <div class="hero-row">
      <p class="hero-p">${t("hero.p")}</p>
      <div class="hero-ctas"><a class="btn btn-light btn-lg" href="#shop">${t("hero.cta")} ${arrow}</a><a class="btn btn-ghost btn-lg" href="#about">${t("hero.what")}</a></div>
    </div>
    <dl class="hero-stats">${[[1, "pts.1"], [21, "pts.2"], [0, "pts.3"]].map(([n, k]) => `<div><dt data-count="${n}">${n}</dt><dd>${t(k)}</dd></div>`).join("")}</dl>
  </div>
</section>
<div class="mq" aria-hidden="true"><div class="mq-t">${[0, 1].map(() => t("mq").map(w => `<span>${w}</span><i>✦</i>`).join("")).join("")}</div></div>
<section class="sec" id="shop"><div class="wrap">
  ${secHd("shop.k", "home.range", `<a class="more" href="shop.html">${t("home.all")} ${arrow}</a>`)}
  <div class="bento">${K.PRODUCTS.map((p, i) => prodCard(p, { big: i === 0 })).join("")}</div>
  <p class="note-line">${t("shop.note")}</p>
</div></section>
<section class="sec about" id="about"><div class="wrap about-in">
  <figure class="about-media rv-img">${pic("assets/shot-macro.webp", ar ? "رأس ثوم أسود مقطوعة نصين" : "A halved bulb of black garlic", { w: 1126, h: 1688, sizes: "(max-width:1000px) 100vw, 45vw" })}</figure>
  <div class="about-tx">
    ${kick("about.k")}<h2 class="h2" data-split>${t("about.h")}</h2>
    <p class="lead rv">${t("mani.big")}</p>
    <div class="note rv">${ICON.flame}<div><h3>${t("about.not.h")}</h3><p>${t("about.not.p")}</p></div></div>
    <a class="more rv" href="story.html">${t("mani.cta")} ${arrow}</a>
  </div>
</div></section>
${age()}
${taste()}
${ways()}
<section class="sec tint"><div class="wrap">
  ${secHd("rec.k", "rec.home", `<a class="more" href="recipes.html">${t("rec.all")} ${arrow}</a>`)}
  <div class="rgrid">${K.RECIPES.slice(0, 3).map(recCard).join("")}</div>
</div></section>
${promise()}
${band()}`;

  const shop = () => phead("shop.k", "shop.h", "shop.p") + `
<section class="sec sec-tight"><div class="wrap">
  <div class="filters" id="filters" role="group">${[["all", "f.all"], ["kitchen", "f.kitchen"], ["gift", "f.gift"], ["daily", "f.daily"]].map(([f, k], i) => `<button data-f="${f}" aria-pressed="${!i}">${t(k)}</button>`).join("")}</div>
  <div class="grid" id="grid">${K.PRODUCTS.map(p => prodCard(p)).join("")}</div>
  <p class="note-line">${t("shop.note")}</p>
</div></section>` + guide() + promise() + band();

  const product = id => { const p = P[id], c = L(p); return `
<section><div class="wrap pdp">
  <div class="gal">
    <div class="gal-main prod" data-id="${p.id}" style="--bg:${p.bg}">
      ${pic(p.gal[0], c.n, { cls: "gal-img", eager: true, sizes: "(max-width:1000px) 100vw, 52vw", style: "view-transition-name:pimg" })}
      <span class="sold-tag">${t("soldout")}</span>
    </div>
    ${p.gal.length > 1 ? `<div class="gal-th" role="group" aria-label="${t("pdp.photo")}">${p.gal.map((g, i) => `<button data-gal="${g}" aria-pressed="${!i}" aria-label="${t("pdp.photo")} ${num(i + 1)}"><img src="${sm(g)}" alt="" width="72" height="90" loading="lazy" decoding="async"></button>`).join("")}</div>` : ""}
  </div>
  <div class="pdp-info">
    <nav class="crumbs" aria-label="breadcrumb"><a href="shop.html">${t("nav.shop")}</a><span aria-hidden="true">/</span><span>${esc(c.n)}</span></nav>
    ${c.tag ? `<p class="kick">${esc(c.tag)}</p>` : ""}
    <h1 class="h1 pdp-h" data-split>${esc(c.n)}</h1>
    <p class="pdp-size">${esc(c.s)}</p>
    <p class="pdp-price"><span class="price" data-price="${p.id}">${money(p.price)}</span></p>
    <p class="lead">${esc(c.d)}</p>
    <ul class="badges">${t("pdp.badges").map(b => `<li>${b}</li>`).join("")}</ul>
    <div class="buy prod" data-id="${p.id}" id="buy">
      <span class="qty" role="group"><button data-q="-1" aria-label="−">−</button><span id="pq" aria-live="polite">${num(1)}</span><button data-q="1" aria-label="+">+</button></span>
      <button class="btn btn-dark btn-lg" data-add="${p.id}" data-addq>${t("add")}</button>
    </div>
    <p class="pdp-pre">${ICON.phone}<span>${t("pdp.pre")}</span></p>
    <div class="acc">
      <details open><summary>${t("pdp.use")}</summary><p>${esc(c.how)}</p></details>
      <details><summary>${t("pd.ing")}</summary><p>${t("pd.ingv")}. ${t("pd.use")}: ${esc(c.u)}.</p></details>
      <details><summary>${t("pdp.keep")}</summary><p>${esc(c.k)}</p></details>
      <details><summary>${t("pdp.ship")}</summary><p>${t("pdp.shipv")}</p></details>
    </div>
  </div>
</div></section>
<div class="sbar prod" id="sbar" data-id="${p.id}" aria-hidden="true"><div class="sbar-in">
  <img src="${sm(p.img)}" alt="" width="44" height="55" style="--bg:${p.bg}"><div><b>${esc(c.n)}</b><span class="price" data-price="${p.id}">${money(p.price)}</span></div>
  <button class="btn btn-dark" data-add="${p.id}" data-addq tabindex="-1">${t("add")}</button>
</div></div>
<section class="sec tint"><div class="wrap">
  ${secHd("", "pdp.pair", `<a class="more" href="recipes.html">${t("rec.all")} ${arrow}</a>`)}
  <div class="rgrid">${p.pair.map(id => recCard(R[id])).join("")}</div>
</div></section>
<section class="sec"><div class="wrap">
  ${secHd("", "pdp.more", `<a class="more" href="shop.html">${t("home.all")} ${arrow}</a>`)}
  <div class="grid grid-4">${K.PRODUCTS.filter(x => x !== p).map(x => prodCard(x)).join("")}</div>
</div></section>` + promise() };

  const recipes = () => phead("rec.k", "rec.h", "rec.p") + `
<section class="sec sec-tight"><div class="wrap">
  <div class="filters" id="rfilters" role="group">${[["all", "rc.all"], ["breakfast", "rc.breakfast"], ["main", "rc.main"], ["sauce", "rc.sauce"]].map(([f, k], i) => `<button data-f="${f}" aria-pressed="${!i}">${t(k)}</button>`).join("")}</div>
  <div class="rgrid" id="rcards">${K.RECIPES.map(recCard).join("")}</div>
</div></section>` + ways();

  const recipe = id => { const r = R[id], c = L(r), i = K.RECIPES.indexOf(r), next = K.RECIPES[(i + 1) % K.RECIPES.length], u = P[r.uses], [bg, fg] = RC[i % RC.length]; return `
<section class="rhero" style="--rbg:${bg};--rfg:${fg}"><div class="wrap rhead">
  <div>
    <nav class="crumbs" aria-label="breadcrumb"><a href="recipes.html">${t("nav.recipes")}</a><span aria-hidden="true">/</span><span>${t("rc." + r.cat)}</span></nav>
    <h1 class="h1" data-split>${esc(c.n)}</h1><p class="rhead-p">${esc(c.b)}</p>
    <dl class="rmeta"><div><dt>${t("r.time")}</dt><dd>${esc(c.t)}</dd></div><div><dt>${t("r.serves")}</dt><dd>${esc(c.sv)}</dd></div></dl>
  </div>
  <aside class="uses prod" data-id="${u.id}">
    <span class="small">${t("r.uses")}</span>
    <a class="pc-img" href="${purl(u)}" style="--bg:${u.bg}">${pic(u.img, L(u).n, { sizes: "(max-width:1000px) 60vw, 26vw" })}<span class="sold-tag">${t("soldout")}</span></a>
    <div class="pc-meta"><h3><a href="${purl(u)}">${esc(L(u).n)}</a></h3><span class="price" data-price="${u.id}">${money(u.price)}</span></div>
    <button class="pc-add" data-add="${u.id}">${t("add")}</button>
  </aside>
</div></section>
<section class="sec"><div class="wrap rbody">
  <div class="ings"><h2 class="h3">${t("r.ing")}</h2><p class="small">${t("r.tick")}</p>
    ${c.ing.map(x => `<label><input type="checkbox"><span>${esc(x)}</span></label>`).join("")}</div>
  <div><h2 class="h3">${t("r.steps")}</h2><ol class="steps">${c.st.map(x => `<li>${esc(x)}</li>`).join("")}</ol>
    <p class="tip">${esc(c.tip)}</p></div>
</div></section>
<section><div class="wrap"><a class="next" href="${rurl(next)}"><span><span class="small">${t("r.next")}</span><span class="next-h">${esc(L(next).n)}</span></span>${arrow}</a></div></section>` };

  const story = () => phead("", "story.h", "story.p") + `
<section class="sec"><div class="wrap"><p class="statement" data-split>${t("story.big")}</p></div></section>
<section class="sec tint"><div class="wrap two">
  <figure class="story-media rv-img">${pic("assets/shot-bulbs.webp", ar ? "بصلتين ثوم أسود في برطمان إزاز" : "Two black garlic bulbs in a glass jar", { sizes: "(max-width:1000px) 100vw, 45vw" })}</figure>
  <div>
    ${kick("story.team.h")}<p class="lead rv">${t("story.team.p")}</p><p class="rv" style="margin-top:18px;color:var(--ink-2)">${t("mani.sub")}</p>
    <div class="label rv" aria-label="${t("label.h")}">
      <h3>${t("label.h")}</h3>
      <div class="row thick"><b>${t("label.ing")}</b><span>${t("label.ingv")}</span></div>
      <div class="row"><b>${t("label.aged")}</b><span>${t("label.agedv")}</span></div>
      <div class="row"><b>${t("label.origin")}</b><span>${t("label.originv")}</span></div>
      <div class="row"><b>${t("label.sugar")}</b><span>${ar ? "٠ جم" : "0 g"}</span></div>
      <div class="row"><b>${t("label.pres")}</b><span>${t("label.none")}</span></div>
      <div class="row"><b>${t("label.keep")}</b><span>${t("label.keepv")}</span></div>
    </div>
  </div>
</div></section>
<section class="sec"><div class="wrap">
  ${secHd("", "story.vh")}
  <div class="values">${[1, 2, 3, 4].map(i => `<div class="rv"><span class="way-n">${dn(i)}</span><h3>${t(`v${i}.h`)}</h3><p>${t(`v${i}.p`)}</p></div>`).join("")}</div>
</div></section>
<section class="sec tint" id="faq"><div class="wrap two">
  <h2 class="h2" data-split>${t("faq.h")}</h2>
  <div class="faq">${faqHtml()}</div>
</div></section>`;

  const chefs = () => phead("chefs.k", "chefs.ph", "chefs.pp") + `
<section class="sec"><div class="wrap two">
  <div class="rv"><h2 class="h3" style="margin-bottom:18px">${t("chefs.price")}</h2><div class="spec">${specHtml()}</div><p class="note-line">${t("chefs.p")}</p></div>
  <div class="rv"><ul class="list">${[1, 2, 3].map(i => `<li>${t(`chefs.l${i}`)}</li>`).join("")}</ul><button class="btn btn-dark btn-lg trialBtn">${t("chefs.cta")}</button></div>
</div></section>
<section class="sec tint"><div class="wrap">
  ${secHd("", "chefs.how")}
  <ol class="steps4">${[1, 2, 3, 4].map(i => `<li class="rv"><span class="way-n">${dn(i)}</span><h3>${t(`s${i}.h`)}</h3><p>${t(`s${i}.p`)}</p></li>`).join("")}</ol>
</div></section>
${taste()}
<section class="band"><div class="wrap band-in band-solo">
  <div><h2 class="h1" data-split>${t("chefs.ctah")}</h2><p class="band-p rv">${t("chefs.ctap")}</p></div>
  <div class="rv"><button class="btn btn-light btn-lg trialBtn">${t("chefs.cta")}</button></div>
</div></section>`;

  const track = () => phead("", "track.h", "track.p") + `
<section class="sec sec-tight"><div class="wrap"><div class="narrow">
  <form class="track-form" id="trackForm" novalidate>
    <div class="fld"><label for="tc">${t("track.code")}</label><input id="tc" name="code" dir="ltr" placeholder="KJ-000000-XXXXX" required autocomplete="off"><span class="err"></span></div>
    <div class="fld"><label for="tp">${t("co.phone")}</label><input id="tp" name="phone" type="tel" inputmode="tel" dir="ltr" placeholder="01xxxxxxxxx" required><span class="err"></span></div>
    <button class="btn btn-dark" type="submit">${t("track.btn")}</button>
  </form>
  <div id="trackOut" aria-live="polite"></div>
</div></div></section>`;

  const legal = page => { const d = K.LEGAL[page]; return phead("", page === "privacy" ? "ft.privacy" : "ft.terms", page + ".p") + `
<section class="sec sec-tight"><div class="wrap"><div class="narrow">
  <p class="small" style="margin-bottom:24px">${d.updated[ar ? 0 : 1]}</p>
  ${d[lang].map(([h, p]) => `<section class="legal-sec"><h2>${h}</h2><p>${p}</p></section>`).join("")}
  <section class="legal-sec"><h2>${t("ft.contact")}</h2><p><a class="u" href="mailto:${esc(K.CONFIG.email)}">${esc(K.CONFIG.email)}</a></p></section>
</div></div></section>` };

  const notFound = () => `
<section><div class="wrap nf">
  <h1 class="display" data-split>${t("404.h")}</h1>
  <p>${t("404.p")}</p>
  <div class="hero-ctas"><a class="btn btn-dark btn-lg" href="shop.html">${t("nav.shop")}</a><a class="btn btn-out btn-lg" href="./">${t("nav.home")}</a></div>
</div></section>`;

  /* ---------------- shell ---------------- */
  const top = page => { const here = p => page === p || (page === "product" && p === "shop") || (page === "recipe" && p === "recipes"); return `
<a class="skip" href="#main">${ar ? "انتقل للمحتوى" : "Skip to content"}</a>
<div class="bar" id="bar"><div class="wrap bar-in">${t("bar").map((m, i) => `<span${i ? "" : ' class="on"'}>${m}</span>`).join("")}</div></div>
<header class="hd${page === "home" ? " over" : ""}" id="hd"><div class="wrap hd-in">
  <nav class="hd-nav" aria-label="${ar ? "القائمة الرئيسية" : "Main"}">${NAV.map(([h, k, p]) => `<a href="${h}"${here(p) ? ' class="cur" aria-current="page"' : ""}>${t(k)}</a>`).join("")}</nav>
  <button class="burger" id="burger" aria-label="${t("nav.menu")}" aria-expanded="false" aria-controls="mnav"><i></i><i></i></button>
  <a class="logo" href="./" aria-label="KOJI">KOJI</a>
  <div class="hd-end">
    <button class="lang" id="langBtn" lang="${ar ? "en" : "ar"}">${ar ? "English" : "عربي"}</button>
    <button class="cartbtn" id="cartOpen" aria-label="${t("nav.cart")}">${ICON.bag}<span class="txt">${t("nav.cart")}</span><b class="zero" id="cartCount">0</b></button>
  </div>
</div></header>
<nav class="mnav" id="mnav" aria-label="${t("nav.menu")}">
  ${[["./", "nav.home"], ...NAV, ["track.html", "nav.track"]].map(([h, k], i) => `<a href="${h}" style="--i:${i}">${t(k)}</a>`).join("")}
  <div class="mnav-ft"><a href="mailto:${esc(K.CONFIG.email)}">${esc(K.CONFIG.email)}</a><a href="${esc(K.CONFIG.instagram)}" target="_blank" rel="noopener">Instagram</a></div>
</nav>` };

  const bottom = () => `
<footer class="ft"><div class="wrap">
  <div class="ft-top">
    <div class="ft-cta"><h2 class="h1">${t("hero.h")}</h2><a class="btn btn-light btn-lg" href="shop.html">${t("hero.cta")} ${arrow}</a></div>
    <div class="ft-cols">
      <div><h3>${t("ft.shop")}</h3>${NAV.map(([h, k]) => `<a href="${h}">${t(k)}</a>`).join("")}</div>
      <div><h3>${t("ft.help")}</h3><a href="track.html">${t("nav.track")}</a><a href="story.html#faq">${t("ft.faq")}</a><a href="terms.html">${t("ft.terms")}</a><a href="privacy.html">${t("ft.privacy")}</a></div>
      <div><h3>${t("ft.contact")}</h3><a href="mailto:${esc(K.CONFIG.email)}">${ICON.mail}<span>${esc(K.CONFIG.email)}</span></a><a href="${esc(K.CONFIG.instagram)}" target="_blank" rel="noopener">${ICON.ig}<span>Instagram</span></a><a id="waLink" href="#" target="_blank" rel="noopener" hidden>${ICON.phone}<span>WhatsApp</span></a></div>
    </div>
  </div>
  <div class="ft-mark" aria-hidden="true">KOJI</div>
  <div class="fb"><span>${t("ft.copy")} · ${t("ft.line")}</span><span>${t("ft.illus")}</span></div>
</div></footer>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer" aria-hidden="true" aria-label="${t("cart.h")}" inert>
  <div class="dr-hd"><span>${t("cart.h")}</span><button class="x" data-close aria-label="${ar ? "اقفل" : "Close"}">×</button></div>
  <div class="dr-bd" id="cartBd"></div><div class="dr-ft" id="cartFt"></div>
</aside>
<div class="modal" id="modal" role="dialog" aria-modal="true" aria-hidden="true" inert><div class="mbox" id="mbox"></div></div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>`;

  const main = (page, id) => ({ home, shop, recipes, story, chefs, track, privacy: () => legal("privacy"), terms: () => legal("terms"), 404: notFound,
    product: () => product(id), recipe: () => recipe(id) })[page]();

  const title = (page, id) => page === "product" ? `${L(P[id]).n} — ${brand}` : page === "recipe" ? `${L(R[id]).n} — ${brand}` : t("title." + page);
  const desc = (page, id) => page === "product" ? `${L(P[id]).d} ${L(P[id]).s}.` : page === "recipe" ? `${L(R[id]).b} ${t("r.time")}: ${L(R[id]).t}.` : t("desc." + page);

  return { t, L, num, num2, money, esc, sm, set, arrow, ICON, prodCard, recCard, top, bottom, main, title, desc, purl, rurl };
};
K.UI.esc = esc;
})(window.KOJI);
