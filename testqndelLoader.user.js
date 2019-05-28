// ==UserScript==
// @name         IsleWaddon
// @namespace    IsleWaddon
// @version      1.0
// @description  REad README
// @author       Polfy's
// @match        play.isleward.com*
// ==/UserScript==
var d=a=>window.$?$.getScript`https://qndel.github.io/IslewardAddonBundle/IsleWaddon.js`:setTimeout(d,50);d()

//version to paste in console if not using tampermonkey:
/*
$.getScript`https://qndel.github.io/IslewardAddonBundle/core.js`;
wait for a second then
window.loadAddonBundlePanel();
*/
