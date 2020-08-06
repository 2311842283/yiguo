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
                        <td class="cart-t-price">￥${value.price}</td>
                        <td  class="cart-t-num">
                            <a href="javascript:;" class="decrement"></a>
                            <input type="text" value="${num}" class="num-inp">
                            <a href="javascript:;" class="increment"></a>
                        </td>
                        <td  class="cart-t-total">￥<span>${(value.price*num).toFixed(0)}</span></td>
                        <td  class="cart-t-spec">${value.weight}</td>
                        <td  class="cart-t-opera">
                            <a href="javascript:;">移入收藏</a>
                            <a href="javascript:;" class="deleteshop">删除</a>
                        </td>
                        </tr>
                        `
                            //追加到页面
                            // return strhtml
                            $('.cart-list tbody').append(strhtml);
                        }
                    })
                    //不知为何渲染不上
                    //    let $str = '';
                    //    $str += strhtml;
                    //     console.log($str);
                    //   $('.cart-list tbody').html($str)
                    // $('.cart-list tbody').append($str);

                    //计算总价
                    function totalPrice() {
                        let $sum = 0
                        $('.cart-t-total span').each(function (value, index) {
                            $sum += Number($(this).html())
                            // console.log($sum);
                            // console.log($('.total-price'));
                            $('.total-price').html($sum)
                        });
                    }
                    totalPrice()

                    //全选
                    function checkall() {
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
                    }
                    checkall()

                    //点击按钮加减数量
                    //减少
                    function numjj() {
                        $('.decrement').on('click', function () {
                            //  console.log($(this),this);
                            let jian = $(this).next().val(); //输入框的值
                            var num = parseInt(jian) - 1;
                            if (num == 0) {
                                return;
                            }
                            $(this).next().val(num);
                            console.log(11);

                        })
                        //增加
                        $('.increment').on('click', function () {
                            // console.log($(this),this);
                            let jia = $(this).prev().val(); //输入框的值
                            var num = parseInt(jia) + 1;
                            $(this).prev().val(num);
                        })
                    }
                    numjj()
                    
                    //点击删除删除商品
                    // console.log($('.deleteshop'));
                    $('.deleteshop').on('click',function(){
                    //    console.log( $(this).parent().parent().remove());
                    //删除他的父元素tr，
                       $(this).parent().parent().remove()
                    })
                })
            }





        },

    }
})