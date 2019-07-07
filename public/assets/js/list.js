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
//获取id值
var id = getUrlParams('id');
// console.log(id);
$.ajax({
    type:'get',//get或post
    url:'/posts/category/' + id,//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
        // console.log(result);
        var html = template('tpl', {data: result});
        $('.new').append(html);
        // $('.new h3').html(result[0].category.title)
    }
})
