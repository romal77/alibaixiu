//获取key值
//获取地址栏上面的查询参数值
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for(var i = 0; i < paramsAry.length; i++) {
        var temp = paramsAry[i].split('=');
        // console.log(a);
        if(temp[0] == name) {
            return temp[1];
        }
    };
    return -1;
};
var key = getUrlParams('key');
//搜索功能
$.ajax({
    type:'get',//get或post
    url:'/posts/search/' + key,//请求的地址
    success:function(result){//成功的回调函数
        // console.log(result);
        var html = template('tpl', {data: result});
        $('.new').append(html);
    }
})