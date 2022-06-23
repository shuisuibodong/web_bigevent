$(function() {
        // 初始化用户信息功能
        getUserInfo();
        // 退出功能
        $('#btnLogout').on('click', function() {
            layui.layer.confirm('此操作将退出登录, 是否继续?', { icon: 3, title: '提示' }, function(index) {
                location.href = '/login.html'
                localStorage.removeItem('token')
                layer.close(index);
            });
        })
    })
    // 获取用户信息函数
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function(res) {
            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        }
    });
}
// 渲染欢迎用户名字和头像
function renderAvatar(user) {
    let name = user.nickname || user.username
    $('#welcom').html('欢迎 ' + name)
        // 渲染头像
    if (user.user_pic != null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.text-avatar').html(name[0].toUpperCase())
        $('.text-avatar').show()
        $('.layui-nav-img').hide()
    }
}

//用户不登录直接访问index.html也能访问，需要设置权限
// 不论认证成功还是失败ajax都会调用complete函数，在complete函数判断是认证成功还是失败，在跳转页面