// ==UserScript==
// @name         Zerox Bypasser
// @namespace    http://tampermonkey.net/
// @version      14.0.2.0
// @description  Forked version of bypass.city userscript
// @author       Harley & Reinhard
// @icon         https://raw.githubusercontent.com/NexusZeroDev/nexuszero-userscript/main/revamped.png
// @updateURL    https://raw.githubusercontent.com/NexusZeroDev/nexuszero-userscript/main/zero.user.js
// @downloadURL  https://raw.githubusercontent.com/NexusZeroDev/nexuszero-userscript/main/zero.user.js
// @match        *://linkvertise.com/*
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

  const config = {
      version: "14.0.2",
      installed: true,
      downloadURL: "https://api2.adbypass.org/userscript/download/bypass.user.js"
  };

  // Anti-Detection: Generate random IDs for injected DOM elements
  function generateRandomId() {
      return 'zx-' + Math.random().toString(36).substring(2, 10);
  }

  // --- TOP RIGHT STACKED NOTIFICATION SYSTEM ---
  let notifWrapper = null;
  let notifHost = null;

  function initNotificationContainer() {
      if (notifWrapper && notifHost && notifHost.isConnected) return;

      notifHost = document.createElement('div');
      notifHost.id = generateRandomId();
      notifHost.style.cssText = 'position: fixed; top: 25px; right: 25px; z-index: 2147483647; pointer-events: none; display: flex; flex-direction: column; gap: 15px;';

      const shadow = notifHost.attachShadow({ mode: 'closed' });

      notifWrapper = document.createElement('div');
      notifWrapper.style.cssText = 'display: flex; flex-direction: column; gap: 15px; align-items: flex-end;';

      const style = document.createElement('style');
      style.textContent = `
          .zx-notif {
              background: rgba(15, 23, 42, 0.65);
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-left: 6px solid var(--theme-color);
              padding: 18px 26px;
              border-radius: 20px;
              font-family: 'Segoe UI', system-ui, sans-serif;
              box-shadow: 0 15px 35px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1);
              opacity: 0;
              transform: translateX(120%);
              animation:
                  slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards,
                  hoverFloat 4s ease-in-out infinite 0.6s;
              min-width: 290px;
              pointer-events: none;
          }
          .zx-title {
              font-size: 20px;
              font-weight: 800;
              margin-bottom: 6px;
              color: #ffffff;
              text-transform: capitalize;
              letter-spacing: 0.5px;
          }
          .zx-desc {
              font-size: 15px;
              color: var(--theme-color);
              font-weight: 600;
              letter-spacing: 0.3px;
          }

          @keyframes slideIn {
              0% { opacity: 0; transform: translateX(120%) scale(0.95); }
              100% { opacity: 1; transform: translateX(0) scale(1); }
          }

          @keyframes hoverFloat {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-8px); }
          }
      `;

      shadow.appendChild(style);
      shadow.appendChild(notifWrapper);

      const attachUI = () => {
          const target = document.body || document.documentElement;
          if (target) {
              target.appendChild(notifHost);

              const observer = new MutationObserver(() => {
                  if (!notifHost.isConnected && (document.body || document.documentElement)) {
                      (document.body || document.documentElement).appendChild(notifHost);
                  }
              });
              observer.observe(document.documentElement || document, { childList: true, subtree: true });
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

      if (title) {
          el.innerHTML = `<div class="zx-title">${title}</div><div class="zx-desc">${message}</div>`;
      } else {
          el.innerHTML = `<div class="zx-desc">${message}</div>`;
      }

      notifWrapper.appendChild(el);
  }

  // --- CALLBACK UI LOGIC ---
  function createCallbackOverlay() {
      const callbackTarget = GM_getValue("zerox.callbackTarget");
      let redirectUrl = callbackTarget;

      if (redirectUrl) {
          GM_deleteValue("zerox.callbackTarget");
      }

      if (!redirectUrl || !redirectUrl.startsWith('http')) {
          console.error("Zerox: No valid destination link found.");
          return;
      }

      const host = document.createElement('div');
      host.id = generateRandomId();
      host.style.cssText = 'position: fixed !important; inset: 0 !important; width: 100vw !important; height: 100vh !important; z-index: 2147483647 !important; background-color: #1a1a1a !important; pointer-events: all !important; display: block !important; margin: 0 !important; padding: 0 !important;';

      const shadow = host.attachShadow({ mode: 'closed' });

      shadow.innerHTML = `
          <style>
              :host {
                  display: block !important;
                  width: 100vw !important;
                  height: 100vh !important;
              }
              .wrapper {
                  font-family: Arial, sans-serif !important;
                  background: #1a1a1a !important;
                  display: flex !important;
                  flex-direction: column !important;
                  align-items: center !important;
                  justify-content: center !important;
                  min-height: 100vh !important;
                  margin: 0 !important;
                  color: #e0e0e0 !important;
                  text-align: center !important;
                  padding: 20px !important;
              }
              h2 {
                  font-size: 2.2em !important;
                  margin-bottom: 8px !important;
                  margin-top: 0 !important;
                  color: #ffffff !important;
              }
              p {
                  font-size: 1.1em !important;
                  text-align: center !important;
                  margin: 5px 0 15px 0 !important;
                  color: #b0b0b0 !important;
              }
              button {
                  font-size: 1.2em !important;
                  padding: 12px 24px !important;
                  background: #007bff !important;
                  color: #ffffff !important;
                  border: none !important;
                  border-radius: 6px !important;
                  cursor: pointer !important;
                  transition: transform .2s, background .2s !important;
                  pointer-events: all !important;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3) !important;
              }
              button:hover:not(:disabled) {
                  transform: scale(1.05) !important;
                  background: #0056b3 !important;
              }
              button:disabled {
                  background: #555 !important;
                  color: #999 !important;
                  cursor: not-allowed !important;
                  box-shadow: none !important;
              }
              #countdown {
                  font-size: 1.2em !important;
                  margin-bottom: 20px !important;
              }
          </style>

          <div class="wrapper">
              <h2>Safe Guard</h2>
              <p>Your target destination is ready. Click below to continue.</p>
              <div id="countdown"></div>
              <button id="nextBtn">Continue</button>
          </div>
      `;

      const attachUI = () => {
          if (document.body) {
              document.body.innerHTML = '';
              document.body.appendChild(host);
          } else {
              setTimeout(attachUI, 50);
          }
      };
      attachUI();

      const countdownEl = shadow.querySelector('#countdown');
      const btn = shadow.querySelector('#nextBtn');

      const hasHash = (url) => {
          try {
              return new URL(url).searchParams.has('hash') || url.includes('hash=');
          } catch {
              return url.includes('hash=');
          }
      };

      if (hasHash(redirectUrl)) {
          countdownEl.style.color = '#ff4444';
          countdownEl.style.fontWeight = 'bold';
          let time = 8;
          countdownEl.textContent = `ACTION REQUIRED: CLICK WITHIN ${time} SECONDS BEFORE THE LINK EXPIRES`;

          const interval = setInterval(() => {
              time--;
              if (time > 0) {
                  countdownEl.textContent = `ACTION REQUIRED: CLICK WITHIN ${time} SECONDS BEFORE THE LINK EXPIRES`;
              } else {
                  countdownEl.textContent = "THE LINK HAS EXPIRED. REFRESHING TO GENERATE A NEW SECURE LINK...";
                  countdownEl.style.color = '#aaaaaa';
                  countdownEl.style.fontWeight = 'normal';
                  btn.disabled = true;
                  clearInterval(interval);

                  setTimeout(() => {
                      location.replace(location.href.split('?')[0]);
                  }, 3500);
              }
          }, 1000);
      } else {
          countdownEl.style.display = 'none';
      }

      const performRedirect = () => {
          if (!redirectUrl || btn.disabled) return;
          btn.disabled = true;
          btn.textContent = "Please wait...";

          setTimeout(() => {
              try {
                  const a = document.createElement('a');
                  a.href = redirectUrl;
                  a.rel = 'noreferrer noopener';
                  document.body.appendChild(a);
                  a.click();
              } catch(e) {}

              try {
                  window.top.location.href = redirectUrl;
              } catch(e) {}
              window.location.assign(redirectUrl);
          }, 50);
      };

      btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          performRedirect();
      });

      btn.addEventListener('touchend', (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          performRedirect();
      }, { passive: false });
  }

  async function checkBypassCityStatus() {
    try {
      const response = await new Promise((resolve) => {
        GM_xmlhttpRequest({
          method: 'GET',
          url: 'https://bypass.city/.well-known/ping.json',
          timeout: 5000,
          onload: (response) => {
            try {
              const data = JSON.parse(response.responseText);
              resolve(data.ping === true);
            } catch (e) {
              resolve(false);
            }
          },
          onerror: () => resolve(false),
          ontimeout: () => resolve(false)
        });
      });
      return response;
    } catch (e) {
      return false;
    }
  }

  async function directBypassRedirect(url) {
    console.log('Zerox: Using direct bypass method for:', url);

    // --- PHASE 1: Pinging Notification ---
    pushNotification("", "Pinging Server(this wont take too long)", "#fbbf24"); // Yellow

    // Maintain the ping to decide which server to use seamlessly
    const bypassCityOnline = await checkBypassCityStatus();
    const redirectBase = bypassCityOnline ? "https://bypass.city" : "https://adbypass.org";

    // --- PHASE 2: Redirecting Notification (No Site Name) ---
    pushNotification("", "You are being redirected", "#4ade80"); // Green

    if (typeof GM_setValue !== 'undefined') {
        GM_setValue("bypass.callback", window.location.href);
    }

    if (typeof GM_deleteValue !== 'undefined') {
      GM_deleteValue("bypass.data");
      GM_deleteValue("zerox.callbackTarget");
    }

    const bypassUrl = new URL(`${redirectBase}/bypass`);
    bypassUrl.searchParams.set('bypass', url);
    bypassUrl.searchParams.set('userscript', 'true');
    bypassUrl.searchParams.set('userscript-version', config.version);

    setTimeout(() => {
        window.location.href = bypassUrl.href;
    }, 2000);
  }

  async function executeBypass() {
    const hostname = location.hostname;
    const url = window.location.href;

    console.log('Zerox: Running on', hostname, 'with URL:', url);

    const callbackTarget = GM_getValue("zerox.callbackTarget");
    if (callbackTarget) {
        console.log("Zerox: Found stored callback target trigger.");
        createCallbackOverlay();
        return;
    }

    const bypassData = GM_getValue("bypass.data");
    if (bypassData) {
        const targetUrl = bypassData.bypassData || bypassData;
        console.log("Zerox: Found stored bypass data trigger.");

        if (targetUrl && typeof GM_setValue !== 'undefined') {
            GM_setValue("zerox.callbackTarget", targetUrl);
        }

        GM_deleteValue("bypass.data");
        createCallbackOverlay();
        return;
    }

    if (hostname === 'linkvertise.com' && url !== 'https://linkvertise.com' && url !== 'https://linkvertise.com/') {
      await directBypassRedirect(url);
      return;
    }

    const bypassCityDomains = [
      'loot-link.com', 'loot-links.com', 'lootlink.org', 'lootlinks.co', 'lootdest.info', 'lootdest.org', 'lootdest.com',
      'loot-link.co', 'loot-link.org', 'loot-link.net', 'loot-link.info', 'loot-links.co', 'loot-links.org', 'loot-links.net', 'loot-links.info',
      'lootlinks.com', 'lootlinks.org', 'lootlinks.net', 'lootlinks.info', 'lootdest.co', 'lootdest.net',
      'links-loot.com', 'links-loot.co', 'links-loot.org', 'links-loot.net', 'links-loot.info',
      'linksloot.com', 'linksloot.co', 'linksloot.org', 'linksloot.net', 'linksloot.info',
      'lootlink.com', 'lootlink.co', 'lootlink.net', 'lootlink.info', 'adshnk.com', 'adshrink.it', 'shrink-service.it', 'adfoc.us',
      'boost.ink', 'bst.gg', 'bst.wtf', 'booo.st', 'boost.fusedgt.com', 'thedragonslayer2.github.io', 'empebau.eu', 'is.gd',
      'leasurepartment.xyz', 'letsboost.net', 'mboost.me', 'rekonise.com', 'rkns.link', 'shorte.st', 'sh.st', 'gestyy.com', 'destyy.com',
      'social-unlock.com', 'sub1s.com', 'sub2get.com', 'subtolink.com', 'sub2unlock.com', 'sub2unlock.net', 'unlocknow.net', 'v.gd'
    ];

    const currentDomain = hostname.replace(/^www\.|^mobile\.|^www2\.|^m\./, '');
    const cleanUrl = url.split('#')[0];

    if (hostname === 'www.google.com' && url.includes('/url')) {
      const urlParams = new URLSearchParams(window.location.search);
      const targetUrl = urlParams.get('url') || urlParams.get('q');
      if (targetUrl) { await directBypassRedirect(targetUrl); return; }
    }

    if (hostname === 'socialwolvez.com' && url.includes('/app/l/')) {
      await directBypassRedirect(url);
      return;
    }

    if (bypassCityDomains.some(domain => currentDomain.includes(domain) || hostname.includes(domain))) {
      await directBypassRedirect(cleanUrl);
      return;
    }

    if (hostname === 'justpaste.it' && url.includes('/redirect/')) {
       const checkContinue = setInterval(() => {
           const continueBtn = Array.from(document.querySelectorAll("a, button"))
               .find(el => el.textContent && el.textContent.trim() === "Continue");

           if (continueBtn) {
               clearInterval(checkContinue);
               // Fast silent click to redirect Justpaste
               continueBtn.click();
           }
       }, 500);
       setTimeout(() => clearInterval(checkContinue), 10000);
       return;
    }

    // Bypass.city & Adbypass.org Handling Logic (Automated Return)
    if (hostname.includes("bypass.city") || hostname.includes("adbypass.org")) {
      const injectScriptInfo = () => {
          const injectJs = `window.scriptInfo = JSON.parse('${JSON.stringify(config)}')`;
          const script = document.createElement("script");
          script.textContent = injectJs;
          document.body.appendChild(script);
      };
      injectScriptInfo();

      const sendUserscriptInfoEvent = () => {
          const event = new CustomEvent("userScriptInfo", {
              detail: config
          });
          window.dispatchEvent(event);
      };
      sendUserscriptInfoEvent();

      window.addEventListener("bypassComplete", async (event) => {
          const data = event.detail;
          console.log("Zerox: Received bypassComplete event", data);

          const redirectURL = GM_getValue("bypass.callback");
          const targetUrl = data && (data.bypassData || data);

          if (redirectURL) {
              if (targetUrl) {
                  GM_setValue("zerox.callbackTarget", targetUrl);
              }
              GM_deleteValue("bypass.callback");

              setTimeout(() => {
                   window.open(redirectURL, "_self");
              }, 500);
          } else {
               if (targetUrl) {
                   GM_setValue("zerox.callbackTarget", targetUrl);
                   window.location.href = targetUrl;
               } else if (data && data.bypassData) {
                   window.location.href = data.bypassData;
               }
          }
      });
      return;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', executeBypass);
  } else {
    executeBypass();
  }
})();
