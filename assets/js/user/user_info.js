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

    var user = initUserInfo()
    form.val("formUserInfo", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
        "username": user.data['username'] // "name": "value"
    });
})


function initUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function(res) {
            return res
        }
    });

}