/**
 * Created by web-01 on 2017/11/28.
 */
"use strict";
//实现公共头部的一些功能
//1.1鼠标移入出现下拉效果--实现方案dom
(()=>{
    var div=document.querySelectorAll(".header_first .menu div");
    for(var d of div) {
//1.1.1鼠标移入事件 显示下拉列表-----注意mouseover和mouseenter的区别
        d.parentNode.onmouseover=function(){
            //d.style.display="block";
            d.style.height="100px";
            //d.style.opacity=1;
            d.parentNode.style.border="1px solid red";
        }
//1.1.2鼠标移出事件 隐藏下拉列表
        d.onmouseout=function(){
            //d.style.display="none";
            d.style.height="0px";
            //d.style.opacity=0;
            d.parentNode.style.border="1px solid transparent";
        }
    }
    d.previousElementSibling.onmouseout=function(){
        //d.style.display="none";
        d.style.height="0px";
        //d.style.opacity=0;
        d.parentNode.style.border="1px solid transparent";
    }

})();
//1.2页面菜单的切换--实现方案jquery
//1.2.1点击跳转并变色
var $menu=$(".header_first .menu");
$menu.on("click","ul>li>a",(e)=>{
    var $tar=$(e.target);
    $tar.addClass("act");
    $tar.parent().siblings().children().removeClass("act");
})
//1.2.2移入变色//1.2.3移出回到原样
//一开始会和click相冲突 ，解决办法：将click所用的类和移入移出所用的类分开，效果一样 名字不同
$menu.on("mouseover","ul>li>a",(e)=> {
    var $tar=$(e.target);
    if (!$tar.hasClass("color")) {
        $tar.addClass("color");
        $tar.mouseleave(function(){
            $(this).removeClass("color");
            $(this).next().css("height","0px");
            $(this).parent().css("border","1px solid transparent");
        })
    }
})
//登录和取消登录
    $.ajax({
        type:"get",
        url:"data/login/isLogin.php",
    }).then((data)=>{
        console.log(data.code);
        if(data.code==1){
            $(".user").html(data.uname).css({
                "display":"block",
            "width":"120px"
            }).siblings("button").css({
                "display":"block"
            }).siblings(":not(.user)").css({
                display:"none"
            })
        }
    })
//退出登录
$(".logout").click(function(e){
    var $tar=$(e.target);
    $.ajax({
        type:"get",
        url:"data/login/logout.php",
    }).then(()=>{
        $tar.css({"display":"none"}).siblings(".user").css({"display":"none"});
        $tar.parent().children(":first-child").css({"display":"block"});
    })
})


