// 上传图片
$('#formBox').on('change', '#myfile', function() {
    var formData = new FormData() ;
    formData.append('avatar', this.files[0]);
    $.ajax({
        type:'post',//get或post
        url:'/upload',//请求的地址
        data: formData,
        processData: false,
        contentType: false,
        success:function(result){//成功的回调函数
            // console.log(result);
            $('#priview').attr('src', result[0].avatar);
            $('#hiddenImg').val(result[0].avatar);
        }
    })
});
//网站配置
$('#formBox').on('submit', '#settingForm', function() {
    $('#comment').val($('#comment').prop('checked'));
    $('#review').val($('#review').prop('checked'));
    var formData = $(this).serialize() ;
    // console.log(formData);
    $.ajax({
        type:'post',//get或post
        url:'/settings',//请求的地址
        data: formData,
        success:function(result){//成功的回调函数
            // console.log(result);
            alert('修改设置成功');
        }
    })
    return false;
});
//渲染网站设置
$.ajax({
    type:'get',//get或post
    url:'/settings',//请求的地址
    success:function(result){//成功的回调函数
        // console.log(result);
        var html = template('tpl', result);
        $('#formBox').html(html);
    }
})