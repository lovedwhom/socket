/**
 * Created by Administrator on 2017/5/27 0027.
 */

/**三秒后消失的弹出框
 *@param message:消息内容，只传字符串
 */
function promptJS(message) {
    if (isNull(message)) {
        message = '  ';
    }
    //创建prompt框样式
    var type = "z-index:100000;width:60%;padding:5px;line-height:30px; border-radius:15px; color:#fff; background-color:#6c6c6c; text-align:center;font-size:15px; opacity:0;position:fixed;top:65%;left:20%";
    //创建prompt框
    var h = $("<div style='" + type + "' id='e_ui_prompt'>" + message + "</div>");
    $('body').append(h);

    //改变透明度
    var i = 0;
    var t = setInterval(function () {
        i = i + 0.1;
        if (i >= 1) {
            clearInterval(t);
            i = 0;
        } else {
            $(h).css('opacity', i);
        }
    }, 80);

    //2秒后消失
    setTimeout(function () {
        var j = $(h).css('opacity');
        var ti = setInterval(function () {
            j = j - 0.1;
            if (j <= 0) {
                clearInterval(ti);
                $(h).remove();
            } else {
                $(h).css('opacity', j);
            }
        }, 80);
    }, 3000);
};

function promptPageJS(message) {
    loading.close();

    if (isNull(message)) {
        message = '  ';
    }
    //创建prompt框样式
    var type = "z-index:100000;width:50%;padding:3px 5px; border-radius:15px; color:#fff; background-color:#6c6c6c; text-align:center;font-size:15px; opacity:0;position:fixed;top:85%;left:25%";
    //创建prompt框
    var h = $("<div style='" + type + "' id='e_ui_prompt'>" + message + "</div>");
    $('body').append(h);

    //改变透明度
    var i = 0;
    var t = setInterval(function () {
        i = i + 0.1;
        if (i >= 1) {
            clearInterval(t);
            i = 0;
        } else {
            $(h).css('opacity', i);
        }
    }, 80);

    //2秒后消失
    setTimeout(function () {
        var j = $(h).css('opacity');
        var ti = setInterval(function () {
            j = j - 0.1;
            if (j <= 0) {
                clearInterval(ti);
                $(h).remove();
            } else {
                $(h).css('opacity', j);
            }
        }, 80);
    }, 3000);
};