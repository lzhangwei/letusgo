/**
 * Created by zhangwei on 14-8-15.
 */
$(document).ready(function () {
    if(typeof(Storage) !== "undefined") {
        loadAllItems();
    } else {
        alert('当前浏览器不支持Web Storage，请使用其他浏览器！');
    }
});