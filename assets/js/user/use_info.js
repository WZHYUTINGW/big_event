const form = layui.form
$(function() {
  form.verify({
    nickname: function(value) {
      if (value.length > 6) {
        return '昵称长度不能超过6 个字符之间！'
      }
    }
  });

  initUserInfo();

  // 初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function(res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        // console.log(res);
        // 调用form.val()快速为表单赋值
        form.val('formUserInfo', res.data);
      }
    });
  
  }

  // 重置表单的数据
  $("#btnReset").on("click", function(e) {
    e.preventDefault();
    initUserInfo();
  })

  // 监听表单的提交事件
  $(".layui-form").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        layui.layer.msg("更新用户信息成功！");
        // 调用父页面里的函数，重新渲染用户名和头像
        window.parent.getUserInfo();
      }
    })
  })



})