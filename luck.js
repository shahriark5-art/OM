// =========================================================================
// MODULE: COLLAPSIBLE GALACTIC LUCK GAUGE & 5 PRO INSIGHTS (luck.js)
// =========================================================================
window.GalacticLuckModule = (function() {
  let isExpanded = false;
  let lastSnapshot = null;

  (function injectLuckStyles() {
    const oldSt = document.getElementById("galactic-luck-pro-styles");
    if (oldSt) oldSt.remove();

    const st = document.createElement("style");
    st.id = "galactic-luck-pro-styles";
    st.textContent = `
      .luck-card.collapsed-pro {
        padding: 11px 13px;
        cursor: pointer;
        transition: border-color 0.25s ease, box-shadow 0.25s ease;
      }
      .luck-card.collapsed-pro:hover {
        border-color: rgba(245, 197, 107, 0.55);
      }
      .luck-compact-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-top: 8px;
      }
      .luck-compact-score {
        font-size: 1.45rem;
        font-weight: 900;
        line-height: 1;
        white-space: nowrap;
      }
      .luck-compact-mid {
        flex: 1;
        min-width: 0;
      }
      .luck-compact-status {
        font-size: 0.78rem;
        font-weight: 800;
        color: #f8fafc;
        line-height: 1.45;
      }
      .luck-compact-sub {
        font-size: 0.69rem;
        color: #94a3b8;
        margin-top: 3px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .luck-toggle-chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 6px 11px;
        border-radius: 99px;
        background: rgba(245, 197, 107, 0.16);
        border: 1px solid rgba(245, 197, 107, 0.45);
        color: #fef08a;
        font-size: 0.7rem;
        font-weight: 800;
        white-space: nowrap;
        cursor: pointer;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
      }
      .luck-toggle-chip.is-open-btn {
        background: rgba(56, 189, 248, 0.14);
        border-color: rgba(56, 189, 248, 0.45);
        color: #bae6fd;
      }
      .luck-expanded-body.is-hidden {
        display: none !important;
      }
      .luck-insights-panel {
        margin-top: 11px;
        padding: 10px 11px;
        border-radius: 13px;
        background: rgba(4, 7, 16, 0.72);
        border: 1px solid rgba(255, 255, 255, 0.09);
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-size: 0.74rem;
        line-height: 1.65;
        color: #e2e8f0;
      }
      .luck-insight-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
      }
      .luck-insight-tag {
        font-size: 0.67rem;
        font-weight: 800;
        color: #7dd3fc;
        background: rgba(56, 189, 248, 0.1);
        border: 1px solid rgba(56, 189, 248, 0.28);
        border-radius: 8px;
        padding: 2px 7px;
        white-space: nowrap;
      }
      .luck-pulse-check-box {
        margin-top: 10px;
        padding: 9px 10px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }
      .luck-pulse-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 6px;
        margin-top: 7px;
      }
      .luck-pulse-btn {
        padding: 6px 4px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(15, 23, 42, 0.85);
        color: #cbd5e1;
        font-family: inherit;
        font-size: 0.68rem;
        font-weight: 700;
        cursor: pointer;
        transition: 0.2s;
      }
      .luck-pulse-btn.picked-pos {
        border-color: #22c55e;
        background: rgba(34, 197, 94, 0.2);
        color: #bbf7d0;
      }
      .luck-pulse-btn.picked-mid {
        border-color: #f5c56b;
        background: rgba(245, 197, 107, 0.2);
        color: #fef08a;
      }
      .luck-pulse-btn.picked-neg {
        border-color: #ef4444;
        background: rgba(239, 68, 68, 0.2);
        color: #fecaca;
      }
    `;
    document.head.appendChild(st);
  })();

  function getActionRecommendation(score, mode) {
    const focusMap = {
      wealth: "مالی و مذاکره",
      love: "روابط و پیمان",
      action: "اقدام و حرکت",
      total: "شهود و هم‌زمانی"
    };
    const focusLbl = focusMap[mode] || "شهود و هم‌زمانی";

    if (score >= 80) {
      return "موج عالی برای اقدام در «" + focusLbl + "»، شروع مکالمات مهم یا برداشتن گام عملیِ سنجیده.";
    }
    if (score >= 62) {
      return "زمان مناسب برای پیشبرد کارهای «" + focusLbl + "» با ریتم آرام و هوشیارانه.";
    }
    if (score >= 42) {
      return "بهترین حالت برای کارهای روتین، مرتب‌سازی و مشاهده دقیق پیش از تعهد بزرگ.";
    }
    return "وقت خلوتِ رفلکتوری، استراحت و پرهیز از تصمیم عجولانه یا واکنش هیجانی است.";
  }

  function getGemHarmonyText(score, pls) {
    const moon = pls && pls[2] ? pls[2] : null;
    const gemMap = {
      wealth: "زبرجد یا عقیق سرخ (رکاب نقره)",
      love: "فیروزه یا عقیق سوسنی (رکاب نقره)",
      action: "توپاز یا عقیق مشکی (رکاب نقره)",
      total: "دُرّ نجف یا لاجورد (رکاب نقره)"
    };
    const mode = window.getStore ? window.getStore("luckMode", "total") : "total";
    const gemHint = gemMap[mode] || gemMap.total;

    if (score >= 70) {
      return "هم‌نوایی بالا با " + gemHint + " (دروازه ماه " + (moon ? moon.gate : "-") + ")";
    }
    if (score >= 45) {
      return "تعادل میانه‌رو با " + gemHint + "؛ تکیه بر آرامش درون";
    }
    return "پیشنهاد آرام‌بخش: " + gemHint + " برای حفظ مرکزیت در روزهای کم‌موج";
  }

  function findNextWaveShift(now, mode) {
    if (!window.calcPlanets || !window.calcGalacticLuck || !window.DB) {
      return { text: "در حال رصد موج بعدی..." };
    }
    const basePls = window.calcPlanets(now);
    const baseAct = [];
    window.DB.forEach(ch => {
      const tp = basePls.find(p => p.gate === ch.g2);
      if (tp) baseAct.push({ ch, p: tp });
    });
    const baseScore = window.calcGalacticLuck(basePls, baseAct, now)[mode];

    for (let step = 30; step <= 720; step += 30) {
      const fDt = new Date(now.getTime() + step * 60000);
      const fPls = window.calcPlanets(fDt);
      const fAct = [];
      window.DB.forEach(ch => {
        const tp = fPls.find(p => p.gate === ch.g2);
        if (tp) fAct.push({ ch, p: tp });
      });
      const fScore = window.calcGalacticLuck(fPls, fAct, fDt)[mode];
      const diff = fScore - baseScore;

      if (Math.abs(diff) >= 8 || step === 720) {
        const hrs = Math.floor(step / 60);
        const mins = step % 60;
        const timeStr = hrs > 0
          ? (hrs + " ساعت" + (mins > 0 ? " و " + mins + " دقیقه" : "") + " دیگر")
          : (mins + " دقیقه دیگر");
        const dirWord = diff >= 8 ? ("جهش صعودی به " + fScore + "٪") : (diff <= -8 ? ("افت موج به " + fScore + "٪") : ("تثبیت روی " + fScore + "٪"));
        return { text: timeStr + " ← " + dirWord };
      }
    }
    return { text: "ثبات نسبی در ساعات پیش رو" };
  }

  function getPulseKey(now, mode) {
    const dayKey = now.toISOString().slice(0, 10);
    return "luck_pulse_" + dayKey + "_" + mode;
  }

  function getSavedPulse(now, mode) {
    try {
      return localStorage.getItem(getPulseKey(now, mode)) || "";
    } catch (e) {
      return "";
    }
  }

  window.recordLuckAlignment = function(ev, mood) {
    if (ev) ev.stopPropagation();
    const now = lastSnapshot && lastSnapshot.now ? lastSnapshot.now : new Date();
    const mode = window.getStore ? window.getStore("luckMode", "total") : "total";
    try {
      localStorage.setItem(getPulseKey(now, mode), mood);
    } catch (e) {}
    syncUI();
  };

  function openLuckCard() {
    if (isExpanded) return;
    isExpanded = true;
    syncUI();
  }

  window.toggleLuckFromButton = function(ev) {
    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    isExpanded = !isExpanded;
    syncUI();
  };

  function bindCardClickBehavior(card, bodyWrap) {
    if (!card) return;
    card.removeEventListener("click", openLuckCard);
    if (!isExpanded) {
      card.addEventListener("click", openLuckCard);
    }
    if (bodyWrap && !bodyWrap.dataset.stopBound) {
      bodyWrap.dataset.stopBound = "1";
      bodyWrap.addEventListener("click", function(ev) {
        ev.stopPropagation();
      });
    }
  }

  function ensureExtrasMounted() {
    const card = document.getElementById("luckCardBox");
    if (!card) return;

    const headEl = card.querySelector(".luck-head");
    if (headEl && !document.getElementById("luckHeaderToggleBtn")) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.id = "luckHeaderToggleBtn";
      btn.className = "luck-toggle-chip";
      btn.textContent = "جزئیات ▾";
      btn.addEventListener("click", window.toggleLuckFromButton);
      headEl.appendChild(btn);
    }

    if (!document.getElementById("luckCompactSummary")) {
      const comp = document.createElement("div");
      comp.id = "luckCompactSummary";
      comp.className = "luck-compact-bar";
      comp.innerHTML =
        '<div id="luckCompactScore" class="luck-compact-score" style="color:#22c55e">--%</div>' +
        '<div class="luck-compact-mid">' +
          '<div id="luckCompactStatus" class="luck-compact-status">در حال محاسبه...</div>' +
          '<div id="luckCompactSub" class="luck-compact-sub">رادار هم‌زمانی و اوج روز</div>' +
        '</div>';
      if (headEl) headEl.insertAdjacentElement("afterend", comp);
    }

    let bodyWrap = document.getElementById("luckExpandedBody");
    if (!bodyWrap) {
      bodyWrap = document.createElement("div");
      bodyWrap.id = "luckExpandedBody";
      bodyWrap.className = "luck-expanded-body is-hidden";

      const childrenToMove = Array.from(card.children).filter(el =>
        el !== headEl && el.id !== "luckCompactSummary" && el.id !== "luckExpandedBody"
      );
      childrenToMove.forEach(el => bodyWrap.appendChild(el));
      card.appendChild(bodyWrap);
    }

    if (!document.getElementById("luckInsightsPanel")) {
      const panel = document.createElement("div");
      panel.id = "luckInsightsPanel";
      panel.className = "luck-insights-panel";
      panel.innerHTML =
        '<div class="luck-insight-row">' +
          '<span id="luckActionRecTxt">🎯 پیشنهاد اقدام: ...</span>' +
          '<span class="luck-insight-tag">اقدام لحظه</span>' +
        '</div>' +
        '<div class="luck-insight-row">' +
          '<span id="luckGemHarmonyTxt">💍 هم‌نوایی نگین: ...</span>' +
          '<span class="luck-insight-tag">نگین نقره</span>' +
        '</div>' +
        '<div class="luck-insight-row">' +
          '<span id="luckWaveShiftTxt">📡 موج بعدی: ...</span>' +
          '<span class="luck-insight-tag">رادار تغییر</span>' +
        '</div>';

      const waveBox = bodyWrap.querySelector(".wave-box");
      if (waveBox) {
        waveBox.insertAdjacentElement("afterend", panel);
      } else {
        bodyWrap.appendChild(panel);
      }
    }

    if (!document.getElementById("luckPulseCheckBox")) {
      const pulseBox = document.createElement("div");
      pulseBox.id = "luckPulseCheckBox";
      pulseBox.className = "luck-pulse-check-box";
      pulseBox.innerHTML =
        '<div style="display:flex;justify-content:space-between;align-items:center;font-size:0.71rem;font-weight:800;color:#fde68a">' +
          '<span>💓 حس درونی شما چقدر با این عدد شانس هم‌خوان است؟</span>' +
          '<span id="luckPulseSavedTag" style="color:#94a3b8;font-size:0.66rem">ثبت‌نشده</span>' +
        '</div>' +
        '<div class="luck-pulse-grid">' +
          '<button type="button" id="lpBtn-high" class="luck-pulse-btn" onclick="window.recordLuckAlignment(event, \'high\')">🟢 کاملاً هم‌سو</button>' +
          '<button type="button" id="lpBtn-mid" class="luck-pulse-btn" onclick="window.recordLuckAlignment(event, \'mid\')">🟡 تا حدی</button>' +
          '<button type="button" id="lpBtn-low" class="luck-pulse-btn" onclick="window.recordLuckAlignment(event, \'low\')">🔴 متفاوت از حسم</button>' +
        '</div>';

      const insightsPanel = document.getElementById("luckInsightsPanel");
      if (insightsPanel) {
        insightsPanel.insertAdjacentElement("afterend", pulseBox);
      } else {
        bodyWrap.appendChild(pulseBox);
      }
    }

    bindCardClickBehavior(card, bodyWrap);
  }

  function syncUI() {
    ensureExtrasMounted();
    const card = document.getElementById("luckCardBox");
    const bodyWrap = document.getElementById("luckExpandedBody");
    const compBar = document.getElementById("luckCompactSummary");
    const toggleBtn = document.getElementById("luckHeaderToggleBtn");
    if (!card || !bodyWrap) return;

    if (isExpanded) {
      card.classList.remove("collapsed-pro");
      bodyWrap.classList.remove("is-hidden");
      if (compBar) compBar.style.display = "none";
      if (toggleBtn) {
        toggleBtn.textContent = "بستن ▴";
        toggleBtn.classList.add("is-open-btn");
      }
    } else {
      card.classList.add("collapsed-pro");
      bodyWrap.classList.add("is-hidden");
      if (compBar) compBar.style.display = "flex";
      if (toggleBtn) {
        toggleBtn.textContent = "جزئیات ▾";
        toggleBtn.classList.remove("is-open-btn");
      }
    }

    bindCardClickBehavior(card, bodyWrap);

    const mode = window.getStore ? window.getStore("luckMode", "total") : "total";
    const now = lastSnapshot && lastSnapshot.now ? lastSnapshot.now : new Date();
    const pls = lastSnapshot && lastSnapshot.pls ? lastSnapshot.pls : (window.calcPlanets ? window.calcPlanets(now) : []);
    const act = lastSnapshot && lastSnapshot.act ? lastSnapshot.act : [];
    const lk = lastSnapshot && lastSnapshot.lk ? lastSnapshot.lk : (window.calcGalacticLuck ? window.calcGalacticLuck(pls, act, now) : { total: 50, wealth: 50, love: 50, action: 50 });

    const score = typeof lk[mode] === "number" ? lk[mode] : 50;
    const modeColors = { total: "#22c55e", wealth: "#f5c56b", love: "#f43f5e", action: "#38bdf8" };
    const color = modeColors[mode] || "#22c55e";

    const statEl = document.getElementById("luckStatTxt");
    const statusStr = statEl && statEl.textContent && statEl.textContent !== "در حال محاسبه..."
      ? statEl.textContent
      : (score >= 70 ? "✨ جریان موافق و فرصت‌ساز" : (score >= 42 ? "🟢 تعادل پایدار" : "⚠️ فاز احتیاط و سکوت"));

    const peakChip = document.getElementById("goldenHourChip");
    const peakTxt = peakChip ? peakChip.textContent : "";

    const compScoreEl = document.getElementById("luckCompactScore");
    const compStatusEl = document.getElementById("luckCompactStatus");
    const compSubEl = document.getElementById("luckCompactSub");

    if (compScoreEl) {
      compScoreEl.textContent = score + "%";
      compScoreEl.style.color = color;
    }
    if (compStatusEl) {
      compStatusEl.textContent = statusStr;
    }
    if (compSubEl) {
      compSubEl.textContent = peakTxt ? (peakTxt + " • لمس برای باز شدن") : "لمس برای مشاهده جزئیات و رادارها";
    }

    const recEl = document.getElementById("luckActionRecTxt");
    if (recEl) {
      recEl.textContent = "🎯 پیشنهاد اقدام: " + getActionRecommendation(score, mode);
    }

    const gemEl = document.getElementById("luckGemHarmonyTxt");
    if (gemEl) {
      gemEl.textContent = "💍 " + getGemHarmonyText(score, pls);
    }

    const shiftEl = document.getElementById("luckWaveShiftTxt");
    const waveShift = findNextWaveShift(now, mode);
    if (shiftEl) {
      shiftEl.textContent = "📡 موج بعدی: " + waveShift.text;
    }

    const savedMood = getSavedPulse(now, mode);
    const savedTag = document.getElementById("luckPulseSavedTag");
    const bHigh = document.getElementById("lpBtn-high");
    const bMid = document.getElementById("lpBtn-mid");
    const bLow = document.getElementById("lpBtn-low");

    if (bHigh) bHigh.className = "luck-pulse-btn" + (savedMood === "high" ? " picked-pos" : "");
    if (bMid) bMid.className = "luck-pulse-btn" + (savedMood === "mid" ? " picked-mid" : "");
    if (bLow) bLow.className = "luck-pulse-btn" + (savedMood === "low" ? " picked-neg" : "");

    if (savedTag) {
      savedTag.textContent = savedMood === "high" ? "ثبت شد: کاملاً هم‌سو ✓"
        : (savedMood === "mid" ? "ثبت شد: تا حدی ✓"
        : (savedMood === "low" ? "ثبت شد: متفاوت ✓" : "ثبت‌نشده"));
    }
  }

  function update(now, pls, act, lk) {
    lastSnapshot = { now, pls, act, lk };
    syncUI();
  }

  setTimeout(syncUI, 150);
  window.addEventListener("DOMContentLoaded", () => setTimeout(syncUI, 200));

  return { update, sync: syncUI };
})();
