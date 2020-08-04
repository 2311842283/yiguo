define([], function () {
    return {
        //渲染
        render: function () {
            const goodslist = $('.goodslist');
            $.ajax({
                url: 'http://localhost/JS2004/yiguo/php/listdata.php',
                dataType: 'json'
            }).done(function (data) {
                //渲染
                let strhtml = '<ul>';
                $.each(data, function (index, value) {
                    strhtml += `
            <li class="item" sid="">
                <div class="p_img clearfix">
                    <a href="details.html?sid=${value.sid}" target="_blank">
                    <img data-original="${value.url}" class="lazy" width="290" height="290">
                     </a>
                 </div>
                 <p>
                     <a href="" target="_blank">${value.title}</a>
                  </p>
                 <span class="price">
                    <strong>¥${value.price}</strong>
                 </span>
            </li>
            `
                });
                strhtml += '</ul>';
                goodslist.html(strhtml);
                $(function () {
                    $("img.lazy").lazyload({
                        //淡入效果
                        effect: "fadeIn"
                    });
                });
            })
        },
        // 分页
        page: function () {
            const $goodslist = $('.goodslist');

            //分页 思路 - 利用插件实现
            //告知后端当前请求的是第几页数据。将当前的页面页码传递给后端(get和page)
            $('.page').pagination({
                pageCount: 4, //总的页数
                jump: true, //是否开启跳转到指定的页数，布尔值。
                // coping: true, //是否开启首页和尾页，布尔值。
                prevContent: '上一页',
                nextContent: '下一页',
                // homePage: '首页',
                // endPage: '尾页',
                callback: function (api) {
                    console.log(api.getCurrent()); //获取当前的页码
                    $.ajax({
                        url: 'http://localhost/JS2004/yiguo/php/listdata.php',
                        data: { //将获取的页码给后端
                            page: api.getCurrent()
                        },
                        dataType: 'json'
                    }).done(function (data) { //根据传递的页码，后端返回相应的数据，进行渲染。
                        let $strhtml = '<ul>';
                        $.each(data, function (index, value) {
                            $strhtml += `
                    <li class="item" sid="">
                        <div class="p_img clearfix">
                            <a href="details.html?sid=${value.sid}" target="_blank">
                            <img data-original="${value.url}" class="lazy" width="290" height="290">
                             </a>
                         </div>
                         <p>
                             <a href="" target="_blank">${value.title}</a>
                          </p>
                         <span class="price">
                            <strong>¥${value.price}</strong>
                         </span>
                    </li>
                    `
                        });
                        $strhtml += '</ul>';
                        $goodslist.html($strhtml);
                        //渲染结束。
                        //添加懒加载
                        $(function() {
                            $("img.lazy").lazyload({ effect: "fadeIn" });
                        });

                        // //4.分页后进行对应的赋值和排序。
                        // array_default = []; //排序前的li数组
                        // array = []; //排序中的数组
                        // prev = null;
                        // next = null;

                        //将页面的li元素加载到两个数组中
                        // $('.list li').each(function (index, element) {
                        //     array[index] = $(this);
                        //     array_default[index] = $(this);
                        // });
                    })
                }
            });
        }
    }
})