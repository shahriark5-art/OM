// =========================================================================
// MODULE 3: WEATHER RADAR & GRAND FORTUNE TELLER (مجهز به جمینای و داده‌های زنده نجومی)
// =========================================================================
window.WeatherFortuneModule = (function() {
  let deepCnt = 0;
  let isBusy = false;
  let cachedWeatherModel = "";

  const STAGE_TITLES = [
    "🌤️ کلیک ۱: رادار ۳ تا ۶ ساعت آینده (موج حسی و ساعت تغییر فاز)",
    "🌙 کلیک ۲: اتمسفر امشب (کیفیت روابط، آرامش ذهن و فرکانس خواب)",
    "☀️ کلیک ۳: پیش‌بینی فردا (ریتم انرژی از طلوع تا غروب)",
    "🧭 کلیک ۴: قطب‌نمای ثروت و معامله (نبض مالی و تصمیم در ۷۲ ساعت آینده)",
    "🔮 کلیک ۵ (فالگیر اعظم): رصد نشانه‌ها، پیام‌های غیرمنتظره و هم‌زمانی‌ها",
    "🔮 کلیک ۶ (فالگیر اعظم): رمزگشایی از نیات پنهان اطرافیان و کلید گره‌گشایی",
    "🔮 کلیک ۷ (فالگیر اعظم): طالع کبیر، چرخش بخت و پیام سرنوشت در ماه پیش رو"
  ];

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

  function updateButtonUI() {
    const btnEl = document.getElementById("deepExploreBtn");
    const btnTxt = document.getElementById("aiBtnTxt");
    const ind = document.getElementById("depthLevelIndicator");
    if (!btnEl || !btnTxt) return;

    if (deepCnt >= STAGE_TITLES.length) {
      btnTxt.textContent = "🔄 پاک‌سازی رادار و شروع رصد جدید از گام اول";
      btnEl.classList.remove("fortune-mode");
      if (ind) ind.textContent = "تکمیل هر ۷ مرحله رصد و مکاشفه ✅";
      return;
    }

    btnTxt.textContent = STAGE_TITLES[deepCnt];

    if (deepCnt >= 4) btnEl.classList.add("fortune-mode");
    else btnEl.classList.remove("fortune-mode");

    if (ind) {
      if (deepCnt === 0) ind.textContent = "گام فعلی: وضعیت پایه";
      else if (deepCnt <= 4) ind.textContent = "رادار هواشناسی: گام " + deepCnt + " از ۴";
      else ind.textContent = "🔮 فالگیر اعظم: مکاشفه " + (deepCnt - 4) + " از ۳";
    }
  }

  function buildAstroSnapshot(now, pls, act, lk) {
    const sun = pls[0];
    const moon = pls[2];
    const merc = pls[5];
    const ven = pls[6];
    const mars = pls[7];
    const jup = pls[8];

    const shiftDate = new Date(now.getTime() + moon.h * 3600000);
    const shiftClock = shiftDate.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });

    const future6hPls = window.calcPlanets ? window.calcPlanets(new Date(now.getTime() + 6 * 3600000)) : pls;
    const futureTonightPls = window.calcPlanets ? window.calcPlanets(new Date(now.getTime() + 10 * 3600000)) : pls;
    const futureTmrPls = window.calcPlanets ? window.calcPlanets(new Date(now.getTime() + 24 * 3600000)) : pls;

    const fMoon6h = future6hPls[2];
    const fMoonTonight = futureTonightPls[2];
    const fMoonTmr = futureTmrPls[2];

    return {
      nowClock: now.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }),
      shiftClock: shiftClock,
      moonHoursLeft: window.fmtH ? window.fmtH(moon.h) : "چند ساعت دیگر",
      currentFeel: (window.GATE_FEELINGS && window.GATE_FEELINGS[moon.gate]) || "شفافیت ذهنی و آرامش",
      currentTheme: (window.GATE_THEMES && window.GATE_THEMES[moon.gate]) || "حضور در اکنون",
      sunTheme: (window.GATE_THEMES && window.GATE_THEMES[sun.gate]) || "روشنایی آگاهی",
      feel6h: (window.GATE_FEELINGS && window.GATE_FEELINGS[fMoon6h.gate]) || "تغییر تدریجی ریتم درونی",
      feelTonight: (window.GATE_FEELINGS && window.GATE_FEELINGS[fMoonTonight.gate]) || "آرامش شبانه و ته‌نشین شدن افکار",
      feelTmr: (window.GATE_FEELINGS && window.GATE_FEELINGS[fMoonTmr.gate]) || "موج تازه انرژی و دیدگاه نو",
      mercTheme: (window.GATE_THEMES && window.GATE_THEMES[merc.gate]) || "گفتگوی شفاف",
      venTheme: (window.GATE_THEMES && window.GATE_THEMES[ven.gate]) || "همدلی و لطافت",
      marsTheme: (window.GATE_THEMES && window.GATE_THEMES[mars.gate]) || "قدرت اقدام",
      jupTheme: (window.GATE_THEMES && window.GATE_THEMES[jup.gate]) || "گشایش و برکت",
      activeMoods: act && act.length > 0 ? act.map(x => x.ch.mood).join(" و ") : "سکوت و شفافیت آینه‌ای",
      luckSummary: lk ? ("شانس کل: " + lk.total + "%، مالی: " + lk.wealth + "%، روابط: " + lk.love + "%، اقدام: " + lk.action + "%") : ""
    };
  }

  function buildStagePrompt(stage, snap) {
    const baseRules =
      "قانون قطعی: مخاطب تو «شهریار» است. هرگز از کلمات فنی مثل «دروازه»، «پورت»، «کانال»، «چارت» یا شماره دروازه‌ها استفاده نکن؛ بلکه معنای آن‌ها را به شکل حس ملموس زندگی، روانشناسی لحظه و شهود کاربردی بیان کن. پاسخ را در ۴ تا ۵ جمله بسیار جذاب، دقیق و کاربردی بنویس و در انتها یک «💡 پیشنهاد کلیدی لحظه» در یک خط مجزا بده.\n\n";

    if (stage === 1) {
      return baseRules +
        "موضوع: پیش‌بینی رادار آب‌وهوای حسی برای ۳ تا ۶ ساعت آینده.\n" +
        "داده‌های زمان: الان ساعت " + snap.nowClock + " است و تا ساعت " + snap.shiftClock + " (" + snap.moonHoursLeft + ") موج فعلی ادامه دارد و سپس فاز انرژی عوض می‌شود.\n" +
        "حس فعلی فضا: «" + snap.currentFeel + "» همراه با «" + snap.activeMoods + "». و حس پس از تغییر ساعت " + snap.shiftClock + ": «" + snap.feel6h + "».\n" +
        "به شهریار دقیق بگو از الان تا ساعت " + snap.shiftClock + " حال و هوای درونی و محیط چطور است و بعد از آن ساعت چه تغییری در تمرکز و انرژی‌اش رخ می‌دهد.";
    }
    if (stage === 2) {
      return baseRules +
        "موضوع: پیش‌بینی حال و هوای امشب، کیفیت معاشرت‌ها و فرکانس خواب.\n" +
        "اتمسفر امشب: «" + snap.feelTonight + "» و رایحه عاطفی «" + snap.venTheme + "».\n" +
        "توضیح بده امشب برای چه نوع گفتگویی یا خلوتی مناسب است، ذهن در شب به چه سمتی می‌رود و چطور بهترین آرامش و کیفیت خواب را امشب تجربه کند.";
    }
    if (stage === 3) {
      return baseRules +
        "موضوع: پیش‌بینی آب‌وهوای روحی و کاری فردا (از صبح تا شب).\n" +
        "موج غالب فردا: «" + snap.feelTmr + "» در کنار انرژی خورشیدی «" + snap.sunTheme + "».\n" +
        "ریتم فردا را از صبح تا غروب ترسیم کن؛ بگو بهترین زمان فردا برای کارهای مهم چه موقع است و در چه ساعاتی باید از فشار آوردن به خود پرهیز کند.";
    }
    if (stage === 4) {
      return baseRules +
        "موضوع: قطب‌نمای پول، معامله، خرید و تصمیم‌گیری در ۷۲ ساعت آینده.\n" +
        "بستر اقتصادی و اجرایی فعلی: برکت و توسعه بر مدار «" + snap.jupTheme + "» و نیروی حرکت بر مدار «" + snap.marsTheme + "». (" + snap.luckSummary + ").\n" +
        "به شکل کاملاً کاربردی بگو در ۳ روز آینده برای مسائل مالی، مذاکره، خرید یا تصمیمات کاری چه استراتژی‌ای برنده است و کجا تله هیجانی وجود دارد.";
    }
    if (stage === 5) {
      return baseRules +
        "تو اکنون در نقش «فالگیر اعظم و رصدگر هم‌زمانی‌ها» هستی.\n" +
        "موضوع: پیشگویی نشانه‌ها، خبرها، پیام‌ها و دیدارهای غیرمنتظره در روزهای پیش رو.\n" +
        "فرکانس ارتباطی آسمان: «" + snap.mercTheme + "» و «" + snap.currentTheme + "».\n" +
        "با لحنی اسرارآمیز، روشن‌بین و دقیق بگو چه نوع پیام، تماس یا ملاقات غیرمنتظره‌ای در راه است و شهریار باید حواسش به چه نشانه یا هم‌زمانی خاصی در اطرافش باشد.";
    }
    if (stage === 6) {
      return baseRules +
        "تو اکنون در نقش «فالگیر اعظم و ذهن‌خوان میدان انرژی» هستی.\n" +
        "موضوع: کشف نیات پنهان اطرافیان و کلید باز شدن گره یک کار یا رابطه.\n" +
        "میدان عاطفی و ارادی: «" + snap.venTheme + "» و «" + snap.activeMoods + "».\n" +
        "پرده از حال و هوای ناگفته اطرافیان بردار؛ بگو در تعاملات فعلی چه حقیقتی پشت ظاهر افراد پنهان است و کلید اصلی باز شدن گره فعلی شهریار چیست.";
    }
    return baseRules +
      "تو اکنون در نقش «فالگیر اعظم» هستی و طالع کبیر را می‌خوانی.\n" +
      "موضوع: طالع کبیر، چرخش بخت و پیام سرنوشت برای ماه پیش رو.\n" +
      "محور کلان آسمان: «" + snap.sunTheme + "» در پیوند با «" + snap.jupTheme + "».\n" +
      "با لحنی حماسی، عمیق و الهام‌بخش، تصویر بزرگ چرخش بخت شهریار در ماه پیش رو را ترسیم کن و بگو کائنات او را به سمت کدام قله هدایت می‌کند.";
  }

  async function callWeatherOrFortuneAI(apiKey, promptText, isFortuneMode) {
    const prov = window.getStore ? window.getStore("prov", "gemini") : "gemini";

    // ۱. اتصال مستقیم به Google Gemini API (سازگار با کلیدهای AQ و AIza)
    if (prov === "gemini" && apiKey && apiKey.trim().length > 10) {
      const cleanKey = apiKey.trim();
      const candidateModels = [];
      if (cachedWeatherModel) candidateModels.push(cachedWeatherModel);

      if (!cachedWeatherModel) {
        try {
          const listUrl = "https://generativelanguage.googleapis.com/v1beta/models?key=" + encodeURIComponent(cleanKey);
          const listRes = await fetchWithTimeout(listUrl, {
            method: "GET",
            headers: { "x-goog-api-key": cleanKey }
          }, 5500);

          if (listRes.ok) {
            const listData = await listRes.json();
            if (listData && Array.isArray(listData.models)) {
              const valid = listData.models
                .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent"))
                .map(m => m.name.replace("models/", ""))
                .filter(n => n.includes("gemini") && !n.includes("vision") && !n.includes("embedding") && !n.includes("imagen") && !n.includes("tts") && !n.includes("audio"));

              valid.sort((a, b) => {
                const score = name => (name.includes("flash") ? 10 : (name.includes("pro") ? 5 : 1));
                return score(b) - score(a);
              });

              valid.forEach(m => { if (!candidateModels.includes(m)) candidateModels.push(m); });
            }
          }
        } catch (e) {}
      }

      ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.0-flash-001", "gemini-flash-latest", "gemini-2.5-pro"].forEach(m => {
        if (!candidateModels.includes(m)) candidateModels.push(m);
      });

      for (let i = 0; i < candidateModels.length; i++) {
        const modelName = candidateModels[i];
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
              generationConfig: { temperature: isFortuneMode ? 0.9 : 0.8 }
            })
          }, 9000);

          const data = await res.json();
          if (res.ok && data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
            cachedWeatherModel = modelName;
            return { ok: true, text: data.candidates[0].content.parts[0].text.trim(), source: "Gemini (" + modelName + ")" };
          }
        } catch (err) {
          break;
        }
      }
    }

    // ۲. موتور ابری پشتیبان در صورت عدم دسترسی به گوگل
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
        if (txt2 && txt2.trim().length > 15) {
          return { ok: true, text: txt2.trim(), source: "خرد ابری زنده" };
        }
      }
    } catch (e) {}

    return { ok: false };
  }

  function buildSmartLocalFallback(stage, snap) {
    if (stage === 1) return "🌤️ از الان (" + snap.nowClock + ") تا ساعت " + snap.shiftClock + "، فضای درونی تو با «" + snap.currentFeel + "» هم‌فرکانس است. پس از ساعت " + snap.shiftClock + "، موج حسی به سمت «" + snap.feel6h + "» تغییر می‌کند.\n💡 پیشنهاد کلیدی لحظه: کارهای اصلی را پیش از ساعت تغییر فاز انجام بده.";
    if (stage === 2) return "🌙 امشب فضای روحی به سمت «" + snap.feelTonight + "» حرکت می‌کند و رایحه «" + snap.venTheme + "» در روابط جاری است.\n💡 پیشنهاد کلیدی لحظه: یک ساعت پیش از خواب از اخبار و چالش‌ها فاصله بگیر تا خوابت عمیق و شفاف شود.";
    if (stage === 3) return "☀️ فردا با موج «" + snap.feelTmr + "» آغاز می‌شود و محور «" + snap.sunTheme + "» به کارهایت جهت می‌دهد.\n💡 پیشنهاد کلیدی لحظه: نیمه اول روز را به مهم‌ترین هدف اختصاص بده و غروب را در آرامش بگذران.";
    if (stage === 4) return "🧭 در ۷۲ ساعت آینده، شمّ اقتصادی بر مدار «" + snap.jupTheme + "» و نیروی اقدام بر مدار «" + snap.marsTheme + "» قرار دارد.\n💡 پیشنهاد کلیدی لحظه: از تصمیم مالی عجولانه پرهیز کن و روی توافق‌های شفاف تمرکز داشته باش.";
    if (stage === 5) return "🔮 در افق ارتباطی تو، فرکانس «" + snap.mercTheme + "» فعال شده که نشانه دریافت یک خبر، پیام یا گفتگوی راهگشا در روزهای نزدیک است.\n💡 پیشنهاد کلیدی لحظه: به مکالمات کوتاه و نشانه‌های به ظاهر تصادفی امروز دقت ویژه داشته باش.";
    if (stage === 6) return "🔮 در پسِ رفتار اطرافیان، نیاز به «" + snap.venTheme + "» دیده می‌شود. گره کار فعلی با زور بازو نه، بلکه با صبر و تغییر زاویه دید باز خواهد شد.\n💡 پیشنهاد کلیدی لحظه: در مذاکرات و روابط، شنونده آرام باش تا نیت واقعی طرف مقابل آشکار شود.";
    return "🔮 طالع ماه پیش رو بر محور «" + snap.sunTheme + "» و «" + snap.jupTheme + "» می‌چرخد؛ دوره‌ای که آگاهی‌های گذشته به ثمره عملی تبدیل می‌شوند.\n💡 پیشنهاد کلیدی لحظه: با آرامشِ یک شاهد خردمند، خودت را برای یک ارتقای مرحله آماده کن.";
  }

  async function exploreNext() {
    if (isBusy) return;

    if (deepCnt >= STAGE_TITLES.length) {
      reset();
      return;
    }

    const btnEl = document.getElementById("deepExploreBtn");
    const btnTxt = document.getElementById("aiBtnTxt");
    const cont = document.getElementById("fcDeep");
    const scBox = document.getElementById("scrollBox");
    const srcTag = document.getElementById("srcTag");

    isBusy = true;
    if (btnEl) btnEl.disabled = true;

    deepCnt++;
    const currentStage = deepCnt;
    const isFortuneMode = currentStage >= 5;
    const stageHeaderTitle = STAGE_TITLES[Math.min(currentStage - 1, STAGE_TITLES.length - 1)];
    const tm = new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });

    if (btnTxt) {
      btnTxt.textContent = isFortuneMode ? "🔮 فالگیر اعظم در حال مکاشفه..." : "🌤️ رادار جمینای در حال اسکن افق...";
    }

    const state = window.OLDMAN_STATE || {};
    const now = state.now || new Date();
    const pls = state.pls || (window.calcPlanets ? window.calcPlanets(now) : []);
    const act = state.act || [];
    const lk = state.lk || null;
    const apiKey = window.getStore ? window.getStore("key", "") : "";

    const snap = buildAstroSnapshot(now, pls, act, lk);
    const promptText = buildStagePrompt(currentStage, snap);

    const aiRes = await callWeatherOrFortuneAI(apiKey, promptText, isFortuneMode);
    const finalTxt = aiRes.ok ? aiRes.text : buildSmartLocalFallback(currentStage, snap);

    if (srcTag) {
      if (aiRes.ok) {
        srcTag.textContent = aiRes.source + " ✨";
        srcTag.style.color = "#4ade80";
      } else {
        srcTag.textContent = "رادار هوشمند داخلی ⚡";
        srcTag.style.color = "#f5c56b";
      }
    }

    const div = document.createElement("div");
    div.className = "deep-item " + (isFortuneMode ? "fortune-live" : "weather-live");
    div.innerHTML =
      '<div class="deep-head"><span>' + stageHeaderTitle + '</span><span>' + tm + '</span></div>' +
      '<div style="line-height:1.9">' + finalTxt.replace(/\n/g, "<br/>") + '</div>';

    if (cont) cont.appendChild(div);
    updateButtonUI();
    if (btnEl) btnEl.disabled = false;
    isBusy = false;
    if (scBox) {
      setTimeout(() => { scBox.scrollTop = scBox.scrollHeight; }, 90);
    }
  }

  function reset() {
    const cont = document.getElementById("fcDeep");
    if (cont) cont.innerHTML = "";
    deepCnt = 0;
    updateButtonUI();
  }

  return { exploreNext, reset };
})();
