<?php
header("Content-Type:application/json");
require_once("../init.php");
@$uname=$_REQUEST["uname"];
@$email=$_REQUEST["email"];
@$upwd=$_REQUEST["upwd"];
@$phone=$_REQUEST["phone"];
@$userName=$_REQUEST["userName"];
@$gender=$_REQUEST["gender"];
if($uname==null|$uname==""){
	echo json_encode(["code"=>-1,"msg"=>"用户名不能为空"]);
	exit;
}else if($email==null|$email==""){
	echo json_encode(["code"=>-2,"msg"=>"邮箱不能为空"]);
	exit;
}else if($upwd==null|$upwd==""){
	echo json_encode(["code"=>-3,"msg"=>"密码不能为空"]);
	exit;
}else if($phone==null|$phone==""){
	echo json_encode(["code"=>-4,"msg"=>"手机号不能为空"]);
	exit;
}else{
$sql="SELECT uname FROM user where uname='$uname' ";
$result=mysqli_fetch_all(mysqli_query($conn,$sql),1);
if($result){
	echo json_encode(["code"=>-6,"msg"=>"用户名已被占用"]);
}else{
	$sql="SELECT email FROM user where email='$email'";
	$result=mysqli_fetch_all(mysqli_query($conn,$sql),1);
	if($result){
	echo json_encode(["code"=>-7,"msg"=>"邮箱已被占用"]);
}else{
	$sql="SELECT phone FROM user where phone='$phone'";
	$result=mysqli_fetch_all(mysqli_query($conn,$sql),1);
	if($result){
	echo json_encode(["code"=>-8,"msg"=>"手机号已被占用"]);
}else{
	$sql="INSERT INTO `user` (`uid`, `uname`, `upwd`, `email`, `phone`, `username`, `gender`) VALUES (NULL, '$uname', '$upwd', '$email', '$phone', '$userName', $gender); ";

	$result=mysqli_query($conn,$sql);
	if($result==true){
		echo json_encode(["code"=>1,"msg"=>"注册成功"]);
	}else{
		echo json_encode(["code"=>-5,"msg"=>"注册失败"]);
	}
}
}
}
}
?>