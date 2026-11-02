// =========================================================================
// CORE MODULE: ASTRONOMY, BODYGRAPH & GALACTIC LUCK GAUGE
// =========================================================================
window.EMBEDDED_GEMINI_KEY = "AIzaSyCVkX_XC917ldWczw8mFDh1NaVp0z5_X5E";
window.MY_GATES = new Set([7,8,9,10,11,12,13,15,23,24,28,37,44,50,54,60,63]);
window.EXALTED_GATES = new Set([12, 37, 28, 50]);
window.DETRIMENT_GATES = new Set([13, 24, 44, 8, 9]);
window.NATAL_SUN_LON = 41.5;
window.NATAL_MOON_LON = 299.0;

window.MANDALA = [41,19,13,49,30,55,37,63,22,36,25,17,21,51,42,3,27,24,2,23,8,20,16,35,45,12,15,52,39,53,62,56,31,33,7,4,29,59,40,64,47,6,46,18,48,57,32,50,28,44,1,43,14,34,9,5,26,11,10,58,38,54,61,60];

window.GATE_THEMES = {
  1:"آفرینش و اصالت فردی", 2:"دریافت شهودی مسیر برتر", 3:"نظم نوین از دل آشوب", 4:"یافتن پاسخ در دل ابهام",
  5:"هم‌نوایی با ریتم طبیعی زمان", 6:"پالایش مرزهای صمیمیت و آرامش", 7:"رهبری خاموش و قطب‌نمای جمع", 8:"زیستن به عنوان الگوی اصیل",
  9:"قدرت تمرکز بر گام‌های کوچک", 10:"عشق به خویشتن و رهایی از قضاوت", 11:"تصویرسازی ذهنی و زایش ایده", 12:"سکوت شاعرانه تا لحظه مناسب بیان",
  13:"نگهبان خاطرات و شنونده رازها", 14:"جریان برکت در مسیر درست", 15:"تواضع و هماهنگی با تنوع انسان‌ها", 16:"ذوق و مهارت استادانه",
  17:"نگاه کل‌نگر و آینده‌بین", 18:"پالایش و شفای الگوهای کهنه", 19:"لطافت روح و درک نیاز هستی", 20:"بیداری و حضور محض در اکنون",
  21:"اقتدار و مدیریت خردمندانه", 22:"وقار، فیض الهی و گشودگی قلب", 23:"تراشیدن زواید و بیان حقیقت ناب", 24:"بازگشت روح به نقطه اشراق",
  25:"معصومیت کودکانه و عشق بی‌چون‌وچرا", 26:"کیماگری ارزش و کلام نافذ", 27:"مهرورزی و پاسداری از حیات", 28:"جسارت زیستنِ با معنا",
  29:"تعهد قلبی به جریان زندگی", 30:"آتش اشتیاق و تسلیم در برابر تقدیر", 31:"نفوذ کلام برخاسته از حقیقت", 32:"بویایی تیز برای تشخیص آنچه ماندگار است",
  33:"خلوت حکیمانه و ته‌نشین شدن تجربه", 34:"استقلال و اقتدار درونی", 35:"طعم تجربه و عبور از افق‌های تازه", 36:"نور خرد پس از تاریکی بحران",
  37:"گرمای پیمان و پیوند قلب‌ها", 38:"ایستادگی شرافتمندانه برای معنا", 39:"تکان دادن آب‌های راکد برای بیداری روح", 40:"آزادی اراده و استراحت پس از رنج",
  41:"نطفه نخستینِ هر آرزو و آغاز", 42:"کمال یافتن و بستن دایره تجربه", 43:"گوش جان سپردن به زمزمه درون", 44:"بوئیدن نسیم تغییر پیش از رسیدن",
  45:"سفره گشوده و گردآوری قبیله", 46:"رقصیدن با تصادف‌های مقدس هستی", 47:"چشیدن معنای پنهان پشت رنج‌ها", 48:"چاه عمیق خرد و پختگی",
  49:"انقلاب درونی برای زیستن بر مدار حقیقت", 50:"دیگ کیمیا و پاسداری از قوانین اصیل", 51:"تندر بیدارگر و جهش به ناشناخته", 52:"سکون کوه و تماشای خاموش طوفان",
  53:"گشودن دروازه‌ای به فصلی نو", 54:"صعود ریشه‌ها به سوی آسمان", 55:"جام لبریز از فراوانی روح", 56:"قصه‌گوی کاروان هستی",
  57:"نسیم شهود که در لحظه می‌وزد", 58:"شادیِ بی‌سببِ زیستن", 59:"شکستن دیوارها و صمیمیت", 60:"تپش تحول در دل محدودیت",
  61:"خیره شدن به راز سر به مهر هستی", 62:"نام‌گذاری دقیق بر پدیده‌ها", 63:"پرسش مقدس در آغاز راه", 64:"شفقِ روشنایی پس از حیرت"
};

window.GATE_FEELINGS = {
  1:"موجی از انگیزه برای خلق کردن و متفاوت بودن", 2:"آرامش درونی و حس هدایت شدن به سمت مسیر درست", 3:"حس کلافگی اولیه از تغییر که ناگهان به یک نظم جدید و شیرین تبدیل می‌شود", 4:"تیزبینی ذهنی و پیدا کردن جواب سوالات مبهم",
  5:"حس هماهنگی با ریتم زندگی و آرامش از نظم کارها", 6:"حساسیت عاطفی در روابط و میل به صمیمیت واقعی", 7:"حس پختگی، آرامش و دیده شدن به عنوان فرد قابل اتکا", 8:"شور و شوق برای انجام یک کار خاص و الهام‌بخش",
  9:"تمرکز بالا روی جزئیات ریز و میل به سر و سامان دادن کارها", 10:"حس رضایت از خود، سبکی روح و راحتی با خودت", 11:"جوشش ایده‌های نو و تصویرسازی‌های جذاب در ذهن", 12:"حس ظرافت عاطفی، میل به سکوت یا صحبت کردن فقط با افراد خاص و همدل",
  13:"حس نوستالژی، مرور خاطرات و تمایل به گوش دادن به حرف دل دیگران", 14:"موجی از انرژی پربرکت برای کار و جذب منابع مالی", 15:"مغناطیس شخصی بالا و حس راحتی با آدم‌های مختلف", 16:"ذوق و اشتیاق برای یادگیری یا تمرین یک مهارت",
  17:"نگاه کل‌نگر و برنامه‌ریز به آینده", 18:"حس تیزبینی برای پیدا کردن ایراد کارها و اصلاح آن‌ها", 19:"لطافت احساسی بالا و درک سریع نیاز اطرافیان", 20:"حضور پررنگ و هوشیارانه در لحظه حال",
  21:"میل به استقلال، مدیریت شخصی و در دست گرفتن فرمان کارها", 22:"جذابیت، وقار و موجی از احساسات لطیف و شاعرانه", 23:"شفافیت ناگهانی ذهن برای گفتن حرف اصلی بدون حاشیه", 24:"تکرار یک فکر عمیق تا لحظه رسیدن به یک کشف و الهام شیرین",
  25:"سبکی قلب، رهایی از کینه و حس معصومیت", 26:"هوشیاری مالی و شمّ قوی برای مذاکره و قانع کردن دیگران", 27:"حس دلسوزی، مراقبت از خانواده و توجه به سلامتی و تغذیه", 28:"بی‌قراری هدفمند برای انجام کاری که واقعاً برایت معنا دارد",
  29:"انرژی بالا برای متعهد شدن و به سرانجام رساندن کار", 30:"موجی از اشتیاق، میل شدید و هیجان عاطفی", 31:"نفوذ کلام طبیعی و شنیده شدن حرفت در جمع", 32:"حس ششم قوی درباره اینکه کدام کار یا رابطه آینده‌دار است",
  33:"نیاز عمیق به خلوت، تنهایی و فاصله گرفتن از شلوغی‌ها", 34:"فوران انرژی بدنی و قدرت اقدام مستقل", 35:"میل به تنوع، تجربه جدید و شکستن یکنواختی", 36:"نوسان عاطفی گذرا که با کمی صبر به آرامش و پختگی می‌رسد",
  37:"نیاز به گرمای خانواده، رفاقت صمیمی و مهربانی متقابل", 38:"حس سرسختی و ایستادگی در برابر فشارهای بیرونی", 39:"حس شوخ‌طبعی، چالش‌گری یا تکان دادن فضای راکد", 40:"نیاز به استراحت، رها کردن بار مسئولیت دیگران و تجدید قوا",
  41:"جوانه زدن یک آرزو، امید یا خیال تازه در دل", 42:"حس رضایت از بستن یک پرونده قدیمی و تمام کردن کارهای ناتمام", 43:"جرقه زدن یک فهم و بصیرت ناگهانی در خلوت ذهن", 44:"شمّ تیز برای تشخیص صداقت افراد و فرصت‌های کاری",
  45:"توجه به مسائل مالی، دارایی و مدیریت هزینه‌ها", 46:"حس خوش‌شانسی، هم‌زمانی‌های شیرین و قرار گرفتن در جای درست", 47:"کنار هم قرار گرفتن قطعات پازل فکری و رسیدن به آرامش ذهنی", 48:"حس عمیق شدن در یک موضوع و پختگی فکری",
  49:"حساسیت نسبت به انصاف و اصول اخلاقی در روابط", 50:"حس مسئولیت‌پذیری، حفظ چهارچوب‌ها و آرامش خانه", 51:"شجاعت بالا و آمادگی برای یک حرکت جسورانه", 52:"آرامش عمیق، سکون و توانایی نشستن و تمرکز طولانی",
  53:"انرژی و انگیزه برای استارت زدن یک برنامه نو", 54:"انگیزه قوی برای پیشرفت مالی و ارتقای جایگاه", 55:"نوسان لطیف روحی میان دلتنگی شاعرانه و شادی عمیق", 56:"میل به معاشرت، تعریف کردن خاطرات و گپ و گفت صمیمی",
  57:"حس ششم فوق‌العاده تیز و دریافت هشدارها یا پیام‌های ظریف درونی", 58:"نشاط، سرزندگی و امید به بهتر شدن اوضاع", 59:"شکستن دیوارها و صمیمیت", 60:"تپش تحول در دل محدودیت"
};

window.DB = [
  {id:"28-38",g1:28,g2:38,name:"کانال ۲۸-۳۸ (مبارز هدفمند)",mood:"ایستادگی شرافتمندانه، جسارت رویارویی با حقیقت و یافتن معنا در دل چالش‌ها",c:["spleen","root"],svg:"ch-28-38",lb:14,w:8,l:2,v:18,i:16,fc:"در حال حاضر موجی از استقامت، جسارت و تمرکز درونی در فضای زندگی شما جاری است.",doT:"حل مسائل دشوار، ورزش و تخلیه انرژی.",dontT:"درگیر شدن در جروبحث‌های فرسایشی."},
  {id:"61-24",g1:24,g2:61,name:"کانال ۶۱-۲۴ (آگاهی و تفکر)",mood:"اشراق درونی، سکوت پر رمز و راز و دریافت الهامات مستقیم از سرچشمه هستی",c:["head","ajna"],svg:"ch-61-24",lb:12,w:6,l:8,v:8,i:22,fc:"ذهن شما در این ساعات بسیار الهام‌گیر و عمیق است و ایده‌های ناب ناگهان به دلتان خطور می‌کنند.",doT:"مطالعه، مدیتیشن، یادداشت الهامات.",dontT:"نشخوار فکری بی‌پایان."},
  {id:"63-4",g1:63,g2:4,name:"کانال ۶۳-۴ (منطق)",mood:"بصیرت شفاف، دیدن نظم هندسی کائنات و شکافتن پرده ابهام با خرد",c:["head","ajna"],svg:"ch-63-4",lb:12,w:14,l:4,v:12,i:14,fc:"دیدی بسیار شفاف، منطقی و آینده‌نگر دارید.",doT:"بررسی فنی پروژه‌ها.",dontT:"تعمیم دادن شک و تردید."},
  {id:"11-56",g1:11,g2:56,name:"کانال ۱۱-۵۶ (روایت‌گری)",mood:"سیر و سلوک در خاطرات، تمثیل‌پردازی شاعرانه",c:["ajna","throat"],svg:"ch-11-56",lb:14,w:10,l:18,v:16,i:12,fc:"مناسب گفتگو و اشتراک‌گذاری ایده‌ها.",doT:"گفتگوهای صمیمی.",dontT:"دادن قول‌های اجرایی."},
  {id:"43-23",g1:23,g2:43,name:"کانال ۴۳-۲۳ (نبوغ و ساختاردهی)",mood:"کلام برنده و ناب",c:["ajna","throat"],svg:"ch-43-23",lb:15,w:16,l:8,v:18,i:18,fc:"راه‌حل‌های ساده و هوشمندانه برای کارهای پیچیده.",doT:"ساده‌سازی کارها.",dontT:"بیان دیدگاه‌های انقلابی."},
  {id:"12-22",g1:12,g2:22,name:"کانال ۱۲-۲۲ (گشودگی اجتماعی)",mood:"لطافت شاعرانه و وقار عاطفی",c:["throat","solar"],svg:"ch-12-22",lb:18,w:14,l:26,v:18,i:14,fc:"جذابیت کلامی و نفوذ عاطفی بالا.",doT:"تعاملات اجتماعی.",dontT:"صحبت در کلافگی."},
  {id:"8-1",g1:8,g2:1,name:"کانال ۱-۸ (الهام‌بخشی)",mood:"درخشش فردیت اصیل",c:["throat","g"],svg:"ch-8-1",lb:14,w:14,l:14,v:18,i:14,fc:"اصالت فردی و الهام‌بخشی به دیگران.",doT:"ارائه سبک شخصی.",dontT:"تقلید از دیگران."},
  {id:"31-7",g1:7,g2:31,name:"کانال ۷-۳۱ (هدایت آینده)",mood:"آرامشِ راهنما",c:["throat","g"],svg:"ch-31-7",lb:15,w:16,l:14,v:18,i:14,fc:"استقبال دیگران از راهنمایی شما.",doT:"مدیریت و برنامه‌ریزی.",dontT:"تحمیل نظر."},
  {id:"33-13",g1:13,g2:33,name:"کانال ۱۳-۳۳ (شاهد خردمند)",mood:"سکوتِ شاهد کهنسال",c:["throat","g"],svg:"ch-33-13",lb:12,w:8,l:14,v:10,i:18,fc:"زمان خلوت آگاهانه و استخراج حکمت.",doT:"مرور درس‌های گذشته.",dontT:"شتاب‌زدگی."},
  {id:"10-20",g1:10,g2:20,name:"کانال ۱۰-۲۰ (بیداری در اکنون)",mood:"بیداری محض در لحظه اکنون",c:["g","throat"],svg:"ch-10-20",lb:14,w:10,l:16,v:16,i:18,fc:"انرژی حضور آرام در لحظه حال.",doT:"زندگی در اکنون.",dontT:"نگرانی درباره آینده."},
  {id:"10-34",g1:10,g2:34,name:"کانال ۱۰-۳۴ (قدرت فردی)",mood:"استقلال روح",c:["g","sacral"],svg:"ch-10-34",lb:16,w:18,l:8,v:24,i:14,fc:"انرژی بدنی بالا برای پیگیری امور.",doT:"کارهای نیازمند انرژی.",dontT:"خستگی مفرط."},
  {id:"10-57",g1:10,g2:57,name:"کانال ۱۰-۵۷ (شهود زنده)",mood:"گوش سپردن به نجوای غریزه",c:["g","spleen"],svg:"ch-10-57",lb:16,w:14,l:14,v:12,i:26,fc:"حس ششم قوی در لحظه.",doT:"اعتماد به حس درونی.",dontT:"نادیده گرفتن شهود."},
  {id:"15-5",g1:15,g2:5,name:"کانال ۵-۱۵ (ریتم طبیعی)",mood:"جاری شدن با رودخانه زمان",c:["g","sacral"],svg:"ch-15-5",lb:14,w:14,l:16,v:14,i:16,fc:"هماهنگی با ریتم طبیعت.",doT:"تنظیم روتین.",dontT:"عجله کردن."},
  {id:"37-40",g1:37,g2:40,name:"کانال ۳۷-۴۰ (جامعه و توافق)",mood:"گرمای عهد و پیمان",c:["solar","heart"],svg:"ch-37-40",lb:18,w:18,l:24,v:14,i:14,fc:"رفاقت و توافق‌های منصفانه.",doT:"دورهمی صمیمی.",dontT:"قرارداد یک‌طرفه."},
  {id:"9-52",g1:9,g2:52,name:"کانال ۹-۵۲ (تمرکز عمیق)",mood:"وقار و سکون کوه",c:["sacral","root"],svg:"ch-9-52",lb:13,w:16,l:6,v:16,i:14,fc:"تمرکز عمیق روی جزئیات.",doT:"مطالعه و تحلیل.",dontT:"چندکارگی."},
  {id:"44-26",g1:44,g2:26,name:"کانال ۲۶-۴۴ (شمّ اقتصادی)",mood:"تیزبینی در شناخت ارزش‌ها",c:["spleen","heart"],svg:"ch-44-26",lb:20,w:28,l:12,v:20,i:20,fc:"شمّ اقتصادی قوی.",doT:"مذاکرات تجاری.",dontT:"خرید هیجانی."},
  {id:"50-27",g1:50,g2:27,name:"کانال ۲۷-۵۰ (مراقبت و ارزش‌ها)",mood:"شفقت و پاسداری از حیات",c:["spleen","sacral"],svg:"ch-50-27",lb:16,w:14,l:22,v:14,i:18,fc:"حس حمایت و توجه به سلامت.",doT:"حمایت معنوی.",dontT:"پذیرفتن بار دیگران."},
  {id:"3-60",g1:60,g2:3,name:"کانال ۳-۶۰ (جهش و نوآوری)",mood:"تولد نور از دل تنگنا",c:["root","sacral"],svg:"ch-3-60",lb:14,w:14,l:8,v:16,i:18,fc:"انرژی تحول و نوآوری.",doT:"صبوری.",dontT:"مقاومت در برابر تغییر."},
  {id:"32-54",g1:54,g2:32,name:"کانال ۳۲-۵۴ (دگرگونی و صعود)",mood:"کیمیاگری صعود و ماندگاری",c:["spleen","root"],svg:"ch-32-54",lb:19,w:26,l:10,v:22,i:20,fc:"انرژی پیشرفت مالی بلندمدت.",doT:"برنامه‌ریزی بلندمدت.",dontT:"سودهای یک‌شبه."}
];

window.memStore = { prov: "gemini", key: window.EMBEDDED_GEMINI_KEY, decisions: "[]", bgFilter: "all", luckMode: "total" };
window.OLDMAN_STATE = null;

window.getStore = function(k, def) {
  if (k === "key") {
    try {
      const customK = localStorage.getItem("oldman_key");
      if (customK && customK.length > 10) return customK;
    } catch(e) {}
    return window.EMBEDDED_GEMINI_KEY;
  }
  try {
    const ls = localStorage.getItem("oldman_" + k);
    if (ls) return ls;
  } catch(e) {}
  try {
    if (window.name && window.name.startsWith("{")) {
      const wn = JSON.parse(window.name);
      if (wn[k]) return wn[k];
    }
  } catch(e) {}
  return window.memStore[k] || def;
};

window.setStore = function(k, v) {
  window.memStore[k] = v;
  try { localStorage.setItem("oldman_" + k, v); } catch(e) {}
  try {
    let wn = {};
    if (window.name && window.name.startsWith("{")) wn = JSON.parse(window.name);
    wn[k] = v;
    window.name = JSON.stringify(wn);
  } catch(e) {}
};

function norm(x) { return ((x % 360) + 360) % 360; }
function deg2g(lon) {
  const s = norm(lon - 302);
  const idx = Math.floor(s / 5.625);
  const rem = s - idx * 5.625;
  return { gate: window.MANDALA[idx], line: Math.floor(rem / 0.9375) + 1, left: 5.625 - rem };
}
window.fmtH = function(h) {
  if (h < 24) {
    const hr = Math.floor(h);
    const mn = Math.max(1, Math.round((h - hr) * 60));
    return hr === 0 ? (mn + " دقیقه دیگر") : (hr + " ساعت و " + mn + " دقیقه دیگر");
  }
  return "حدود " + Math.round(h / 24) + " روز دیگر";
};

window.calcPlanets = function(dt) {
  const jd = dt.getTime() / 86400000 + 2440587.5;
  const d = jd - 2451545.0;
  const d26 = jd - 2461333.5;
  const r = Math.PI / 180;

  const gS = norm(357.529 + 0.98560028 * d);
  const qS = norm(280.459 + 0.98564736 * d);
  const sLon = norm(qS + 1.915 * Math.sin(gS * r) + 0.020 * Math.sin(2 * gS * r));
  const eLon = norm(sLon + 180);

  const lM = norm(218.316 + 13.176396 * d);
  const mM = norm(134.963 + 13.064993 * d);
  const fM = norm(93.272 + 13.229350 * d);
  const dM = norm(297.850 + 12.190749 * d);
  const mLon = norm(
    lM + 6.289 * Math.sin(mM * r)
    + 1.274 * Math.sin((2 * dM - mM) * r)
    + 0.658 * Math.sin(2 * dM * r)
    + 0.214 * Math.sin(2 * mM * r)
    - 0.186 * Math.sin(gS * r)
    - 0.114 * Math.sin(2 * fM * r)
  );

  const nLon = norm(125.0445 - 0.05295376 * d);
  const mercLon = norm(226.2 + 1.18 * d26 + 4.5 * Math.sin((110 + 3.1 * d26) * r));
  const venLon  = norm(234.8 + 0.62 * d26);
  const marsLon = norm(133.4 + 0.54 * d26);
  const jupLon  = norm(142.1 + 0.095 * d26);
  const satLon  = norm(18.6 - 0.032 * d26);
  const uraLon  = norm(64.5 - 0.018 * d26);
  const nepLon  = norm(1.9 - 0.012 * d26);
  const pluLon  = norm(303.4 + 0.008 * d26);

  const raw = [
    {n:"خورشید",s:"☉",l:sLon,sp:0.9856,wt:1.2,fast:true},
    {n:"زمین",s:"⊕",l:eLon,sp:0.9856,wt:1.0,fast:true},
    {n:"ماه",s:"☽",l:mLon,sp:13.176,wt:1.8,fast:true,isMoon:true},
    {n:"گره شمالی",s:"☊",l:nLon,sp:0.053,wt:0.4,fast:false},
    {n:"گره جنوبی",s:"☋",l:norm(nLon+180),sp:0.053,wt:0.4,fast:false},
    {n:"عطارد",s:"☿",l:mercLon,sp:1.18,wt:1.1,fast:true},
    {n:"زهره",s:"♀",l:venLon,sp:0.95,wt:1.25,fast:true},
    {n:"مریخ",s:"♂",l:marsLon,sp:0.54,wt:0.9,fast:true},
    {n:"مشتری",s:"♃",l:jupLon,sp:0.095,wt:0.45,fast:false},
    {n:"زحل",s:"♄",l:satLon,sp:0.035,wt:0.35,fast:false},
    {n:"اورانوس",s:"♅",l:uraLon,sp:0.018,wt:0.35,fast:false},
    {n:"نپتون",s:"♆",l:nepLon,sp:0.012,wt:0.35,fast:false},
    {n:"پلوتو",s:"♇",l:pluLon,sp:0.008,wt:0.35,fast:false}
  ];
  return raw.map(p => {
    const inf = deg2g(p.l);
    return { n: p.n, s: p.s, lon: p.l, gate: inf.gate, line: inf.line, h: (inf.left / p.sp) * 24, wt: p.wt, fast: p.fast, isMoon: p.isMoon };
  });
};

window.calcGalacticLuck = function(pls, act, dateObj = new Date()) {
  const rad = Math.PI / 180;
  const factors = [];

  let total = 45;
  let wealth = 44;
  let love = 45;
  let action = 44;

  const moon = pls[2];
  const sun = pls[0];
  const venus = pls[6];
  const mars = pls[7];

  let slowChannelCap = 0;
  act.forEach(x => {
    if (x.p.isMoon) {
      const boost = Math.round(x.ch.lb * 1.45);
      total += boost;
      wealth += x.ch.w * 1.1;
      love += x.ch.l * 1.1;
      action += x.ch.v * 1.1;
      factors.push({ sign: "+", val: "+" + boost + "%", text: "قفل مستقیم ماه در " + x.ch.name });
    } else if (x.p.fast) {
      const boost = Math.round(x.ch.lb * 0.85);
      total += boost;
      wealth += x.ch.w * 0.7;
      love += x.ch.l * 0.7;
      action += x.ch.v * 0.7;
      factors.push({ sign: "+", val: "+" + boost + "%", text: "کانال " + x.p.n + ": " + x.ch.name });
    } else {
      if (slowChannelCap < 10) {
        const b = Math.min(5, 10 - slowChannelCap);
        slowChannelCap += b;
        total += b;
        wealth += 4; love += 4; action += 4;
        factors.push({ sign: "+", val: "+" + b + "%", text: "بستر فصلی " + x.p.n });
      }
    }
  });

  if (window.EXALTED_GATES.has(moon.gate)) {
    total += 18; wealth += 16; love += 20; action += 15;
    factors.push({ sign: "+", val: "+18%", text: "ماه در دروازه شرف (▲ پورت " + moon.gate + ")" });
  }
  if (window.DETRIMENT_GATES.has(moon.gate)) {
    total -= 16; wealth -= 14; love -= 12; action -= 18;
    factors.push({ sign: "-", val: "-16%", text: "ماه در نقطه هبوط (▼ پورت " + moon.gate + ")" });
  }

  const diffNatalSun = Math.abs(norm(moon.lon - window.NATAL_SUN_LON));
  const angleSun = diffNatalSun > 180 ? 360 - diffNatalSun : diffNatalSun;

  if (Math.abs(angleSun - 120) <= 18 || Math.abs(angleSun - 60) <= 15 || angleSun <= 14) {
    total += 15; wealth += 14; love += 16; action += 14;
    factors.push({ sign: "+", val: "+15%", text: "زاویه هارمونیک سعد ماه با خورشید تولد" });
  } else if (Math.abs(angleSun - 90) <= 16 || Math.abs(angleSun - 180) <= 16) {
    total -= 15; wealth -= 12; love -= 16; action -= 14;
    factors.push({ sign: "-", val: "-15%", text: "زاویه اصطکاکی ماه با مدار تولد" });
  }

  if (moon.line === 2 || moon.line === 6) {
    total += 12; love += 12; wealth += 10; action += 10;
    factors.push({ sign: "+", val: "+12%", text: "هم‌فرکانسی خط ماه (خط " + moon.line + ") با پروفایل ۶/۲[span_0](start_span)[span_0](end_span)" });
  } else if (moon.line === 3) {
    total -= 10; wealth -= 14; action -= 6;
    factors.push({ sign: "-", val: "-10%", text: "ماه در خط ۳ (فاز آزمون و خطا)" });
  }

  const decHours = dateObj.getHours() + dateObj.getMinutes() / 60;
  const diurnalWave = Math.round(14 * Math.sin(((decHours - 9) / 24) * 2 * Math.PI));
  total += diurnalWave;

  const clamp = (v, min = 4, max = 99) => Math.max(min, Math.min(max, Math.round(v)));
  return {
    total: clamp(total, 5, 98),
    wealth: clamp(wealth, 5, 98),
    love: clamp(love, 5, 98),
    action: clamp(action, 5, 98),
    factors: factors
  };
};

window.setLuckGaugeMode = function(mode) {
  window.setStore("luckMode", mode);
  ["total", "wealth", "love", "action"].forEach(m => {
    const b = document.getElementById("modeBtn-" + m);
    if (b) b.className = "mode-tab" + (m === mode ? " active" : "");
    const sb = document.getElementById("subBox-" + m);
    if (sb) sb.className = "sub-item" + (m === mode ? " selected-sub" : "");
  });
  if (window.OLDMAN_STATE) {
    updateLuckGaugeUI(window.OLDMAN_STATE.now, window.OLDMAN_STATE.pls, window.OLDMAN_STATE.act);
  }
};

function getStatusTextForScore(score, mode) {
  if (score >= 80) return "🔥 سبقت کهکشانی: اوج هم‌زمانی و اقبال بالا!";
  if (score >= 62) return "✨ جریان موافق: دور موتور بالا و فرصت‌ساز";
  if (score >= 42) return "🟢 تعادل پایدار: مناسب کارهای روتین و متمرکز";
  if (score >= 25) return "⚠️ فاز احتیاط: اصطکاک کیهانی؛ پرهیز از شتاب";
  return "🛑 منطقه سکوت: زمان عقب‌نشینی آگاهانه و استراحت";
}

function updateLuckGaugeUI(now, pls, act) {
  const mode = window.getStore("luckMode", "total");
  const lk = window.calcGalacticLuck(pls, act, now);

  const f3hDate = new Date(now.getTime() + 3 * 3600000);
  const f3hPls = window.calcPlanets(f3hDate);
  const f3hAct = [];
  window.DB.forEach(ch => {
    const tp = f3hPls.find(p => p.gate === ch.g2);
    if (tp) f3hAct.push({ ch, p: tp });
  });
  const lk3h = window.calcGalacticLuck(f3hPls, f3hAct, f3hDate);

  const currentVal = lk[mode];
  const futureVal = lk3h[mode];
  const delta = futureVal - currentVal;

  const trendEl = document.getElementById("trendPill");
  if (delta >= 4) {
    trendEl.className = "trend-pill up";
    trendEl.textContent = "📈 صعودی (+" + delta + "٪)";
  } else if (delta <= -4) {
    trendEl.className = "trend-pill down";
    trendEl.textContent = "📉 نزولی (" + delta + "٪)";
  } else {
    trendEl.className = "trend-pill";
    trendEl.textContent = "⚖️ پایدار";
  }

  const modeColors = { total: "#22c55e", wealth: "#f5c56b", love: "#f43f5e", action: "#38bdf8" };

  const ang = -90 + (currentVal / 100) * 180;
  document.getElementById("luckNeedle").style.transform = "rotate(" + ang + "deg)";
  document.getElementById("needlePoly").setAttribute("fill", modeColors[mode]);
  document.getElementById("luckValTxt").textContent = currentVal + "%";
  document.getElementById("luckStatTxt").textContent = getStatusTextForScore(currentVal, mode);

  document.getElementById("swVal").textContent = lk.wealth + "%"; document.getElementById("swBar").style.width = lk.wealth + "%";
  document.getElementById("slVal").textContent = lk.love + "%"; document.getElementById("slBar").style.width = lk.love + "%";
  document.getElementById("svVal").textContent = lk.action + "%"; document.getElementById("svBar").style.width = lk.action + "%";
  document.getElementById("siVal").textContent = lk.total + "%"; document.getElementById("siBar").style.width = lk.total + "%";

  const fBox = document.getElementById("luckFactorsList");
  fBox.innerHTML = "";
  lk.factors.forEach(f => {
    fBox.innerHTML += '<div class="factor-row ' + (f.sign === "+" ? "pos" : "neg") + '"><span>' + f.text + '</span><b>' + f.val + '</b></div>';
  });

  render24hLuckWave(now, mode);
  return lk;
}

function render24hLuckWave(now, mode) {
  const waveContainer = document.getElementById("luckWaveBars");
  waveContainer.innerHTML = "";
  let bestScore = -1, worstScore = 101;
  let bestTimeStr = "", worstTimeStr = "";

  for (let h = 0; h <= 22; h += 2) {
    const fDate = new Date(now.getTime() + h * 3600000);
    const fPls = window.calcPlanets(fDate);
    const tMap = new Map();
    fPls.forEach(p => { if (!tMap.has(p.gate)) tMap.set(p.gate, p); });
    const fAct = [];
    window.DB.forEach(ch => { if (tMap.has(ch.g2)) fAct.push({ ch, p: tMap.get(ch.g2) }); });
    const fLk = window.calcGalacticLuck(fPls, fAct, fDate);
    const val = fLk[mode];

    const clockStr = fDate.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
    if (val > bestScore) { bestScore = val; bestTimeStr = clockStr + " (" + val + "٪)"; }
    if (val < worstScore) { worstScore = val; worstTimeStr = clockStr + " (" + val + "٪)"; }

    const colColor = val >= 75 ? "#22c55e" : (val >= 45 ? "#f5c56b" : "#ef4444");
    const barHeight = Math.max(6, Math.round((val / 100) * 40));

    waveContainer.innerHTML += '<div class="w-col"><div class="w-bar" style="height:' + barHeight + 'px;background:' + colColor + '"></div><span class="w-lbl">' + (h === 0 ? "الان" : "+" + h) + '</span></div>';
  }
  document.getElementById("goldenHourChip").textContent = "🟢 اوج: " + bestTimeStr;
  document.getElementById("cautionHourChip").textContent = "🔴 احتیاط: " + worstTimeStr;
}

function renderBodyGraph(pls, act) {
  const mode = window.getStore("bgFilter", "all");
  document.querySelectorAll(".c-shape").forEach(el => el.setAttribute("class", "c-shape"));
  document.querySelectorAll(".ch-line").forEach(el => {
    const isNatalHalf = el.id && window.DB.some(c => c.svg === el.id);
    el.setAttribute("class", isNatalHalf ? "ch-line natal" : "ch-line");
  });

  const activeCenters = new Set();
  act.forEach(x => {
    const isMoonActive = x.p.isMoon;
    if (mode === "all" || (mode === "moon" && isMoonActive)) {
      x.ch.c.forEach(cn => activeCenters.add(cn));
      const lineEl = document.getElementById(x.ch.svg);
      if (lineEl) {
        lineEl.setAttribute("class", "ch-line " + (isMoonActive && mode === "moon" ? "active-moon" : "active-em"));
      }
    }
  });

  activeCenters.forEach(cName => {
    const cEl = document.getElementById("c-" + cName);
    if (cEl) {
      let col = "on-gold";
      if (cName === "head" || cName === "ajna" || cName === "throat") col = "on-blue";
      if (cName === "sacral" || cName === "root") col = "on-red";
      cEl.setAttribute("class", "c-shape " + col);
    }
  });
}

window.runApp = function(resetDeep) {
  const now = new Date();
  document.getElementById("clockDisplay").textContent = now.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
  const pls = window.calcPlanets(now);

  const tMap = new Map();
  let minH = 999999, nextP = pls[2];
  pls.forEach(p => {
    if (!tMap.has(p.gate) || p.h < tMap.get(p.gate).h) tMap.set(p.gate, p);
    if (p.h < minH) { minH = p.h; nextP = p; }
  });
  document.getElementById("timerBar").textContent = "⏱️ زمان تغییر بعدی: " + window.fmtH(minH);

  const act = [];
  window.DB.forEach(ch => {
    if (tMap.has(ch.g2)) {
      const tp = tMap.get(ch.g2);
      act.push({ ch, p: tp });
    }
  });

  renderBodyGraph(pls, act);
  const lk = updateLuckGaugeUI(now, pls, act);

  const box = document.getElementById("chList");
  box.innerHTML = "";
  if (act.length > 0) {
    document.getElementById("capText").textContent = act.map(x => x.ch.name).join(" | ");
    act.forEach(x => {
      box.innerHTML += '<div class="ch-item"><div class="ch-top"><span>⚡ ' + x.ch.name + '</span><span class="exp">فعال تا ' + window.fmtH(x.p.h) + '</span></div><div style="font-size:0.77rem;color:#cbd5e1">توسط <b>' + x.p.n + ' (' + x.p.s + ')</b> در پورت ' + x.ch.g2 + '.' + x.p.line + '</div></div>';
    });
    document.getElementById("fcBase").textContent = act.map(x => x.ch.fc).join(" ");
    document.getElementById("doTxt").textContent = act.map(x => x.ch.doT).join(" | ");
    document.getElementById("dontTxt").textContent = act.map(x => x.ch.dontT).join(" | ");
  } else {
    document.getElementById("capText").textContent = "میدان باز آینه‌ای رفلکتور";
    box.innerHTML = '<div class="ch-item"><div class="ch-top"><span>🌕 رفلکتور خالص</span></div></div>';
    document.getElementById("fcBase").textContent = "فضای روحی صاف، سبک و آینه‌ای.";
    document.getElementById("doTxt").textContent = "مشاهده بی‌طرفانه و استراحت.";
    document.getElementById("dontTxt").textContent = "تصمیم‌گیری عجولانه.";
  }

  const pg = document.getElementById("pGrid");
  pg.innerHTML = "";
  pls.forEach(p => {
    const hit = window.DB.some(c => c.g2 === p.gate);
    const isNatal = window.MY_GATES.has(p.gate);
    const cls = hit ? " hit" : (isNatal ? " natal-res" : "");
    pg.innerHTML += '<div class="p-chip' + cls + '"><span>' + p.s + ' ' + p.n + '</span><b style="color:#f5c56b">' + p.gate + '.' + p.line + '</b></div>';
  });

  window.OLDMAN_STATE = { now, pls, act, lk };
};

window.openModal = function(id) { document.getElementById(id).classList.add("open"); };
window.closeModal = function(id) { document.getElementById(id).classList.add("open") ? document.getElementById(id).classList.remove("open") : document.getElementById(id).classList.remove("open"); };
window.saveSet = function() {
  const p = document.getElementById("provSel").value;
  const k = document.getElementById("keyInp").value.trim();
  window.setStore("prov", p);
  if (k) window.setStore("key", k);
  document.getElementById("setModal").classList.remove("open");
};
