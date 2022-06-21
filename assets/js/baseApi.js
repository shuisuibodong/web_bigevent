// ajax发起get post请求都会先执行ajaxPrefilter方法，此处重新定义optionurl，拼接url
$.ajaxPrefilter(function(option) {
    option.url = 'http://www.liulongbin.top:3007' + option.url
})