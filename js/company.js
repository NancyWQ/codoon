//引入头
header1();
//轮播
$(".banner>div").hide();
$(".banner>div:eq(0)").show();
var length=$(".banner>div").length;
var index=$(".banner>div").index();
var timer=null;
function moveLeft(){
    index++;
    if(index==length){
        index=0;
    }
    $(".banner>div").eq(index).show().siblings().hide();
    $(".indicators>li").eq(index).addClass("active").siblings().removeClass("active");
}
timer=setInterval(moveLeft,2000);
$(".indicators").on("click","li",function(){
    var index=$(this).index();
    $(this).addClass("cur").siblings().removeClass("cur");
    $(".banner>div").eq(index).show().siblings().hide();
});
//切换
$(".company-intr-3>.main>div").on("mouseenter","div",function(e){
    var $tar=$(e.target);
    $tar.prev().css({
        height:"170px"
    })
})
$(".company-intr-3>.main>div").on("mouseout","div",function(e){
    var $tar=$(e.target);
    $tar.prev().css({
        height:"0px"
    })
})
//手风琴
//跳转