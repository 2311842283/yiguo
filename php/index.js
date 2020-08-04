define([], function() {
    return {
        init: function() {
            class Navbar { //滑动滚动条，显示隐藏顶部导航
                constructor() {
                    this.nav = $('.scroll');
                }
                init() {
                    if ($(window).scrollTop() > 800) {
                        this.nav.css({
                            top: 0
                        });
                    } else {
                        this.nav.css({
                            top: -52
                        });
                    }
                    $(window).on('scroll', () => {
                        if ($(window).scrollTop() > 800) {
                            this.nav.stop(true).animate({
                                top: 0
                            })
                        } else {
                            this.nav.stop(true).animate({
                                top: -52
                            })
                        }
                    });
                }
            }
            new Navbar().init();
            class Picbar { //轮播图效果
                constructor() {
                    this.indexbar = $('.first_wrap .indexbar li');
                    this.picbar = $('.first_wrap .topbar .picbar li');
                    this.pic = $('.first_wrap .topbar');
                    this.left = $('.first_wrap .topbar .btn_l');
                    this.right = $('.first_wrap .topbar .btn_r');
                    this.topbar = $('.first_wrap .fir_right .topbar');
                    this.bar = $('.first_wrap .fir_right .bar');
                    this.bottomone = $('.first_wrap .fir_right .bottombar .one');
                    this.bottomtwo = $('.first_wrap .fir_right .bottombar .two');
                    this.index = null;
                }
                init() {
                    //鼠标移入图片下标,下标和图片发生变化
                    let _this = this.indexbar;
                    let _this1 = this.picbar;
                    let timer = null;
                    this.indexbar.on('mouseover', function() {
                        this.index = $(this).index();
                        _this.eq(this.index).addClass('active').siblings('li').removeClass('active');
                        _this1.eq(this.index).stop(true).animate({
                            opacity: 1
                        }).siblings('li').stop(true).animate({
                            opacity: 0
                        });
                    });
                    //鼠标移入轮播图区域，显示左右箭头
                    this.pic.on('mouseover', () => {
                        this.left.stop(true).animate({
                            left: 0
                        });
                        this.right.stop(true).animate({
                            right: 0
                        });
                    });
                    //鼠标移出，左右箭头消失
                    this.pic.on('mouseout', () => {
                        this.left.stop(true).animate({
                            left: -46
                        });
                        this.right.stop(true).animate({
                            right: -46
                        });
                    });
                    //点击右箭头
                    this.right.on('click', () => {
                        this.index++;
                        if (this.index > 7) {
                            this.index = 0;
                        }
                        _this.eq(this.index).addClass('active').siblings('li').removeClass('active');
                        _this1.eq(this.index).stop(true).animate({
                            opacity: 1
                        }).siblings('li').stop(true).animate({
                            opacity: 0
                        });
                    });
                    //点击左箭头
                    this.left.on('click', () => {
                        this.index--;
                        if (this.index < 0) {
                            this.index = 7;
                        }
                        _this.eq(this.index).addClass('active').siblings('li').removeClass('active');
                        _this1.eq(this.index).stop(true).animate({
                            opacity: 1
                        }).siblings('li').stop(true).animate({
                            opacity: 0
                        });
                    });
                    //自动轮播
                    timer = setInterval(() => {
                        this.right.click();
                        if (this.index % 2 !== 0) {
                            this.bottomone.stop(true).animate({
                                opacity: 0
                            });
                            this.bottomtwo.stop(true).animate({
                                opacity: 1
                            });
                        } else {
                            this.bottomone.stop(true).animate({
                                opacity: 1
                            });
                            this.bottomtwo.stop(true).animate({
                                opacity: 0
                            });
                        }
                    }, 3000);
                    //鼠标移入图片，停止自动轮播
                    this.bar.hover(() => {
                        clearTimeout(timer);
                    }, () => {
                        timer = setInterval(() => {
                            this.right.click();
                            if (this.index % 2 !== 0) {
                                this.bottomone.stop(true).animate({
                                    opacity: 0
                                });
                                this.bottomtwo.stop(true).animate({
                                    opacity: 1
                                });
                            } else {
                                this.bottomone.stop(true).animate({
                                    opacity: 1
                                });
                                this.bottomtwo.stop(true).animate({
                                    opacity: 0
                                });
                            }
                        }, 3000);
                    });
                }
            }
            new Picbar().init();
            class Menu { //移入菜单效果
                constructor() {
                    this.cartlist = $('.first_wrap .second_li');
                    this.cartli = $('.first_wrap .fir_left ul li');
                    this.cartitem = $('.first_wrap .second_li .item');
                    this.index = null;
                }
                init() {
                    let _this = this.cartlist;
                    let _this1 = this.cartitem;
                    this.cartli.on('mouseover', function() {
                        this.index = $(this).index();
                        $(this).addClass('activeli').siblings('li').removeClass('activeli');
                        _this.show();
                        _this1.eq(this.index).show().siblings('div').hide();

                    });
                    this.cartli.on('mouseout', () => {
                        this.cartlist.hide();
                    });
                    this.cartitem.hover(() => {
                        this.cartlist.show();
                    }, () => {
                        this.cartlist.hide();
                        this.cartli.removeClass('activeli');
                    });
                }
            }
            new Menu().init();
            class Render { //渲染
                constructor() {}
                init() {
                    const goodslist = $('#item .tab');
                    $.ajax({
                        url: 'http://localhost/JS2004/Second-step/dangdangwang1/php/data.php',
                        dataType: 'json'
                    }).done(function(data) {
                        let strhtml = '<ul id="itemmore">';
                        $.each(data, function(index, value) {
                            strhtml += `
                                    <a href="details.html?sid=${value.sid}" target="_blank">
                                        <li>
                                            <img  data-original="${value.url}" class="lazy" width="190" height="190"/>
                                            <p class="name">${value.title}</p>
                                            <p class="price">${value.price}</p>
                                        </li>
                                    </a>
                                `;
                        });
                        strhtml += '</ul>';
                        goodslist.html(strhtml);
                        $(function() {
                            $("img.lazy").lazyload({ effect: "fadeIn" });
                        });
                    })
                }
            }
            new Render().init();
        }
    }
});