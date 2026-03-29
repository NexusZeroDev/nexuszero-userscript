// ==UserScript==
// @name         Zerox Bypasser 
// @namespace    http://tampermonkey.net/
// @version      14.0.2
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
// @match        *://ads.luarmor.net/get_key*
// @match        *://pandadevelopment.net/*
// @match        *://luminon.top/*
// @match        *://atherhub-key-nexus.lovable.app/*
// @match        *://www.getastra.lol/*
// @match        *://scripts.city/*
// @match        *://bypass.city/*
// @match        *://adbypass.org/*
// @match        *://auth.platoboost.app/*
// @match        *://auth.platorelay.com/*
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

  function createCallbackOverlay() {
      // --- Load Settings ---
      const settings = {
          skip: GM_getValue('zerox.setting.skip', false),
          autoRedirect: GM_getValue('zerox.setting.auto', false),
          timer: GM_getValue('zerox.setting.timer', 15) // Default 15s
      };

      // --- IMMEDIATE DATA HANDLING ---
      // Get the stored URL immediately
      const callbackTarget = GM_getValue("zerox.callbackTarget");
      let finalDestination = callbackTarget;

      // If we found a URL, delete it from storage IMMEDIATELY to clean up
      if (finalDestination) {
          GM_deleteValue("zerox.callbackTarget");
          console.log("Zerox: Destination loaded and storage cleared.");
      }

      const overlay = document.createElement('div');
      overlay.style.cssText = `
          position: fixed;
          inset: 0;
          z-index: 2147483647;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(15px);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
      `;

      const title = document.createElement('div');
      title.innerText = "Safe Mode";
      title.style.cssText = "color: white; font-size: 20px; font-weight: bold; margin-bottom: 10px; font-family: 'Segoe UI', sans-serif;";

      const countdownText = document.createElement('div');
      countdownText.style.cssText = "color: #bbb; font-size: 16px; margin-bottom: 25px; font-family: 'Segoe UI', sans-serif;";

      const errorText = document.createElement('div');
      errorText.style.cssText = "color: #e74c3c; font-size: 16px; margin-bottom: 20px; font-family: 'Segoe UI', sans-serif; display: none;";
      errorText.innerText = "Something went wrong";

      const btn = document.createElement('button');
      btn.innerText = "Please Wait...";
      btn.style.cssText = `
          padding: 15px 40px;
          font-size: 18px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.5);
          background: #333;
          border: 1px solid #444;
          border-radius: 8px;
          cursor: not-allowed;
          font-family: 'Segoe UI', sans-serif;
          transition: all 0.3s;
          box-shadow: none;
      `;
      btn.style.pointerEvents = "none";

      // --- SETTINGS UI ---
      const settingsIcon = document.createElement('div');
      settingsIcon.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      `;
      settingsIcon.style.cssText = `
        position: absolute;
        bottom: 20px;
        left: 20px;
        color: rgba(255,255,255,0.6);
        cursor: pointer;
        transition: color 0.2s;
        z-index: 2147483649;
      `;
      settingsIcon.onmouseover = () => settingsIcon.style.color = "white";
      settingsIcon.onmouseout = () => settingsIcon.style.color = "rgba(255,255,255,0.6)";

      // Settings Menu Container
      const settingsMenu = document.createElement('div');
      settingsMenu.style.cssText = `
        position: absolute;
        bottom: 60px;
        left: 20px;
        width: 280px;
        background: #1e1e1e;
        border: 1px solid #333;
        border-radius: 10px;
        padding: 15px;
        display: none;
        box-shadow: 0 4px 15px rgba(0,0,0,0.5);
        color: white;
        font-family: 'Segoe UI', sans-serif;
        z-index: 2147483649;
      `;

      const createToggle = (labelText, settingKey, currentVal) => {
        const wrap = document.createElement('div');
        wrap.style.cssText = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;";
        const label = document.createElement('span');
        label.innerText = labelText;
        label.style.fontSize = "14px";

        const toggleBtn = document.createElement('div');
        toggleBtn.style.cssText = `
            width: 40px; height: 20px; background: ${currentVal ? '#e67e22' : '#444'};
            border-radius: 10px; position: relative; cursor: pointer; transition: background 0.3s;
        `;
        const knob = document.createElement('div');
        knob.style.cssText = `
            width: 16px; height: 16px; background: white; border-radius: 50%;
            position: absolute; top: 2px; left: ${currentVal ? '22px' : '2px'}; transition: left 0.3s;
        `;
        toggleBtn.appendChild(knob);

        toggleBtn.onclick = () => {
            const newState = !GM_getValue(settingKey, false);
            GM_setValue(settingKey, newState);
            toggleBtn.style.background = newState ? '#e67e22' : '#444';
            knob.style.left = newState ? '22px' : '2px';
            if(settingKey.includes('skip')) location.reload();
        };

        wrap.appendChild(label);
        wrap.appendChild(toggleBtn);
        return wrap;
      };

      const timerContainer = document.createElement('div');
      timerContainer.style.marginBottom = "10px";
      const timerHeader = document.createElement('div');
      timerHeader.style.cssText = "display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 5px;";
      timerHeader.innerHTML = `<span>Timer Duration</span><span id="timerVal">${settings.timer}s</span>`;

      const rangeInput = document.createElement('input');
      rangeInput.type = "range";
      rangeInput.min = "3";
      rangeInput.max = "60";
      rangeInput.value = settings.timer;
      rangeInput.style.cssText = "width: 100%; cursor: pointer; accent-color: #e67e22;";
      rangeInput.oninput = (e) => {
        const val = e.target.value;
        document.getElementById('timerVal').innerText = val + "s";
        GM_setValue('zerox.setting.timer', parseInt(val));
      };

      timerContainer.appendChild(timerHeader);
      timerContainer.appendChild(rangeInput);

      settingsMenu.appendChild(createToggle("Skip Timer", "zerox.setting.skip", settings.skip));
      settingsMenu.appendChild(createToggle("Auto Redirect", "zerox.setting.auto", settings.autoRedirect));
      settingsMenu.appendChild(timerContainer);

      settingsIcon.onclick = () => {
          settingsMenu.style.display = settingsMenu.style.display === 'none' ? 'block' : 'none';
      };

      // --- Logic ---
      let countdownInterval;

      let countdownDuration = settings.skip ? 0 : (settings.timer * 1000);
      const endTime = Date.now() + countdownDuration;

      const forceRefresh = () => {
          window.location.href = window.location.href;
      };

      const showError = () => {
          errorText.style.display = "block";
          title.innerText = "Failed to Redirect to Destination";
          title.style.color = "#e74c3c";
          countdownText.style.display = "none";
          setTimeout(forceRefresh, 1500);
      };

      const performRedirect = () => {
          clearInterval(countdownInterval);
          // Use the variable we captured at the beginning
          if (finalDestination && finalDestination.startsWith('http')) {
              window.location.href = finalDestination;
          } else {
              showError();
          }
      };

      const activateButton = () => {
          btn.innerText = "Continue to Destination";
          btn.style.background = "#e67e22";
          btn.style.color = "white";
          btn.style.cursor = "pointer";
          btn.style.border = "none";
          btn.style.pointerEvents = "auto";
          btn.style.boxShadow = "0 0 25px rgba(230, 126, 34, 0.6)";

          btn.onmouseover = () => btn.style.transform = "scale(1.05)";
          btn.onmouseout = () => btn.style.transform = "scale(1)";

          if (settings.autoRedirect) {
              btn.innerText = "Redirecting...";
              performRedirect();
          }

          btn.onclick = () => {
              performRedirect();
          };
      };

      const updateCountdown = () => {
          const remaining = endTime - Date.now();
          if (remaining > 0) {
              countdownText.innerText = `Safe Mode Suggested to wait ${(remaining / 1000).toFixed(1)} seconds`;
          } else {
              clearInterval(countdownInterval);
              countdownText.innerText = "You may now proceed.";
              activateButton();
          }
      };

      if (!finalDestination || !finalDestination.startsWith('http')) {
          showError();
      } else {
          countdownInterval = setInterval(updateCountdown, 50);
          updateCountdown();
      }

      overlay.appendChild(title);
      overlay.appendChild(errorText);
      overlay.appendChild(countdownText);
      overlay.appendChild(btn);
      
      overlay.appendChild(settingsIcon);
      overlay.appendChild(settingsMenu);

      if (document.body) {
          document.body.appendChild(overlay);
      } else {
          document.addEventListener('DOMContentLoaded', () => document.body.appendChild(overlay));
      }
  }

  function showProgressNotification(title, subtitle = '', isClickable = false, clickUrl = '', position = 'top') {
    removeNotification(position);
    const box = document.createElement('div');
    box.id = position === 'top' ? 'nexus-progress' : 'nexus-progress-bottom';

    const cursorStyle = isClickable ? 'cursor: pointer;' : '';
    const topPosition = position === 'top' ? '20px' : '150px';

    box.innerHTML = `
      <div style="
        background: #1e1e1e;
        color: white;
        border: 2px solid #e67e22;
        border-radius: 12px;
        padding: 14px 20px;
        width: 320px;
        font-family: 'Segoe UI', sans-serif;
        position: fixed;
        top: ${topPosition};
        right: 20px;
        z-index: 999999;
        box-shadow: 0 0 12px rgba(255,255,255,0.15);
        opacity: 0;
        transform: translateX(100%);
        animation: slideInFade 0.5s forwards, fadeOut 0.6s ease-out 8s forwards;
        ${cursorStyle}
      ">
        <div style="font-size: 16px; font-weight: 600;">${title}</div>
        <div style="font-size: 13px; opacity: 0.85; margin-top: 4px;">${subtitle}</div>
        ${isClickable ? '<div style="font-size: 11px; opacity: 0.7; margin-top: 8px; font-style: italic;">Click to proceed</div>' : ''}
      </div>
    `;

    if (!document.getElementById('nexus-styles')) {
      GM_addStyle(`
        @keyframes slideInFade {
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeOut {
          to { opacity: 0; transform: translateX(100%); }
        }
      `);
      const styleMarker = document.createElement('div');
      styleMarker.id = 'nexus-styles';
      styleMarker.style.display = 'none';
      document.head.appendChild(styleMarker);
    }

    if (isClickable && clickUrl) {
      box.addEventListener('click', () => {
        if (typeof clickUrl === 'function') {
          clickUrl();
        } else {
          window.open(clickUrl, '_blank');
        }
      });
    }

    const addNotification = () => {
      if (document.body) {
        document.body.appendChild(box);
      } else {
        setTimeout(addNotification, 100);
      }
    };
    addNotification();
  }

  function removeNotification(position = 'top') {
    const existingTop = document.getElementById('nexus-progress');
    const existingBottom = document.getElementById('nexus-progress-bottom');

    if (position === 'top' && existingTop) existingTop.remove();
    if (position === 'bottom' && existingBottom) existingBottom.remove();
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
    const bypassCityOnline = await checkBypassCityStatus();
    const redirectBase = bypassCityOnline ? "https://bypass.city" : "https://adbypass.org";

    showProgressNotification("🚀 Enhanced Bypass", bypassCityOnline ? "#1 Primary External Server" : "#2 Fallback External Server");

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

  function clickElementByText(searchText, tagNames = ['button', 'a', 'span', 'div']) {
      for (const tag of tagNames) {
          const elements = document.querySelectorAll(tag);
          for (const el of elements) {
              if (el.textContent && el.textContent.trim() === searchText) {
                  console.log(`Zerox: Found "${searchText}" in <${tag}>, clicking...`);
                  el.click();
                  return true;
              }
          }
      }
      const allElements = document.querySelectorAll('*');
      for (const el of allElements) {
          if (el.textContent && el.textContent.trim() === searchText && el.children.length === 0) {
              console.log(`Zerox: Found "${searchText}" in <${el.tagName}> (fallback), clicking parent...`);
              const clickable = el.closest('button') || el.closest('a') || el;
              if (clickable) {
                  clickable.click();
                  return true;
              }
          }
      }
      return false;
  }

  async function executeBypass() {
    const hostname = location.hostname;
    const url = window.location.href;

    console.log('Zerox: Running on', hostname, 'with URL:', url);

    const callbackTarget = GM_getValue("zerox.callbackTarget");
    if (callbackTarget) {
        console.log("Zerox: Found stored callback target:", callbackTarget);
        createCallbackOverlay();
        return;
    }

    const bypassData = GM_getValue("bypass.data");
    if (bypassData) {
        const targetUrl = bypassData.bypassData || bypassData;
        console.log("Zerox: Found stored bypass data:", targetUrl);

        if (targetUrl && typeof GM_setValue !== 'undefined') {
            GM_setValue("zerox.callbackTarget", targetUrl);
        }

        GM_deleteValue("bypass.data");
        createCallbackOverlay();
        return;
    }

    if (hostname.includes('luminon.top')) {
        const checkRedirect = setInterval(() => {
            const hasText = Array.from(document.querySelectorAll("*"))
                .some(el => el.textContent && el.textContent.includes("Pick how you wanna get your Lumin script key"));

            if (hasText) {
                showProgressNotification("👾 luminon | Redirecting", "Redirecting to a supported checkpoint.");
                clearInterval(checkRedirect);
                setTimeout(() => {
                    window.location.href = "https://ads.luarmor.net/get_key?for=Linkvertise-FxRZfrMeBswV";
                }, 1500);
            }
        }, 1000);
        setTimeout(() => clearInterval(checkRedirect), 30000);
        return;
    }

    if (hostname.includes('atherhub-key-nexus.lovable.app')) {
        const checkRedirect = setInterval(() => {
            const hasText = Array.from(document.querySelectorAll("*"))
                .some(el => el.textContent && el.textContent.includes("Choose your preferred method to get your"));

            if (hasText) {
                showProgressNotification("💖 Atherhub | Redirecting", "Redirecting to a supported checkpoint.");
                clearInterval(checkRedirect);
                setTimeout(() => {
                    window.location.href = "https://ads.luarmor.net/get_key?for=Atherhub_Lootlabs-hetsPlUqkgEJ";
                }, 1500);
            }
        }, 1000);
        setTimeout(() => clearInterval(checkRedirect), 30000);
        return;
    }

    if (hostname.includes('getastra.lol') && url.includes('/key')) {
        showProgressNotification("🟣 Astra | Redirecting", "Redirecting to a supported checkpoint.");
        setTimeout(() => {
            window.location.href = "https://ads.luarmor.net/get_key?for=Astra_Lootlabs_V-EgqMzPuurmyh";
        }, 2000);
        return;
    }

    if (hostname === 'scripts.city') {
        if (url.includes('/Legend-Hub-Key-1')) {
            showProgressNotification("🌀 Legend | Redirecting", "Redirecting to 1st Checkpoint");
            setTimeout(() => {
                clickElementByText("Proceed to Key Link");
            }, 2000);
            return;
        }
        if (url.includes('/Legend-Hub-Key-2025-Roblox')) {
            showProgressNotification("🌀 Legend | Redirecting", "Redirecting to final Checkpoint.");
            setTimeout(() => {
                clickElementByText("Get Your Key");
            }, 2000);
            return;
        }
    }

    if (hostname === 'justpaste.it' && url.includes('/redirect/')) {
       const checkContinue = setInterval(() => {
           const continueBtn = Array.from(document.querySelectorAll("a, button"))
               .find(el => el.textContent && el.textContent.trim() === "Continue");

           if (continueBtn) {
               clearInterval(checkContinue);
               showProgressNotification("📜 Justpaste | Success", "You should be redirected.");
               continueBtn.click();
           }
       }, 500);
       setTimeout(() => clearInterval(checkContinue), 10000);
       return;
    }

    if (hostname.includes('pandadevelopment.net')) {
        const checkProvider = setInterval(() => {
            const hasText = Array.from(document.querySelectorAll("*"))
                .some(el => el.textContent && el.textContent.includes("Select Checkpoint Provider"));

            if (hasText) {
                showProgressNotification("🐼 Panda Development | Beta", "Select an Ad Service");
                clearInterval(checkProvider);
            }
        }, 1000);
        setTimeout(() => clearInterval(checkProvider), 30000);

        const checkTasks = setInterval(() => {
            const hasTaskText = Array.from(document.querySelectorAll("*"))
                .some(el => el.textContent && el.textContent.includes("Complete these first before getting the key"));

            if (hasTaskText) {
                showProgressNotification(
                    "🐼 Panda Development | Beta",
                    "Please complete the task below to proceed to the next step."
                );
                clearInterval(checkTasks);
            }
        }, 1000);
        setTimeout(() => clearInterval(checkTasks), 30000);

        const checkCopyKey = setInterval(() => {
            const copyKeyBtn = Array.from(document.querySelectorAll("*"))
                .find(el => (el.textContent || '').trim() === "Copy Key");

            if (copyKeyBtn) {
                clearInterval(checkCopyKey);
                showProgressNotification("🐼 Panda Development | Beta", "Please go ahead and copy the key.");
            }
        }, 1000);
        setTimeout(() => clearInterval(checkCopyKey), 120000);

        return;
    }

    if (url.startsWith('https://ads.luarmor.net/get_key')) {
      let isFinalSuccess = false;

      const checkFinalState = setInterval(() => {
        const doneElement = Array.from(document.querySelectorAll("*"))
            .find(el => (el.textContent || '').trim() === "doneDone");

        if (doneElement) {
            isFinalSuccess = true;
            showProgressNotification(
                "🦅 Luarmor | Success",
                "All checkpoints have been completed. Get a new key or renew a key."
            );
            clearInterval(checkFinalState);
        }
      }, 500);

      const checkGetNewKey = setInterval(() => {
        if (isFinalSuccess) {
            clearInterval(checkGetNewKey);
            return;
        }

        const getNewKeyElement = Array.from(document.querySelectorAll("*"))
          .find(el => (el.outerText || '').includes("GET A NEW KEY"));

        if (getNewKeyElement && !isFinalSuccess) {
          GM_setClipboard(window.location.href);
          showProgressNotification(
              '🦅 Luarmor | Info',
              'Admaven & Linkvertise Checkpoints are only supported.'
          );
          clearInterval(checkGetNewKey);
        }
      }, 1000);

      setTimeout(() => clearInterval(checkGetNewKey), 30000);

      const checkCaptchaText = setInterval(() => {
        const content = document.body ? document.body.innerText : '';
        if (content.includes("* Complete the captcha to start")) {
          showProgressNotification("⚠️ Captcha Required", "Please complete the hCaptcha to continue.");
          clearInterval(checkCaptchaText);
        }
      }, 1000);
      setTimeout(() => clearInterval(checkCaptchaText), 30000);

      const checkSuccess = setInterval(() => {
        if (isFinalSuccess) return;

        const successElement = Array.from(document.querySelectorAll("*"))
            .find(el => (el.textContent || '').includes("You can now proceed to the next checkpoint."));

        if (successElement) {
            showProgressNotification(
                "🦅 Luarmor | Success",
                "Successfully bypassed Luarmor’s anti-measures and completed the checkpoint."
            );
            clearInterval(checkSuccess);
        }
      }, 1000);
      setTimeout(() => clearInterval(checkSuccess), 60000);

      const waitForBody = () => {
        if (!document.body) {
          setTimeout(waitForBody, 100);
          return;
        }
        const observer = new MutationObserver(() => {
          const errorPopup = document.querySelector('.swal2-popup.swal2-modal.swal2-icon-error');
          if (errorPopup) {
            showProgressNotification('⛔ Blacklisted', 'Luarmor has blacklisted your IP.');
            observer.disconnect();
            let seconds = 5;
            const interval = setInterval(() => {
              if (seconds === 0) {
                clearInterval(interval);
                try { window.close(); } catch { showProgressNotification('🔒 Close Manually', 'Browser blocked auto-close.'); }
              } else {
                showProgressNotification('⏳ Closing Tab', `Closing in ${seconds--}s...`);
              }
            }, 1000);
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      };
      waitForBody();
      return;
    }

    if (hostname === 'linkvertise.com' && url !== 'https://linkvertise.com' && url !== 'https://linkvertise.com/') {
      await directBypassRedirect(url);
      return;
    }

    if (hostname.includes('auth.platoboost.app') || hostname.includes('auth.platorelay.com')) {
      const checkFalseClickModal = setInterval(() => {
        const okButtons = Array.from(document.querySelectorAll("button"))
          .filter(btn => (btn.textContent || '').trim().toLowerCase() === "ok");
        for (const okBtn of okButtons) {
          const modalContent = okBtn.closest('[role="dialog"], .modal, [class*="modal"]');
          if (modalContent && (modalContent.innerText || '').toLowerCase().includes('false click')) {
            okBtn.click();
            break;
          }
        }
      }, 500);
      setTimeout(() => clearInterval(checkFalseClickModal), 60000);

      const checkExpired = setInterval(() => {
        if ((document.body?.innerText || '').includes("This session has expired")) {
          showProgressNotification("⏰ Session Expired", "Please get a new link.");
          clearInterval(checkExpired);
        }
      }, 1000);

      const checkContinueButton = setInterval(() => {
        const continueBtn = Array.from(document.querySelectorAll("button, a, span, div"))
          .find(el => (el.textContent || '').trim() === "Continue");

        if (continueBtn) {
          clearInterval(checkContinueButton);
          showProgressNotification("🌊 auth.platorelay | Beta release", "Click Continue below to proceed to the step.");
        }
      }, 500);
      setTimeout(() => clearInterval(checkContinueButton), 30000);

      const checkSecurity = setInterval(() => {
        const securityText = Array.from(document.querySelectorAll("*"))
            .find(el => (el.textContent || '').includes("Security check"));

        if (securityText) {
          showProgressNotification("🔐 Turnstile Required", "Complete verification.");
          clearInterval(checkSecurity);
        }
      }, 1000);
      setTimeout(() => clearInterval(checkSecurity), 30000);

      const checkCaptchaText = setInterval(() => {
        if (Array.from(document.querySelectorAll("p")).some(p => (p.innerHTML || '').includes("* Complete the captcha"))) {
          showProgressNotification("⚠️ Captcha Required", "Complete hCaptcha.");
          clearInterval(checkCaptchaText);
        }
      }, 1000);
      setTimeout(() => clearInterval(checkCaptchaText), 30000);

      const checkCopyButton = setInterval(() => {
        const copyBtn = Array.from(document.querySelectorAll("*")).find(el =>
          (el.innerText || '').trim() === "Copy" && (el.tagName === "BUTTON" || el.className.includes('btn'))
        );
        if (copyBtn) {
          copyBtn.click();
          showProgressNotification("📋 Copied Successfully", "Key copied!");
          clearInterval(checkCopyButton);
        }
      }, 1000);
      setTimeout(() => clearInterval(checkCopyButton), 120000);
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

    if (hostname.includes("bypass.city") || hostname.includes("adbypass.org")) {
      const siteName = hostname.includes("bypass.city") ? "bypass.city" : "adbypass.org";

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

              showProgressNotification("✅ Bypass Complete", "Returning to original tab...");

              setTimeout(() => {
                   window.open(redirectURL, "_self");
              }, 500);
          } else {
               showProgressNotification("✅ Bypass Complete", "Opening link...");
               if (targetUrl) {
                   GM_setValue("zerox.callbackTarget", targetUrl);
                   window.location.href = targetUrl;
               } else if (data && data.bypassData) {
                   window.location.href = data.bypassData;
               }
          }
      });

      const checkCloudflareErrorEnhanced = () => {
        if (document.body) {
          const bodyText = document.body.innerText || '';
          const pageTitle = document.title || '';
          if (bodyText.includes("Error 522") || bodyText.includes("Connection timed out") || pageTitle.includes("522") ||
              pageTitle.includes("Just a moment") || bodyText.includes("Please wait while we check your browser")) {
            showProgressNotification("⚠️ Cloudflare Error", `Refreshing ${siteName} in 3s...`);
            setTimeout(() => location.reload(), 3000);
          }
        }
      };
      checkCloudflareErrorEnhanced();
      setTimeout(checkCloudflareErrorEnhanced, 2000);

      let lastStatus = "";
      const statusInterval = setInterval(() => {
        if (!document.body) return;
        const content = document.body.innerText;
        if (content.includes("Internal server error") && lastStatus !== "server_error") {
          showProgressNotification("❌ Server Error", `${siteName} has issues.`);
          lastStatus = "server_error";
        } else if (content.includes("Link not found") && lastStatus !== "link_not_found") {
          showProgressNotification("🔗 Link Not Found", "Could not process link.");
          lastStatus = "link_not_found";
        } else if (content.includes("Processing") && lastStatus !== "processing") {
          showProgressNotification("⏳ Bypassing...", "Please wait...");
          lastStatus = "processing";
        }
      }, 500);
      return;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', executeBypass);
  } else {
    executeBypass();
  }
})();
