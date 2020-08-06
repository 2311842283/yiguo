define([], function () {
    return {
     login:function(){
         $('#btnLogin').on('click',function(){
             $.ajax({
                type: 'post',
                url: 'http://localhost/JS2004/yiguo/php/login.php',
                // dataType: 'json',
                data: {
                    name: $('#username').val(), //将表单的值传给后端。
                    pass: $('#password').val(), //将密码传给后段
                }
               
             }).done(function(data){
                console.log(111);
                  console.log(data);
                  if (!data) { //没有找对对应的账号密码
                    alert('用户名或者密码错误');
                } else { 
                    alert('登陆成功');
                    location.href = "index1.html"; //首页
                }
             })
         })
     }
    }
})