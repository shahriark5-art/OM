(function () {
  function mountActiveChannels() {
    const mount = document.getElementById("activeChannelsMount");
    if (!mount) return;

    mount.innerHTML = `
      <div class="card">
        <div class="c-head">
          <span class="c-title">⚡ کانال‌های فعال</span>
          <span style="font-size:0.72rem;color:#38bdf8">● زنده</span>
        </div>
        <div id="chList"></div>
      </div>
    `;
  }

  window.ActiveChannelsModule = {
    mount: mountActiveChannels
  };

  mountActiveChannels();
})();
