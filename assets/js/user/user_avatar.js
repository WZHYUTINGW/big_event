$(function () {
  // 1.初始化裁剪效果
  // 1.1 获取裁剪区域的 DOM 元素
  // const $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }
  // 1.3 创建裁剪区域
  $('#image').cropper(options)

  $("#btnChooseImage").on("click", function () {
    // 模拟文件input的上传功能
    $("#file").click();
  })

  //  绑定文件的change事件
  $("#file").on("change", function (e) {
    // 用户选择文件的列表
    const [file] = e.target.files;
    // 解构，相当于const file = e.target.files[0];
    if (!file) {
      return layui.layer.msg(res.message);
    }
    // 拿到用户选择的文件
    // const file = e.target.files[0];
    const imgURL = URL.createObjectURL(file);
    $('#image')
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  // 绑定确定按钮点击事件
  $("#btnUpload").on("click", function() {
    const dataURL = $('#image')
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png')
    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('更换头像失败！')
        }
        layer.msg('更换头像成功！')
        window.parent.getUserInfo()
      }
    })
  })

})