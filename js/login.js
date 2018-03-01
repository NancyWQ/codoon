/**
 * Created by web-01 on 2018/2/1.
 */
(()=> {
    $(".intrInput").focus(function (e) {
        var $tar = $(e.target);
        $tar.css({
            //js里面不用退级
            "background": "url('img/login/welcomeInputCenterOn.png') repeat-x"
        });
        $tar.prev().css({"background": "url(img/login/welcomeInputLeftOn.png) no-repeat"});
        $tar.next().css({"background": "url(img/login/welcomeInputRightOn.png) no-repeat"});
    }).blur(function (e) {
        var $tar = $(e.target);
        $tar.css({
            //js里面不用退级
            "background": "url('img/login/welcomeInputCenter.png') repeat-x"
        });
        $tar.prev().css({"background": "url(img/login/welcomeInputLeft.png) no-repeat"});
        $tar.next().css({"background": "url(img/login/welcomeInputRight.png) no-repeat"});
    })
})();
//验证码的更改
(()=> {
    var $yzm = $(".yanzhengma");
    $yzm.click(function (e) {
        $yzm.attr("src", "data/yzm.php");
    }).parent().next().children("a").click(function (e) {
        e.preventDefault();
        $yzm.attr("src", "data/yzm.php");
    })
})();
//loading的显示和隐藏
(()=> {
    $(".intrInput").click(function (e){
        $(e.target).parent().next().children("img").css({"display":"block"});
        setTimeout(()=>{
            $(e.target).parent().next().children("img").css({"display":"none"});
        },3000)
    })
})();
//点击登录事件
//错误提示
function err(str){
    $(".noteFail>div>p").html(str);
    $(".noteFail").fadeIn();
    setTimeout(()=>{
        $(".noteFail").css({"display":"none"});
    },2000)
}
(()=>{
    $(".loginBtn").click((e)=> {
        e.preventDefault();//阻止事件的默认行为
        //获取用户输入的用户名和密码
        var $uname=$("input[name='userName']").val();
        var $upwd=$("input[name='userPwd']").val();
        var $yzm=$("input[name='userYzm']").val();
        //先验证一下
        var preg=/^[a-zA-Z0-9]{5,11}$/i;
        var zreg=/^[a-z0-9]{4}$/i;
        //正则验证：test
        if(!preg.test($upwd)){
            $("input[name='userPwd']").parent().next().children("img").css({"display":"none"});
            $("input[name='userPwd']").parent().next().children("p").css({"display":"block"});
            setTimeout(()=>{
                $("input[name='userPwd']").parent().next().children("p").css({"display":"none"});
                $("input[name='userPwd']").parent().next().children("img").css({"display":"block"});
            },3000);
            return;
        }else if(!zreg.test($yzm)){
                err("验证码格式不正确");
            return;
        }else {
            $.ajax({
                type: "get",
                url: "data/login/login.php",
                data: {userName: $uname, userPwd: $upwd, yzm: $yzm}
            }).then((data=> {
                console.log(data);
                if (data.code == 1) {
                    $(".noteSuccess").fadeIn();
                    var timer=setInterval(()=>{
                        $second=$(".noteSuccess>div>p>span").html();
                        if($second>0){
                            $second-=1;
                            $(".noteSuccess>div>p>span").html($second);
                        }else{
                            clearInterval(timer);
                            timer=null;
                            location.href="user.html";
                            if($("input[name='rember']").attr("checked")==false){
                                $("input[name='userName']").val("");
                                $("input[name='userYzm']").val("");
                            }
                        }
                    },1000)
                }else{
                    err(data.msg);
                }
            }))
        }
    })
})()
//注册框--jqueryui
    $(function() {
        var $uname = $( "#uname" ),
            $email = $( "#email" ),
            $upwd = $( "#upwd" ),
            $cpwd=$('#cpwd'),
            $phone=$('#phone'),
            $username=$('#username'),
            $gender=$('#gender'),
            allFields = $( [] ).add( $uname ).add( $email ).add( $upwd).add($cpwd).add($phone).add($username),
            tips = $( ".validateTips"),
            $formLogin=$(".formLogin");
        function updateTips( t ) {
            tips.text( t ).addClass( "ui-state-highlight" );
            setTimeout(function() {
                tips.removeClass( "ui-state-highlight", 1500 );
            }, 500 );
        }
        function checkLength( o, n, min, max ) {
            if ( o.val().length > max || o.val().length < min ) {
                o.addClass( "ui-state-error" );
                updateTips( "" + n + " 的长度必须在 " +
                    min + " 和 " + max + " 之间。" );
                return false;
            } else {
                return true;
            }
        }
        function checkRegexp( o, regexp, n ) {
            if ( !( regexp.test( o.val() ) ) ) {
                o.addClass( "ui-state-error" );
                updateTips( n );
                return false;
            } else {
                return true;
            }
        }
        $( ".register-form" ).dialog({
            autoOpen: false,
            height: 700,
            width: 350,
            modal: true,
            buttons: {
                "注册": function() {
                    var bValid = true;
                    allFields.removeClass( "ui-state-error" );
                    tips.html("所有的表单字段都是必填的。");
                    bValid = bValid && checkLength( $uname, "用户名", 3, 16 );
                    bValid = bValid && checkRegexp( $uname, /^[a-z]([0-9a-z_])+$/i, "用户名必须由 a-z、0-9、下划线组成，且必须以字母开头。" );
                    bValid = bValid && checkLength( $email, "email", 6, 80 );
                    bValid = bValid && checkRegexp( $email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com" );
                    bValid = bValid && checkLength( $upwd, "密码", 5, 16 );
                    bValid = bValid && checkRegexp( $upwd, /^([0-9a-zA-Z])+$/, "密码字段只允许： a-z 0-9" );
                    if($upwd.val()!=$cpwd.val()){
                        bValid=false;
                        updateTips("两次密码不一致");
                    }
                    bValid = bValid && checkLength( $phone, "手机号", 11,15 );
                    bValid = bValid && checkRegexp( $phone, /^[1][3-8]\d{9}$/, "手机号格式不符合中国大陆手机号格式" );
                    if ( bValid ) {
                        $.ajax({
                            type:"post",
                            url:"data/login/register.php",
                            data:$formLogin.serialize()
                        }).then((data)=>{
                            if(data.code==1){
                                $( this ).dialog( "close" );
                                alert("注册成功，请登录");
                            }else{
                                tips.html(data.msg);
                                updateTips( tips.html());
                            }
                        })
                    }
                },
                "取消": function() {
                    $( this ).dialog( "close" );
                }
            },
            close: function() {
                allFields.val( "" ).removeClass( "ui-state-error" );
            }
        });

        $( ".registerBtn" ).click(function() {
            $( ".register-form" ).dialog( "open" );
        });
    });
