// =========================================================================
// CORE MODULE: ASTRONOMY, BODYGRAPH ENGINE, LUCK & SUPERNOVA
// =========================================================================
window.EMBEDDED_GEMINI_KEY = "";
window.MY_GATES = new Set([7,8,9,10,11,12,13,15,23,24,28,37,44,50,54,60,63]);
window.EXALTED_GATES = new Set([12, 37, 28, 50]);
window.DETRIMENT_GATES = new Set([13, 24, 44, 8, 9]);
window.NATAL_SUN_LON = 41.5;
window.NATAL_MOON_LON = 299.0;

window.MANDALA = [41,19,13,49,30,55,37,63,22,36,25,17,21,51,42,3,27,24,2,23,8,20,16,35,45,12,15,52,39,53,62,56,31,33,7,4,29,59,40,64,47,6,46,18,48,57,32,50,28,44,1,43,14,34,9,5,26,11,10,58,38,54,61,60];

(function injectChannelAndMirrorStyles() {
  if (document.getElementById("adv-channel-styles")) return;
  const st = document.createElement("style");
  st.id = "adv-channel-styles";
  st.textContent = `
    .aura-shift-banner {
      background: linear-gradient(135deg, rgba(56,189,248,0.16), rgba(245,197,107,0.14));
      border: 1px solid rgba(245,197,107,0.4);
      border-radius: 12px; padding: 9px 11px; margin-bottom: 10px;
      display: flex; align-items: center; justify-content: space-between; gap: 8px;
      font-size: 0.78rem; font-weight: 800; color: #fef08a;
    }
    .aura-shift-sub { font-size: 0.7rem; color: #cbd5e1; font-weight: 400; margin-top: 3px; }
    .ch-card-adv {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-right: 3.5px solid #ef4444;
      border-radius: 12px; padding: 10px 11px; margin-top: 9px;
      transition: all 0.25s ease; cursor: pointer;
    }
    .ch-card-adv.moon-ch { border-right-color: #38bdf8; background: rgba(56, 189, 248, 0.06); }
    .ch-fuel-bg { width: 100%; height: 5px; background: rgba(255,255,255,0.1); border-radius: 6px; overflow: hidden; margin: 7px 0 4px; }
    .ch-fuel-fill { height: 100%; border-radius: 6px; transition: width 0.5s ease; }
    .ch-drawer {
      display: none; margin-top: 9px; padding-top: 9px;
      border-top: 1px dashed rgba(255,255,255,0.14);
      font-size: 0.76rem; line-height: 1.75; color: #e2e8f0;
    }
    .ch-drawer.open { display: block; }
    .ch-tag-row { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 6px; }
    .ch-mini-badge { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); padding: 2px 8px; border-radius: 99px; font-size: 0.68rem; color: #93c5fd; }
    .ch-sg-box { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 6px; }
    .ch-shadow { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.28); border-radius: 8px; padding: 6px; font-size: 0.71rem; color: #fecaca; }
    .ch-gift { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.28); border-radius: 8px; padding: 6px; font-size: 0.71rem; color: #bbf7d0; }
    .ch-ask-btn {
      width: 100%; margin-top: 8px; padding: 8px 10px; border-radius: 9px;
      border: 1px solid rgba(245,197,107,0.5);
      background: linear-gradient(135deg, rgba(245,197,107,0.2), rgba(217,119,6,0.25));
      color: #fde68a; font-size: 0.75rem; font-weight: 800; cursor: pointer;
    }
    .ch-ai-reply {
      display: none; margin-top: 8px; padding: 9px 10px; border-radius: 9px;
      background: rgba(10, 14, 29, 0.92); border-right: 3px solid #f5c56b;
      color: #fef3c7; font-size: 0.77rem; line-height: 1.85; text-align: justify;
    }
    .near-miss-box {
      margin-top: 11px; padding: 9px 11px; border-radius: 11px;
      background: rgba(56, 189, 248, 0.05); border: 1px dashed rgba(56, 189, 248, 0.35);
      font-size: 0.75rem; color: #bae6fd;
    }
    .open-mirror-card {
      background: radial-gradient(circle at 50% 0%, rgba(56,189,248,0.15), rgba(15,23,42,0.9));
      border: 1px solid rgba(56,189,248,0.4); border-radius: 14px; padding: 12px;
      font-size: 0.8rem; line-height: 1.8; color: #e0f2fe;
    }
  `;
  document.head.appendChild(st);
})();

window.CENTER_NAMES = {
  head: { name: "مرکز تاج (Head)", role: "دریافت الهامات، پرسش‌های بنیادین و فشار ذهنی برای فهم هستی" },
  ajna: { name: "مرکز آجنا (Ajna)", role: "پردازش ذهنی، مفهوم‌سازی، تحلیل و دسته‌بندی باورها" },
  throat: { name: "مرکز گلو (Throat)", role: "تبلور، کلام، بیان حقیقت درونی و تبدیل انرژی به اقدام" },
  g: { name: "مرکز جی / هویت (G Center)", role: "قطب‌نمای عشق، جهت‌گیری زندگی و حس اصالتِ بودن" },
  heart: { name: "مرکز قلب / اراده (Heart/Ego)", role: "قدرت اراده، ارزش‌گذاری مادی و معنوی و وفای به عهد" },
  spleen: { name: "مرکز طحال (Spleen)", role: "غریزه لحظه‌ای، شهود بدنی، سیستم ایمنی و تشخیص امنیت در اکنون" },
  solar: { name: "مرکز شبکه خورشیدی (Solar Plexus)", role: "امواج عاطفی، لطافت احساسات، شور و اشتیاق انسانی" },
  sacral: { name: "مرکز ساکرال (Sacral)", role: "نیروی حیات، استقامت کاری و موتور انرژی روزانه" },
  root: { name: "مرکز ریشه (Root)", role: "فشار سازنده برای حرکت، تکامل و عبور از چالش‌های زمینی" }
};

window.PLANET_VIBES = {
  "ماه": "حسی شهودی، موجی، لطیف و سریع‌التغییر (ساعت‌شمار روح رفلکتور)",
  "خورشید": "انرژی کانونی، درخشان، هویت‌بخش و بسیار پررنگ در آگاهی امروز",
  "زمین": "لنگری باثبات، زمینی، واقعی و متمرکز بر تعادل جسم و زندگی روزمره",
  "عطارد": "ذهنی، کلامی، تحلیلی و مناسب برای پیام‌رسانی، گفتگو و یادگیری",
  "زهره": "مغناطیسی، عاطفی، ارزش‌محور و هماهنگ‌کننده روابط و زیبایی‌ها",
  "مریخ": "آتشین، جسور، پرشتاب و دارای نیروی پیش‌ران قوی (نیازمند مدیریت خشم و عجله)",
  "مشتری": "گسترش‌دهنده، پربرکت، خوش‌بین و آورنده شانس و فرصت‌های کلان",
  "زحل": "ساختارمند، جدی، استادانه و نیازمند نظم، تعهد و صبوری",
  "اورانوس": "غافلگیرکننده، بیدارگر، نوآور و شکننده الگوهای تکراری",
  "نپتون": "شهودی، رویایی، الهامی و لطیف (نیازمند پرهیز از ابهام و توهم)",
  "پلوتو": "عمیق، دگرگون‌کننده، ریشه‌ای و بسیار پرقدرت",
  "گره شمالی": "جهت‌دهنده به سمت مسیر تکامل و آینده",
  "گره جنوبی": "متکی بر استعدادهای کهن و تجربه‌های پخته گذشته"
};

window.GATE_THEMES = {
  1:"آفرینش و اصالت فردی", 2:"دریافت شهودی مسیر برتر", 3:"نظم نوین از دل آشوب", 4:"یافتن پاسخ در دل ابهام",
  5:"هم‌نوایی با ریتم طبیعی زمان", 6:"پالایش مرزهای صمیمیت و آرامش", 7:"رهبری خاموش و قطب‌نمای جمع", 8:"زیستن به عنوان الگوی اصیل",
  9:"قدرت تمرکز بر گام‌های کوچک", 10:"عشق به خویشتن و رهایی از قضاوت", 11:"تصویرسازی ذهنی و زایش ایده", 12:"سکوت شاعرانه تا لحظه مناسب بیان",
  13:"نگهبان خاطرات و شنونده رازها", 14:"جریان برکت در مسیر درست", 15:"تواضع و هماهنگی با تنوع انسان‌ها", 16:"ذوق و مهارت استادانه",
  17:"نگاه کل‌نگر و آینده‌بین", 18:"پالایش و شفای الگوهای کهنه", 19:"لطافت روح و درک نیاز هستی", 20:"بیداری و حضور محض در اکنون",
  21:"اقتدار و مدیریت خردمندانه", 22:"وقار، فیض الهی و گشودگی قلب", 23:"تراشیدن زواید و بیان حقیقت ناب", 24:"بازگشت روح به نقطه اشراق",
  25:"معصومیت کودکانه و عشق بی‌چون‌وچرا", 26:"کیمیاگری ارزش و کلام نافذ", 27:"مهرورزی و پاسداری از حیات", 28:"جسارت زیستنِ با معنا",
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
  33:"نیاز عمیق به خلوت، تنهایی و فاصله گرفتن از شلوغی‌ها", 34:"انرژی بالا و قدرت اقدام مستقل", 35:"میل به تنوع، تجربه جدید و شکستن یکنواختی", 36:"نوسان عاطفی گذرا که با کمی صبر به آرامش و پختگی می‌رسد",
  37:"نیاز به گرمای خانواده، رفاقت صمیمی و مهربانی متقابل", 38:"حس سرسختی و ایستادگی در برابر فشارهای بیرونی", 39:"حس شوخ‌طبعی، چالش‌گری یا تکان دادن فضای راکد", 40:"نیاز به استراحت، رها کردن بار مسئولیت دیگران و تجدید قوا",
  41:"جوانه زدن یک آرزو، امید یا خیال تازه در دل", 42:"حس رضایت از بستن یک پرونده قدیمی و تمام کردن کارهای ناتمام", 43:"جرقه زدن یک فهم و بصیرت ناگهانی در خلوت ذهن", 44:"شمّ تیز برای تشخیص صداقت افراد و فرصت‌های کاری",
  45:"توجه به مسائل مالی، دارایی و مدیریت هزینه‌ها", 46:"حس خوش‌شانسی، هم‌زمانی‌های شیرین و قرار گرفتن در جای درست", 47:"کنار هم قرار گرفتن قطعات پازل فکری و رسیدن به آرامش ذهنی", 48:"حس عمیق شدن در یک موضوع و پختگی فکری",
  49:"حساسیت نسبت به انصاف و اصول اخلاقی در روابط", 50:"حس مسئولیت‌پذیری، حفظ چهارچوب‌ها و آرامش خانه", 51:"شجاعت بالا و آمادگی برای یک حرکت جسورانه", 52:"آرامش عمیق، سکون و توانایی نشستن و تمرکز طولانی",
  53:"انرژی و انگیزه برای استارت زدن یک برنامه نو", 54:"انگیزه قوی برای پیشرفت مالی و ارتقای جایگاه", 55:"نوسان لطیف روحی میان دلتنگی شاعرانه و شادی عمیق", 56:"میل به معاشرت، تعریف کردن خاطرات و گپ و گفت صمیمی",
  57:"حس ششم فوق‌العاده تیز و دریافت هشدارها یا پیام‌های ظریف درونی", 58:"نشاط، سرزندگی و امید به بهتر شدن اوضاع", 59:"شکستن دیوارها و صمیمیت", 60:"تپش تحول در دل محدودیت",
  61:"خیره شدن به راز سر به مهر هستی", 62:"نام‌گذاری دقیق بر پدیده‌ها", 63:"پرسش مقدس در آغاز راه", 64:"شفقِ روشنایی پس از حیرت"
};

window.DB = [
  {id:"28-38",g1:28,g2:38,name:"کانال ۲۸-۳۸ (مبارز هدفمند)",mood:"ایستادگی شرافتمندانه، جسارت رویارویی با حقیقت و یافتن معنا در دل چالش‌ها",c:["spleen","root"],svg:"ch-28-38",lb:14,w:8,l:2,v:18,i:16,fc:"در حال حاضر موجی از استقامت، جسارت و تمرکز درونی در فضای زندگی شما جاری است.",doT:"حل مسائل دشوار، ورزش و تخلیه انرژی.",dontT:"درگیر شدن در جروبحث‌های فرسایشی.",shadow:"لجبازی بی‌مورد یا جنگیدن بر سر اهداف کم‌ارزش",gift:"شجاعت بی‌نظیر برای ایستادن پای حقیقت و عبور از موانع بزرگ"},
  {id:"61-24",g1:24,g2:61,name:"کانال ۶۱-۲۴ (آگاهی و تفکر)",mood:"اشراق درونی، سکوت پر رمز و راز و دریافت الهامات مستقیم از سرچشمه هستی",c:["head","ajna"],svg:"ch-61-24",lb:12,w:6,l:8,v:8,i:22,fc:"ذهن شما در این ساعات بسیار الهام‌گیر و عمیق است و ایده‌های ناب ناگهان به دلتان خطور می‌کنند.",doT:"مطالعه، مدیتیشن، یادداشت الهامات.",dontT:"نشخوار فکری بی‌پایان.",shadow:"کلافگی ذهنی از تکرار یک فکر و اصرار بر فهم فوری همه چیز",gift:"فرود آمدن ناگهانی یک الهام ناب در لحظه سکوت"},
  {id:"63-4",g1:63,g2:4,name:"کانال ۶۳-۴ (منطق)",mood:"بصیرت شفاف، دیدن نظم هندسی کائنات و شکافتن پرده ابهام با خرد",c:["head","ajna"],svg:"ch-63-4",lb:12,w:14,l:4,v:12,i:14,fc:"دیدی بسیار شفاف، منطقی و آینده‌نگر دارید.",doT:"بررسی فنی پروژه‌ها.",dontT:"تعمیم دادن شک و تردید.",shadow:"وسواس فکری و شک کردن به خود و روابط شخصی",gift:"تیزهوشی استثنایی در یافتن الگوهای منطقی و حل مسائل فنی"},
  {id:"11-56",g1:11,g2:56,name:"کانال ۱۱-۵۶ (روایت‌گری)",mood:"سیر و سلوک در خاطرات، تمثیل‌پردازی شاعرانه",c:["ajna","throat"],svg:"ch-11-56",lb:14,w:10,l:18,v:16,i:12,fc:"مناسب گفتگو و اشتراک‌گذاری ایده‌ها.",doT:"گفتگوهای صمیمی.",dontT:"دادن قول‌های اجرایی.",shadow:"پراکندهگویی یا تبدیل کردن ایده‌های خام به تعهدات سنگین",gift:"طلسم کردن مخاطب با روایت‌های شیرین، الهام‌بخش و تصویرساز"},
  {id:"43-23",g1:23,g2:43,name:"کانال ۴۳-۲۳ (نبوغ و ساختاردهی)",mood:"کلام برنده و ناب",c:["ajna","throat"],svg:"ch-43-23",lb:15,w:16,l:8,v:18,i:18,fc:"راه‌حل‌های ساده و هوشمندانه برای کارهای پیچیده.",doT:"ساده‌سازی کارها.",dontT:"بیان دیدگاه‌های انقلابی.",shadow:"گفتن حرف درست در زمان نامناسب که باعث سوءتفاهم شود",gift:"بیان یک بینش نبوغ‌آمیز به ساده‌ترین و موثرترین شکل ممکن"},
  {id:"12-22",g1:12,g2:22,name:"کانال ۱۲-۲۲ (گشودگی اجتماعی)",mood:"لطافت شاعرانه و وقار عاطفی",c:["throat","solar"],svg:"ch-12-22",lb:18,w:14,l:26,v:18,i:14,fc:"جذابیت کلامی و نفوذ عاطفی بالا.",doT:"تعاملات اجتماعی.",dontT:"صحبت در کلافگی.",shadow:"مجبور کردن خود به معاشرت وقتی حوصله نداری",gift:"وقار، کاریزمای جادویی و نفوذ کلام مستقیم بر قلب دیگران"},
  {id:"8-1",g1:8,g2:1,name:"کانال ۱-۸ (الهام‌بخشی)",mood:"درخشش فردیت اصیل",c:["throat","g"],svg:"ch-8-1",lb:14,w:14,l:14,v:18,i:14,fc:"اصالت فردی و الهام‌بخشی به دیگران.",doT:"ارائه سبک شخصی.",dontT:"تقلید از دیگران.",shadow:"نگرانی از دیده نشدن یا همرنگ شدن با جماعت",gift:"درخشش اصالت شخصی و تبدیل شدن به الگوی الهام‌بخش"},
  {id:"31-7",g1:7,g2:31,name:"کانال ۷-۳۱ (هدایت آینده)",mood:"آرامشِ راهنما",c:["throat","g"],svg:"ch-31-7",lb:15,w:16,l:14,v:18,i:14,fc:"استقبال دیگران از راهنمایی شما.",doT:"مدیریت و برنامه‌ریزی.",dontT:"تحمیل نظر.",shadow:"تلاش برای کنترل دیگران بدون اینکه نظر تو را خواسته باشند",gift:"رهبری طبیعی، دوراندیشی و نفوذ کلام مقتدرانه در جمع"},
  {id:"33-13",g1:13,g2:33,name:"کانال ۱۳-۳۳ (شاهد خردمند)",mood:"سکوتِ شاهد کهنسال",c:["throat","g"],svg:"ch-33-13",lb:12,w:8,l:14,v:10,i:18,fc:"زمان خلوت آگاهانه و استخراج حکمت.",doT:"مرور درس‌های گذشته.",dontT:"شتاب‌زدگی.",shadow:"غرق شدن در حسرت گذشته یا افشای رازها پیش از پخته شدن",gift:"تبدیل کردن تجربیات گذشته به گنجینه‌ای از حکمت و آرامش"},
  {id:"10-20",g1:10,g2:20,name:"کانال ۱۰-۲۰ (بیداری در اکنون)",mood:"بیداری محض در لحظه اکنون",c:["g","throat"],svg:"ch-10-20",lb:14,w:10,l:16,v:16,i:18,fc:"انرژی حضور آرام در لحظه حال.",doT:"زندگی در اکنون.",dontT:"نگرانی درباره آینده.",shadow:"قضاوت کردن خود یا شرطی شدن توسط توقعات دیگران",gift:"حضور بیدار، اصیل و رها در لحظه اکنون و عشق به خویشتن"},
  {id:"10-34",g1:10,g2:34,name:"کانال ۱۰-۳۴ (قدرت فردی)",mood:"استقلال روح",c:["g","sacral"],svg:"ch-10-34",lb:16,w:18,l:8,v:24,i:14,fc:"انرژی بدنی بالا برای پیگیری امور.",doT:"کارهای نیازمند انرژی.",dontT:"خستگی مفرط.",shadow:"تحمیل کردن ریتم تند خود به دیگران یا کار کردن تا مرز فرسودگی",gift:"قدرت بدنی و استقلال درونی بالا برای پیشبرد اهداف شخصی"},
  {id:"10-57",g1:10,g2:57,name:"کانال ۱۰-۵۷ (شهود زنده)",mood:"گوش سپردن به نجوای غریزه",c:["g","spleen"],svg:"ch-10-57",lb:16,w:14,l:14,v:12,i:26,fc:"حس ششم قوی در لحظه.",doT:"اعتماد به حس درونی.",dontT:"نادیده گرفتن شهود.",shadow:"ترس از آینده و نادیده گرفتن هشدارهای ظریف بدن",gift:"حس ششم آینه‌ای و تصمیم‌گیری بی‌نقص در کسری از ثانیه"},
  {id:"15-5",g1:15,g2:5,name:"کانال ۵-۱۵ (ریتم طبیعی)",mood:"جاری شدن با رودخانه زمان",c:["g","sacral"],svg:"ch-15-5",lb:14,w:14,l:16,v:14,i:16,fc:"هماهنگی با ریتم طبیعت.",doT:"تنظیم روتین.",dontT:"عجله کردن.",shadow:"بی‌نظمی شدید یا تقلا برای جلو زدن از زمان طبیعی کارها",gift:"قرار گرفتن در جریان سینکرونیسیتی (هم‌زمانی) و مغناطیس شخصی بالا"},
  {id:"37-40",g1:37,g2:40,name:"کانال ۳۷-۴۰ (جامعه و توافق)",mood:"گرمای عهد و پیمان",c:["solar","heart"],svg:"ch-37-40",lb:18,w:18,l:24,v:14,i:14,fc:"رفاقت و توافق‌های منصفانه.",doT:"دورهمی صمیمی.",dontT:"قرارداد یک‌طرفه.",shadow:"فداکاری بیش از حد و رنجش از قدرناشناسی دیگران",gift:"بستن پیمان‌های منصفانه، پربرکت و تجربه گرمای اصیل رفاقت"},
  {id:"9-52",g1:9,g2:52,name:"کانال ۹-۵۲ (تمرکز عمیق)",mood:"وقار و سکون کوه",c:["sacral","root"],svg:"ch-9-52",lb:13,w:16,l:6,v:16,i:14,fc:"تمرکز عمیق روی جزئیات.",doT:"مطالعه و تحلیل.",dontT:"چندکارگی.",shadow:"بی‌قراری بدنی و پریدن از یک کار نیمه‌تمام به کار دیگر",gift:"سکون پرقدرت و تمرکز لیزری برای به سرانجام رساندن کارهای دقیق"},
  {id:"44-26",g1:44,g2:26,name:"کانال ۲۶-۴۴ (شمّ اقتصادی)",mood:"تیزبینی در شناخت ارزش‌ها",c:["spleen","heart"],svg:"ch-44-26",lb:20,w:28,l:12,v:20,i:20,fc:"شمّ اقتصادی قوی.",doT:"مذاکرات تجاری.",dontT:"خرید هیجانی.",shadow:"اغراق در مذاکره یا تصمیم‌گیری مالی از روی ترس",gift:"شمّ اقتصادی تیز، تشخیص سریع اعتبار افراد و مذاکره برنده"},
  {id:"50-27",g1:50,g2:27,name:"کانال ۲۷-۵۰ (مراقبت و ارزش‌ها)",mood:"شفقت و پاسداری از حیات",c:["spleen","sacral"],svg:"ch-50-27",lb:16,w:14,l:22,v:14,i:18,fc:"حس حمایت و توجه به سلامت.",doT:"حمایت معنوی.",dontT:"پذیرفتن بار دیگران.",shadow:"به دوش کشیدن بار مسئولیت کسانی که خودشان تلاش نمی‌کنند",gift:"مراقبت خردمندانه، تغذیه سالم روح و جسم و ایجاد امنیت پایدار"},
  {id:"3-60",g1:60,g2:3,name:"کانال ۳-۶۰ (جهش و نوآوری)",mood:"تولد نور از دل تنگنا",c:["root","sacral"],svg:"ch-3-60",lb:14,w:14,l:8,v:16,i:18,fc:"انرژی تحول و نوآوری.",doT:"صبوری.",dontT:"مقاومت در برابر تغییر.",shadow:"افسردگی یا کلافگی از کند پیش رفتن کارها در دوره گذار",gift:"جهش کوانتومی و خلق یک نظم کاملاً نو در زمان درست"},
  {id:"32-54",g1:54,g2:32,name:"کانال ۳۲-۵۴ (دگرگونی و صعود)",mood:"کیمیاگری صعود و ماندگاری",c:["spleen","root"],svg:"ch-32-54",lb:19,w:26,l:10,v:22,i:20,fc:"انرژی پیشرفت مالی بلندمدت.",doT:"برنامه‌ریزی بلندمدت.",dontT:"سودهای یک‌شبه.",shadow:"طمع و شتاب‌زدگی برای رسیدن به نتیجه مالی یک‌شبه",gift:"تشخیص غریزی پروژه‌های ماندگار و صعود پله‌پله به سمت ثروت"}
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
  return window.memStore[k] || def;
};

window.setStore = function(k, v) {
  window.memStore[k] = v;
  try { localStorage.setItem("oldman_" + k, v); } catch(e) {}
};

function norm(x) { return ((x % 360) + 360) % 360; }
function deg2g(lon) {
  const s = norm(lon - 302);
  const idx = Math.floor(s / 5.625);
  const rem = s - idx * 5.625;
  const line = Math.floor(rem / 0.9375) + 1;
  return { gate: window.MANDALA[idx], line: line, left: 5.625 - rem };
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
  const T = d / 36525.0;
  const r = Math.PI / 180;

  // محاسبه گره حقیقی ماه (True Node - منطبق با هیومن دیزاین)
  const gS = norm(357.5291 + 0.98560028 * d);
  const mM = norm(134.9634 + 13.06499295 * d);
  const fM = norm(93.2721 + 13.22935024 * d);
  const dM = norm(297.8502 + 12.19074912 * d);
  const meanNode = norm(125.0445479 - 1934.1362891 * T + 0.0020754 * T * T);
  const nLon = norm(
    meanNode
    - 1.4979 * Math.sin(2 * (dM - fM) * r)
    - 0.1500 * Math.sin(gS * r)
    - 0.1226 * Math.sin(2 * dM * r)
    + 0.1176 * Math.sin(2 * fM * r)
    - 0.0801 * Math.sin(2 * (mM - fM) * r)
  );

  let sLon, eLon, mLon, mercLon, venLon, marsLon, jupLon, satLon, uraLon, nepLon, pluLon;

  if (window.Astronomy) {
    const A = window.Astronomy;
    const rot = A.Rotation_EQJ_ECT ? A.Rotation_EQJ_ECT(dt) : null;
    const precession = 0.013969 * (d / 365.25);

    const getTropicalLon = (bodyName) => {
      const vec = A.GeoVector(A.Body[bodyName], dt, true);
      if (rot && A.RotateVector) {
        const eclVec = A.RotateVector(rot, vec);
        return norm(Math.atan2(eclVec.y, eclVec.x) * (180 / Math.PI));
      }
      return norm(A.Ecliptic(vec).elon + precession);
    };

    sLon = norm(A.SunPosition(dt).elon);
    eLon = norm(sLon + 180);
    mLon = norm(A.EclipticGeoMoon(dt).lon);
    mercLon = getTropicalLon("Mercury");
    venLon  = getTropicalLon("Venus");
    marsLon = getTropicalLon("Mars");
    jupLon  = getTropicalLon("Jupiter");
    satLon  = getTropicalLon("Saturn");
    uraLon  = getTropicalLon("Uranus");
    nepLon  = getTropicalLon("Neptune");
    pluLon  = getTropicalLon("Pluto");
  } else {
    // فرمول پشتیبان در صورت عدم دسترسی به کتابخانه
    const d26 = jd - 2461333.5;
    const qS = norm(280.459 + 0.98564736 * d);
    sLon = norm(qS + 1.915 * Math.sin(gS * r) + 0.020 * Math.sin(2 * gS * r));
    eLon = norm(sLon + 180);
    const lM = norm(218.316 + 13.176396 * d);
    mLon = norm(
      lM + 6.289 * Math.sin(mM * r)
      + 1.274 * Math.sin((2 * dM - mM) * r)
      + 0.658 * Math.sin(2 * dM * r)
      + 0.214 * Math.sin(2 * mM * r)
      - 0.186 * Math.sin(gS * r)
      - 0.114 * Math.sin(2 * fM * r)
    );
    mercLon = norm(226.2 + 1.18 * d26 + 4.5 * Math.sin((110 + 3.1 * d26) * r));
    venLon  = norm(234.8 + 0.62 * d26);
    marsLon = norm(133.4 + 0.54 * d26);
    jupLon  = norm(142.1 + 0.095 * d26);
    satLon  = norm(18.6 - 0.032 * d26);
    uraLon  = norm(64.5 - 0.018 * d26);
    nepLon  = norm(1.9 - 0.012 * d26);
    pluLon  = norm(303.4 + 0.008 * d26);
  }

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
    const totalGateHours = (5.625 / p.sp) * 24;
    const hoursLeft = (inf.left / p.sp) * 24;
    const pctLeft = Math.max(4, Math.min(100, Math.round((hoursLeft / totalGateHours) * 100)));
    return {
      n: p.n, s: p.s, lon: p.l, gate: inf.gate, line: inf.line,
      h: hoursLeft, totalH: totalGateHours, pctLeft: pctLeft,
      wt: p.wt, fast: p.fast, isMoon: Boolean(p.isMoon)
    };
  });
};

function matchChannelBidirectional(ch, pls) {
  const transitGatesSet = new Set(pls.map(p => p.gate));
  const hasG1 = transitGatesSet.has(ch.g1) || window.MY_GATES.has(ch.g1);
  const hasG2 = transitGatesSet.has(ch.g2) || window.MY_GATES.has(ch.g2);

  if (!hasG1 || !hasG2) return null;

  const moon = pls[2];
  const pMoon = (moon && (moon.gate === ch.g1 || moon.gate === ch.g2)) ? moon : null;
  const pG2 = pls.find(p => p.gate === ch.g2);
  const pG1 = pls.find(p => p.gate === ch.g1);
  const triggerPlanet = pMoon || pG2 || pG1 || {
    n: "چارت تولد", s: "✦", gate: window.MY_GATES.has(ch.g2) ? ch.g2 : ch.g1,
    line: 1, h: 24, pctLeft: 100, wt: 1.0, fast: false, isMoon: false
  };

  return { ch, p: triggerPlanet, isMoonLock: Boolean(pMoon) };
}

function collectActiveChannels(pls) {
  const act = [];
  window.DB.forEach(ch => {
    const matched = matchChannelBidirectional(ch, pls);
    if (matched) act.push(matched);
  });
  return act;
}

window.calcGalacticLuck = function(pls, act, dateObj = new Date()) {
  const factors = [];
  let total = 45, wealth = 44, love = 45, action = 44;
  const moon = pls[2];

  let slowChannelCap = 0;
  act.forEach(x => {
    if (x.isMoonLock || (x.p && x.p.isMoon)) {
      const boost = Math.round(x.ch.lb * 1.45);
      total += boost; wealth += x.ch.w * 1.1; love += x.ch.l * 1.1; action += x.ch.v * 1.1;
      factors.push({ sign: "+", val: "+" + boost + "%", text: "قفل مستقیم ماه در " + x.ch.name });
    } else if (x.p && x.p.fast) {
      const boost = Math.round(x.ch.lb * 0.85);
      total += boost; wealth += x.ch.w * 0.7; love += x.ch.l * 0.7; action += x.ch.v * 0.7;
      factors.push({ sign: "+", val: "+" + boost + "%", text: "کانال " + x.p.n + ": " + x.ch.name });
    } else {
      if (slowChannelCap < 10) {
        const b = Math.min(5, 10 - slowChannelCap);
        slowChannelCap += b;
        total += b; wealth += 4; love += 4; action += 4;
        factors.push({ sign: "+", val: "+" + b + "%", text: "هم‌نوایی چارت تولد / بستر فصلی در " + x.ch.name });
      }
    }
  });

  if (moon && window.EXALTED_GATES.has(moon.gate)) {
    total += 18; wealth += 16; love += 20; action += 15;
    factors.push({ sign: "+", val: "+18%", text: "ماه در دروازه شرف (▲ پورت " + moon.gate + ")" });
  }
  if (moon && window.DETRIMENT_GATES.has(moon.gate)) {
    total -= 16; wealth -= 14; love -= 12; action -= 18;
    factors.push({ sign: "-", val: "-16%", text: "ماه در نقطه هبوط (▼ پورت " + moon.gate + ")" });
  }

  const diffNatalSun = moon ? Math.abs(norm(moon.lon - window.NATAL_SUN_LON)) : 0;
  const angleSun = diffNatalSun > 180 ? 360 - diffNatalSun : diffNatalSun;

  if (Math.abs(angleSun - 120) <= 18 || Math.abs(angleSun - 60) <= 15 || angleSun <= 14) {
    total += 15; wealth += 14; love += 16; action += 14;
    factors.push({ sign: "+", val: "+15%", text: "زاویه هارمونیک سعد ماه با خورشید تولد" });
  } else if (Math.abs(angleSun - 90) <= 16 || Math.abs(angleSun - 180) <= 16) {
    total -= 15; wealth -= 12; love -= 16; action -= 14;
    factors.push({ sign: "-", val: "-15%", text: "زاویه اصطکاکی ماه با مدار تولد" });
  }

  if (moon && (moon.line === 2 || moon.line === 6)) {
    total += 12; love += 12; wealth += 10; action += 10;
    factors.push({ sign: "+", val: "+12%", text: "هم‌فرکانسی خط ماه (خط " + moon.line + ") با پروفایل ۶/۲" });
  } else if (moon && moon.line === 3) {
    total -= 10; wealth -= 14; action -= 6;
    factors.push({ sign: "-", val: "-10%", text: "ماه در خط ۳ (فاز آزمون و خطا)" });
  }

  const decHours = dateObj.getHours() + dateObj.getMinutes() / 60;
  const diurnalWave = Math.round(14 * Math.sin(((decHours - 9) / 24) * 2 * Math.PI));
  total += diurnalWave;

  const clamp = (v, min = 4, max = 99) => Math.max(min, Math.min(max, Math.round(v)));
  return { total: clamp(total, 5, 98), wealth: clamp(wealth, 5, 98), love: clamp(love, 5, 98), action: clamp(action, 5, 98), factors };
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

window.setBgFilter = function(mode) {
  window.setStore("bgFilter", mode);
  const allBtn = document.getElementById("filterAllBtn");
  const moonBtn = document.getElementById("filterMoonBtn");
  if (allBtn) allBtn.className = "bg-filter-btn" + (mode === "all" ? " active" : "");
  if (moonBtn) moonBtn.className = "bg-filter-btn" + (mode === "moon" ? " active" : "");

  if (window.OLDMAN_STATE) {
    renderBodyGraph(window.OLDMAN_STATE.pls, window.OLDMAN_STATE.act);
  }
};

function getStatusTextForScore(score) {
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
  const f3hAct = collectActiveChannels(f3hPls);
  const lk3h = window.calcGalacticLuck(f3hPls, f3hAct, f3hDate);

  const currentVal = lk[mode];
  const delta = lk3h[mode] - currentVal;

  const trendEl = document.getElementById("trendPill");
  if (trendEl) {
    if (delta >= 4) { trendEl.className = "trend-pill up"; trendEl.textContent = "📈 صعودی (+" + delta + "٪)"; }
    else if (delta <= -4) { trendEl.className = "trend-pill down"; trendEl.textContent = "📉 نزولی (" + delta + "٪)"; }
    else { trendEl.className = "trend-pill"; trendEl.textContent = "⚖️ پایدار"; }
  }

  const modeColors = { total: "#22c55e", wealth: "#f5c56b", love: "#f43f5e", action: "#38bdf8" };
  const ang = -90 + (currentVal / 100) * 180;
  const needle = document.getElementById("luckNeedle");
  const poly = document.getElementById("needlePoly");
  const valTxt = document.getElementById("luckValTxt");
  const statTxt = document.getElementById("luckStatTxt");
  if (needle) needle.style.transform = "rotate(" + ang + "deg)";
  if (poly) poly.setAttribute("fill", modeColors[mode]);
  if (valTxt) valTxt.textContent = currentVal + "%";
  if (statTxt) statTxt.textContent = getStatusTextForScore(currentVal);

  const swVal = document.getElementById("swVal"); const swBar = document.getElementById("swBar");
  const slVal = document.getElementById("slVal"); const slBar = document.getElementById("slBar");
  const svVal = document.getElementById("svVal"); const svBar = document.getElementById("svBar");
  const siVal = document.getElementById("siVal"); const siBar = document.getElementById("siBar");
  if (swVal) swVal.textContent = lk.wealth + "%"; if (swBar) swBar.style.width = lk.wealth + "%";
  if (slVal) slVal.textContent = lk.love + "%"; if (slBar) slBar.style.width = lk.love + "%";
  if (svVal) svVal.textContent = lk.action + "%"; if (svBar) svBar.style.width = lk.action + "%";
  if (siVal) siVal.textContent = lk.total + "%"; if (siBar) siBar.style.width = lk.total + "%";

  const fBox = document.getElementById("luckFactorsList");
  if (fBox) {
    fBox.innerHTML = "";
    lk.factors.forEach(f => {
      fBox.innerHTML += '<div class="factor-row ' + (f.sign === "+" ? "pos" : "neg") + '"><span>' + f.text + '</span><b>' + f.val + '</b></div>';
    });
  }

  render24hLuckWave(now, mode);
  return lk;
}

function render24hLuckWave(now, mode) {
  const waveContainer = document.getElementById("luckWaveBars");
  if (!waveContainer) return;
  waveContainer.innerHTML = "";
  let bestScore = -1, worstScore = 101, bestTimeStr = "", worstTimeStr = "";

  for (let h = 0; h <= 22; h += 2) {
    const fDate = new Date(now.getTime() + h * 3600000);
    const fPls = window.calcPlanets(fDate);
    const fAct = collectActiveChannels(fPls);
    const fLk = window.calcGalacticLuck(fPls, fAct, fDate);
    const val = fLk[mode];

    const clockStr = fDate.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
    if (val > bestScore) { bestScore = val; bestTimeStr = clockStr + " (" + val + "٪)"; }
    if (val < worstScore) { worstScore = val; worstTimeStr = clockStr + " (" + val + "٪)"; }

    const colColor = val >= 75 ? "#22c55e" : (val >= 45 ? "#f5c56b" : "#ef4444");
    const barHeight = Math.max(6, Math.round((val / 100) * 40));

    waveContainer.innerHTML += '<div class="w-col"><div class="w-bar" style="height:' + barHeight + 'px;background:' + colColor + '"></div><span class="w-lbl">' + (h === 0 ? "الان" : "+" + h) + '</span></div>';
  }
  const gChip = document.getElementById("goldenHourChip");
  const cChip = document.getElementById("cautionHourChip");
  if (gChip) gChip.textContent = "🟢 اوج: " + bestTimeStr;
  if (cChip) cChip.textContent = "🔴 احتیاط: " + worstTimeStr;
}

function setupInteractiveCenters() {
  Object.keys(window.CENTER_NAMES).forEach(cKey => {
    const el = document.getElementById("c-" + cKey);
    if (el && !el.dataset.bound) {
      el.dataset.bound = "1";
      el.style.cursor = "pointer";
      el.addEventListener("click", () => {
        if (window.isSupernovaActiveGlobal) return;
        const info = window.CENTER_NAMES[cKey];
        const isLit = el.getAttribute("class").includes("on-");
        const statusStr = isLit ? "⚡ فعال‌شده توسط ترانزیت / چارت تولد" : "🌕 باز و آینه‌ای (دریافت‌کننده ناب انرژی محیط)";
        const capEl = document.getElementById("capText");
        if (capEl) {
          capEl.innerHTML = "<span style='color:#38bdf8'>" + info.name + ":</span> " + statusStr + "<br/><span style='font-size:0.74rem;color:#cbd5e1;font-weight:400'>" + info.role + "</span>";
        }
      });
    }
  });
}

window.isSupernovaActiveGlobal = false;

function renderBodyGraph(pls, act) {
  if (window.isSupernovaActiveGlobal) return;

  setupInteractiveCenters();
  const mode = window.getStore("bgFilter", "all");
  const moon = pls[2];
  const capEl = document.getElementById("capText");
  const sidebarEl = document.getElementById("bgPlanetSidebar");

  if (sidebarEl) {
    sidebarEl.innerHTML = "";
    pls.forEach((p, idx) => {
      const isDesign = (idx % 2 === 0);
      const rowCls = isDesign ? "pl-red" : "pl-blk";
      sidebarEl.innerHTML += '<div class="pl-row"><span class="' + rowCls + '">' + p.s + ' ' + p.gate + '.' + p.line + '</span><span style="color:#94a3b8">' + p.n + '</span></div>';
    });
  }

  document.querySelectorAll(".c-shape").forEach(el => el.setAttribute("class", "c-shape"));
  document.querySelectorAll(".ch-line").forEach(el => {
    const isNatalHalf = el.id && window.DB.some(c => c.svg === el.id);
    el.setAttribute("class", isNatalHalf ? "ch-line natal" : "ch-line");
  });

  const activeCenters = new Set();
  const moonActiveChannels = act.filter(x =>
    Boolean(x.isMoonLock) ||
    (x.p && x.p.isMoon) ||
    (moon && (moon.gate === x.ch.g1 || moon.gate === x.ch.g2))
  );

  if (mode === "moon") {
    moonActiveChannels.forEach(x => {
      x.ch.c.forEach(cn => activeCenters.add(cn));
      const lineEl = document.getElementById(x.ch.svg);
      if (lineEl) lineEl.setAttribute("class", "ch-line active-moon");
    });

    activeCenters.forEach(cName => {
      const cEl = document.getElementById("c-" + cName);
      if (cEl) cEl.setAttribute("class", "c-shape on-blue");
    });

    if (capEl && moon) {
      if (moonActiveChannels.length > 0) {
        capEl.innerHTML = "🌙 قفلِ ماه: <b>" + moonActiveChannels.map(x => x.ch.name).join(" | ") + "</b><br/><span style='font-size:0.74rem;color:#7dd3fc'>ماه در دروازه " + moon.gate + "." + moon.line + " • تغییر دروازه تا " + window.fmtH(moon.h) + "</span>";
      } else {
        capEl.innerHTML = "🌙 ماه در دروازه <b>" + moon.gate + "." + moon.line + "</b> (هیچ کانالی قفل نیست)<br/><span style='font-size:0.74rem;color:#7dd3fc'>تغییر دروازه ماه تا " + window.fmtH(moon.h) + "</span>";
      }
    }
  } else {
    act.forEach(x => {
      x.ch.c.forEach(cn => activeCenters.add(cn));
      const lineEl = document.getElementById(x.ch.svg);
      if (lineEl) {
        const lineType = (x.isMoonLock || (x.p && x.p.isMoon))
          ? "active-moon"
          : ((x.p && x.p.wt > 1.0) ? "active-design" : "active-pers");
        lineEl.setAttribute("class", "ch-line " + lineType);
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

    if (capEl) {
      if (act.length > 0) {
        capEl.textContent = act.map(x => x.ch.name).join(" | ");
      } else {
        capEl.textContent = "میدان باز و آینه‌ای رفلکتور (هیچ کانالی قفل نیست)";
      }
    }
  }
}

function computeAuraShift(act) {
  if (!act || act.length === 0) {
    return {
      icon: "🌕",
      title: "هاله فعلی: رفلکتور خالص و آینه‌ای",
      desc: "هیچ مرکز قرضی فعالی وجود ندارد؛ در سبک‌ترین، شفاف‌ترین و مشاهده‌گرترین حالت طبیعی خود قرار داری."
    };
  }
  const centers = new Set();
  act.forEach(x => x.ch.c.forEach(c => centers.add(c)));

  const hasSacral = centers.has("sacral");
  const hasThroat = centers.has("throat");
  const hasMotorToThroat = act.some(x => x.ch.c.includes("throat") && (x.ch.c.includes("solar") || x.ch.c.includes("heart") || x.ch.c.includes("sacral") || x.ch.c.includes("root")));

  if (hasSacral && hasThroat) {
    return {
      icon: "⚡🗣️",
      title: "تغییر موقت هاله: فاز منیفستینگ-ژنراتور (MG)",
      desc: "هم موتور ساکرال روشن است و هم مرکز گلو؛ سرعت عمل، استقامت کاری و قدرت به ثمر رساندن کارها در اوج است."
    };
  }
  if (hasSacral) {
    return {
      icon: "⚡",
      title: "تغییر موقت هاله: فاز ژنراتور (موتور حیات روشن)",
      desc: "مرکز ساکرال شما موقتاً شارژ شده؛ زمان عالی برای کارهای اجرایی، پیگیری پروژه‌ها و فعالیت فیزیکی."
    };
  }
  if (hasMotorToThroat || hasThroat) {
    return {
      icon: "🗣️",
      title: "تغییر موقت هاله: فاز منیفستور / بیانگر",
      desc: "مرکز گلو فعال است؛ کلامت نفوذ بالایی دارد و برای گفتگو، مذاکره و آغازگری در جمع عالی است."
    };
  }
  return {
    icon: "👁️",
    title: "تغییر موقت هاله: فاز پروژکتور (دیدِ عمیق و هدایتگر)",
    desc: "مراکز آگاهی و شهود روشن شده‌اند؛ بهترین زمان برای تحلیل، برنامه‌ریزی، مشاوره و دیدن تصویر بزرگ‌تر."
  };
}

function findNextNearMissChannel(now) {
  const nowMoon = window.calcPlanets(now)[2];
  for (let m = 15; m <= 720; m += 15) {
    const dt = new Date(now.getTime() + m * 60000);
    const pls = window.calcPlanets(dt);
    const moon = pls[2];
    for (let i = 0; i < window.DB.length; i++) {
      const ch = window.DB[i];
      const touchesChannel = (moon.gate === ch.g2 || moon.gate === ch.g1);
      const alreadyTouchingNow = (nowMoon.gate === ch.g2 || nowMoon.gate === ch.g1);
      if (touchesChannel && !alreadyTouchingNow) {
        const partnerGate = moon.gate === ch.g2 ? ch.g1 : ch.g2;
        const partnerReady = pls.some(p => p.gate === partnerGate) || window.MY_GATES.has(partnerGate);
        if (partnerReady) {
          return { ch, hoursUntil: m / 60, dt, gateReached: moon.gate };
        }
      }
    }
  }
  return null;
}

window.toggleChannelDrawer = function(idx) {
  const dr = document.getElementById("ch-drawer-" + idx);
  if (dr) dr.classList.toggle("open");
};

window.askOldmanAboutChannel = async function(ev, idx, chId, planetName, hoursLeftStr) {
  if (ev) ev.stopPropagation();
  const replyBox = document.getElementById("ch-ai-reply-" + idx);
  const btn = document.getElementById("ch-ask-btn-" + idx);
  if (!replyBox || !btn) return;

  const chObj = window.DB.find(c => c.id === chId);
  if (!chObj) return;

  // خواندن تنظیمات مشترک با صفحه خلوتگاه پیرمرد (oracle.html)
  const savedProv = localStorage.getItem("oldman_sage_provider_v1") || (window.getStore ? window.getStore("prov", "gemini") : "gemini");
  const activeProv = savedProv === "openrouter" ? "openrouter" : "gemini";

  const apiKey = activeProv === "openrouter"
    ? (localStorage.getItem("oldman_sage_openrouter_key_v1") || "").trim()
    : (
        (localStorage.getItem("oldman_sage_gemini_key_v1") || "").trim() ||
        (localStorage.getItem("oldman_sage_custom_api_key_v1") || "").trim() ||
        (window.getStore ? window.getStore("key", "") : "").trim()
      );

  if (!apiKey) {
    replyBox.style.display = "block";
    replyBox.innerHTML = "<span style='color:#fca5a5'>⚠️ کلید هوش مصنوعی یافت نشد. لطفاً یک بار در صفحه «پیرمرد» (بخش تنظیمات) کلید را ذخیره کن.</span>";
    return;
  }

  replyBox.style.display = "block";
  replyBox.innerHTML = "🧙‍♂️ پیرمرد در حال تأمل روی این موج انرژی...";
  btn.disabled = true;

  const systemPrompt = [
    "شما «پیرمرد» هستید؛ یک حکیم و راهنمای عمیق‌بین، گرم، دقیق و آگاه به مکانیک هیومن دیزاین (چارت رفلکتور ۶/۲).",
    "کل پاسخ باید کاملاً به زبان فارسی روان و مستقیم از زبان پیرمرد باشد؛ بدون هیچ مقدمه یا متن انگلیسی.",
    "در ۳ تا ۴ جمله‌ی بسیار کاربردی، عمیق و ملموس راهنمایی کن که شهریار در این ساعاتِ حضورِ این موج انرژی، دقیقاً چه اقدام یا رویکردی داشته باشد و از چه تله‌ای پرهیز کند.",
    "از ذکر اعداد فنی، شماره دروازه یا اصطلاحات خشک خودداری کن و حکیمانه و صمیمی سخن بگو."
  ].join("\n");

  const userPrompt = [
    `[بافت پنهان لحظه]`,
    `کانال فعال: ${chObj.name}`,
    `سیاره فعال‌کننده: ${planetName} (مدت باقی‌مانده: ${hoursLeftStr})`,
    `کیفیت و حال‌وهوا: ${chObj.mood}`,
    `سایه و تله: ${chObj.shadow || chObj.dontT}`,
    `هدیه و اوج: ${chObj.gift || chObj.doT}`,
    ``,
    `پرسش شهریار: پیرمرد، با این موج انرژی که الان در وجودم روشن شده دقیقاً چکار کنم تا بهترین بهره را ببرم؟`
  ].join("\n");

  const cleanPersian = (rawText) => {
    const txt = String(rawText || "").trim();
    if (!txt) return "";
    const lines = txt.split(/\r?\n/);
    const persianRegex = /[\u0600-\u06FF]/;
    const firstIdx = lines.findIndex(l => persianRegex.test(l));
    if (firstIdx > 0 && !persianRegex.test(lines.slice(0, firstIdx).join("\n"))) {
      return lines.slice(firstIdx).join("\n").trim();
    }
    return txt;
  };

  try {
    let aiText = "";
    let usedLabel = "";

    if (activeProv === "openrouter") {
      const orModel = (localStorage.getItem("oldman_sage_openrouter_model_v1") || "openai/gpt-4o-mini").trim();
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey,
          "HTTP-Referer": location.origin || "https://shahriark5-art.github.io",
          "X-Title": "OLDMAN Active Channel"
        },
        body: JSON.stringify({
          model: orModel,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          temperature: 0.8,
          max_tokens: 4096
        })
      });
      if (!res.ok) {
        const errT = await res.text().catch(() => "");
        throw new Error(`خطای OpenRouter (${res.status}): ${errT.slice(0, 140)}`);
      }
      const data = await res.json();
      aiText = cleanPersian(data?.choices?.[0]?.message?.content || "");
      usedLabel = "OpenRouter • " + orModel;
    } else {
      const gemModel = (localStorage.getItem("oldman_sage_gemini_model_v3") || "gemini-3.6-flash").trim().replace(/^models\//, "");
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(gemModel)}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ parts: [{ text: userPrompt }] }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 8192
          }
        })
      });
      if (!res.ok) {
        const errT = await res.text().catch(() => "");
        throw new Error(`خطای Gemini (${gemModel} - ${res.status}): ${errT.slice(0, 160)}`);
      }
      const data = await res.json();
      const rawOut = data?.candidates?.[0]?.content?.parts
        ?.filter(p => !p.thought)
        ?.map(p => p.text || "")
        .join("\n")
        .trim() || "";
      aiText = cleanPersian(rawOut);
      usedLabel = "Gemini • " + gemModel;
    }

    if (!aiText) {
      throw new Error("پاسخ خالی از هوش مصنوعی دریافت شد.");
    }

    replyBox.innerHTML =
      `<b>🧙‍♂️ نسخه پیرمرد برای این کانال:</b><br/>` +
      aiText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>") +
      `<div style="margin-top:6px;font-size:0.65rem;color:#94a3b8;text-align:left">${usedLabel}</div>`;
  } catch (err) {
    replyBox.innerHTML = `<span style="color:#fca5a5">⚠️ خطا در دریافت پاسخ از هوش مصنوعی:<br/>${err.message || "ارتباط برقرار نشد."}</span>`;
  } finally {
    btn.disabled = false;
  }
};

function renderActiveChannelsSection(now, pls, act) {
  const box = document.getElementById("chList");
  if (!box) return;
  box.innerHTML = "";

  const aura = computeAuraShift(act);
  let html =
    '<div class="aura-shift-banner">' +
      '<div>' +
        '<div>' + aura.icon + ' ' + aura.title + '</div>' +
        '<div class="aura-shift-sub">' + aura.desc + '</div>' +
      '</div>' +
    '</div>';

  if (act.length > 0) {
    act.forEach((x, idx) => {
      const pObj = x.p || { n: "تولد", s: "✦", gate: x.ch.g2, line: 1, h: 24, pctLeft: 100, isMoon: false };
      const isMoon = Boolean(x.isMoonLock || pObj.isMoon);
      const isUrgent = pObj.h < 0.75;
      const fuelColor = isUrgent ? "#ef4444" : (isMoon ? "#38bdf8" : "#22c55e");
      const c1Name = (window.CENTER_NAMES[x.ch.c[0]] && window.CENTER_NAMES[x.ch.c[0]].name) || x.ch.c[0];
      const c2Name = (window.CENTER_NAMES[x.ch.c[1]] && window.CENTER_NAMES[x.ch.c[1]].name) || x.ch.c[1];
      const pVibe = window.PLANET_VIBES[pObj.n] || "انرژی کیهانی فعال";
      const timeRemainingStr = window.fmtH(pObj.h);

      html +=
        '<div class="ch-card-adv' + (isMoon ? " moon-ch" : "") + '" onclick="toggleChannelDrawer(' + idx + ')">' +
          '<div class="ch-top">' +
            '<span>' + (isMoon ? "🌙 " : "⚡ ") + x.ch.name + '</span>' +
            '<span class="exp" style="color:' + (isUrgent ? "#fca5a5" : "#fde68a") + '">' + (isUrgent ? "⏳ رو به اتمام: " : "فعال تا ") + timeRemainingStr + '</span>' +
          '</div>' +
          '<div style="display:flex;justify-content:space-between;align-items:center;font-size:0.75rem;color:#cbd5e1">' +
            '<span>توسط <b>' + pObj.n + ' (' + pObj.s + ')</b> در دروازه ' + pObj.gate + '.' + pObj.line + '</span>' +
            '<span style="font-size:0.68rem;color:#7dd3fc">🔍 لمس برای کالبدشکافی ▾</span>' +
          '</div>' +
          '<div class="ch-fuel-bg" title="شارژ باقی‌مانده حضور سیاره در این دروازه">' +
            '<div class="ch-fuel-fill" style="width:' + pObj.pctLeft + '%;background:' + fuelColor + '"></div>' +
          '</div>' +
          '<div id="ch-drawer-' + idx + '" class="ch-drawer">' +
            '<div class="ch-tag-row">' +
              '<span class="ch-mini-badge">🔗 پیوند: ' + c1Name + ' ⬅️ ' + c2Name + '</span>' +
              '<span class="ch-mini-badge">🪐 شارژ دروازه: ' + pObj.pctLeft + '%</span>' +
            '</div>' +
            '<div style="margin-bottom:6px;color:#e0f2fe"><b>🎨 طعم سیاره (' + pObj.n + '):</b> ' + pVibe + '</div>' +
            '<div class="ch-sg-box">' +
              '<div class="ch-shadow"><b>⚠️ تله و سایه:</b><br/>' + (x.ch.shadow || x.ch.dontT) + '</div>' +
              '<div class="ch-gift"><b>✨ هدیه و اوج:</b><br/>' + (x.ch.gift || x.ch.doT) + '</div>' +
            '</div>' +
            '<button id="ch-ask-btn-' + idx + '" class="ch-ask-btn" onclick="askOldmanAboutChannel(event, ' + idx + ', \'' + x.ch.id + '\', \'' + pObj.n + '\', \'' + timeRemainingStr + '\')">🧙‍♂️ از پیرمرد بپرس با این انرژی چکار کنم؟</button>' +
            '<div id="ch-ai-reply-' + idx + '" class="ch-ai-reply" onclick="event.stopPropagation()"></div>' +
          '</div>' +
        '</div>';
    });
  } else {
    const moon = pls[2];
    const mTheme = (moon && window.GATE_THEMES[moon.gate]) || "حضور آگاهانه";
    const mFeel = (moon && window.GATE_FEELINGS[moon.gate]) || "آرامش و سبکی روح";
    html +=
      '<div class="open-mirror-card">' +
        '<div style="font-weight:800;color:#7dd3fc;margin-bottom:4px">🌕 ماه در میدان باز آینه‌ای (دروازه ' + (moon ? moon.gate + '.' + moon.line : "-") + ')</div>' +
        '<div>در این ساعت هیچ کانالی قفل نیست و هاله تو کاملاً باز و شفاف است. ماه در دروازه <b>' + (moon ? moon.gate : "-") + '</b> فیلتری از <b>«' + mTheme + '»</b> روی آینه روح تو انداخته است.</div>' +
        '<div style="margin-top:6px;font-size:0.75rem;color:#fde68a">✨ حس غالب فضا: ' + mFeel + (moon ? ' (تغییر دروازه ماه تا ' + window.fmtH(moon.h) + ')' : '') + '</div>' +
      '</div>';
  }

  const near = findNextNearMissChannel(now);
  if (near) {
    const lockClock = near.dt.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
    html +=
      '<div class="near-miss-box">' +
        '<div style="display:flex;justify-content:space-between;font-weight:800;color:#38bdf8;margin-bottom:3px">' +
          '<span>📡 رادار موج بعدی: در آستانه قفل شدن</span>' +
          '<span>ساعت ' + lockClock + ' (' + window.fmtH(near.hoursUntil) + ')</span>' +
        '</div>' +
        '<div>ماه به زودی وارد دروازه <b>' + near.gateReached + '</b> می‌شود و <b>«' + near.ch.name + '»</b> را روشن خواهد کرد.</div>' +
      '</div>';
  }

  box.innerHTML = html;
}

function renderUpcoming5Days(now) {
  const box = document.getElementById("upcomingListBox");
  if (!box) return;
  box.innerHTML = "";
  const seen = new Set();
  const events = [];

  for (let h = 1; h <= 120; h += 2) {
    const dt = new Date(now.getTime() + h * 3600000);
    const pls = window.calcPlanets(dt);
    const moon = pls[2];
    window.DB.forEach(ch => {
      if (moon.gate === ch.g2 || moon.gate === ch.g1) {
        const key = ch.id + "-" + Math.floor(h / 18);
        if (!seen.has(key)) {
          seen.add(key);
          events.push({ h, dt, ch, p: moon });
        }
      }
    });
  }

  if (events.length === 0) {
    box.innerHTML = '<div style="color:#94a3b8;font-size:0.78rem;text-align:center;padding:8px">در ۵ روز آینده قفل جدیدی توسط ماه رصد نشد.</div>';
    return;
  }

  events.slice(0, 8).forEach(ev => {
    const dayStr = ev.dt.toLocaleDateString("fa-IR", { weekday: "long", month: "short", day: "numeric" });
    const timeStr = ev.dt.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
    box.innerHTML +=
      '<div class="up-item">' +
        '<div class="up-top"><span>🌙 ' + ev.ch.name + '</span><span class="up-badge">' + window.fmtH(ev.h) + '</span></div>' +
        '<div class="up-time">📅 ' + dayStr + ' ساعت ' + timeStr + ' — ' + ev.ch.fc + '</div>' +
      '</div>';
  });
}

window.addLunarDecision = function() {
  const inp = document.getElementById("decisionTitleInp");
  if (!inp || !inp.value.trim()) return;
  let list = [];
  try { list = JSON.parse(window.getStore("decisions", "[]")); } catch(e) {}
  list.unshift({ title: inp.value.trim(), start: Date.now() });
  window.setStore("decisions", JSON.stringify(list));
  inp.value = "";
  renderLunarDecisions();
};

window.removeLunarDecision = function(idx) {
  let list = [];
  try { list = JSON.parse(window.getStore("decisions", "[]")); } catch(e) {}
  list.splice(idx, 1);
  window.setStore("decisions", JSON.stringify(list));
  renderLunarDecisions();
};

function renderLunarDecisions() {
  const box = document.getElementById("lunarDecisionsList");
  if (!box) return;
  let list = [];
  try { list = JSON.parse(window.getStore("decisions", "[]")); } catch(e) {}
  if (list.length === 0) {
    if (box) box.innerHTML = '<div style="color:#94a3b8;font-size:0.75rem;text-align:center;padding:6px">هنوز تصمیمی برای چرخه ۲۸ روزه ماه ثبت نکرده‌اید.</div>';
    return;
  }
  box.innerHTML = "";
  list.forEach((d, idx) => {
    const elapsedDays = Math.min(28, Math.floor((Date.now() - d.start) / 86400000) + 1);
    const pct = Math.min(100, Math.round((elapsedDays / 28) * 100));
    box.innerHTML +=
      '<div class="lunar-item">' +
        '<div style="display:flex;justify-content:space-between;margin-bottom:4px">' +
          '<b style="color:#fde68a">🌕 ' + d.title + '</b>' +
          '<span onclick="removeLunarDecision(' + idx + ')" style="color:#fca5a5;cursor:pointer;font-size:0.7rem">حذف ✕</span>' +
        '</div>' +
        '<div style="display:flex;justify-content:space-between;font-size:0.72rem;color:#cbd5e1">' +
          '<span>روز ' + elapsedDays + ' از ۲۸ روز</span><span>' + pct + '%</span>' +
        '</div>' +
        '<div class="bar-bg"><div class="bar-fill" style="width:' + pct + '%;background:#38bdf8"></div></div>' +
      '</div>';
  });
}

// =========================================================================
// RITUAL DUAL-THUMB SUPERNOVA & AUDIO/HAPTIC ENGINE
// =========================================================================
(function initCosmicRitualSensors() {
  let leftPressed = false;
  let rightPressed = false;
  let touchStartTime = 0;
  let audioCtx = null;
  let oscNode = null;
  let gainNode = null;

  function startCosmicSoundAndHaptic() {
    if (navigator.vibrate) {
      try { navigator.vibrate([45, 60, 45]); } catch(e) {}
    }

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        if (!audioCtx) audioCtx = new AudioContext();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        if (!oscNode) {
          oscNode = audioCtx.createOscillator();
          gainNode = audioCtx.createGain();

          oscNode.type = 'sine';
          oscNode.frequency.setValueAtTime(432, audioCtx.currentTime);

          gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.8);

          oscNode.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          oscNode.start();
        }
      }
    } catch(e) {}
  }

  function stopCosmicSound() {
    try {
      if (gainNode && audioCtx && oscNode) {
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
        setTimeout(() => {
          try {
            if (oscNode) {
              oscNode.stop();
              oscNode.disconnect();
            }
          } catch(e) {}
          oscNode = null;
          gainNode = null;
        }, 500);
      }
    } catch(e) {}
  }

  function activateSupernovaState() {
    window.isSupernovaActiveGlobal = true;
    const bgBox = document.querySelector(".bg-box");
    const filterRow = document.querySelector(".bg-filter-row");
    const capEl = document.getElementById("capText");

    if (bgBox) bgBox.classList.add("supernova-active");

    if (filterRow) {
      filterRow.style.display = "none";
      if (!document.getElementById("cosmicStarBadge")) {
        const starDiv = document.createElement("div");
        starDiv.id = "cosmicStarBadge";
        starDiv.style.textAlign = "center";
        starDiv.style.margin = "6px 0";
        starDiv.innerHTML = '<span class="cosmic-star-badge">⭐️ اتصال کیهانی برقرار شد ⭐️</span>';
        filterRow.parentNode.insertBefore(starDiv, filterRow);
      }
    }

    if (capEl) {
      capEl.innerHTML = "<span style='color:#fef08a;font-weight:900;'>✨ مدار کهکشانی کاملاً متصل شد؛ تمام مراکز و کانال‌ها یکپارچه گشتند.<br/>اکنون نیت خود را در دل یا بر زبان جاری کن...</span>";
    }

    document.querySelectorAll(".c-shape").forEach(el => el.setAttribute("class", "c-shape on-gold"));
    document.querySelectorAll(".ch-line").forEach(el => el.setAttribute("class", "ch-line active-design"));

    startCosmicSoundAndHaptic();
    if (touchStartTime === 0) touchStartTime = Date.now();
  }

  function deactivateSupernovaState() {
    window.isSupernovaActiveGlobal = false;
    const bgBox = document.querySelector(".bg-box");
    const filterRow = document.querySelector(".bg-filter-row");
    const starBadge = document.getElementById("cosmicStarBadge");
    const capEl = document.getElementById("capText");

    if (bgBox) bgBox.classList.remove("supernova-active");
    if (filterRow) filterRow.style.display = "flex";
    if (starBadge) starBadge.remove();

    stopCosmicSound();

    if (touchStartTime > 0) {
      const holdDuration = Date.now() - touchStartTime;
      touchStartTime = 0;

      if (holdDuration >= 2500 && capEl) {
        const moonGate = (window.OLDMAN_STATE && window.OLDMAN_STATE.pls && window.OLDMAN_STATE.pls[2]) ? window.OLDMAN_STATE.pls[2].gate : 1;
        const gateTheme = (window.GATE_THEMES && window.GATE_THEMES[moonGate]) || "حضور و آفرینش";

        capEl.innerHTML = "<span style='color:#4ade80;font-weight:900;'>🌟 پیام تو از مسیر دروازه " + moonGate + " («" + gateTheme + "») به افلاک مخابره شد و کائنات شنید.</span>";
        setTimeout(() => {
          if (window.OLDMAN_STATE && !window.isSupernovaActiveGlobal) {
            window.runApp(false);
          }
        }, 6000);
        return;
      }
    }

    if (window.OLDMAN_STATE) {
      window.runApp(false);
    }
  }

  function setupSensors() {
    const bgBox = document.querySelector(".bg-box");
    if (!bgBox || document.getElementById("ritualSensorL")) return;

    const sLeft = document.createElement("div");
    sLeft.id = "ritualSensorL";
    sLeft.className = "ritual-sensor-left";

    const sRight = document.createElement("div");
    sRight.id = "ritualSensorR";
    sRight.className = "ritual-sensor-right";

    bgBox.style.position = "relative";
    bgBox.appendChild(sLeft);
    bgBox.appendChild(sRight);

    function checkTouchState() {
      if (leftPressed && rightPressed) {
        activateSupernovaState();
      } else {
        deactivateSupernovaState();
      }
    }

    sLeft.addEventListener("touchstart", (e) => { e.preventDefault(); leftPressed = true; sLeft.classList.add("active-touch"); checkTouchState(); }, { passive: false });
    sLeft.addEventListener("touchend", (e) => { e.preventDefault(); leftPressed = false; sLeft.classList.remove("active-touch"); checkTouchState(); }, { passive: false });
    sLeft.addEventListener("touchcancel", (e) => { leftPressed = false; sLeft.classList.remove("active-touch"); checkTouchState(); });

    sRight.addEventListener("touchstart", (e) => { e.preventDefault(); rightPressed = true; sRight.classList.add("active-touch"); checkTouchState(); }, { passive: false });
    sRight.addEventListener("touchend", (e) => { e.preventDefault(); rightPressed = false; sRight.classList.remove("active-touch"); checkTouchState(); }, { passive: false });
    sRight.addEventListener("touchcancel", (e) => { rightPressed = false; sRight.classList.remove("active-touch"); checkTouchState(); });

    sLeft.addEventListener("mousedown", () => { leftPressed = true; sLeft.classList.add("active-touch"); checkTouchState(); });
    sLeft.addEventListener("mouseup", () => { leftPressed = false; sLeft.classList.remove("active-touch"); checkTouchState(); });
    sRight.addEventListener("mousedown", () => { rightPressed = true; sRight.classList.add("active-touch"); checkTouchState(); });
    sRight.addEventListener("mouseup", () => { rightPressed = false; sRight.classList.remove("active-touch"); checkTouchState(); });
  }

  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(setupSensors, 800);
  });
})();

window.runApp = function(resetDeep) {
  const now = new Date();
  const clockEl = document.getElementById("clockDisplay");
  if (clockEl) clockEl.textContent = now.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
  const pls = window.calcPlanets(now);

  const tMap = new Map();
  let minH = 999999;
  pls.forEach(p => {
    if (p.isMoon || !tMap.has(p.gate) || p.h < tMap.get(p.gate).h) {
      tMap.set(p.gate, p);
    }
    if (p.h < minH) minH = p.h;
  });
  const timerEl = document.getElementById("timerBar");
  if (timerEl) timerEl.textContent = "⏱️ زمان تغییر بعدی: " + window.fmtH(minH);

  const act = collectActiveChannels(pls);

  renderBodyGraph(pls, act);
  const lk = updateLuckGaugeUI(now, pls, act);
  renderActiveChannelsSection(now, pls, act);
  renderUpcoming5Days(now);
  renderLunarDecisions();

  if (act.length > 0) {
    const baseEl = document.getElementById("fcBase");
    const doEl = document.getElementById("doTxt");
    const dontEl = document.getElementById("dontTxt");
    if (baseEl) baseEl.textContent = act.map(x => x.ch.fc).join(" ");
    if (doEl) doEl.textContent = act.map(x => x.ch.doT).join(" | ");
    if (dontEl) dontEl.textContent = act.map(x => x.ch.dontT).join(" | ");
  } else {
    const baseEl = document.getElementById("fcBase");
    const doEl = document.getElementById("doTxt");
    const dontEl = document.getElementById("dontTxt");
    if (baseEl) baseEl.textContent = "فضای روحی صاف، سبک و آینه‌ای.";
    if (doEl) doEl.textContent = "مشاهده بی‌طرفانه و استراحت.";
    if (dontEl) dontEl.textContent = "تصمیم‌گیری عجولانه.";
  }

  const pg = document.getElementById("pGrid");
  if (pg) {
    pg.innerHTML = "";
    pls.forEach(p => {
      const hit = window.DB.some(c => c.g2 === p.gate || c.g1 === p.gate);
      const cls = hit ? " hit" : "";
      pg.innerHTML += '<div class="p-chip' + cls + '"><span>' + p.s + ' ' + p.n + '</span><b style="color:#f5c56b">' + p.gate + '.' + p.line + '</b></div>';
    });
  }

  window.OLDMAN_STATE = { now, pls, act, lk };
};

window.openModal = function(id) { document.getElementById(id).classList.add("open"); };
window.closeModal = function(id) { document.getElementById(id).classList.remove("open"); };
window.saveSet = function() {
  const p = document.getElementById("provSel").value;
  const k = document.getElementById("keyInp").value.trim();
  window.setStore("prov", p);
  if (k) window.setStore("key", k);
  document.getElementById("setModal").classList.remove("open");
};
