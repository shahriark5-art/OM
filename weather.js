// =========================================================================
// MODULE 3: WEATHER RADAR & GRAND FORTUNE TELLER
// =========================================================================
window.WeatherFortuneModule = (function() {
  let deepCnt = 0;
  let isBusy = false;
  let conversationHistory = [];
  let cachedFastModel = "";
  let cachedDeepModel = "";

  const STAGE_TITLES = [
    "🌤️ کلیک ۱: پیش‌بینی آب‌وهوای حسی ۳ تا ۶ ساعت آینده",
    "🌙 کلیک ۲: پیش‌بینی حال و هوای امشب، روابط و کیفیت خواب",
    "☀️ کلیک ۳: پیش‌بینی آب‌وهوای روحی فردا (از صبح تا شب)",
    "🧭 کلیک ۴: قطب‌نمای پول، معامله و تصمیم‌گیری در ۷۲ ساعت آینده",
    "🔮 کلیک ۵ (فالگیر اعظم): پیشگویی نشانه‌ها، پیام‌ها و دیدارهای غیرمنتظره",
    "🔮 کلیک ۶ (فالگیر اعظم): کشف نیات پنهان اطرافیان و گره‌گشایی از کارها",
    "🔮 کلیک ۷ (فالگیر اعظم): طالع کبیر، بخت و چرخش سرنوشت در ماه پیش رو"
  ];

  function updateButtonUI() {
    const btnEl = document.getElementById("deepExploreBtn");
    const btnTxt = document.getElementById("aiBtnTxt");
    const ind = document.getElementById("depthLevelIndicator");
    if (!btnEl) return;

    const nextIdx = Math.min(deepCnt, STAGE_TITLES.length - 1);
    btnTxt.textContent = STAGE_TITLES[nextIdx];

    if (deepCnt >= 4) btnEl.classList.add("fortune-mode");
    else btnEl.classList.remove("fortune-mode");

    if (deepCnt === 0) ind.textContent = "گام فعلی: وضعیت پایه";
    else if (deepCnt <= 4) ind.textContent = "رادار هواشناسی: گام " + deepCnt + " از ۴";
    else ind.textContent = "🔮 فالگیر اعظم: مکاشفه " + (deepCnt - 4) + " از ۳";
  }

  function buildTimeline(now, pls) {
    const mp = pls[2];
    const shift1Date = new Date(now.getTime() + mp.h * 3600000);
    const shift1Clock = shift1Date.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });

    return {
      nowClock: now.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }),
      shift1Clock: shift1Clock,
      currentFeeling: window.GATE_FEELINGS[mp.gate] || "شفافیت ذهنی و آرامش",
      nextFeelingAfterShift: "نیاز به استراحت و خلوت",
      tonightFeeling: "آرامش شبانه و مرور روز",
      tmrMorningFeeling: "انرژی تازه برای شروع کارها",
      tmrNightFeeling: "حس رضایت و صمیمیت",
      day2Feeling: "تیزبینی در مسائل مالی",
      day3Feeling: "گشایش در یک موضوع فکری",
      venusFeeling: "گرمای عاطفی",
      jupiterFeeling: "گشایش و برکت",
      mercuryFeeling: "پیام یا گفتگوی مهم"
    };
  }

  async function callWeatherOrFortuneAI(apiKey, promptText, isDeepPro) {
    const prov = window.getStore("prov", "gemini");

    if (prov === "gemini" && apiKey && apiKey.length > 8) {
      const candidateModels = ["gemini-flash-latest", "gemini-2.0-flash", "gemini-2.5-flash"];
      for (let i = 0; i < candidateModels.length; i++) {
        const modelName = candidateModels[i];
        try {
          const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + modelName + ":generateContent?key=" + encodeURIComponent(apiKey), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptText }] }],
              generationConfig: { temperature: isDeepPro ? 0.92 : 0.82 }
            })
          });
          const data = await res.json();
          if (res.ok && data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
            return { ok: true, text: data.candidates[0].content.parts[0].text.trim(), source: modelName };
          }
        } catch (err) {}
      }
    }

    try {
      const controller = new AbortController();
      const tId = setTimeout(() => controller.abort(), 8500);
      const url = "https://text.pollinations.ai/" + encodeURIComponent(promptText) + "?model=openai&seed=" + Date.now();
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(tId);
      if (res.ok) {
        const t = await res.text();
        if (t && t.trim().length > 15 && !t.includes("<html")) {
          return { ok: true, text: t.trim(), source: "خرد ابری" };
        }
      }
    } catch (e) {}

    return { ok: false };
  }

  function buildFallback(stage, tl) {
    if (stage === 1) return "🌤️ از همین لحظه (" + tl.nowClock + ") تا ساعت " + tl.shift1Clock + "، هوای درونی تو تحت تاثیر «" + tl.currentFeeling + "» است. کارهای مهم را مدیریت کن.";
    if (stage === 2) return "🌙 امشب فضای روحی به سمت آرامش می‌رود و کیفیت خوابت عمیق‌تر خواهد بود.";
    if (stage === 3) return "☀️ پیش‌بینی فردا: صبح پرانرژی و غروب آرامش‌بخشی در پیش داری.";
    if (stage === 4) return "🧭 قطب‌نمای ۷۲ ساعت آینده: زمان مناسب برای تصمیم‌های حساب‌شده و مالی.";
    return "🔮 [مکاشفه فالگیر]: در افق پیش رو، پیامی راهگشا و گشایشی دلنشین در انتظار توست.";
  }

  async function exploreNext() {
    if (isBusy) return;
    const btnEl = document.getElementById("deepExploreBtn");
    const btnTxt = document.getElementById("aiBtnTxt");
    const cont = document.getElementById("fcDeep");
    const scBox = document.getElementById("scrollBox");
    const srcTag = document.getElementById("srcTag");

    isBusy = true;
    btnEl.disabled = true;

    deepCnt++;
    const currentStage = deepCnt;
    const isFortuneMode = currentStage >= 5;
    const stageHeaderTitle = STAGE_TITLES[Math.min(currentStage - 1, STAGE_TITLES.length - 1)];
    const tm = new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });

    btnTxt.textContent = isFortuneMode ? "🔮 مکاشفه فالگیر..." : "🌤️ در حال پردازش رادار...";

    const state = window.OLDMAN_STATE;
    const apiKey = window.getStore("key", window.EMBEDDED_GEMINI_KEY);
    const tl = buildTimeline(state.now, state.pls);

    const promptText = "تو مشاور هوشمند شهریار هستی. بدون استفاده از اصطلاحات فنی پیچیده، در ۴ جمله پیش‌بینی خود را درباره " + stageHeaderTitle + " به زبان فارسی روان بنویس.";

    const aiRes = await callWeatherOrFortuneAI(apiKey, promptText, isFortuneMode);
    const finalTxt = aiRes.ok ? aiRes.text : buildFallback(currentStage, tl);

    if (aiRes.ok) srcTag.textContent = aiRes.source + " ✅";
    else srcTag.textContent = "رادار داخلی فعال";

    const div = document.createElement("div");
    div.className = "deep-item " + (isFortuneMode ? "fortune-live" : "weather-live");
    div.innerHTML = '<div class="deep-head"><span>' + stageHeaderTitle + '</span><span>' + tm + '</span></div><div>' + finalTxt.replace(/\n/g, "<br/>") + '</div>';

    cont.appendChild(div);
    updateButtonUI();
    btnEl.disabled = false;
    isBusy = false;
    setTimeout(() => { scBox.scrollTop = scBox.scrollHeight; }, 80);
  }

  function reset() {
    document.getElementById("fcDeep").innerHTML = "";
    deepCnt = 0;
    conversationHistory = [];
    updateButtonUI();
  }

  return { exploreNext, reset };
})();
