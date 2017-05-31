/**
 * Created by Administrator on 2017/1/4/004.
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
            },
            polygonLegend:function(arr,map){
                console.log(arr);
                var overlayLabel= $('<ul class="NMap-legend NMap-polygonLegend"></ul>');//图例容器
                var li;
                for(var i = 0;i<arr.length;i++){
                    li = "<li data-labelindex='"+i+"'>" +
                        "<span class='label' style='background-color: "+arr[i]['color']+"'></span>" +
                        "<span>" +
                        arr[i]['label']+
                        "</span>" +
                        "</li>";
                    overlayLabel.append(li);
                }
                $('body').append(overlayLabel);
                var polygonLegend = $('.NMap-polygonLegend')[0];
                map.controls[google.maps.ControlPosition.TOP_RIGHT].push(polygonLegend);
                $('.NMap-polygonLegend').on('click','li',function(){
                    var labelindex = $(this).data('labelindex');
                    if($(this).hasClass('hover')){
                        $(this).removeClass('hover');
                        console.log(arr[labelindex]);
                        arr[labelindex].setMap(map);
                        if(arr[labelindex]['markerArr']){
                            arr[labelindex]['markerArr'].forEach(function(e){
                                e.setMap(map);
                            })
                        }
                    }else{
                        $(this).addClass('hover');
                        arr[labelindex].setMap(null);
                        if(arr[labelindex]['markerArr']){
                            arr[labelindex]['markerArr'].forEach(function(e){
                                e.setMap(null);
                            })
                        }
                    }
                });
            }
        }
    });
})(jQuery);

