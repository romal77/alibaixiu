// 添加分类
$('#addCategories').on('submit', function() {
    var formData = $(this).serialize() ;
    console.log(formData) ;
    $.ajax({
        type:'post',//get或post
        url:'/categories',//请求的地址
        data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        success:function(result){//成功的回调函数
            // console.log(result);
            location.reload() ;
        }
    })
    return false;
});
// 渲染分类列表
$.ajax({
    type:'get',//get或post
    url:'/categories',//请求的地址
    success:function(result){//成功的回调函数
        // console.log(result);
        var html = template('categoriesTpl', {data: result});
        $('#tbodyBox').html(html) ;
    }
});
// 删除分类
$('#tbodyBox').on('click', '.delete', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type:'delete',//get或post
        url:'/categories/' + id,//请求的地址
        success:function(result){//成功的回调函数
            // console.log(result);
            location.reload() ;
        }
    })
});
//修改分类
//01. 根据id查询分类  把数据展现在左侧表单中
$('#tbodyBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    
    $.ajax({
        type:'get',//get或post
        url:'/categories/'+id,//请求的地址
        success:function(result){//成功的回调函数
            // console.log(result);
            var html = template('modifyCategoriesTpl', result);
            $('#modifyBox').html(html);
        }
    })
});
//02、根据 id 修改分类
$('#modifyBox').on('submit', '#modifyCategories', function() {
    var id = $(this).attr('data-id');
    var formData = $(this).serialize() ;
    $.ajax({
        type:'put',//get或post
        url:'/categories/' + id,//请求的地址
        data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        success:function(result){//成功的回调函数
            // console.log(result);
            location.reload() ;
        }
    });
    return false;
})