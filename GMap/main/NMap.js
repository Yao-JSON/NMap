/**
 * Created by YJSON on 2016/12/20.
 */
$.fn.NMap = function(t,set){
    var $com = this[0];
    switch (t){
        case 'BMap':
            $.BMap.init($com,set);
            return $.BMapFun;
        case "GMap":
            $.GMap.init($com,set);
            return $.GMapFun;
        case "AMap":
            $.AMap.init($com,set);
            return $.AMapFun;
    }
};