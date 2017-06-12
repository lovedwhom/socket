/**
 * Created by Administrator on 2017/5/27 0027.
 */
//======loading进度条=======
loading = {};

loading.create = function (msg) {
    var h = new Array();
    h.push("<div id='cpic_ui_mask1' type='loading_type' class='cpic_ui_mask' style='display:none'></div>");
    h.push("<div id='cpic_ui_loading1' type='loading_type' style='display:none;position:fixed;z-index:6000;text-align:center;'><div class='cpic_ui_loading' style='left:50%;margin-left:-95px'></div><div id='loadingMessage' style='margin-top:5em;color:#bbb'>" + msg + "</div></div>");
    h = $(h.join(""));
    $("body").append(h);
};

loading.open = function (msg) {

    loading.create(msg);

    loading.refresh();

    $(window).on('ortchange', function () {
        loading.refresh();
    });
};

loading.refresh = function () {
    $win = $(window);
    var ret =
    {
        top: (($win.height() - 180) / 2 + 5) + "px",
        //left : (($win.width()-100)/2)+"px",
        display: 'block'
    };

    $('#cpic_ui_mask1').show();
    $('#cpic_ui_loading1').css(ret);

};

loading.close = function () {
    if (document.getElementById("cpic_ui_mask1")) {
        $('#cpic_ui_mask1').hide().remove();
    }

    if (document.getElementById("cpic_ui_loading1")) {
        $('#cpic_ui_loading1').hide().remove();
    }
    $("div[type='loading_type']").remove();
    $('.content2').show();
};