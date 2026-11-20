// =========================================================================
// MODULE: PICOLOGY — PURE RANDOM NON-REPEATING IMAGE VIEWER (picology.js)
// =========================================================================
window.PicologyModule = (function() {
  const seenKeys = new Set();
  let currentUrl = "";
  let nextPreloadedUrl = "";
  let isTransitioning = false;
  let retryCount = 0;
  let isFallbackFullscreen = false;

  function injectPicologyStyles() {
    const oldSt = document.getElementById("picology-pure-styles");
    if (oldSt) oldSt.remove();

    const st = document.createElement("style");
    st.id = "picology-pure-styles";
    st.textContent = `
      .picology-wrap {
        position: relative;
        background: rgba(12, 18, 36, 0.92);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 20px;
        padding: 12px;
        margin-bottom: 15px;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.55);
        box-sizing: border-box;
      }
      .picology-header-row {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 8px;
        margin-bottom: 10px;
        width: 100%;
      }
      .picology-title {
        font-size: 0.84rem;
        font-weight: 900;
        color: #f5c56b;
      }
      .picology-fs-btn {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 34px;
        height: 34px;
        flex-shrink: 0;
        border-radius: 10px;
        border: 1px solid rgba(245, 197, 107, 0.45);
        background: rgba(255, 255, 255, 0.08);
        color: #fef08a;
        font-size: 0.95rem;
        line-height: 1;
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
        transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
      }
      .picology-fs-btn:active {
        transform: scale(0.94);
        background: rgba(245, 197, 107, 0.22);
        border-color: #f5c56b;
      }
      .picology-stage {
        position: relative;
        width: 100%;
        min-height: 240px;
        max-height: 420px;
        border-radius: 14px;
        overflow: hidden;
        background: rgba(4, 7, 16, 0.85);
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .picology-img {
        width: 100%;
        height: auto;
        max-height: 420px;
        object-fit: cover;
        display: block;
        opacity: 1;
        transition: opacity 0.35s ease, transform 0.35s ease;
      }
      .picology-img.fading {
        opacity: 0;
        transform: scale(0.985);
      }
      .picology-loader {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.78rem;
        color: #94a3b8;
        background: rgba(4, 7, 16, 0.65);
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.25s ease;
      }
      .picology-loader.show {
        opacity: 1;
      }

      /* حالت تمام‌صفحه */
      .picology-wrap.is-fullscreen,
      .picology-wrap:fullscreen,
      .picology-wrap:-webkit-full-screen {
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        max-width: none;
        margin: 0;
        border-radius: 0;
        border: none;
        z-index: 99999;
        background: #020617;
        display: flex;
        flex-direction: column;
        padding: 14px;
      }
      .picology-wrap.is-fullscreen .picology-stage,
      .picology-wrap:fullscreen .picology-stage,
      .picology-wrap:-webkit-full-screen .picology-stage {
        flex: 1;
        width: 100%;
        height: 100%;
        min-height: 0;
        max-height: none;
        border-radius: 12px;
        background: #000000;
      }
      .picology-wrap.is-fullscreen .picology-img,
      .picology-wrap:fullscreen .picology-img,
      .picology-wrap:-webkit-full-screen .picology-img {
        width: 100%;
        height: 100%;
        max-height: none;
        object-fit: contain;
      }
    `;
    document.head.appendChild(st);
  }

  function generateUniqueRandomUrl() {
    let seed = "";
    let attempts = 0;
    do {
      const rndA = Math.floor(Math.random() * 900000000) + 100000000;
      const rndB = Math.floor(Math.random() * 100000);
      seed = Date.now().toString(36) + "_" + rndA.toString(36) + "_" + rndB.toString(36);
      attempts++;
      if (seenKeys.size > 400) seenKeys.clear();
    } while (seenKeys.has(seed) && attempts < 20);

    seenKeys.add(seed);
    return "https://picsum.photos/900/700?random=" + encodeURIComponent(seed);
  }

  function preloadNextImage() {
    const candidate = generateUniqueRandomUrl();
    const preImg = new Image();
    preImg.onload = function() {
      nextPreloadedUrl = candidate;
    };
    preImg.onerror = function() {
      nextPreloadedUrl = "";
    };
    preImg.src = candidate;
  }

  function showImage(url) {
    const imgEl = document.getElementById("picologyImgEl");
    const loaderEl = document.getElementById("picologyLoaderEl");
    if (!imgEl) return;

    isTransitioning = true;
    imgEl.classList.add("fading");
    if (loaderEl) loaderEl.classList.add("show");

    const tempImg = new Image();
    tempImg.onload = function() {
      retryCount = 0;
      currentUrl = url;
      imgEl.src = url;
      requestAnimationFrame(() => {
        imgEl.classList.remove("fading");
        if (loaderEl) loaderEl.classList.remove("show");
        isTransitioning = false;
      });
      preloadNextImage();
    };
    tempImg.onerror = function() {
      retryCount++;
      if (retryCount <= 6) {
        showImage(generateUniqueRandomUrl());
      } else {
        retryCount = 0;
        if (loaderEl) loaderEl.classList.remove("show");
        imgEl.classList.remove("fading");
        isTransitioning = false;
      }
    };
    tempImg.src = url;
  }

  function isCurrentlyFullscreen() {
    const wrapEl = document.getElementById("picologyWrapBox");
    const nativeFsEl = document.fullscreenElement || document.webkitFullscreenElement;
    return Boolean((wrapEl && nativeFsEl === wrapEl) || isFallbackFullscreen);
  }

  function syncFullscreenIcon() {
    const btn = document.getElementById("picologyFsBtn");
    if (!btn) return;
    btn.textContent = isCurrentlyFullscreen() ? "↙️" : "⛶";
    btn.title = isCurrentlyFullscreen() ? "خروج از تمام‌صفحه" : "نمایش تمام‌صفحه";
  }

  window.togglePicologyFullscreen = function(ev) {
    if (ev) ev.stopPropagation();
    const wrapEl = document.getElementById("picologyWrapBox");
    if (!wrapEl) return;

    const nativeFsEl = document.fullscreenElement || document.webkitFullscreenElement;

    if (nativeFsEl) {
      const exitFn = document.exitFullscreen || document.webkitExitFullscreen;
      if (exitFn) {
        try {
          const p = exitFn.call(document);
          if (p && typeof p.catch === "function") p.catch(() => {});
        } catch (e) {}
      }
      isFallbackFullscreen = false;
      wrapEl.classList.remove("is-fullscreen");
      syncFullscreenIcon();
      return;
    }

    if (isFallbackFullscreen) {
      isFallbackFullscreen = false;
      wrapEl.classList.remove("is-fullscreen");
      syncFullscreenIcon();
      return;
    }

    const reqFn = wrapEl.requestFullscreen || wrapEl.webkitRequestFullscreen;
    if (reqFn) {
      try {
        const res = reqFn.call(wrapEl);
        if (res && typeof res.catch === "function") {
          res.catch(() => {
            isFallbackFullscreen = true;
            wrapEl.classList.add("is-fullscreen");
            syncFullscreenIcon();
          });
        }
        setTimeout(() => {
          if (!(document.fullscreenElement || document.webkitFullscreenElement)) {
            isFallbackFullscreen = true;
            wrapEl.classList.add("is-fullscreen");
            syncFullscreenIcon();
          }
        }, 120);
        return;
      } catch (e) {}
    }

    isFallbackFullscreen = true;
    wrapEl.classList.add("is-fullscreen");
    syncFullscreenIcon();
  };

  document.addEventListener("fullscreenchange", () => {
    const wrapEl = document.getElementById("picologyWrapBox");
    const nativeFsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if (!nativeFsEl && wrapEl) {
      isFallbackFullscreen = false;
      wrapEl.classList.remove("is-fullscreen");
    }
    syncFullscreenIcon();
  });

  document.addEventListener("webkitfullscreenchange", () => {
    const wrapEl = document.getElementById("picologyWrapBox");
    const nativeFsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if (!nativeFsEl && wrapEl) {
      isFallbackFullscreen = false;
      wrapEl.classList.remove("is-fullscreen");
    }
    syncFullscreenIcon();
  });

  window.nextPicologyPhoto = function() {
    if (isTransitioning) return;
    if (nextPreloadedUrl) {
      const readyUrl = nextPreloadedUrl;
      nextPreloadedUrl = "";
      showImage(readyUrl);
    } else {
      showImage(generateUniqueRandomUrl());
    }
  };

  function render() {
    injectPicologyStyles();
    const mount = document.getElementById("picologyMount");
    if (!mount) return;

    if (!document.getElementById("picologyStageBox")) {
      mount.innerHTML =
        '<div id="picologyWrapBox" class="picology-wrap">' +
          '<div class="picology-header-row">' +
            '<div class="picology-title">🖼️ پیکولوژی</div>' +
            '<button id="picologyFsBtn" type="button" class="picology-fs-btn" title="نمایش تمام‌صفحه" aria-label="نمایش تمام‌صفحه" onclick="window.togglePicologyFullscreen(event)">⛶</button>' +
          '</div>' +
          '<div id="picologyStageBox" class="picology-stage" onclick="window.nextPicologyPhoto()">' +
            '<img id="picologyImgEl" class="picology-img" alt="" />' +
            '<div id="picologyLoaderEl" class="picology-loader show">...</div>' +
          '</div>' +
        '</div>';
    }

    syncFullscreenIcon();

    if (!currentUrl) {
      showImage(generateUniqueRandomUrl());
    }
  }

  setTimeout(render, 200);
  window.addEventListener("DOMContentLoaded", () => setTimeout(render, 200));

  return { render, next: window.nextPicologyPhoto, toggleFullscreen: window.togglePicologyFullscreen };
})();
