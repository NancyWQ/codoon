<?php
header("Content-Type:application/json");
//跨域
//header("'Access-Control-Allow-Origin', '*'");
require_once("../init.php");
@$kw=$_REQUEST["kw"];
$sql="select * from articleinfo";
if($kw){
  //$kw:"mac 256g i7"
  $kws=explode(" ",$kw);//$kw.split(" ")
  //$kws=["mac","256g","i7"]
  for($i=0;$i<count($kws);$i++){
    $kws[$i]=" title like '%$kws[$i]%' ";
  }
  //$kws=[
    //" title like '%mac%' ",
    //" title like '%256g%' ",
    //" title like '%i7%' "
  //];
  $where=   //$kws.join(" and ")
    " where ".implode(" and ",$kws);
  //$where=" where title like '%mac%' and title like '%256g%' and title like '%i7%' ";
  $sql.=$where;
}
@$pageSize=$_REQUEST["pageSize"];
if(!$pageSize)$pageSize=9;
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,1);
$count=count($rows);
@$pno=$_REQUEST["pno"];
if(!$pno) $pno=1;
$sql.=" limit ".($pno-1)*$pageSize.",$pageSize";
$output=[
  "pageSize"=>$pageSize,
  "count"=>$count,
  "pageCount"=>ceil($count/$pageSize),
  "pno"=>$pno,
  "data"=>
    mysqli_fetch_All(mysqli_query($conn,$sql),1)
];
echo json_encode($output);

?>
