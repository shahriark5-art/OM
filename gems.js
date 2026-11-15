// =========================================================================
// MODULE 5: SHAHRIAR'S 14 SILVER RINGS & TALISMAN AI ORACLE (gems.js)
// =========================================================================
window.GemTalismanModule = (function() {
  let currentIntent = "auto";
  let isBusy = false;
  let cachedGemModel = "";

  // کلکسیون ۱۴ انگشتر نقره شهریار به همراه متادیتای نجومی و مراکز انرژی هیومن دیزاین
  const GEMS = [
    {
      id: 1, name: "عقیق سرخ (در رکاب نقره)", short: "عقیق سرخ",
      color: "#ef4444", glow: "rgba(239, 68, 68, 0.28)", icon: "🔴",
      planets: ["مریخ", "خورشید", "زمین"],
      centers: ["sacral", "root", "heart"],
      roles: ["wealth", "action"], fiery: true,
      finger: "انگشت دست راست (انگشت سوم یا چهارم)",
      vibe: "افزایش نیروی حیات، جسارت اقدام، برکت در روزی و غلبه بر سستی و تردید"
    },
    {
      id: 2, name: "گارنت / لعل آتشین (در رکاب نقره)", short: "گارنت",
      color: "#be123c", glow: "rgba(190, 18, 60, 0.3)", icon: "🍷",
      planets: ["مریخ", "پلوتو"],
      centers: ["root", "sacral", "heart"],
      roles: ["action", "charisma"], fiery: true,
      finger: "انگشت اشاره یا انگشت چهارم دست راست",
      vibe: "شارژر پرقدرت انرژی بدنی، مغناطیس شخصی، استقامت در پروژه‌های سنگین و بیداری شور زندگی"
    },
    {
      id: 3, name: "مالاکیت / مرمر سبز (در رکاب نقره)", short: "مالاکیت",
      color: "#10b981", glow: "rgba(16, 185, 129, 0.28)", icon: "🟢",
      planets: ["زهره", "مشتری"],
      centers: ["heart", "g", "solar"],
      roles: ["wealth", "shield"], fiery: false,
      finger: "انگشت چهارم دست چپ یا راست",
      vibe: "سنگ تحول و جذب فرصت‌های مالی، سپر قوی در برابر امواج سنگین محیطی و بازکننده گره‌های عاطفی"
    },
    {
      id: 4, name: "ابسیدین / شیشه آتشفشانی (در رکاب نقره)", short: "ابسیدین",
      color: "#64748b", glow: "rgba(100, 116, 139, 0.32)", icon: "🖤",
      planets: ["زحل", "پلوتو", "گره جنوبی"],
      centers: ["root", "spleen"],
      roles: ["shield"], fiery: false,
      finger: "انگشت میانی دست چپ یا راست",
      vibe: "آینه سیاه حقیقت؛ برش‌دهنده فوری انرژی‌های منفی، تخلیه تنش و لنگر انداختن عمیق در زمین"
    },
    {
      id: 5, name: "دُرّ نجف / کوارتز زلال (در رکاب نقره)", short: "دُرّ خالص",
      color: "#e2e8f0", glow: "rgba(226, 232, 240, 0.3)", icon: "💎",
      planets: ["ماه", "نپتون", "اورانوس"],
      centers: ["head", "ajna", "g"],
      roles: ["shield", "charisma"], fiery: false,
      finger: "انگشت چهارم دست راست",
      vibe: "هم‌ذات‌ترین نگین با هاله آینه‌ای رفلکتور؛ شفافیت محض ذهن، تقویت شهود و پاک‌سازی هاله از شرطی‌شدگی"
    },
    {
      id: 6, name: "آمیتیست / یاقوت ارغوانی (در رکاب نقره)", short: "آمیتیست",
      color: "#a855f7", glow: "rgba(168, 85, 247, 0.28)", icon: "🟣",
      planets: ["مشتری", "نپتون", "زحل"],
      centers: ["head", "ajna"],
      roles: ["shield", "charisma"], fiery: false,
      finger: "انگشت میانی یا چهارم دست چپ",
      vibe: "کیمیای آرامش ذهن؛ تبدیل نشخوار فکری به شهود خالص، ارتقای کیفیت خواب و دیدِ کل‌نگر"
    },
    {
      id: 7, name: "عقیق سوسنی (در رکاب نقره)", short: "عقیق سوسنی",
      color: "#ec4899", glow: "rgba(236, 72, 153, 0.26)", icon: "🌸",
      planets: ["زهره", "عطارد"],
      centers: ["solar", "throat", "g"],
      roles: ["charisma", "wealth"], fiery: false,
      finger: "انگشت چهارم دست راست یا چپ",
      vibe: "لطافت روح، گشایش در روابط و مذاکرات دوستانه، رفع دلتنگی و ایجاد هماهنگی عاطفی"
    },
    {
      id: 8, name: "شفت‌العبد (در رکاب نقره)", short: "شفت‌العبد",
      color: "#991b1b", glow: "rgba(153, 27, 27, 0.32)", icon: "🛡️",
      planets: ["زحل", "مریخ", "پلوتو"],
      centers: ["spleen", "root", "heart"],
      roles: ["shield", "action"], fiery: false,
      finger: "انگشت کوچک یا چهارم دست راست",
      vibe: "زره نفوذناپذیر انرژی؛ حفظ اقتدار در جمع‌های سنگین، دفع چشم‌زخم و تقویت غریزه بقا در مرکز طحال"
    },
    {
      id: 9, name: "زبرجد / پریدوت (در رکاب نقره)", short: "زبرجد",
      color: "#84cc16", glow: "rgba(132, 204, 22, 0.3)", icon: "💚",
      planets: ["خورشید", "عطارد", "مشتری"],
      centers: ["heart", "solar", "g"],
      roles: ["wealth", "charisma"], fiery: false,
      finger: "انگشت چهارم یا کوچک دست راست",
      vibe: "نگین خورشید تابان؛ جذب برکت و ثروت حلال، نشاط قلبی، خوش‌شانسی و گشودن درهای بسته اقتصادی"
    },
    {
      id: 10, name: "فیروزه اصیل (در رکاب نقره)", short: "فیروزه",
      color: "#06b6d4", glow: "rgba(6, 182, 212, 0.3)", icon: "🩵",
      planets: ["مشتری", "زهره", "گره شمالی"],
      centers: ["throat", "g", "ajna"],
      roles: ["wealth", "charisma", "shield"], fiery: false,
      finger: "انگشت چهارم دست راست یا چپ",
      vibe: "نگین اقبال و نفوذ کلام؛ هماهنگ‌کننده مرکز گلو، جلب نظر خیرخواهان و محافظت در سفر و معامله"
    },
    {
      id: 11, name: "عقیق شجر (در رکاب نقره)", short: "عقیق شجر",
      color: "#d97706", glow: "rgba(217, 119, 6, 0.28)", icon: "🌿",
      planets: ["زمین", "عطارد", "زحل"],
      centers: ["g", "spleen", "root"],
      roles: ["wealth", "action"], fiery: false,
      finger: "انگشت چهارم دست راست",
      vibe: "ریشه در زمین و شاخه در افلاک؛ ثبات قدم در پروژه‌های بلندمدت، هم‌نوایی با ریتم طبیعت و آرامش عمیق"
    },
    {
      id: 12, name: "توپاز درخشان (در رکاب نقره)", short: "توپاز",
      color: "#38bdf8", glow: "rgba(56, 189, 248, 0.3)", icon: "💠",
      planets: ["مشتری", "خورشید", "عطارد"],
      centers: ["throat", "ajna", "solar"],
      roles: ["charisma", "wealth", "action"], fiery: false,
      finger: "انگشت اشاره دست راست (انگشت مشتری)",
      vibe: "شفافیت فکر و بیان برنده؛ جذب موفقیت، اعتمادبه‌نفس در مذاکرات مهم و روشن کردن مسیر تصمیم‌گیری"
    },
    {
      id: 13, name: "لاجورد کهکشانی (در رکاب نقره)", short: "لاجورد",
      color: "#3b82f6", glow: "rgba(59, 130, 246, 0.32)", icon: "🌌",
      planets: ["زحل", "مشتری", "اورانوس"],
      centers: ["ajna", "throat", "head"],
      roles: ["charisma", "shield"], fiery: false,
      finger: "انگشت اشاره یا میانی دست راست",
      vibe: "سنگ حکیمان و رصدگران آسمان؛ بیداری چشم سوم (آجنا)، اقتدار کلامی و دریافت حقیقت بدون پرده"
    },
    {
      id: 14, name: "عقیق مشکی / اونیکس (در رکاب نقره)", short: "عقیق مشکی",
      color: "#94a3b8", glow: "rgba(148, 163, 184, 0.28)", icon: "⚫",
      planets: ["زحل", "مریخ"],
      centers: ["root", "sacral", "spleen"],
      roles: ["shield", "action"], fiery: false,
      finger: "انگشت میانی دست راست",
      vibe: "استوار همچون کوه؛ تمرکز لیزری، کنترل تکانه و هیجان، حفظ مرزهای شخصی و جذب انرژی‌های پراکنده"
    }
  ];

  // تزریق استایل اختصاصی نوار جواهرنشان
  (function injectGemStyles() {
    if (document.getElementById("gem-talisman-styles")) return;
    const st = document.createElement("style");
    st.id = "gem-talisman-styles";
    st.textContent = `
      .gem-bar-card {
        background: linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(8, 12, 26, 0.96));
        backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
        border: 1.5px solid rgba(245, 197, 107, 0.45);
        border-radius: 18px; padding: 10px 13px; margin: 8px 0 12px;
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.6);
        transition: all 0.35s ease;
      }
      .gem-compact-row {
        display: flex; align-items: center; justify-content: space-between; gap: 10px; cursor: pointer;
      }
      .gem-orb-badge {
        width: 36px; height: 36px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 1.15rem; flex-shrink: 0;
        border: 1.5px solid rgba(255,255,255,0.35);
        box-shadow: 0 0 16px rgba(245,197,107,0.4);
      }
      .gem-main-info { flex: 1; min-width: 0; }
      .gem-top-label { font-size: 0.67rem; color: #94a3b8; display: flex; align-items: center; gap: 5px; }
      .gem-selected-title { font-size: 0.85rem; font-weight: 900; color: #fef08a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .gem-expand-pill {
        font-size: 0.68rem; padding: 4px 9px; border-radius: 99px;
        background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14);
        color: #7dd3fc; font-weight: 700; flex-shrink: 0;
      }
      .gem-drawer {
        display: none; margin-top: 11px; padding-top: 10px;
        border-top: 1px dashed rgba(255,255,255,0.14);
        font-size: 0.78rem; line-height: 1.8; color: #e2e8f0;
      }
      .gem-drawer.open { display: block; }
      .gem-intent-tabs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; margin-bottom: 9px; }
      .gem-intent-btn {
        background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
        color: #94a3b8; font-size: 0.66rem; padding: 5px 3px; border-radius: 9px;
        cursor: pointer; text-align: center; transition: 0.2s;
      }
      .gem-intent-btn.active {
        background: rgba(245, 197, 107, 0.22); border-color: #f5c56b; color: #fff; font-weight: 800;
      }
      .gem-reason-box {
        background: rgba(255,255,255,0.03); border-right: 3px solid #f5c56b;
        border-radius: 10px; padding: 8px 10px; margin-bottom: 8px;
      }
      .gem-duo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 8px; }
      .gem-mini-card {
        background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
        border-radius: 9px; padding: 6px 8px; font-size: 0.71rem;
      }
      .gem-ai-btn {
        width: 100%; padding: 9px 12px; border-radius: 10px;
        border: 1px solid rgba(245, 197, 107, 0.65);
        background: linear-gradient(135deg, rgba(245,197,107,0.25), rgba(217,119,6,0.35));
        color: #fef08a; font-size: 0.77rem; font-weight: 900; cursor: pointer;
      }
      .gem-ai-output {
        display: none; margin-top: 9px; padding: 10px 11px; border-radius: 10px;
        background: rgba(6, 10, 22, 0.94); border-right: 3.5px solid #38bdf8;
        color: #e0f2fe; font-size: 0.78rem; line-height: 1.9; text-align: justify;
      }
    `;
    document.head.appendChild(st);
  })();

  async function fetchWithTimeout(url, options, timeoutMs) {
    const controller = new AbortController();
    const tId = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(tId);
      return res;
    } catch (err) {
      clearTimeout(tId);
      throw err;
    }
  }

  // الگوریتم امتیازدهی نجومی به هر ۱۴ انگشتر بر اساس چارت لحظه
  function rankGemsForMoment(pls, act, lk, intent) {
    const moon = pls && pls[2] ? pls[2] : { gate: 1, line: 1 };
    const isDetriment = window.DETRIMENT_GATES && window.DETRIMENT_GATES.has(moon.gate);
    const isExalted = window.EXALTED_GATES && window.EXALTED_GATES.has(moon.gate);
    const totalLuck = lk ? lk.total : 55;

    const activePlanets = new Set(act ? act.map(x => x.p.n) : []);
    const activeCenters = new Set();
    if (act) act.forEach(x => x.ch.c.forEach(c => activeCenters.add(c)));

    const scored = GEMS.map(g => {
      let score = 20;
      const reasons = [];

      // ۱. تطبیق با نیت انتخابی کاربر
      if (intent !== "auto" && g.roles.includes(intent)) {
        score += 32;
        const intentLbl = intent === "wealth" ? "جذب رزق و مذاکره" : (intent === "shield" ? "سپر حفاظتی و آرامش" : "کاریزما و نفوذ کلام");
        reasons.push("هماهنگ با نیت «" + intentLbl + "»");
      }

      // ۲. تطبیق با سیاراتی که الان کانال قفل کرده‌اند
      g.planets.forEach(plName => {
        if (activePlanets.has(plName)) {
          score += 22;
          reasons.push("هم‌فرکانس با ترانزیت فعال «" + plName + "»");
        }
      });

      // ۳. تطبیق با مراکز فعال یا باز
      let centerHits = 0;
      g.centers.forEach(c => {
        if (activeCenters.has(c)) centerHits++;
      });
      if (centerHits > 0) {
        score += centerHits * 11;
        reasons.push("تقویت‌کننده مراکز روشن‌شده در بادی‌گراف امروز");
      }

      // ۴. شرایط خاص ماه (شرف، هبوط یا میدان باز رفلکتور)
      if ((!act || act.length === 0) && (g.id === 5 || g.id === 6 || g.id === 11)) {
        score += 26;
        reasons.push("حفظ شفافیت آینه‌ای در زمان باز بودن کامل مراکز");
      }
      if ((isDetriment || totalLuck < 40) && g.roles.includes("shield")) {
        score += 25;
        reasons.push("سپر محافظ در برابر زاویه اصطکاکی فعلی آسمان");
      }
      if ((isDetriment || totalLuck < 38) && g.fiery) {
        score -= 22; // کاهش امتیاز سنگ‌های تند و آتشین در ساعات پرتنش
      }
      if ((isExalted || totalLuck >= 70) && (g.id === 9 || g.id === 10 || g.id === 12 || g.id === 1)) {
        score += 18;
        reasons.push("تثبیت و جذب حداکثری موج خوش‌شانسی امروز");
      }

      // ۵. چرخش ظریف بر اساس دروازه ماه برای تنوع هوشمند روزانه
      score += ((moon.gate * g.id + moon.line) % 9);

      return { gem: g, score, reasons };
    });

    scored.sort((a, b) => b.score - a.score);

    // پیدا کردن نگینی که امروز بهتر است استفاده نشود (کنتراست انرژی)
    let avoidGem = scored[scored.length - 1].gem;
    if (isDetriment || totalLuck < 42) {
      const fieryOne = GEMS.find(x => x.id === 2 || x.id === 1);
      if (fieryOne && fieryOne.id !== scored[0].gem.id) avoidGem = fieryOne;
    }

    return {
      primary: scored[0],
      secondary: scored[1],
      avoid: avoidGem
    };
  }

  window.toggleGemDrawer = function() {
    const dr = document.getElementById("gemDrawerBox");
    const pill = document.getElementById("gemExpandPill");
    if (!dr) return;
    const isOpen = dr.classList.toggle("open");
    if (pill) pill.textContent = isOpen ? "بستن ▴" : "کالبدشکافی ▾";
  };

  window.setGemIntent = function(ev, intentMode) {
    if (ev) ev.stopPropagation();
    currentIntent = intentMode;
    if (window.OLDMAN_STATE) {
      update(window.OLDMAN_STATE.now, window.OLDMAN_STATE.pls, window.OLDMAN_STATE.act, window.OLDMAN_STATE.lk);
      const dr = document.getElementById("gemDrawerBox");
      const pill = document.getElementById("gemExpandPill");
      if (dr) dr.classList.add("open");
      if (pill) pill.textContent = "بستن ▴";
    }
  };

  async function callGemAI(apiKey, promptText) {
    if (apiKey && apiKey.trim().length > 10) {
      const cleanKey = apiKey.trim();
      const models = [];
      if (cachedGemModel) models.push(cachedGemModel);
      ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.0-flash-001", "gemini-flash-latest"].forEach(m => {
        if (!models.includes(m)) models.push(m);
      });

      for (let i = 0; i < models.length; i++) {
        const modelName = models[i];
        try {
          const url = "https://generativelanguage.googleapis.com/v1beta/models/" + modelName + ":generateContent?key=" + encodeURIComponent(cleanKey);
          const res = await fetchWithTimeout(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": cleanKey
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptText }] }],
              generationConfig: { temperature: 0.82 }
            })
          }, 9000);

          const data = await res.json();
          if (res.ok && data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
            cachedGemModel = modelName;
            return { ok: true, text: data.candidates[0].content.parts[0].text.trim(), source: "Gemini (" + modelName + ")" };
          }
        } catch (err) {
          break;
        }
      }
    }

    try {
      const res2 = await fetchWithTimeout("https://text.pollinations.ai/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "openai",
          messages: [{ role: "user", content: promptText }],
          seed: Date.now()
        })
      }, 8500);
      if (res2.ok) {
        const d2 = await res2.json();
        const txt2 = d2 && d2.choices && d2.choices[0] && d2.choices[0].message ? d2.choices[0].message.content : "";
        if (txt2 && txt2.trim().length > 15) return { ok: true, text: txt2.trim(), source: "خرد ابری" };
      }
    } catch (e) {}

    return { ok: false };
  }

  window.askGemAIOracle = async function(ev) {
    if (ev) ev.stopPropagation();
    if (isBusy) return;

    const outBox = document.getElementById("gemAiOutputBox");
    const btn = document.getElementById("gemAiAskBtn");
    if (!outBox || !btn) return;

    isBusy = true;
    btn.disabled = true;
    btn.textContent = "💍 پیرمرد جواهرشناس در حال سنجش ارتعاش سنگ‌ها...";
    outBox.style.display = "block";
    outBox.innerHTML = "در حال تطبیق ۱۴ نگین نقره شما با مدار ماه و کانال‌های فعال امروز...";

    const state = window.OLDMAN_STATE || {};
    const pls = state.pls || (window.calcPlanets ? window.calcPlanets(new Date()) : []);
    const act = state.act || [];
    const lk = state.lk || { total: 55, wealth: 50, love: 50, action: 50 };
    const moon = pls[2] || { gate: 1, line: 1 };
    const ranked = rankGemsForMoment(pls, act, lk, currentIntent);

    const activeChStr = act.length > 0
      ? act.map(x => x.ch.name + " (توسط " + x.p.n + ")").join("، ")
      : "هیچ کانالی قفل نیست (میدان کاملاً باز و آینه‌ای رفلکتور)";
    const moonTheme = (window.GATE_THEMES && window.GATE_THEMES[moon.gate]) || "حضور و شهود";

    const intentMap = {
      auto: "هماهنگی کلی با آسمان امروز",
      wealth: "جذب رزق، برکت مالی و موفقیت در معامله",
      shield: "سپر حفاظتی، دفع انرژی منفی و آرامش روح",
      charisma: "کاریزما، نفوذ کلام و جذابیت در جمع"
    };

    const promptText =
      "تو «پیرمرد جواهرشناس و حکیم کهنسال» هستی و به «شهریار» (Reflector 6/2) مشاوره می‌دهی. " +
      "شهریار این ۱۴ انگشتر با رکاب نقره را دارد: [۱.عقیق سرخ، ۲.گارنت، ۳.مالاکیت، ۴.ابسیدین، ۵.دُرّ نجف، ۶.آمیتیست، ۷.عقیق سوسنی، ۸.شفت‌العبد، ۹.زبرجد، ۱۰.فیروزه، ۱۱.عقیق شجر، ۱۲.توپاز، ۱۳.لاجورد، ۱۴.عقیق مشکی].\n" +
      "وضعیت لحظه‌ای آسمان برای شهریار:\n" +
      "- موقعیت ماه: تمِ «" + moonTheme + "»\n" +
      "- کانال‌های فعال: " + activeChStr + "\n" +
      "- شاخص شانس: کل " + lk.total + "% | مالی " + lk.wealth + "% | روابط " + lk.love + "% | اقدام " + lk.action + "%\n" +
      "- اولویت انتخابی شهریار: «" + intentMap[currentIntent] + "»\n" +
      "- پیشنهاد اولیه محاسباتی: نگین اول «" + ranked.primary.gem.short + "»، نگین مکمل «" + ranked.secondary.gem.short + "» و نگینی که امروز نباید دست کند: «" + ranked.avoid.short + "».\n\n" +
      "در ۴ تا ۵ جمله بسیار جذاب، عمیق و کاربردی به شهریار بگو:\n" +
      "۱. چرا امروز انگشتر «" + ranked.primary.gem.short + "» (در رکاب نقره) بهترین انتخاب برای هاله اوست و در کدام دست/انگشت دست کند؟\n" +
      "۲. در چه ساعتی یا برای چه کاری در طول امروز می‌تواند از نگین مکمل («" + ranked.secondary.gem.short + "») کمک بگیرد؟\n" +
      "۳. چرا امروز بهتر است سراغ «" + ranked.avoid.short + "» نرود؟ (بدون ذکر شماره دروازه‌ها و با لحنی گرم و حکیمانه بنویس).";

    const apiKey = window.getStore ? window.getStore("key", "") : "";
    const aiRes = await callGemAI(apiKey, promptText);

    if (aiRes.ok) {
      outBox.innerHTML =
        '<div style="font-size:0.7rem;color:#7dd3fc;font-weight:800;margin-bottom:5px">✨ نسخه جواهرشناس (' + aiRes.source + '):</div>' +
        aiRes.text.replace(/\n/g, "<br/>");
    } else {
      outBox.innerHTML =
        '<div style="font-size:0.7rem;color:#fde68a;font-weight:800;margin-bottom:5px">✨ نسخه حکیمانه نگین امروز:</div>' +
        'شهریار جان، امروز با توجه به جریان «' + moonTheme + '» در آسمان، رکاب نقره و نگین <b>' + ranked.primary.gem.short + '</b> در ' + ranked.primary.gem.finger + ' بهترین لنگر فرکانسی برای هاله آینه‌ای توست و «' + ranked.primary.gem.vibe + '» را برایت به ارمغان می‌آورد. اگر در طول روز نیاز به تغییر فاز داشتی، <b>' + ranked.secondary.gem.short + '</b> یار کمکی توست؛ اما امروز به دلیل نوع ارتعاش آسمان، بهتر است <b>' + ranked.avoid.short + '</b> در جعبه استراحت کند.';
    }

    btn.disabled = false;
    btn.textContent = "🔮 استخاره و تحلیل عمیق نگین امروز با هوش مصنوعی";
    isBusy = false;
  };

  function update(now, pls, act, lk) {
    const container = document.getElementById("gemTalismanMount");
    if (!container || !pls || pls.length === 0) return;

    const drawerEl = document.getElementById("gemDrawerBox");
    const wasOpen = drawerEl ? drawerEl.classList.contains("open") : false;

    const ranked = rankGemsForMoment(pls, act, lk, currentIntent);
    const top = ranked.primary.gem;
    const sec = ranked.secondary.gem;
    const avd = ranked.avoid;
    const reasonText = ranked.primary.reasons.length > 0
      ? ranked.primary.reasons.slice(0, 2).join(" + ")
      : "تنظیم‌کننده ارتعاش نقره و ماه با هاله امروز شما";

    container.innerHTML =
      '<div class="gem-bar-card" style="border-color:' + top.color + ';box-shadow:0 8px 26px ' + top.glow + '">' +
        '<div class="gem-compact-row" onclick="window.toggleGemDrawer()">' +
          '<div class="gem-orb-badge" style="background:radial-gradient(circle at 30% 30%, #fff, ' + top.color + ' 65%, #020617)">' + top.icon + '</div>' +
          '<div class="gem-main-info">' +
            '<div class="gem-top-label"><span>💍 نگین و رکاب نقره منتخب امروز</span><span>• ' + top.planets[0] + '</span></div>' +
            '<div class="gem-selected-title" style="color:' + top.color + '">' + top.name + '</div>' +
          '</div>' +
          '<span id="gemExpandPill" class="gem-expand-pill">' + (wasOpen ? "بستن ▴" : "کالبدشکافی ▾") + '</span>' +
        '</div>' +

        '<div id="gemDrawerBox" class="gem-drawer' + (wasOpen ? " open" : "") + '">' +
          '<div class="gem-intent-tabs">' +
            '<button class="gem-intent-btn' + (currentIntent === "auto" ? " active" : "") + '" onclick="window.setGemIntent(event, \'auto\')">🎯 آسمان امروز</button>' +
            '<button class="gem-intent-btn' + (currentIntent === "wealth" ? " active" : "") + '" onclick="window.setGemIntent(event, \'wealth\')">💰 رزق و معامله</button>' +
            '<button class="gem-intent-btn' + (currentIntent === "shield" ? " active" : "") + '" onclick="window.setGemIntent(event, \'shield\')">🛡️ سپر حفاظتی</button>' +
            '<button class="gem-intent-btn' + (currentIntent === "charisma" ? " active" : "") + '" onclick="window.setGemIntent(event, \'charisma\')">🗣️ کاریزما و نفوذ</button>' +
          '</div>' +

          '<div class="gem-reason-box" style="border-right-color:' + top.color + '">' +
            '<div><b style="color:#fde68a">✨ چرایی انتخاب این نگین:</b> ' + reasonText + '</div>' +
            '<div style="margin-top:3px;color:#cbd5e1"><b>💎 اثر ارتعاشی:</b> ' + top.vibe + '</div>' +
            '<div style="margin-top:3px;color:#7dd3fc;font-size:0.73rem"><b>🖐️ دست و انگشت پیشنهادی:</b> ' + top.finger + '</div>' +
          '</div>' +

          '<div class="gem-duo-grid">' +
            '<div class="gem-mini-card">' +
              '<div style="color:#4ade80;font-weight:800">💍 نگین مکمل امروز:</div>' +
              '<div style="color:#fff;font-weight:700;margin-top:2px">' + sec.icon + ' ' + sec.short + '</div>' +
              '<div style="color:#94a3b8;font-size:0.66rem">سیاره: ' + sec.planets.join("، ") + '</div>' +
            '</div>' +
            '<div class="gem-mini-card">' +
              '<div style="color:#fca5a5;font-weight:800">⏸️ امروز استراحت کند:</div>' +
              '<div style="color:#fff;font-weight:700;margin-top:2px">' + avd.icon + ' ' + avd.short + '</div>' +
              '<div style="color:#94a3b8;font-size:0.66rem">پرهیز از تداخل فرکانسی</div>' +
            '</div>' +
          '</div>' +

          '<button id="gemAiAskBtn" class="gem-ai-btn" onclick="window.askGemAIOracle(event)">🔮 استخاره و تحلیل عمیق نگین امروز با هوش مصنوعی</button>' +
          '<div id="gemAiOutputBox" class="gem-ai-output"></div>' +
        '</div>' +
      '</div>';
  }

  return { update, GEMS };
})();
