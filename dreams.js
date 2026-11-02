// =========================================================================
// MODULE 4: DREAM DIARY & GOOGLE DRIVE CLOUD ARCHIVE
// =========================================================================
window.DreamArchiveModule = (function() {
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz0IBSLcgFBc3TfWDlOzvWWigxMp7aAmNwQxVlmF4rV7rtfKqu2f4J9Ifd3gYcJDckv/exec";
  let lastInterpretation = "";
  let isBusy = false;

  async function interpret() {
    const titleInp = document.getElementById("dreamTitleInp").value.trim();
    const textInp = document.getElementById("dreamTextInp").value.trim();
    const outBox = document.getElementById("dreamInterpretationOutput");

    if (!textInp) {
      alert("لطفاً ابتدا شرح رویایی که دیده‌اید را بنویسید.");
      return;
    }

    outBox.style.display = "block";
    outBox.innerHTML = "🧙‍♂️ پیرمرد در حال مکاشفه و تعبیر این رویای ابری است...";

    const state = window.OLDMAN_STATE;
    const pls = state ? state.pls : window.calcPlanets(new Date());
    const act = state ? state.act : [];
    const mp = pls[2];
    const sp = pls[0];
    const apiKey = window.getStore("key", window.EMBEDDED_GEMINI_KEY);

    const prompt =
      "تو «پیرمرد» حکیم هستی. مخاطب تو شهریار است. " +
      "در زمان این خواب، ماه در دروازه " + mp.gate + " و خورشید در دروازه " + sp.gate + " بوده است. " +
      "خواب شهریار: «عنوان: " + (titleInp || "بدون عنوان") + " | شرح: " + textInp + "». " +
      "با لحنی حکیمانه، عارفانه و روان در ۴ جمله تعبیر این خواب را بگو.";

    let interpText = "رویای شما بازتابی از تصفیه درون است؛ به آرامش و شهود خود اعتماد کنید.";
    if (window.OldmanOracleModule && window.OldmanOracleModule.askInternalDirect) {
      const res = await window.OldmanOracleModule.askInternalDirect(apiKey, prompt);
      if (res && res.ok) interpText = res.text;
    }

    lastInterpretation = interpText;
    outBox.innerHTML = "<b>🧙‍♂️ تعبیر پیرمرد برای این رویا:</b><br/>" + lastInterpretation.replace(/\n/g, "<br/>");
  }

  async function saveToCloud() {
    const titleInp = document.getElementById("dreamTitleInp").value.trim() || "رویای بدون عنوان";
    const textInp = document.getElementById("dreamTextInp").value.trim();
    const saveBtn = document.getElementById("dreamSaveBtn");

    if (!textInp) {
      alert("متن خواب خالی است.");
      return;
    }

    if (isBusy) return;
    isBusy = true;
    saveBtn.disabled = true;
    saveBtn.textContent = "☁️ در حال ارسال به گوگل درایو...";

    const now = new Date();
    const dateStr = now.toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
    const dateSlug = now.toISOString().slice(0, 10);

    const state = window.OLDMAN_STATE;
    const pls = state ? state.pls : window.calcPlanets(now);
    const skyInfo = "ماه در پورت " + pls[2].gate + "." + pls[2].line;

    const payload = {
      action: "save",
      title: titleInp,
      dateStr: dateStr,
      dateSlug: dateSlug,
      skyInfo: skyInfo,
      dreamText: textInp,
      interpretation: lastInterpretation || "ثبت نشده"
    };

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });

      alert("✅ خواب شما با موفقیت در گوگل درایو بایگانی شد!");
      document.getElementById("dreamTitleInp").value = "";
      document.getElementById("dreamTextInp").value = "";
      document.getElementById("dreamInterpretationOutput").style.display = "none";
      lastInterpretation = "";
    } catch (err) {
      alert("خطا در ذخیره‌سازی ابری. اتصال اینترنت را بررسی کنید.");
    } finally {
      isBusy = false;
      saveBtn.disabled = false;
      saveBtn.textContent = "☁️ بایگانی درایو";
    }
  }

  async function loadFromCloud() {
    const container = document.getElementById("dreamCloudListContainer");
    const listBox = document.getElementById("dreamCloudListBox");

    container.style.display = "block";
    listBox.innerHTML = "⏳ در حال دریافت لیست خواب‌ها از گوگل درایو...";

    let result = null;
    try {
      const resp = await fetch(APPS_SCRIPT_URL + "?t=" + Date.now(), { method: "GET", redirect: "follow" });
      if (resp.ok) result = await resp.json();
    } catch (e) {}

    if (!result) {
      try {
        const proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(APPS_SCRIPT_URL + "?t=" + Date.now());
        const resp2 = await fetch(proxyUrl);
        if (resp2.ok) result = await resp2.json();
      } catch (e2) {}
    }

    if (result && result.ok && Array.isArray(result.dreams)) {
      if (result.dreams.length === 0) {
        listBox.innerHTML = '<div style="color:#94a3b8;text-align:center;padding:10px">هنوز هیچ خوابی ثبت نشده است.</div>';
        return;
      }
      listBox.innerHTML = "";
      result.dreams.forEach((d, idx) => {
        const fullDream = (d.dreamText || "").replace(/\n/g, "<br/>");
        const fullInterp = d.interpretation ? d.interpretation.replace(/\n/g, "<br/>") : "";

        listBox.innerHTML +=
          '<div class="dream-item-card" onclick="const el=document.getElementById(\'drm-full-' + idx + '\'); el.style.display=(el.style.display===\'none\'?\'block\':\'none\');" style="cursor:pointer">' +
            '<div style="display:flex;justify-content:space-between;color:#f5c56b;font-weight:700;margin-bottom:4px">' +
              '<span>📄 ' + (d.title || "بدون عنوان") + '</span>' +
              '<span style="font-size:0.68rem;color:#94a3b8">' + (d.dateStr || "") + '</span>' +
            '</div>' +
            '<div style="color:#cbd5e1;font-size:0.78rem;line-height:1.6">💤 ' + (d.dreamText || "").substring(0, 95) + '...</div>' +
            '<div id="drm-full-' + idx + '" style="display:none;margin-top:8px;padding-top:8px;border-top:1px dashed rgba(255,255,255,0.12);font-size:0.78rem">' +
              '<div style="color:#f1f5f9;margin-bottom:6px"><b>متن کامل:</b><br/>' + fullDream + '</div>' +
              (fullInterp ? '<div style="color:#7dd3fc;background:rgba(56,189,248,0.08);padding:7px;border-radius:8px"><b>🧙‍♂️ تعبیر:</b><br/>' + fullInterp + '</div>' : '') +
            '</div>' +
          '</div>';
      });
    } else {
      listBox.innerHTML = '<div style="color:#fca5a5;padding:8px">خطا در خواندن اطلاعات از درایو.</div>';
    }
  }

  return { interpret, saveToCloud, loadFromCloud };
})();
