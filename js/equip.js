"use strict";
//1.引入头
header1();
//2.1爆炸-实现方式jquery
$(document).ready(
    function() {
        //fei的作用是避免动画叠加
        var nowimg = 0,fei=true;
        //2.1.1背景
        $(".bgImage p").each(
            function(){
                var a = $(this).index() % 4 * 250;
                var b = parseInt($(this).index() / 4) * 100;
                $(this).css({"left":a,
                        "top": b,
                        "background-position":(-a) + "px " + (-b) + "px "
                    });

            });
        //2.1.2左右按钮
        $(".rightbtn").click(
            function(){
                if(nowimg<6){
                    nowimg ++;
                }else{nowimg = 0;}
                dong();
            });
        $(".leftbtn").click(
            function(){
                if(nowimg > 0 ){
                    nowimg --;
                }else{nowimg = 5;}
                dong();});
        //2.1.3自动轮播
        function zidong(){
            if(nowimg<6){
                nowimg ++;
            }else{nowimg = 0;}
            dong();
        }
        setInterval(zidong,3000);
        //2.1.4轮播函数
        function dong(){
            if(fei==true) {
                fei=false;
                //加过渡：
                $(".bgImage p").css("transition", "all 1s ease 0s");
                $(".bgImage").addClass("fei");
                $(".changePicture img").attr("src", "img/equip/banner/" + nowimg + ".jpg");
                $(".circle>li").removeClass("cur");
                $(`.circle>li:eq(${nowimg})`).addClass("cur");
                setTimeout(function () {
                    //去掉过渡
                    $(".bgImage p").css("transition", "none");
                    $(".bgImage p").css("background-image", "url(img/equip/banner/" + nowimg + ".jpg)");
                    //准备下一张图
                    $(".bgImage").removeClass("fei");
                    fei=true;
                }, 1000);
            }
        }

    });
//尾部
footer();