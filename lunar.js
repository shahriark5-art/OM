// =========================================================================
// MODULE 6: 28-DAY REFLECTOR LUNAR COMPASS & DECISION TIME-MACHINE (lunar.js)
// =========================================================================
window.LunarCompassModule = (function() {
  let isBusy = false;
  let cachedLunarModel = "";

  const CATEGORIES = {
    wealth: { label: "💰 مالی و معامله", scoreKey: "wealth", color: "#f5c56b", gates: [44, 54, 12, 37, 26, 32] },
    love:   { label: "❤️ روابط و پیمان", scoreKey: "love",   color: "#f43f5e", gates: [12, 37, 50, 15, 11, 10] },
    action: { label: "⚡ اقدام و پروژه", scoreKey: "action", color: "#38bdf8", gates: [28, 8, 7, 23, 10, 54] },
    total:  { label: "👁️ کلی و شهودی",   scoreKey: "total",  color: "#4ade80", gates: [24, 63, 13, 10, 15, 50] }
  };

  (function injectLunarStyles() {
    if (document.getElementById("lunar-compass-styles")) return;
    const st = document.createElement("style");
    st.id = "lunar-compass-styles";
    st.textContent = `
      .lunar-pro-card {
        background: radial-gradient(circle at 50% 0%, rgba(245, 197, 107, 0.14) 0%, rgba(12, 18, 36, 0.95) 72%);
        border: 1.5px solid rgba(245, 197, 107, 0.45);
        border-radius: 20px; padding: 16px; margin-bottom: 15px;
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
      }
      .lunar-add-box {
        background: rgba(4, 7, 16, 0.75); border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px; padding: 11px; margin-bottom: 12px;
      }
      .lunar-form-row { display: flex; gap: 6px; margin-top: 7px; }
      .lunar-cat-sel {
        padding: 9px 8px; border-radius: 9px; border: 1px solid rgba(245, 197, 107, 0.35);
        background: #060a17; color: #fde68a; font-size: 0.76rem; font-weight: 700;
      }
      .lunar-dec-card {
        background: rgba(15, 23, 42, 0.88); border: 1px solid rgba(255, 255, 255, 0.1);
        border-right: 4px solid #f5c56b; border-radius: 14px;
        padding: 12px 13px; margin-top: 11px; transition: 0.25s;
      }
      .lunar-dec-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; cursor: pointer; }
      .lunar-cat-badge {
        font-size: 0.66rem; padding: 2px 8px; border-radius: 99px;
        background: rgba(255, 255, 255, 0.07); color: #e2e8f0; display: inline-block; margin-top: 3px;
      }
      .lunar-milestones {
        display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px;
        margin: 9px 0 6px; text-align: center;
      }
      .ms-step {
        background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: 8px; padding: 4px 2px; font-size: 0.64rem; color: #64748b;
      }
      .ms-step.done { border-color: rgba(56, 189, 248, 0.45); color: #bae6fd; background: rgba(56, 189, 248, 0.1); }
      .ms-step.current { border-color: #f5c56b; color: #fef08a; background: rgba(245, 197, 107, 0.18); font-weight: 800; }
      .lunar-window-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin-top: 9px; }
      .win-box { border-radius: 10px; padding: 8px 9px; font-size: 0.72rem; line-height: 1.6; }
      .win-box.gold { background: rgba(34, 197, 94, 0.11); border: 1px solid rgba(34, 197, 94, 0.38); color: #dcfce7; }
      .win-box.warn { background: rgba(239, 68, 68, 0.11); border: 1px solid rgba(239, 68, 68, 0.35); color: #fee2e2; }
      .lunar-drawer {
        display: none; margin-top: 10px; padding-top: 10px;
        border-top: 1px dashed rgba(255, 255, 255, 0.14); font-size: 0.77rem;
      }
      .lunar-drawer.open { display: block; }
      .lunar-note-row { display: flex; gap: 6px; margin-top: 7px; }
      .lunar-note-item {
        background: rgba(255, 255, 255, 0.03); border-right: 2.5px solid #38bdf8;
        border-radius: 7px; padding: 6px 8px; margin-top: 5px; font-size: 0.73rem; color: #cbd5e1;
      }
      .lunar-ai-btn {
        width: 100%; margin-top: 9px; padding: 9px; border-radius: 10px;
        border: 1px solid rgba(245, 197, 107, 0.6);
        background: linear-gradient(135deg, rgba(245, 197, 107, 0.22), rgba(56, 189, 248, 0.2));
        color: #fef08a; font-size: 0.76rem; font-weight: 900; cursor: pointer;
      }
      .lunar-ai-box {
        display: none; margin-top: 8px; padding: 9px 10px; border-radius: 10px;
        background: rgba(5, 8, 18, 0.94); border-right: 3px solid #f5c56b;
        color: #fef3c7; font-size: 0.77rem; line-height: 1.85; text-align: justify;
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

  // اسکنر نجومی ۲۸ روزه برای یافتن بهترین زمان تصمیم‌گیری و روز هشدار
  function scanDecisionWindows(dec) {
    const startMs = dec.start || Date.now();
    const nowMs = Date.now();
    const endMs = startMs + 28 * 86400000;
    const cat = CATEGORIES[dec.cat] || CATEGORIES.total;
    const scoreKey = cat.scoreKey;

    const scanFrom = Math.max(nowMs, startMs);
    const scanTo = Math.max(scanFrom + 7 * 86400000, endMs);

    let bestWin = null;
    let worstWin = null;

    if (!window.calcPlanets || !window.calcGalacticLuck) {
      const defBest = new Date(nowMs + 3 * 86400000);
      const defWorst = new Date(nowMs + 5 * 86400000);
      return {
        bestDate: defBest, bestScore: 84, bestDaysLeft: 3, bestReason: "هم‌نوایی ماه با مدار تصمیم",
        worstDate: defWorst, worstScore: 32, worstDaysLeft: 5,
        finalDate: new Date(endMs)
      };
    }

    // اسکن گام‌به‌گام هر ۶ ساعت در طول چرخه
    for (let t = scanFrom; t <= scanTo; t += 6 * 3600000) {
      const dt = new Date(t);
      const hr = dt.getHours();
      if (hr < 8 || hr > 22) continue; // فقط ساعات بیداری و مناسب اقدام

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
      let score = (lk[scoreKey] * 0.65) + (lk.total * 0.35);

      let reason = "تعادل پایدار هاله و ماه";
      const moonCh = act.find(x => x.p.isMoon);
      if (moonCh) {
        score += 12;
        reason = "قفل " + moonCh.ch.name + " توسط ماه";
      }
      if (cat.gates.includes(moon.gate)) {
        score += 9;
        const gTheme = (window.GATE_THEMES && window.GATE_THEMES[moon.gate]) || "";
        if (!moonCh) reason = "عبور ماه از دروازه هم‌سو («" + gTheme + "»)";
      }
      if (window.EXALTED_GATES && window.EXALTED_GATES.has(moon.gate)) {
        score += 8;
      }

      const daysFromStart = (t - startMs) / 86400000;
      if (daysFromStart >= 7) score += 5; // پختگی بیشتر پس از ربع اول ماه

      const finalScore = Math.min(99, Math.max(5, Math.round(score)));
      const daysLeft = Math.max(0, Math.ceil((t - nowMs) / 86400000));

      if (!bestWin || finalScore > bestWin.score) {
        bestWin = { dt, score: finalScore, daysLeft, reason, moonGate: moon.gate };
      }
      if (!worstWin || finalScore < worstWin.score) {
        worstWin = { dt, score: finalScore, daysLeft, moonGate: moon.gate };
      }
    }

    return {
      bestDate: bestWin ? bestWin.dt : new Date(nowMs + 2 * 86400000),
      bestScore: bestWin ? bestWin.score : 82,
      bestDaysLeft: bestWin ? bestWin.daysLeft : 2,
      bestReason: bestWin ? bestWin.reason : "وضوح بالای مدار ماه",
      worstDate: worstWin ? worstWin.dt : new Date(nowMs + 4 * 86400000),
      worstScore: worstWin ? worstWin.score : 30,
      worstDaysLeft: worstWin ? worstWin.daysLeft : 4,
      finalDate: new Date(endMs)
    };
  }

  function formatDaysLeft(days) {
    if (days <= 0) return "🔥 همین امروز!";
    if (days === 1) return "⏳ فردا (۱ روز دیگر)";
    return "⏳ " + days + " روز دیگر";
  }

  window.addProLunarDecision = function() {
    const inp = document.getElementById("proDecisionTitleInp");
    const catSel = document.getElementById("proDecisionCatSel");
    if (!inp || !inp.value.trim()) return;

    const list = getDecisions();
    list.unshift({
      id: Date.now(),
      title: inp.value.trim(),
      cat: catSel ? catSel.value : "total",
      start: Date.now(),
      notes: []
    });
    saveDecisions(list);
    inp.value = "";
    render();
  };

  window.removeProLunarDecision = function(ev, idx) {
    if (ev) ev.stopPropagation();
    const list = getDecisions();
    list.splice(idx, 1);
    saveDecisions(list);
    render();
  };

  window.toggleLunarDecDrawer = function(idx) {
    const dr = document.getElementById("lunar-dec-drawer-" + idx);
    if (dr) dr.classList.toggle("open");
  };

  window.addLunarJournalNote = function(ev, idx) {
    if (ev) ev.stopPropagation();
    const inp = document.getElementById("lunar-note-inp-" + idx);
    if (!inp || !inp.value.trim()) return;

    const list = getDecisions();
    if (!list[idx]) return;
    if (!Array.isArray(list[idx].notes)) list[idx].notes = [];

    const elapsedDays = Math.min(28, Math.floor((Date.now() - list[idx].start) / 86400000) + 1);
    const dateStr = new Date().toLocaleDateString("fa-IR", { month: "short", day: "numeric" });

    list[idx].notes.unshift({
      day: elapsedDays,
      date: dateStr,
      text: inp.value.trim()
    });
    saveDecisions(list);
    render(idx);
  };

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
              generationConfig: { temperature: 0.8 }
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

  window.askLunarAI = async function(ev, idx) {
    if (ev) ev.stopPropagation();
    if (isBusy) return;

    const list = getDecisions();
    const dec = list[idx];
    if (!dec) return;

    const outBox = document.getElementById("lunar-ai-out-" + idx);
    const btn = document.getElementById("lunar-ai-btn-" + idx);
    if (!outBox || !btn) return;

    isBusy = true;
    btn.disabled = true;
    btn.textContent = "🌕 پیرمرد در حال رصد چرخه ۲۸ روزه این تصمیم...";
    outBox.style.display = "block";
    outBox.innerHTML = "در حال بررسی فاز فعلی ماه و پنجره‌های طلایی تصمیم‌گیری...";

    const elapsedDays = Math.min(28, Math.floor((Date.now() - dec.start) / 86400000) + 1);
    const win = scanDecisionWindows(dec);
    const bestDayStr = win.bestDate.toLocaleDateString("fa-IR", { weekday: "long", month: "short", day: "numeric" });
    const warnDayStr = win.worstDate.toLocaleDateString("fa-IR", { weekday: "long", month: "short", day: "numeric" });
    const notesStr = (dec.notes && dec.notes.length > 0)
      ? dec.notes.map(n => "روز " + n.day + ": " + n.text).join(" | ")
      : "هنوز یادداشتی ثبت نشده";

    const promptText =
      "تو «پیرمرد حکیم» هستی و به «شهریار» (Reflector 6/2) درباره تصمیم مهمش مشاوره می‌دهی.\n" +
      "- عنوان تصمیم: «" + dec.title + "»\n" +
      "- وضعیت چرخه ۲۸ روزه: امروز روز " + elapsedDays + " از ۲۸ روز است.\n" +
      "- بهترین پنجره طلایی محاسبه‌شده برای تصمیم‌گیری یا اقدام کلیدی: " + bestDayStr + " (" + formatDaysLeft(win.bestDaysLeft) + " با شاخص هماهنگی " + win.bestScore + "% به دلیل " + win.bestReason + ").\n" +
      "- روز هشدار و احتیاط: " + warnDayStr + " (شاخص " + win.worstScore + "%).\n" +
      "- یادداشت‌های درونی شهریار تا این لحظه: " + notesStr + "\n\n" +
      "در ۴ جمله عمیق، گرم و راهگشا به شهریار بگو:\n" +
      "۱. در روز " + elapsedDays + " از چرخه ماه، این تصمیم در چه مرحله‌ای از پختگی قرار دارد؟\n" +
      "۲. چرا صبر کردن تا پنجره طلایی (" + bestDayStr + ") به نفع اوست و در آن روز چطور عمل کند؟\n" +
      "۳. چه سوالی را امشب از دل خود بپرسد تا وضوحش بیشتر شود؟";

    const apiKey = window.getStore ? window.getStore("key", "") : "";
    const res = await callLunarAI(apiKey, promptText);

    if (res.ok) {
      outBox.innerHTML = "<b>🧙‍♂️ قطب‌نمای پیرمرد برای این تصمیم:</b><br/>" + res.text.replace(/\n/g, "<br/>");
    } else {
      outBox.innerHTML =
        "<b>🧙‍♂️ قطب‌نمای پیرمرد:</b><br/>" +
        "شهریار جان، تو اکنون در روز <b>" + elapsedDays + "</b> از چرخه ۲۸ روزه «" + dec.title + "» هستی. عجله نکن؛ در تاریخ <b>" + bestDayStr + " (" + formatDaysLeft(win.bestDaysLeft) + ")</b> به دلیل «" + win.bestReason + "»، آسمان بالاترین وضوح (" + win.bestScore + "٪) را به آینه دلت می‌دهد و بهترین زمان برای جمع‌بندی یا گام برداشتن است. فقط در <b>" + warnDayStr + "</b> از تصمیم‌گیری احساسی پرهیز کن.";
    }

    btn.disabled = false;
    btn.textContent = "🧙‍♂️ مشورت مجدد با پیرمرد درباره زمان این تصمیم";
    isBusy = false;
  };

  function render(openIdx = -1) {
    const mount = document.getElementById("lunarTrackerMount");
    if (!mount) return;

    const list = getDecisions();
    let cardsHtml = "";

    if (list.length === 0) {
      cardsHtml =
        '<div style="color:#94a3b8;font-size:0.78rem;text-align:center;padding:12px 6px;background:rgba(255,255,255,0.02);border-radius:12px">' +
          '🌕 هنوز تصمیمی در قطب‌نمای ۲۸ روزه ثبت نکرده‌اید.<br/>' +
          '<span style="font-size:0.71rem;color:#64748b">عنوان تصمیم مهم خود را در کادر بالا بنویسید تا رادار، بهترین روز تصمیم‌گیری را محاسبه کند.</span>' +
        '</div>';
    } else {
      list.forEach((d, idx) => {
        const catInfo = CATEGORIES[d.cat] || CATEGORIES.total;
        const elapsedDays = Math.min(28, Math.max(1, Math.floor((Date.now() - d.start) / 86400000) + 1));
        const pct = Math.min(100, Math.round((elapsedDays / 28) * 100));
        const win = scanDecisionWindows(d);

        const bestDateStr = win.bestDate.toLocaleDateString("fa-IR", { weekday: "short", month: "short", day: "numeric" });
        const bestTimeStr = win.bestDate.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
        const warnDateStr = win.worstDate.toLocaleDateString("fa-IR", { weekday: "short", month: "short", day: "numeric" });
        const finalDateStr = win.finalDate.toLocaleDateString("fa-IR", { month: "short", day: "numeric" });

        const ms1 = elapsedDays >= 7 ? "done" : "current";
        const ms2 = elapsedDays >= 14 ? "done" : (elapsedDays >= 7 ? "current" : "");
        const ms3 = elapsedDays >= 21 ? "done" : (elapsedDays >= 14 ? "current" : "");
        const ms4 = elapsedDays >= 28 ? "done" : (elapsedDays >= 21 ? "current" : "");

        const notesArr = Array.isArray(d.notes) ? d.notes : [];
        let notesHtml = "";
        notesArr.forEach(n => {
          notesHtml += '<div class="lunar-note-item"><b style="color:#7dd3fc">روز ' + n.day + ' (' + n.date + '):</b> ' + n.text + '</div>';
        });

        cardsHtml +=
          '<div class="lunar-dec-card" style="border-right-color:' + catInfo.color + '">' +
            '<div class="lunar-dec-top" onclick="window.toggleLunarDecDrawer(' + idx + ')">' +
              '<div>' +
                '<div style="font-size:0.86rem;font-weight:900;color:#fef08a">' + d.title + '</div>' +
                '<span class="lunar-cat-badge">' + catInfo.label + '</span> ' +
                '<span class="lunar-cat-badge" style="color:#7dd3fc">روز ' + elapsedDays + ' از ۲۸ (' + pct + '٪)</span>' +
              '</div>' +
              '<div style="display:flex;align-items:center;gap:8px">' +
                '<span style="font-size:0.68rem;color:#93c5fd">جزئیات ▾</span>' +
                '<span onclick="window.removeProLunarDecision(event, ' + idx + ')" style="color:#fca5a5;cursor:pointer;font-size:0.75rem;padding:2px 5px">✕</span>' +
              '</div>' +
            '</div>' +

            '<div class="bar-bg" style="margin-top:8px;height:6px"><div class="bar-fill" style="width:' + pct + '%;background:' + catInfo.color + '"></div></div>' +

            '<div class="lunar-milestones">' +
              '<div class="ms-step ' + ms1 + '">🌓 روز ۷<br/>چالش اول</div>' +
              '<div class="ms-step ' + ms2 + '">🌕 روز ۱۴<br/>اوج روشنایی</div>' +
              '<div class="ms-step ' + ms3 + '">🌗 روز ۲۱<br/>پالایش</div>' +
              '<div class="ms-step ' + ms4 + '">🌑 روز ۲۸<br/>' + finalDateStr + '</div>' +
            '</div>' +

            '<div class="lunar-window-grid">' +
              '<div class="win-box gold">' +
                '<div style="font-weight:900;color:#4ade80">🎯 بهترین زمان تصمیم:</div>' +
                '<div style="font-weight:800;color:#fff;margin-top:2px">' + formatDaysLeft(win.bestDaysLeft) + '</div>' +
                '<div style="font-size:0.67rem;color:#bbf7d0">' + bestDateStr + ' ساعت ' + bestTimeStr + ' (' + win.bestScore + '٪)</div>' +
                '<div style="font-size:0.64rem;color:#86efac;margin-top:2px">✨ ' + win.bestReason + '</div>' +
              '</div>' +
              '<div class="win-box warn">' +
                '<div style="font-weight:900;color:#fca5a5">⚠️ روز پرهیز از تصمیم:</div>' +
                '<div style="font-weight:800;color:#fff;margin-top:2px">' + formatDaysLeft(win.worstDaysLeft) + '</div>' +
                '<div style="font-size:0.67rem;color:#fecaca">' + warnDateStr + ' (شاخص ' + win.worstScore + '٪)</div>' +
                '<div style="font-size:0.64rem;color:#fca5a5;margin-top:2px">🛑 احتمال تصمیم احساسی/عجولانه</div>' +
              '</div>' +
            '</div>' +

            '<div id="lunar-dec-drawer-' + idx + '" class="lunar-drawer' + (openIdx === idx ? " open" : "") + '" onclick="event.stopPropagation()">' +
              '<div style="font-size:0.73rem;color:#fde68a;font-weight:700">📝 ثبت حس و نشانه امروز درباره این تصمیم:</div>' +
              '<div class="lunar-note-row">' +
                '<input type="text" id="lunar-note-inp-' + idx + '" class="lunar-inp" placeholder="امروز حس کردم که..." />' +
                '<button class="lunar-add-btn" onclick="window.addLunarJournalNote(event, ' + idx + ')">ثبت یادداشت</button>' +
              '</div>' +
              '<div id="lunar-notes-list-' + idx + '">' + notesHtml + '</div>' +
              '<button id="lunar-ai-btn-' + idx + '" class="lunar-ai-btn" onclick="window.askLunarAI(event, ' + idx + ')">🧙‍♂️ مشورت با پیرمرد درباره بهترین روز این تصمیم</button>' +
              '<div id="lunar-ai-out-' + idx + '" class="lunar-ai-box"></div>' +
            '</div>' +
          '</div>';
      });
    }

    mount.innerHTML =
      '<div id="lunarTrackerSection" class="lunar-pro-card">' +
        '<div class="c-head">' +
          '<span class="c-title">🌕 قطب‌نمای ۲۸ روزه و زمان‌سنج تصمیم رفلکتور</span>' +
          '<span style="font-size:0.68rem;color:#fde68a">⏱️ هوشمند</span>' +
        '</div>' +
        '<div class="lunar-add-box">' +
          '<div style="font-size:0.74rem;color:#cbd5e1">یک تصمیم مهم ثبت کن تا بهترین روز و ساعت اتخاذ تصمیم محاسبه شود:</div>' +
          '<div class="lunar-form-row">' +
            '<input type="text" id="proDecisionTitleInp" class="lunar-inp" placeholder="مثلاً: سرمایه‌گذاری، قرارداد، سفر..." />' +
            '<select id="proDecisionCatSel" class="lunar-cat-sel">' +
              '<option value="wealth">💰 مالی</option>' +
              '<option value="action">⚡ اقدام</option>' +
              '<option value="love">❤️ روابط</option>' +
              '<option value="total">👁️ کلی</option>' +
            '</select>' +
            '<button class="lunar-add-btn" onclick="window.addProLunarDecision()">+ ثبت</button>' +
          '</div>' +
        '</div>' +
        '<div id="proLunarDecisionsList">' + cardsHtml + '</div>' +
      '</div>';
  }

  return { render, scanDecisionWindows };
})();
