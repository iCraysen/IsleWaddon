addons.register({
    init: function(events) {
        events.on('onShowCharacterSelect', this.onShowCharacterSelect.bind(this));
        events.on('onGetPlayer', this.onGetPlayer.bind(this));
    },

    onShowCharacterSelect: function(obj) {
        if(window.MenuSTATUS === "true") {
            jQuery(".isleWaddon-uiMenu").remove();
            window.MenuSTATUS = "false"
        }
        jQuery(".isleWaddon-uiMenuButton").remove()
        window.menuButton("bottom:130px;right:10px;");
        window.buttonInGame = 0
        window.gameStarted = "false"
    },

    onGetPlayer: function() {
        if(window.MenuSTATUS === "true") {
            jQuery(".isleWaddon-uiMenu").remove();
            window.MenuSTATUS = "false"
        }
        jQuery(".isleWaddon-uiMenuButton").remove()
        window.menuButton("top:100px;right:340px;");
        window.buttonInGame = 1
    },
})

window.tooltipStyle =
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
window.tooltipTextStart = '<tr><td><div class="tooltip"><font color="#ffeb38">'
window.tooltipTextEnd = '</font><span class="tooltiptext">'
window.tooltipTextEndLine = '</span></div></td>'
 var L1 = window.tooltipTextStart+"   <font color='#48edff'>ISLEWADDON </font>" , L1_1 = window.tooltipTextEnd+"<font color='#ffeb38'>By Polfy#6924<br>Enjoy this add-on :p</font><br>I can't guarantee this add-on doesn't produce lag/fps drops or any issues<br>Notify me (Polfy#6924) of any bugs/problems on Discord"+window.tooltipTextEndLine
 var L2 = window.tooltipTextStart+" Hover here 🔍  " , L2_1 = window.tooltipTextEnd+"Put your cursor on all the menu items!"+window.tooltipTextEndLine
 var L3 = window.tooltipTextStart+" Version : "+window.Version+"  " , L3_1 = window.tooltipTextEnd+"Current add-on Version<br>For <font color='#ffeb38'>Isleward v0.3.2</font><br>► Link to the update log"+window.tooltipTextEndLine
 var L4 = window.tooltipTextStart+" " , L4_1 = window.tooltipTextEnd+"Direct link to<br>► Official wiki<br>► IsleWaddon Discord<br>► Online Map"+window.tooltipTextEndLine
 var L5 = window.tooltipTextStart+" Easy Salvage   " , L5_1 = window.tooltipTextEnd+"Enable fast salvage by pressing <font color='#ffeb38'>"+window.SalvageKey+"</font> on an item"+window.tooltipTextEndLine
 var L6 = window.tooltipTextStart+" Timer       " , L6_1 = window.tooltipTextEnd+"► Add an in-game timer that counts down until a boss respawns<br>► Play a sound before a boss respawns<br>► Click the 🔈/🔊 button to toggle on/off the sound"+window.tooltipTextEndLine
 var L8 = window.tooltipTextStart+" Whisper       " , L8_1 = window.tooltipTextEnd+"► Use <font color='#ffeb38'>/r</font> to quickly respond to whispers<br>► Play a sound when you receive a whisper<br>► Click the 🔈/🔊 button to toggle on/off the sound"+window.tooltipTextEndLine
var L10 = window.tooltipTextStart+" Hide Quests     " , L10_1 = window.tooltipTextEnd+"Hide the Quests tab"+window.tooltipTextEndLine
var L11 = window.tooltipTextStart+" Map     " , L11_1 = window.tooltipTextEnd+"In-game map<br><font color='#ffeb38'>You need to be on Char Selection to enable it</font><br>► Press <font color='#ffeb38'>n</font> in-game to open it<br>► Change the Size<br><font color='#ffeb38'>5</font> , <font color='#ffeb38'>6</font><br>► Change the Position<br><font color='#ffeb38'>7</font> , <font color='#ffeb38'>8</font> , <font color='#ffeb38'>9</font> , <font color='#ffeb38'>0</font>"+window.tooltipTextEndLine
var L12 = window.tooltipTextStart+" Stats range    " , L12_1 = window.tooltipTextEnd+"Add more information about implicit stats and level 20 roll range on items<br>⚠️ 1 stat can be a stack of 2 or more of the same stat (Can't track it)"+window.tooltipTextEndLine
var L13 = window.tooltipTextStart+" Combat Log     " , L13_1 = window.tooltipTextEnd+"Add a combat log in the <font color='green'>Reputation</font> chat<br>⚠️ Can cause lag/fps drops"+window.tooltipTextEndLine
var L14 = window.tooltipTextStart+" + Little Features" , L14_1 = window.tooltipTextEnd+"► Add the amount of sets you can trade to Vikar<br>► Add stats range for runes"

window.MenuAddon = function(){
    window.menu = jQuery('<div class="isleWaddon-uiMenu" style="position:absolute;right:10px;bottom:164px;"></div>').appendTo(jQuery('.ui-container'))
    var src = window.tooltipStyle+'<table>'
    var onClickX =`window.menuButtonXPress()`
    var drawButtonX = '<button id="ButtonX" style="color:rgb(0,0,0); width:23px; background:rgb(255,0,0);" onclick="'+onClickX+'" type="button">X</button>'
    src += L1+L1_1+'<td>'+"  "+drawButtonX+'</td>'
    src += L2+L2_1
    var onClickLinkL =`window.ButtonLinkL()`
    var drawButtonLinkL = '<button id="ButtonLinkL" style="color:rgb(0,0,0); width:40px; background:rgb(139,145,232);" onclick="'+onClickLinkL+'" type="button">Log</button>'
    src += L3+L3_1+'<td>'+drawButtonLinkL+'</td>'
    var onClickLinkW =`window.ButtonLinkW()`
    var drawButtonLinkW = '<button id="ButtonLinkW" style="color:rgb(0,0,0); width:40px; background:rgb(139,145,232);" onclick="'+onClickLinkW+'" type="button">Wiki</button>'
    var onClickLinkD =`window.ButtonLinkD()`
    var drawButtonLinkD = '<button id="ButtonPvpLinkD" style="color:rgb(0,0,0); width:65px; background:rgb(55,67,232);" onclick="'+onClickLinkD+'" type="button">Discord</button>'
    var onClickLinkM =`window.ButtonLinkM()`
    var drawButtonLinkM = '<button id="ButtonLinkM" style="color:rgb(0,0,0); width:40px; background:rgb(174, 13, 221);" onclick="'+onClickLinkM+'" type="button">Map</button>'
    src += L4+drawButtonLinkW+"    "+drawButtonLinkD+L4_1+'<td>'+drawButtonLinkM+'</td>'
    var onClickButtonSalvage =`window.ButtonPressSalvage()`
    if (window.SalvageSTATUS === "true") {
        var drawButtonSalvage = '<button id="ButtonSalvage" style="color:rgb(0,0,0); width:40px; background:rgb(0,255,0);" onclick="'+onClickButtonSalvage+'" type="button">ON</button>'
    }else{
        drawButtonSalvage = '<button id="ButtonSalvage" style="color:rgb(0,0,0); width:40px; background:rgb(255,0,0);" onclick="'+onClickButtonSalvage+'" type="button">OFF</button>'
    }
    src += L5+L5_1+'<td>'+drawButtonSalvage+'</td>'
    var onClickButtonTimer =`window.ButtonPressTimer()`
    if (window.TimerSTATUS === "true") {
        var drawButtonTimer = '<button id="ButtonTimer" style="color:rgb(0,0,0); width:40px; background:rgb(0,255,0);" onclick="'+onClickButtonTimer+'" type="button">ON</button>'
    }else{
        drawButtonTimer = '<button id="ButtonTimer" style="color:rgb(0,0,0); width:40px; background:rgb(255,0,0);" onclick="'+onClickButtonTimer+'" type="button">OFF</button>'
    }
    var onClickButtonTimerSound =`window.ButtonPressTimerSound()`
    if (window.TimerSoundSTATUS === "true") {
        var drawButtonTimerSound = '<button id="ButtonTimerSound" style="color:rgb(0,0,0); width:40px; background:rgb(0,255,0);" onclick="'+onClickButtonTimerSound+'" type="button">🔊</button>'
    }else{
        drawButtonTimerSound = '<button id="ButtonTimerSound" style="color:rgb(0,0,0); width:40px; background:rgb(255,0,0);" onclick="'+onClickButtonTimerSound+'" type="button">🔈</button>'
    }
    src += L6+drawButtonTimer+L6_1+'<td>'+drawButtonTimerSound+'</td>'
    var onClickButtonWhisperSound =`window.ButtonPressWhisperSound()`
    if (window.WhisperSoundSTATUS === "true") {
        var drawButtonWhisperSound = '<button id="ButtonWhisperSound" style="color:rgb(0,0,0); width:40px; background:rgb(0,255,0);" onclick="'+onClickButtonWhisperSound+'" type="button">🔊</button>'
    }else{
        drawButtonWhisperSound = '<button id="ButtonWhisperSound" style="color:rgb(0,0,0); width:40px; background:rgb(255,0,0);" onclick="'+onClickButtonWhisperSound+'" type="button">🔈</button>'
    }
    src += L8+L8_1+'<td>'+drawButtonWhisperSound+'</td>'
    var onClickButtonQuestHide =`window.ButtonPressQuestHide()`
    if (window.QuestHideSTATUS === "true") {
        var drawButtonQuestHide = '<button id="ButtonQuestHide" style="color:rgb(0,0,0); width:40px; background:rgb(0,255,0);" onclick="'+onClickButtonQuestHide+'" type="button">ON</button>'
    }else{
        drawButtonQuestHide = '<button id="ButtonQuestHide" style="color:rgb(0,0,0); width:40px; background:rgb(255,0,0);" onclick="'+onClickButtonQuestHide+'" type="button">OFF</button>'
    }
    src += L10+L10_1+'<td>'+drawButtonQuestHide+'</td>'
    var onClickButtonMap =`window.ButtonPressMap()`
    var onClickButtonMapReset =`window.ButtonPressMapReset()`
    var drawButtonMapReset = '<button id="ButtonMap" style="color:rgb(0,0,0); width:55px; background:rgb(139,145,232);" onclick="'+onClickButtonMapReset+'" type="button">Reset</button>'
    if (window.MapSTATUS === "true") {
        var drawButtonMap = '<button id="ButtonMap" style="color:rgb(0,0,0); width:40px; background:rgb(0,255,0);" onclick="'+onClickButtonMap+'" type="button">ON</button>'
    }else{
        drawButtonMap = '<button id="ButtonMap" style="color:rgb(0,0,0); width:40px; background:rgb(255,0,0);" onclick="'+onClickButtonMap+'" type="button">OFF</button>'
    }
    src += L11+drawButtonMapReset+" "+L11_1+'<td>'+drawButtonMap+'</td>'
    var onClickButtonStatsRange =`window.ButtonPressStatsRange()`
    if (window.StatsRangeSTATUS === "true") {
        var drawButtonStatsRange = '<button id="ButtonStatsRange" style="color:rgb(0,0,0); width:40px; background:rgb(0,255,0);" onclick="'+onClickButtonStatsRange+'" type="button">ON</button>'
    }else{
        drawButtonStatsRange = '<button id="ButtonStatsRange" style="color:rgb(0,0,0); width:40px; background:rgb(255,0,0);" onclick="'+onClickButtonStatsRange+'" type="button">OFF</button>'
    }
    src += L12+L12_1+'<td>'+drawButtonStatsRange+'</td>'
    var onClickButtonCombatLog =`window.ButtonPressCombatLog()`
    if (window.CombatLogSTATUS === "true") {
        var drawButtonCombatLog = '<button id="ButtonCombatLog" style="color:rgb(0,0,0); width:40px; background:rgb(0,255,0);" onclick="'+onClickButtonCombatLog+'" type="button">ON</button>'
    }else{
        drawButtonCombatLog = '<button id="ButtonCombatLog" style="color:rgb(0,0,0); width:40px; background:rgb(255,0,0);" onclick="'+onClickButtonCombatLog+'" type="button">OFF</button>'
    }
    src += L13+L13_1+'<td>'+drawButtonCombatLog+'</td>'
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
    src += window.tooltipTextEndLine
    src += '</table>'
    window.menu.html(src);
}

// BUTTON CODE //

window.menuButton = function(buttonPos){
    window.menuButtonTooltip = jQuery('<div class="isleWaddon-uiMenuButton" style="position:absolute;'+buttonPos+'"></div>').appendTo(jQuery('.ui-container'));
    var src = window.tooltipStyle+'<table#1>';
    var onClick =`window.menuButtonPress()`
    var drawButton = '<button id="ButtonMenu" style="color:rgb(255,255,30); width:65px; background:rgba(55, 48, 65, 0.9);" onclick="'+onClick+'" type="button">Isle Waddon</button>';
    src += '<tr><td></td><td>'+drawButton+'</td>';
    src += '</table>';
    window.menuButtonTooltip.html(src)
}
window.menuButtonPress = function(){
    jQuery(".isleWaddon-uiMenuButton").remove()
    if (window.buttonInGame === 1) {window.menuButton("top:100px;right:340px;")}
    else {window.menuButton("bottom:130px;right:10px;")}
    if (window.MenuSTATUS === "false"){
        window.MenuAddon();
        window.MenuSTATUS = "true"
    }else{
        window.MenuSTATUS = "false";
        jQuery(".isleWaddon-uiMenu").remove();
    }
}
window.menuButtonXPress = function(){
    window.MenuSTATUS = "false";
    jQuery(".isleWaddon-uiMenu").remove();
}
window.ButtonLinkL = function(){
    jQuery(".isleWaddon-uiMenu").remove()
    window.MenuAddon();
    window.open('https://polfy.github.io/'+window.initIsleWaddonVersion+'/Version_Log.text', '_blank');
}
window.ButtonLinkW = function(){
    jQuery(".isleWaddon-uiMenu").remove()
    window.MenuAddon();
    window.open('http://wiki.isleward.com/Main_Page', '_blank');
}
window.ButtonLinkD = function(){
    jQuery(".isleWaddon-uiMenu").remove()
    window.MenuAddon();
    window.open('https://discord.gg/3P43RRb', '_blank');
}
window.ButtonLinkM = function(){
    jQuery(".isleWaddon-uiMenu").remove()
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
    jQuery(".isleWaddon-uiMenu").remove()
    window.MenuAddon();
    window.setUserData();
}
window.ButtonPressTimer = function(){
    if(window.TimerSTATUS === "true") {
        jQuery(".isleWaddon-uiTimer").remove()
        window.TimerSTATUS = "false"
        window.TimerSoundSTATUS = "false"
    } else {
        window.TimerSTATUS = "true"
    }
    jQuery(".isleWaddon-uiMenu").remove()
    window.MenuAddon();
    window.setUserData();
}
window.ButtonPressTimerSound = function(){
    if(window.TimerSoundSTATUS === "true") {
        window.TimerSoundSTATUS = "false"
    } else {
	if(window.TimerSTATUS === "true") {window.TimerSoundSTATUS = "true"}
    }
    jQuery(".isleWaddon-uiMenu").remove()
    window.MenuAddon();
    window.setUserData();
}
window.ButtonPressWhisperSound = function(){
    if(window.WhisperSoundSTATUS === "true") {
        window.WhisperSoundSTATUS = "false"
    } else {
        window.WhisperSoundSTATUS = "true"
    }
    jQuery(".isleWaddon-uiMenu").remove()
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
    jQuery(".isleWaddon-uiMenu").remove()
    window.MenuAddon();
    window.setUserData();
}
window.ButtonPressMap = function(){
    if(window.MapSTATUS === "true") {
        window.MapPopUp = jQuery('<div class="isleWaddon-uiMapPopUp" style="position:absolute;z-index:2;bottom:210px;right:60px;width: 210px;padding: 5px;border: 2px solid gray;background-color: rgb(55, 48, 65);text-align: center;"></div>').appendTo(jQuery('.ui-container'))
        src = "<font color='#ffeb38'>You need to reload the game to fully disable the in-game Map</font>"
        window.MapPopUp.html(src);
        setTimeout(function(){jQuery(".isleWaddon-uiMapPopUp").remove()},4000)
    }
    if(window.gameStarted === "true") {
        if(window.MapSTATUS === "false") {
            window.MapPopUp = jQuery('<div class="isleWaddon-uiMapPopUp" style="position:absolute;z-index:2;bottom:210px;right:60px;width: 210px;padding: 5px;border: 2px solid gray;background-color: rgb(55, 48, 65);text-align: center;"></div>').appendTo(jQuery('.ui-container'))
            var src = "<font color='#ffeb38'>You need to be on Char Selection Screen to enable the in-game Map</font>"
            window.MapPopUp.html(src);
            setTimeout(function(){jQuery(".isleWaddon-uiMapPopUp").remove()},4000)
        }
    } else {
        if(window.MapSTATUS === "false") {
            $.getScript("https://polfy.github.io/"+window.initIsleWaddonVersion+"/IsleWaddonFeature/MiniMap.js");
        }
        window.MapSTATUS = "true"
    }
    jQuery(".isleWaddon-uiMenu").remove()
    window.MenuAddon();
}
window.ButtonPressMapReset = function(){
    if(window.miniMapLoaded === "true") {
        window.mapScale = 2;
        window.map_xOffset=0;
        window.map_yOffset=0;
        window.drawMap();
        window.setUserData();
    }
    jQuery(".isleWaddon-uiMenu").remove()
    window.MenuAddon();
}
window.ButtonPressStatsRange = function(){
    if(window.StatsRangeSTATUS === "true"){
        window.StatsRangeSTATUS = "false"
    } else {
        window.StatsRangeSTATUS = "true"
    }
    jQuery(".isleWaddon-uiMenu").remove()
    window.MenuAddon();
    window.setUserData();
}
window.ButtonPressCombatLog = function(){
    if(window.CombatLogSTATUS === "true") {
        window.CombatLogSTATUS = "false"
    } else {
        window.CombatLogSTATUS = "true"
        if(window.combatLogLoaded !== "true") {
            $.getScript("https://polfy.github.io/"+window.initIsleWaddonVersion+"/IsleWaddonFeature/CombatLog.js");
            window.combatLogLoaded = "true";
        }
        window.deferTillChat(function(){jQuery('<div class="list-message color-'+"yellowB"+' chat">' +"The Combat log is in the 'Reputation' chat tab"+ '</div>').appendTo(jQuery(".uiMessages .list"))});
        window.deferTillChat(function(){jQuery('<div class="list-message color-'+"yellowB"+' chat">' +"⚠️ The Combat log can cause some fps drops/lag"+ '</div>').appendTo(jQuery(".uiMessages .list"))});
        jQuery(".uiMessages .list").scrollTop(9999999);
    }
    jQuery(".isleWaddon-uiMenu").remove()
    window.MenuAddon();
}
window.menuButton("bottom:130px;right:10px;");
