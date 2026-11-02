// =========================================================================
// MODULE 2: SEALED OLDMAN ORACLE MODULE (ماژول پلمب‌شده خلوتگاه پیرمرد)
// =========================================================================
window.OldmanOracleModule = (function() {
  let cachedOracleModel = "";
  let oracleMemory = [];
  let isBusy = false;

  async function callOldmanDedicatedAI(apiKey, promptText) {
    const prov = window.getStore("prov", "gemini");

    if (prov === "gemini" && apiKey && apiKey.length > 8) {
      const candidateModels = [];
      if (cachedOracleModel) candidateModels.push(cachedOracleModel);

      try {
        const listRes = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=" + encodeURIComponent(apiKey));
        if (listRes.ok) {
          const listData = await listRes.json();
          if (listData && Array.isArray(listData.models)) {
            const validModels = listData.models
              .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent"))
              .map(m => m.name.replace("models/", ""))
              .filter(name => name.includes("gemini") && !name.includes("vision") && !name.includes("embedding") && !name.includes("imagen") && !name.includes("tts"));

            validModels.sort((a, b) => {
              const score = n => (n.includes("flash-latest") ? 10 : (n.includes("2.5-flash") ? 9 : (n.includes("2.0-flash") ? 8 : (n.includes("flash") ? 7 : 4))));
              return score(b) - score(a);
            });

            validModels.forEach(m => { if (!candidateModels.includes(m)) candidateModels.push(m); });
          }
        }
      } catch (e) {}

      ["gemini-flash-latest", "gemini-2.0-flash", "gemini-1.5-flash-latest", "gemini-pro-latest", "gemini-2.5-flash"].forEach(m => {
        if (!candidateModels.includes(m)) candidateModels.push(m);
      });

      for (let i = 0; i < candidateModels.length; i++) {
        const modelName = candidateModels[i];
        try {
          const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + modelName + ":generateContent?key=" + encodeURIComponent(apiKey), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptText }] }],
              generationConfig: { temperature: 0.85 }
            })
          });
          const data = await res.json();
          if (res.ok && data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
            cachedOracleModel = modelName;
            return { ok: true, text: data.candidates[0].content.parts[0].text.trim(), source: "Gemini (" + modelName + ")" };
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
          return { ok: true, text: t.trim(), source: "خرد ابری زنده" };
        }
      }
    } catch (e) {}

    try {
      const controller2 = new AbortController();
      const tId2 = setTimeout(() => controller2.abort(), 8500);
      const res2 = await fetch("https://text.pollinations.ai/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "openai", messages: [{ role: "user", content: promptText }], seed: Date.now() }),
        signal: controller2.signal
      });
      clearTimeout(tId2);
      if (res2.ok) {
        const d2 = await res2.json();
        const txt2 = d2 && d2.choices && d2.choices[0] && d2.choices[0].message ? d2.choices[0].message.content : "";
        if (txt2 && txt2.trim().length > 15) {
          return { ok: true, text: txt2.trim(), source: "خرد ابری" };
        }
      }
    } catch (e) {}

    return { ok: false };
  }

  function typeWriter(element, fullText) {
    const words = fullText.split(" ");
    element.innerHTML = "";
    let idx = 0;
    const timer = setInterval(() => {
      if (idx < words.length) {
        element.innerHTML += (idx === 0 ? "" : " ") + words[idx].replace(/\n/g, "<br/>");
        idx++;
      } else {
        clearInterval(timer);
      }
    }, 38);
  }

  async function askInternalDirect(apiKey, promptText) {
    const res = await callOldmanDedicatedAI(apiKey, promptText);
    return res;
  }

  async function ask() {
    if (isBusy) return;
    const qInp = document.getElementById("oracleQuestionInput");
    const askBtn = document.getElementById("oracleAskBtn");
    const btnTxt = document.getElementById("oracleBtnTxt");
    const listBox = document.getElementById("oracleAnswersList");
    const statusTag = document.getElementById("oracleStatusTag");
    const sanctuaryCard = document.getElementById("oldmanOracleSection");

    const question = qInp.value.trim();
    if (!question) {
      alert("شهریار عزیز، ابتدا پرسش یا زمزمه دلت را بنویس...");
      return;
    }

    isBusy = true;
    askBtn.disabled = true;
    sanctuaryCard.classList.add("thinking");
    btnTxt.textContent = "🌌 پیرمرد در حال سکوت و شهود در بیکران کائنات...";
    statusTag.textContent = "در حال دریافت الهام...";

    const state = window.OLDMAN_STATE;
    const pls = state.pls;
    const act = state.act;
    const mp = pls[2];
    const sp = pls[0];
    const apiKey = window.getStore("key", window.EMBEDDED_GEMINI_KEY);

    const subtleMoods = act.length > 0 ? act.map(x => x.ch.mood).join(" و ") : "شفافیت آینه بی‌غبار و سکوت تماشاگر";
    const sunEssence = window.GATE_THEMES[sp.gate] || "روشنایی آگاهی";
    const moonEssence = window.GATE_THEMES[mp.gate] || "آرامش روح";
    const asksAboutChartExplicitly = /کانال|دروازه|پورت|چارت|درصد|آمپر|رفلکتور|هیومن/.test(question);

    const recentDialog = oracleMemory.length > 0 ? ("سابقه گفتگوی اخیر:\n" + oracleMemory.slice(-2).join("\n") + "\n\n") : "";

    const fullOraclePrompt =
      "تو «پیرمرد» هستی؛ یک حکیم کهنسال، عارف، رند، روشن‌بین و بسیار ژرف‌اندیش که در گوشه‌ای آرام از بیکران کائنات نشسته است و با «شهریار» هم‌کلام می‌شود. " +
      "در این لحظه، نسیم پنهان کائنات دارای این حال و هواست: [" + subtleMoods + "، با رایحه «" + sunEssence + "» و «" + moonEssence + "»]. " +
      "\nقوانین بسیار مهم و قطعی در پاسخ‌گویی تو:\n" +
      (asksAboutChartExplicitly
        ? "از آنجا که شهریار مستقیماً درباره چارت یا کانال‌ها پرسیده، می‌توانی با لحنی حکیمانه به آن اشاره کنی.\n"
        : "۱. قانون حکمت پنهان (ممنوعیت مطلق اعداد و اصطلاحات فنی): هرگز و تحت هیچ شرایطی در پاسخ خود از کلمات «دروازه»، «پورت»، «کانال»، «چارت»، «درصد»، «آمپر شانس»، «پروفایل» یا شماره‌ها استفاده نکن! دلیل و فرمول استدلالت را گزارش نده؛ بلکه این حال و هوا را در عمق، لحن و زاویه دید پاسخت جاری کن.\n") +
      "۲. اگر پرسش شهریار فلسفی، الهیاتی یا معنوی است، مستقیماً به خودِ حقیقت بپرداز و پاسخی عمیق و عرفانی بده. اگر درباره تصمیم یا دغدغه زندگی است، مثل یک مرشد راهگشا راه را نشان بده.\n" +
      "۳. پاسخ را در ۴ تا ۵ جمله پرمغز، گرم و تاثیرگذار به زبان فارسی بنویس.\n\n" +
      recentDialog +
      "پرسش کنونی شهریار از تو: «" + question + "»";

    const aiRes = await callOldmanDedicatedAI(apiKey, fullOraclePrompt);

    sanctuaryCard.classList.remove("thinking");
    btnTxt.textContent = "✨ پرسش از پیرمرد کائنات";
    askBtn.disabled = false;
    isBusy = false;

    const tm = new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
    const msgDiv = document.createElement("div");
    msgDiv.className = "oracle-msg";

    const qHeader = document.createElement("div");
    qHeader.className = "oracle-q";
    qHeader.innerHTML = '<span>❓ نجوای تو: «' + question + '»</span><span>' + tm + '</span>';

    const speechBody = document.createElement("div");
    speechBody.className = "oracle-speech";

    msgDiv.appendChild(qHeader);
    msgDiv.appendChild(speechBody);
    listBox.prepend(msgDiv);

    if (aiRes.ok) {
      statusTag.textContent = aiRes.source + " ✨";
      oracleMemory.push("شهریار: " + question + " | پیرمرد: " + aiRes.text);
      typeWriter(speechBody, "🧙‍♂️ " + aiRes.text);
      qInp.value = "";
    } else {
      statusTag.textContent = "نوسان اینترنت ⚠️";
      speechBody.innerHTML = "🧙‍♂️ شهریار جان، امواج اینترنت یا فیلترشکن گوشی در این لحظه نوسان دارد؛ اتصال اینترنتت را چک کن و دوباره بپرس تا صدایم شفاف به تو برسد.";
    }
  }

  function clear() {
    document.getElementById("oracleAnswersList").innerHTML = "";
    oracleMemory = [];
  }

  return { ask, clear, askInternalDirect };
})();
