$(function() {
    //创建初始化函数，获取文章分类，并用模板渲染数据
    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function(response) {
                // console.log(response);
                let htmlstr = template('tem_table', response)
                $('tbody').html(htmlstr)
            }
        });
    }
    //调用函数
    initArtCateList()
        // 添加分类按钮，弹出添加层
    $("#btnAddCate").on('click', function() {
        const index = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#dialog_add").html()
        });
        // btnAddModifyCate(index, "/my/article/addcates", $(this).serialize())
        // 取消按钮 关闭弹出层
        $('#quxiao').on('click', function() {
                layui.layer.close(index)
            })
            // form监听submit提交添加分类
        $('#fomAddCate').on('submit', function(e) {
            e.preventDefault()
            console.log($(this).serialize());
            $.ajax({
                method: "POST",
                url: "/my/article/addcates",
                data: $(this).serialize(),
                success: function(response) {
                    console.log(response);
                    if (response.status != 0) {
                        return layui.layer.msg(response.message)
                    }
                    layui.layer.msg(response.message)
                    layui.layer.close(index)
                    initArtCateList()
                }
            });
        })
    })

    // 编辑文章分类功能
    $('tbody').on('click', '#btn_edit', function() {
            // const id = $(this).attr('data-id')
            const index = layui.layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '修改文章分类',
                content: $("#dialog_add").html()
            });
            // const alis = $(this).parent().prev().html()
            // const name = $(this).parent().prev().prev().html()
            //     // console.log(name);
            //     // console.log(alis);
            // $('#class_name').val(name)
            // $('#alis_name').val(alis)
            // $('#aaaaaaa').val('123123123')
            // console.log($('#aaaaaaa').val());
            var id = $(this).attr('data-id')
                // 发起请求获取对应分类的数据
            $.ajax({
                    method: 'GET',
                    url: '/my/article/cates/' + id,
                    success: function(res) {
                        layui.form.val('form-edit', res.data)
                    }
                })
                // 取消按钮 关闭弹出层
            $('#quxiao').on('click', function() {
                    layui.layer.close(index)
                })
                // form监听submit提交添加分类
            $('#fomAddCate').on('submit', function(e) {
                e.preventDefault()
                    // console.log(`id={id}`);
                    // console.log($(this).serialize() + '&' + `Id=${id}`);
                console.log($(this).serialize());
                $.ajax({
                    method: "POST",
                    url: "/my/article/updatecate",
                    data: $(this).serialize(),
                    success: function(response) {
                        console.log(response);
                        if (response.status != 0) {

                            return layui.layer.msg(response.message)
                        }
                        layui.layer.msg(response.message)
                        layui.layer.close(index)
                        initArtCateList()
                    }
                });
            })
        })
        // 删除文章分类功能
    $('tbody').on('click', '#btn_del', function() {
        const id = $(this).attr('data-id')
        layer.confirm('确认删除此分类吗？', { icon: 3, title: '' }, function(index) {
            $.ajax({
                method: "GET",
                url: "/my/article/deletecate/" + id,
                success: function(res) {
                    console.log(res);
                    if (res.status != 0) {
                        return layui.layer.msg(res.message)
                    }
                    layui.layer.msg(res.message)
                    layui.layer.close(index);
                    initArtCateList()
                }
            })

        });

    })

})