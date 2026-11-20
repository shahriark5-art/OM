// =========================================================================
// MODULE: PICOLOGY — PURE RANDOM NON-REPEATING IMAGE VIEWER (picology.js)
// =========================================================================
window.PicologyModule = (function() {
  const seenKeys = new Set();
  let currentUrl = "";
  let nextPreloadedUrl = "";
  let isTransitioning = false;
  let retryCount = 0;

  (function injectPicologyStyles() {
    if (document.getElementById("picology-pure-styles")) return;
    const st = document.createElement("style");
    st.id = "picology-pure-styles";
    st.textContent = `
      .picology-wrap {
        background: rgba(12, 18, 36, 0.92);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 20px;
        padding: 12px;
        margin-bottom: 15px;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.55);
        box-sizing: border-box;
      }
      .picology-title {
        font-size: 0.84rem;
        font-weight: 900;
        color: #f5c56b;
        margin-bottom: 10px;
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
    `;
    document.head.appendChild(st);
  })();

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
    const mount = document.getElementById("picologyMount");
    if (!mount) return;

    if (!document.getElementById("picologyStageBox")) {
      mount.innerHTML =
        '<div class="picology-wrap">' +
          '<div class="picology-title">🖼️ پیکولوژی</div>' +
          '<div id="picologyStageBox" class="picology-stage" onclick="window.nextPicologyPhoto()">' +
            '<img id="picologyImgEl" class="picology-img" alt="" />' +
            '<div id="picologyLoaderEl" class="picology-loader show">...</div>' +
          '</div>' +
        '</div>';
    }

    if (!currentUrl) {
      showImage(generateUniqueRandomUrl());
    }
  }

  return { render, next: window.nextPicologyPhoto };
})();
