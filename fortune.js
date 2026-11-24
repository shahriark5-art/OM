(function () {
  function mountWeatherFortune() {
    const mount = document.getElementById("weatherFortuneMount");
    if (!mount) return;

    mount.innerHTML = `
      <div class="card">
        <div class="c-head">
          <span class="c-title">🌤️🔮 رادار آب‌وهوا و فالگیر</span>
          <span id="srcTag" style="font-size:0.68rem;color:#4ade80">آماده ✅</span>
        </div>
        <div id="scrollBox" class="scroll-box">
          <div id="fcBase"></div>
          <div id="fcDeep"></div>
        </div>
        <div class="hint">
          <span id="depthLevelIndicator">گام پایه</span>
          <span>↕️ اسکرول</span>
        </div>
        <button id="deepExploreBtn" class="ai-btn" onclick="window.WeatherFortuneModule && window.WeatherFortuneModule.exploreNext()">
          <span id="aiBtnTxt">🌤️ کلیک ۱: پیش‌بینی ۳ تا ۶ ساعت آینده</span>
        </button>
      </div>
    `;
  }

  window.FortuneCardModule = {
    mount: mountWeatherFortune
  };

  mountWeatherFortune();
})();
