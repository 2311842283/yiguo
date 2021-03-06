define([], function() {
    return {
        Username: function() {

                let $form1 = $(".form1");
                let $username = $('#username'); //input的id
                let $email = $('#email');
                let $password = $('#password');
                let $repass = $('#repass');
                let $tel = $('#tel');
                let $yzm = $('#yzm');


                let $usernameflag = true;
                let $emailflag = true;
                let $passwordflag = true;
                let $repassflag = true;
                let $telflag = true;
                let $yzmflag = true;


                //1.验证用户名
                let $userp = $('.username p'); //div的类名
                $username.on('focus', function() {
                    $username.css('border-color', '#006aaf');
                })
                $username.on('blur', function() {
                    if (this.value !== '') {
                        let $strlen = this.value.replace(/[\u4e00-\u9fa5]/g, '**').length;
                        let $reg = /^[a-zA-Z\u4e00-\u9fa5\d]+$/g; //正则表达式
                        if ($strlen >= 4 && $strlen <= 20) {
                            if ($reg.test(this.value)) {
                                $userp.html('√');
                                $userp.css('color', 'green');
                                $usernameflag = true;
                            } else {
                                $userp.html('用户名格式错误');
                                $userp.css('color', 'red');
                                $usernameflag = false;
                            }
                        } else {
                            $userp.html('用户名长度有误');
                            $userp.css('color', 'red');
                            $usernameflag = false;
                        }
                    } else {
                        $userp.html('用户名不能为空');
                        $userp.css('color', 'red');
                        $usernameflag = false;
                    }
                })

                //判断用户名是否重名
                $username.on('blur', function() {
                        console.log(11);
                        $.ajax({
                            type: 'post',
                            url: 'http://localhost/php/project/php/reg.php',
                            data: {
                                name: $(this).val()
                            }

                        }).done(function(data) {
                            console.log(data);
                            if (!data) {
                                $username.css('color', 'green');
                                console.log(1)

                            } else {
                                $userp.html('该用户名已被注册');
                                $userp.css('color', 'red');
                                console.log(2)
                            }
                        })

                    }) //username
                    //2.邮箱验证
                let $emailp = $('.email p'); //div的类名
                $email.on('focus', function() {
                    $email.css('border-color', '#006aaf');
                })
                $email.on('blur', function() {
                    if (this.value !== '') {
                        let $reg = /^(\w+[+-.]*\w+)\@(\w+\w+)\.(\w+\w+)$/;
                        if ($reg.test(this.value)) {
                            $emailp.html('√');
                            $emailp.css('color', 'green');
                            $emailflag = true;
                        } else {
                            $emailp.html('邮箱格式有误');
                            $emailp.css('color', 'red');
                            $emailflag = false;
                        }
                    } else {
                        $emailp.html('邮箱不能为空');
                        $emailp.css('color', 'red');
                        $emailflag = false;
                    }
                })

                //3.密码
                let $passwordp = $('.password p'); //div的类名
                let $passstrong = $('.password p strong');

                $password.on('focus', function() {
                    $password.css('border-color', '#006aaf');
                });
                $password.on('input', function() {
                    if ($password.val().length >= 6 && $password.val().length <= 20) {
                        let $regnum = /\d+/; //数字 
                        let $reglower = /[a-z]+/; //小写字母 
                        let $regupper = /[A-Z]+/; //大写字母
                        let $other = /[\W\_]+/; //特殊字符
                        let $count = 0; //计数器
                        if ($regnum.test($password.val())) {
                            $count++;
                        }
                        if ($reglower.test($password.val())) {
                            $count++;
                        }
                        if ($regupper.test($password.val())) {
                            $count++;
                        }
                        if ($other.test($password.val())) {
                            $count++;
                        }

                        switch ($count) {
                            case 1:
                                $passstrong.html('弱');
                                $passstrong.css('color', 'red');
                                $passwordflag = false;

                                break;
                            case 2:
                            case 3:
                                $passstrong.html('中');
                                $passstrong.css('color', 'green');
                                $passwordflag = true;
                                break;
                            case 4:
                                $passstrong.html('强');
                                $passstrong.css('color', 'green');
                                $passwordflag = true;
                                break;
                        }
                    }
                });
                $password.on('blur', function() {
                    if (this.value !== '') {
                        if ($passwordflag) {
                            $passwordp.html('√');
                            $passwordp.css('color', 'green');
                            passwordflag = true;

                        }
                    } else {
                        $passwordp.html('密码不能为空');
                        $passwordp.css('color', 'red');
                        passwordflag = false;
                    }
                })

                //4.确认密码
                let $repassp = $('.repass p'); //div的类名

                $repass.on('focus', function() {
                    $repass.css('border-color', '#006aaf');
                });
                $repass.on('blur', function() {

                    if ($repass.val() == $password.val()) {
                        $repassp.html('√');
                        $repassp.css('color', 'green');
                        $repassflag = true;
                    } else {
                        $repassp.html('请再次确认密码');
                        $repassp.css('color', 'red');
                        $repassflag = false;
                    }
                })

                //5.手机号
                let $telp = $('.tel p'); //div的类名

                $tel.on('focus', function() {
                    $tel.css('border-color', '#006aaf');
                });
                $tel.on('blur', function() {
                    if (this.value !== '') {
                        if (this.value.length === 11) {
                            let $reg = /1[3578]\d{9}/g;
                            if ($reg.test(this.value)) {
                                $telp.html('√');
                                $telp.css('color', 'green');
                                $telflag = true;
                            } else {
                                $telp.html('格式有误');
                                $telp.css('color', 'red');
                                $telflag = false;
                            }
                        } else {
                            $telp.html('长度有误');
                            $telp.css('color', 'red');
                            $telflag = false;
                        }
                    } else {
                        $telp.html('手机号不能为空');
                        $telp.css('color', 'red');
                        $telflag = false;
                    }

                })

                //6.验证码
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
                let $getyzm = $('.getyzm');
                let $yzmp = $('.yzmwrap p');
                $getyzm.on('click', function() {
                    $getyzm.html(random());
                })
                $yzm.on('focus', function() {
                    $yzm.css('border-color', '#006aaf');
                })
                $yzm.on('blur', function() {
                    if ($yzm.val() == $getyzm.html()) {
                        $yzmp.html('√');
                        $yzmp.css('color', 'green');
                        $yzmflag = true;
                    } else {
                        $yzmp.html('验证码有误');
                        $yzmp.css('color', 'red');
                        $yzmflag = false;
                    }
                })

                //提交验证表单
                $form1.on('submit', function() {
                    if ($username.val() === '') {
                        $userp.html('用户名不能为空');
                        $userp.css('color', 'red');
                        $usernameflag = false;
                    }
                    if ($email.val() === '') {
                        $emailp.html('邮箱不能为空');
                        $emailp.css('color', 'red');
                        $emailflag = false;
                    }
                    if ($password.val() === '') {
                        $passwordp.html('密码不能为空');
                        $passwordp.css('color', 'red');
                        passwordflag = false;
                    }
                    if ($repass.val() === '') {
                        $repassp.html('请再次确认密码');
                        $repassp.css('color', 'red');
                        $repassflag = false;
                    }
                    if ($tel.val() === '') {
                        $telp.html('手机号不能为空');
                        $telp.css('color', 'red');
                        $telflag = false;
                    }
                    if ($yzm.val() === '') {
                        $yzmp.html('验证码不能为空');
                        $yzmp.css('color', 'red');
                        $yzmflag = false;
                    }
                    let $select = $('#select');
                    let $selectflag = true;

                    if ($select.prop(checked)) {
                        $selectflag = true;
                    } else {
                        $selectflag = false;
                    }
                    if (!$usernameflag || !$emailflag || !$passwordflag || !$repassflag || !$telflag || !$yzmflag || !$selectflag) {
                        return false;
                    }

                })

            } //username
    } //return
});