define([], function () {
    return {
        // 渲染
        render: function () {
            // console.log(111);
            if ($.cookie('cookiesid') && $.cookie('cookienum')) { //cookie存在

                arrsid = $.cookie('cookiesid').split(',');
                arrnum = $.cookie('cookienum').split(',');
                // console.log(arrsid, arrnum);
                //便利两个数组，调用渲染购物车函数，传参
                for (let i = 0; i < arrsid.length; i++) {
                    rendercart(arrsid[i], arrnum[i]);
                }
            }
            //渲染
            function rendercart(sid, num) { //商品编号数量
                $.ajax({
                    url: 'http://localhost/JS2004/yiguo/php/yiguogoods.php',
                    dataType: 'json'
                }).done(function (data) {
                    // console.log(data)
                    let strhtml = '';
                    // 遍历渲染sid对应的数据
                    $.each(data, function (index, value) {
                        // console.log(index,value);
                        if (sid == value.sid) {
                            // console.log(123);
                            strhtml += `
                        <tr>
                        <td class="cart-t-check"> 
                            <input type="checkbox" class="asdasd">
                        </td>
                        <td class="cartimg"><img src="${value.url}" alt=""></td>
                        <td class="cart-t-info">${value.title}</td>
                        <td class="cart-t-ub"></td>
                        <td class="cart-t-price">￥<span>${value.price}</span></td>
                        <td  class="cart-t-num">
                            <a href="javascript:;" class="decrement"></a>
                            <input type="text" value="${num}" class="num-inp">
                            <a href="javascript:;" class="increment"></a>
                        </td>
                        <td  class="cart-t-total">￥<span>${(value.price*num).toFixed(2)}</span></td>
                        <td  class="cart-t-spec">${value.weight}</td>
                        <td  class="cart-t-opera">
                            <a href="javascript:;">移入收藏</a>
                            <a href="javascript:;" class="deleteshop">删除</a>
                        </td>
                        </tr>
                        `
                            //追加到页面
                            // return strhtml
                            // $('.cart-list tbody').append(strhtml);//这样有bug，数量加减会重复触发
                            $('.cart-list tbody').get(0).innerHTML += strhtml; //这样写没问题，

                        }
                    });
                    //不知为何渲染不上
                    //    let $str = '';
                    //    $str += strhtml;
                    //     console.log($str);
                    //   $('.cart-list tbody').html($str)
                    // $('.cart-list tbody').append($str);

                    //1.全选
                    const $all = $('.chkAll'); //全选按钮
                    let $inputs = $('.asdasd'); //单选按钮
                    // console.log($all);
                    //  console.log($inputs);
                    //点击全选，下面按钮 全选
                    $all.on('click', function () {

                        $inputs.prop('checked', $(this).prop('checked'))
                    })
                    //下面input全选了就让全选选中
                    $inputs.on('click', function () {
                        //  console.log($('input:checked').not('.allselect').size());//选中了几个input
                        if ($inputs.length === $('input:checked').not('.allselect').size()) {
                            $all.prop('checked', true)
                        } else {
                            $all.prop('checked', false);

                        }
                    })

                    //点击按钮加减数量
                    //2.减少
                    $('.decrement').on('click', function () {
                        //  console.log($(this),this);
                        let $num = $(this).parents('.cart-t-num').find('input').val();
                        $num--;
                        if ($num <= 1) {
                            $(this).parents('.cart-t-num').find('input').val(1);
                        } else {
                            $(this).parents('.cart-t-num').find('input').val($num);
                        }
                        //单价
                        let $dj = parseInt($(this).parents('.cart-t-num').prev().find('span').html())
                         //计算单个商品价格
                        $(this).parents('.cart-t-num').next().find('span').html($dj * $num)
                        //计算总价格

                        // $('.total-price').html()
                    });


                    //3.增加
                    $('.increment').on('click', function () {
                        // console.log($(this),this);
                        let $num = $(this).parents('.cart-t-num').find('input').val();
                        $num++;
                        // 大于999就不能增加
                        if ($num >= 999) {
                            $(this).parents('.cart-t-num').find('input').val(999);
                            console.log($num);
                        } else {
                            $(this).parents('.cart-t-num').find('input').val($num);
                        }
                        //单价
                        let $dj = parseInt($(this).parents('.cart-t-num').prev().find('span').html())
                        console.log($dj, $num);
                        // console.log(parseInt($(this).parents('.cart-t-num').next().find('span').html($dj * $num)));
                        //计算单个商品价格
                        $(this).parents('.cart-t-num').next().find('span').html($dj * $num)


                    });
                    //4.修改数量的值时，判断数量值只能是num
                    $('.num-inp').on('input', function () {
                        console.log(11);
                        let $number = $(this).val();
                        let $reg = /^\d+$/g;
                        if ($reg.test($number)) {
                            $(this).val($number)
                        } else {
                            $(this).val(1); //输入出数字以外的值只能是1
                        }

                    })
                    //5..计算单个商品总价
                    function calcsingleprice() {
                        $('.cart-t-total span').each(function (value, index) {
                            //单价
                            let $dj = parseInt($('.cart-t-price span').html())
                            //数量
                            let $num = parseInt($('.cart-t-num').find('input').val());
                            // console.log($dj);
                            // console.log($num);
                            $('.cart-t-total').html($dj * $num)
                            // return console.log(($dj * $num).toFixed(2));
                            // return ($dj * $num).toFixed(2)

                        });
                    }
                    // calcsingleprice()
                    // //点击删除删除商品
                    // // console.log($('.deleteshop'));
                    // $('.deleteshop').on('click',function(){
                    // //    console.log( $(this).parent().parent().remove());
                    // //删除他的父元素tr，
                    //    $(this).parent().parent().remove()
                    // })
                });

            }
        },
        remove: function () {
            // console.log(11);
            //点击删除删除商品
            console.log($('.deleteshop'));
            $('.deleteshop').on('click', function () {
                //    console.log( $(this).parent().parent().remove());
                //删除他的父元素tr，
                $(this).parent().parent().remove()
            })
        }

    }
})