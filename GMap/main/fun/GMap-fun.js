/**
 * Created by YJSON on 2016/12/20.
 */
function searchType(obj){
    var o;
    o =  Object.prototype.toString.call(obj);
    return o.slice(8,-1).toLocaleLowerCase();
}
// lng  经度   lat  纬度
(function($){
    $.extend({
        searchType:function(obj){
            var o;
            o =  Object.prototype.toString.call(obj);
            return o.slice(8,-1).toLocaleLowerCase();
        },
        GMapFun:{
            initAttr:{
                type:null,
                icon:['../images/1.png','../images/2.png', '../images/3.png', '../images/4.png', '../images/5.png','../images/6.png',  '../images/7.png', '../images/8.png'],
                color:['#2A78D8','#E52F2F',"#64B324","#32CABB","#951E22","#9865C2","#D34CA5","#F7D326"],
                colorBack:'../images/09.png',
                lineIcon:['../images/01.png','../images/02.png','../images/03.png','../images/04.png','../images/05.png','../images/06.png','../images/07.png','../images/08.png'],
                label:"ABCDEFGHIJKLMNOPQRSTUVWSYZ"
            },
            globalFun:{//全局方法
                initAttr:{
                    map:null
                },
                searchType:function(obj){
                    var o;
                    o =  Object.prototype.toString.call(obj);
                    return o.slice(8,-1).toLocaleLowerCase();
                },
                overLay:function(){//添加覆盖物
                    var map = this.initAttr.map;
                    var me = this;
                    function ComplexCustomOverlay(set){//自定义复杂覆盖物
                        this._latlng = me.getlatlng(set['center']);
                        this._set = set;
                        this._map = map;
                    }
                    ComplexCustomOverlay.prototype = new google.maps.OverlayView();
                    ComplexCustomOverlay.prototype.draw = function(){
                        var div1 = this._div1;
                        if(!div1){
                            div1 = this._div1 = document.createElement("div");
                            div1.style.position = "absolute";
                            div1.className="NMap-labelOverlay";
                            div1.style.backgroundColor = this._set['color'];
                            div1._onClick = this._set['onClick'];
                            if(this._set['options']){
                                var arr = [];
                                for(var k in this._set['options']){
                                    arr.push("'"+k+"':"+this._set['options'][k]);
                                }
                                div1.dataOptions = arr.join(',');
                                $(div1).attr('data-options',arr.join(','))
                            }
                            var div2 = this._div2 = document.createElement("div");
                            div1.appendChild(div2);
                            div2.appendChild(document.createTextNode(this._set['overlay']));
                            google.maps.event.addDomListener(div1, "click", function(event) {
                                if(this._onClick){
                                    this._onClick(event,this);
                                }
                            });
                            var panes = this.getPanes();
                            panes.overlayImage.appendChild(div1);
                        }
                        var point = this.getProjection().fromLatLngToDivPixel(this._latlng);
                        if (point) {
                            this._div1.style.left = point.x + 'px';
                            this._div1.style.top = point.y + 'px';
                        }
                    }
                    ComplexCustomOverlay.prototype.getPosition = function() {
                        return this._latlng;
                    };
                    ComplexCustomOverlay.prototype.remove = function() {
                        // Check if the overlay was on the map and needs to be removed.
                        if (this._div1) {
                            this._div1.style.display = "none";
                        }
                    };
                    return ComplexCustomOverlay;
                },
                setZoom:function(z){//地图缩放大小
                    var map = this.initAttr.map;
                    map.setZoom(z);
                },
                setCenter:function(c){//地图中心点位置
                    var map = this.initAttr.map;
                    var latlng ;
                    if(this.searchType(c) == 'array'){
                       map.setCenter(this.getlatlng(c));
                    }
                    if(this.searchType(c) == "object"){
                        latlng = {
                            lat:c['lat'],
                            lng:c['lng']
                        }
                        map.setCenter(latlng);
                    }
                },
                moveTo:function(c){
                    var map = this.initAttr.map;
                    var latlng ;
                    if(this.searchType(c) == 'array'){
                        map.panTo(this.getlatlng(c));
                    }
                    if(this.searchType(c) == "object"){
                        latlng = {
                            lat:c['lat'],
                            lng:c['lng']
                        }
                        map.panTo(latlng);
                    }
                },
                getlatlng:function(c){
                    var latlng;
                    if($.searchType(c) == 'array'){
                        latlng = new google.maps.LatLng(c[0],c[1])
                    }else if($.searchType(c) == 'object'){
                        latlng = new google.maps.LatLng(c);
                    }
                    return latlng;
                },
                setMap:function(s){
                    var map = this.initAttr.map;
                    if(s['center']){
                        this.setCenter(s['center']);
                    }
                    if(s['zoom']){
                        s['zoom'] = parseInt(s['zoom']);
                        map.setZoom(s['zoom']);
                    }
                }
            },
            marker:function(s,f){//普通标点
                var icon = this.initAttr.icon;
                var color = this.initAttr.color;
                var map = this.initAttr.map;
                var myLatLng,ker,marker,infowindow,arr=[],o,ComplexCustomOverlay,overlay,set;
                var sData = s['data'];
                for(var i = 0;i<sData.length;i++){
                    o = sData[i];
                    var makerArr = [];
                    for(var d = 0;d<o['data'].length;d++){
                        myLatLng = this.globalFun.getlatlng(o['data'][d]['center']);
                        ker = {
                            position:myLatLng,
                            map:map,
                            icon:icon[i%icon.length]
                        };
                        set =o['data'][d];
                        set['color'] = color[i%color.length];
                        o['data'][d]['title']&&(ker['title'] = o['data'][d]['title']);
                        o['data'][d]['draggable']&&(ker['draggable'] = o["data"][d]['draggable']);
                        marker = new google.maps.Marker(ker);
                        marker.text = sData[i]['text'];
                        marker.icon = icon[i%icon.length];
                        if(o['data'][d]['onClick']){
                            marker.onClick = o['data'][d]['onClick'];
                            marker.obj = o;
                        }
                        if(o['data'][d]['infowindowIsOpen']){
                            var infow = new google.maps.InfoWindow({
                                content: o['data'][d]['infowindow']||'没有设置 infowindow 属性值！'
                            });
                            infow.open(map,marker);
                        }
                        if(o['data'][d]['infowindow']){
                            var infow = new google.maps.InfoWindow({
                                content: o['data'][d]['infowindow']
                            });
                            marker.infowindow = infow;
                        }
                        if(o['data'][d]['overlay']){
                            ComplexCustomOverlay = this.globalFun.overLay();
                            if(o['data'][d]['formatter']){
                                set['overlay'] = o['data'][d]['formatter'](set['overlay'])||set['overlay'];
                            }
                            overlay = new ComplexCustomOverlay(set);
                            marker.overlay = overlay;
                            overlay.setMap(map);
                        }
                        if(o['data'][d]['onLoad']){
                            o['data'][d]['onLoad'](d,set,map);
                        }
                        marker.addListener('click',function(e){
                            var l =this.getPosition();
                            if(this.onClick){
                                this.onClick(e,this);
                            }
                            if(this.infowindow){
                                this.infowindow.open(map,this);
                            }
                        });
                        marker.setMap(map);
                        makerArr.push(marker);
                    }
                    arr.push(makerArr);
                }
                if(s['legend']){
                    $.GMapStyle.makerLegend(arr,map);
                }
                this.globalFun.setMap(s);
                if(f){f(arr,map);}
                return {marker:arr,map:map};
            },
            setZoom:function(n){//设置地图缩放比例
                this.globalFun.setZoom(n);
            },
            setCenter:function(c){//设置地图中心点
                this.globalFun.moveTo(c);
            },
            markerLabel:function(s,f){
                var map = this.initAttr.map;
                var color = this.initAttr.color;
                var sData = s['data'];
                var overlay,set,arr = [],ComplexCustomOverlay;
                /* 构造函数 */
                for(var i = 0,o;i<sData.length;i++){
                    o = sData[i];
                    for(var c =0,overArr = [];c<o['data'].length;c++){
                        set = o['data'][c];
                        set['color'] = color[i%color.length];
                        ComplexCustomOverlay = this.globalFun.overLay();
                        if(o['data'][c]['formatter']){
                            set['overlay'] = o['data'][c]['formatter'](set['overlay'])||set['overlay'];
                        }
                        if(o['data'][c]['options']){
                            set['options'] = o['data'][c]['options'];
                        }
                        overlay = new ComplexCustomOverlay(set);
                        overlay.setMap(map);
                        console.log(overlay)
                        overArr.set = set;

                        if(o['data'][c]['onLoad']){
                            o['data'][c]['onLoad'](overlay,set);
                        }
                        overArr.push(overlay);
                    }
                    arr.push(overArr);
                }
                if(s['legend']){
                    $.GMapStyle.overlayLabelLegend(arr,map);
                }
                this.globalFun.setMap(s);
                if(f){f(arr,map)};
                return {markerLabel:arr,map:map};
            },
            removeMarker:function(){//删除标点

            },
            getlatLng:function(f){//获取鼠标点击时 经纬度
                var map = this.initAttr.map;
                var lat,lng,x,y;
                map.addListener('click',function(e){
                    lat = e.latLng.lat();
                    lng = e.latLng.lng();
                    x = e.pixel.x;
                    y = e.pixel.y;
                    var e = {
                        lat:lat,
                        lng:lng,
                        x:x,
                        y:y
                    };
                    if(f){
                        f(e);
                    }
                });
            },
            centerMarker:function(s,f){//中心标点
                var map = this.initAttr.map;
                var me = this;
                var lat,set,lng,marker,myLatLng;
                if($.searchType(s) == 'object'){
                    set = {
                        position: me.globalFun.getlatlng(s['center']),
                        map: map,
                        title: s['title']?s['title']:'中心标记'
                    };
                    myLatLng = me.globalFun.getlatlng(s['center']);
                    marker = new google.maps.Marker(set);
                    if(s['onClick']){
                        marker.onClick = s['onClick'];
                    }
                    marker.addListener('click',function(){
                        if(this.onClick){
                            this.onClick(arguments);
                        }
                    });
                    marker.setMap(map);
                }else if($.searchType(s) == 'function'){
                    f = s;
                }
                map.addListener('click',function(e){
                    console.log(e)
                    myLatLng = {lat:e.latLng.lat(),lng:e.latLng.lng()}
                    map.panTo(myLatLng);
                    if(marker){
                        marker.setMap(null);
                    }
                    marker = new google.maps.Marker({
                        position: myLatLng,
                        map: map,
                        title: '中心标点'
                    });
                    if(s['onClick']){
                        marker.onClick = s['onClick'];
                    }
                    marker.addListener('click',function(){
                        if(this.onClick){
                            this.onClick(arguments);
                        }
                    });
                    marker.setMap(map);
                    if(f){f(arguments)};
                });
                map.addListener('center_changed', function(){
                    window.setTimeout(function() {
                        map.panTo(myLatLng);
                    }, 1000);
                });
            },
            flightPath:function(s,f){//连线
                var map = this.initAttr.map;
                var icon = this.initAttr.lineIcon;
                var color = this.initAttr.color;
                var iconsArr = [];
                var arr=[];
                var sData = s['data'];
                var lineSymbol = {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
                };
                for(var i = 0;i<sData.length;i++){
                    var lineArr = sData[i]['data'];
                    var flightPlanCoordinates = [];
                    for(var c =0;c<lineArr.length;c++){
                        var obj = this.globalFun.getlatlng(lineArr[c]);
                        flightPlanCoordinates.push(obj);
                        var iconObj = {
                            icon: lineSymbol,
                            offset:((i+1)/sData.length*100-2)+'%'
                        };
                        iconsArr.push(iconObj);
                    }
                    var flightPath = new google.maps.Polyline({
                        path: flightPlanCoordinates,
                        geodesic: true,
                        strokeColor: color[i%color.length],
                        strokeOpacity: 1.0,
                        strokeWeight: 2,
                        icons: iconsArr
                    });
                    flightPath.text = sData[i]['text'];
                    flightPath.icon = icon[i%icon.length];
                    flightPath.setMap(map);
                    arr.push(flightPath);
                }
                if(s['legend']){
                    $.GMapStyle.lineLegend(arr,map);
                }
                this.globalFun.setMap(s);
                if(f){
                    f(arr,map);
                }
                return {
                    flightPath:arr,
                    map:map
                };
            },
            circle:function(s,f){//画园
                var map = this.initAttr.map;
                var color = this.initAttr.color;
                var arr =[];
                var sData = s['data'];
                for(var i=0;i<sData.length;i++){
                    var myLatLng = this.globalFun.getlatlng(sData[i]['center']);
                    var circle =  new google.maps.Circle({
                        strokeColor: color[i%color.length],
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: color[i%color.length],
                        fillOpacity: 0.35,
                        map: map,
                        draggable:sData[i]['draggable'],
                        editable:sData[i]['editable'],
                        center: myLatLng,
                        radius: sData[i]['isKm']?(parseFloat(sData[i]['r']) * 1000):parseFloat(sData[i]['r'])
                    });
                    circle.color = color[i%color.length];
                    circle.text = sData[i]['text'];
                    if(sData[i]['onClick']){
                        circle.onClick = sData[i]['onClick'];
                    }
                    circle.addListener('click',function(){
                        if(this.onClick){
                            this.onClick(this);
                        }
                    });
                    if(sData[i]['onDrag']){
                        circle.onDrag = sData[i]['onDrag'];
                    }
                    if(sData[i]['onRadiuschanged']){
                        circle.onRadiuschanged = sData[i]['onRadiuschanged'];
                    }
                    if(sData[i]['onDragstart']){
                        circle.onDragstart = sData[i]['onDragstart'];
                    }
                    if(sData[i]['onDragend']){
                        circle.onDragend = sData[i]['onDragend'];
                    }
                    google.maps.event.addListener(circle, 'dragstart', function(e) {
                        if(this.onDragstart){
                            this.onDragstart(e,this);
                        }
                    });
                    google.maps.event.addListener(circle, 'drag', function(e) {
                        if(this.onDrag){
                            this.onDrag(e,this);
                        }
                    });
                    google.maps.event.addListener(circle, 'dragend', function(e) {
                        if(this.onDragend){
                            this.onDragend(e,this);
                        }
                    });
                    google.maps.event.addListener(circle, 'radius_changed', function(e) {
                        if(this.onRadiuschanged){
                            this.onRadiuschanged(e,this);
                        }
                    });
                    arr.push(circle);
                };
                if(s['legend']){
                    $.GMapStyle.circleLegend(arr,map)
                }
                this.globalFun.setMap(s);
                if(f){
                    f({circle:arr,map:map});
                }
                return {circle:arr,map:map};
            },
            rectangle:function(s,f){
                var color = this.initAttr.color;
                var map = this.initAttr.map;
                var arr = [];
                var sData = s['data'];
                for(var i = 0;i<sData.length;i++){
                    var rectangle = new google.maps.Rectangle({
                        map:map,
                        strokeColor:color[i%color.length],
                        strokeOpacity:0.8,
                        strokeWeight:2,
                        fillColor:color[i%color.length],
                        fillOpacity:0.3
                    });
                    rectangle.color = color[i%color.length];
                    var data = sData[i]['data'];
                    var lan1 = this.globalFun.getlatlng(data[0]);
                    var lan2 = this.globalFun.getlatlng(data[1]);
                    var latLngBounds = new google.maps.LatLngBounds(lan1,lan2);
                    rectangle.setBounds(latLngBounds);
                    rectangle.text = sData[i]['text'];
                    if(sData[i]['onClick']){
                        rectangle.onClick = sData[i]['onClick'];
                    }
                    rectangle.addListener('click',function(){
                        var me = this;
                        if(this.onClick){
                            this.onClick(this);
                        }
                    });
                    arr.push(rectangle);
                }
                if(s['legend']){
                    $.GMapStyle.rectLegend(arr,map);
                }
                this.globalFun.setMap(s);
                if(f){
                    f(arr,map);
                }
                return {react:arr,map:map}
            },
            drawingCircle:function(){
                var map = this.initAttr.map;

            },
            getDistance:function(start,end){//计算两点距离
                var EARTH_RADIUS = 6378.137; //地球半径
                function rad(d) {
                    return d * Math.PI / 180.0;
                }
                var lat1 = start['lat'];
                var lat2 = end['lat'];
                var lng1 = start['lng'];
                var lng2 = end['lng'];
                var radLat1 = rad(lat1);
                var radLat2 = rad(lat2);
                var a = radLat1 - radLat2;
                var b = rad(lng1) - rad(lng2);
                var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
                        + Math.cos(radLat1) * Math.cos(radLat2)
                        * Math.pow(Math.sin(b / 2), 2)));
                s = s * EARTH_RADIUS;
                s = Math.round(s * 10000) / 10000;
                return s;
            },
            polygon:function(s,f){
                var color = this.initAttr.color;
                var map = this.initAttr.map;
                var sData = s['data'];
                var newObj = null;
                var arr = [],arr1 = [];
                for(var i = 0;i<sData.length;i++){
                    var dataArr = sData[i]['data'];
                    newObj = $.genPolJS.init(dataArr);
                    var centerCircle = newObj['centerCircle'];
                    arr1.push({
                        arr:newObj['circleArrMaker'],
                        info:newObj
                    });
                    var bermudaTriangle = new google.maps.Polygon({
                        paths: newObj['circleArrMaker'],
                        strokeColor: color[i%color.length],
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: color[i%color.length],
                        fillOpacity: 0.35
                    });
                    bermudaTriangle.contentStr = sData[i]['contentStr'];
                    bermudaTriangle.isOpen = false;
                    bermudaTriangle.onClick = sData[i]['onClick'];
                    bermudaTriangle.centerCircle = centerCircle;
                    if(sData[i].contentStr){
                        var infowindow = new google.maps.InfoWindow({
                            content: sData[i].contentStr
                        });
                        bermudaTriangle.infowindow1 = infowindow;
                    }
                    bermudaTriangle.addListener('click',function(e){
                        var latLng = {
                            lat:e.latLng.lat(),
                            lng:e.latLng.lng()
                        }
                        if(this.onClick){
                            this.onClick(newObj['circleArrMaker'],latLng);
                        }
                        if(this.infowindow1){
                            var me = this;
                            this.infowindow1.setPosition(this.centerCircle)
                            this.infowindow1.open(map,me);
                        }
                    });
                    bermudaTriangle.setMap(map);
                    bermudaTriangle.label = sData[i]['text'];
                    bermudaTriangle.color = color[i%color.length];
                    if(s['markerIcon']){
                        var ker = null,marker,markerArr = [];
                        for(var d =0;d<newObj['circleArrMaker'].length;d++){
                            ker = {
                                position:newObj['circleArrMaker'][d],
                                map:map,
                                label:''+d
                            };
                            marker = new google.maps.Marker(ker);
                            marker.setMap(map);
                            markerArr.push(marker);
                        }
                        bermudaTriangle.markerArr = markerArr;
                    }
                    arr.push(bermudaTriangle);
                }
                if(s['legend']){//显示图例
                    $.GMapStyle.polygonLegend(arr,map);
                }
                if(s['zoom']){//缩放比例
                    s['zoom'] = parseInt(s['zoom']);
                    this.globalFun.setZoom(s['zoom']);
                }
                if(s['center']){//中心点
                    this.globalFun.moveTo(s['center']);
                }
                if(f){
                    f(arr1);
                }
                return arr1;
            },
            drawing:function(s,f){
                var map = this.initAttr.map;
                var me = this;
                var set ={drawingControl:false};
                if(s['type'] == 'rect'){//矩形
                    set["drawingMode"] = google.maps.drawing.OverlayType.RECTANGLE;
                }else if(s['type'] == "circle"){//圆形图
                    set["drawingMode"] = google.maps.drawing.OverlayType.CIRCLE;
                }else if(set['type'] == 'area'){//区域图
                    set["drawingMode"] = google.maps.drawing.OverlayType.POLYGON;
                }else if(set['type'] == 'line'){//折现
                    set["drawingMode"] = google.maps.drawing.OverlayType.POLYLINE;
                }
                var drawingManager = new google.maps.drawing.DrawingManager(set);
                drawingManager.setMap(map);
                google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {//绘图完成
                    var outPut = {};//输出的内容
                    outPut['drggable'] = event.overlay.getDraggable();
                    outPut['editable'] = event.overlay.getEditable();
                    outPut['map'] = event.overlay.getMap();
                    if (event.type == google.maps.drawing.OverlayType.CIRCLE) {//圆形
                        outPut['radius'] = event.overlay.getRadius();
                        outPut['center'] = event.overlay.getCenter();
                    } else if (event.type == google.maps.drawing.OverlayType.RECTANGLE) {//矩形
                        getBounds = event.overlay.getBounds();
                        var bounds = {
                            start:{lat:getBounds.f.b,lng:getBounds.b.b},
                            end:{lat:getBounds.f.f,lng:getBounds.b.f}
                        };
                        outPut['bounds'] = bounds;
                    } else if (event.type == google.maps.drawing.OverlayType.POLYGON) {//区域图
                        outPut['drggable'] = event.overlay.getDraggable();
                        outPut['editable'] = event.overlay.getEditable();
                        outPut['paths'] = event.overlay.getPaths();
                        outPut['path'] = event.overlay.getPath();
                    } else if (event.type == google.maps.drawing.OverlayType.POLYLINE) {//折线图
                        outPut['path'] = event.overlay.getPath();
                    }
                    me.GMapFunJar.drawingJar.event(s,event,outPut,drawingManager);
                    drawingManager.setOptions({
                        drawingMode:null
                    });
                });
            },
            getDistance:function(start,end){//计算两点距离
                var EARTH_RADIUS = 6371.39354656; //地球半径
                function rad(d) {
                    return d * Math.PI / 180.0;
                }
                var lat1 = start['lat'];
                var lat2 = end['lat'];
                var lng1 = start['lng'];
                var lng2 = end['lng'];
                var radLat1 = rad(lat1);
                var radLat2 = rad(lat2);
                var a = radLat1 - radLat2;
                var b = rad(lng1) - rad(lng2);
                var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
                        + Math.cos(radLat1) * Math.cos(radLat2)
                        * Math.pow(Math.sin(b / 2), 2)));
                s = s * EARTH_RADIUS;
                s = Math.round(s * 10000) / 10000;
                return s;
            },
            GMapFunJar:{//绘图功能
                drawingJar:{
                    initAttr:{
                        start:null,
                        end:null
                    },
                    event:function(s,event,outPut,drawingManager){
                        console.log(outPut);
                        if(s['onDrawingComplete']){//绘图完成
                            s['onDrawingComplete'](outPut,drawingManager);
                        }
                        if(s['onClick']){//点击
                            google.maps.event.addListener(event.overlay,'click',function(e){
                                s['onClick'](e,outPut,drawingManager,event.overlay);
                            });
                        }
                        if(s['editable']){//编辑
                            event.overlay.setEditable(s['editable']);
                        }
                        if(s['drggable']){//拖放
                            event.overlay.setDraggable(s['editable']);
                            if(s['onDragstart']){
                                google.maps.event.addListener(event.overlay,'dragstart',function(e){
                                    s['onDragstart'](e,outPut,drawingManager,event.overlay);
                                });
                            }
                            if(s['onDrag']){
                                google.maps.event.addListener(event.overlay,'drag',function(e){
                                    s['onDrag'](e,outPut,drawingManager,event.overlay);
                                });
                            }
                            if(s['onDragend']){
                                google.maps.event.addListener(event.overlay,'dragend',function(e){
                                    //console.log({lat:e.latLng.lat(),lng:e.latLng.lng()})
                                    //console.log(e);
                                    ker = {
                                        position:{lat:e.latLng.lat(),lng:e.latLng.lng()},
                                        map:outPut.map
                                    };
                                    marker = new google.maps.Marker(ker);
                                    s['onDragend'](e,outPut,drawingManager,event.overlay);
                                });
                            }
                        }
                        if(event.type == 'rectangle'){
                            google.maps.event.addListener(event.overlay,'bounds_changed',function(e){
                                console.log(e)
                                s['bounds_changed'](outPut,event.overlay);
                            });
                        }
                    }
                }
            }
        },
        genPolJS:{//圆心选取
            initAttr:{
                outPut:{}
            },
            quickSort:function(array) {//快速排序
                var i = 0;
                var j = array.length - 1;
                var Sort = function(i, j) {
                    // 结束条件
                    if (i == j) {
                        return
                    };
                    var key = array[i];
                    var stepi = i; // 记录开始位置
                    var stepj = j; // 记录结束位置
                    while (j > i) {
                        // j <<-------------- 向前查找
                        if (array[j] >= key) {
                            j--;
                        } else {
                            array[i] = array[j]
                            //i++ ------------>>向后查找
                            while (j > ++i) {
                                if (array[i] > key) {
                                    array[j] = array[i];
                                    break;
                                }
                            }
                        }
                    }
                    // 如果第一个取出的 key 是最小的数
                    if (stepi == i) {
                        Sort(++i, stepj);
                        return;
                    }
                    // 最后一个空位留给 key
                    array[i] = key;
                    // 递归
                    Sort(stepi, i);
                    Sort(j, stepj);
                }
                Sort(i, j);
                return array;
            },
            getDistance:function(start,end){//计算两点距离
                var EARTH_RADIUS = 6371.39354656; //地球半径
                function rad(d) {
                    return d * Math.PI / 180.0;
                }
                var lat1 = start['lat'];
                var lat2 = end['lat'];
                var lng1 = start['lng'];
                var lng2 = end['lng'];
                var radLat1 = rad(lat1);
                var radLat2 = rad(lat2);
                var a = radLat1 - radLat2;
                var b = rad(lng1) - rad(lng2);
                var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
                        + Math.cos(radLat1) * Math.cos(radLat2)
                        * Math.pow(Math.sin(b / 2), 2)));
                s = s * EARTH_RADIUS;
                s = Math.round(s * 10000) / 10000;
                return s;
            },
            getAtan2:function(start,end){
                var X = end.lng - start.lng;
                var Y = end.lat - start.lat;
                return Math.atan2(X,Y);
            },
            calcAtanArr:function(arr,me){
                me.initAttr.calcAtanArr = [];
                var reLatLng = {lat:0,lng:0};
                me.initAttr.minDisMaker = null;
                me.initAttr.maxDisMaker = null;
                var distance , minDis , maxDis;
                minDis = maxDis = me.getDistance(reLatLng,arr[0]);
                for(var i = 1;i<arr.length;i++){// 找距离相对原点最远的点和距离最近点   找圆心
                    distance = me.getDistance(reLatLng,arr[i]);
                    arr[i]['reDistance'] = distance;
                    if(distance > maxDis){
                        maxDis = distance;
                        me.initAttr.maxDisMaker = arr[i];
                    }
                    if(distance < minDis){
                        minDis = distance;
                        me.initAttr.minDisMaker = arr[i];
                    }
                }
                me.initAttr['circleR'] = me.getDistance(me.initAttr.minDisMaker,me.initAttr.maxDisMaker);
                me.initAttr['inCircleR'] = (me.initAttr['circleR']/2)*Math.sqrt(3)/2;
                me.initAttr['centerCircle'] = {lat:(me.initAttr.maxDisMaker.lat + me.initAttr.minDisMaker.lat)/2,lng:(me.initAttr.maxDisMaker.lng + me.initAttr.minDisMaker.lng)/2};
                var atan2Arr = [] ;
                for(var i = 0;i<arr.length;i++){
                    arr[i]['centerAtan'] = me.getAtan2(me.initAttr.centerCircle,arr[i]);
                    atan2Arr.push(arr[i]['centerAtan']);
                }
                atan2Arr = me.quickSort(atan2Arr);
                me.initAttr.atan2Arr = atan2Arr;
                me.initAttr.atan2ArrMaker = [];
                for(var i = 0;i<atan2Arr.length;i++){//以圆心为相对原点
                    for(var d = 0;d < arr.length;d++){
                        if(arr[d]['centerAtan'] == atan2Arr[i]){
                            me.initAttr.atan2ArrMaker.push(arr[d]);
                            break;
                        }
                    }
                }
                /* 找内切圆和外切圆之间的点 */
                var distance = null;
                me.initAttr.circleArrMaker = [];
                for(var i = 0;i<me.initAttr.atan2ArrMaker.length;i++){
                    distance = me.getDistance(me.initAttr.centerCircle,me.initAttr.atan2ArrMaker[i]);
                    if(distance > me.initAttr['inCircleR']){
                        me.initAttr.circleArrMaker.push(me.initAttr.atan2ArrMaker[i])
                    }
                }
            },
            init:function(arr){
                var me = this;
                this.calcAtanArr(arr,me);
                console.log(this.initAttr);
                return this.initAttr;
            }
        }
    });
    //经度lng X 、纬度lat Y
})(jQuery);


