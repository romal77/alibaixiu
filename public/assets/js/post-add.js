//展示分类列表
$.ajax({
    type:'get',//get或post
    url:'/categories',//请求的地址
    success:function(result){//成功的回调函数
        // console.log(result);
        var html = template('categoryTpl', {data: result});
        $('#category').html(html);
    }
});
//上传图片
// $('#feature').on('on', function() { 这里的事件类型是 change  不是on
$('#feature').on('change', function() {
    //这个this对象 里面有存放照片的属性值 files 这是一个数组
    // console.dir(this);
    //01、创建一个formData表单对象 用来放图片的地址  图片是二进制数据 所以要用表单对象来存放
    var formData = new FormData() ;
    //02、在表单对象追加一个属性名为 avatar 属性值为图片地址
    formData.append('avatar', this.files[0]);
    // console.log(formData.append('avatar', this.files[0]));
    // console.dir(formData); 这无法查看formData有什么值 需要向服务器请求 
    //03、向服务器发送请求  获取到图片上传的地址
    $.ajax({
        type:'post',//get或post
        url:'/upload',//请求的地址
        data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        contentType: false,
        processData: false,
        success:function(result){//成功的回调函数
            //返回的就是一个装有 图片地址对象{属性名avatar 属性值 图片地址}  的数组
            console.log(result);
            //04、把这个图片地址 交给img的src 实现图片预览
            $('.thumbnail').attr('src', result[0].avatar).show() ;
            //把图片地址的值 给隐藏域hiddenImg 为了把数据传上去
            $('#hiddenImg').val(result[0].avatar);
        }
    })
});

//创建文章
$('#addPost').on('submit', function() {
    var formData = $(this).serialize() ;
    // console.log(formData) ;
    $.ajax({
        type:'post',//get或post
        url:'/posts',//请求的地址
        data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        success:function(result){//成功的回调函数
            console.log(result);
            location.href = 'posts.html';
        }
    })
    return false;
})
