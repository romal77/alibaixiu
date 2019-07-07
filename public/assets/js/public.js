//获取 随机推荐 数据
$.ajax({
    type:'get',//get或post
    url:'/posts/random',//请求的地址
    success:function(result){//成功的回调函数
        // console.log(result);
        var randomTpl = 
        `
        {{each data}}
            <li>
               <a href="javascript:;">
                 <p class="title">{{$value.title}}</p>
                 <p class="reading">阅读({{$value.meta.views}})</p>
                 <div class="pic">
                   <img src="{{$value.thumbnail}}" alt="">
                 </div>
               </a>
             </li>
        {{/each}}

        `;
        var html = template.render(randomTpl, {data: result});
        $('.random').html(html);
    }
});
//获取 最新评论 数据
$.ajax({
    type:'get',//get或post
    url:'/comments/lasted',//请求的地址
    success:function(result){//成功的回调函数
        // console.log(result);
        var commentsTpl = 
        `
            {{each data}}
                <li>
                  <a href="javascript:;">
                    <div class="avatar">
                      <img src="uploads/avatar_1.jpg" alt="">
                    </div>
                    <div class="txt">
                      <p>
                        <span>鲜活</span>{{$value.createAt.split('T')[0]}}说:
                      </p>
                      <p>{{$value.content.substr(0,10)}}</p>
                    </div>
                  </a>
                </li>
            {{/each}}

        `;
        var html = template.render(commentsTpl, {data: result});
        $('.discuz').html(html);

    }
});
// 导航显示功能
$.ajax({
    type:'get',//get或post
    url:'/categories',//请求的地址
    success:function(result){//成功的回调函数
        // console.log(result);
        var tpl = 
        `
            {{each data}}
            <li><a href="list.html?id={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
            {{/each}}
        
        `;
        var html = template.render(tpl, {data: result});
        $('.nav').html(html);
    }
});
//搜索功能
$('.search form').on('submit', function() {
  // alert(1);
  var key = $(this).find('.keys').val();
  // console.log(key);
  location.href = 'search.html?key=' + key;
  return false;
})