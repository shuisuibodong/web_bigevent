$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;
    // 定义请求参数
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: ""
    }
    initArtList()
    initArtCate()
        // 初始化分页函数

    // 初始化文章列表
    function initArtList() {
        $.ajax({
            method: "GET",
            url: "/my/article/list",
            data: q,
            success: function(res) {
                if (res.status != 0) {
                    layer.msg(res.message)
                }
                //获取数据成功后渲染到页面
                // console.log(res);
                let texthtml = template('tpl_table', res)
                    // console.log(texthtml);
                $('tbody').html(texthtml)
                    // 调用初始化分页
                initPage(res.total)
            }
        })

    }
    // 定义美化时间格式过滤器
    template.defaults.imports.dateFormat = function(date) {
            const dt = new Date(date)
            let y = dt.getFullYear()
            let m = padZero(dt.getMonth() + 1)
            let d = padZero(dt.getDate())

            let hh = padZero(dt.getHours())
            let mm = padZero(dt.getMinutes())
            let ss = padZero(dt.getSeconds())
            return y + '-' + m + '-' + d + '-' + ' ' + hh + ':' + mm + ':' + ss
        }
        // 给时间补充0
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 初始化文章分类下拉菜单
    function initArtCate() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                let htmlStr = template('tpl_Cate', res)
                    // console.log(htmlStr);
                $('#cateID').html(htmlStr)
                    // 重新软软layui下拉菜单内容才能生效
                form.render()


            }
        })
    }
    // 筛选按钮，对q重新赋值
    $('.btnShaiXuan').on('click', function(e) {
            e.preventDefault()
            q.cate_id = $('#cateID').val()
            q.state = $('[name=state]').val()
                // console.log(q);
            initArtList()
        })
        // 删除文章
    $('tbody').on('click', '.btnDel', function(e) {
        let id = $(this).attr('data-id');
        let length = $(".btnDel").length
        layer.confirm('此操作将永久删除该文章，是否继续？', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: "GET",
                url: "/my/article/delete/" + id,
                success: function(res) {
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                        // console.log(typeof(length));
                        // 当前页码删除完最后一项的时候给pagenum-1显示前一页
                    if (length == 1) {
                        q.pagenum = q.pagenum == 1 ? 1 : q.pagenum - 1
                    }
                    console.log(q);
                    initArtList()
                }
            })

            layer.close(index);
        });


    })


    function initPage(total) {
        // console.log(total);
        layui.use('laypage', function() {

            //执行一个laypage实例
            laypage.render({
                elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号,
                count: total, //数据总数，从服务端得到
                limit: q.pagesize,
                curr: q.pagenum,
                limits: [2, 5, 10],
                layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
                jump: function(obj, first) {
                    // console.log(obj.curr);
                    // console.log(obj.limit);
                    q.pagesize = obj.limit
                    if (!first) {
                        q.pagenum = obj.curr
                        initArtList()
                    }
                }

            });
        });
    }
})