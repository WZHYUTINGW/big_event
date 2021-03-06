// 每次调用$.get / $.post / $.ajax 的时候
// 都会先调用$.ajaxPrefilter()这个函数
// 函数可以接收发送请求的配置对象
$.ajaxPrefilter(function(options) {
  // 在每一次请求之前。统一拼接请求的跟路径
  options.url = "http://api-breakingnews-web.itheima.net" + options.url;
  // 统一为有权限的接口设置headers请求头
  if (options.url.includes("/my/")) {
    options.headers ={
      Authorization: localStorage.token || ""
    }
  }
  // 全局统一挂载 complete 回调函数
  options.complete = function(res) {
    // console.log('执行了 complete 回调：')
    // console.log(res)
    // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 1. 强制清空 token
      localStorage.removeItem('token')
      // 2. 强制跳转到登录页面
      location.href = '/home/login.html'
    }
  }
})