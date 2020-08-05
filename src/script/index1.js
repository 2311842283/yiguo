define([], function () {
    return {
        //二级菜单效果
        menu: function () {
            // console.log(111);
            const $title = $('.title');
            const $menuli = $('.menu li'); //所有li
            const $menuspan = $('.menu li span')
            const $cartlist = $('.cartlist2') //内容的边框
            const $menuitem = $('.menu .item') //li对应的内容
            //1.鼠标移入的时候显示隐藏的二级菜单
            // console.log($menuspan);
            $menuli.on('mouseover', function () {
                $cartlist.show()
                // 显示对应得li得内容
                $menuitem.eq($(this).index()).show().siblings('.item').hide();
                //显示li里得>
                $menuspan.eq($(this).index()).show().siblings('span').hide();
                //移入时得偏移效果
                // console.log($(this),this);
                $menuli.eq($(this).index()).stop().animate({
                    left: '+10px'
                }, 300);

            });
            //移除时恢复原样
            $menuli.on('mouseout', function () {
                $cartlist.hide()
                // 移除时回复偏移效果>
                $menuspan.hide()
                $menuli.eq($(this).index()).stop().animate({
                    left: '0px'
                }, 300);
            })
            // 移入移出item时保持li得偏移
            $menuitem.on('mouseover', function () {
                $menuli.eq($(this).index()).stop().animate({
                    left: '+10px'
                }, 300);
            })
            $menuitem.on('mouseout', function () {
                $menuli.eq($(this).index()).stop().animate({
                    left: '0px'
                }, 300);
            })
            //鼠标移入移出二级菜单区域显示隐藏
            $cartlist.on('mouseover', function () {
                $cartlist.show()
            })
            $cartlist.on('mouseout', function () {
                $cartlist.hide()
                $menuli.eq($(this).index()).stop().animate({
                    left: '0px'
                }, 300);
            })
        },
        //顶部固定
        top: function () {
            const $header = $('.header');
            // console.log( $header.scrollTop());
            // console.log( $(window).scrollTop());
            $(window).on('scroll', function () {
                // console.log( $(window).scrollTop());
                // $header.addClass('headerfix')
                if ($(window).scrollTop() >= 30) {
                    $header.addClass('headerfix')
                    $header.stop(true).animate({
                        top: 0
                    }, 1);
                } else {
                    $header.removeClass('headerfix')
                    $header.stop(true).animate({
                        top: 30
                    }, 200);
                }
            })
        },
        // 图片移入偏移效果
        // imgpy: function () {
        //     //页面主体里除了左侧所有图片
        //     const $imgs = $('.floor-main img');
        //     // console.log($imgs.length);
        //     $imgs.on('mouseover', function () {
        //         console.log($imgs.eq($(this).index()));
        //     //    $imgs.eq($(this).index())
        //     })
        // }
        
    }
})