/**
 * Created by Administrator on 2017/5/27 0027.
 */
window.onerror = function (msg, url, line) {
    var idx = url.lastIndexOf("/");
    if (idx > -1) {
        url = url.substring(idx + 1);
    }
    promptJS("ERROR in " + url + " (line #" + line + "): " + msg);
    return false;
};