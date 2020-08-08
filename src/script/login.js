define([], function () {
    return {
        login: function () {
            $('#btnLogin').on('click', function () {
                $.ajax({
                    type: 'post',
                    url: 'http://localhost/JS2004/yiguo/php/login.php',
                    // dataType: 'json',
                    data: {
                        name: $('#username').val(), //将表单的值传给后端。
                        pass: $('#password').val(), //将密码传给后段
                    }

                }).done(function (data) {
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


            //验证码
            //随机码
            function random() {
                var arr = [];
                for (var i = 48; i <= 57; i++) {
                    arr.push(String.fromCharCode(i));
                }
                for (var i = 65; i <= 90; i++) {
                    arr.push(String.fromCharCode(i));
                }
                var str = '';
                for (var i = 1; i <= 4; i++) {
                    var ranindex = parseInt(Math.random() * arr.length);
                    if (ranindex > 9) {
                        var bool = Math.random() > 0.5 ? true : false; //相对公平的条件(输出true和false的情形差不多)
                        if (bool) {
                            str += arr[ranindex].toLowerCase();
                        } else {
                            str += arr[ranindex];
                        }
                    } else {
                        str += arr[ranindex];
                    }

                }
                return str;
            }
            let $yzm = $('#VerifyCode');
            let $getyzm = $('.yzm');
            let $yzmp = $('.hyz').next();
            $getyzm.on('click', function () {
                $getyzm.html(random());

            })
            $yzm.on('focus', function () {
                $yzm.css('border-color', '#006aaf');
            })
            //换一张
            $('.yzm').next().on('click', function () {
                $getyzm.html(random());
            })
            console.log($yzmp);
            $yzm.on('blur', function () {
                if ($yzm.val() == $getyzm.html()) {
                    $yzmp.html('√');
                    $yzmp.css('color', 'green');
                    $yzmflag = true;
                } else {
                    $yzmp.html('验证码有误');
                    $yzmp.css('color', 'red');
                    $yzmflag = false;
                }
            });
            $('.form2').on('submit', function () {
                console.log(11);
                let $yzmflag = true;
                if ($yzm.val() === '') {
                    $yzmp.html('验证码不能为空');
                    $yzmp.css('color', 'red');
                    $yzmflag = false;
                }
                if (!$yzmflag) {
                    return false;
                }

            })

        }
    }
})