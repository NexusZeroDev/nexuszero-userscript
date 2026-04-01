// ==UserScript==
// @name         Zerox Bypasser
// @namespace    http://tampermonkey.net/
// @version      14.0.3
// @description  Forked version of bypass.city userscript
// @author       Harley & Reinhard
// @icon         https://raw.githubusercontent.com/NexusZeroDev/nexuszero-userscript/main/revamped.png
// @updateURL    https://raw.githubusercontent.com/NexusZeroDev/nexuszero-userscript/main/zero.user.js
// @downloadURL  https://raw.githubusercontent.com/NexusZeroDev/nexuszero-userscript/main/zero.user.js
// @match        *://linkvertise.com/*
// @match        *://invalid.linkvertise.com/*
// @match        *://loot-link.com/*
// @match        *://loot-links.com/*
// @match        *://lootlink.org/*
// @match        *://lootlinks.co/*
// @match        *://lootdest.info/*
// @match        *://lootdest.org/*
// @match        *://lootdest.com/*
// @match        *://links-loot.com/*
// @match        *://linksloot.net/*
// @match        *://rekonise.com/*
// @match        *://*.rekonise.com/*
// @match        *://mboost.me/*
// @match        *://link.rbscripts.net/*
// @match        *://socialwolvez.com/*
// @match        *://sub2unlock.com/*
// @match        *://sub2unlock.net/*
// @match        *://sub2get.com/*
// @match        *://bypass.city/*
// @match        *://adbypass.org/*
// @match        *://*.adshnk.com/*
// @match        *://*.adshrink.it/*
// @match        *://*.shrink-service.it/*
// @match        *://adfoc.us/*
// @match        *://boost.ink/*
// @match        *://bst.gg/*
// @match        *://bst.wtf/*
// @match        *://booo.st/*
// @match        *://boost.fusedgt.com/*
// @match        *://thedragonslayer2.github.io/*
// @match        *://empebau.eu/*
// @match        *://www.google.com/*
// @match        *://is.gd/*
// @match        *://justpaste.it/redirect/*
// @match        *://leasurepartment.xyz/*
// @match        *://letsboost.net/*
// @match        *://loot-link.co/*
// @match        *://loot-link.org/*
// @match        *://loot-link.net/*
// @match        *://loot-link.info/*
// @match        *://loot-links.co/*
// @match        *://loot-links.org/*
// @match        *://loot-links.net/*
// @match        *://loot-links.info/*
// @match        *://lootlinks.com/*
// @match        *://lootlinks.org/*
// @match        *://lootlinks.net/*
// @match        *://lootlinks.info/*
// @match        *://lootdest.co/*
// @match        *://lootdest.net/*
// @match        *://links-loot.co/*
// @match        *://links-loot.org/*
// @match        *://links-loot.net/*
// @match        *://links-loot.info/*
// @match        *://linksloot.com/*
// @match        *://linksloot.co/*
// @match        *://linksloot.org/*
// @match        *://linksloot.info/*
// @match        *://lootlink.com/*
// @match        *://lootlink.co/*
// @match        *://lootlink.net/*
// @match        *://lootlink.info/*
// @match        *://rkns.link/*
// @match        *://shorte.st/*
// @match        *://sh.st/*
// @match        *://gestyy.com/*
// @match        *://destyy.com/*
// @match        *://social-unlock.com/*
// @match        *://socialwolvez.com/app/l/*
// @match        *://sub1s.com/*
// @match        *://subtolink.com/*
// @match        *://sub2unlock.com/*
// @match        *://sub2unlock.net/*
// @match        *://unlocknow.net/*
// @match        *://v.gd/*
// @exclude      *://publisher.linkvertise.com/*
// @exclude      *://linkvertise.com/adfly-notice*
// @exclude      *://linkvertise.com/search*
// @exclude      *://linkvertise.com/login*
// @exclude      *://linkvertise.com/profile*
// @exclude      *://blog.linkvertise.com
// @exclude      *://blog.linkvertise.com/*
// @exclude      *://linkvertise.com/assets/vendor/*
// @exclude      *://link-mutation.linkvertise.com/*
// @exclude      *://linkvertise.com/assets/external/thinksuggest
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// @connect      bypass.city
// @connect      adbypass.org
// @run-at       document-start
// ==/UserScript==

(function() {
  'use strict';

  const hostname = window.location.hostname;
  const url = window.location.href;

  // --- ANTI-DETECTION LAYER 1: SYNCHRONOUS EXECUTION HALT ---
  // Do not block bypass APIs or sites that need DOM interaction (justpaste)
  const isSafeDomain = hostname.includes('bypass.city') ||
                       hostname.includes('adbypass.org') ||
                       hostname.includes('justpaste.it');

  if (!isSafeDomain) {
      // IMMEDIATELY KILL the browser's HTML parser. Stops tracking scripts from ever loading.
      try { window.stop(); } catch(e) {}

      // Wipe anything that managed to slip through in the first millisecond
      if (document.documentElement) {
          document.documentElement.innerHTML = '';
          document.documentElement.style.backgroundColor = '#1a1a1a';
      }
  }

  // --- HARD KILL-SWITCH: Block invalid.linkvertise.com completely ---
  if (hostname === 'invalid.linkvertise.com') {
      document.documentElement.innerHTML = `
          <style>body{background:#1a1a1a;color:#fff;font-family:sans-serif;display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;margin:0;}</style>
          <body>
              <h1 style="color:#ff4444;text-align:center;">Invalid Response</h1>
              <p style="font-size:1.2em;">The bypass failed and redirected to an invalid link.</p>
              <p style="color:#aaaaaa;text-align:center;font-weight:bold;">PLEASE GO BACK AND TRY AGAIN.</p>
          </body>
      `;
      return;
  }

  // --- ANTI-DETECTION LAYER 2: BOT SPOOFING ---
  try {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
      Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3] });
  } catch(e) {}

  // --- ANTI-DETECTION LAYER 3: NATIVE FUNCTION CACHING & TOSTRING SPOOFING ---
  const OriginalAttachShadow = Element.prototype.attachShadow;
  const OriginalToString = Function.prototype.toString;
  const maskedFunctions = new WeakMap();

  Function.prototype.toString = function() {
      if (maskedFunctions.has(this)) return OriginalToString.call(maskedFunctions.get(this));
      if (this === Function.prototype.toString) return OriginalToString.call(OriginalToString);
      return OriginalToString.call(this);
  };
  maskedFunctions.set(Function.prototype.toString, OriginalToString);

  function secureAttachShadow(el) {
      return OriginalAttachShadow.call(el, { mode: 'closed' });
  }

  const config = {
      version: "14.0.2",
      installed: true,
      downloadURL: "https://api2.adbypass.org/userscript/download/bypass.user.js"
  };

  function generateRandomId() { return 'zx-id-' + Math.random().toString(36).substring(2, 10); }
  function generateRandomTag() { return 'zx-' + Math.random().toString(36).substring(2, 8); }

  // --- TOP RIGHT STACKED NOTIFICATION SYSTEM (PHASE UI) ---
  let notifWrapper = null;
  let notifHost = null;

  function initNotificationContainer() {
      if (notifWrapper && notifHost && notifHost.isConnected) return;

      notifHost = document.createElement(generateRandomTag());
      notifHost.id = generateRandomId();
      notifHost.style.cssText = 'position: fixed; top: 25px; right: 25px; z-index: 2147483647; pointer-events: none; display: flex; flex-direction: column; gap: 15px; margin: 0; padding: 0;';

      const shadow = secureAttachShadow(notifHost);
      notifWrapper = document.createElement('div');
      notifWrapper.style.cssText = 'display: flex; flex-direction: column; gap: 15px; align-items: flex-end;';

      const style = document.createElement('style');
      style.textContent = `
          .zx-notif {
              position: relative;
              overflow: hidden;
              background: linear-gradient(135deg, rgba(30, 10, 45, 0.85), rgba(15, 5, 25, 0.95));
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
              border: 1px solid rgba(168, 85, 247, 0.2);
              border-left: 5px solid var(--theme-color);
              padding: 16px 24px;
              border-radius: 12px;
              font-family: 'Segoe UI', system-ui, sans-serif;
              opacity: 0;
              transform: translateX(120%);
              animation:
                  slideInBounce 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                  pulseGlow 2s infinite alternate;
              min-width: 280px;
          }

          /* Light Sweep Shimmer Effect */
          .zx-notif::after {
              content: '';
              position: absolute;
              top: 0; left: -100%;
              width: 50%; height: 100%;
              background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.15), transparent);
              transform: skewX(-20deg);
              animation: shimmer 3s infinite;
          }

          .zx-title {
              font-size: 15px;
              font-weight: 800;
              margin-bottom: 4px;
              color: var(--theme-color);
              text-transform: uppercase;
              letter-spacing: 1.5px;
          }

          .zx-desc {
              font-size: 14px;
              color: #f3e8ff;
              font-weight: 500;
              letter-spacing: 0.3px;
          }

          @keyframes slideInBounce {
              0% { opacity: 0; transform: translateX(120%); }
              70% { transform: translateX(-15px); }
              100% { opacity: 1; transform: translateX(0); }
          }

          @keyframes pulseGlow {
              0% { box-shadow: 0 10px 30px rgba(0,0,0,0.4), 0 0 10px rgba(168, 85, 247, 0.1); }
              100% { box-shadow: 0 10px 30px rgba(0,0,0,0.6), 0 0 25px rgba(217, 70, 239, 0.3); }
          }

          @keyframes shimmer {
              0% { left: -100%; }
              20% { left: 200%; }
              100% { left: 200%; }
          }
      `;
      shadow.appendChild(style);
      shadow.appendChild(notifWrapper);

      const attachUI = () => {
          const target = document.documentElement || document.body;
          if (target) {
              target.appendChild(notifHost);
          } else {
              requestAnimationFrame(attachUI);
          }
      };
      attachUI();
  }

  function pushNotification(title, message, color) {
      initNotificationContainer();
      const el = document.createElement('div');
      el.className = 'zx-notif';
      el.style.setProperty('--theme-color', color);
      el.innerHTML = title ? `<div class="zx-title">${title}</div><div class="zx-desc">${message}</div>` : `<div class="zx-desc">${message}</div>`;
      notifWrapper.appendChild(el);
  }

  // --- CALLBACK UI LOGIC ---
  function createCallbackOverlay(fallbackUrl = null) {
      let redirectUrl = fallbackUrl || GM_getValue("zerox.callbackTarget");
      if (redirectUrl) GM_deleteValue("zerox.callbackTarget");
      if (!redirectUrl || !redirectUrl.startsWith('http')) return;

      const host = document.createElement(generateRandomTag());
      host.style.cssText = 'position: fixed !important; inset: 0 !important; width: 100vw !important; height: 100vh !important; z-index: 2147483647 !important; background-color: #1a1a1a !important; pointer-events: all !important; display: block !important; margin: 0 !important; padding: 0 !important;';

      const shadow = secureAttachShadow(host);
      shadow.innerHTML = `
          <style>
              .wrapper { font-family: sans-serif; background: #1a1a1a; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; color: #fff; }
              button { font-size: 1.2em; padding: 12px 24px; background: #007bff; color: #fff; border: none; border-radius: 6px; cursor: pointer; transition: transform .2s; }
              button:hover:not(:disabled) { transform: scale(1.05); background: #0056b3; }
              button:disabled { background: #555; color: #999; cursor: not-allowed; }
              #countdown { font-size: 1.2em; margin-bottom: 20px; }
          </style>
          <div class="wrapper">
              <h2>Zero Protection</h2>
              <p>Your target destination is ready. Click below to continue.</p>
              <div id="countdown"></div>
              <button id="nextBtn">Continue</button>
          </div>
      `;

      const attachUI = () => {
          if (document.documentElement) {
              document.documentElement.innerHTML = '';
              document.documentElement.appendChild(host);
          } else { setTimeout(attachUI, 50); }
      };
      attachUI();

      const countdownEl = shadow.querySelector('#countdown');
      const btn = shadow.querySelector('#nextBtn');

      const hasHash = (url) => { try { return new URL(url).searchParams.has('hash') || url.includes('hash='); } catch { return url.includes('hash='); } };
      const isInvalidResponse = (redirectUrl.includes('google.com') && hasHash(redirectUrl)) || redirectUrl.includes('invalid.linkvertise.com');

      if (isInvalidResponse) {
          shadow.querySelector('h2').textContent = "Invalid Response";
          shadow.querySelector('h2').style.color = '#ff4444';
          shadow.querySelector('p').textContent = "The bypass failed and returned an invalid link.";
          countdownEl.style.color = '#ff4444'; countdownEl.style.fontWeight = 'bold';
          countdownEl.textContent = "PLEASE REFRESH THE PAGE AND TRY AGAIN.";
          btn.style.display = 'none';
      } else if (hasHash(redirectUrl)) {
          countdownEl.style.color = '#ff4444'; countdownEl.style.fontWeight = 'bold';
          let time = 8;
          countdownEl.textContent = `ACTION REQUIRED: CLICK WITHIN ${time} SECONDS BEFORE THE LINK EXPIRES`;
          const interval = setInterval(() => {
              time--;
              if (time > 0) { countdownEl.textContent = `ACTION REQUIRED: CLICK WITHIN ${time} SECONDS BEFORE THE LINK EXPIRES`; }
              else {
                  countdownEl.textContent = "THE LINK HAS EXPIRED. REFRESHING...";
                  btn.disabled = true; clearInterval(interval);
                  setTimeout(() => location.replace(location.href.split('?')[0]), 3500);
              }
          }, 1000);
      } else {
          countdownEl.style.display = 'none';
      }

      btn.addEventListener('click', () => {
          if (btn.disabled || isInvalidResponse) return;
          btn.disabled = true; btn.textContent = "Please wait...";
          setTimeout(() => {
              try { const a = document.createElement('a'); a.href = redirectUrl; a.rel = 'noreferrer noopener'; document.documentElement.appendChild(a); a.click(); } catch(e) {}
              window.location.assign(redirectUrl);
          }, 50);
      });
  }

  async function directBypassRedirect(targetUrl) {
    console.log('Zerox: Fast Redirecting...');

    // PHASE 1
    pushNotification("PING PONG!", "Waiting for it to bounce back...", "#a855f7");

    let bypassCityOnline = false;
    try {
        bypassCityOnline = await new Promise((resolve) => {
            GM_xmlhttpRequest({
                method: 'GET', url: 'https://bypass.city/.well-known/ping.json', timeout: 3500,
                onload: (res) => resolve(JSON.parse(res.responseText).ping === true),
                onerror: () => resolve(false), ontimeout: () => resolve(false)
            });
        });
    } catch(e) {}

    // PHASE 2
    pushNotification("Bypass Ready", "Routing to destination safely...", "#d946ef");

    GM_setValue("bypass.callback", window.location.href);
    GM_deleteValue("bypass.data");
    GM_deleteValue("zerox.callbackTarget");

    const bypassUrl = new URL(`${bypassCityOnline ? "https://bypass.city" : "https://adbypass.org"}/bypass`);
    bypassUrl.searchParams.set('bypass', targetUrl);
    bypassUrl.searchParams.set('userscript', 'true');
    bypassUrl.searchParams.set('userscript-version', config.version);

    window.location.replace(bypassUrl.href);
  }

  async function executeBypass() {
    console.log('Zerox: Running on', hostname);

    const hashMatch = url.match(/zx=([^&]+)/);
    if (hashMatch) {
        try {
            const fallbackTarget = decodeURIComponent(atob(hashMatch[1]));
            if (fallbackTarget.startsWith('http')) {
                window.history.replaceState(null, '', window.location.pathname + window.location.search);
                GM_setValue("zerox.callbackTarget", fallbackTarget);
                createCallbackOverlay(fallbackTarget);
                return;
            }
        } catch(e) {}
    }

    const callbackTarget = GM_getValue("zerox.callbackTarget");
    if (callbackTarget) return createCallbackOverlay(callbackTarget);

    const bypassData = GM_getValue("bypass.data");
    if (bypassData) {
        const tUrl = bypassData.bypassData || bypassData;
        if (tUrl) GM_setValue("zerox.callbackTarget", tUrl);
        GM_deleteValue("bypass.data");
        return createCallbackOverlay(tUrl);
    }

    if (hostname === 'linkvertise.com' && url !== 'https://linkvertise.com' && url !== 'https://linkvertise.com/') {
      return directBypassRedirect(url);
    }

    const currentDomain = hostname.replace(/^www\.|^mobile\.|^www2\.|^m\./, '');
    const cleanUrl = url.split('#')[0];

    if (hostname === 'www.google.com' && url.includes('/url')) {
      const targetUrl = new URLSearchParams(window.location.search).get('url') || new URLSearchParams(window.location.search).get('q');
      if (targetUrl) return directBypassRedirect(targetUrl);
    }

    if (hostname === 'socialwolvez.com' && url.includes('/app/l/')) return directBypassRedirect(url);

    const bypassCityDomains = ['loot-link.com','loot-links.com','lootlink.org','lootlinks.co','lootdest.info','lootdest.org','lootdest.com','loot-link.co','loot-link.org','loot-link.net','loot-link.info','loot-links.co','loot-links.org','loot-links.net','loot-links.info','lootlinks.com','lootlinks.org','lootlinks.net','lootlinks.info','lootdest.co','lootdest.net','links-loot.com','links-loot.co','links-loot.org','links-loot.net','links-loot.info','linksloot.com','linksloot.co','linksloot.org','linksloot.info','lootlink.com','lootlink.co','lootlink.net','lootlink.info','adshnk.com','adshrink.it','shrink-service.it','adfoc.us','boost.ink','bst.gg','bst.wtf','booo.st','boost.fusedgt.com','thedragonslayer2.github.io','empebau.eu','is.gd','leasurepartment.xyz','letsboost.net','mboost.me','rekonise.com','rkns.link','shorte.st','sh.st','gestyy.com','destyy.com','social-unlock.com','sub1s.com','sub2get.com','subtolink.com','sub2unlock.com','sub2unlock.net','unlocknow.net','v.gd'];

    if (bypassCityDomains.some(domain => currentDomain.includes(domain) || hostname.includes(domain))) {
      return directBypassRedirect(cleanUrl);
    }

    if (hostname === 'justpaste.it' && url.includes('/redirect/')) {
       const checkContinue = setInterval(() => {
           const btn = Array.from(document.querySelectorAll("a, button")).find(el => el.textContent && el.textContent.trim() === "Continue");
           if (btn) { clearInterval(checkContinue); btn.click(); }
       }, 500);
       return setTimeout(() => clearInterval(checkContinue), 10000);
    }

    if (hostname.includes("bypass.city") || hostname.includes("adbypass.org")) {
      const script = document.createElement("script");
      script.textContent = `window.scriptInfo = JSON.parse('${JSON.stringify(config)}')`;
      document.body.appendChild(script);
      window.dispatchEvent(new CustomEvent("userScriptInfo", { detail: config }));

      window.addEventListener("bypassComplete", async (event) => {
          const data = event.detail;
          let redirectURL = GM_getValue("bypass.callback");
          const targetUrl = data && (data.bypassData || data);

          try {
              window.localStorage.clear(); window.sessionStorage.clear();
              document.cookie.split(";").forEach(c => document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"));
          } catch (e) {}

          if (redirectURL) {
              if (targetUrl) {
                  GM_setValue("zerox.callbackTarget", targetUrl);
                  redirectURL += (redirectURL.includes('#') ? '&' : '#') + 'zx=' + btoa(encodeURIComponent(targetUrl));
              }
              GM_deleteValue("bypass.callback");
              setTimeout(() => window.location.replace(redirectURL), 500);
          } else {
               if (targetUrl) { GM_setValue("zerox.callbackTarget", targetUrl); window.location.href = targetUrl; }
               else if (data && data.bypassData) { window.location.href = data.bypassData; }
          }
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', executeBypass);
  else executeBypass();
})();
