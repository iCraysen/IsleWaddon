// ==UserScript==
// @name         IsleWaddon TETS COMBAT LOG
// @namespace    Isleward.Waddon
// @version      4.0
// @description  Read README here : https://github.com/Polfy/IsleWaddon
// @author       Polfy's
// @match        play.isleward.com*
// @grant        none
// ==/UserScript==

// TempFix of Windows double load //
if (window.stopTwiceLoad !== "true") {
    window.stopTwiceLoad = "true"

    function initIsleWaddon() {
        $.getScript("https://polfy.github.io/IsleWaddon/IsleWaddonData/MenuDisplay/MenuDisplay.js")
        $.getScript("https://polfy.github.io/IsleWaddon/IsleWaddonData/RuneToolTip/RuneToolTip.js")
    }

    window.SalvageKey = "f"
    window.gameStarted = "false"
    window.MenuSTATUS = "false"
    window.MapSTATUS = "false"
    window.Version = "0.5.3"
    var audioElement
    // DEFAULT SETTINGS //

    // SEND CHAT MSG FUNCTION //
    window.deferTillChat = function(method) {
        if (jQuery(".uiMessages .list")[0] !== undefined) {
            method();
        } else {
            setTimeout(function() { deferTillChat(method) }, 50);
        }
    }
    // COMBAT LOG VALUES //
    var idToName = {}
    var inCombatWith = {}

    // INVENTORY POSITION + EXPAND STATS RANGES VALUES //
    var itemPos = -1
    var Obj = -1
    String.prototype.replaceAll = String.prototype.replaceAll || function(string, replaced) {
    return this.replace(new RegExp(string, 'g'), replaced);
    };
    var colorTooltip
    var text
    var numberOfStat
    var weaponMult = 1
    var rangeDmg
    var rangeArmor

    // GET USER SETTINGS //

    window.SalvageSTATUS = "false"
    window.TimerSTATUS = "true"
    window.TimerSoundSTATUS = "true"
    window.WhisperSoundSTATUS = "true"
    window.StatsRangeSTATUS = "false"
    window.QuestHideSTATUS = "false"
    window.CombatLogSTATUS = "false"
    window.mapScale = 2
    window.map_xOffset = 0
    window.map_yOffset = 0

    window.setUserData = function() {
        localStorage.setObject('IsleWaddonUserData', {/*newtest:newtest,*/ SalvageSTATUS:window.SalvageSTATUS, TimerSTATUS:window.TimerSTATUS, TimerSoundSTATUS:window.TimerSoundSTATUS, WhisperSoundSTATUS:window.WhisperSoundSTATUS, StatsRangeSTATUS:window.StatsRangeSTATUS, QuestHideSTATUS:window.QuestHideSTATUS, CombatLogSTATUS:window.CombatLogSTATUS, map_xOffset:window.map_xOffset, map_yOffset:window.map_yOffset, mapScale:window.mapScale})
    }

    function initUserData() {
        console.log('*************************')
        console.log('*********WARNING*********')
        console.log('**IF YOU LOG IWD ISSUES**')
        console.log('****IsleWaddon LOADED****')
        console.log('*************************')
        var userData = localStorage.getObject('IsleWaddonUserData')
        if(userData !== undefined && userData !== null){
            //if(userData.newtest !== undefined && userData.newtest !== null){newtest = userData.newtest}
            window.SalvageSTATUS = userData.SalvageSTATUS
            window.TimerSTATUS = userData.TimerSTATUS
            window.TimerSoundSTATUS = userData.TimerSoundSTATUS
            window.WhisperSoundSTATUS = userData.WhisperSoundSTATUS
            window.StatsRangeSTATUS = userData.StatsRangeSTATUS
            window.QuestHideSTATUS = userData.QuestHideSTATUS
            window.CombatLogSTATUS = userData.CombatLogSTATUS
            window.mapScale = userData.mapScale
            window.map_xOffset = userData.map_xOffset
            window.map_yOffset = userData.map_yOffset
        } else {
            // Clean old islewaddon local storage
            localStorage.removeItem('islewardMinimap')
            localStorage.removeItem('isleWaddonSalvage')
            localStorage.removeItem('isleWaddonTimer')
            localStorage.removeItem('isleWaddonTimerSound')
            localStorage.removeItem('isleWaddonWhisperSound')
            localStorage.removeItem('isleWaddonStatsRange')
            localStorage.removeItem('isleWaddonHideQuest')
            localStorage.removeItem('isleWaddonCombatLog')
        }
        window.setUserData()
    }

    // EVENT REGISTER //
    addons.register({
        init: function(events) {
            // ALL EVENT USED //
            events.on('onResourcesLoaded', this.onResourcesLoaded.bind(this));
            events.on('onBuiltItemTooltip', this.onBuiltItemTooltip.bind(this));
            events.on('onShowItemTooltip', this.onShowItemTooltip.bind(this));
            events.on('onHideItemTooltip', this.onHideItemTooltip.bind(this));
            events.on('onKeyDown', this.onKeyDown.bind(this));
            events.on('onRezone', this.onRezone.bind(this));
            events.on('onObtainQuest', this.onObtainQuest.bind(this));
            events.on('onEnterGame', this.onEnterGame.bind(this));
            events.on('onGetObject', this.onGetObject.bind(this));
            events.on('onGetMessages', this.onGetMessages.bind(this));
            // MAP
            window.uiContainer = jQuery('.ui-container');
            window.uiMap = jQuery('<canvas class="addon-uiMap"></canvas>').appendTo(window.uiContainer);
            window.uiMap.css("display", "none");
            window.uiMap.css("pointer-events","none");
            window.uiMap.css("opacity","1.0");
            events.on('onGetMap', this.onGetMap.bind(this));
            // COMBAT LOG
            events.on('onGetDamage',this.onGetDamage.bind(this));
        },

        onResourcesLoaded: function() {
            initIsleWaddon();
            initUserData();
        },

        onShowItemTooltip: function(obj) {
            Obj = obj;
            if(obj.material === true || obj.noSalvage === true){
                itemPos = -1;
            } else{
                itemPos = obj.pos;
            }

        },

        onHideItemTooltip: function(obj) {
            Obj = -1;
            itemPos = -1;
        },

        onBuiltItemTooltip: function(obj) {
            itemType(Obj);
        },

        onGetMap: function(mapData) {
            if (mapData.collisionMap) {
                window.collisionMap = mapData.collisionMap;
                window.map = mapData.map;
            }
        },

        onEnterGame: function(obj) {
            window.deferTillChat(function(){jQuery('<div class="list-message color-'+"greenB"+' info">' +"IsleWaddon v"+Version+" loaded for iwd v0.3.2"+ '</div>').appendTo(jQuery(".uiMessages .list"))});
            if (window.gameStarted === "false") {
                window.deferTillChat(function(){jQuery('<div class="list-message color-'+"greenB"+' info">' +"I can't guarantee this add-on doesn't produce lag/fps drops. Notify me (Polfy#6924) of any bugs/problems on Discord"+ '</div>').appendTo(jQuery(".uiMessages .list"))});
            }
            if(window.MenuSTATUS === "true") {
                jQuery(".addon-loader").remove();
                window.MenuSTATUS = "false"
            }
            window.gameStarted = "true"
        },

        onUpdateUIQuests: function(){
            if (window.QuestHideSTATUS == "true") {
                $(".ui-container .right .uiQuests .heading").text("Quests hidden ❌ ");
                $(".ui-container .right .uiQuests .list").toggle(false);
        } else if (window.QuestHideSTATUS == "false" && $(".ui-container .right .uiQuests .heading").text() != 'Quests') {
                $(".ui-container .right .uiQuests .heading").text("Quests");
                $(".ui-container .right .uiQuests .list").toggle(true);
        }
        },
        onRezone: function () {
            this.onUpdateUIQuests();
            window.thingsToDraw = {};
            if (window.uiMap.css("display") == "block") {
                window.drawMap();
                window.drawThings();
            }
            for(var i=jQuery(".minimapName").length-1;i>=0;--i){
                jQuery(".minimapName").eq(i).remove();
            }
        },
        onObtainQuest: function () {
            this.onUpdateUIQuests();
        },

        // KEYS
        onKeyDown: function(key) {
            if (!key) {
                return;
            } else if (window.SalvageSTATUS == "true" && key == SalvageKey) {
                if(jQuery(".ui-container .uiInventory").css("display") == "block" && itemPos != -1 && typeof jQuery(".uiMessages .active .typing")[0] === "undefined"){
                    jQuery(".ui-container .uiInventory .grid .item").eq(itemPos).find(".icon").contextmenu();
                    for(var i=0;i< $(".uiContext .list .option").length;++i){
                        if(jQuery(".uiContext .list .option").eq(i).text() == "salvage"){
                            jQuery(".uiContext .list .option").eq(i).click();
                            break;
                        }
                    }
                }
            } else if (window.MapSTATUS == "true") {
                if (key == "13") {
                    if (window.mapScale > 1) {
                        window.mapScale-=0.1;
                        window.drawMap();
                    }
                } else if (key == "11") {
                    if (window.mapScale < 11) {
                        window.mapScale+=0.1;
                        window.drawMap();
                    }
                } else if (key == "7") {
                    window.map_yOffset-=30;
                    window.uiMap.css('top',(window.uiContainer[0].clientHeight / 2) - (window.uiMap[0].height / 2)+window.map_yOffset);
                } else if (key == "8") {
                    window.map_yOffset+=30;
                    window.uiMap.css('top',(window.uiContainer[0].clientHeight / 2) - (window.uiMap[0].height / 2)+window.map_yOffset);
                } else if (key == "9") {
                    window.map_xOffset-=30;
                    window.uiMap.css('left',window.map_xOffset);
                } else if (key == "0") {
                    window.map_xOffset+=30;
                    window.uiMap.css('left',window.map_xOffset);
                }
                window.setUserData()
            }
        },
        onGetObject: function(obj) {
            if(window.TimerSTATUS == "true") {
                if(obj.name === "m'ogresh"){
                    window.bossID = obj.id;
                    if(typeof window.lastRespawned === "undefined" && typeof window.lastKilled !== "undefined"){
                        window.lastRespawned = new Date();
                    }
                }
                if (typeof window.bossID != "undefined" && obj.id == window.bossID && obj.destroyed){
                    if(typeof window.lastKilled === "undefined" && typeof window.lastRespawned === "undefined"){
                        window.lastKilled = new Date();
                    }
                    window.respawnTime = 146+1;
                }
                if(obj.name === "Stinktooth"){

                    window.bossID1 = obj.id;
                    if(typeof window.lastRespawned === "undefined" && typeof window.lastKilled !== "undefined"){
                        window.lastRespawned = new Date();
                    }
                }
                if (typeof window.bossID1 != "undefined" && obj.id == window.bossID1 && obj.destroyed){
                    if(typeof window.lastKilled === "undefined" && typeof window.lastRespawned === "undefined"){
                        window.lastKilled = new Date();
                    }
                    window.respawnTime1 = 60+1;
                }

                if(obj.name === "Steelclaw"){

                    audioElement = document.createElement("audio");
                    audioElement.type = "audio/wav";
                    audioElement.src = "http://wavlist.com/soundfx/027/drum_stick.wav";
                    audioElement.volume = 0.2;
                    audioElement.play();

                    window.bossID2 = obj.id;
                    if(typeof window.lastRespawned === "undefined" && typeof window.lastKilled !== "undefined"){
                        window.lastRespawned = new Date();
                    }
                }
                if (typeof window.bossID2 != "undefined" && obj.id == window.bossID2 && obj.destroyed){
                    if(typeof window.lastKilled === "undefined" && typeof window.lastRespawned === "undefined"){
                        window.lastKilled = new Date();
                    }
                    window.respawnTime1 = 60+1;
                }

                if(obj.name === "Radulos"){

                    window.bossID3 = obj.id;
                    if(typeof window.lastRespawned === "undefined" && typeof window.lastKilled !== "undefined"){
                        window.lastRespawned = new Date();
                    }
                }
                if (typeof window.bossID3 != "undefined" && obj.id == window.bossID3 && obj.destroyed){
                    if(typeof window.lastKilled === "undefined" && typeof window.lastRespawned === "undefined"){
                        window.lastKilled = new Date();
                    }
                    window.respawnTime2 = 600+1;
                }
            }
            // MAP
            if(obj.name !== undefined){
                var safeName = obj.name.split(' ').join('_');
                if((obj.account !== undefined) || (safeName.toLowerCase() === "m'ogresh" || safeName.toLowerCase() === "radulos" || safeName.toLowerCase() === "sun_carp" || (obj.isRare != undefined && obj.isRare == true)) || safeName.toLowerCase().indexOf("pumpkin") != -1 ){
                    if(safeName.toLowerCase() === "m'ogresh"){
                        window.thingsToDraw[obj.id] = {x: obj.x, y: obj.y, color:"#00ff00", name:"mogresh", textColor:"rgb(0,255,0)"};
                    } else if(safeName.toLowerCase() === "radulos"){
                        window.thingsToDraw[obj.id] = {x: obj.x, y: obj.y, color:"#00ff00", name:"radulos", textColor:"rgb(0,255,0)"};
                    } else if(safeName.toLowerCase() === "sun_carp"){
                        window.thingsToDraw[obj.id] = {x: obj.x, y: obj.y, color:"#00ffff", name:"sun_carp", textColor:"rgb(0,100,255)"};
                    } else if (safeName.toLowerCase().indexOf("pumpkin") != -1){
                        window.thingsToDraw[obj.id] = {x: obj.x, y: obj.y, color:"#ffffff", name:"pumpkin", textColor:"rgb(0,100,255)"};
                    }else{
                        if(obj.isRare != undefined && obj.isRare == true){
                            if(jQuery(".minimapName."+safeName)[0] != undefined){
                                var newName = safeName+(~~(Math.random()*99));
                                window.thingsToDraw[obj.id] = {x: obj.x, y: obj.y, color: "#ff00ff", name:newName , textColor:"rgb(0,255,0)"};
                            } else{
                                window.thingsToDraw[obj.id] = {x: obj.x, y: obj.y, color: "#ff00ff", name:safeName , textColor:"rgb(0,255,0)"};
                            }
                        } else{
                            window.thingsToDraw[obj.id] = {x: obj.x, y: obj.y, color: "#ff0000", name:safeName , textColor:"rgb(0,255,0)"};
                        }
                    }
                    if(window.thingsToDraw[obj.id].name != "sun_carp" && window.thingsToDraw[obj.id].name.indexOf("pumpkin") == -1){
                        var el = jQuery('<div class="minimapName '+window.thingsToDraw[obj.id].name+'"></div>').appendTo('.ui-container');
                        el.css('color',window.thingsToDraw[obj.id].textColor);
                        el.css('position','absolute');
                        el.text(window.thingsToDraw[obj.id].name);
                        el.css('display',window.uiMap.css("display"));
                    }
                }
            } else{
                if(obj.id in window.thingsToDraw){
                    if(obj.x !== undefined && obj.y !== undefined){
                        window.thingsToDraw[obj.id].x = obj.x;
                        window.thingsToDraw[obj.id].y = obj.y;
                    }

                    if(obj.destroyed !== undefined && obj.destroyed == true){
                        jQuery(".minimapName."+window.thingsToDraw[obj.id].name).remove();
                        delete window.thingsToDraw[obj.id];
                    }
                }
            }
            // COMBAT LOG
            if(obj.name !== undefined){
                idToName[obj.id]=obj.name;
            }
            if (window.CombatLogSTATUS === "true") {
                if(obj.destroyed !== undefined && obj.destroyed == true){
                    if(obj.id in inCombatWith){
                        setTimeout(function(){addCombatMessage(idToName[obj.id] + " has been killed", "redA")}, 100)
                        delete inCombatWith[obj.id];
                    }
                }
            }
        },
        // REPLY
        onGetMessages: function(msg) {
            if(msg.messages && msg.messages[0] != undefined && msg.messages[0].type != undefined && msg.messages[0].type == "chat" && msg.messages[0].message != undefined){
                var myReg =   /\((\b[a-zA-Z]*)(\[\d{1,2}\])? to you\): \b.*/g;
                var matched = myReg.exec(msg.messages[0].message);
                if(matched != undefined && matched.length >= 2){
                    if(window.WhisperSoundSTATUS === "true") {
                        audioElement = document.createElement("audio");
                        audioElement.type = "audio/wav";
                        audioElement.src = "http://www.wavlist.com/soundfx/027/drum_stick.wav";
                        audioElement.volume = 0.2;
                        audioElement.play();
                    }
                    window.lastReply = matched[1];
                }
            }
        },
        onGetDamage: function(dmg) {
            if (window.CombatLogSTATUS === "true") {
                if(dmg.crit !== undefined){
                    if(dmg.id !== undefined && dmg.source !== undefined){
                        var enemyName;
                        var action="hit";
                        if(dmg.heal !== undefined && dmg.heal == true){
                            action="heal";
                        }
                        if(window.player !== undefined && dmg.source == window.player.id){
                            inCombatWith[dmg.id] = true;
                            enemyName = idToName[dmg.id];
                            addCombatMessage("You "+(dmg.crit == true ? "critically ":"")+action+" "+enemyName+" for "+ (~~dmg.amount) +" damage", "blueA");
                        } else if(window.player !== undefined && dmg.id == window.player.id){
                            enemyName = idToName[dmg.source];
                            inCombatWith[dmg.source] = true;
                            addCombatMessage(enemyName+(dmg.crit == true ? " critically":"")+" "+action+"s you for "+ (~~dmg.amount) +" damage", "tealC");
                        }
                    }
                } else{
                    if(dmg.event !== undefined){
                        if(window.player !== undefined && dmg.id == window.player.id && dmg.text.indexOf(" xp") != -1){
                            setTimeout(function(){addCombatMessage("You gained "+dmg.text, "redA")}, 200)
                        }
                    }
                }
            }
        },
    });

    // LVL 20 ROLL RANGE + CARD SET TO TRADE COUNT
    function itemType(obj){
        if(obj.quality === 0) {colorTooltip = "white"; numberOfStat = " non-augmented stat";}
        else {
            numberOfStat = " non-augmented stats";
            if(obj.quality === 1) {colorTooltip = "#4ac441";}
            else if(obj.quality === 2) {colorTooltip = "#3fa7dd";}
            else if(obj.quality === 3) {colorTooltip = "#a24eff";}
            else if(obj.quality === 4) {colorTooltip = "#ff6942";}
        }
        numberOfStat = (obj.quality+1)+numberOfStat;
        if(obj.type === "Fishing Rod" && obj.name !== "Competition Rod" && obj.name !== "Flimsy Fishing Rod"){
            expandFishingRodTooltip(obj);
        }else if(obj.ability !== true && obj.level) {
            expandItemStats(obj);
        }else if(obj.ability === true) {
            expandRuneTooltip(obj);
        }else if(obj.type === "Reward Card") {
            expandRewardCardTooltip(obj);
        }
    }

    function expandItemStats(obj) {
        // IMPLICITS STATS
        if(window.StatsRangeSTATUS == "true") {
            $('.uiTooltipItem .tooltip .implicitStats').each(function() {
                text = $(this).html();
                if(obj.type === "Breastplate") {
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Helmet" ||obj.type === "Legplates") {
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Gauntlets" || obj.type === "Steel Boots") {
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Leather Armor" || obj.type === "Scalemail") {
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Leather Cap" || obj.type === "Facemask" || obj.type === "Leather Pants" || obj.type === "Scale Leggings") {
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Leather Gloves" || obj.type === "Scale Gloves" || obj.type === "Leather Boots" || obj.type === "Scale Boots") {
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Robe") {
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Cowl" || obj.type === "Pants") {
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Gloves" || obj.type === "Boots") {
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Pendant") {
                    $(this).html(text.replace("strenght", "strenght <font color="+colorTooltip+">[1-4]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Amulet") {
                    $(this).html(text.replace("intellect", "intellect <font color="+colorTooltip+">[1-4]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Locket") {
                    $(this).html(text.replace("dexterity", "dexterity <font color="+colorTooltip+">[1-4]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Choker") {
                    $(this).html(text.replace("health regeneration", "health regeneration <font color="+colorTooltip+">[2-5]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Signet") {
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+">[5-15]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Ring") {
                    $(this).html(text.replace("mana regeneration", "mana regeneration <font color="+colorTooltip+">[1-5]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Loop") {
                    $(this).html(text.replace("to all attributes", "to all attributes <font color="+colorTooltip+">[1-7]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Viridian Band") {
                    $(this).html(text.replace("increased physical damage", "increased physical damage <font color="+colorTooltip+">[1-3]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Belt") {
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+">[10-20]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Sash") {
                    $(this).html(text.replace("maximum mana", "maximum mana <font color="+colorTooltip+">[1-8]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Leather Belt") {
                    $(this).html(text.replace("global crit chance", "global crit chance <font color="+colorTooltip+">[0.5-2.5]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Scaled Binding") {
                    $(this).html(text.replace("vitality", "vitality <font color="+colorTooltip+">[2-6]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Forged Ember") {
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+">[25-70]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Smokey Orb") {
                    $(this).html(text.replace("chance to dodge attacks", "chance to dodge attacks <font color="+colorTooltip+">[1-3]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Quartz Fragment") {
                    $(this).html(text.replace("increased arcane damage", "increased arcane damage <font color="+colorTooltip+">[3-12]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Mystic Card") {
                    $(this).html(text.replace("increased item quality", "Increased item quality <font color="+colorTooltip+">[3-12]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Dragon Fang") {
                    $(this).html(text.replace("attack speed", "attack speed <font color="+colorTooltip+">[1-5]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Sword") {
                    $(this).html(text.replace("attack speed", "attack speed <font color="+colorTooltip+">[1-5]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Axe") {
                    $(this).html(text.replace("attack crit multiplier", "attack crit multiplier <font color="+colorTooltip+">[10-30]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Wand") {
                    $(this).html(text.replace("cast speed", "cast speed <font color="+colorTooltip+">[1-5]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Gnarled Staff") {
                    $(this).html(text.replace("mana regeneration", "mana regeneration <font color="+colorTooltip+">[3-9]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Dagger") {
                    $(this).html(text.replace("attack crit chance", "attack crit chance <font color="+colorTooltip+">[0.5-2.5]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Spear") {
                    $(this).html(text.replace("chance to dodge attacks", "chance to dodge attacks <font color="+colorTooltip+">[1-7]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Wooden Shield") {
                    $(this).html(text.replace("chance to block attacks", "chance to block attacks <font color="+colorTooltip+">[1-10]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Gilded Shield") {
                    $(this).html(text.replace("chance to block attacks", "chance to block attacks <font color="+colorTooltip+">[1-5]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Brittle Tome") {
                    $(this).html(text.replace("spell crit chance", "spell crit chance <font color="+colorTooltip+">[0.5-2.5]<br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Ancient Tome") {
                    $(this).html(text.replace("spell crit multiplier", "spell crit multiplier <font color="+colorTooltip+">[10-30]<br>+"+numberOfStat+"</font>"));
                }
            });
            // HACK FOR OLD ARMOR GEAR
            $('.uiTooltipItem .tooltip .stats').each(function() {
                text = $(this).html();
                if(obj.type === "Breastplate") {
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Helmet" ||obj.type === "Legplates") {
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Gauntlets" || obj.type === "Steel Boots") {
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Leather Armor" || obj.type === "Scalemail") {
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Leather Cap" || obj.type === "Facemask" || obj.type === "Leather Pants" || obj.type === "Scale Leggings") {
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Leather Gloves" || obj.type === "Scale Gloves" || obj.type === "Leather Boots" || obj.type === "Scale Boots") {
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Robe") {
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Cowl" || obj.type === "Pants") {
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
                } else if(obj.type === "Gloves" || obj.type === "Boots") {
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
                }
            });
            // LVL 20 GEAR STATS
            if(obj.level === 20 || obj.originalLevel === 20 || (obj.level+obj.stats.lvlRequire) === 20) {
                if(obj.slot === "twoHanded") {weaponMult = 2}
                // DAMAGE
                if(obj.slot === "twoHanded" || obj.slot === "oneHanded") {
                    if(obj.type === "Trident") {rangeDmg = "[1.65-10.81]";}
                    else if(obj.type === "Sword") {rangeDmg = "[1.47-9.65]";}
                    else if(obj.type === "Dagger") {rangeDmg = "[0.88-5.79]";}
                    else if(obj.type === "Wand") {rangeDmg = "[1.17-7.72]";}
                    else if(obj.type === "Axe") {rangeDmg = "[2.64-17.37]";}
                    else if(obj.type === "Gnarled Staff") {rangeDmg = "[1.65-10.81]";}
                    else if(obj.type === "Spear") {rangeDmg = "[1.76-11.58]";}
                    else if(obj.type === "Curved Dagger") {rangeDmg = "[0.88-5.79]";}
                    else if(obj.type === "Sickle" || obj.type === "Jade Sickle" || obj.type === "Golden Sickle" || obj.type === "Bone Sickle") {rangeDmg = "[1.5-5.7]";}
                    $('.uiTooltipItem .tooltip .damage').each(function() {
                        text = $(this).html();
                        $(this).html(text.replace("damage", "<font color='white'>"+rangeDmg+"</font> damage"));
                    });
                }
                // IMPLICIT ARMOR
                if(obj.type === "Breastplate") {rangeArmor = "[160-400]";}
                else if(obj.type === "Helmet" ||obj.type === "Legplates") {rangeArmor = "[80-200]";}
                else if(obj.type === "Gauntlets" || obj.type === "Steel Boots") {rangeArmor = "[40-100]";}
                else if(obj.type === "Leather Armor" || obj.type === "Scalemail") {rangeArmor = "[96-240]";}
                else if(obj.type === "Leather Cap" ||obj.type === "Facemask" || obj.type === "Leather Pants" || obj.type === "Scale Leggings") {rangeArmor = "[48-120]";}
                else if(obj.type === "Leather Gloves" || obj.type === "Scale Gloves" || obj.type === "Leather Boots" || obj.type === "Scale Boots") {rangeArmor = "[24-60]";}
                else if(obj.type === "Robe") {rangeArmor = "[56-140]";}
                else if(obj.type === "Cowl" ||obj.type === "Pants") {rangeArmor = "[28-70]";}
                else if(obj.type === "Gloves" || obj.type === "Boots") {rangeArmor = "[14-35]";}
                else if(obj.type === "Wooden Shield") {rangeArmor = "[120-300]";}
                else if(obj.type === "Gilded Shield") {rangeArmor = "[240-600]";}
                $('.uiTooltipItem .tooltip .implicitStats').each(function() {
                    text = $(this).html();
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+">"+rangeArmor+"</font>"));
                });
                // HACK FOR OLD ARMOR GEAR
                $('.uiTooltipItem .tooltip .stats').each(function() {
                    text = $(this).html();
                    $(this).html(text.replace("armor", "armor <font color="+colorTooltip+">"+rangeArmor+"</font>"));
                });
                // STATS
                $('.uiTooltipItem .tooltip .stats').each(function() {
                    text = $(this).html();
                    $(this).html(text.replaceAll("intellect", "intellect <font color="+colorTooltip+">[1-"+10*weaponMult+"]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("dexterity", "dexterity <font color="+colorTooltip+">[1-"+10*weaponMult+"]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("strength", "strength <font color="+colorTooltip+">[1-"+10*weaponMult+"]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("to all attributes", "to all attributes <font color="+colorTooltip+">[1-10]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("global crit chance", "global crit chance <font color="+colorTooltip+">[0.05-"+3.9*weaponMult+"]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("global crit multiplier", "global crit multiplier <font color="+colorTooltip+">[1-"+28*weaponMult+"]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("attack crit chance", "attack crit chance <font color="+colorTooltip+">[0.05-"+3.9*weaponMult+"]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("attack crit multiplier", "attack crit multiplier <font color="+colorTooltip+">[1-"+28*weaponMult+"]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("spell crit chance", "spell crit chance <font color="+colorTooltip+">[0.05-"+3.9*weaponMult+"]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("spell crit multiplier", "spell crit multiplier <font color="+colorTooltip+">[1-"+28*weaponMult+"]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased item quality", "increased item quality <font color="+colorTooltip+">[1-15]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased item quantity", "increased item quantity <font color="+colorTooltip+">[2-27]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("additional xp per kill", "additional xp per kill <font color="+colorTooltip+">[1-6]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("level requirement reduction", "level requirement reduction <font color="+colorTooltip+">[1-10]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("vitality", "vitality <font color="+colorTooltip+">[1-"+7*weaponMult+"]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("health regeneration", "health regeneration <font color="+colorTooltip+">[1-"+14*weaponMult+"]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("maximum mana", "maximum mana <font color="+colorTooltip+">[1-8]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("mana regeneration", "mana regeneration <font color="+colorTooltip+">[1-5]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("arcane resistance", "arcane resistance <font color="+colorTooltip+">[1-"+10*weaponMult+"]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("fire resistance", "fire resistance <font color="+colorTooltip+">[1-"+10*weaponMult+"]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("frost resistance", "frost resistance <font color="+colorTooltip+">[1-"+10*weaponMult+"]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("holy resistance", "holy resistance <font color="+colorTooltip+">[1-"+10*weaponMult+"]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("poison resistance", "poison resistance <font color="+colorTooltip+">[1-"+10*weaponMult+"]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("all resistance", "all resistance <font color="+colorTooltip+">[1-"+10*weaponMult+"]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased arcane damage", "increased arcane damage <font color="+colorTooltip+">[1-3]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased frost damage", "increased frost damage <font color="+colorTooltip+">[1-3]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased fire damage", "increased fire damage <font color="+colorTooltip+">[1-3]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased holy damage", "increased holy damage <font color="+colorTooltip+">[1-3]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased poison damage", "increased poison damage <font color="+colorTooltip+">[1-3]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased elemental damage", "increased elemental damage <font color="+colorTooltip+">[1-3]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased spell damage", "increased spell damage <font color="+colorTooltip+">[1-3]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased physical damage", "increased physical damage <font color="+colorTooltip+">[1-3]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("cast speed", "cast speed <font color="+colorTooltip+">[1-8.75]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("attack speed", "attack speed <font color="+colorTooltip+">[1-8.75]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("sprint chance", "sprint chance <font color="+colorTooltip+">[1-20]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("chance to block attacks", "chance to block attacks <font color="+colorTooltip+">[1-10]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("chance to block spells", "chance to block spells <font color="+colorTooltip+">[1-10]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("chance to dodge attacks", "chance to dodge attacks <font color="+colorTooltip+">[1-10]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("chance to dodge spells", "chance to dodge spells <font color="+colorTooltip+">[1-10]</font>"));
                });
            }
        }
    }

    function expandFishingRodTooltip(obj) {
        if(window.StatsRangeSTATUS == "true") {
            $('.uiTooltipItem .tooltip .name').each(function() {
                text = $(this).html();
                $(this).html(text.replace(text, text + "+"+numberOfStat));
            });
            $('.uiTooltipItem .tooltip .stats').each(function() {
                text = $(this).html();
                $(this).html(text.replaceAll("extra catch chance", "extra catch chance <font color="+colorTooltip+">[0-60]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("faster catch speed", "faster catch speed <font color="+colorTooltip+">[0-150]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("higher fish rarity", "higher fish rarity <font color="+colorTooltip+">[0-100]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("increased fish weight", "increased fish weight <font color="+colorTooltip+">[0-75]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("extra chance to hook items", "extra chance to hook items <font color="+colorTooltip+">[0-30]</font>"));
            });
        }
    }

    function expandRewardCardTooltip(obj) {
        $('.uiTooltipItem .tooltip .name').each(function() {
            var setToTrade = (~~(obj.quantity/obj.setSize));
            var text = $(this).html();
            if (setToTrade == 0) {$(this).html(text.replace(text, text+"<font color='red'>"+setToTrade+" set to trade</font>"));}
            else {$(this).html(text.replace(text, text+"<font color='#ff6942'>"+setToTrade+" set to trade</font>"));}
        })
    }

    // MAP //
    Storage.prototype.setObject = function(key, value) {
        this.setItem(key, JSON.stringify(value));
    }
    Storage.prototype.getObject = function(key) {
        var value = this.getItem(key);
        return value && JSON.parse(value);
    }
    window.thingsToDraw = {};
    window.thingsToDrawOld = {};
    var fun = function(){
        if (window.MapSTATUS == "true") {window.drawThings();}
    }
    setInterval(fun, 1000);
    window.drawMapPixel = function(i,j){
        var ctx = window.uiMap[0].getContext('2d');
        if(window.map[i][j] == 0){
            ctx.fillStyle = "#2c2136";
        } else{
            if (window.collisionMap[i][j] == 0) {
                ctx.fillStyle = "#757b92";
            } else {
                ctx.fillStyle = "#000000";
            }
        }
        ctx.fillRect(i,j, 1, 1);
    }
    window.toggleMap = function() {
        if (!window.collisionMap) {
            return;
        }
        if (window.uiMap.css("display") == "block") {
            window.uiContainer.css('background-color', 'transparent');
            window.uiContainer.removeClass('blocking');
            window.uiMap.css("display", "none");
            for(var i=jQuery(".minimapName").length-1;i>=0;--i){
                jQuery(".minimapName").eq(i).css("display", "none");
            }
            return;
        } else {
            window.uiMap.css("display", "block");
            window.drawMap();
            window.drawThings();
            for(i=jQuery(".minimapName").length-1;i>=0;--i){
                jQuery(".minimapName").eq(i).css("display", "block");
            }
        }
    };
    window.drawMap = function() {
        if (!window.collisionMap || window.uiMap.css("display") != "block") {
            return;
        }

        window.uiMap[0].width = window.collisionMap.length * window.mapScale;
        window.uiMap[0].height = window.collisionMap[0].length * window.mapScale;

        var ctx = window.uiMap[0].getContext('2d');
        ctx.scale(window.mapScale, window.mapScale);
        ctx.clearRect(0, 0, window.uiMap[0].width, window.uiMap[0].height);

        for (var i = 0; i < window.collisionMap.length; i++) {
            for (var j = 0; j < window.collisionMap[i].length; j++) {
                window.drawMapPixel(i,j);
            }
        }
        window.uiMap.css({
            'position': "absolute",
            'left': window.map_xOffset,
            'top': (window.uiContainer[0].clientHeight / 2) - (window.uiMap[0].height / 2)+window.map_yOffset,
            'background-color': "#3c3f4c",
            'border': "4px solid #505360",
        });
    };
    window.drawThings = function() {
        if (window.uiMap.css("display") != "block") {
            return;
        }
        var ctx = window.uiMap[0].getContext('2d');
        Object.keys(window.thingsToDrawOld).forEach(function(key) {
            for(var i=-2;i<=2;++i){
                for(var j=-2;j<=2;++j){
                    window.drawMapPixel(window.thingsToDrawOld[key].x+i,window.thingsToDrawOld[key].y+j);
                }
            }
        });

        Object.keys(window.thingsToDraw).forEach(function(key) {
            thingsToDrawOld[key] = {};
            Object.keys(window.thingsToDraw[key]).forEach(function(key2) {
                thingsToDrawOld[key][key2] = thingsToDraw[key][key2];
            });
            ctx.fillStyle = window.thingsToDraw[key].color;
            if(window.thingsToDraw[key].name == player.name){
                ctx.fillStyle = "#ffff00";
            }
            for(var i=-1;i<=1;++i){
                for(var j=-1;j<=1;++j){
                    ctx.fillRect(window.thingsToDraw[key].x+i,window.thingsToDraw[key].y+j, 1, 1);
                }
            }
            if(thingsToDraw[key].name != "sun_carp" && thingsToDraw[key].name.indexOf("Gilde Gift") == -1){
                var top = (window.uiContainer[0].clientHeight / 2) - (window.uiMap[0].height / 2)+ window.map_yOffset+window.thingsToDraw[key].y*window.mapScale;
                var left = window.map_xOffset+window.thingsToDraw[key].x*window.mapScale;
                top -= jQuery(".minimapName."+window.thingsToDraw[key].name)[0].clientHeight;
                left -= jQuery(".minimapName."+window.thingsToDraw[key].name)[0].clientWidth/2;
                jQuery(".minimapName."+window.thingsToDraw[key].name).eq(0).css("top",top);
                jQuery(".minimapName."+window.thingsToDraw[key].name).eq(0).css("left",left);
                if(window.localStorage.iwd_opt_shownames !== undefined){
                    if(window.localStorage.iwd_opt_shownames != "true"){
                        jQuery(".minimapName."+window.thingsToDraw[key].name).eq(0).remove()
                    } else{
                        jQuery(".minimapName."+window.thingsToDraw[key].name).eq(0).css("display","block");
                    }
                }
            }
        });
    }
    // AFFICHE TIMER //
    var repeatEverySec = function(){
        if(typeof window.respawnTime === "undefined"){
            window.respawnTime = 0;
        }
        if(typeof window.respawnTime1 === "undefined"){
            window.respawnTime1 = 0;
        }
        if(typeof window.respawnTime2 === "undefined"){
            window.respawnTime2 = 0;
        }

        if(window.respawnTime > 0){
            window.respawnTime--;
            if(window.respawnTime == 14 && window.TimerSTATUS == "true" && window.TimerSoundSTATUS == "true"){
                audioElement = document.createElement("audio");
                audioElement.type = "audio/wav";
                audioElement.src = "http://www.wavlist.com/soundfx/002/cat-meow3.wav";
                audioElement.volume = 0.2;
                audioElement.play();
            }
        }

        if(window.respawnTime1 > 0){
            window.respawnTime1--;
            if(window.respawnTime1 == 4 && window.TimerSTATUS == "true" && window.TimerSoundSTATUS == "true"){
                audioElement = document.createElement("audio");
                audioElement.type = "audio/wav";
                audioElement.src = "http://www.wavlist.com/soundfx/020/clock-tick1.wav";
                audioElement.volume = 0.2;
                audioElement.play();
            }
        }

        if(window.respawnTime2 > 0){
            window.respawnTime2--;
            if(window.respawnTime2== 10 && window.TimerSTATUS == "true" && window.TimerSoundSTATUS == "true"){
                audioElement = document.createElement("audio");
                audioElement.type = "audio/wav";
                audioElement.src = "http://www.wavlist.com/soundfx/014/cricket-3.wav";
                audioElement.volume = 0.05;
                audioElement.play();
            }
        }

        var toHHMMSS = (secs) => {
            var sec_num = parseInt(secs, 10);
            var hours = Math.floor(sec_num / 3600) % 24;
            var minutes = Math.floor(sec_num / 60) % 60;
            var seconds = sec_num % 60;
            return [hours,minutes,seconds]
                .map(v => v < 10 ? "0" + v : v)
                .filter((v,i) => v !== "00" || i > 0)
                .join(":")
        }
        if(window.respawnTime1 != 0 && window.TimerSTATUS == "true"){
            L1T = "Stinktooth respawns in "+ toHHMMSS(window.respawnTime1-1);
            jQuery(".Add-onTimer").remove()
            window.TimerAddon();
        }
        if(window.respawnTime2 != 0 && window.TimerSTATUS == "true"){
            L2T = "Radulos respawns in "+ toHHMMSS(window.respawnTime2-1);
            jQuery(".Add-onTimer").remove()
            window.TimerAddon();
        }
        if(window.respawnTime != 0 && window.TimerSTATUS == "true"){
            L3T = "M'ogresh respawns in "+ toHHMMSS(window.respawnTime-1);
            jQuery(".Add-onTimer").remove()
            window.TimerAddon();
        }
        if(window.respawnTime1 == 1){
            L1T = "";
            jQuery(".Add-onTimer").remove()
            window.TimerAddon();
        }
        if(window.respawnTime2 == 1){
            L2T = "";
            jQuery(".Add-onTimer").remove()
            window.TimerAddon();
        }
        if(window.respawnTime == 1){
            L3T = "";
            jQuery(".Add-onTimer").remove()
            window.TimerAddon();
        }
    };
    setInterval(repeatEverySec, 1000);
    var L1T = "";
    var L2T = "";
    var L3T = "";
    window.TimerAddon = function(){
        window.menuTimer = jQuery('<div class="Add-onTimer" style="position:absolute;left:632px;top:10px;"></div>').appendTo(jQuery('.ui-container'))
        var src = tooltipStyle+'<table bgcolor="#3c3f4c">'
        if (L1T != "") {src += tooltipTextStart+L1T+'</span></div></td>'}
        if (L2T != "") {src += tooltipTextStart+L2T+'</span></div></td>'}
        if (L3T != "") {src += tooltipTextStart+L3T+'</span></div></td>'}
        src += '</table>'
        window.menuTimer.html(src);
    }

    function addCombatMessage(txt, colortxt){
        var msg = "*"+txt+"*";
        jQuery('<div class="list-message color-'+colortxt+' rep">' + msg + '</div>').appendTo(jQuery(".uiMessages .list"));
        jQuery(".uiMessages .list").scrollTop(9999999);
    }

    // GET REPLY //
    var chatCheck = function(){
        if(window.gameStarted === "true") {
            if(jQuery(".el.textbox.message")[0] != undefined && jQuery(".el.textbox.message").val().substring(0, 2) == "/r" && window.lastReply != undefined){
            jQuery(".el.textbox.message").val(jQuery(".el.textbox.message").val().replace("/r", "@"+window.lastReply+" "));
            jQuery(".uiMessages .list").scrollTop(9999999);
            }
        }
    }
    setInterval(chatCheck,100);
}
