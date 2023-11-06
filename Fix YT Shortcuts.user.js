// ==UserScript==
// @name          Fix YT Shortcuts
// @version       1.0
// @match         https://www.youtube.com/*
// @icon          https://www.google.com/s2/favicons?domain=youtube.com
// @description   Disable the element focusing that ruins keyboard shorcuts!
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

// YouTube loads its pages with ajax, so use this to run the
// script whenever the player elements appear
waitForKeyElements (".ytp-chrome-bottom", removeTabFeature)

function removeTabFeature () {
    var tabIndexes = document.querySelectorAll("*[tabindex]");
    for (let i = 0; i < tabIndexes.length; i++) {
      let tabIndex = tabIndexes[i].getAttribute("tabindex");
      if (tabIndex === "-1") continue;

      tabIndexes[i].removeAttribute("tabindex");
    }
}