// ==UserScript==
// @name         Combat log
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://play.isleward.com/
// @grant        none
// ==/UserScript==

var idToName = {};
var inCombatWith = {};
var mogHp
var mogDmg = 0
var mogDmgPercent
var timerReset = 0

function addCombatMessage(txt){
    var msg = "*"+txt+"*";
    var color = "redA";
    jQuery('<div class="list-message color-'+color+' rep">' + msg + '</div>').appendTo(jQuery(".uiMessages .list"));
    jQuery(".uiMessages .list").scrollTop(9999999);
}
addons.register({
    init: function(events) {
        events.on('onGetDamage',this.onGetDamage.bind(this));
        events.on('onGetObject',this.onGetObject.bind(this));
		events.on('onGetSpellCooldowns', this.onGetSpellCooldowns.bind(this));
        events.on('onEnterGame', this.onEnterGame.bind(this));
    },
    onEnterGame: function(obj) {
        function deferTillChat(method) {
            if (jQuery(".uiMessages .list")[0] !== undefined) {
                method();
            } else {
                setTimeout(function() { deferTillChat(method) }, 50);
            }
        }
        deferTillChat(function(){jQuery('<div class="list-message color-'+"greenB"+' chat">' +"GROS CON"+ '</div>').appendTo(jQuery(".uiMessages .list"))});
        $(".ui-container .right .uiEvent .heading").text("dzdz");
    },
    onGetDamage: function(dmg) {
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
                    addCombatMessage("You "+(dmg.crit == true ? "critically ":"")+action+" "+enemyName+" for "+ (~~dmg.amount) +" damage.");
                    if(enemyName === "m'ogresh"){
                        timerReset = 21
                        mogDmg+=(dmg.amount)
                        mogDmgPercent = ~~((mogDmg/mogHp)*100)
                        if(mogDmgPercent > 98) {mogDmgPercent = 100}
                        if(mogDmgPercent < 15){
                            $(".ui-container .right .uiEvents .heading").text("You dealt "+(~~mogDmg)+" dmg ("+mogDmgPercent+"%) 😑");
                        } else if(mogDmgPercent < 50){
                            $(".ui-container .right .uiEvents .heading").text("You dealt "+(~~mogDmg)+" dmg ("+mogDmgPercent+"%) 👍");
                        } else if(mogDmgPercent < 100){
                            $(".ui-container .right .uiEvents .heading").text("You dealt "+(~~mogDmg)+" dmg ("+mogDmgPercent+"%) 💪");
                        } else if(mogDmgPercent == 100){
                            $(".ui-container .right .uiEvents .heading").text("You dealt "+(~~mogDmg)+" dmg ("+mogDmgPercent+"%) 😎");
                        }
                    }
                } else if(window.player !== undefined && dmg.id == window.player.id){
                    enemyName = idToName[dmg.source];
                    inCombatWith[dmg.source] = true;
                    addCombatMessage(enemyName+(dmg.crit == true ? " critically":"")+" "+action+"s you for "+ (~~dmg.amount) +" damage.");
                }
            }
        } else{
            if(dmg.event !== undefined){
                if(window.player !== undefined && dmg.id == window.player.id && dmg.text.indexOf(" xp") != -1){
                    addCombatMessage("You gained "+dmg.text+".");
                }
            }
        }
    },
    onGetObject: function(obj) {
        if(obj.sheetName === "characters") {
            if(obj.components[8].list[0] === "butcher" || obj.components[8].list[1] === "butcher"){
                //Play sound à trouver
                console.log(JSON.stringify(obj, null, 4));
                obj.name = "⚔️ "+obj.name+" ⚔️"
            }
        }

        if(obj.name === "m'ogresh"){
            mogHp = obj.components[1].values.hpMax;
            console.log('hpMax: '+mogHp);
        }

        if(obj.name !== undefined){
            idToName[obj.id]=obj.name;
        }
        if(obj.destroyed !== undefined && obj.destroyed == true){
            //delete idToName[obj.id];
            if(obj.id in inCombatWith){
                addCombatMessage(idToName[obj.id] + " has been killed.");
                delete inCombatWith[obj.id];
            }
        }
    },
	onGetSpellCooldowns: function(spell) {
        if(spell.id !== undefined && window.player !== undefined && spell.id == window.player.id && spell.spell !== undefined){
			addCombatMessage("You cast "+window.player.spellbook.getSpell(spell.spell).name);
		}
    }
});
var repeatEverySec = function(){
    if(timerReset != 0){
        timerReset-=1
        if(timerReset == 0){
            $(".ui-container .right .uiEvents .heading").text("Events");
            mogDmg = 0
        }
    }
};
setInterval(repeatEverySec, 1000);
