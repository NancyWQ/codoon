//引入头
header1();
//轮播-js
window.onload = function(){
    var oMove = document.getElementsByClassName("imgMove")[0];
    //运动函数
    var funMove = function(pos){
        var move = function(){
            var curPos = parseInt(oMove.style.top,10);
            var speed = 60;
            if(Math.abs(curPos-pos)>speed){
                //判断移动方向
                curPos-=((curPos-pos)/Math.abs(curPos-pos))*speed;
                oMove.style.top = curPos+"px";
                setTimeout(move,30);
            }else{
                oMove.style.top = pos + "px";
            }
        };
        setTimeout(move,10);
    };
    var oClick = document.getElementsByClassName("leftImg")[0].getElementsByTagName("a");
    for(var i=0; i<oClick.length; i+=1){
        var flag = 0;
        var timeout;
        //鼠标经过播放动画
        oClick[i].onmouseover = function(i){
            return function(e){
                clearTimeout(timeout);
                oClick[flag].className = "";
                this.className = "on";
                funMove(-675*i);
                flag = i;
            }
        }(i);
        oClick[i].onmouseout = function(i){
            return function(e){
                timeout = setTimeout(step,4000);
            }
        }(i);
        //定时器播放动画
        if(i === 0){
            var step = function(){
                oClick[flag].className = "";
                flag = flag>=oClick.length-1?0:flag+1;
                oClick[flag].className = "on";
                funMove(-675*flag);
                timeout = setTimeout(step,4000);
            };
            setTimeout(step,4000);
        }
    }
};
//楼层1
//切换
$(".neiborFloor1>:last-child").hide();
$(".neiborFloor1>:first-child>:last-child>:last-child").css({
    "background":"#fff","border":"1px solid #ddd"
}).click(function(e){
    $(e.target).css({
        "background":"#ddd","border":"none"
    });
    $(e.target).prev().css({
        "background":"#fff","border":"1px solid #ddd"
    })
    $(".neiborFloor1>:last-child").show();
})
$(".neiborFloor1>:first-child>:last-child>:first-child").click(function(e){
    $(".neiborFloor1>:last-child").hide();
    $(e.target).css({
        "background":"#ddd","border":"none"
    });
    $(e.target).next().css({
        "background":"#fff","border":"1px solid #ddd"
    })
})
//单个放大
$(".neiborIntr>.main>div>.info>div>div").mouseenter(function(e){
    $(e.target).parent().css({
        "transform":"scale(1.05)","background":"#fff",
        "boxShadow": "0 9px 9px 0 rgba(0,0,0,.05)"
    })
}).mouseout(function(e){
    $(e.target).parent().css({
        "transform":"scale(1)","background":"#F6F6F6",
        "boxShadow": "none"
    })
})
//跳转功能的实现
$(".neiborIntr>.main>div>.info>div>div").click(function(e){
    console.log($(e.target).siblings("img")[0].src);
})
//楼层2
//首先调用一次
change(0);
//选择
$(".neiborFloor2>:first-child>:first-child").on("click","b",function(e){
   var $index=$(e.target).index();
    var $div=$(`.neiborFloor2>.info:eq(${$index})`);
    $div.removeClass("hide").siblings(":not(p)").addClass("hide");
    $div.children().css({"display":"block"});
    $(e.target).css({"color":"#00bc71"}).siblings().css({"color":"#000"});
    //console.log($(`.neiborFloor2>.info`));
    //调用切换函数
    change($index);
})
//下面的切换和显示
function change(i){
//if(!$(".neiborFloor2>.info").is(".hide")) {
    $(`.neiborFloor2>.info:eq(${i})>div:gt(3)`).hide();
//获取显示的条数
    var $num = Math.ceil($(`.neiborFloor2>.info:eq(${i})>div`).length / 4);
    var $numChange = 1;
    var $numChangeR = 0;
//右边按钮点击
    $(".neiborFloor2>:first-child>:last-child>:last-child").css({
        "background": "#fff", "border": "1px solid #ddd"
    }).click(function (e) {
        if ($numChange < $num) {
            $(`.neiborFloor2>.info:eq(${i})>div`).hide();
            $(`.neiborFloor2>.info:eq(${i})>div:gt(${$numChange * 4 - 1}):lt(4)`).show();
            $(e.target).prev().css({
                "background": "#fff", "border": "1px solid #ddd"
            })
            $numChange++;
            if ($numChange >= $num) {
                $(`.neiborFloor2>.info:eq(${i})>div`).hide();
                $(`.neiborFloor2>.info:eq(${i})>div:gt(${($num - 1) * 4 - 1}):lt(4)`).show();
                $(e.target).css({
                    "background": "#ddd", "border": "none"
                })
            }
        }
    });
//右边按钮点击
    $(".neiborFloor2>:first-child>:last-child>:first-child").click(function (e) {
        if ($numChange >= 1) {
            $numChange--;
            $(`.neiborFloor2>.info:eq(${i})>div`).hide();
            $(`.neiborFloor2>.info:eq(${i})>div:lt(${$numChange * 4}):gt(${$numChange * 4 - 5})`).show();
            $(e.target).next().css({
                "background": "#fff", "border": "1px solid #ddd"
            })
            if ($numChange <= 1) {
                $(`.neiborFloor2>.info:eq(${i})>div:lt(4)`).show();
                $(e.target).css({
                    "background": "#ddd", "border": "none"
                })
            }
        }
    })
}
//三楼
$(".neiborFloor3>:last-child").hide();
$(".neiborFloor3>:first-child>:last-child>:last-child").css({
    "background":"#fff","border":"1px solid #ddd"
}).click(function(e){
    $(e.target).css({
        "background":"#ddd","border":"none"
    });
    $(e.target).prev().css({
        "background":"#fff","border":"1px solid #ddd"
    })
    $(".neiborFloor3>:last-child").show();
})
$(".neiborFloor3>:first-child>:last-child>:first-child").click(function(e){
    $(".neiborFloor3>:last-child").hide();
    $(e.target).css({
        "background":"#ddd","border":"none"
    });
    $(e.target).next().css({
        "background":"#fff","border":"1px solid #ddd"
    })
})
//跳转
$(".inputBox>button").click(function(e){
    //console.log($(e.target).prev().val());
    location=
        "dividePage.html?kw="+$(e.target).prev().val();
})
footer();