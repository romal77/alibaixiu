function dateFormat(date) {
    date = new Date(date);
    // var year = data.substr(0, 4);
    // var month = data.substr(5, 2);
    // var day = data.substr(8, 2);
    var year = date.getFullYear();
    var month = date.getMonth()+1 ;
    month = month > 9 ? month : '0'+ month;
    var day = date.getDate() ;
    day = day > 9 ? day : '0'+ day;
    return year + '-' + month + '-' + day;
}
//如果页码没有切换 ， 默认就显示第一页
var page = 1;
render();

// 分页功能
function changePage(currentPage) {
    // console.log(page);
    page = currentPage ;
    render(page);
};
//渲染分页模板
function render() {
    $.ajax({
        type:'get',//get或post
        url:'/posts',//请求的地址
        data: {
            page: page
        },
        success:function(result){//成功的回调函数
            // console.log(result);
            // console.log(result.records)
            var html = template('postsTpl', result);
            $('#tbodyBox').html(html);
            //分页模板
            var page = template('pageTpl', result);
            $('#pageBox').html(page);
        }
    });
};
$.ajax({
    type:'get',//get或post
    url:'/categories',//请求的地址
    success:function(result){//成功的回调函数
        // console.log(result);
        var html = template('categoriesyTpl', {data: result});
        $('#categoryBox').html(html);
    }
});
//筛选功能
$('#formBox').on('submit', function() {
    // console.log($(this).serialize());
    
    $.ajax({
        type:'get',//get或post
        url:'/posts',//请求的地址
        data: $(this).serialize(),//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        success:function(result){//成功的回调函数
            // console.log(result);
            var html = template('postsTpl', result);
            $('#tbodyBox').html(html);
            //分页模板
            var page = template('pageTpl', result);
            $('#pageBox').html(page);
        }
    });
    return false;
});
//删除功能
$('#tbodyBox').on("click", ".delete", function() {
    if(confirm("确定要删除吗？")){
        var id = $(this).attr("data-id");
        // console.log(id);
        $.ajax({
            type:'delete',//get或post
            url:'/posts/' + id,//请求的地址
            success:function(result){//成功的回调函数
                // console.log(result);
                location.reload() ;
            }
        })
    }
})