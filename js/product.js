"use strict";
//1.1加载头
header1();
//1.2相册3d轮播--实现方式jquery,用到drag拖动的插件和tweenmax动画处理框架
var $imgs = $('.container .img-holder');
var l = $imgs.length;
var radius = 400;
TweenMax.set($('.container'), {
    css: {
        transformStyle: 'preserve-3d',
        perspective: 800,
        perspectiveOrigin: '50% 50%'
    }
});
var posArray = [];
var totalImgToView = 5;
var imgMinus = 0.6301;
var angle = 0;
$imgs.each(function(i, item){
    angle = i * 0.63;
    //console.log('angle ',angle);
    var zPos = - Math.abs(angle * (100 ));

    var xPos = Math.sin (angle) * radius;
    posArray.push({x:xPos,z:zPos,angle:angle});
    var imgAlpha = (Math.ceil(0.5 * totalImgToView) * imgMinus) * 100;
    //imgAlpha = Math.abs(zPos) < imgAlpha ? 1 : 0;
    TweenMax.to(item,1, {x:xPos,z:zPos,ease:Expo.easeOut,autoAlpha:0});
});
var curImgViewIndex = 0;
var targetImgViewIndex = 0;
var curIntervalId = 0;
var scrollbarDragging = false;
function rotate(){
    var minusVal = targetImgViewIndex - curImgViewIndex > 0 ? -0.6301 : 0.6301;
    var easeObj;
    var tweenTime;
    if(Math.abs(targetImgViewIndex - curImgViewIndex) === 1){
        easeObj = Quint.easeOut;
        tweenTime = 1;
    }else {
        easeObj = Linear.easeNone;
        tweenTime = 0.15;
    }
    $imgs.each(function(i, item){
        var pos = posArray[i];
        pos.angle = pos.angle + minusVal ;  //(0.6301*0.06);
        var angleDistance = pos.angle * 100;
        var zPos = - Math.abs(angleDistance);
        var xPos =  Math.sin (pos.angle) * radius;
        var imgAlpha = (Math.ceil(0.5 * totalImgToView) * imgMinus) * 100;
        imgAlpha = Math.abs(zPos) < imgAlpha ? 1 : 0;
        var rotDeg = Math.round(angleDistance) >= 0 ? -30 : 30;
        rotDeg = Math.round(angleDistance) === 0 ? 0 : rotDeg;
        TweenMax.to(item, tweenTime,  {x:xPos,z:zPos,ease:easeObj,autoAlpha:imgAlpha,rotationY:rotDeg});

    });
    minusVal > 0 ? curImgViewIndex-- : curImgViewIndex++;
    if(curImgViewIndex === targetImgViewIndex){
        clearInterval(curIntervalId);
    }
}
function showImgAt(index){
    targetImgViewIndex = index;
    if(targetImgViewIndex === curImgViewIndex){
        return;
    }
    clearInterval(curIntervalId);
    curIntervalId = setInterval(function(){
        rotate();
    },150);
    //update scrollbar
    if(!scrollbarDragging){
        var l = $imgs.length - 1;
        if(targetImgViewIndex > l){
            return;
        }
        var curScrollX = Math.abs(Math.round(targetImgViewIndex * (702 / l ) ) );
        var tweenTime = Math.abs((targetImgViewIndex - curImgViewIndex) * 0.2);
        TweenMax.to($('.scroller'),tweenTime,{x:curScrollX,ease:Sine.easeOut});
    }
}
//CONTROLLER UPDATE
var $input = $('.controller input');
$input.keyup(function(e){
    if(e.keyCode === 13){
        showImgAt(parseInt($input.val()))
    }
});
//just to do start up animation
showImgAt(5);
//----------------------- Dragging Utility ----------------------
Draggable.create('.scroller',{type:'x',bounds:{left:0,top:0,width:802,height:0},onDrag:function(){
    var curImgIndex = Math.abs(Math.round(this.x / (802/l)));
    targetImgViewIndex = curImgIndex;
    if(targetImgViewIndex === curImgViewIndex){
        return;
    }
    rotate();
},onDragStart:function(){
    scrollbarDragging = true;
},onDragEnd:function(e){
    scrollbarDragging = false;
}});
$('.scrolller-container').on('click',function(e){
    var curImgIndex = Math.abs(Math.round(e.offsetX / (802/l)));
    if(curImgIndex >= $imgs.length){
        curImgIndex = $imgs.length - 1;
    }console.log('boom');
    showImgAt(curImgIndex);
});
$('.scrolller-container .scroller').on('click', function(e){
    e.stopPropagation();
});
$imgs.on('click',function(){
    showImgAt($imgs.index($(this)));
});
//2.1第一部分-路线动态变化--实现方式jquery
//利用Jquery获取到path元素--必须要是dom元素，定义函数方便后面调用
function path(path) {
    //获取path画出线条的总长度
    var length = path.getTotalLength();
// 清除之前的动作
        path.style.transition = path.style.WebkitTransition = 'none';
// 设置起始点
        path.style.strokeDasharray = length + ' ' + length;
        path.style.strokeDashoffset = length;
// 获取path的边界矩形的位置 获取一个区域，获取相关的样式，让浏览器寻找一个起始点。
        path.getBoundingClientRect();
// 定义动作
        path.style.transition = path.style.WebkitTransition =
            'stroke-dashoffset 2s ease-in-out';
// Go!
        path.style.strokeDashoffset = '0';

}
//必须是dom元素才可以--测试
//先调一下这个函数,滚动事件
var $navbarTop=$(".product-intr-1").offset().top;
var count=0;
$(window).scroll(function() {
    //console.log($('.demo>div>div>:nth-child(1) span').html());
    if ($(window).scrollTop() >= $navbarTop && count == 0) {
        $(".out:eq(0)").css({display:"block"});
        path($(".path")[0]);
        //公里数的显示
        $(".out:eq(0) .png").animate({"opacity":1},5000);
        $(".picture-detail:eq(0) img").animate({"opacity":1},5000);
        count+=1;
    }
})

//改为click
//2.2切换--实现方案jquery
$(".product-intr-1>.main>ul").on("click","li>i",function(e){
    //console.log($(e.target));
//记住它是第几个孩子--嵌套不方便，借助自定义属性
//console.log($(e.target).parent().data("position"));
    var i=$(e.target).parent().data("position");
//找到它的类,查找类中是不是有selected
//    麻烦 就两个背景图重合
// 如果有，就重新加载一遍，其他不变
//    如果没有，就找它的兄弟姐妹的selected，并改变为没有，并将自己的改为selected
    console.log($(e.target)[0].className);
    //没有选中，就选中，选中就直接变化
    if($(e.target)[0].className.indexOf("selected")==-1){
    //取消已经选中的--找奇数的孩子 隐藏，偶数的孩子显示，并且前面为了统一给一个呼应
        $(e.target).parent().siblings().children(":odd").css({display:"none"});
        $(e.target).parent().siblings().children(":even").css({display:"block"});
    //    对于它自己进行隐藏，他的兄弟进行显示
    $(e.target).css({display:"none"});
    $(e.target).siblings().css({display:"block"});
        //所有的路线和图片隐藏，对应的那个显示，img透明度为零，加载路线，加载图片
        $(".out").css({display:"none"});
        $(`.picture-detail img`).css({"opacity":0});
        $(`.out:eq(${i})`).css({display:"block"});
        $(`.out:eq(${i}) .png`).animate({"opacity":1},5000);
        path($(".path")[i]);
        $(`.picture-detail:eq(${i}) img`).animate({"opacity":1},2000);
    }
})
//3.1第二部分 小勾的出现
//鼠标滚动达到一定距离，改变opacity显示
$(window).scroll(function(){
    if($(window).scrollTop()>$(".product-intr-2").offset().top){
        $(".icon_right").animate({opacity:1},1000);
        $(".today").animate({opacity:1},1000);
    }
})
//4.2滚动进入，第一页显示一下
var distance=0;
if(distance==0) {
    $(window).scroll(function () {
        if ($(window).scrollTop() > $(".product-intr-3").offset().top && distance == 0) {
            distance += 1;
            $(".map>:nth-child(1) svg").slideDown(500, function () {
                $(".map>:nth-child(1) div").slideDown(500);
            });
        }
    });
}
//4.1选择城市随之变化
$(".city").on("mouseenter","li",function(e){
    distance=1;
   var  $tar=$(e.target);
    //查找下标，直接用index()
    var i=$tar.index()+1;
    if(!$tar.hasClass("icon_place")){
        $tar.siblings().removeClass("icon_place");
        $tar.addClass("icon_place");
        //4.2切换
        //为了实现不同的动态效果，将遮罩和svg图分开
        $(".map").children().children().css({"display":"none"});
        //$(`.map>:nth-child(${i})`).css({"display":"block"});
        //让他有出现的顺序
        $(`.map>:nth-child(${i}) svg`).slideDown(1000,function(){
            $(`.map>:nth-child(${i}) div`).slideDown(2000);
        });
        //$(`.map>:nth-child(${i}) div`).fadeIn(1000);
        }
});

//5.1marsonry插件的启用
$('.grid').masonry({
    //指定哪些子元素将用作布局中的项元素
    itemSelector: '.grid-item',
    //列宽
    columnWidth: '.grid-sizer',
    //以百分比值而不是像素值设置项目位置
    percentPosition: true,
    //stamp:"stamp",
});
//5.2变化的效果
$(".grid").on("mouseover","div>div>img",function(e){
    $(e.target).next().animate({"opacity":1},1000)
    //console.log(1);
})
$(".grid").on("mouseout","div>div>img",function(e){
    $(e.target).next().animate({"opacity":0},1000)
    //console.log(1);
})
//6.1引入尾部
footer();

