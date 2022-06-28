$(function() {
    var form = layui.form
    var layer = layui.layer
    $.ajax({
        method: "GET",
        url: "/my/article/cates",
        success: function(res) {
            let htmlStr = template('tpl_cate', res)
            $('[name="cate_id"]').html(htmlStr)
            form.render()
        }
    })
    initEditor()
        // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 320,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btnSelectImg').on('click', function() {
        $('#selectImg').click()
    })
    $('#selectImg').on('change', function(e) {
            // 拿到用户选择的文件
            var file = e.target.files[0]
                // 根据文件创建一个url
            var newImgURL = URL.createObjectURL(file)
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        })
        // 默认文章状态为已发布，如果点击草稿的话变更为草稿
    let art_state = "已发布"
    $('#btnSave2').on('click', function() {
            art_state = "草稿"
        })
        // 根据form中的数据生成formData
    $('#formPub').on('submit', function(e) {
            e.preventDefault()
            const fd = new FormData($(this)[0])
            fd.append('state', art_state)
                // fd.forEach(function(value, key) {
                //     console.log(key, value);
                // })
            $image
                .cropper('getCroppedCanvas', {
                    // 创建一个 Canvas 画布
                    width: 400,
                    height: 320
                })
                .toBlob(function(blob) {
                    // 将 Canvas 画布上的内容，转化为文件对象
                    // 得到文件对象后，进行后续的操作
                    // 将文件对象，存储到 fd 中
                    fd.append('cover_img', blob)
                    publishArticle(fd)
                })
        })
        // 创建发布文章的函数
    function publishArticle(fd) {
        fd.forEach(function(value, key) {
            console.log(key, value);
        })
        $.ajax({
            method: "POST",
            url: "/my/article/add",
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                location.href = '/article/art_list.html'

            }
        })
    }
    $('#backLink').on('click', function() {
        layer.confirm('此操作将导致文章信息丢失, 是否继续？', { icon: 3, title: '提示' }, function(index) {

            location.href = "/article/art_list.html"

            layer.close(index);
        });

    })
})