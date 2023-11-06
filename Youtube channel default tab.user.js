// ==UserScript==
// @name Youtube channel default tab
// @namespace http://tampermonkey.net/
// @run-at document-start
// @version 0.1
// @description try to take over the world!
// @author You
// @match https://www.youtube.com/*
// @icon https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant none
// ==/UserScript==

(() => {
// const RX_CHANNEL_HOME = /^(https?:\/\/www\.youtube\.com)(\/(user|channel|c)\/[^/]+)(\/?$|\/featured)/;
const RX_CHANNEL_HOME = /^(https?:\/\/www\.youtube\.com)((\/(@\\?.*))|\/(user|channel|c)\/[^\/]+(\/?$|\/featured))/;
const DEFAULT_TAB_HREF = "/videos";
// the byte/ascii sequence '0x12 0x06 v i d e o s' encoded with base64 and uri component encoding seems to correspond to the videos tab
const DEFAULT_TAB_ENDPOINT_PARAMS = encodeURIComponent(btoa(String.fromCharCode(0x12, 0x06) + "videos"));

if (RX_CHANNEL_HOME.test(location.href) && String(location.href).indexOf(DEFAULT_TAB_HREF) === -1) {
// this will get invoked when a youtube channel link is reached from a non-youtube origin page
// where we didn't rewrite the link
location.href = RegExp.$2 + DEFAULT_TAB_HREF;
return;
}

addEventListener('mousedown', event => {
const a = event.target.closest('a');

if (a && RX_CHANNEL_HOME.test(a.href)) {
// a channel link was clicked so it has to be rewritten before the actual navigation happens

// this makes sure the redirect above in line 15-20 is not needed as long as the link clicked is on a youtube page
// e.g. when opening a channel link in a new tab
a.href = RegExp.$2 + DEFAULT_TAB_HREF;

// without this the url in the browsers navigation bar will show the wrong url but the videos tab is still being loaded
try { a.data.commandMetadata.webCommandMetadata.url = RegExp.$2 + DEFAULT_TAB_HREF; } catch (e) {}

// this makes sure that the videos tab is the one actually being loaded
try { a.data.browseEndpoint.params = DEFAULT_TAB_ENDPOINT_PARAMS; } catch (e) {}
}
}, true);
})();