<?php
include "conn.php";
$result = $conn->query("select * from yiguo");

$arr = array();
//遍历淘宝商品列表，放入空数组
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i] = $result->fetch_assoc();
}
// print_r($arr);
echo json_encode($arr);