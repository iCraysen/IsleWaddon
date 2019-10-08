// For Soul's Moor 2019

addons.register({
    init: function(events) {
        events.on('onGetPlayer', this.onGetPlayer.bind(this));
    },

    onGetPlayer: function() {
        window.getNextSpawn();
    }
});

window.getNextSpawn = function(){
    window.bossWait = 598;
    window.bossSpawn = 0;
    $(".ui-container .right .uiEvents .heading").text("Events   🎃");
    window.date = new Date();
    window.dateHours = window.date.getUTCHours();
    window.dateMinutes = window.date.getUTCMinutes();
    window.dateSeconds = window.date.getUTCSeconds();

    window.dateHours = window.dateHours / 4;
    window.dateHours = window.dateHours - Math.floor(window.dateHours);

    window.dateSeconds = 240 * 60 - window.dateHours * 4 * 3600 - window.dateMinutes * 60 - window.dateSeconds;
};

window.repeatEverySecHalloween = function(){
    if(window.dateSeconds > 0){
        window.dateSeconds--;
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
    if(window.dateSeconds != 0){
        $(".ui-container .right .uiEvents .heading").text("Events   🎃 " + toHHMMSS(window.dateSeconds));
    }
    if(window.dateSeconds == 0){
        if(window.bossWait > 0){
            window.bossWait--;
        }
        if(window.bossWait != 0){
            $(".ui-container .right .uiEvents .heading").text("Events   🎃 Squash in " + toHHMMSS(window.bossWait));
        }
        if(window.bossWait == 0 && window.bossSpawn != 1){
            window.bossSpawn = 1;
            $(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃");},500);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");},1000);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃");},1500);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");},2000);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃");},2500);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");},3000);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃");},3500);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");},4000);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃");},4500);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");},5000);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃");},5500);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");},6000);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃");},6500);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");},7000);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃");},7500);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");},8000);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃");},8500);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");},9000);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃");},9500);
            setTimeout(function(){$(".ui-container .right .uiEvents .heading").text("Events   🎃 SQUASH SPAWN");},10000);
            setTimeout(function(){window.getNextSpawn();},50000);
        }
    }
};
setInterval(window.repeatEverySecHalloween, 1000);
