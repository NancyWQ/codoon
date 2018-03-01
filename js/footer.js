//鼠标移入出现，鼠标退出 消失
$(".wechat").hover(function(e){
    $(".erweima").animate({"opacity":1},1000);
    //$(".erweima").css({"opacity":1});
}).mouseout(function(e){
    //$(".erweima").css({"opacity":0});
    $(".erweima").animate({"opacity":0},1000);
})