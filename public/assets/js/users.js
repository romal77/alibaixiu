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
});
//渲染用户列表
$.ajax({
    type:'get',//get或post
    url:'/users',//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
        // console.log(result);
        var html = template('usersTpl', {data: result});
        $('#tbodyBox').html(html);
    }
});
//修改用户
$('#tbodyBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type:'get',//get或post
        url:'/users/'+id,//请求的地址
        success:function(result){//成功的回调函数
            // console.log(result);
            var html = template('modifyTpl', result);
            $('#formBox').html(html);
        }
    })
});
//修改用户功能
$('#formBox').on('submit', '#modifyForm', function() {
    var id = $(this).attr('data-id');
    var formData = $(this).serialize() ;
    // console.log(formData);
    // console.log(id)
    $.ajax({
        type:'put',//get或post
        url:'/users/'+id,//请求的地址
        data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        success:function(result){//成功的回调函数
            // console.log(result);
            location.reload() ;
        }
    });
    return false;
});
//删除用户
$('#tbodyBox').on('click', '.delete', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type:'delete',//get或post
        url:'/users/'+id,//请求的地址
        success:function(result){//成功的回调函数
            // console.log(result);
            location.reload() ;
        }
    })
});
//批量删除
//01 全选被选中 底下的所有当行同时被选中
$('#selectAll').on('change', function() {
    // 把全选是否选中的状态 赋值给bool选中是true 未选中是false
    var bool = $(this).prop('checked');
    // console.log(bool);
    if(bool) {
        // 让底下的所有都选中
        $('#tbodyBox').find('.status').prop('checked', true);
        //让批量删除按钮显示
        $('#deleteMany').show() ;
    } else {
        $('#tbodyBox').find('.status').prop('checked', false);
        //让批量删除按钮隐藏
        $('#deleteMany').hide() ;
    }
    
});
//02 tbody底下的复选框如果全选了 那么全选按钮也要被选上
$('#tbodyBox').on('change', '.status', function() {
    if($('#tbodyBox').find('.status').length == $('#tbodyBox').find('.status').filter(':checked').length) {
        $('#selectAll').prop('checked', true);
    } else {
        $('#selectAll').prop('checked', false);
    };
    // 底下的超过2个被选中就让全选被选中
    if($('#tbodyBox').find('.status').filter(':checked').length >= 2) {
        //让批量删除按钮显示
        $('#deleteMany').show() ;
    } else {
        //让批量删除按钮隐藏
        $('#deleteMany').hide() ;
    }
});
//03 实现批量删除
$('#deleteMany').on('click', function() {
    if(confirm('确认删除吗？')) {
        //建一个空数组 用来装被选中的id值
        var data = [];
        //被选中的元素
        var attr = $('#tbodyBox').find('.status').filter(':checked');
        //遍历 获取被选中id值
        attr.each(function(index, ele) {
            $(ele).attr('data-id');
            // console.log($(ele).attr('data-id'));
            // 把每个id值放进数组
            data.push($(ele).attr('data-id'))
        });
        $.ajax({
            type:'delete',//get或post
            // 把数组中每个id用-连接起来
            url:'/users/'+data.join('-'),//请求的地址
            success:function(result){//成功的回调函数
                // console.log(result);
                location.reload();
            }
        })
    }
});
