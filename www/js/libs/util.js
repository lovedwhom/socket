/**
 * Created by Administrator on 2017/5/25 0025.
 */
//判断js对象是否为空
function isNull(value) {
    return typeof value == 'undefined' || value === "" || value == null || value == undefined || value == [];
}

//判断js对象是否不为空
function isNotNull(value) {
    return !isNull(value);
}