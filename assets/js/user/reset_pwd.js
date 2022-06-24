$(function() {
    layui.form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function(value) {
            if (value == $('[name="oldPwd"]').val()) {
                return '新旧密码不能相同'
            }
            layui.layer.msg('修改成功')
        },
        reNewPwd: function(value) {
            if (value !== $('[name="newPwd"]').val()) {
                return '两次输入密码不一致'
            }
        }
    });
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                $('.layui-form')[0].reset()
            }
        })
    })
})