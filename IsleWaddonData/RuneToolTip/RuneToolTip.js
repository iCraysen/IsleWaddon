// RUNE DATA //
$.getScript("https://polfy.github.io/IsleWaddon/IsleWaddonData/RuneToolTip/RuneData.js")

function expandRuneTooltip(obj) {
    var name = obj.spell.name.toLowerCase();
    var txt;
    if(Array.isArray(spells[name].statType) == true){
        txt = spells[name].statType.map(x => "<font color='orange'>"+x+"</font>");
    } else{
        txt = "<font color='orange'>"+spells[name].statType+"</font>";
    }
    var newText = "Benefits from stats: ["+txt+"]<br>";
    Object.keys(obj.spell.values).forEach(function(key) {
        var minmax;
        if(key in spells[name].random){
            minmax = spells[name].random[key];
        } else{
            minmax = spells[name].random["i_"+key];
        }
        var maxrange = minmax[1]-minmax[0];
        var currange = obj.spell.values[key]-minmax[0];
        var startcolor = {r:255,g:0,b:0};
        var endcolor = {r:0,g:255,b:0};
        var r = startcolor.r + (endcolor.r-startcolor.r)*currange/maxrange;
        var g = startcolor.g + (endcolor.g-startcolor.g)*currange/maxrange;
        var b = startcolor.b + (endcolor.b-startcolor.b)*currange/maxrange;
        var mycolor = "rgb("+r+","+g+","+b+")";
        newText += key + ": <font style='color:"+mycolor+";'>" + obj.spell.values[key] + "</font>  [<font style='color:rgb("+startcolor.r+","+startcolor.g+","+startcolor.b+");'>"+minmax[0] +"</font>-<font style='color:rgb("+endcolor.r+","+endcolor.g+","+endcolor.b+");'>"+minmax[1]+"</font>]<br>";
    });
    $(".uiTooltipItem .tooltip .damage").eq(0).html(newText);
}
