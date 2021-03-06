$(function () {
  const layer = layui.layer;
  // 定义美化时间的过滤器
  template.defaults.imports.dataFormat = function (date) {
    const ndate = new Date(date);
    const year = ndate.getFullYear();
    const month = ndate.getMonth() + 1;
    const day = ndate.getDate();
    const hours = ndate.getHours();
    const minutes = ndate.getMinutes();
    const seconds = ndate.getSeconds();
    return `${year}-${padZero(month)}-${padZero(day)} ${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`
  }
  // 定义补零的函数
  function padZero(num) {
    return num > 10 ? num : "0" + num;
  }

  // 定义一个查询的参数对象，将来请求数据的时候，
  // 需要将请求参数对象提交到服务器
  const q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: '', // 文章分类的 Id
    state: '' // 文章的发布状态
  }
  initTable();

  // 获取文章列表数据的方法
  function initTable() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg('获取文章列表失败！')
        }
        // 使用模板引擎渲染页面的数据
        const htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr);
        // 调用渲染分页的方法
        renderPage(res.total)
      }
    })
    
  }

  initCate();
  const form = layui.form;
  // 初始化文章分类的方法
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取分类数据失败！')
        }
        // 调用模板引擎渲染分类的可选项
        var htmlStr = template('tpl-cate', res)
        $('[name=cate_id]').html(htmlStr)
        // 通过 layui 重新渲染表单区域的UI结构
        form.render();
      }
    })
  }

  // 筛选条件
  $("#form-search").on("submit", function (e) {
    e.preventDefault();
    const cate_id = $("[name=cate_id").val();
    const state = $("[name=state]").val();
    q.cate_id = cate_id;
    q.state = state;
    initTable();
  })

  const laypage = layui.laypage;
  // 定义渲染分页的方法
  function renderPage(total) {
    // console.log(total);
    laypage.render({
      elem: "pageBox",
      count: total,
      limit: q.pagesize,
      curr: q.pagenum,
      // layout: ["count", "prev", "page", "next", "limit", "refresh", "skip"],
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      limits: [2, 3, 4, 5],
      jump: function(obj, first){
        //obj包含了当前分页的所有参数，比如：
        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        q.pagenum = obj.curr;
        q.pagesize = obj.limit;
        if(!first){
          initTable();
        }
      }
    })
  }
  // 删除文章的功能 需要通过代理的方式
  $("tbody").on("click", ".btn-del", function() {
    // 获取到要删除数据的id
    const id = $(this).attr("data-id");
    // 获取删除按钮的个数
    const length = $(".btn-del").length;
    layer.confirm("确认删除？", {icon: 3, title: '提示'}, function(index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/delete/' + id,
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg(res.message);
          }
          layer.msg(res.message);
          // console.log(length);
          if (length === 1) {
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
          }
          initTable();
        }
      })
      layer.close(index);
    })
  })








})