// 每次调用$.get / $.post / $.ajax 的时候
// 都会先调用$.ajaxPrefilter()这个函数
// 函数可以接收发送请求的配置对象
$.ajaxPrefilter(function(options) {
  // 在每一次请求之前。统一拼接请求的跟路径
  options.url = "http://api-breakingnews-web.itheima.net" + options.url;
})