$(function() {
    // 验证昵称在，自动以form验证方法
    const form = layui.form
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称在1-6个字符之间'
            }
        }
    });

    //初始化基本资料，获取用户信息后把登录名称填充到form表单
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status != 0) {
                    return layui.layer.meg('获取用户信息失败')
                }
                // 调用layui的form方法用lay-filter=“”快速渲染数据
                form.val('formUserInfo', res.data);
            }
        });
    }
    // 实现重置按钮功能
    $('.userInfoReset').on('click', function(e) {
            e.preventDefault()
            initUserInfo()
        })
        //提交修改用户信息
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.meg('修改信息失败')
                }
                //修改信息成功后需要在子页面调用父页面的方法更新头像和欢迎语，子页面在ifrem中，子页面的window就是ifrem，ifrem的parent就是主页面index
                window.parent.getUserInfo()
            }
        })
    })
})