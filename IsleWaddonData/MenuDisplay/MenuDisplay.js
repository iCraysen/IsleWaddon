var tooltipTextStart = '<tr><td><div class="tooltip"><font color="#ffeb38">'
var tooltipTextEnd = '</font><span class="tooltiptext">'
var tooltipTextEndLine = '</span></div></td>'
 var L1 = tooltipTextStart+"    <font color='#48edff'>ISLEWADDON</font>   " , L1_1 = tooltipTextEnd+"<font color='#ffeb38'>By Polfy#6924<br>Enjoy this add-on :p</font><br>I can't guarantee this add-on doesn't produce lag/fps drops<br>Notify me (Polfy#6924) of any bugs/problems on Discord"+tooltipTextEndLine
 var L2 = tooltipTextStart+" Hover here 🔍" , L2_1 = tooltipTextEnd+"Put your cursor on all the menu items!"+tooltipTextEndLine
 var L3 = tooltipTextStart+" Version : "+window.Version+" " , L3_1 = tooltipTextEnd+"Current add-on Version<br>For <font color='#ffeb38'>Isleward v0.3.2</font><br>► Link to the update log"+tooltipTextEndLine
 var L4 = tooltipTextStart+" " , L4_1 = tooltipTextEnd+"Direct link to<br>► official wiki<br>► IsleWaddon Discord<br>► Online Map"+tooltipTextEndLine
 var L5 = tooltipTextStart+" Easy Salvage " , L5_1 = tooltipTextEnd+"Enable fast salvage by pressing <font color='#ffeb38'>"+window.SalvageKey+"</font> on an item<br>"+tooltipTextEndLine
 var L6 = tooltipTextStart+" Timer ⏳ " , L6_1 = tooltipTextEnd+"Add an in-game timer that counts down until a boss respawns"+tooltipTextEndLine
 var L7 = tooltipTextStart+" ► Timer Sound " , L7_1 = tooltipTextEnd+"Play a sound before a boss respawns"+tooltipTextEndLine
 var L8 = tooltipTextStart+" Whisper" , L8_1 = tooltipTextEnd+"Use <font color='#ffeb38'>/r</font> to quickly respond to whispers"+tooltipTextEndLine
 var L9 = tooltipTextStart+" ► Whisper Sound " , L9_1 = tooltipTextEnd+"Play a sound when you receive a whisper"+tooltipTextEndLine
var L10 = tooltipTextStart+" Hide Quests " , L10_1 = tooltipTextEnd+"Hide the Quests tab"+tooltipTextEndLine
var L11 = tooltipTextStart+" Map " , L11_1 = tooltipTextEnd+"In-game map<br>► Change the Size<br><font color='#ffeb38'>+</font> , <font color='#ffeb38'>-</font><br>► Change the Position<br><font color='#ffeb38'>7</font> , <font color='#ffeb38'>8</font> , <font color='#ffeb38'>9</font> , <font color='#ffeb38'>0</font>"+tooltipTextEndLine
var L12 = tooltipTextStart+" Stats range " , L12_1 = tooltipTextEnd+"Add more information about implicit stats and level 20 roll range on items<br>⚠️ 1 stat can be a stack of 2 or more of the same stat (Can't track it)"+tooltipTextEndLine
var L13 = tooltipTextStart+" Combat Log " , L13_1 = tooltipTextEnd+"Add a combat log in the <font color='green'>Reputation</font> chat<br>⚠️ Can cause lag/fps drops"+tooltipTextEndLine
var L14 = tooltipTextStart+" + Little Features" , L14_1 = tooltipTextEnd+"► Add the amount of sets you can trade to Vikar<br>► Add stats range for runes"
var tooltipStyle =
    `<style>
table {
background-color: rgba(55, 48, 65, 0.9);
border: 2px solid gray;
}
/* Tooltip container */
.tooltip {
position: relative;
display: inline-block;
}
/* Tooltip text */
.tooltip .tooltiptext {
visibility: hidden;
width: 120px;
background-color: black;
color: #fff;
text-align: center;
padding: 5px 0;
border-radius: 6px;
/* Position the tooltip text - see examples below! */
position: absolute;
z-index: 1;
width: 250px;
top: -5px;
right: 105%;
}
.tooltip:hover .tooltiptext {
visibility: visible;
}
</style>
`
window.MenuAddon = function(){
    window.menu = jQuery('<div class="addon-loader" style="position:absolute;right:10px;bottom:164px;"></div>').appendTo(jQuery('.ui-container'))
    var src = tooltipStyle+'<table>'
    var onClickX =`window.menuButtonXPress()`
    var drawButtonX = '<button id="ButtonX" style="color:rgb(0,0,0); width:23px; background:rgb(255,0,0);" onclick="'+onClickX+'" type="button">X</button>'
    src += L1+drawButtonX+L1_1
    src += L2+L2_1
    var onClickLinkL =`window.ButtonLinkL()`
    var drawButtonLinkL = '<button id="ButtonLinkL" style="color:rgb(0,0,0); width:40px; background:rgb(139,145,232);" onclick="'+onClickLinkL+'" type="button">Log</button>'
    src += L3+drawButtonLinkL+L3_1
    var onClickLinkW =`window.ButtonLinkW()`
    var drawButtonLinkW = '<button id="ButtonLinkW" style="color:rgb(0,0,0); width:40px; background:rgb(139,145,232);" onclick="'+onClickLinkW+'" type="button">Wiki</button>'
    var onClickLinkD =`window.ButtonLinkD()`
    var drawButtonLinkD = '<button id="ButtonPvpLinkD" style="color:rgb(0,0,0); width:65px; background:rgb(55,67,232);" onclick="'+onClickLinkD+'" type="button">Discord</button>'
    var onClickLinkM =`window.ButtonLinkM()`
    var drawButtonLinkM = '<button id="ButtonLinkM" style="color:rgb(0,0,0); width:40px; background:rgb(174, 13, 221);" onclick="'+onClickLinkM+'" type="button">Map</button>'
    src += L4+drawButtonLinkW+"  "+drawButtonLinkD+"  "+drawButtonLinkM+L4_1
    var onClickButtonSalvage =`window.ButtonPressSalvage()`
    if (window.SalvageSTATUS === "true") {
        var drawButtonSalvage = '<button id="ButtonSalvage" style="color:rgb(0,0,0); width:40px; background:rgb(0,255,0);" onclick="'+onClickButtonSalvage+'" type="button">ON</button>'
    }else{
        drawButtonSalvage = '<button id="ButtonSalvage" style="color:rgb(0,0,0); width:40px; background:rgb(255,0,0);" onclick="'+onClickButtonSalvage+'" type="button">OFF</button>'
    }
    src += L5+drawButtonSalvage+L5_1
    var onClickButtonTimer =`window.ButtonPressTimer()`
    if (window.TimerSTATUS === "true") {
        var drawButtonTimer = '<button id="ButtonTimer" style="color:rgb(0,0,0); width:40px; background:rgb(0,255,0);" onclick="'+onClickButtonTimer+'" type="button">ON</button>'
    }else{
        drawButtonTimer = '<button id="ButtonTimer" style="color:rgb(0,0,0); width:40px; background:rgb(255,0,0);" onclick="'+onClickButtonTimer+'" type="button">OFF</button>'
    }
    src += L6+drawButtonTimer+L6_1
    var onClickButtonTimerSound =`window.ButtonPressTimerSound()`
    if (window.TimerSoundSTATUS === "true") {
        var drawButtonTimerSound = '<button id="ButtonTimerSound" style="color:rgb(0,0,0); width:40px; background:rgb(0,255,0);" onclick="'+onClickButtonTimerSound+'" type="button">ON</button>'
    }else{
        drawButtonTimerSound = '<button id="ButtonTimerSound" style="color:rgb(0,0,0); width:40px; background:rgb(255,0,0);" onclick="'+onClickButtonTimerSound+'" type="button">OFF</button>'
    }
    src += L7+drawButtonTimerSound+L7_1
    src += L8+L8_1
    var onClickButtonWhisperSound =`window.ButtonPressWhisperSound()`
    if (window.WhisperSoundSTATUS === "true") {
        var drawButtonWhisperSound = '<button id="ButtonWhisperSound" style="color:rgb(0,0,0); width:40px; background:rgb(0,255,0);" onclick="'+onClickButtonWhisperSound+'" type="button">ON</button>'
    }else{
        drawButtonWhisperSound = '<button id="ButtonWhisperSound" style="color:rgb(0,0,0); width:40px; background:rgb(255,0,0);" onclick="'+onClickButtonWhisperSound+'" type="button">OFF</button>'
    }
    src += L9+drawButtonWhisperSound+L9_1
    var onClickButtonQuestHide =`window.ButtonPressQuestHide()`
    if (window.QuestHideSTATUS === "true") {
        var drawButtonQuestHide = '<button id="ButtonQuestHide" style="color:rgb(0,0,0); width:40px; background:rgb(0,255,0);" onclick="'+onClickButtonQuestHide+'" type="button">ON</button>'
    }else{
        drawButtonQuestHide = '<button id="ButtonQuestHide" style="color:rgb(0,0,0); width:40px; background:rgb(255,0,0);" onclick="'+onClickButtonQuestHide+'" type="button">OFF</button>'
    }
    src += L10+drawButtonQuestHide+L10_1
    var onClickButtonMap =`window.ButtonPressMap()`
    var onClickButtonMapReset =`window.ButtonPressMapReset()`
    var drawButtonMapReset = '<button id="ButtonMap" style="color:rgb(0,0,0); width:55px; background:rgb(139,145,232);" onclick="'+onClickButtonMapReset+'" type="button">Reset</button>'
    if (window.MapSTATUS === "true") {
        var drawButtonMap = '<button id="ButtonMap" style="color:rgb(0,0,0); width:40px; background:rgb(0,255,0);" onclick="'+onClickButtonMap+'" type="button">ON</button>'
    }else{
        drawButtonMap = '<button id="ButtonMap" style="color:rgb(0,0,0); width:40px; background:rgb(255,0,0);" onclick="'+onClickButtonMap+'" type="button">OFF</button>'
    }
    src += L11+drawButtonMap+" "+drawButtonMapReset+L11_1
    var onClickButtonStatsRange =`window.ButtonPressStatsRange()`
    if (window.StatsRangeSTATUS === "true") {
        var drawButtonStatsRange = '<button id="ButtonStatsRange" style="color:rgb(0,0,0); width:40px; background:rgb(0,255,0);" onclick="'+onClickButtonStatsRange+'" type="button">ON</button>'
    }else{
        drawButtonStatsRange = '<button id="ButtonStatsRange" style="color:rgb(0,0,0); width:40px; background:rgb(255,0,0);" onclick="'+onClickButtonStatsRange+'" type="button">OFF</button>'
    }
    src += L12+drawButtonStatsRange+L12_1
    var onClickButtonCombatLog =`window.ButtonPressCombatLog()`
    if (window.CombatLogSTATUS === "true") {
        var drawButtonCombatLog = '<button id="ButtonCombatLog" style="color:rgb(0,0,0); width:40px; background:rgb(0,255,0);" onclick="'+onClickButtonCombatLog+'" type="button">ON</button>'
    }else{
        drawButtonCombatLog = '<button id="ButtonCombatLog" style="color:rgb(0,0,0); width:40px; background:rgb(255,0,0);" onclick="'+onClickButtonCombatLog+'" type="button">OFF</button>'
    }
    src += L13+drawButtonCombatLog+L13_1
    src += L14+L14_1
    if(window.gameStarted === "true") {
    var numhours = parseInt(player.stats.stats.played / 3600);
    var numminutes = parseInt((player.stats.stats.played % 3600) / 60);
    var TextPlayed = "";
    if (numhours > 0) {
        TextPlayed += numhours+" hour";
        if (numhours > 1) { TextPlayed += "s "; }
        else { TextPlayed += " "; }
        TextPlayed += "<br>and ";
    }
    TextPlayed += numminutes+" minutes";
    src += "<br>► You have played this character for <br><font color='#ffeb38'>"+TextPlayed+"</font><br>(Not accurate)"+'</span></div></td>'
    }
    src += tooltipTextEndLine
    src += '</table>'
    window.menu.html(src);
}

// BUTTON CODE //

window.menuButton = function(){
    window.menuButtonTooltip = jQuery('<div class="menuButton" style="position:absolute;bottom:121px;right:10px;"></div>').appendTo(jQuery('.ui-container'));
    var src = tooltipStyle+'<table#1>';
    var onClick =`window.menuButtonPress()`
    if (window.creatorHere == 0) {var drawButton = '<button id="ButtonMenu" style="color:rgb(255,255,30); width:65px; background:rgba(55, 48, 65, 0.9);" onclick="'+onClick+'" type="button">Isle Waddon</button>';}
    else {drawButton = '<button id="ButtonMenu" style="color:rgb(255,150,0); width:65px; background:rgba(55, 48, 65, 0.9);" onclick="'+onClick+'" type="button">Isle Waddon</button>';}
    src += '<tr><td></td><td>'+drawButton+'</td>';
    src += '</table>';
    window.menuButtonTooltip.html(src)
}
window.menuButtonPress = function(){
    jQuery(".menuButton").remove()
    window.menuButton();
    if (window.MenuSTATUS === "false"){
        window.MenuAddon();
        window.MenuSTATUS = "true"
    }else{
        window.MenuSTATUS = "false";
        jQuery(".addon-loader").remove();
    }
}
window.menuButtonXPress = function(){
    window.MenuSTATUS = "false";
    jQuery(".addon-loader").remove();
}
window.ButtonLinkL = function(){
    jQuery(".addon-loader").remove()
    window.MenuAddon();
    window.open('https://raw.githubusercontent.com/Polfy/IsleWaddon/master/Version_Log.text', '_blank');
}
window.ButtonLinkW = function(){
    jQuery(".addon-loader").remove()
    window.MenuAddon();
    window.open('http://wiki.isleward.com/Main_Page', '_blank');
}
window.ButtonLinkD = function(){
    jQuery(".addon-loader").remove()
    window.MenuAddon();
    window.open('https://discord.gg/3P43RRb', '_blank');
}
window.ButtonLinkM = function(){
    jQuery(".addon-loader").remove()
    window.MenuAddon();
    window.open('https://polfy.github.io/isleward-wiki-map/Zone/Fjolarok/', '_blank');
}
window.ButtonPressSalvage = function(){
    if(window.SalvageSTATUS === "true") {
        window.SalvageSTATUS = "false"
    } else {
        window.SalvageSTATUS = "true"
        window.deferTillChat(function(){jQuery('<div class="list-message color-'+"yellowB"+' chat">' +"⚠️ Pressing '"+window.SalvageKey+"' on an item will now salvage it"+ '</div>').appendTo(jQuery(".uiMessages .list"))});
        jQuery(".uiMessages .list").scrollTop(9999999);
    }
    jQuery(".addon-loader").remove()
    window.MenuAddon();
    window.setUserData();
}
window.ButtonPressTimer = function(){
    if(window.TimerSTATUS === "true") {
        jQuery(".Add-onTimer").remove()
        window.TimerSTATUS = "false"
        window.TimerSoundSTATUS = "false"
    } else {
        window.TimerSTATUS = "true"
    }
    jQuery(".addon-loader").remove()
    window.MenuAddon();
    window.setUserData();
}
window.ButtonPressTimerSound = function(){
    if(window.TimerSoundSTATUS === "true") {
        window.TimerSoundSTATUS = "false"
    } else {
	if(window.TimerSTATUS === "true") {window.TimerSoundSTATUS = "true"}
    }
    jQuery(".addon-loader").remove()
    window.MenuAddon();
    window.setUserData();
}
window.ButtonPressWhisperSound = function(){
    if(window.WhisperSoundSTATUS === "true") {
        window.WhisperSoundSTATUS = "false"
    } else {
        window.WhisperSoundSTATUS = "true"
    }
    jQuery(".addon-loader").remove()
    window.MenuAddon();
    window.setUserData();
}
window.ButtonPressQuestHide = function(){
    if(window.QuestHideSTATUS === "true") {
        window.QuestHideSTATUS = "false"
        $(".ui-container .right .uiQuests .heading").text("Quests");
        $(".ui-container .right .uiQuests .list").toggle(true);
    } else {
        window.QuestHideSTATUS = "true"
        $(".ui-container .right .uiQuests .heading").text("Quests hidden ❌ ");
        $(".ui-container .right .uiQuests .list").toggle(false);
    }
    jQuery(".addon-loader").remove()
    window.MenuAddon();
    window.setUserData();
}
window.ButtonPressMap = function(){
    if(window.MapSTATUS === "true") {
        window.MapSTATUS = "false";
        window.toggleMap();
        jQuery(".addon-loader").remove()
        window.MenuAddon();
    } else {
        window.MapSTATUS = "true";
        window.toggleMap();
        jQuery(".addon-loader").remove()
        window.MenuAddon();
    }
    jQuery(".addon-loader").remove()
    window.MenuAddon();
}
window.ButtonPressMapReset = function(){
    window.mapScale = 2;
    window.map_xOffset=0;
    window.map_yOffset=0;
    window.drawMap();
    window.setUserData();
    jQuery(".addon-loader").remove()
    window.MenuAddon();
}
window.ButtonPressStatsRange = function(){
    if(window.StatsRangeSTATUS === "true") {
        window.StatsRangeSTATUS = "false"
    } else {
        window.StatsRangeSTATUS = "true"
    }
    jQuery(".addon-loader").remove()
    window.MenuAddon();
    window.setUserData();
}
window.ButtonPressCombatLog = function(){
    if(window.CombatLogSTATUS === "true") {
        window.CombatLogSTATUS = "false"
    } else {
        window.CombatLogSTATUS = "true"
        window.deferTillChat(function(){jQuery('<div class="list-message color-'+"yellowB"+' chat">' +"The Combat log is in the 'Reputation' chat tab"+ '</div>').appendTo(jQuery(".uiMessages .list"))});
        window.deferTillChat(function(){jQuery('<div class="list-message color-'+"yellowB"+' chat">' +"⚠️ The Combat log can cause some fps drops/lag"+ '</div>').appendTo(jQuery(".uiMessages .list"))});
        jQuery(".uiMessages .list").scrollTop(9999999);
    }
    jQuery(".addon-loader").remove()
    window.MenuAddon();
    window.setUserData();
}
window.menuButton();
