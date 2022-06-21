// 登录、注册切换按钮
$('#link_reg').on('click', function() {
    $('.login-box').hide()
    $('.reg-box').show()

})
$('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()

    })
    //自定义密码验证规则，继承layui，有函数和数组两种方式
layui.form.verify({
    pass: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    repwd: function(value, iteam) {

        var pwd = $('.reg-box input[name="password"]').val()
        if (pwd != value) {
            return '密码不一致';
        }
    }
})

//注册用户
$('#form_reg').on('submit', function(e) {
        e.preventDefault()
        data = $(this).serialize();
        $.post('/api/reguser', data, function(res) {
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录');
            $('#link_login').click();
        })
    })
    //请求用户登录
$('#form_login').on('submit', function(e) {
    e.preventDefault()
    data = $(this).serialize();
    console.log(data);
    $.post('/api/login', data, function(res) {
        if (res.status != 0) {
            return layer.msg(res.message);
        }
        console.log(res);
        layer.msg('登录成功');
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
    })
})