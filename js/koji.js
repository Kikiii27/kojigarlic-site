/* KOJI — site configuration.
   The publishable key is meant to be public: every table is protected by row-level security,
   and customers can only call the four storefront functions (get_storefront, place_order,
   request_trial, track_order). Orders are readable only by signed-in team members in public.admins. */
window.KOJI = window.KOJI || {};
KOJI.CONFIG = {
  supabaseUrl: "https://heaogqiogjrcrwuypnlw.supabase.co",
  supabaseKey: "sb_publishable_zqyOb1wzX0Ns6lmoMTqbMg_TrHPvKlw",
  email: "orders@kojigarlic.shop",
  instagram: "https://instagram.com/koji.garlic",
  // WhatsApp, accepting orders, pre-order mode, delivery fees, InstaPay / Vodafone Cash numbers:
  // all edited live from the dashboard (admin.html → الإعدادات), not here.
};
;
/* KOJI — content (both languages). Prices/availability come live from Supabase (products table);
   the prices here are only a fallback if the API is unreachable.
   Price source: 06_BUSINESS/02_MARKET_AND_PRICING/KOJI_BLACK_GARLIC_PRICE_SURVEY_2026-10-03.md (v28). */
window.KOJI = window.KOJI || {};

KOJI.CITIES = [
  ["cairo", "القاهرة", "Cairo"], ["giza", "الجيزة", "Giza"], ["alex", "الإسكندرية", "Alexandria"],
  ["qalyubia", "القليوبية", "Qalyubia"], ["sharqia", "الشرقية", "Sharqia"], ["dakahlia", "الدقهلية", "Dakahlia"],
  ["gharbia", "الغربية", "Gharbia"], ["monufia", "المنوفية", "Monufia"], ["beheira", "البحيرة", "Beheira"],
  ["other", "محافظة تانية", "Other governorate"],
];
KOJI.KG = [["lt_half", "أقل من نص كيلو", "Under 0.5 kg"], ["half_1", "من نص كيلو لكيلو", "0.5–1 kg"], ["1_3", "من ١ لـ٣ كيلو", "1–3 kg"], ["gt_3", "أكتر من ٣ كيلو", "Over 3 kg"], ["unknown", "مش عارف لسه", "Not sure yet"]];
KOJI.STATUS = {
  new: ["استلمنا طلبك", "Order received"], confirmed: ["اتأكد", "Confirmed"], out_for_delivery: ["خرج للتوصيل", "Out for delivery"],
  delivered: ["اتسلّم", "Delivered"], cancelled: ["اتلغى", "Cancelled"],
};

KOJI.T = {
ar:{
  "title.home":"كوجي — ثوم أسود متعتّق في مصر","title.shop":"المتجر — كوجي","title.recipes":"وصفات — كوجي","title.story":"الحكاية — كوجي","title.chefs":"للمطاعم — كوجي","title.track":"تتبّع طلبك — كوجي","title.privacy":"الخصوصية — كوجي","title.terms":"الشروط والتوصيل — كوجي","title.404":"الصفحة مش موجودة — كوجي",
  "bar":["طلب مسبق: بنأكد ميعاد التسليم قبل أي دفع","مكوّن واحد · ٢١ يوم · من غير إضافات","صنع في مصر"],
  "nav.shop":"المتجر","nav.story":"الحكاية","nav.recipes":"وصفات","nav.chefs":"للمطاعم","nav.cart":"السلة","nav.home":"الرئيسية","nav.track":"تتبّع طلبك",
  "loader":"بنعتّق","scroll":"انزل",
  "hero.h":"ثوم،<br><i>اديناله وقته.</i>","hero.p":"ثوم مصري بيتعتّق ٢١ يوم لحد ما يسودّ ويطرى، ويبقى طعمه حلو ومالح زي البلسميك.","hero.cta":"تسوّق",
  "mani.big":"مكوّن واحد. ٢١ يوم. ولا حاجة تانية. الحرارة الهادية بتخلّي السكر والبروتين اللي في الثوم يتفاعلوا ببطء، فالحدة بتروح، ويفضل طعم عميق مالوش اسم في المطبخ المصري لسه.",
  "mani.sub":"بنعتّق على دفعات صغيرة. من غير تخمير، ولا سكر مضاف، ولا مواد حافظة. وقت وحرارة هادية وبس.",
  "mani.cta":"اعرف الحكاية",
  "label.h":"على العبوة","label.ing":"المكوّنات","label.ingv":"ثوم ١٠٠٪","label.aged":"مدة التعتيق","label.agedv":"٢١ يوم","label.origin":"المنشأ","label.originv":"مصر","label.sugar":"سكر مضاف","label.pres":"مواد حافظة","label.none":"مفيش","label.keep":"الحفظ","label.keepv":"مكان بارد وناشف",
  "days.k":"٢١ يوم في دقيقة سكرول","days.unit":"يوم",
  "d0.h":"ثوم مصري طازج","d0.p":"بصل كامل، أبيض وحاد زي أي ثوم.",
  "d1.h":"بيبدأ يغمق","d1.p":"الفص بياخد لون عسلي، والحدة بتبدأ تهدى.",
  "d2.h":"الحلاوة بتطلع","d2.p":"بني غامق، وطعم كراميل وفواكه مجففة.",
  "d3.h":"أسود وطري","d3.p":"طري زي التمر. حلو ومالح، وفيه حموضة خفيفة.",
  "hero.what":"يعني إيه ثوم أسود؟","about.k":"إيه هو","about.h":"ثوم مصري،<br><i>اتعتّق ٢١ يوم.</i>","pts.1b":"١","pts.1":"مكوّن واحد: ثوم","pts.2b":"٢١","pts.2":"يوم تعتيق على حرارة هادية","pts.3b":"٠","pts.3":"سكر مضاف أو مواد حافظة",
  "home.range":"منتجاتنا","home.all":"كل المنتجات",
  "shop.h":"منتجاتنا","shop.p":"فصوص، ومعجون، وبصل كامل. كله من دفعات صغيرة، ومن غير أي إضافات.",
  "f.all":"الكل","f.kitchen":"للمطبخ","f.gift":"هدايا","f.daily":"يومي",
  "shop.note":"مصاريف التوصيل بتتحدد حسب العنوان، وبنأكدها معاك قبل أي دفع",
  "add":"أضف للسلة","added":"اتضاف ✓","view":"شوف","soldout":"خلصت الكمية",
  "taste.k":"بروفايل الطعم","taste.h":"مش ثوم.<br>ومش حلو.","taste.p":"أقرب حاجة ليه تمرة فيها لمسة بلسميك وصويا. طري ومطاطي، وبيدوب في الصوص السخن.",
  "taste.black":"ثوم أسود","taste.fresh":"ثوم طازج","taste.note":"تقدير من تذوقنا للثوم الأسود، مش قياس معملي.",
  "fact.sweet":"حلاوة","fact.umami":"أومامي","fact.bals":"بلسمي","fact.acid":"حموضة","fact.bite":"حدّة",
  "ways.h":"تلات طرق تبدأ بيها",
  "w1.h":"افرده","w1.p":"اهرس فص على توست أو مع جبنة، أو استخدم المعجون على طول.","w1.d":"فص واحد · حوالي ٢ جم",
  "w2.h":"دوّبه","w2.p":"في صوص سخن، أو مكرونة، أو زبدة على ستيك طالع من على النار.","w2.d":"٢–٣ فصوص",
  "w3.h":"اخفقه","w3.p":"مع مايونيز، أو طحينة، أو عسل وصويا يبقى جليز.","w3.d":"معلقة صغيرة معجون",
  "rec.h":"وصفات","rec.k":"من المطبخ المصري","rec.all":"كل الوصفات","rec.p":"وصفات بسيطة بحاجات موجودة في أي مطبخ مصري. اختار واحدة واطبخها النهارده.",
  "rc.all":"الكل","rc.breakfast":"فطار","rc.main":"أطباق رئيسية","rc.sauce":"صوصات وتتبيلات",
  "r.ing":"المكوّنات","r.steps":"الطريقة","r.time":"الوقت","r.serves":"يكفي","r.uses":"بيستخدم","r.next":"الوصفة الجاية","r.tick":"علّم على اللي جهزته",
  "chefs.k":"للمطاعم والشيفات","chefs.h":"بالكيلو،<br><i>لمطبخك.</i>","chefs.p":"فصوص مقشّرة في كيس حاجز، ومعجون، وبصل كامل. دي أسعار الكيلو، وبنأكد السعر النهائي والكميات مع أول طلب.",
  "chefs.l1":"عينة لطبق واحد قبل أول طلب","chefs.l2":"فصوص مقشّرة، من غير وقت تحضير ولا هدر","chefs.l3":"الكميات ومواعيد التوريد بنتفق عليها مع كل مطبخ","chefs.cta":"اطلب عينة","chefs.req":"اطلب","chefs.more":"صفحة المطاعم",
  "chefs.ph":"بالكيلو، لمطبخك.","chefs.pp":"بنشتغل مع المطابخ بنفس طريقة الشيف: نجرّب في طبق حقيقي، ونقارن، والطبق هو اللي يقرر.",
  "chefs.price":"أسعار الكيلو","chefs.how":"إزاي بنبدأ","chefs.ctah":"جرّبه في طبق<br><i>من المنيو بتاعك.</i>","chefs.ctap":"بنبعتلك عينة، تقارنها بالطبق العادي، وإنت تقرر.",
  "s1.h":"نختار الطبق","s1.p":"وصفة موجودة عندك، وفرصة نكهة محددة.","s2.h":"نحدد المقارنة","s2.p":"المورد الحالي أو طريقتك الحالية.","s3.h":"نجرّب كميتين","s3.p":"٢ جم و٥ جم في نفس الطبق: الطعم، والقوام، وسهولة الاستخدام.","s4.h":"إنت تقرر","s4.p":"ترفض، أو نعدّل، أو نبدأ طلب تجاري.",
  "story.h":"الحكاية","story.p":"تلات شركا، وغرفة تعتيق صممناها بنفسنا، وسؤال واحد: ليه الثوم الأسود مش في مطبخنا؟",
  "story.big":"الثوم الأسود مكوّن معروف في كوريا واليابان من سنين. ومصر من أكبر الدول المنتجة للثوم في العالم، ومع ذلك لسه مش موجود في أغلب المطابخ المصرية. فقررنا نعتّقه هنا.",
  "story.vh":"اللي ماشيين عليه",
  "v1.h":"مكوّن واحد","v1.p":"ثوم وبس. مفيش سكر، ولا مواد حافظة، ولا ألوان.","v2.h":"كل دفعة ليها رقم","v2.p":"بنسجّل كل دفعة، ورقمها بيتكتب على العبوة، عشان أي ملاحظة توصل لمصدرها.","v3.h":"صنع في مصر","v3.p":"ثوم مصري، وغرفة تعتيق من تصميمنا بتتصنع في ورشة مصرية.","v4.h":"أكل، مش علاج","v4.p":"مش هنقول ادعاءات صحية من غير دليل على منتجنا نفسه.",
  "faq.h":"أسئلة",
  "cta.h":"جرّبه في<br><i>طبق واحد.</i>","cta.p":"ابدأ ببرطمان فصوص، وجرّبه في أي طبق بتحط فيه ثوم أو صويا أو بلسميك.","cta.btn":"تسوّق الفصوص",
  "pdp.pair":"اطبخ بيه","pdp.more":"منتجات تانية","pdp.use":"إزاي تستخدمه","pdp.keep":"الحفظ","pdp.ship":"التوصيل والدفع",
  "pdp.shipv":"القاهرة والجيزة الأول. مصاريف التوصيل بتتحدد حسب العنوان، وبنقولهالك قبل التأكيد. الدفع كاش عند الاستلام، أو إنستاباي، أو فودافون كاش، ومفيش أي دفع قبل ما نأكد ميعاد التسليم.",
  "pd.pack":"العبوة","pd.ing":"المكوّنات","pd.ingv":"ثوم ١٠٠٪","pd.use":"بيتاكل مع",
  "ft.line":"ثوم أسود بيتعتّق في مصر، دفعة دفعة.","ft.shop":"المتجر","ft.help":"مساعدة","ft.faq":"أسئلة شائعة","ft.contact":"تواصل","ft.privacy":"الخصوصية","ft.terms":"الشروط والتوصيل",
  "ft.copy":"© ٢٠٢٦ كوجي","ft.illus":"بعض الصور توضيحية لحد ما نصوّر دفعاتنا",
  "cart.h":"سلتك","cart.empty":"السلة فاضية","cart.emptyp":"ابدأ ببرطمان فصوص.","cart.go":"روح للمتجر","cart.items":"المنتجات","cart.ship":"التوصيل","cart.shipv":"بيتحدد حسب العنوان","cart.total":"الإجمالي","cart.co":"كمّل الطلب","cart.rm":"شيل","cart.closed":"الطلبات مقفولة مؤقتًا. جرّب تاني قريب.",
  "co.k":"إتمام الطلب","co.h":"آخر خطوة","co.p":"ده طلب مسبق: هنكلمك نأكد ميعاد التسليم ومصاريف التوصيل قبل أي دفع.","co.pnp":"هنكلمك نأكد الطلب ومصاريف التوصيل قبل التسليم.",
  "co.tk":"عينة للمطاعم","co.th":"جرّب كوجي في مطبخك","co.tp":"قولّنا المطعم والطبق، وهنتواصل معاك نحدد ميعاد العينة.",
  "co.name":"الاسم","co.phone":"رقم الموبايل","co.city":"المحافظة","co.area":"المنطقة","co.addr":"العنوان بالتفصيل","co.addrph":"الشارع، رقم العمارة، الدور، الشقة","co.venue":"المطعم","co.role":"دورك","co.dish":"الطبق اللي عايز تجرّبه فيه","co.product":"المنتج","co.anyproduct":"مش متأكد","co.kg":"تتوقع تستخدم كام في الشهر؟","co.notes":"ملاحظات (اختياري)","co.pay":"طريقة الدفع",
  "co.cod":"كاش عند الاستلام","co.codd":"بتدفع للمندوب","co.insta":"إنستاباي","co.instad":"بنبعتلك بيانات التحويل بعد التأكيد","co.vf":"فودافون كاش","co.vfd":"بنبعتلك الرقم بعد التأكيد",
  "co.sum":"الإجمالي (من غير التوصيل)","co.fee":"التوصيل","co.submit":"أكّد الطلب","co.tsubmit":"ابعت الطلب","co.sending":"بنبعت...","co.consent":"بالضغط على تأكيد إنت موافق على","co.terms":"الشروط","co.and":"و","co.privacy":"سياسة الخصوصية",
  "co.req":"مطلوب","co.badphone":"رقم موبايل مصري غير صحيح",
  "err.closed":"الطلبات مقفولة مؤقتًا.","err.bad_phone":"رقم الموبايل مش صحيح.","err.bad_name":"اكتب اسمك.","err.bad_address":"اكتب العنوان بالتفصيل.","err.bad_venue":"اكتب اسم المطعم.","err.bad_product":"منتج في السلة مبقاش متاح. شيله وجرّب تاني.","err.rate_limited":"بعتّ طلبات كتير من نفس الرقم. استنى شوية وجرّب تاني.","err.network":"مقدرناش نوصل للسيرفر. اتأكد من النت وجرّب تاني.","err.generic":"حصلت مشكلة. جرّب تاني.",
  "done.h":"طلبك وصلنا","done.th":"طلبك وصلنا","done.code":"رقم الطلب","done.p":"هنكلمك على","done.p2":"خلال يوم عمل، نأكد ميعاد التسليم ومصاريف التوصيل. احتفظ برقم الطلب عشان تتابعه.","done.tp":"هنكلمك نحدد ميعاد العينة.","done.track":"تتبّع الطلب","done.more":"كمّل تسوّق","done.ok":"تمام",
  "track.h":"تتبّع طلبك","track.p":"اكتب رقم الطلب ورقم الموبايل اللي طلبت بيه.","track.code":"رقم الطلب","track.btn":"تتبّع","track.nf":"مالقيناش طلب بالبيانات دي. اتأكد من رقم الطلب ورقم الموبايل.","track.fee":"التوصيل","track.feetbd":"بيتحدد","track.total":"الإجمالي","track.payto":"حوّل على","track.placed":"اتطلب",
  "roles":["شيف","صاحب المطعم / مدير","مشتريات","غير كده"],
  "toast.add":"اتضاف للسلة",
  "privacy.p":"إيه اللي بنجمعه لما تطلب، وبنستخدمه في إيه، ومين يقدر يشوفه.","terms.p":"الطلب المسبق، والأسعار، والتوصيل، والدفع، والإلغاء، والاسترجاع.",
  "404.h":"الصفحة دي<br><i>مش موجودة.</i>","404.p":"يمكن اللينك اتغيّر. جرّب المتجر أو الرئيسية.",
  
  "desc.home":"ثوم مصري متعتّق ٢١ يوم لحد ما يسودّ ويطرى. فصوص ومعجون وبصل كامل، مكوّن واحد ومن غير إضافات. اطلب أونلاين، ومفيش دفع قبل التأكيد.",
  "desc.shop":"فصوص ثوم أسود، ومعجون، وبصل كامل، وطقم هدية. ثوم مصري متعتّق ٢١ يوم، من غير سكر مضاف ولا مواد حافظة.",
  "desc.recipes":"وصفات بسيطة بالثوم الأسود من المطبخ المصري: طحينة، ومكرونة وايت صوص، وفراخ في الفرن، وتوست بالجبنة.",
  "desc.story":"تلات شركا، وغرفة تعتيق صممناها بنفسنا، وسؤال واحد: ليه الثوم الأسود مش في مطبخنا؟",
  "desc.chefs":"ثوم أسود بالكيلو للمطاعم في مصر: فصوص مقشّرة، ومعجون، وبصل كامل. اطلب عينة لطبق واحد قبل أول طلب.",
  "desc.track":"تابع طلبك من كوجي برقم الطلب ورقم الموبايل.","desc.privacy":"إيه اللي بنجمعه لما تطلب من كوجي، وبنستخدمه في إيه.","desc.terms":"الطلب المسبق، والأسعار، والتوصيل، والدفع، والإلغاء، والاسترجاع في كوجي.","desc.404":"الصفحة دي مش موجودة.",
  "soon":"متاح قريبًا","bar.closed":"الطلبات هتفتح قريب، والمطاعم تقدر تطلب عينة دلوقتي",
  "nav.menu":"القائمة","kick.hero":"ثوم أسود · متعتّق في مصر",
  "mq":["مكوّن واحد","٢١ يوم تعتيق","من غير سكر مضاف","من غير مواد حافظة","ثوم مصري","دفعات صغيرة"],
  "shop.k":"المتجر","about.not.h":"مش مخمّر، ولا فيه فطر.","about.not.p":"اللون الأسود من تفاعل ميلارد: السكر والبروتين اللي في الثوم بيتفاعلوا ببطء مع الحرارة الهادية، زي العيش لما يتحمّص.",
  "days.h":"من أبيض لأسود في ٢١ يوم","days.day":"يوم",
  "ways.k":"إزاي تستخدمه","rec.home":"وصفات من<br><i>المطبخ المصري.</i>",
  "pr.k":"إزاي بنشتغل","pr.h":"اطلب وإنت مطمّن.",
  "pr1.h":"مفيش دفع قبل التأكيد","pr1.p":"بنكلمك نأكد ميعاد التسليم ومصاريف التوصيل الأول.",
  "pr2.h":"ادفع زي ما تحب","pr2.p":"كاش عند الاستلام، أو إنستاباي، أو فودافون كاش.",
  "pr3.h":"مكوّن واحد","pr3.p":"ثوم ١٠٠٪. من غير سكر مضاف ولا مواد حافظة.",
  "pr4.h":"تابع طلبك","pr4.p":"برقم الطلب ورقم موبايلك، في أي وقت.",
  "guide.k":"مش عارف تختار؟","guide.h":"فصوص، ولا معجون،<br><i>ولا بصل كامل؟</i>",
  "g.cloves":"للتقطيع والأكل زي ما هو. أسهل بداية.","g.paste":"بيتخلط في الصوصات والتتبيلات من غير هرس.","g.bulbs":"للتقديم والهدايا. بتقشّره وقت ما تحتاجه.",
  "pdp.badges":["ثوم ١٠٠٪","٢١ يوم تعتيق","من غير إضافات"],"pdp.pre":"طلب مسبق: بنأكد معاك قبل أي دفع","pdp.photo":"صورة",
  "story.team.h":"مين إحنا","story.team.p":"تلات شركا درسنا هندسة كيميائية. بنعتّق الثوم بنفس الطريقة اللي اتعلمنا نشتغل بيها: نقيس، ونسجّل، ونجرّب تاني لحد ما الطعم يبقى مظبوط.",
  "cart.up":"ضيف معاه","cart.note":"مفيش دفع دلوقتي. هنكلمك نأكد الأول.",
},
en:{
  "title.home":"KOJI — Black Garlic, Aged in Egypt","title.shop":"Shop — KOJI","title.recipes":"Recipes — KOJI","title.story":"Our Story — KOJI","title.chefs":"For Chefs — KOJI","title.track":"Track your order — KOJI","title.privacy":"Privacy — KOJI","title.terms":"Terms & Delivery — KOJI","title.404":"Page not found — KOJI",
  "bar":["Pre-order: we confirm delivery before any payment","One ingredient · 21 days · nothing added","Made in Egypt"],
  "nav.shop":"Shop","nav.story":"Story","nav.recipes":"Recipes","nav.chefs":"For Chefs","nav.cart":"Bag","nav.home":"Home","nav.track":"Track order",
  "loader":"Ageing","scroll":"Scroll",
  "hero.h":"Garlic,<br><i>given time.</i>","hero.p":"Egyptian garlic, aged for 21 days until it turns black, soft and sweet-savory, like balsamic.","hero.cta":"Shop the range",
  "mani.big":"One ingredient. Twenty-one days. Nothing else. Gentle heat lets the garlic's own sugars and amino acids react slowly; the bite fades, and what's left is a depth the pantry has no other word for.",
  "mani.sub":"Aged in small lots. No fermentation, no added sugar, no preservatives. Just time and gentle heat.",
  "mani.cta":"Read our story",
  "label.h":"On the label","label.ing":"Ingredients","label.ingv":"Garlic, 100%","label.aged":"Aged","label.agedv":"21 days","label.origin":"Origin","label.originv":"Egypt","label.sugar":"Added sugar","label.pres":"Preservatives","label.none":"None","label.keep":"Storage","label.keepv":"Cool, dry place",
  "days.k":"21 days in one scroll","days.unit":"days",
  "d0.h":"Fresh Egyptian garlic","d0.p":"Whole bulbs, white and sharp like any garlic.",
  "d1.h":"It starts to darken","d1.p":"The cloves turn honey-coloured and the bite begins to soften.",
  "d2.h":"Sweetness arrives","d2.p":"Deep brown, with notes of caramel and dried fruit.",
  "d3.h":"Black and tender","d3.p":"Soft like a date. Sweet, savory, gently tart.",
  "hero.what":"What is black garlic?","about.k":"What it is","about.h":"Egyptian garlic,<br><i>aged 21 days.</i>","pts.1b":"1","pts.1":"ingredient: garlic","pts.2b":"21","pts.2":"days of gentle ageing","pts.3b":"0","pts.3":"added sugar or preservatives",
  "home.range":"Our products","home.all":"All products",
  "shop.h":"Our products","shop.p":"Cloves, paste and whole bulbs. All from small lots, with nothing added.",
  "f.all":"All","f.kitchen":"Kitchen","f.gift":"Gifts","f.daily":"Daily",
  "shop.note":"Delivery is quoted by address and confirmed with you before any payment",
  "add":"Add to bag","added":"Added ✓","view":"View","soldout":"Sold out",
  "taste.k":"Flavor profile","taste.h":"Not garlic.<br>Not sweet.","taste.p":"Closest to a date with a touch of balsamic and soy. Soft and chewy, and it melts into a hot sauce.",
  "taste.black":"Black garlic","taste.fresh":"Fresh garlic","taste.note":"Our tasting estimate for black garlic, not a lab measurement.",
  "fact.sweet":"Sweetness","fact.umami":"Umami","fact.bals":"Balsamic","fact.acid":"Acidity","fact.bite":"Bite",
  "ways.h":"Three ways in",
  "w1.h":"Spread","w1.p":"Mash a clove onto toast or with cheese, or use the paste straight.","w1.d":"1 clove · about 2 g",
  "w2.h":"Melt","w2.p":"Into a hot sauce, a pasta, or butter on a steak straight off the heat.","w2.d":"2–3 cloves",
  "w3.h":"Whisk","w3.p":"With mayonnaise, tahini, or honey and soy for a glaze.","w3.d":"1 tsp paste",
  "rec.h":"Recipes","rec.k":"From the Egyptian kitchen","rec.all":"All recipes","rec.p":"Simple recipes from an everyday Egyptian pantry. Pick one and cook it tonight.",
  "rc.all":"All","rc.breakfast":"Breakfast","rc.main":"Mains","rc.sauce":"Sauces & dressings",
  "r.ing":"Ingredients","r.steps":"Method","r.time":"Time","r.serves":"Serves","r.uses":"Uses","r.next":"Next recipe","r.tick":"Tick off what you've prepped",
  "chefs.k":"For restaurants","chefs.h":"By the kilo,<br><i>for your line.</i>","chefs.p":"Peeled cloves in barrier bags, paste and whole bulbs. Prices per kilo; we confirm final pricing and volumes with your first order.",
  "chefs.l1":"A one-dish trial before your first order","chefs.l2":"Peeled cloves: no prep time, no waste","chefs.l3":"Volumes and delivery schedule agreed with each kitchen","chefs.cta":"Request a trial","chefs.req":"Request","chefs.more":"For chefs",
  "chefs.ph":"By the kilo, for your line.","chefs.pp":"We work with kitchens the way chefs do: test it in a real dish, compare, and let the plate decide.",
  "chefs.price":"Kilo prices","chefs.how":"How we start","chefs.ctah":"Test it in a dish<br><i>already on your menu.</i>","chefs.ctap":"We send a sample, you compare it with the usual plate, and you decide.",
  "s1.h":"Pick the dish","s1.p":"A recipe already on your menu, and one flavor opportunity.","s2.h":"Set the benchmark","s2.p":"Your current supplier or in-house method.","s3.h":"Test two doses","s3.p":"2 g and 5 g in the same dish: taste, texture and handling.","s4.h":"You decide","s4.p":"Reject, revise, or start a commercial order.",
  "story.h":"Our story","story.p":"Three partners, an ageing chamber we designed ourselves, and one question: why isn't black garlic in our kitchens?",
  "story.big":"Black garlic has been a staple in Korea and Japan for years. Egypt is one of the world's largest garlic producers, yet black garlic is still missing from most Egyptian kitchens. So we decided to age it here.",
  "story.vh":"What we hold to",
  "v1.h":"One ingredient","v1.p":"Garlic. No sugar, no preservatives, no colour.","v2.h":"Every lot numbered","v2.p":"We record every lot and print its number on the pack, so any feedback reaches its source.","v3.h":"Made in Egypt","v3.p":"Egyptian garlic, and an ageing chamber of our own design, built in an Egyptian workshop.","v4.h":"Food, not medicine","v4.p":"No health claims without evidence on our own product.",
  "faq.h":"Questions",
  "cta.h":"Try it in<br><i>one dish.</i>","cta.p":"Start with a jar of cloves and try it anywhere you'd reach for garlic, soy or balsamic.","cta.btn":"Shop the cloves",
  "pdp.pair":"Cook it in","pdp.more":"More from KOJI","pdp.use":"How to use it","pdp.keep":"Storage","pdp.ship":"Delivery & payment",
  "pdp.shipv":"Cairo and Giza first. Delivery is quoted by address and confirmed before you commit. Cash on delivery, InstaPay or Vodafone Cash, and no payment before we confirm your delivery date.",
  "pd.pack":"Pack","pd.ing":"Ingredients","pd.ingv":"Garlic, 100%","pd.use":"Use with",
  "ft.line":"Black garlic, aged in Egypt, one lot at a time.","ft.shop":"Shop","ft.help":"Help","ft.faq":"FAQ","ft.contact":"Contact","ft.privacy":"Privacy","ft.terms":"Terms & delivery",
  "ft.copy":"© 2026 KOJI","ft.illus":"Some images are illustrative until we photograph our own lots",
  "cart.h":"Your bag","cart.empty":"Your bag is empty","cart.emptyp":"Start with a jar of cloves.","cart.go":"Go to the shop","cart.items":"Subtotal","cart.ship":"Delivery","cart.shipv":"Quoted by address","cart.total":"Total","cart.co":"Checkout","cart.rm":"Remove","cart.closed":"Orders are paused for now. Please check back soon.",
  "co.k":"Checkout","co.h":"Almost there","co.p":"This is a pre-order: we'll call to confirm the delivery date and fee before any payment.","co.pnp":"We'll call to confirm your order and delivery fee before delivery.",
  "co.tk":"Restaurant trial","co.th":"Try KOJI on your line","co.tp":"Tell us the restaurant and the dish, and we'll set up a trial.",
  "co.name":"Name","co.phone":"Mobile","co.city":"Governorate","co.area":"Area","co.addr":"Full address","co.addrph":"Street, building, floor, flat","co.venue":"Restaurant","co.role":"Your role","co.dish":"Dish you'd like to test it in","co.product":"Product","co.anyproduct":"Not sure","co.kg":"How much would you use per month?","co.notes":"Notes (optional)","co.pay":"Payment",
  "co.cod":"Cash on delivery","co.codd":"Pay the courier","co.insta":"InstaPay","co.instad":"Transfer details sent after confirmation","co.vf":"Vodafone Cash","co.vfd":"Number sent after confirmation",
  "co.sum":"Total (before delivery)","co.fee":"Delivery","co.submit":"Place order","co.tsubmit":"Send request","co.sending":"Sending...","co.consent":"By placing the order you agree to our","co.terms":"terms","co.and":"and","co.privacy":"privacy policy",
  "co.req":"Required","co.badphone":"Enter a valid Egyptian mobile number",
  "err.closed":"Orders are paused for now.","err.bad_phone":"That mobile number isn't valid.","err.bad_name":"Please enter your name.","err.bad_address":"Please enter your full address.","err.bad_venue":"Please enter the restaurant name.","err.bad_product":"An item in your bag is no longer available. Remove it and try again.","err.rate_limited":"Too many orders from this number. Please wait a little and try again.","err.network":"We couldn't reach the server. Check your connection and try again.","err.generic":"Something went wrong. Please try again.",
  "done.h":"Order received","done.th":"Request received","done.code":"Order number","done.p":"We'll call you on","done.p2":"within one working day to confirm the delivery date and fee. Keep your order number to track it.","done.tp":"We'll call you to schedule the trial.","done.track":"Track order","done.more":"Keep shopping","done.ok":"Done",
  "track.h":"Track your order","track.p":"Enter your order number and the mobile you ordered with.","track.code":"Order number","track.btn":"Track","track.nf":"We couldn't find an order with those details. Check the order number and mobile.","track.fee":"Delivery","track.feetbd":"To be confirmed","track.total":"Total","track.payto":"Transfer to","track.placed":"Placed",
  "roles":["Chef","Owner / GM","Purchasing","Other"],
  "toast.add":"Added to bag",
  "privacy.p":"What we collect when you order, what we use it for, and who can see it.","terms.p":"Pre-orders, prices, delivery, payment, cancellation and returns.",
  "404.h":"This page<br><i>doesn't exist.</i>","404.p":"The link may have changed. Try the shop or the home page.",
  
  "desc.home":"Egyptian garlic aged 21 days until it turns black and soft. Cloves, paste and whole bulbs: one ingredient, nothing added. Order online; no payment before we confirm.",
  "desc.shop":"Black garlic cloves, paste, whole bulbs and a gift set. Egyptian garlic aged 21 days, with no added sugar or preservatives.",
  "desc.recipes":"Simple black garlic recipes from the Egyptian kitchen: tahini, white-sauce pasta, oven chicken and cheese toast.",
  "desc.story":"Three partners, an ageing chamber we designed ourselves, and one question: why isn't black garlic in our kitchens?",
  "desc.chefs":"Black garlic by the kilo for restaurants in Egypt: peeled cloves, paste and whole bulbs. Request a one-dish trial before your first order.",
  "desc.track":"Track your KOJI order with your order number and mobile.","desc.privacy":"What KOJI collects when you order, and how it is used.","desc.terms":"Pre-orders, prices, delivery, payment, cancellation and returns at KOJI.","desc.404":"This page doesn't exist.",
  "soon":"Coming soon","bar.closed":"Orders open soon. Restaurants can request a sample now",
  "nav.menu":"Menu","kick.hero":"Black garlic · Aged in Egypt",
  "mq":["One ingredient","Aged 21 days","No added sugar","No preservatives","Egyptian garlic","Small lots"],
  "shop.k":"The shop","about.not.h":"Not fermented. No mould.","about.not.p":"The colour comes from the Maillard reaction: the garlic's own sugars and amino acids react slowly under gentle heat, the way bread browns into toast.",
  "days.h":"White to black in 21 days","days.day":"Day",
  "ways.k":"How to use it","rec.home":"Recipes from<br><i>the Egyptian kitchen.</i>",
  "pr.k":"How ordering works","pr.h":"Order with confidence.",
  "pr1.h":"No payment before we confirm","pr1.p":"We call to confirm the delivery date and fee first.",
  "pr2.h":"Pay your way","pr2.p":"Cash on delivery, InstaPay or Vodafone Cash.",
  "pr3.h":"One ingredient","pr3.p":"100% garlic. No added sugar or preservatives.",
  "pr4.h":"Track your order","pr4.p":"With your order number and mobile, any time.",
  "guide.k":"Not sure where to start?","guide.h":"Cloves, paste,<br><i>or whole bulbs?</i>",
  "g.cloves":"To slice or eat as is. The easiest start.","g.paste":"Stirs into sauces and marinades, no mashing.","g.bulbs":"For serving and gifting. Peel as you go.",
  "pdp.badges":["100% garlic","Aged 21 days","Nothing added"],"pdp.pre":"Pre-order: we confirm with you before any payment","pdp.photo":"Photo",
  "story.team.h":"Who we are","story.team.p":"Three partners who studied chemical engineering. We age garlic the way we were taught to work: measure, record, and try again until the taste is right.",
  "cart.up":"Pairs well with","cart.note":"Nothing to pay now. We'll call to confirm first.",
}};

KOJI.PRODUCTS = [
  {id:"cloves-100",slug:"black-garlic-cloves",gal:["assets/shot-cloves.webp","assets/shot-macro.webp"],cat:["kitchen","gift"],bg:"#3a2230",img:"assets/shot-cloves.webp",price:425,pair:["toast","pasta","butter"],
   ar:{n:"فصوص ثوم أسود",s:"برطمان إزاز · ١٠٠ جم",tag:"ابدأ بيه",d:"فصوص مقشّرة جاهزة للأكل في برطمان إزاز بغطا بامبو. الشكل اللي بيبدأ بيه أغلب الناس: تقطّعه، أو تهرسه، أو تاكله زي ما هو.",u:"توست بالجبنة، مكرونة، زبدة",k:"مكان بارد وناشف. بعد الفتح في التلاجة.",how:"قطّع فص وحطه على توست بجبنة، أو اهرس ٣ فصوص في زبدة طرية، أو دوّبهم في صوص سخن آخر دقيقة."},
   en:{n:"Black Garlic Cloves",s:"Glass jar · 100 g",tag:"Start here",d:"Peeled, ready-to-eat cloves in a glass jar with a bamboo lid. Where most people start: slice it, mash it, or eat it as is.",u:"Cheese toast, pasta, butter",k:"Cool, dry place. Refrigerate after opening.",how:"Slice a clove onto toast with cheese, mash three into soft butter, or melt them into a hot sauce at the last minute."}},
  {id:"paste-100",slug:"black-garlic-paste",gal:["assets/shot-paste.webp","assets/shot-macro.webp"],cat:["kitchen"],bg:"#1d1714",img:"assets/shot-paste.webp",price:375,pair:["tahini","chicken","salad"],
   ar:{n:"معجون ثوم أسود",s:"برطمان إزاز · ١٠٠ جم",d:"ثوم أسود مهروس ناعم من غير أي إضافات. أسرع طريقة تدخّله في الأكل.",u:"طحينة، تتبيلة فراخ، سلطة",k:"في التلاجة بعد الفتح، واستخدم معلقة نضيفة.",how:"معلقة صغيرة في الطحينة، أو في تتبيلة الفراخ قبل الفرن، أو في صوص المكرونة."},
   en:{n:"Black Garlic Paste",s:"Glass jar · 100 g",d:"Smooth black garlic, nothing added. The fastest way into any dish.",u:"Tahini, chicken marinades, salads",k:"Refrigerate after opening; use a clean spoon.",how:"A teaspoon in tahini sauce, in a chicken marinade before roasting, or in a pasta sauce."}},
  {id:"bulbs-2",slug:"whole-black-garlic",gal:["assets/shot-bulbs.webp","assets/shot-macro.webp"],cat:["kitchen","gift"],bg:"#e8dfcf",img:"assets/shot-bulbs.webp",price:350,pair:["toast","butter","tahini"],
   ar:{n:"بصلتين كاملتين",s:"برطمان إزاز · حوالي ١٢٠ جم",d:"بصلتين بقشرهم. بتقشّر الفص وقت ما تحتاجه، وشكلهم حلو على السفرة.",u:"طبق جبن، تقديم، هدية",k:"مكان بارد وناشف.",how:"قشّر الفص وقت ما تحتاجه. حطّ بصلة مقطوعة نصين على طبق الجبن، وسيب الضيوف ياخدوا بنفسهم."},
   en:{n:"Two Whole Bulbs",s:"Glass jar · approx. 120 g",d:"Two bulbs in their skins. Peel cloves as you need them; beautiful on the table.",u:"Cheese boards, serving, gifting",k:"Cool, dry place.",how:"Peel cloves as you need them. Halve a bulb on a cheese board and let guests help themselves."}},
  {id:"gift-set",slug:"gift-set",gal:["assets/shot-gift.webp","assets/shot-cloves.webp","assets/shot-bulbs.webp"],cat:["gift"],bg:"#4f5236",img:"assets/shot-gift.webp",price:775,pair:["toast","pasta","chicken"],
   ar:{n:"طقم الهدية",s:"فصوص ١٠٠ جم + بصلتين · شنطة كرافت",tag:"هدية",d:"برطمانين في شنطة كرافت بيد حبل: واحد فصوص وواحد بصل كامل. لحد بيحب الأكل.",u:"هدية",k:"مكان بارد وناشف.",how:"الفصوص للطبخ، والبصل للتقديم."},
   en:{n:"The Gift Pair",s:"Cloves 100 g + two bulbs · kraft bag",tag:"Gift",d:"Two jars in a kraft bag with rope handles: one of cloves, one of whole bulbs. For someone who loves food.",u:"Gifting",k:"Cool, dry place.",how:"Cloves for cooking, bulbs for serving."}},
  {id:"daily-250",slug:"daily-pouch",gal:["assets/shot-pouch.webp","assets/shot-macro.webp"],cat:["daily"],bg:"#c9b48f",img:"assets/shot-pouch.webp",price:550,pair:["toast","tahini","salad"],
   ar:{n:"الكيس اليومي",s:"بصل كامل · ٢٥٠ جم",tag:"الأوفر",d:"بصل كامل بقشره في كيس بسوستة. للي بياكل فص أو اتنين كل يوم، وده أقل سعر للجرام عندنا.",u:"فص أو اتنين يوميًا",k:"اقفل الكيس كويس بعد كل استخدام.",how:"فص أو اتنين مع الفطار، زي ما هو أو على عيش."},
   en:{n:"Daily Pouch",s:"Whole bulbs · 250 g",tag:"Best value",d:"Whole bulbs in a resealable pouch. For a clove or two a day, and our lowest price per gram.",u:"A clove or two daily",k:"Reseal after each use.",how:"A clove or two with breakfast, as is or on bread."}},
];
KOJI.CHEF = [
  {id:"chef-cloves-1kg",chef:true,price:2800,ar:{n:"فصوص مقشّرة",s:"كيس حاجز · ١ كجم"},en:{n:"Peeled Cloves",s:"Barrier bag · 1 kg"}},
  {id:"chef-paste-500",chef:true,price:1200,ar:{n:"معجون",s:"عبوة · ٥٠٠ جم"},en:{n:"Paste",s:"Tub · 500 g"}},
  {id:"chef-bulbs-1kg",chef:true,price:2000,ar:{n:"بصل كامل",s:"١ كجم"},en:{n:"Whole Bulbs",s:"1 kg"}},
];

KOJI.FACTS = [["fact.sweet",7,1],["fact.umami",8,3],["fact.bals",7,0],["fact.acid",4,1],["fact.bite",1,9]];

KOJI.RECIPES = [
 {id:"toast",slug:"recipe-cheese-toast",min:5,cat:"breakfast",uses:"cloves-100",
  ar:{n:"توست جبنة وثوم أسود",t:"٥ دقايق",sv:"١",b:"أسهل طريقة تدوقه بيها أول مرة.",ing:["عيش توست أو فينو","شريحتين جبنة رومي أو شيدر","٢ فص ثوم أسود","رشة زعتر أو فلفل أسود"],st:["اهرس الفصوص بالشوكة وافردها على العيش.","حط الجبنة فوقها.","سخّنه في الفرن أو على طاسة لحد ما الجبنة تسيح.","رشّ الزعتر وكُل وهو سخن."],tip:"الثوم الأسود بيبقى طعمه زي مربى مالحة، فبيمشي مع أي جبنة."},
  en:{n:"Cheese Toast with Black Garlic",t:"5 min",sv:"1",b:"The easiest first taste.",ing:["Toast or a soft roll","2 slices of roumi or cheddar","2 black garlic cloves","Pinch of thyme or black pepper"],st:["Mash the cloves with a fork and spread on the bread.","Lay the cheese on top.","Warm in the oven or a pan until the cheese melts.","Finish with thyme and eat it hot."],tip:"Black garlic tastes like a savory jam, so it goes with any cheese."}},
 {id:"tahini",slug:"recipe-black-garlic-tahini",min:5,cat:"sauce",uses:"paste-100",
  ar:{n:"طحينة بالثوم الأسود",t:"٥ دقايق",sv:"كوب",b:"نفس طحينة البيت، بس بالثوم الأسود بدل الثوم العادي.",ing:["½ كوب طحينة","١ م.ص معجون ثوم أسود (أو ٣ فصوص مهروسة)","عصير ليمونة","ملح وكمون","مية ساقعة حسب القوام"],st:["اخلط الطحينة مع المعجون والليمون.","ضيف المية بالتدريج وإنت بتقلّب لحد ما تبقى ناعمة.","تبّلها بالملح والكمون."],tip:"حلوة مع الشاورما والكفتة والسمك المشوي، ومن غير ريحة الثوم النية."},
  en:{n:"Black Garlic Tahini",t:"5 min",sv:"1 cup",b:"Everyday tahini sauce, made with black garlic instead of raw garlic.",ing:["½ cup tahini","1 tsp black garlic paste (or 3 mashed cloves)","Juice of 1 lemon","Salt and cumin","Cold water as needed"],st:["Mix the tahini with the paste and lemon.","Add water little by little, stirring, until smooth.","Season with salt and cumin."],tip:"Great with shawarma, kofta and grilled fish, without the raw-garlic bite."}},
 {id:"pasta",slug:"recipe-white-sauce-pasta",min:20,cat:"main",uses:"cloves-100",
  ar:{n:"مكرونة وايت صوص بالثوم الأسود",t:"٢٠ دقيقة",sv:"٢–٣",b:"الوايت صوص اللي بتعمله، بطعم أعمق.",ing:["٢٥٠ جم مكرونة","٢ م.ك زبدة","٢ م.ك دقيق","٢ كوب لبن","٣ فصوص ثوم أسود مهروسة","جبنة موتزاريلا أو رومي مبشورة","ملح وفلفل"],st:["اسلق المكرونة.","دوّب الزبدة وقلّب فيها الدقيق دقيقة.","ضيف اللبن بالتدريج وقلّب لحد ما يتقل.","ضيف الثوم الأسود والملح والفلفل.","اخلط المكرونة بالصوص، ورشّ الجبنة، ودخّلها الفرن ١٠ دقايق لو حابب."],tip:"ممكن تزوّد فراخ مشوية أو مشروم."},
  en:{n:"White-Sauce Pasta with Black Garlic",t:"20 min",sv:"2–3",b:"The white-sauce pasta you already make, with a deeper flavor.",ing:["250 g pasta","2 tbsp butter","2 tbsp flour","2 cups milk","3 mashed black garlic cloves","Grated mozzarella or roumi","Salt and pepper"],st:["Boil the pasta.","Melt the butter and cook the flour in it for a minute.","Whisk in the milk gradually until thick.","Stir in the black garlic, salt and pepper.","Toss with the pasta, top with cheese, and bake 10 minutes if you like."],tip:"Add grilled chicken or mushrooms."}},
 {id:"chicken",slug:"recipe-oven-chicken",min:45,cat:"main",uses:"paste-100",
  ar:{n:"فراخ في الفرن بالثوم الأسود",t:"٤٥ دقيقة",sv:"٤",b:"تتبيلة فراخ عادية، والثوم الأسود بيدّيها لون وطعم.",ing:["١ فرخة مقطّعة أو ١ كجم أوراك","٢ م.ك معجون ثوم أسود","٣ م.ك زيت","عصير ليمونة","ملح وفلفل وبابريكا","بصلة شرائح"],st:["اخلط المعجون مع الزيت والليمون والتوابل.","تبّل الفراخ وسيبها نص ساعة على الأقل.","افرد البصل في الصينية وحط الفراخ فوقه.","ادخلها فرن ٢٠٠ درجة حوالي ٤٠ دقيقة لحد ما تحمّر."],tip:"لو سبت التتبيلة طول الليل في التلاجة، الطعم بيدخل أكتر."},
  en:{n:"Oven Chicken with Black Garlic",t:"45 min",sv:"4",b:"A regular chicken marinade; black garlic adds colour and depth.",ing:["1 chicken in pieces or 1 kg thighs","2 tbsp black garlic paste","3 tbsp oil","Juice of 1 lemon","Salt, pepper, paprika","1 onion, sliced"],st:["Mix the paste with oil, lemon and spices.","Coat the chicken and rest at least 30 minutes.","Spread the onion in a tray and set the chicken on top.","Roast at 200 °C for about 40 minutes until browned."],tip:"Marinate overnight in the fridge for more flavor."}},
 {id:"butter",slug:"recipe-black-garlic-butter",min:5,cat:"sauce",uses:"cloves-100",
  ar:{n:"زبدة الثوم الأسود",t:"٥ دقايق",sv:"برطمان صغير",b:"للعيش السخن والستيك والبطاطس.",ing:["١٠٠ جم زبدة طرية","٤ فصوص ثوم أسود","رشة ملح","بقدونس مفروم (اختياري)"],st:["اهرس الفصوص بالشوكة.","اخلطها مع الزبدة والملح والبقدونس.","حطها في التلاجة نص ساعة."],tip:"افردها على عيش بلدي سخن، أو حط حتة فوق ستيك طالع من على النار."},
  en:{n:"Black Garlic Butter",t:"5 min",sv:"1 small jar",b:"For hot bread, steak and potatoes.",ing:["100 g soft butter","4 black garlic cloves","Pinch of salt","Chopped parsley (optional)"],st:["Mash the cloves with a fork.","Mix with the butter, salt and parsley.","Chill for 30 minutes."],tip:"Spread on warm baladi bread, or melt a knob over a steak off the heat."}},
 {id:"salad",slug:"recipe-salad-dressing",min:3,cat:"sauce",uses:"paste-100",
  ar:{n:"تتبيلة سلطة بالثوم الأسود",t:"٣ دقايق",sv:"طبق سلطة",b:"تتبيلة زيت وليمون، بطعم حلو ومالح.",ing:["٣ م.ك زيت زيتون","١ م.ك ليمون أو خل","½ م.ص معجون ثوم أسود","رشة ملح","½ م.ص عسل (اختياري)"],st:["حط كل حاجة في برطمان صغير.","اقفله ورجّه لحد ما يتخلط.","صبّه على السلطة قبل الأكل على طول."],tip:"حلوة مع الجرجير والطماطم، وسلطة الجبنة البيضا."},
  en:{n:"Black Garlic Salad Dressing",t:"3 min",sv:"1 salad",b:"Oil and lemon, sweet and savory.",ing:["3 tbsp olive oil","1 tbsp lemon or vinegar","½ tsp black garlic paste","Pinch of salt","½ tsp honey (optional)"],st:["Put everything in a small jar.","Close and shake until mixed.","Pour over the salad just before eating."],tip:"Lovely with rocket and tomato, or a white-cheese salad."}},
];

KOJI.FAQ = {
 ar:[["هو ثوم متعفّن أو مخمّر؟","لأ. مفيش بكتيريا ولا خميرة ولا فطر. اللون الأسود من تفاعل طبيعي بين السكر والبروتين في الثوم مع الحرارة الهادية والوقت (تفاعل ميلارد)، نفس اللي بيحصل للعيش وهو بيتحمّص. و«كوجي» اسم البراند بس، مش بنستخدم فطر الكوجي الياباني."],
  ["ريحته زي الثوم العادي؟","لأ، أهدى بكتير. الحدة بتتكسر في التعتيق، وطعمه بيبقى أقرب لتمر أو بلسميك."],
  ["أحفظه إزاي؟","العبوة المقفولة في مكان بارد وناشف. بعد الفتح في التلاجة. تاريخ الصلاحية مكتوب على العبوة."],
  ["الفرق بين الفصوص والمعجون والبصل؟","الفصوص مقشّرة وجاهزة للأكل والتقطيع. المعجون أسهل في الخلط مع الصوصات. والبصل الكامل بقشره، بتقشّره وقت ما تحتاجه، وشكله حلو كهدية."],
  ["ليه أغلى من الثوم العادي؟","الثوم بيخس جزء من وزنه في التعتيق، والتعتيق بياخد ٣ أسابيع. وإنت بتستخدم فص أو اتنين في الطبق، مش رأس كاملة."],
  ["الدفع والتوصيل؟","كاش عند الاستلام، أو إنستاباي، أو فودافون كاش. القاهرة والجيزة الأول، ومصاريف التوصيل بتتحدد حسب العنوان ونقولهالك قبل التأكيد."],
  ["أتابع طلبي إزاي؟","من صفحة «تتبّع طلبك» برقم الطلب ورقم الموبايل اللي طلبت بيه."],
  ["هل له فوايد صحية؟","فيه أبحاث كتير على الثوم الأسود، بس إحنا مش هنقول ادعاءات صحية من غير بيانات على منتجنا ومراجعة تنظيمية. بنبيعه كأكل حلو الطعم."]],
 en:[["Is it fermented or mouldy?","No. No bacteria, yeast or mould. The colour comes from a natural reaction between the garlic's sugars and amino acids under gentle heat over time (the Maillard reaction), the same one that browns toast. KOJI is our name; we don't use koji mould."],
  ["Does it smell like garlic?","Much softer. The sharpness breaks down during ageing, leaving something closer to dates or balsamic."],
  ["How do I store it?","Sealed: somewhere cool and dry. Once opened: the fridge. Best-before is printed on the pack."],
  ["Cloves, paste or bulbs?","Cloves are peeled and ready to eat or slice. Paste blends easily into sauces. Whole bulbs come in their skins; peel as you go, and they make a beautiful gift."],
  ["Why does it cost more than garlic?","Garlic loses part of its weight while ageing, and each lot takes three weeks. And you use a clove or two, not a whole head."],
  ["Payment and delivery?","Cash on delivery, InstaPay or Vodafone Cash. Cairo and Giza first; delivery is quoted by address before you confirm."],
  ["How do I track my order?","On the Track order page, with your order number and the mobile you ordered with."],
  ["Is it a health food?","There's a lot of research on black garlic, but we won't make health claims without data on our own product and regulatory review. We sell it because it tastes extraordinary."]]
};

KOJI.LEGAL = {
 privacy: {
  updated: ["آخر تحديث: ٧ أكتوبر ٢٠٢٦", "Last updated: 7 October 2026"],
  ar: [
   ["بنجمع إيه", "لما تطلب: اسمك، ورقم موبايلك، وعنوانك، والمنتجات اللي طلبتها، وأي ملاحظة بتكتبها. ولما مطعم يطلب عينة: اسم المطعم، ودورك، والطبق، والكمية اللي متوقع تستخدمها."],
   ["بنستخدمها في إيه", "عشان نأكد طلبك ونوصّله ونكلمك بخصوصه، وعشان نرتّب عينة المطعم. مش بنبعتلك إعلانات من غير ما توافق."],
   ["بتتخزن فين", "في قاعدة بيانات على Supabase (سيرفرات في فرانكفورت، ألمانيا). اللي يقدر يشوفها فريق كوجي بس، بتسجيل دخول."],
   ["مين بيشوفها كمان", "مندوب التوصيل بياخد اسمك ورقمك وعنوانك عشان يوصّل الطلب. غير كده، مش بنبيع ولا بنشارك بياناتك مع حد."],
   ["الكوكيز", "مفيش كوكيز إعلانات ولا تتبّع. المتصفح بيحفظ سلتك واللغة اللي اخترتها على جهازك بس."],
   ["حقك", "تقدر تطلب نسخة من بياناتك أو تمسحها في أي وقت، بإيميل على العنوان اللي تحت. بنحتفظ بسجل الطلبات طول ما هو مطلوب للحسابات."],
  ],
  en: [
   ["What we collect", "When you order: your name, mobile number, address, the items you ordered and any note you add. When a restaurant requests a trial: the venue, your role, the dish and your estimated usage."],
   ["Why", "To confirm, deliver and contact you about your order, and to arrange restaurant trials. We don't send you marketing without your consent."],
   ["Where it's stored", "In a Supabase database (servers in Frankfurt, Germany). Only the KOJI team can access it, behind a login."],
   ["Who else sees it", "The courier receives your name, number and address to deliver your order. Otherwise we never sell or share your data."],
   ["Cookies", "No advertising or tracking cookies. Your browser keeps your bag and language choice on your own device."],
   ["Your rights", "You can ask for a copy of your data or ask us to delete it at any time by email. We keep order records for as long as accounting requires."],
  ]},
 terms: {
  updated: ["آخر تحديث: ٧ أكتوبر ٢٠٢٦", "Last updated: 7 October 2026"],
  ar: [
   ["الطلب المسبق", "إحنا بنعتّق على دفعات صغيرة، فكل طلب بيتسجل كطلب مسبق. بنكلمك نأكد ميعاد التسليم ومصاريف التوصيل، والطلب مش بيتأكد غير بعد المكالمة دي."],
   ["الأسعار", "الأسعار بالجنيه المصري. السعر اللي بيتحسب هو السعر وقت ما طلبت، ولو اتغيّر قبل التأكيد هنقولك وإنت تقرر."],
   ["التوصيل", "بنوصّل القاهرة والجيزة الأول، وباقي المحافظات بالاتفاق. مصاريف التوصيل بتتحدد حسب العنوان، وبنقولهالك قبل التأكيد."],
   ["الدفع", "كاش عند الاستلام، أو إنستاباي، أو فودافون كاش بعد ما نأكد الطلب. مفيش أي دفع قبل التأكيد."],
   ["الإلغاء", "تقدر تلغي الطلب ببلاش في أي وقت قبل ما يخرج للتوصيل. كلمنا أو ابعت إيميل برقم الطلب."],
   ["الاستبدال والاسترجاع", "الثوم الأسود أكل، فمش بنقدر نرجّع عبوة اتفتحت. بس لو الطلب وصلك فيه كسر، أو العبوة مفتوحة، أو المنتج شكله أو ريحته مش طبيعيين، ابعتلنا صورة ورقم الطلب خلال ٤٨ ساعة من الاستلام، وهنبدّله أو نرجّعلك فلوسك."],
   ["المنتج", "ثوم أسود، مكوّن واحد: ثوم. ده أكل، مش علاج ولا مكمّل غذائي. احفظه في مكان بارد وناشف، وبعد الفتح في التلاجة."],
  ],
  en: [
   ["Pre-orders", "We age in small lots, so every order is placed as a pre-order. We call you to confirm the delivery date and fee; the order is only confirmed after that call."],
   ["Prices", "Prices are in Egyptian pounds. The price at the time you ordered applies; if it changes before confirmation we'll tell you and you decide."],
   ["Delivery", "Cairo and Giza first, other governorates by arrangement. The delivery fee depends on your address and is quoted before confirmation."],
   ["Payment", "Cash on delivery, InstaPay or Vodafone Cash after we confirm the order. No payment before confirmation."],
   ["Cancellation", "Cancel free of charge any time before the order leaves for delivery. Call us or email your order number."],
   ["Returns", "Black garlic is food, so we can't take back an opened pack. But if your order arrives broken, unsealed, or looks or smells wrong, send a photo and your order number within 48 hours of delivery and we'll replace it or refund you."],
   ["The product", "Black garlic, one ingredient: garlic. It's food, not medicine or a supplement. Store somewhere cool and dry; refrigerate after opening."],
  ]},
};
;
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
;
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
