<?php
include "conn.php";
//检测用户名是否重名
if(isset($_POST['name'])){
    $username = $_POST['name'];//获取前端失去焦点传入的用户名的值。
    $result=$conn->query("select * from registry where username = '$username'");//和数据库进行匹配
    if($result->fetch_assoc()){//返回数组，用户名存在
        echo true;//1
    }else{//用户名不存在
        // echo false;//传false不知道为什么js不生效。换成0可以
        echo 0;
    }
}
//判断是否点击submit
if(isset($_POST['submit'])){
    $user = $_POST['username'];
    $pass =($_POST['password']);
    $repass = sha1($_POST['repass']);
    $email = $_POST['email'];
    $conn->query("insert registry values(null,'$user','$pass','$repass','$email',NOW())");
    //php页面跳转
    echo '<script>alert("注册成功");</script>';
    // header('http://localhost/JS2004/Day%2024_cookie/login&registry/src/login.html');
    echo '<script>location.href="../src/login.html";</script>';

}