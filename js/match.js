/**
 * Created by web-01 on 2018/1/17.
 */
"use strict";
//1.1引入头
header1();
//1.2侧边导航栏的显示和隐藏
$(".main>div>ul").on("mouseenter","li:not(:nth-child(1))",function(e){
    //查找元素下标
    var $n=$(e.target).index();
    $(e.target).siblings().css({background:"#00bc71"});
    $(e.target).css({background:"gray"});
    $(e.target).parent().next().css({display:"block"});
    $(e.target).parent().next().children(":not(span)").css({display:"none"});
    $($(e.target).parent().next().children()[$n-1]).css({display:"block"});
})
//1.3轮播
$(()=>{
    var length=$(".banner-match li").length;
    var index=$(".banner-match li").index(); //初始值为0


    var timer=null;
    $(".banner-match li").eq(0).show().siblings().hide();

    $(".banner .ck-right").click(function(e){
        e.preventDefault();
        moveLeft();
    });
    $(".banner .ck-left").click(function(e){
        e.preventDefault();
        moveRight();
    });

    //鼠标移入时清空定时器
    $(".banner").hover(function(){
        clearInterval(timer);
    },function(){
        timer=setInterval(moveLeft,1000);
    });

    //对应圆点
    $(".indicators").on("click","li",function(){
        var index=$(this).index();
        $(this).addClass("cur").siblings().removeClass("cur");
        $(".banner ul li").eq(index).show().siblings().hide();
    });
    //左移
    function moveLeft(){
        index++;
        if(index==length){
            index=0;
        }
        $(".banner-match li").eq(index).show().siblings().hide();
        $(".indicators li").eq(index).addClass("cur").siblings().removeClass("cur");
    }
    //右移
    function moveRight(){
        index--;
        if(index==-1){
            index=length;
        }
        $('.banner-match li').eq(index).show().siblings().hide();
        $(".indicators li").eq(index).addClass("cur").siblings().removeClass("cur");
    }
    timer=setInterval(moveLeft,1000);

});
//引入尾
footer();