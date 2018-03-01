<?php
header("Content-Type:application/json");
require_once("../init.php");
@$userName=$_REQUEST["userName"];
@$userPwd=$_REQUEST["userPwd"];
@$yzm=$_REQUEST["yzm"];
//每次使用session前都要加这句话，只能有一个
session_start();
//不区分大小写都将他转换
if(strtolower($yzm)!=strtolower($_SESSION["captcha"])){
echo json_encode(["code"=>-1,"msg"=>"验证码不正确"]);
exit;
}
if($userName==null||$userName==""){
echo json_encode(["code"=>-2,"msg"=>"用户名不能为空"]);
}else if($userPwd==null||$userPwd==""){
echo json_encode(["code"=>-3,"msg"=>"密码不能为空"]);
}else{
//$sql="SELECT  uid FROM user WHERE phone='$userName' AND upwd='$userPwd' ";
$sql="SELECT uid FROM user WHERE ( phone='$userName' OR uname='$userName' OR email='$userName') and  upwd='$userPwd' ";
$result=mysqli_query($conn,$sql);
if(!$result){
echo json_encode(["code"=>500,"msg"=>"无法查询数据库"]);
}else{
$row=mysqli_fetch_row($result);
if($row){
//session_start();
$_SESSION["uid"]=$row[0];
echo json_encode(["code"=>1,"msg"=>"登录成功"]);
}else{
echo json_encode(["code"=>-4,"msg"=>"用户名或密码错误"]);
}
}

}
?>