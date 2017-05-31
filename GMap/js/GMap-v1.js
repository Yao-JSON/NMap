/**
 * Created by YJSON on 2017/1/9/009.
 */
(function($){
    $.extend({
        GMapStyle:{
            makerLegend:function(arr,map){//标点图例
                var makerLen = $('<ul class="NMap-legend NMap-makerLegend"></ul>');//图例容器
                for(var i =0;i<arr.length;i++){
                    var li;
                    li = '<li data-mankerindex="'+i+'">' +
                        '<img src="'+arr[i][0]['icon']+'" />' +
                        '<span>' +
                        arr[i][0]['text']
                    '</span>' +
                    '</li>';
                    makerLen.append(li);
                };
                $('body').append(makerLen);
                var makerLegend = $('.NMap-makerLegend')[0];
                map.controls[google.maps.ControlPosition.TOP_RIGHT].push(makerLegend);
                $('.NMap-makerLegend').on('click','li',function(){
                    var mankerIndex = $(this).data('mankerindex');
                    if(!mankerIndex && mankerIndex != 0){
                        return;
                    }
                    var makerArr = arr[mankerIndex];
                    if($(this).hasClass('hover')){
                        $(this).removeClass('hover');
                        var maker = makerArr[0];
                        $(this).find('img').attr('src',maker.icon);
                        for(var c = 0;c<makerArr.length;c++){
                            makerArr[c].setMap(map);
                            if(makerArr[c]['overlay']){
                                $(makerArr[c]['overlay']['_div1']).show();
                            }
                        }
                    }else{
                        $(this).addClass('hover');
                        var img = $(this).find('img');
                        var src = img.attr('src');
                        src = src.slice(0,-5)+'0'+'.png';
                        img.attr('src',src);
                        for(var i=0;i<makerArr.length;i++){
                            makerArr[i].setMap(null);
                            if(makerArr[i]['overlay']){
                                $(makerArr[i]['overlay']['_div1']).hide();
                            }
                        }
                    }
                });
            },
            lineLegend:function(arr,map){//连线图例
                var line= $('<ul class="NMap-legend NMap-lineLegend"></ul>');//图例容器
                for(var i =0; i <arr.length;i++){
                    var li = "<li data-lineindex='"+i+"'>" +
                        "<img src='"+arr[i]['icon']+"'/>" +
                        "<span>" +
                        arr[i]['text']+
                        "</span>" +
                        "</li>";
                    line.append(li);
                }
                $('body').append(line);
                var lineLegend = $('.NMap-lineLegend')[0];
                map.controls[google.maps.ControlPosition.TOP_RIGHT].push(lineLegend);
                $('.NMap-lineLegend').on('click','li',function(){
                    var lineIndex = $(this).data('lineindex');
                    var img = $(this).find('img');
                    if(!lineIndex && lineIndex!=0){
                        return;
                    }
                    if($(this).hasClass('hover')){
                        $(this).removeClass('hover');
                        arr[lineIndex].setMap(map);
                        img.attr('src',arr[lineIndex].icon);
                    }else{
                        $(this).addClass('hover');
                        var src = img.attr('src');
                        src = src.slice(0,-5)+'0'+".png";
                        img.attr('src',src);
                        arr[lineIndex].setMap(null);
                    }
                });
            },
            rectLegend:function(arr,map){
                var rect = $('<ul class="NMap-legend NMap-rectLegend"></ul>');//图例容器
                for(var i =0;i<arr.length;i++){
                    var li = "<li  data-rectindex='"+i+"'>" +
                        "<span class='rect' style='background-color: "+arr[i]['color']+"'></span>" +
                        "<span>" +
                        arr[i]['text']
                    "</span>" +
                    "</li>";
                    rect.append(li);
                }
                $('body').append(rect);
                var rectLine = $('.NMap-rectLegend')[0];
                map.controls[google.maps.ControlPosition.TOP_RIGHT].push(rectLine);
                $('.NMap-rectLegend').on('click','li',function(){
                    var rectIndex = $(this).data('rectindex');
                    if($(this).hasClass('hover')){
                        $(this).removeClass('hover');
                        arr[rectIndex].setMap(map);
                    }else{
                        $(this).addClass('hover');
                        arr[rectIndex].setMap(null);
                    }
                });
            },
            circleLegend:function(arr,map){
                var circle= $('<ul class="NMap-legend NMap-circleLegend"></ul>');//图例容器
                for(var i =0; i <arr.length;i++){
                    var li = "<li data-circleindex='"+i+"'>" +
                        "<span class='circle' style='background-color: "+arr[i]['color']+"'></span>" +
                        "<span>" +
                        arr[i]['text']+
                        "</span>" +
                        "</li>";
                    circle.append(li);
                }
                $('body').append(circle);
                var circleLegend = $('.NMap-circleLegend')[0];
                map.controls[google.maps.ControlPosition.TOP_RIGHT].push(circleLegend);
                $('.NMap-circleLegend').on('click','li',function(){
                    var circleIndex = $(this).data('circleindex');
                    if($(this).hasClass('hover')){
                        $(this).removeClass('hover');
                        arr[circleIndex].setMap(map);
                    }else{
                        $(this).addClass('hover');
                        arr[circleIndex].setMap(null);
                    }
                });
            },
            overlayLabelLegend:function(arr,map){
                console.log(arr);
                var overlayLabel= $('<ul class="NMap-legend NMap-overlayLabel"></ul>');//图例容器
                var li;
                for(var i = 0;i<arr.length;i++){
                    li = "<li data-labelindex='"+i+"'>" +
                        "<span class='label' style='background-color: "+arr[i]['set']['color']+"'></span>" +
                        "<span>" +
                        arr[i]['set']['label']+
                        "</span>" +
                        "</li>";
                    overlayLabel.append(li);
                }
                $('body').append(overlayLabel);
                var overlayLegend = $('.NMap-overlayLabel')[0];
                map.controls[google.maps.ControlPosition.TOP_RIGHT].push(overlayLegend);
                $('.NMap-overlayLabel').on('click','li',function(){
                    var labelindex = $(this).data('labelindex');

                    if($(this).hasClass('hover')){
                        $(this).removeClass('hover');

                        arr[labelindex].forEach(function(e){
                            console.log(e);
                            e._div1.style.display = "block";
                        });
                    }else{
                        $(this).addClass('hover');
                        arr[labelindex].forEach(function(e){
                            e._div1.style.display = "none";
                        });
                    }
                });
            }
        },
        GMap:{// 谷歌地图封装
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
                streetViewControl:false,
                overviewMapControl:true,
                overviewMapControlOptions:{
                    position:google.maps.ControlPosition.BOTTOM_RIGHT
                },
                ZoomControlStyle: {
                    SMALL: google.maps.ZoomControlStyle.SMALL,
                    LARGE: google.maps.ZoomControlStyle.LARGE,
                    DEFUALT: google.maps.ZoomControlStyle.DEFUALT
                }
            },
            superConfig:function(){

            },
            initConfig:function(s,me){
                me.set['center'] = s['center']?{'lat':s['center'][0],'lng':s['center'][1]}:{'lat':35.86166,'lng':104.195397};
                me.set['zoom'] = s['zoom']?s['zoom']:5;
            },
            initMap:function () {
                var div = "<div>" +
                    "" +
                    "</div>"
            },
            mouseEvent:function(s,map,me){

            },
            init:function(c,s){
                var me = this;
                s = s?s:{};
                this.initConfig(s,me);
                var map = new google.maps.Map(c,me.set);
                me.initAttr.map = map;
                $.GMapFun.initAttr.map = map;
                this.initMap(map);
                this.superConfig(s,map,me);
                this.mouseEvent(s,map,me);
                return map;
            }
        },
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
                        for(var k in set){
                            this['_'+k] = set[k];
                        }
                        this._map = map;
                    }
                    ComplexCustomOverlay.prototype = new google.maps.OverlayView();
                    ComplexCustomOverlay.prototype.draw = function(){
                        var div1 = this._div1;
                        if(!div1){
                            div1 = this._div1 = document.createElement("div");
                            div1.style.position = "absolute";
                            div1.className="NMap-labelOverlay";
                            div1.style.backgroundColor = this._color;
                            div1._onClick = this._onClick;
                            var div2 = this._div2 = document.createElement("div");
                            div1.appendChild(div2);
                            div2.appendChild(document.createTextNode(this._overlay));
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
                        overlay = new ComplexCustomOverlay(set);
                        overlay.setMap(map);
                        overArr.set = set;
                        if(o['data'][c]['onLoad']){
                            o['data'][c]['onLoad'](set);
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
            polygon:function(s,f){//绘制多边形
                var color = this.initAttr.color;
                var map = this.initAttr.map;
                var letter = this.initAttr.label;
                var sData = s['data'];
                if(s['shape'] == "polygon"){//绘制多变形
                    var latLngArr = [],arrData;
                    var triangleCoords = [];//面坐标
                    for(var i = 0;i<sData.length;i++){
                        arrData =sData[i]["data"] ;
                        latLngArr.push(arrData);
                    }
                    var latArr,lngArr,latData=[],lngData=[];
                    latLngArr.forEach(function(e){
                        latArr = [];lngArr = [];
                        e.forEach(function(e){
                            latArr.push(e['lat']);
                            lngArr.push(e['lng']);
                            latArr.sort();
                            lngArr.sort();
                        });
                        latData.push(latArr);
                        lngData.push(lngArr);//经度
                    });
                    console.log(latData);
                    console.log(lngData);
                    for(var i = 0;i<lngData.length;i++){

                    }
                }

            },
            drawingCircle:function(){
                var map = this.initAttr.map;

            }
        }
    });
})(jQuery);
$.fn.GMapV1 = function(set){
    var $com = this[0];
    $.GMap.init($com,set);
}


