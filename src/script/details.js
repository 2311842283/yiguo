define([], function () {
    return {
        //渲染

        render: function () {
            // console.log(111);
            //1.获取地址栏上的sid
            let sid = location.search.substring(1).split('=')[1];
            //获取id传给后端
            // console.log(sid);
            $.ajax({
                type: 'get',
                url: 'http://localhost/JS2004/yiguo/php/getsid.php',
                dataType: 'json',
                data: {
                    sid: sid
                }
            }).done(function (data) {
                // console.log(data);//sid对应的数据
                // //获取后端返回的id对应信息渲染到详情页
                $('#spic img').attr('src', data.url) //小图
                $('.crumbs span').html(data.title) //标题
                $('.summary-name h1').html(data.title) //标题
                $('.summary-name p').html(data.info) //产品介绍
                $('.pro-price strong').html(data.price) //价格
                $('.selected span:first').html(data.price) //价格
                $('.selected span:last').html(data.weight) //重量
                // 渲染多个小图
                let $urlarr = data.urllist.split(',')
                // console.log($urlarr);
                let strhtml = '<ul class="clearfix">';
                $.each($urlarr, function (index, value) {
                    // console.log(index, value);
                    strhtml += `
                    <li class=""><img width="85" height="85" src="${value}">
                    </li>
                    `
                });
                strhtml += '</ul>';
                $('.ulist').html(strhtml)
            })
        },
        // 小图切换
        tab: function () {
            //鼠标移入下方图片列表切换图片   必须用事件委托做
            const $ulist = $('.ulist') //图片列表区域
            const $spic = $('#spic img') //小图

            $ulist.on('mouseover', 'li', function () {
                //获取图片得src
                // console.log($(this).find('img'));
                $(this).addClass('on').siblings('li').removeClass('on')
                $srcs = $(this).find('img').attr('src')
                $spic.attr('src', $srcs)
            })
        },
        //cookie把产品编号还有数量传给购物车
        cartcookie: function () {
            let sid = location.search.substring(1).split('=')[1];
            //存储cookie
            // $.cookie('xingming', 'zhangsan123456', {
            //     expires: 7,
            //     path: '/'
            // });
            // //读取cookie
            // $.cookie('xingming');
            // //删除cookie
            // $.cookie('the_cookie', null, {
            //     expires: -1,
            //     path: '/'
            // });
            // console.log($.cookie);
            // 1.创建两个数组存储商品的数量，编号
            let arrsid = []; //存储商品的sid
            let arrnum = []; //商品的数量
            //2.
            //3.4提前获取cookie值，将其转换成数组。
            function cookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) { //cookie存在
                    arrsid = $.cookie('cookiesid').split(',');
                    arrnum = $.cookie('cookienum').split(',');
                } else {
                    arrsid = [];
                    arrnum = [];
                }
            }
            $('.add a').on('click', function () {
                cookietoarray(); //每次点击，重新获取cookie,转换成数组
                //先判断当前的商品是第一次存储，还是第二次或者多次存在。
                if ($.inArray(sid, arrsid) === -1) {
                    arrsid.push(sid); //将当前商品的sid添加到数组中
                    arrnum.push($('#p_number').val()); //将当前商品的数量添加到数组中
                    //存储cookie
                    $.cookie('cookiesid', arrsid, {
                        expires: 7,
                        path: '/'
                    });
                    $.cookie('cookienum', arrnum, {
                        expires: 7,
                        path: '/'
                    });
                } else {
                    arrnum[$.inArray(sid, arrsid)] = parseInt(arrnum[$.inArray(sid, arrsid)]) + parseInt($('#p_number').val()); //获取sid对应的数量+新加的值，再赋值给对应的位置
                    //重新添加cookie
                    $.cookie('cookienum', arrnum, {
                        expires: 7,
                        path: '/'
                    });
                }
                console.log(arrsid, arrnum);

                alert('按钮被触发了');
            });
        }
    }
})