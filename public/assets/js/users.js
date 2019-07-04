//表单提交的时候触发 监听提交事件
$('#userForm').on('submit', function() {
    //serialize 要保证form表单每一个input要有一个name属性  
    // serialize自动收集表单数据并且 转成 键=值&键=值
    var formData = $(this).serialize() ;
    // console.log(formData) ;
    $.ajax({
        type:'post',//get或post
        url:'/users',//请求的地址
        data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        success:function(result){//成功的回调函数
            // console.log(result);
            // 刷新当前页面 因为要清空form表单
            location.reload();
        },
        error: function(err) {
            console.log('创建用户失败');
        }
    })
    //阻止表单默认提交行为，因为提交了就会刷新 而ajax是不刷新的
    return false;
});
// 上传头像
$('#avatar').on('change', function() {
    // console.log($(this));
    // console.dir($(this));
    // console.log(this);
    // console.dir(this);
    //创建一个空表单对象
    var formData = new FormData() ;
    // console.log(this.files[0]);
    //把选中的文件追加到这个表单对象
    formData.append('avatar', this.files[0]);
    $.ajax({
        type:'post',//get或post
        url:'/upload',//请求的地址
        data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        // jq默认会把数据变成属性=属性值&属性=属性值 而formData是二进制数据 所以设置processData: false,让其不要解析data所对应的的请求参数 就是不要解析成属性=属性值&属性=属性值  
        processData: false,
        // 因为jq中$.ajax中默认的contentType的值是 ‘application/x-www-form-urlencoded'
        contentType: false,
        success:function(result){//成功的回调函数
            // console.log(result);
            //把头像显示在页面中
            $('#priview').attr('src', result[0].avatar);
            $('#hiddenId').val(result[0].avatar);
        }
    })
})