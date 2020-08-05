define([], function () {
    return {
        // 渲染
        render: function () {
            // console.log(111);
            //1.获取cookie进行渲染。
            if ($.cookie('cookiesid') && $.cookie('cookienum')) { //cookie存在
               
                arrsid = $.cookie('cookiesid').split(',');
                arrnum = $.cookie('cookienum').split(',');
                console.log(arrsid,arrnum);
                // for (let i = 0; i < arrsid.length; i++) {
                //     rendercart(arrsid[i], arrnum[i]);
                // }
            }

        }
    }
})