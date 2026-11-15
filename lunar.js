// =========================================================================
// MODULE 6: INTERACTIVE OLDMAN LUNAR COMPASS & CALENDAR ALARM v1.4.5 (lunar.js)
// =========================================================================
window.LunarCompassModule = (function() {
  let activeTab = "active"; // 'active' | 'archived'
  let openCardId = null;
  let isBusy = false;
  let cachedLunarModel = "";

  // وضعیت پیش‌نمایش و گفتگوی تعاملی با پیرمرد قبل از ثبت تصمیم
  let draftSession = null;

  const CATEGORIES = {
    wealth: {
      label: "💰 مالی و معامله", scoreKey: "wealth", color: "#f5c56b",
      gates: [44, 54, 12, 37, 26, 32],
      gemHint: "زبرجد یا عقیق سرخ (رکاب نقره)",
      keywords: ["پول", "مالی", "خرید", "فروش", "سرمایه", "طلا", "ماشین", "ملک", "وام", "معامله", "درآمد", "دلار", "سکه", "ارز", "بورس", "قیمت", "هزینه"]
    },
    health: {
      label: "💪 سلامت و سبک زندگی", scoreKey: "action", color: "#10b981",
      gates: [27, 50, 5, 15, 58, 10],
      gemHint: "گارنت یا عقیق شجر (رکاب نقره)",
      keywords: ["وزن", "رژیم", "ورزش", "سلامت", "خواب", "باشگاه", "لاغری", "تغذیه", "بدن", "دویدن", "پیاده", "عادت", "سیگار", "دندان", "درمان"]
    },
    action: {
      label: "🚀 پروژه و اقدام", scoreKey: "action", color: "#38bdf8",
      gates: [28, 8, 7, 23, 10, 54],
      gemHint: "توپاز یا عقیق مشکی (رکاب نقره)",
      keywords: ["کار", "پروژه", "شغل", "برنامه", "ساخت", "شروع", "استارت", "سفر", "کسب", "شرکت", "سایت", "اپ", "کد", "آموزش", "یادگیری"]
    },
    love: {
      label: "❤️ روابط و پیمان", scoreKey: "love", color: "#f43f5e",
      gates: [12, 37, 50, 15, 11, 10],
      gemHint: "فیروزه یا عقیق سوسنی (رکاب نقره)",
      keywords: ["رابطه", "عشق", "ازدواج", "دوست", "خانواده", "فرزند", "همسر", "آشتی", "دیدار", "قرار", "شریک", "صحبت", "مذاکره"]
    },
    total: {
      label: "👁️ کلی و شهودی", scoreKey: "total", color: "#a855f7",
      gates: [24, 63, 13, 10, 15, 50],
      gemHint: "دُرّ نجف یا لاجورد (رکاب نقره)",
      keywords: []
    }
  };

  (function injectLunarStyles() {
    const oldSt = document.getElementById("lunar-compass-styles");
    if (oldSt) oldSt.remove();

    const st = document.createElement("style");
    st.id = "lunar-compass-styles";
    st.textContent = `
      .lunar-pro-card {
        background: radial-gradient(circle at 50% 0%, rgba(245, 197, 107, 0.14) 0%, rgba(12, 18, 36, 0.96) 72%);
        border: 1.5px solid rgba(245, 197, 107, 0.45);
        border-radius: 20px; padding: 14px; margin-bottom: 15px;
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
        box-sizing: border-box; overflow: hidden;
      }
      .lunar-top-bar {
        display: flex; justify-content: space-between; align-items: center;
        gap: 8px; margin-bottom: 10px;
      }
      .lunar-main-title { font-size: 0.84rem; font-weight: 900; color: #f5c56b; }
      .lunar-ver-pill {
        font-size: 0.65rem; color: #fde68a; background: rgba(245, 197, 107, 0.14);
        border: 1px solid rgba(245, 197, 107, 0.35); padding: 2px 8px;
        border-radius: 99px; white-space: nowrap;
      }
      .lunar-tabs-row {
        display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 12px;
      }
      .lunar-tab-btn {
        padding: 8px 6px; border-radius: 10px; font-family: inherit;
        font-size: 0.74rem; font-weight: 800; cursor: pointer;
        background: rgba(255, 255, 255, 0.04); color: #94a3b8;
        border: 1px solid rgba(255, 255, 255, 0.1); transition: 0.2s;
      }
      .lunar-tab-btn.active {
        background: rgba(245, 197, 107, 0.2); color: #fef08a; border-color: #f5c56b;
      }
      .lunar-add-box {
        background: rgba(4, 7, 16, 0.82); border: 1px solid rgba(245, 197, 107, 0.25);
        border-radius: 15px; padding: 12px; margin-bottom: 12px;
      }
      .lunar-stack-form { display: flex; flex-direction: column; gap: 8px; margin-top: 7px; }
      .lunar-inp-full {
        width: 100%; box-sizing: border-box; padding: 10px 12px;
        border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.18);
        background: rgba(15, 23, 42, 0.95); color: #fff;
        font-family: inherit; font-size: 0.79rem; line-height: 1.6;
      }
      .lunar-inp-full:focus { outline: none; border-color: #f5c56b; }
      .lunar-btn-gold {
        width: 100%; box-sizing: border-box; padding: 10px 12px;
        border-radius: 10px; border: none;
        background: linear-gradient(135deg, #f5c56b, #d97706);
        color: #020617; font-family: inherit; font-size: 0.78rem;
        font-weight: 900; cursor: pointer; transition: 0.2s;
      }
      .lunar-btn-gold:disabled { opacity: 0.6; cursor: wait; }

      /* باکس گفتگوی تعاملی پیش‌نمایش با پیرمرد */
      .draft-sanctuary-box {
        margin-top: 11px; padding: 12px; border-radius: 14px;
        background: linear-gradient(145deg, rgba(15, 23, 42, 0.96), rgba(6, 10, 24, 0.98));
        border: 1.5px solid rgba(56, 189, 248, 0.45);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.65);
      }
      .draft-speech-bubble {
        background: rgba(245, 197, 107, 0.08); border-right: 3.5px solid #f5c56b;
        border-radius: 10px; padding: 10px 11px; margin: 8px 0;
        color: #fef3c7; font-size: 0.78rem; line-height: 1.9; text-align: justify;
      }
      .draft-refine-row {
        display: flex; gap: 6px; margin-top: 8px;
      }
      .draft-confirm-grid {
        display: grid; grid-template-columns: 1.4fr 1fr; gap: 7px; margin-top: 10px;
      }
      .btn-confirm-save {
        padding: 10px; border-radius: 10px; border: 1px solid rgba(34, 197, 94, 0.6);
        background: linear-gradient(135deg, rgba(34, 197, 94, 0.28), rgba(16, 185, 129, 0.38));
        color: #dcfce7; font-family: inherit; font-size: 0.76rem; font-weight: 900; cursor: pointer;
      }
      .btn-cancel-draft {
        padding: 10px; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.15);
        background: rgba(255, 255, 255, 0.05); color: #cbd5e1;
        font-family: inherit; font-size: 0.73rem; font-weight: 700; cursor: pointer;
      }

      /* دکمه‌های تقویم و آلارم */
      .cal-btn-row {
        display: flex; flex-wrap: wrap; gap: 5px; margin-top: 6px;
      }
      .cal-chip-btn {
        display: inline-flex; align-items: center; gap: 4px;
        padding: 4px 8px; border-radius: 8px;
        background: rgba(245, 197, 107, 0.15); border: 1px solid rgba(245, 197, 107, 0.45);
        color: #fef08a; font-family: inherit; font-size: 0.66rem; font-weight: 800;
        cursor: pointer; text-decoration: none;
      }
      .cal-chip-btn.ics {
        background: rgba(56, 189, 248, 0.14); border-color: rgba(56, 189, 248, 0.4); color: #bae6fd;
      }

      /* کارت‌های تصمیم */
      .lunar-dec-card {
        background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(255, 255, 255, 0.11);
        border-right: 4px solid #f5c56b; border-radius: 15px;
        padding: 12px; margin-top: 12px; cursor: pointer; transition: 0.2s;
      }
      .lunar-card-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
      .lunar-badge {
        font-size: 0.65rem; padding: 2px 8px; border-radius: 99px;
        background: rgba(255, 255, 255, 0.07); color: #e2e8f0; display: inline-block; margin-top: 4px;
      }
      .lunar-ms-grid {
        display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px;
        margin: 9px 0 8px; text-align: center;
      }
      .ms-item {
        background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: 8px; padding: 4px 2px; font-size: 0.62rem; color: #64748b;
      }
      .ms-item.done { border-color: rgba(56, 189, 248, 0.45); color: #bae6fd; background: rgba(56, 189, 248, 0.1); }
      .ms-item.current { border-color: #f5c56b; color: #fef08a; background: rgba(245, 197, 107, 0.18); font-weight: 800; }

      .win-section-title {
        font-size: 0.72rem; font-weight: 800; color: #fde68a; margin: 10px 0 6px;
        display: flex; justify-content: space-between; align-items: center;
      }
      .win-list { display: flex; flex-direction: column; gap: 7px; }
      .win-row {
        display: flex; justify-content: space-between; align-items: flex-start;
        padding: 8px 10px; border-radius: 11px; font-size: 0.71rem; line-height: 1.55;
      }
      .win-row.starter { background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.35); color: #e0f2fe; }
      .win-row.midpeak { background: rgba(168, 85, 247, 0.11); border: 1px solid rgba(168, 85, 247, 0.35); color: #f3e8ff; }
      .win-row.final   { background: rgba(34, 197, 94, 0.12); border: 1px solid rgba(34, 197, 94, 0.4); color: #dcfce7; }
      .win-row.caution { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.35); color: #fee2e2; }
      .win-left-tag {
        font-size: 0.66rem; font-weight: 900; padding: 4px 7px; border-radius: 8px;
        background: rgba(0, 0, 0, 0.38); white-space: nowrap; margin-right: 6px; text-align: center;
      }

      .pulse-box {
        background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 11px; padding: 8px 9px; margin-top: 9px;
      }
      .pulse-btns { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; margin-top: 6px; }
      .pulse-btn {
        padding: 6px 4px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(15, 23, 42, 0.8); color: #cbd5e1; font-family: inherit;
        font-size: 0.67rem; font-weight: 700; cursor: pointer;
      }
      .lunar-body-content {
        display: none; margin-top: 10px; padding-top: 10px;
        border-top: 1px solid rgba(255, 255, 255, 0.1); font-size: 0.75rem;
      }
      .lunar-body-content.open { display: block; }
      .lunar-note-item {
        background: rgba(255, 255, 255, 0.03); border-right: 2.5px solid #38bdf8;
        border-radius: 7px; padding: 5px 8px; margin-top: 5px; font-size: 0.71rem; color: #cbd5e1;
      }
      .lunar-ai-btn {
        width: 100%; margin-top: 8px; padding: 8px; border-radius: 9px;
        border: 1px solid rgba(245, 197, 107, 0.55);
        background: linear-gradient(135deg, rgba(245, 197, 107, 0.2), rgba(56, 189, 248, 0.18));
        color: #fef08a; font-family: inherit; font-size: 0.74rem; font-weight: 900; cursor: pointer;
      }
      .lunar-complete-btn {
        width: 100%; margin-top: 7px; padding: 8px; border-radius: 9px;
        border: 1px solid rgba(34, 197, 94, 0.5);
        background: rgba(34, 197, 94, 0.15); color: #bbf7d0;
        font-family: inherit; font-size: 0.73rem; font-weight: 800; cursor: pointer;
      }
      .lunar-delete-btn {
        width: 100%; margin-top: 7px; padding: 8px; border-radius: 9px;
        border: 1px solid rgba(239, 68, 68, 0.4);
        background: rgba(239, 68, 68, 0.1); color: #fca5a5;
        font-family: inherit; font-size: 0.72rem; font-weight: 700; cursor: pointer;
      }
      .lunar-ai-box {
        display: none; margin-top: 8px; padding: 9px 10px; border-radius: 10px;
        background: rgba(5, 8, 18, 0.95); border-right: 3px solid #f5c56b;
        color: #fef3c7; font-size: 0.75rem; line-height: 1.85; text-align: justify;
      }
    `;
    document.head.appendChild(st);
  })();

  function getDecisions() {
    try {
      const raw = window.getStore ? window.getStore("decisions", "[]") : localStorage.getItem("oldman_decisions");
      const parsed = JSON.parse(raw || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveDecisions(list) {
    const str = JSON.stringify(list);
    if (window.setStore) window.setStore("decisions", str);
    else {
      try { localStorage.setItem("oldman_decisions", str); } catch (e) {}
    }
  }

  // تشخیص هوشمند دسته‌بندی از روی متن محاوره‌ای شهریار
  function detectCategoryFromText(text) {
    const t = (text || "").toLowerCase();
    const order = ["health", "wealth", "love", "action"];
    for (let i = 0; i < order.length; i++) {
      const key = order[i];
      const words = CATEGORIES[key].keywords;
      for (let j = 0; j < words.length; j++) {
        if (t.includes(words[j])) return key;
      }
    }
    return "total";
  }

  function getTimeSlotLabel(hr) {
    if (hr < 12) return "بازه صبح (۰۹:۰۰ تا ۱۲:۰۰)";
    if (hr < 16) return "بازه ظهر (۱۲:۰۰ تا ۱۶:۰۰)";
    if (hr < 20) return "بازه عصر (۱۶:۰۰ تا ۲۰:۰۰)";
    return "بازه شب (۲۰:۰۰ تا ۲۳:۰۰)";
  }

  function formatDaysDiff(targetMs) {
    const diffDays = Math.ceil((targetMs - Date.now()) / 86400000);
    if (diffDays < 0) return "گذشته";
    if (diffDays === 0) return "🔥 امروز";
    if (diffDays === 1) return "⏳ فردا";
    return "⏳ " + diffDays + " روز دیگر";
  }

  function scanDecisionWindows(dec) {
    const startMs = dec.start || Date.now();
    const cat = CATEGORIES[dec.cat] || CATEGORIES.total;
    const scoreKey = cat.scoreKey;

    const startDayZero = new Date(startMs);
    startDayZero.setHours(0, 0, 0, 0);
    const baseMs = startDayZero.getTime();

    let starterBest = null;
    let midPeakBest = null;
    let finalBest   = null;
    let cautionDay  = null;

    const slotHours = [10, 14, 18, 21];

    for (let dayIdx = 0; dayIdx < 28; dayIdx++) {
      for (let s = 0; s < slotHours.length; s++) {
        const hr = slotHours[s];
        const t = baseMs + dayIdx * 86400000 + hr * 3600000;
        const dt = new Date(t);

        let rawScore = 55;
        let reason = "تعادل هاله و مدار ماه";

        if (window.calcPlanets && window.calcGalacticLuck) {
          const pls = window.calcPlanets(dt);
          const moon = pls[2];
          const act = [];
          if (window.DB) {
            window.DB.forEach(ch => {
              const tp = pls.find(p => p.gate === ch.g2);
              if (tp) act.push({ ch, p: tp });
            });
          }
          const lk = window.calcGalacticLuck(pls, act, dt);
          rawScore = Math.round((lk[scoreKey] * 0.6) + (lk.total * 0.4));

          const moonCh = act.find(x => x.p.isMoon);
          if (moonCh) {
            rawScore += 9;
            reason = "قفل " + moonCh.ch.name;
          } else if (cat.gates.includes(moon.gate)) {
            rawScore += 7;
            const gTheme = (window.GATE_THEMES && window.GATE_THEMES[moon.gate]) || "";
            reason = "ماه در دروازه «" + gTheme + "»";
          } else if (window.DETRIMENT_GATES && window.DETRIMENT_GATES.has(moon.gate)) {
            rawScore -= 8;
            reason = "ماه در زاویه اصطکاکی (نیاز به سکوت)";
          }
        }

        const score = Math.min(96, Math.max(12, rawScore));
        const item = { dt, t, hr, dayNum: dayIdx + 1, slotLabel: getTimeSlotLabel(hr), score, reason };

        if (dayIdx <= 6 && t >= Date.now() - 3 * 3600000) {
          if (!starterBest || score > starterBest.score) starterBest = item;
        } else if (dayIdx > 6 && dayIdx <= 19) {
          if (!midPeakBest || score > midPeakBest.score) midPeakBest = item;
        } else if (dayIdx > 19) {
          if (!finalBest || score > finalBest.score) finalBest = item;
        }

        if (t >= Date.now() - 6 * 3600000) {
          if (!cautionDay || score < cautionDay.score) cautionDay = item;
        }
      }
    }

    // فال‌بک اگر تمام روزهای هفته اول گذشته باشد
    if (!starterBest) starterBest = midPeakBest || finalBest;
    if (!cautionDay) cautionDay = starterBest;

    return {
      starter: starterBest,
      midPeak: midPeakBest,
      finalWin: finalBest,
      caution: cautionDay,
      endDate: new Date(startMs + 28 * 86400000)
    };
  }

  // =========================================================================
  // سیستم ثبت آلارم در تقویم گوشی (Google Calendar + استاندارد ICS موبایل)
  // =========================================================================
  function toIsoCalString(dt) {
    const pad = n => (n < 10 ? "0" + n : "" + n);
    return dt.getUTCFullYear() +
      pad(dt.getUTCMonth() + 1) +
      pad(dt.getUTCDate()) + "T" +
      pad(dt.getUTCHours()) +
      pad(dt.getUTCMinutes()) + "00Z";
  }

  window.openGoogleCalWindow = function(ev, targetMs, titleEnc, reasonEnc, catKey) {
    if (ev) ev.stopPropagation();
    const title = decodeURIComponent(titleEnc);
    const reason = decodeURIComponent(reasonEnc);
    const catInfo = CATEGORIES[catKey] || CATEGORIES.total;

    const startDt = new Date(Number(targetMs));
    const endDt = new Date(Number(targetMs) + 2 * 3600000); // پنجره ۲ ساعته
    const datesParam = toIsoCalString(startDt) + "/" + toIsoCalString(endDt);

    const eventTitle = "🌕 زمان طلایی پیرمرد: " + title;
    const details =
      "🧭 یادآوری قطب‌نمای OLDMAN برای شهریار (Reflector 6/2)\n" +
      "• موضوع تصمیم/اقدام: " + title + "\n" +
      "• علت نجومی: " + reason + "\n" +
      "• انگشتر نقره پشتیبان: " + catInfo.gemHint + "\n" +
      "✨ با آرامش و هماهنگی با مدار ماه گام بردار.";

    const gUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=" + encodeURIComponent(eventTitle) +
      "&dates=" + datesParam +
      "&details=" + encodeURIComponent(details);

    window.open(gUrl, "_blank");
  };

  window.downloadIcsAlarm = function(ev, targetMs, titleEnc, reasonEnc, catKey) {
    if (ev) ev.stopPropagation();
    const title = decodeURIComponent(titleEnc);
    const reason = decodeURIComponent(reasonEnc);
    const catInfo = CATEGORIES[catKey] || CATEGORIES.total;

    const startDt = new Date(Number(targetMs));
    const endDt = new Date(Number(targetMs) + 2 * 3600000);

    const icsLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//OLDMAN Reflector v1.4.5//FA",
      "BEGIN:VEVENT",
      "UID:oldman-" + Date.now() + "@shahriar.om",
      "DTSTAMP:" + toIsoCalString(new Date()),
      "DTSTART:" + toIsoCalString(startDt),
      "DTEND:" + toIsoCalString(endDt),
      "SUMMARY:🌕 یادآور پیرمرد: " + title,
      "DESCRIPTION:علت نجومی: " + reason + " | نگین پیشنهادی: " + catInfo.gemHint,
      "BEGIN:VALARM",
      "TRIGGER:-PT30M",
      "ACTION:DISPLAY",
      "DESCRIPTION:🔔 ۳۰ دقیقه تا پنجره طلایی تصمیم: " + title,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsLines], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "oldman-alarm.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // =========================================================================
  // گفتگوی تعاملی با پیرمرد قبل از ثبت تصمیم
  // =========================================================================
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

  async function callLunarAI(apiKey, promptText) {
    if (apiKey && apiKey.trim().length > 10) {
      const cleanKey = apiKey.trim();
      const models = [];
      if (cachedLunarModel) models.push(cachedLunarModel);
      ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.0-flash-001", "gemini-flash-latest"].forEach(m => {
        if (!models.includes(m)) models.push(m);
      });

      for (let i = 0; i < models.length; i++) {
        const modelName = models[i];
        try {
          const url = "https://generativelanguage.googleapis.com/v1beta/models/" + modelName + ":generateContent?key=" + encodeURIComponent(cleanKey);
          const res = await fetchWithTimeout(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-goog-api-key": cleanKey },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptText }] }],
              generationConfig: { temperature: 0.82 }
            })
          }, 9000);
          const data = await res.json();
          if (res.ok && data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
            cachedLunarModel = modelName;
            return { ok: true, text: data.candidates[0].content.parts[0].text.trim() };
          }
        } catch (e) { break; }
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
        if (txt2 && txt2.trim().length > 15) return { ok: true, text: txt2.trim() };
      }
    } catch (e) {}

    return { ok: false };
  }

  window.startInteractiveConsultation = async function() {
    if (isBusy) return;
    const inp = document.getElementById("proDecisionTitleInp");
    const catSel = document.getElementById("proDecisionCatSel");
    if (!inp || !inp.value.trim()) return;

    const rawText = inp.value.trim();
    const detectedCat = (catSel && catSel.value !== "auto") ? catSel.value : detectCategoryFromText(rawText);
    const catInfo = CATEGORIES[detectedCat] || CATEGORIES.total;

    const tempDec = {
      id: Date.now(),
      title: rawText,
      cat: detectedCat,
      start: Date.now()
    };

    const win = scanDecisionWindows(tempDec);
    const fmt = dt => dt.toLocaleDateString("fa-IR", { weekday: "long", month: "short", day: "numeric" });

    draftSession = {
      title: rawText,
      cat: detectedCat,
      win: win,
      history: [{ role: "user", text: rawText }],
      aiAdvice: "🧙‍♂️ پیرمرد در حال رصد ۲۸ روز آینده و سنجش بهترین لحظه برای «" + rawText + "»..."
    };

    isBusy = true;
    render();

    const stStr = fmt(win.starter.dt) + " (" + win.starter.slotLabel + " - شاخص " + win.starter.score + "%)";
    const mdStr = fmt(win.midPeak.dt) + " (" + win.midPeak.slotLabel + " - شاخص " + win.midPeak.score + "%)";
    const fnStr = fmt(win.finalWin.dt) + " (" + win.finalWin.slotLabel + " - شاخص " + win.finalWin.score + "%)";
    const caStr = fmt(win.caution.dt);

    const promptText =
      "تو «پیرمرد حکیم» هستی و با «شهریار» (Reflector 6/2) به صورت صمیمی، گرم و دقیق گفتگو می‌کنی.\n" +
      "شهریار می‌گوید: «" + rawText + "»\n" +
      "اطلاعات محاسبه‌شده از چارت آسمان شهریار در ۲۸ روز آینده:\n" +
      "- حوزه تشخیص داده‌شده: " + catInfo.label + "\n" +
      "- ۱. بهترین روز برای استارت عملی فوری در هفته اول: " + stStr + " به دلیل «" + win.starter.reason + "»\n" +
      "- ۲. بهترین پنجره میانی (هفته دوم و سوم): " + mdStr + " به دلیل «" + win.midPeak.reason + "»\n" +
      "- ۳. روز موعود پایان چرخه ۲۸ روزه (برای تصمیمات سرنوشت‌ساز): " + fnStr + "\n" +
      "- ۴. روز احتیاط و پرهیز از شروع/تصمیم: " + caStr + "\n" +
      "- نگین نقره پیشنهادی از کلکسیون شهریار: " + catInfo.gemHint + "\n\n" +
      "در ۴ جمله بسیار کاربردی و دلنشین به شهریار پاسخ بده:\n" +
      "۱. اول بگو آیا این خواسته («" + rawText + "») از جنس اقدام عملی و عادت‌سازی است که بهتر است در همان پنجره اول (" + fmt(win.starter.dt) + ") استارت بخورد، یا یک تصمیم کلان است که باید تا روز ۲۸ صبر کند؟\n" +
      "۲. دقیقاً تاریخ و بازه ساعتی پیشنهادی‌ات را به او بگو و توضیح بده چرا آن روز بهترین حالت ممکن است (و کدام روز نباید سراغش برود).\n" +
      "۳. بگو در روز شروع، انگشتر «" + catInfo.gemHint + "» را دستش کند و از او بپرس آیا با این زمان‌بندی موافق است تا در چرخه ثبتش کنیم؟";

    const apiKey = window.getStore ? window.getStore("key", "") : "";
    const res = await callLunarAI(apiKey, promptText);

    if (res.ok) {
      draftSession.aiAdvice = res.text;
    } else {
      draftSession.aiAdvice =
        "شهریار جان، نیتت برای «" + rawText + "» را با آسمان سنجیدم. از آنجا که در تاریخ <b>" + caStr + "</b> زاویه ماه کمی اصطکاکی است، در آن روز به خودت فشار نیاور؛ اما <b>" + stStr + "</b> به دلیل «" + win.starter.reason + "» بهترین موج انرژی برای برداشتن گام اول است! برای تثبیت نهایی هم <b>" + fnStr + "</b> نقطه اوج توست. در روز شروع، انگشتر <b>" + catInfo.gemHint + "</b> را به دست کن. اگر با این برنامه موافقی، دکمه سبز پایین را بزن تا ثبتش کنم و یادآور تقویم را برایت بسازم.";
    }

    isBusy = false;
    render();
  };

  window.sendDraftFollowUp = async function() {
    if (isBusy || !draftSession) return;
    const inp = document.getElementById("draftFollowUpInp");
    if (!inp || !inp.value.trim()) return;

    const userMsg = inp.value.trim();
    draftSession.history.push({ role: "user", text: userMsg });
    const prevAdvice = draftSession.aiAdvice;
    draftSession.aiAdvice = "🧙‍♂️ پیرمرد در حال بررسی شرط جدید تو با تقویم آسمان...";
    isBusy = true;
    render();

    const win = draftSession.win;
    const fmt = dt => dt.toLocaleDateString("fa-IR", { weekday: "long", month: "short", day: "numeric" });

    const promptText =
      "تو «پیرمرد حکیم» هستی و در حال ادامه گفتگو با شهریار درباره تصمیم «" + draftSession.title + "» هستی.\n" +
      "پاسخ قبلی تو: «" + prevAdvice + "»\n" +
      "حالا شهریار می‌گوید / می‌پرسد: «" + userMsg + "»\n" +
      "پنجره‌های طلایی موجود در چارت: پنجره اول در " + fmt(win.starter.dt) + " (" + win.starter.slotLabel + ")، پنجره میانی در " + fmt(win.midPeak.dt) + "، و روز احتیاط در " + fmt(win.caution.dt) + ".\n" +
      "در ۳ جمله صمیمی و دقیق به شرط یا سوال جدید شهریار جواب بده و زمان‌بندی را متناسب با حرف او تنظیم کن.";

    const apiKey = window.getStore ? window.getStore("key", "") : "";
    const res = await callLunarAI(apiKey, promptText);

    if (res.ok) {
      draftSession.aiAdvice = res.text;
    } else {
      draftSession.aiAdvice = prevAdvice + "\n\n✨ درباره نکته‌ای که گفتی («" + userMsg + "»): کاملاً شدنی است؛ فقط سعی کن در همان بازه ساعتی پیشنهادی (" + win.starter.slotLabel + ") قدم اصلی را برداری تا هاله آینه‌ای تو در بیشترین شارژ باشد.";
    }

    isBusy = false;
    render();
  };

  window.confirmAndSaveDraftDecision = function() {
    if (!draftSession) return;
    const list = getDecisions();
    const newId = Date.now();
    list.unshift({
      id: newId,
      title: draftSession.title,
      cat: draftSession.cat,
      start: Date.now(),
      status: "active",
      oldmanAdvice: draftSession.aiAdvice,
      pulses: [],
      notes: []
    });
    saveDecisions(list);
    draftSession = null;
    activeTab = "active";
    openCardId = newId;
    render();
  };

  window.cancelDraftSession = function() {
    draftSession = null;
    render();
  };

  window.switchLunarTab = function(tabName) {
    activeTab = tabName;
    openCardId = null;
    render();
  };

  window.toggleCardAccordion = function(cardId) {
    openCardId = (openCardId === cardId ? null : cardId);
    render();
  };

  window.recordDailyPulse = function(ev, cardId, mood) {
    if (ev) ev.stopPropagation();
    const list = getDecisions();
    const dec = list.find(x => x.id === cardId);
    if (!dec) return;
    if (!Array.isArray(dec.pulses)) dec.pulses = [];

    const elapsedDays = Math.min(28, Math.max(1, Math.floor((Date.now() - dec.start) / 86400000) + 1));
    const existingIdx = dec.pulses.findIndex(p => p.day === elapsedDays);
    if (existingIdx >= 0) dec.pulses[existingIdx].mood = mood;
    else dec.pulses.push({ day: elapsedDays, mood });

    saveDecisions(list);
    render();
  };

  window.completeLunarDecision = function(ev, cardId, outcomeText) {
    if (ev) ev.stopPropagation();
    const list = getDecisions();
    const dec = list.find(x => x.id === cardId);
    if (!dec) return;
    dec.status = "archived";
    dec.completedAt = Date.now();
    dec.outcome = outcomeText || "نهایی و تثبیت شد";
    saveDecisions(list);
    activeTab = "archived";
    openCardId = null;
    render();
  };

  window.restoreLunarDecision = function(ev, cardId) {
    if (ev) ev.stopPropagation();
    const list = getDecisions();
    const dec = list.find(x => x.id === cardId);
    if (!dec) return;
    dec.status = "active";
    saveDecisions(list);
    activeTab = "active";
    openCardId = cardId;
    render();
  };

  window.removeProLunarDecision = function(ev, cardId) {
    if (ev) ev.stopPropagation();
    if (confirm("آیا از حذف این تصمیم مطمئن هستید؟")) {
      let list = getDecisions();
      list = list.filter(x => x.id !== cardId);
      saveDecisions(list);
      if (openCardId === cardId) openCardId = null;
      render();
    }
  };

  window.addLunarJournalNote = function(ev, cardId) {
    if (ev) ev.stopPropagation();
    const inp = document.getElementById("lunar-note-inp-" + cardId);
    if (!inp || !inp.value.trim()) return;

    const list = getDecisions();
    const dec = list.find(x => x.id === cardId);
    if (!dec) return;
    if (!Array.isArray(dec.notes)) dec.notes = [];

    const elapsedDays = Math.min(28, Math.floor((Date.now() - dec.start) / 86400000) + 1);
    const dateStr = new Date().toLocaleDateString("fa-IR", { month: "short", day: "numeric" });

    dec.notes.unshift({
      day: elapsedDays,
      date: dateStr,
      text: inp.value.trim()
    });
    saveDecisions(list);
    render();
  };

  window.askLunarAI = async function(ev, cardId) {
    if (ev) ev.stopPropagation();
    if (isBusy) return;

    const list = getDecisions();
    const dec = list.find(x => x.id === cardId);
    if (!dec) return;

    const outBox = document.getElementById("lunar-ai-out-" + cardId);
    const btn = document.getElementById("lunar-ai-btn-" + cardId);
    if (!outBox || !btn) return;

    isBusy = true;
    btn.disabled = true;
    btn.textContent = "🌕 پیرمرد در حال رصد چرخه ۲۸ روزه این تصمیم...";
    outBox.style.display = "block";
    outBox.innerHTML = "در حال بررسی فاز ماه، نبض‌های ثبت‌شده و پنجره‌های طلایی...";

    const elapsedDays = Math.min(28, Math.floor((Date.now() - dec.start) / 86400000) + 1);
    const win = scanDecisionWindows(dec);
    const stDay = win.starter.dt.toLocaleDateString("fa-IR", { weekday: "long", month: "short", day: "numeric" });
    const fnDay = win.finalWin.dt.toLocaleDateString("fa-IR", { weekday: "long", month: "short", day: "numeric" });
    const notesStr = (dec.notes && dec.notes.length > 0)
      ? dec.notes.map(n => "روز " + n.day + ": " + n.text).join(" | ")
      : "هنوز یادداشتی ثبت نشده";

    const promptText =
      "تو «پیرمرد حکیم» هستی و به «شهریار» (Reflector 6/2) درباره تصمیم مهمش مشاوره می‌دهی.\n" +
      "- عنوان تصمیم: «" + dec.title + "»\n" +
      "- امروز روز " + elapsedDays + " از چرخه ۲۸ روزه ماه است.\n" +
      "- پنجره مناسب استارت و تست اولیه: " + stDay + " (" + win.starter.slotLabel + ")\n" +
      "- روز موعود برای تصمیم نهایی رفلکتور: " + fnDay + " (" + win.finalWin.slotLabel + ")\n" +
      "- یادداشت‌های شهریار: " + notesStr + "\n\n" +
      "در ۴ جمله صمیمی، عمیق و کاربردی به شهریار بگو در این روز از چرخه چطور عمل کند تا بهترین نتیجه را بگیرد.";

    const apiKey = window.getStore ? window.getStore("key", "") : "";
    const res = await callLunarAI(apiKey, promptText);

    if (res.ok) {
      outBox.innerHTML = "<b>🧙‍♂️ قطب‌نمای پیرمرد برای این تصمیم:</b><br/>" + res.text.replace(/\n/g, "<br/>");
      dec.oldmanAdvice = res.text;
      saveDecisions(list);
    } else {
      outBox.innerHTML =
        "<b>🧙‍♂️ قطب‌نمای پیرمرد:</b><br/>" +
        "شهریار جان، برای «" + dec.title + "» پنجره <b>" + stDay + " (" + win.starter.slotLabel + ")</b> بهترین موج آغازگر را دارد و برای تثبیت نهایی، <b>" + fnDay + "</b> آینه دلت را کاملاً شفاف می‌سازد.";
    }

    btn.disabled = false;
    btn.textContent = "🧙‍♂️ مشورت مجدد با پیرمرد درباره زمان این تصمیم";
    isBusy = false;
  };

  function renderAlarmButtons(targetMs, title, reason, catKey) {
    const tEnc = encodeURIComponent(title);
    const rEnc = encodeURIComponent(reason);
    return (
      '<div class="cal-btn-row">' +
        '<button class="cal-chip-btn" onclick="window.openGoogleCalWindow(event, ' + targetMs + ', \'' + tEnc + '\', \'' + rEnc + '\', \'' + catKey + '\')">📅 ثبت در تقویم گوگل</button>' +
        '<button class="cal-chip-btn ics" onclick="window.downloadIcsAlarm(event, ' + targetMs + ', \'' + tEnc + '\', \'' + rEnc + '\', \'' + catKey + '\')">⏰ آلارم تقویم گوشی (.ics)</button>' +
      '</div>'
    );
  }

  function render() {
    const mount = document.getElementById("lunarTrackerMount");
    if (!mount) return;

    const allList = getDecisions();
    const activeCount = allList.filter(x => x.status !== "archived").length;
    const archivedCount = allList.filter(x => x.status === "archived").length;

    const fmtDate = dt => dt.toLocaleDateString("fa-IR", { weekday: "short", month: "short", day: "numeric" });

    // بخش پیش‌نمایش گفتگوی تعاملی با پیرمرد
    let draftHtml = "";
    if (draftSession) {
      const dCatInfo = CATEGORIES[draftSession.cat] || CATEGORIES.total;
      const dWin = draftSession.win;
      const stDateStr = fmtDate(dWin.starter.dt);
      const fnDateStr = fmtDate(dWin.finalWin.dt);

      draftHtml =
        '<div class="draft-sanctuary-box">' +
          '<div style="display:flex;justify-content:space-between;align-items:center">' +
            '<span style="font-size:0.78rem;font-weight:900;color:#7dd3fc">🧙‍♂️ میز مشورت پیرمرد پیش از ثبت تصمیم</span>' +
            '<span class="lunar-badge">' + dCatInfo.label + '</span>' +
          '</div>' +

          '<div class="draft-speech-bubble">' +
            draftSession.aiAdvice.replace(/\n/g, "<br/>") +
          '</div>' +

          '<div style="background:rgba(34,197,94,0.09);border:1px solid rgba(34,197,94,0.35);border-radius:10px;padding:8px 10px;font-size:0.72rem;color:#dcfce7">' +
            '<div>⚡ <b>بهترین پنجره استارت و اقدام:</b> ' + stDateStr + ' — ' + dWin.starter.slotLabel + ' (' + formatDaysDiff(dWin.starter.t) + ')</div>' +
            renderAlarmButtons(dWin.starter.t, "شروع: " + draftSession.title, dWin.starter.reason, draftSession.cat) +
            '<div style="margin-top:8px;padding-top:6px;border-top:1px dashed rgba(255,255,255,0.12)">👑 <b>روز موعود تثبیت ۲۸ روزه:</b> ' + fnDateStr + ' — ' + dWin.finalWin.slotLabel + ' (' + formatDaysDiff(dWin.finalWin.t) + ')</div>' +
            renderAlarmButtons(dWin.finalWin.t, "تصمیم قطعی: " + draftSession.title, dWin.finalWin.reason, draftSession.cat) +
          '</div>' +

          '<div class="draft-refine-row">' +
            '<input type="text" id="draftFollowUpInp" class="lunar-inp-full" placeholder="شرط یا سوالی داری؟ (مثلاً: اگه از شنبه شروع کنم چی؟)" />' +
            '<button class="lunar-btn-gold" style="width:auto;white-space:nowrap;padding:0 12px" onclick="window.sendDraftFollowUp()">پرسش ↩️</button>' +
          '</div>' +

          '<div class="draft-confirm-grid">' +
            '<button class="btn-confirm-save" onclick="window.confirmAndSaveDraftDecision()">✅ ثبت نهایی در چرخه ۲۸ روزه</button>' +
            '<button class="btn-cancel-draft" onclick="window.cancelDraftSession()">انصراف</button>' +
          '</div>' +
        '</div>';
    }

    let cardsHtml = "";

    if (activeTab === "active") {
      const activeItems = allList.filter(x => x.status !== "archived");

      if (activeItems.length === 0 && !draftSession) {
        cardsHtml =
          '<div style="color:#94a3b8;font-size:0.77rem;text-align:center;padding:14px 8px;background:rgba(255,255,255,0.02);border-radius:12px">' +
            '🌕 هیچ تصمیم فعالی در چرخه ۲۸ روزه ندارید.<br/>' +
            '<span style="font-size:0.7rem;color:#64748b">در کادر بالا به پیرمرد بگو چه تصمیمی در سر داری تا بهترین روز شروع را برایت پیدا کند.</span>' +
          '</div>';
      } else {
        activeItems.forEach(d => {
          const isOpen = (openCardId === d.id);
          const catInfo = CATEGORIES[d.cat] || CATEGORIES.total;
          const elapsedDays = Math.min(28, Math.max(1, Math.floor((Date.now() - d.start) / 86400000) + 1));
          const pct = Math.min(100, Math.round((elapsedDays / 28) * 100));
          const win = scanDecisionWindows(d);

          const stDateStr = fmtDate(win.starter.dt);
          const mdDateStr = fmtDate(win.midPeak.dt);
          const fnDateStr = fmtDate(win.finalWin.dt);
          const caDateStr = fmtDate(win.caution.dt);
          const endStr    = win.endDate.toLocaleDateString("fa-IR", { month: "short", day: "numeric" });

          const ms1 = elapsedDays >= 7 ? "done" : "current";
          const ms2 = elapsedDays >= 14 ? "done" : (elapsedDays >= 7 ? "current" : "");
          const ms3 = elapsedDays >= 21 ? "done" : (elapsedDays >= 14 ? "current" : "");
          const ms4 = elapsedDays >= 28 ? "done" : (elapsedDays >= 21 ? "current" : "");

          const pulses = Array.isArray(d.pulses) ? d.pulses : [];
          const posCount = pulses.filter(p => p.mood === "pos").length;
          const clarityPct = pulses.length > 0 ? Math.round((posCount / pulses.length) * 100) : null;
          const todayPulse = pulses.find(p => p.day === elapsedDays);

          const notesArr = Array.isArray(d.notes) ? d.notes : [];
          let notesHtml = "";
          notesArr.forEach(n => {
            notesHtml += '<div class="lunar-note-item"><b style="color:#7dd3fc">روز ' + n.day + ' (' + n.date + '):</b> ' + n.text + '</div>';
          });

          cardsHtml +=
            '<div class="lunar-dec-card" style="border-right-color:' + catInfo.color + '" onclick="window.toggleCardAccordion(' + d.id + ')">' +
              '<div class="lunar-card-head">' +
                '<div>' +
                  '<div style="font-size:0.88rem;font-weight:900;color:#fef08a">' + d.title + '</div>' +
                  '<span class="lunar-badge">' + catInfo.label + '</span> ' +
                  '<span class="lunar-badge" style="color:#7dd3fc">روز ' + elapsedDays + ' از ۲۸ (' + pct + '٪)</span>' +
                  (clarityPct !== null ? ' <span class="lunar-badge" style="color:#4ade80">💚 رضایت: ' + clarityPct + '٪</span>' : '') +
                '</div>' +
                '<span style="font-size:0.7rem;color:#7dd3fc;font-weight:700;white-space:nowrap">' + (isOpen ? "بستن ▴" : "باز کردن ▾") + '</span>' +
              '</div>' +

              '<div class="bar-bg" style="margin-top:8px;height:6px"><div class="bar-fill" style="width:' + pct + '%;background:' + catInfo.color + '"></div></div>' +

              '<div class="lunar-body-content' + (isOpen ? " open" : "") + '" onclick="event.stopPropagation()">' +
                (d.oldmanAdvice ? (
                  '<div class="draft-speech-bubble" style="margin-bottom:10px">' +
                    '<b>🧙‍♂️ توصیه ثبت‌شده پیرمرد:</b><br/>' + d.oldmanAdvice.replace(/\n/g, "<br/>") +
                  '</div>'
                ) : '') +

                '<div class="lunar-ms-grid">' +
                  '<div class="ms-item ' + ms1 + '">🌓 روز ۷<br/>گام اول</div>' +
                  '<div class="ms-item ' + ms2 + '">🌕 روز ۱۴<br/>اوج روشنایی</div>' +
                  '<div class="ms-item ' + ms3 + '">🌗 روز ۲۱<br/>غربالگری</div>' +
                  '<div class="ms-item ' + ms4 + '">🌑 روز ۲۸<br/>' + endStr + '</div>' +
                '</div>' +

                '<div class="win-section-title">' +
                  '<span>🧭 پنجره‌های طلایی + تنظیم آلارم تقویم گوشی:</span>' +
                '</div>' +
                '<div class="win-list">' +
                  '<div class="win-row starter">' +
                    '<div style="flex:1">' +
                      '<div style="font-weight:900;color:#7dd3fc">⚡ ۱. بهترین روز استارت و تست عملی (هفته اول):</div>' +
                      '<div>📅 <b>' + stDateStr + '</b> — ' + win.starter.slotLabel + '</div>' +
                      '<div style="font-size:0.64rem;color:#bae6fd">✨ ' + win.starter.reason + ' | 💍 ' + catInfo.gemHint + '</div>' +
                      renderAlarmButtons(win.starter.t, "شروع: " + d.title, win.starter.reason, d.cat) +
                    '</div>' +
                    '<div class="win-left-tag">' + formatDaysDiff(win.starter.t) + '<br/><span style="color:#7dd3fc">' + win.starter.score + '٪</span></div>' +
                  '</div>' +

                  '<div class="win-row midpeak">' +
                    '<div style="flex:1">' +
                      '<div style="font-weight:900;color:#d8b4fe">🌕 ۲. پنجره میانی و مذاکره (هفته دوم و سوم):</div>' +
                      '<div>📅 <b>' + mdDateStr + '</b> — ' + win.midPeak.slotLabel + '</div>' +
                      '<div style="font-size:0.64rem;color:#e9d5ff">✨ ' + win.midPeak.reason + '</div>' +
                      renderAlarmButtons(win.midPeak.t, "پنجره میانی: " + d.title, win.midPeak.reason, d.cat) +
                    '</div>' +
                    '<div class="win-left-tag">' + formatDaysDiff(win.midPeak.t) + '<br/><span style="color:#d8b4fe">' + win.midPeak.score + '٪</span></div>' +
                  '</div>' +

                  '<div class="win-row final">' +
                    '<div style="flex:1">' +
                      '<div style="font-weight:900;color:#4ade80">👑 ۳. روز موعود تصمیم قطعی رفلکتور (هفته آخر):</div>' +
                      '<div>📅 <b>' + fnDateStr + '</b> — ' + win.finalWin.slotLabel + '</div>' +
                      '<div style="font-size:0.64rem;color:#bbf7d0">✨ تکمیل دایره ماه + ' + win.finalWin.reason + '</div>' +
                      renderAlarmButtons(win.finalWin.t, "تصمیم قطعی: " + d.title, win.finalWin.reason, d.cat) +
                    '</div>' +
                    '<div class="win-left-tag">' + formatDaysDiff(win.finalWin.t) + '<br/><span style="color:#4ade80">' + win.finalWin.score + '٪</span></div>' +
                  '</div>' +

                  '<div class="win-row caution">' +
                    '<div>' +
                      '<div style="font-weight:900;color:#fca5a5">🛑 روز پرهیز از تصمیم عجولانه:</div>' +
                      '<div>📅 <b>' + caDateStr + '</b> — افت انرژی یا زاویه اصطکاکی</div>' +
                    '</div>' +
                    '<div class="win-left-tag">' + formatDaysDiff(win.caution.t) + '<br/><span style="color:#fca5a5">' + win.caution.score + '٪</span></div>' +
                  '</div>' +
                '</div>' +

                '<div class="pulse-box">' +
                  '<div style="font-size:0.7rem;color:#fde68a;font-weight:800;display:flex;justify-content:space-between">' +
                    '<span>💓 حس درونی امروزت (روز ' + elapsedDays + ') به این تصمیم چیست؟</span>' +
                    '<span style="color:#94a3b8">' + (todayPulse ? "ثبت شد ✓" : "یک لمس") + '</span>' +
                  '</div>' +
                  '<div class="pulse-btns">' +
                    '<button class="pulse-btn" style="' + (todayPulse && todayPulse.mood === "pos" ? "border-color:#22c55e;background:rgba(34,197,94,0.2);color:#fff" : "") + '" onclick="window.recordDailyPulse(event, ' + d.id + ', \'pos\')">🟢 روشن و موافق</button>' +
                    '<button class="pulse-btn" style="' + (todayPulse && todayPulse.mood === "neu" ? "border-color:#f5c56b;background:rgba(245,197,107,0.2);color:#fff" : "") + '" onclick="window.recordDailyPulse(event, ' + d.id + ', \'neu\')">🟡 مردد / خنثی</button>' +
                    '<button class="pulse-btn" style="' + (todayPulse && todayPulse.mood === "neg" ? "border-color:#ef4444;background:rgba(239,68,68,0.2);color:#fff" : "") + '" onclick="window.recordDailyPulse(event, ' + d.id + ', \'neg\')">🔴 سنگین و مخالف</button>' +
                  '</div>' +
                '</div>' +

                '<div class="lunar-stack-form" style="margin-top:10px">' +
                  '<input type="text" id="lunar-note-inp-' + d.id + '" class="lunar-inp-full" placeholder="یادداشت یا نشانه امروز را بنویس..." />' +
                  '<button class="lunar-btn-gold" onclick="window.addLunarJournalNote(event, ' + d.id + ')">+ ذخیره یادداشت در پرونده تصمیم</button>' +
                '</div>' +
                '<div id="lunar-notes-list-' + d.id + '">' + notesHtml + '</div>' +

                '<button id="lunar-ai-btn-' + d.id + '" class="lunar-ai-btn" onclick="window.askLunarAI(event, ' + d.id + ')">🧙‍♂️ مشورت مجدد با پیرمرد درباره روند این تصمیم</button>' +
                '<div id="lunar-ai-out-' + d.id + '" class="lunar-ai-box"></div>' +

                '<button class="lunar-complete-btn" onclick="window.completeLunarDecision(event, ' + d.id + ', \'تصمیم با موفقیت اتخاذ و نهایی شد ✅\')">✅ تثبیت تصمیم و انتقال به لیست «تصمیمات گرفته‌شده»</button>' +
                '<button class="lunar-delete-btn" onclick="window.removeProLunarDecision(event, ' + d.id + ')">🗑️ حذف کامل این تصمیم</button>' +
              '</div>' +
            '</div>';
        });
      }
    } else {
      const archItems = allList.filter(x => x.status === "archived");
      if (archItems.length === 0) {
        cardsHtml =
          '<div style="color:#94a3b8;font-size:0.76rem;text-align:center;padding:14px 8px;background:rgba(255,255,255,0.02);border-radius:12px">' +
            '📂 هنوز هیچ تصمیمی به لیست نهایی منتقل نشده است.<br/>' +
            '<span style="font-size:0.69rem;color:#64748b">وقتی تصمیمی را نهایی کردید، دکمه «تثبیت تصمیم» را بزنید تا در این سابقه ذخیره شود.</span>' +
          '</div>';
      } else {
        archItems.forEach(d => {
          const catInfo = CATEGORIES[d.cat] || CATEGORIES.total;
          const compDate = new Date(d.completedAt || Date.now()).toLocaleDateString("fa-IR", { year: "numeric", month: "short", day: "numeric" });
          cardsHtml +=
            '<div class="lunar-dec-card" style="border-right-color:#22c55e">' +
              '<div class="lunar-card-head">' +
                '<div>' +
                  '<div style="font-size:0.85rem;font-weight:900;color:#bbf7d0">✅ ' + d.title + '</div>' +
                  '<span class="lunar-badge">' + catInfo.label + '</span> ' +
                  '<span class="lunar-badge" style="color:#86efac">تثبیت‌شده در: ' + compDate + '</span>' +
                '</div>' +
                '<div style="display:flex;gap:6px" onclick="event.stopPropagation()">' +
                  '<span onclick="window.restoreLunarDecision(event, ' + d.id + ')" style="color:#7dd3fc;cursor:pointer;font-size:0.7rem">↩️ بازگردانی</span>' +
                  '<span onclick="window.removeProLunarDecision(event, ' + d.id + ')" style="color:#fca5a5;cursor:pointer;font-size:0.75rem">🗑️</span>' +
                '</div>' +
              '</div>' +
            '</div>';
        });
      }
    }

    mount.innerHTML =
      '<div id="lunarTrackerSection" class="lunar-pro-card">' +
        '<div class="lunar-top-bar">' +
          '<span class="lunar-main-title">🌕 قطب‌نمای ۲۸ روزه و مشاور تصمیم رفلکتور</span>' +
          '<span class="lunar-ver-pill">نسخه ۱.۴.۵</span>' +
        '</div>' +

        '<div class="lunar-tabs-row">' +
          '<button class="lunar-tab-btn' + (activeTab === "active" ? " active" : "") + '" onclick="window.switchLunarTab(\'active\')">⏳ در جریان چرخه (' + activeCount + ')</button>' +
          '<button class="lunar-tab-btn' + (activeTab === "archived" ? " active" : "") + '" onclick="window.switchLunarTab(\'archived\')">✅ تصمیمات گرفته‌شده (' + archivedCount + ')</button>' +
        '</div>' +

        (activeTab === "active" ? (
          '<div class="lunar-add-box">' +
            '<div style="font-size:0.74rem;color:#fde68a;font-weight:800">🧙‍♂️ به پیرمرد بگو چه تصمیمی در سر داری تا بهترین روز شروع را برایت حساب کند:</div>' +
            '<div class="lunar-stack-form">' +
              '<input type="text" id="proDecisionTitleInp" class="lunar-inp-full" placeholder="مثلاً: می‌خوام وزنم رو کم کنم، یا می‌خوام ماشین بخرم..." value="' + (draftSession ? draftSession.title : "") + '" />' +
              '<input type="hidden" id="proDecisionCatSel" value="auto" />' +
              '<button class="lunar-btn-gold" ' + (isBusy ? "disabled" : "") + ' onclick="window.startInteractiveConsultation()">' +
                (isBusy ? "🔮 پیرمرد در حال اسکن ۲۸ روز آینده..." : "🧙‍♂️ مشورت با پیرمرد و محاسبه بهترین روز") +
              '</button>' +
            '</div>' +
            draftHtml +
          '</div>'
        ) : '') +

        '<div id="proLunarDecisionsList">' + cardsHtml + '</div>' +
      '</div>';
  }

  return { render, scanDecisionWindows };
})();
