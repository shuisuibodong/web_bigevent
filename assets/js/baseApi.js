// ajax发起get post请求都会先执行ajaxPrefilter方法，此处重新定义optionurl，拼接url
$.ajaxPrefilter(function(option) {
    option.url = 'http://www.liulongbin.top:3007' + option.url
    if (option.url.indexOf('/my/') != -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    option.complete = function(res) {
        console.log('调用了complete');
        console.log(res)
        if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
            location.href = '/login.html'
            localStorage.removeItem('token')
        }
    }
})