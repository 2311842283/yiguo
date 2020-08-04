//配置模块
//第三方文件

require.config({
    paths: {
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min',
        'lazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload.min',
        'jquery.pagination': 'http://localhost/JS2004/yiguo/src/script/jquery.pagination',
    },
    shim: {
        'lazyload': ['jquery'],
        'jquery.pagination': ['jquery']
    }
});

//加载模块
require(['jquery','lazyload','jquery.pagination'], function ($) {
    let mod = $('#currentpage').attr('currentmod'); //获取script标签下面的属性值
    console.log(mod);
    if (mod === 'modlist') {
        //如果mod存在，加载对应的模块
        require([mod], function (aaa) {
            console.log(aaa.render);
            aaa.render();
            aaa.page();
        });
    }else if(mod === 'index1'){
        require([mod], function (data) {
            data.menu()
        });
    }
});