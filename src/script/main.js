//配置模块
//第三方文件

require.config({
    paths: {
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min',
        'lazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload.min',
        'jquery.pagination': 'http://localhost/JS2004/yiguo/src/script/jquery.pagination',
        'cookie':'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie'
    },
    shim: {
        'lazyload': ['jquery'],
        'jquery.pagination': ['jquery'],
        'cookie':['jquery']
    }
});

//加载模块
require(['jquery','lazyload','jquery.pagination','cookie'], function ($) {
    let mod = $('#currentpage').attr('currentmod'); //获取script标签下面的属性值
    // console.log(mod);
    if (mod === 'modlist') {
        //如果mod存在，加载对应的模块
        require([mod], function (aaa) {
            console.log(aaa.render);
            aaa.render();
            aaa.page();
        });
    }else if(mod === 'index1'){
        require([mod], function (data) {
            data.menu();
            data.top();
            data.imgpy();
        });
    }else if(mod === 'details'){
        require([mod], function (data) {
         data.render();
         data.tab();
         data.cartcookie();
        });
    }else if(mod === 'cartlist'){
        require([mod], function (data) {
         data.render();
       
        });
    }
});