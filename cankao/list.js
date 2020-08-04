define([], function() {
    return {
        //渲染列表
        Render: function() {
            const mainrightlist = $('.mainrightlist')
            $.ajax({
                url: 'http://localhost/php/project/php/listdata.php',
                dataType: 'json'
            }).done(function(data) {
                let strhtml = '<ul class="mrlul">';
                $.each(data, function(index, value) {
                    strhtml += `
                           
                            <li class="mrlli">
                            <a href="detail.html?sid=${value.sid}" target="blank" class="link">
                              <div class="mrlpic">
                                 <img data-original="${value.url}" class="lazy" width="230" height="230" />
                                   <div class="yellow">
                                     <span>已省￥14.0</span>
                                   </div>
                               </div>
                               </a>     
                            <p class="ptitle">
                               <span class="plog"><img src="http://image.samsclub-estore.com/h5-search/sam/images/icon_jsd.png?1856622" alt="">
                               </span>
                              ${value.title}
                            </p>
                            <p class="pcontent">  ${value.detail}       </p>
                            <p class="pprice">￥<strong>${value.price}</strong></p>
                           
                              <div class="mrlnum">
                                <ul class="mrlnumul">
                                <li class="minus">-</li>
                                <li class="mcount"><input type="text" value="1"></li>
                                <li class="add">+</li>
                                </ul>
                                <a href="" class="addshopcar">
                                <span class="iconfont icon-gouwuche"></span>
                                <span>加入购物车</span>
                                 </a>
                            </div>
                            </li>
                                          
                            `;
                });
                strhtml += '</ul>';
                mainrightlist.html(strhtml);
                $(function() {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });
            })
        },
        //分页
        Pagination: function() {
            const mainrightlist = $('.mainrightlist');
            $('.page').pagination({
                pageCount: 3,
                jump: true, //是否开启跳转到指定的页数，布尔值。
                prevContent: '上一页',
                nextContent: '下一页',
                callback: function(api) {
                    console.log(api.getCurrent()); //获取当前的页码
                    $.ajax({
                        url: 'http://localhost/php/project/php/listdata.php',
                        data: {
                            page: api.getCurrent()
                        },
                        dataType: 'json'
                    }).done(function(data) {
                        let strhtml = '<ul class="mrlul">';
                        $.each(data, function(index, value) {
                            strhtml += `
                       
                        <li class="mrlli">
                        <a href="detail.html?sid=${value.sid}" target="blank" class="link">
                          <div class="mrlpic">
                             <img data-original="${value.url}" class="lazy" width="230" height="230" />
                               <div class="yellow">
                                 <span>已省￥14.0</span>
                               </div>
                           </div>
                           </a>     
                        <p class="ptitle">
                           <span class="plog"><img src="http://image.samsclub-estore.com/h5-search/sam/images/icon_jsd.png?1856622" alt="">
                           </span>
                          ${value.title}
                        </p>
                        <p class="pcontent">  ${value.detail}       </p>
                        <p class="pprice">￥<strong>${value.price}</strong></p>
                       
                          <div class="mrlnum">
                            <ul class="mrlnumul">
                            <li class="minus">-</li>
                            <li class="mcount"><input type="text" value="1"></li>
                            <li class="add">+</li>
                            </ul>
                            <a href="" class="addshopcar">
                            <span class="iconfont icon-gouwuche"></span>
                            <span>加入购物车</span>
                             </a>
                        </div>
                        </li>
                                      
                        `;
                        });
                        strhtml += '</ul>';
                        mainrightlist.html(strhtml);
                        $(function() {
                            $("img.lazy").lazyload({ effect: "fadeIn" });
                        });
                    })
                }
            })

        },

        //排序
        Sort: function() {
            let array_default = []; //排序前的li数组
            let array = []; //排序中的数组
            let prev = null;
            let next = null;

        }





    } //return的



});