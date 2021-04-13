$(function () {
  const form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6-12位，且不能出现空格"],
    samepwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return "新旧密码不能相同！";
      }
    },
    repwd: function(value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不一致！'
      }
    }
  })

  // 发起修改密码的请求
  $(".layui-form").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success: function(res) {
        if(res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        layui.layer.msg(res.message);
        $(".layui-form")[0].reset(); // jQuery对象转为原生对象调用reset方法
      }
    })
  })

})