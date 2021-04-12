$(function () {
  // 调用getUserInfo获取用户基本信息
  getUserInfo();

  // 退出功能
  $(".outbtn").on("click", function () {
    // 提示用户是否确认退出
    layer.confirm('确定要退出登录?',
      { icon: 3, title: '提示' },
      function (index) {
        //do something
        // 1. 清空本地存储中的 token
        localStorage.removeItem('token')
        // 2. 重新跳转到登录页面
        location.href = '/login.html'
        // 关闭 confirm 询问框
        layer.close(index)
      })
  })
})

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      // console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg(res.message);
      }
      // 调用渲染用户头像的函数
      renderAvatar(res.data);
    }        
    // 不论成功还是失败，最终都会调用 complete 回调函数
    // complete: function (res) {
    //   console.log(res);
    //   // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     // 1. 强制清空 token
    //     localStorage.removeItem('token')
    //     // 2. 强制跳转到登录页面
    //     location.href = '/login.html'
    //   }
    // }
  })
}

function renderAvatar(user) {
      // 获取用户的名称
      const name = user.nickname || user.username;
      $("#welcom").html("欢迎您！ " + name);
      if (user.user_pic) {
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
      } else {
        $(".layui-nav-img").hide();
        const first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
      }
    }