// TempFix of Windows double load
if (window.stopTwiceLoad !== "true") {
    window.stopTwiceLoad = "true"
    console.log('*************************')
    console.log('*********WARNING*********')
    console.log('**IF YOU LOG IWD ISSUES**')
    console.log('****IsleWaddon LOADED****')
    console.log('*************************')
    window.initIsleWaddonVersion = "IsleWaddon"

    function initIsleWaddon() {
        // GET FEATURES
        window.download = jQuery('<div class="isleWaddonDownload" style="position:absolute;right:10px;top:10px;width: 220px;padding: 5px;border: 2px solid gray;background-color: rgba(55, 48, 65, 0.7);text-align: center;"></div>').appendTo(jQuery('.ui-container'))
        var src = "<font color='#ffeb38'>IsleWaddon<br>Download : 0/7</font>"
        window.download.html(src);
        $.getScript("https://polfy.github.io/"+window.initIsleWaddonVersion+"/IsleWaddonFeature/MenuDisplay.js")
        .done(function(){
            var src = "<font color='#ffeb38'>IsleWaddon<br>Download : 1/7</font>"
            window.download.html(src);
            $.getScript("https://polfy.github.io/"+window.initIsleWaddonVersion+"/IsleWaddonFeature/EasySalvage.js")
            .done(function(){
                var src = "<font color='#ffeb38'>IsleWaddon<br>Download : 2/7</font>"
                window.download.html(src);
                $.getScript("https://polfy.github.io/"+window.initIsleWaddonVersion+"/IsleWaddonFeature/RespawnTimer.js")
                .done(function(){
                    var src = "<font color='#ffeb38'>IsleWaddon<br>Download : 3/7</font>"
                    window.download.html(src);
                    $.getScript("https://polfy.github.io/"+window.initIsleWaddonVersion+"/IsleWaddonFeature/ToolTipExpand/ToolTipExpand.js")
                    .done(function(){
                        var src = "<font color='#ffeb38'>IsleWaddon<br>Download : 4/7</font>"
                        window.download.html(src);
                        $.getScript("https://polfy.github.io/"+window.initIsleWaddonVersion+"/IsleWaddonFeature/AutoReply.js")
                        .done(function(){
                            var src = "<font color='#ffeb38'>IsleWaddon<br>Download : 5/7</font>"
                            window.download.html(src);
                            $.getScript("https://polfy.github.io/"+window.initIsleWaddonVersion+"/IsleWaddonFeature/CombatLog.js")
                            .done(function(){
                                var src = "<font color='#ffeb38'>IsleWaddon<br>Download : 6/7</font>"
                                window.download.html(src);
                                $.getScript("https://polfy.github.io/"+window.initIsleWaddonVersion+"/IsleWaddonFeature/QuestHide.js")
                                .done(function(){
                                    var src = "<font color='#ffeb38'>IsleWaddon<br>Download : 7/7</font>"
                                    window.download.html(src);
                                    initUserData();
                                    src = "<font color='#ffeb38'>IsleWaddon<br>Download complete</font>"
                                    window.download.html(src);
                                    setTimeout(function(){jQuery(".isleWaddonDownload").remove()},5000)
                                })
                                .fail(function(){
                                    window.errorMsg()
                                })
                            })
                            .fail(function(){
                                window.errorMsg()
                            })
                        })
                        .fail(function(){
                            window.errorMsg()
                        })
                    })
                    .fail(function(){
                        window.errorMsg()
                    })
                })
                .fail(function(){
                    window.errorMsg()
                })
            })
            .fail(function(){
                window.errorMsg()
            })
        })
        .fail(function(){
            window.errorMsg()
        })
    }

    // ERROR MSG //
    window.errorMsg = function() {
        var src = "<font color='#ffeb38'>IsleWaddon</font><br><font color='#ff5500'>⚠️Download Error<br>Try reloading the page<br>If it still doesn't work<br>Contact Polfy#6924<br>on Discord</font>"
        window.download.html(src);
    }
    // DEFAULT SETTINGS
    window.Version = "0.6"
    window.gameStarted = "false"
    window.MenuSTATUS = "false"
    window.MapSTATUS = "false"
    window.audioElement = document.createElement("audio");
    window.audioElement.type = "audio/wav";
    window.audioElement.volume = 0.2;

    // GET USER SETTINGS
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

    // SEND CHAT MSG FUNCTION
    window.deferTillChat = function(method) {
        if (jQuery(".uiMessages .list")[0] !== undefined) {
            method();
        } else {
            setTimeout(function() { deferTillChat(method) }, 50);
        }
    }

    addons.register({
        init: function(events) {
            // ALL EVENT USED
            events.on('onResourcesLoaded', this.onResourcesLoaded.bind(this));
            events.on('onKeyDown', this.onKeyDown.bind(this));
            events.on('onRezone', this.onRezone.bind(this));
            events.on('onEnterGame', this.onEnterGame.bind(this));
            events.on('onGetObject', this.onGetObject.bind(this));
            // MAP
            window.uiContainer = jQuery('.ui-container');
            window.uiMap = jQuery('<canvas class="addon-uiMap"></canvas>').appendTo(window.uiContainer);
            window.uiMap.css("display", "none");
            window.uiMap.css("pointer-events","none");
            window.uiMap.css("opacity","1.0");
            events.on('onGetMap', this.onGetMap.bind(this));
        },

        onResourcesLoaded: function() {
            initIsleWaddon();
        },

        onGetMap: function(mapData) {
            if (mapData.collisionMap) {
                window.collisionMap = mapData.collisionMap;
                window.map = mapData.map;
            }
        },

        onEnterGame: function(obj) {
            jQuery(".isleWaddonDownload").remove()
            setTimeout(function(){
                window.deferTillChat(function(){jQuery('<div class="list-message color-'+"greenB"+' info">' +"IsleWaddon v"+Version+" loaded for iwd v0.3.2"+ '</div>').appendTo(jQuery(".uiMessages .list"))});
                if (window.gameStarted === "false") {
                    window.deferTillChat(function(){jQuery('<div class="list-message color-'+"greenB"+' info">' +"I can't guarantee this add-on doesn't produce lag/fps drops. Notify me (Polfy#6924) of any bugs/problems on Discord"+ '</div>').appendTo(jQuery(".uiMessages .list"))});
                }
                window.gameStarted = "true"
            }, 2000)
        },

        onRezone: function () {
            window.thingsToDraw = {};
            if (window.uiMap.css("display") == "block") {
                window.drawMap();
                window.drawThings();
            }
            for(var i=jQuery(".minimapName").length-1;i>=0;--i){
                jQuery(".minimapName").eq(i).remove();
            }
        },

        // KEYS
        onKeyDown: function(key) {
            if (!key) {
                return;
            }  else if (window.MapSTATUS == "true") {
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
        },
    });

    // MAP
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
}
