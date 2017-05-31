/**
 * Created by YJSON on 2016/12/20.
 */
(function($){
    $.extend({
        GMap:{
            initAttr:{
                map:null
            },
            set:{
                zoomControl:true,
                zoomControlOptions: {
                    style:google.maps.ZoomControlStyle.SMALL
                },
                mapTypeControl:true,
                mapTypeControlOptions:{
                    position:google.maps.ControlPosition.RIGHT_BOTTOM,
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
                },
                scaleControl:true,
                scaleControlOptions:{
                    position:google.maps.ControlPosition.RIGHT_BOTTOM
                },
                streetViewControl:false,
                overviewMapControl:true,
                overviewMapControlOptions:{
                    position:google.maps.ControlPosition.BOTTOM_RIGHT
                },
                ZoomControlStyle: {
                    SMALL: google.maps.ZoomControlStyle.SMALL,
                    LARGE: google.maps.ZoomControlStyle.LARGE,
                    DEFUALT: google.maps.ZoomControlStyle.DEFUALT
                },
                mapTypeId:google.maps.MapTypeId.TERRAIN
            },
            superConfig:function(){

            },
            initConfig:function(s,me){
                if(s['center']){
                    me.set['center'] =  $.GMapFun.globalFun.getlatlng(s['center'])
                }else{
                    me.set['center'] = {'lat':35.86166,'lng':104.195397};
                }
                me.set['zoom'] = s['zoom']?s['zoom']:5;
                if(s['mapType']){
                    var type = s['mapType'].toLocaleUpperCase();
                    me.set['mapTypeId'] = google.maps.MapTypeId[type];
                }
            },
            mouseEvent:function(){},
            initMap:function () {
                var div = "<div>" +
                        "" +
                        "</div>";
            },
            init:function(c,s){
                var me = this;
                s = s?s:{};
                this.initConfig(s,me);
                console.log(me.set);
                var map = new google.maps.Map(c,me.set);
                me.initAttr.map = map;
                $.GMapFun.initAttr.map = map;
                $.GMapFun.globalFun.initAttr.map = map;
                this.initMap(map);
                this.superConfig(s,map,me);
                this.mouseEvent(s,map,me);
                $(c).on('resize',function(){
                    map.checkResize();
                });
                return map;
            }
        }
    });
})(jQuery);