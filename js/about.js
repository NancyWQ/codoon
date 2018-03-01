/**
 * Created by web-01 on 2018/1/19.
 */
//1.1
header1();
//1.2轮播-jquery
$(function(){
    //自动轮播
    function banner(){
        var $res=$('.box>ul').css('margin-left');
        var $leftNum=parseInt($res.substr(0,$res.length-2));
        if($leftNum<=0&&$leftNum>=-1068){
            $('.box>ul').animate({'margin-left':(($leftNum-255)+'px')},1000);
        }else{
            $('.box>ul').css('margin-left',(0+'px'));
        }
    }
    var timer=setInterval(banner,1000);
    $('.banner>:last-child').hide();
    $('.banner>:nth-child(1)').hide();
    //鼠标移入
    $(".banner").mouseover(function(){
        $('.banner>:last-child').show(500);
        $('.banner>:nth-child(1)').show(500);
        clearInterval(timer);
        timer=null;
    })
    //鼠标移出
    $(".banner").mouseout(function(){
        //$('.banner>:last-child').hide();
        //$('.banner>:nth-child(1)').hide();
        setInterval(banner,1000);
    })
    //右边按钮
    $('.banner>:last-child').on('click',function(){
        var res=$('.box>ul').css('margin-left');
        var leftNum=parseInt(res.substr(0,res.length-2));
        if(leftNum<=0&&leftNum>=-1068)
            $('.box>ul').animate({'margin-left':((leftNum-255)+'px')},1000);
    });
    //左边按钮
    $('.banner>:nth-child(1)').on('click',function(){
        var res=$('.box>ul').css('margin-left');
        var leftNum=parseInt(res.substr(0,res.length-2));
        if(leftNum<0){
            $('.box>ul').animate({'margin-left':((leftNum+255)+'px')},1000);
        }
    });
});
//2.1左边菜单导航
$(".leftNavbar").on("mouseenter","ul>li>a",function(e){
    $tar=$(e.target);
    $tar.css({"color":"#00bc71"});
    $tar.css({"border-bottom-color":"#00bc71"});
});
$(".leftNavbar").on("mouseout","ul>li>a",function(e){
    $tar=$(e.target);
    $tar.css({"color":"#6c6c6c"});
    $tar.css({"border-bottom-color":"#eaeaea" +
    ""});
});
//2.2多页菜单切换--原生dom
var tabs=
    document.querySelectorAll("[data-toggle=tab]");
for(var t of tabs){//Step2: 绑定事件
    t.onmouseover=e=>{
        var a=e.target;
        a.style.background="#00bc71";
        //Step3: 查找要修改的元素
        //var i=a.href.lastIndexOf("#");
        var id=a.dataset.target;//a.href.slice(i);
        console.log(id);
        var div=document.querySelector(id);
        if(div.className!="active"){
            //Step4: 修改元素
            //找到#container下class为active的一个div,直接清除其class属性
            document.querySelector(".container>.active")
                .className="";
            //将当前div的class改为active
            div.className="active";
        }
    }
    t.onmouseout=function(e){
        e.target.style.background="none";
    }
}
// 百度地图API功能
var map = new BMap.Map("allmap");    // 创建Map实例
map.centerAndZoom(new BMap.Point(104.082177,30.545379), 16);  // 初始化地图,设置中心点坐标和地图级别
var marker = new BMap.Marker(new BMap.Point(104.082177,30.545379)); // 创建点
map.addOverlay(marker);
//添加地图类型控件
map.addControl(new BMap.MapTypeControl({
    mapTypes:[
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
    ]}));
map.setCurrentCity("成都");          // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
footer();