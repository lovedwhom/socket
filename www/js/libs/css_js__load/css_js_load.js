//动态添加css或者js文件
function loadjscssfile(filename, filetype) {
    //如果文件类型为 .js ,则创建 script 标签，并设置相应属性
    if (filetype == "js") {
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
    }

    //如果文件类型为 .css ,则创建 script 标签，并设置相应属性
    else if (filetype == "css") {
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }

    if (typeof fileref != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
}

//动态删除css或者JS文件
function removejscssfile(filename, filetype) {
    //判断文件类型
    var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none";

    //判断文件名
    var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none";

    var allsuspects = document.getElementsByTagName(targetelement);

    //遍历元素， 并删除匹配的元素
    for (var i = allsuspects.length; i >= 0; i--) {
        if (allsuspects[i] &&
            allsuspects[i].getAttribute(targetattr) != null &&
            allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1) {
            allsuspects[i].parentNode.removeChild(allsuspects[i]);
        }
    }
}/**
 * Created by Administrator on 2017/5/27 0027.
 */
