define([], function () {
    return {
     reg:function(){
         $('.username').on('blur',function(){
             $.ajax({
                type: 'post',
                url: 'http://localhost/JS2004/yiguo/php/registry.php',
                dataType: 'json',
                data: {
                    name: $(this).val() //将表单的值传给后端。
                }
             }).done(function(data){
                  console.log(data);
                  if (!data) { //可以注册
                    // console.log(11);
                    $('.username').next().html('√');
                    $('.username').next().css('color','green')
                } else { //用户名重名。
                    console.log(22);
                    $('.username').next().css('color','red')
                    $('.username').next().html('该用户名已被注册');
                }
             })
         })
     }
    }
})