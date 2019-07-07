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
//是否需要经过人工批准
var review;
$.ajax({
    type:'get',//get或post
    url:'/posts/' + id,//请求的地址
    success:function(result){//成功的回调函数
        // console.log(result)
        var html = template('tpl', result);
        $('#article').html(html);
    }
});
// 点赞功能
$('#article').on('click', '#like', function() {
    $.ajax({
        type:'post',//get或post
        url:'/posts/fabulous/' + id,//请求的地址
        success:function(result){//成功的回调函数
            // console.log(result)
            alert('点赞成功，感谢您的支持');
        }
    })
});
//评论功能
//01 获取网站配置
$.ajax({
    type:'get',//get或post
    url:'/settings',//请求的地址
    success:function(result){//成功的回调函数
        // console.log(result);
        // console.log(isNormalLogin);
        review = result.review;
        // 只用管理员设置了网站开启了评论并且当前是登录状态
        if(result.comment == true && isNormalLogin == true || isLogin == true){
            // 开启了评论功能 就渲染出评论模板
            var tpl = 
            `
            <form>
               <textarea></textarea>
               <input type="submit" value="提交评论">
             </form>
            `;
            $('.comment').html(tpl);
        }
    }
});
//02
$('.comment').on('submit', 'form', function() {
    var content = $(this).find('textarea').val();
    // console.log(content);
    var state;
    if(review) {
        // 如果需要经过人工批准 state就为0 表示未批准 
        state = 0;
    } else {
        // 如果不需要经过人工批准 state就为1 表示已批准 
        state = 1;
    };
    //向服务器请求 添加评论
    $.ajax({
        type:'post',//get或post
        url:'/comments',//请求的地址
        data:{
            content: content,
            post: id,
            state: state
        },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        success:function(result){//成功的回调函数
            // console.log(result);
            alert('评论成功');
            location.reload();
        },
        error: function(err) {
            alert('评论失败');
        }
    })
    return false;
})