'use-strict';
//头部选项的切换
$(".header>.main>ul>li").on("click","a",function(e){
    e.preventDefault();
    var $tar=$(e.target);
    if($tar.parent().index()==0)
    location.href="index.html";
    if($tar.parent().index()==3)
        location.href="company.html";
    else{
        $tar.addClass("choose").parent().siblings().children().removeClass("choose");
    }

})
//右边边框
$(".header>.main>div>ul>li:not(:first-child)").hide();
$(".header>.main>div>.frontUser").mouseenter(function(e){
    $(".header>.main>div>.message").children().slideUp();
    var $tar=$(e.target);
    $tar.hide();
   var $li=$tar.prev('ul').children(":not(:first-child)");
       $li.slideDown();
    $li.children().mouseover(function(e){
        $(e.target).parent().css({"background":"#C6D99D"});
    }).mouseout(function(e){
        $(e.target).parent().css({"background":"#DAE5C5"});
    })
    setTimeout(function(e){
        $(".header>.main>div>ul>li:not(:first-child)").slideUp();
        $(".header>.main>div>.frontUser").show();
    },4000);
})
$(".header>.main>div>.message").children().hide();
$(".header>.main>div>.fans").parent().mouseenter(function(e){
    $(".header>.main>div>ul>li:not(:first-child)").slideUp();
    $(".header>.main>div>.message").children().slideDown();
    $(".header>.main>div>.fans").css({"background":"#ffeb7f"});
    $(".header>.main>div>.message>li>a").mouseenter(function(e){
        $(e.target).css({"background":"#ECD558"});
        $(e.target).parent().css({"background":"#ECD558"})
    }).mouseout(function(e){
        $(e.target).css({"background":"#ffeb7f"});
        $(e.target).parent().css({"background":"#ffeb7f"})
    })
    setTimeout(function(e){
        $(".header>.main>div>.message").children().slideUp();
        $(".header>.main>div>.fans").css({"background":"url(img/user/img.png)  -65px -271px no-repeat"});
    },2000);
});
//页面切换 num为-1和+1
function change_hot_activity(num){
    console.log(num);
}
//切换的实现 js
var phoneBanner=document.querySelectorAll(".right>.content>.phoneBanner");
var nav=document.querySelectorAll(".right>.content>.nav");
phoneBanner[1].style.display="none";
for(var i=0;i<nav.length;i++){
    nav[i].onclick=factory(i);
}
//闭包，不能用this 要用e.target
function factory(i){
    return (e)=>{
        for(var n of nav){
            n.className="nav";
        }
        for(var p of phoneBanner){
            p.style.display="none";
        }
        e.target.className="nav on";
        phoneBanner[i].style.display="flex";
        if(i==1){
            map();
            weekData();
        }
    }
}
//地图
//中心点 中间点的坐标都是由数据库动态获取
//方法：通过定位将当前经纬度每隔一定时间上传到服务器，显示轨迹时通过接口从服务器上获取这些经纬度信息，再将这些点信息连成轨迹就可以了。
function map() {
    var map = new BMap.Map("allmap");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);
    var walking = new BMap.WalkingRoute(map, {
        renderOptions: {
            map: map,
            autoViewport: true
        }
    });
    var start = new BMap.Point(116.310791, 40.003419);
    var end = new BMap.Point(116.326419, 40.003519);
    walking.search(start, end);
}
//柱状图
function weekData() {
    var cvs = document.getElementsByClassName('can')[0];
//没有办法到下面一开始用数值不行 换成高也不行
//ajax传值 然后 for 循环实现动态
    var h = parseInt(window.getComputedStyle(cvs).height);
    var ctx = cvs.getContext('2d');
    ctx.fillRect(7, h - 33 , 24, 33);
    ctx.fillRect(38 + 14, h - 33, 24, 33);
    ctx.fillRect(38 * 2 + 14 , h - 33 , 24, 33);
    ctx.fillRect(38 * 3 + 14 , h - 33 , 24, 33);
    ctx.fillRect(38 * 4 + 14 , h - 33 , 24, 33);
    ctx.fillRect(38 * 5 + 14 , h - 33, 24, 33);
    ctx.fillRect(38 * 6 + 14 , h - 33, 24, 33);
}
//上面运动数据的轮播切换 dBpictures
//给父元素绑定事件
(()=>{
    var $dPicture=$(".right>.content>.dPicture");
    var imgClass=[];
    for(var i=0;i<$dPicture.children(".dDetail").length;i++){
    imgClass.push($dPicture.children(".dDetail")[i].className);
    }
    setInterval(()=>{
        var temp=imgClass[0];
        //1,2,3,4依次前移
        for(var i=0;i<imgClass.length-1;i++){
            imgClass[i]=imgClass[i+1];
        }
        //第0个给第4个
        imgClass[2]=temp;
        for(var i=0;i<=2;i++){
            $dPicture.children(".dDetail")[i].className=imgClass[i];
        }
    },2000);
})();
//canvas画图
//1.运动目标
(()=>{
    //问题 定位不准确,不能用css控制canvas的高度和宽度
    //，一定要使用 Canvas 自带的 width 和 height 属性，必须要使用px 不要使用 CSS 来控制，因为 CSS 控制会导致 Canvas 变形。可以试着与 PhptpShop 对比一下，后者是改变“图像大小”，前者才是正确的改变“画布大小”
    var healthy1 = document.getElementsByClassName("healthyPosition")[0];
    var healthy2 = document.getElementsByClassName("healthyPosition")[1];
    var healthy3 = document.getElementsByClassName("healthyPosition")[2];
    //获取画笔
    var ctx=healthy1.getContext("2d");
    ctx.beginPath();
    ctx.arc(95,95,80,0,2*Math.PI);
    ctx.lineWidth=25;
    ctx.strokeStyle = '#FFE3AC';
    ctx.stroke();
    ctx.fillStyle='#FFA200';
    ctx.font="20px Arial";
    ctx.fillText("运动目标完成",33,85);
    ctx.font="30px Arial";
    ctx.fillText("0%",80,115);
    //第二个
    var ctx1=healthy2.getContext("2d");
    ctx1.beginPath();
    ctx1.arc(95,95,95,0,2*Math.PI);
    //ctx1.lineWidth=0px;
    ctx1.fillStyle="#6FC4DC";
    ctx1.fill();
    ctx1.fillStyle='#ffffff';
    ctx1.font="25px Arial";
    ctx1.fillText('"零夜"安眠',33,85);
    //第三个
    //画圆和文字
    var ctx2=healthy3.getContext("2d");
    ctx2.beginPath();
    ctx2.arc(95,95,95,0,2*Math.PI);
    ctx2.fillStyle="#E7F5CE";
    ctx2.fill();
    ctx2.fillStyle='#92B452';
    ctx2.font="25px Arial";
    ctx2.fillText('健康',70,60);
    ctx2.fillText('BMI 20.8',50,90);
    ctx2.closePath();
    //画三角形
    ctx2.beginPath();
    ctx2.fillStyle="#92B452";
    ctx2.moveTo(70,95);
    ctx2.lineTo(80,95);
    ctx2.lineTo(75,100);
    ctx2.closePath();
    ctx2.fill();
    //画矩形
    ctx2.fillStyle="#96CCE8";
    ctx2.fillRect(20,103,50,15);
    ctx2.fillStyle="#B2D67E";
    ctx2.fillRect(70,103,30,15);
    ctx2.fillStyle="#F5D077";
    ctx2.fillRect(100,103,20,15);
    ctx2.fillStyle="#F29C9C";
    ctx2.fillRect(120,103,60,15);
//  画字
    ctx2.fillStyle='#92B452';
    ctx2.font="5px Arial";
    ctx2.fillText('18.5',50,130);
    ctx2.fillText('24',90,130);
    ctx2.fillText('28',120,130);
})();
//运动的切换
$(".intr>.sportIntr>.main>.right>.content>div:gt(0)").hide();
$(".sportIntr>.main>.left").on("click","ul>li>a",function(e){
    e.preventDefault();
    //解决办法:给a上面加一个a 相当于遮罩。
    $(".intr>.sportIntr>.main>.right>.content>div").hide();
    var $tar=$(e.target);
    $tar.addClass("on").parent().siblings().children("a").removeClass("on");
    var $num=$tar.parent().index();
    $(`.intr>.sportIntr>.main>.right>.content>div:eq(${$num})`).show();
})
//上面竞赛，运动的切换
$("#sport").click((e)=>{
    e.preventDefault();
    $(".sportIntr").show().siblings().hide();
})
$("#match").click((e)=>{
    e.preventDefault();
    $(".matchIntr").show().siblings().hide();
})
//引入尾
footer();
