//获取热门推荐数据
// 因为这个“热门推荐”模块是公共的，所以这个模板可以写在js里面，比较省代码
$.ajax({
    type:'get',//get或post
    url:'/posts/recommend',//请求的地址
    success:function(result){//成功的回调函数
        // console.log(result);
        var recommendTpl = `
        {{each data}}
            <li>
              <a href="detail.html?id={{$value._id}}">
                <img src="{{$value.thumbnail}}" alt="">
                <span>{{$value.title}}</span>
              </a>
            </li>
        {{/each}}
        `;
        var html = template.render(recommendTpl, {data: result});
        $('.hots ul').html(html);
    }
})