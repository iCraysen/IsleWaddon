// TempFix of Windows double load
if (window.stopTwiceLoad !== "true") {
    window.stopTwiceLoad = "true"
    console.log('*********WARNING*********')
    console.log('**IF YOU LOG IWD ISSUES**')
    console.log('****IsleWaddon LOADED****')
    window.initIsleWaddonVersion = "IsleWaddon"

    function initIsleWaddon() {
        // GET FEATURES
        window.download = jQuery('<div class="isleWaddon-uiDownload" style="position:absolute;bottom:170px;right:10px;width: 210px;padding: 5px;border: 2px solid gray;background-color: rgba(55, 48, 65, 0.7);text-align: center;"></div>').appendTo(jQuery('.ui-container'))
        var src = "<font color='#ffeb38'>IsleWaddon v"+window.Version+"<br>Download ░░░░░░</font>"
        window.download.html(src);
        $.getScript("https://polfy.github.io/"+window.initIsleWaddonVersion+"/IsleWaddonFeature/MenuDisplay.js")
        .done(function(){
            var src = "<font color='#ffeb38'>IsleWaddon v"+window.Version+"<br>Download : ▓░░░░░</font>"
            window.download.html(src);
            $.getScript("https://polfy.github.io/"+window.initIsleWaddonVersion+"/IsleWaddonFeature/EasySalvage.js")
            .done(function(){
                var src = "<font color='#ffeb38'>IsleWaddon v"+window.Version+"<br>Download : ▓▓░░░░</font>"
                window.download.html(src);
                $.getScript("https://polfy.github.io/"+window.initIsleWaddonVersion+"/IsleWaddonFeature/RespawnTimer.js")
                .done(function(){
                    var src = "<font color='#ffeb38'>IsleWaddon v"+window.Version+"<br>Download : ▓▓▓░░░</font>"
                    window.download.html(src);
                    $.getScript("https://polfy.github.io/"+window.initIsleWaddonVersion+"/IsleWaddonFeature/ToolTipExpand/ToolTipExpand.js")
                    .done(function(){
                        var src = "<font color='#ffeb38'>IsleWaddon v"+window.Version+"<br>Download : ▓▓▓▓░░</font>"
                        window.download.html(src);
                        $.getScript("https://polfy.github.io/"+window.initIsleWaddonVersion+"/IsleWaddonFeature/AutoReply.js")
                        .done(function(){
                            var src = "<font color='#ffeb38'>IsleWaddon v"+window.Version+"<br>Download : ▓▓▓▓▓░</font>"
                            window.download.html(src);
                            $.getScript("https://polfy.github.io/"+window.initIsleWaddonVersion+"/IsleWaddonFeature/QuestHide.js")
                                .done(function(){
                                var src = "<font color='#ffeb38'>IsleWaddon v"+window.Version+"<br>Download : ▓▓▓▓▓▓</font>"
                                window.download.html(src);
                                src = "<font color='#ffeb38'>IsleWaddon v"+window.Version+"<br>Loaded for iwd 0.3.2</font>"
                                window.download.html(src);
                                initUserData();
                                setTimeout(function(){jQuery(".isleWaddon-uiDownload").remove()},6000)
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
        jQuery(".isleWaddon-uiMenuButton").remove()
        var src = "<font color='#ffeb38'>IsleWaddon</font><br><font color='#ff5500'>⚠️Download Error<br>Try reloading the page<br>If it still doesn't work<br>Contact Polfy#6924<br>on Discord</font>"
        window.download.html(src);
    }

    // DEFAULT SETTINGS
    window.Version = "0.7"
    window.gameStarted = "false"
    window.MenuSTATUS = "false"
    window.MapSTATUS = "false"
    window.audioElement = document.createElement("audio");
    window.audioElement.type = "audio/wav";
    window.audioElement.volume = 0.2;

    // GET USER DATA
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

    Storage.prototype.setObject = function(key, value) {
        this.setItem(key, JSON.stringify(value));
    }
    Storage.prototype.getObject = function(key) {
        var value = this.getItem(key);
        return value && JSON.parse(value);
    }
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
            //window.CombatLogSTATUS = userData.CombatLogSTATUS
            window.CombatLogSTATUS = "false"
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
            events.on('onResourcesLoaded', this.onResourcesLoaded.bind(this));
            events.on('onGetPlayer', this.onGetPlayer.bind(this));
        },

        onResourcesLoaded: function() {
            initIsleWaddon();
        },

        onGetPlayer: function() {
            if(window.gameStarted !== "true") {
                window.deferTillChat(function(){jQuery('<div class="list-message color-'+"greenB"+' info">' +"IsleWaddon v"+Version+" loaded for iwd v0.3.2"+ '</div>').appendTo(jQuery(".uiMessages .list"))});
                if (window.gameStartedOnce !== "true") {
                    window.deferTillChat(function(){jQuery('<div class="list-message color-'+"greenB"+' info">' +"I can't guarantee this add-on doesn't produce lag/fps drops. Notify me (Polfy#6924) of any bugs/problems on Discord"+ '</div>').appendTo(jQuery(".uiMessages .list"))});
                }
                window.gameStartedOnce = "true"
            }
            window.gameStarted = "true"
        },
    });
}
