/**
 * Created by web-01 on 2017/11/28.
 */
//1.header
//1.1动态加载页头的内容 用页头1--实现方案jquery
"use strict";
    //1.1引入头
	header1();
//1.2banner(3d)轮播的实现--实现方案jquery,也可以用原生dom
window.onload=function(){
var $cont=$(".header>.wrap>.contain");
var $nav=$(".header>.wrap>.nav");
var $spanNode=$(".header>.wrap>.nav>span");
//获得列数
var num=100/2.8572;
var zIndex=0;
for(var i=0;i<num;i++){
    i>num/2?zIndex--:zIndex++;
		//增加轮播的内容和样式
		$cont.html($cont.html()+"<ul><li></li><li></li><li></li><li></li></ul>");
		$(".contain ul:nth-of-type("+(i+1)+") li").css("background-position",(-38*i)+'px 0px'
		);
		$(".contain ul:nth-of-type("+(i+1)+")").css("z-index",zIndex);
}
//轮播的控制
		var $oUl=$(".contain>ul");
    var sindex=0;
    $cont.mouseover(function(){
        clearInterval(timeD);
    });
    $cont.mouseout(function(){
        play();
    });
//导航小点
for(var j=0;j<$spanNode.length;j++){
    $spanNode[j].sindex=j;
    $($spanNode[j]).click(function(){
        autoPlay(this);
    });
}
var colums=0;
var timeD;
function play(){
    clearInterval(timeD);
    timeD=setInterval(function(){
        colums++;
        if(colums>=4){
            colums=0;
        }
        autoPlay($spanNode[colums]);
    },4500);
}
play();
function autoPlay(that){
	//移入的时候播放
	//如果那个东西有播放，就继续播放，啥也不用做，如果没有播放，就等正在播放的那个播放完了在播放
	//if(that.className!="active"){
    for(var j=0;j<$spanNode.length;j++){
        $($spanNode[j]).removeClass("active");
    }
    var sindex1=that.sindex;
    $(that).addClass("active");
    for(var m=0;m<$oUl.length;m++){
        $($oUl[m]).css("transform","rotateX("+(sindex1*-90)+"deg)");
        $($oUl[m]).css("transition","all 0.8s "+90*m+"ms");
    }
}
};
//2index-intr
//2.1p中介绍的长度，以及鼠标移入出现所有的介绍内容--实现方案dom
//2.1.1设计一个函数，因为有三个部分，参数为查找到的div，也可以用闭包解决
function detail(div){
    //var p=div.querySelectorAll("p");
    var p=div.querySelectorAll(".info-txt");
    for(var d of p){
        //获取p的宽度，
        var pWidth=getComputedStyle(d).width;
        //获得原来的那所有
        var dinnerb=d.innerHTML;
        //console.log(dinnerb);
        //显示要求的那一部分
        if(dinnerb.length>35) {
            d.innerHTML = d.innerHTML.toString().slice(0,34) + "...";
            //在一开始就把内容给他，如果内容在里面，动画会有问题
            d.nextElementSibling.innerHTML=dinnerb;
            //鼠标移入显示全部的内容,用闭包解决
            return d.onmouseover=function show(){
                this.nextElementSibling.style.height="200px";
                //this.nextElementSibling.innerHTML=dinnerb;
                //鼠标移出恢复
                d.onmouseout=function hide(){
                    this.nextElementSibling.style.height="0px";
                    //this.nextElementSibling.innerHTML="";
                    //this.innerHTML = this.innerHTML.toString().slice(0,34) + "...";
                }
            };
        }
    }
}
//2.1.2调用
detail(document.querySelector(".index-intr-1"));
detail(document.querySelector(".index-intr-2"));
detail(document.querySelector(".index-intr-3"));
detail(document.querySelector(".index-intr-4"));
//2.2第一部分的轮播--实现方案jquery
//找到五张图片的src，保存在数组中
var src=[];
for(var i=1;i<=5;i++){
src.push($(`.index-intr-1-banner>:nth-child(${i})>img`).attr("src"));
    }
//定时器改变图片的src
setInterval(function(){
	//第0个暂存
	var temp=src[0];
	//1,2,3,4依次前移
	for(var i=0;i<src.length-1;i++){
		src[i]=src[i+1];
	}
	//第0个给第4个
	src[4]=temp;
	//将每个对应的src改变
	for(var i=1;i<=5;i++){
	$(`.index-intr-1-banner>:nth-child(${i})>img`).attr("src",src[i-1]);
	}
},3000);
//2.3第二部分的卡牌翻转效果---实现方案原生dom
var V = function (obj) { return document.getElementsByClassName(obj); };
//闪退用事件监听，给父元素绑定事件，原来是给back绑定
//只有最后一个能够出现--闭包
function factory(v){
    v.addEventListener("mouseover", function () {
        var self = this;
        //self.lastElementChild.className = "fliped";
        self.children[1].className="fliped";
        self.firstElementChild.className = "flip";
        //self.lastElementChild.style.display = "block";
        self.lastElementChild.style.opacity = 1;
        //定时器解决闪退的问题
       return setTimeout(function () {
            v.onmouseout = function () {
                self.firstElementChild.className = "fliped";
                //self.lastElementChild.className = "flip";
                self.children[1].className="flip";
                //self.firstElementChild.nextElementSibling.className= "flip";
                self.lastElementChild.style.opacity = 0;
            }
        }, 1000 / 60);
    })
}
for (var v of V("parent")) {
    factory(v);
}
//2.4第三部分照片墙效果,放大和显示--实现方案jquery
//2.4.1移入
$(".pictures").on("mouseenter",".picture-back",function(e){
    var $tar=$(e.target);
    $tar.parent().css({"z-index":100,transform:"scale(1.2)"});
    $tar.css({background:"transparent"});
    $tar.prev().css({display:"block"});
//    2.4.2移出，用translation----必须要改变css，且overflow非常重要！解决动画的问题
});
//不能同时 要重新找，返回不一定是picture-back
$(".pictures").on("mouseout",".picture-back",function(e){
    var $tar=$(e.target);
    $tar.prev().css({display:"none"});
    $tar.parent().css({"z-index":0,transform:"scale(1)"});
    $tar.css({background:"rgba(0,0,0,.3)"});

});
//2.5第四部分 数字的变化的效果--实现方案jquery
function countUp(elem, endVal, startVal, duration, decimal) {
    var startTime = 0;
    var dec = Math.pow(10, decimal);
    var progress,value;
    function startCount(timestamp) {
        startTime = !startTime ? timestamp : startTime;
        progress = timestamp - startTime;
        value = startVal + (endVal - startVal) * (progress / duration);
        value = (value > endVal) ? endVal : value;
        value = Math.floor(value*dec) / dec;
        //elem.innerHTML = value.toFixed(decimal);
        elem.html(value.toFixed(decimal));
        progress < duration && requestAnimationFrame(startCount)
    }
    requestAnimationFrame(startCount)
}
//js document.getElementById("div").offsetTop
var $navbarTop = $(".demo").offset().top;
//只动一次，给一个变量
var count=0;
//console.log($navbarTop);
$(window).scroll(function() {
    //console.log($('.demo>div>div>:nth-child(1) span').html());
   if($(window).scrollTop()>=$navbarTop&&count==0) {
        //for (var i = 1; i <= 4; i++) {
        //    var $tar = $(`.demo>div>div>:nth-child(${i}) span`);
        //    number($tar);
        //}
       countUp($(".demo>div>div>:nth-child(1) span"), 1500, 0, 1000, 0);
       countUp($(".demo>div>div>:nth-child(2) span"), 12000, 0, 1000, 0);
       countUp($(".demo>div>div>:nth-child(3) span"), 20000, 0, 1000, 0);
       countUp($(".demo>div>div>:nth-child(4) span"), 3000, 0, 1000, 0);
       count+=1;
    }else if($(window).scrollTop()<=$navbarTop){
       count=0;
   }
});
//3.1楼层点亮和滚动
$(window).scroll(function() {
    if ($(window).scrollTop() >= $(".index-intr").offset().top-50) {
        $(".floor").slideDown(500);
        if($(window).scrollTop()>=$(".index-intr-1").offset().top&&$(window).scrollTop()<=$(".index-intr-2").offset().top){
            $(".floor>li").css({background:"#00bc71"});
            $(".floor>li:eq(0)").css({background:"#e0b02e"})
        }else  if($(window).scrollTop()>=$(".index-intr-2").offset().top&&$(window).scrollTop()<=$(".index-intr-3").offset().top){
            $(".floor>li").css({background:"#00bc71"});
            $(".floor>li:eq(1)").css({background:"#e0b02e"})
        }else  if($(window).scrollTop()>=$(".index-intr-3").offset().top&&$(window).scrollTop()<=$(".index-intr-4").offset().top){
            $(".floor>li").css({background:"#00bc71"});
            $(".floor>li:eq(2)").css({background:"#e0b02e"})
        }else  if($(window).scrollTop()>=$(".index-intr-4").offset().top){
            $(".floor>li").css({background:"#00bc71"});
            $(".floor>li:eq(3)").css({background:"#e0b02e"})
        }
    }else{
        $(".floor").slideUp(500);
    }
});
//4.1引入尾
footer();

