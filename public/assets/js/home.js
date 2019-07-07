//获取轮播图
$.ajax({
    type:'get',//get或post
    url:'/slides',//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
        // console.log(result);
        var html = template('slideTpl', {data: result});
        // console.log(html);
        $('#slideBox').html(html);
        // 在success放置轮播图效果代码,因为ajax是异步代码，在执行轮播图功能时，轮播图数据还没通过ajax获取到，所以轮播图功能要写在$('#slideBox').html(html)
         //
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
              // index++;
            
              $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
          });
          // 上/下一张
          $('.swipe .arrow').on('click', function () {
            var _this = $(this);
        
            if(_this.is('.prev')) {
              swiper.prev();
            } else if(_this.is('.next')) {
              swiper.next();
            }
          })
    }
});
//获取最新发布
$.ajax({
  type:'get',//get或post
  url:'/posts/lasted',//请求的地址
  success:function(result){//成功的回调函数
    // console.log(result);
    var html = template('lastedTpl', {data: result});
    $('.new').append(html);
  }
})