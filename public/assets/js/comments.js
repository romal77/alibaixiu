var page = 1;
render();
//批准驳回功能
$('#tbodyBox').on('click', '.status', function() {
    // console.log(111);
    var id = $(this).attr('data-id');
    
    var status = $(this).attr('data-status');
    $.ajax({
        type:'put',//get或post
        url:'/comments/' + id,//请求的地址
        data: {
            state: status == 0 ? 1 : 0
        },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        success:function(result){//成功的回调函数
            // console.log(result);
            location.reload();
        }
    })
    return false;
});
//删除功能
$('#tbodyBox').on('click', '.delete', function() {
    if(confirm('确定删除吗？')){
        var id = $(this).attr('data-id');
        $.ajax({
            type:'delete',//get或post
            url:'/comments/' + id,//请求的地址
            success:function(result){//成功的回调函数
                // console.log(result);
                location.reload();
            }
        })
    }
   
});
//分页渲染
function changePage(currentPage) {
    var page = currentPage;
    // console.log(page);
    // alert(111)
    render(page)
};
function render(page) {
    $.ajax({
        type:'get',//get或post
        url:'/comments',//请求的地址
        data: {
            page: page
        },
        success:function(result){//成功的回调函数
            // console.log(result);
            var html = template('commentsTpl', result);
            $('#tbodyBox').html(html);
            var pageHtml = template('pageTpl', result);
            $('#pageBox').html(pageHtml);
        }
    })
}