// 上传图片
$('#myFile').on('change', function() {
    var formData = new FormData() ;
    formData.append('avatar', this.files[0]);
      $.ajax({
      type:'post',//get或post
      url:'/upload',//请求的地址
      data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      processData: false,
      contentType: false,
      success:function(result){//成功的回调函数
        // console.log(result);
        $('#priview').attr('src', result[0].avatar).show() ;
        $('#hiddenImg').val(result[0].avatar);
      }
    })
  })
//添加轮播图
$('#addSildes').on('submit', function() {
    var formData = $(this).serialize() ;
    $.ajax({
        type:'post',//get或post
        url:'/slides',//请求的地址
        data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        success:function(result){//成功的回调函数
            // console.log(result);
            location.reload() ;
        }
    })
    return false;
});
// 获取轮播图列表
$.ajax({
    type:'get',//get或post
    url:'/slides',//请求的地址
    success:function(result){//成功的回调函数
        // console.log(result);
        var html = template('slideTpl',{data: result});
        $('#tbodyBox').html(html);
    }
});
// 删除录播图
$('#tbodyBox').on('click', '.delete', function() {
    if(confirm('确定删除吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type:'delete',//get或post
            url:'/slides/' + id,//请求的地址
            success:function(result){//成功的回调函数
                // console.log(result);
                location.reload() ;
            }
        })
    }
})