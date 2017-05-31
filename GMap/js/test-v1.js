/**
 * Created by YJSON on 2016/12/20.
 */
var s =  {
    center: {lat: 35.86166, lng: 104.195397},
    zoom: 5
};
var set = {
    center:[35,104]
    //zoom:4,

}
var map = $('.allMap').NMap('GMap',set);
var s1 =[{
    center:[34,103],
    title:'位置1',
    onClick:function(){
        console.log(arguments);
    },
    onDrag:function(){

    }
},{
    center:[33,102],
    title:'位置2'
},{
    center:[33,101],
    title:'位置3'
}];
map.marker(s1);
var s2 = [[35.861,104.1953],[34.861,114.1953],[46,104.195378],[46,114.1978]];
map.flightPath(s2);
var s3 = [{center:[35.861,104.1953],r:80,isKm:true},
    {center:[34.861,114.1953],
        r:80000,
        isKm:false,
        onClick:function(){
            console.log(arguments);
        }
    }];
map.circle(s3);
map.centerMarker(function(){
    console.log(arguments);
});
map.getlatLng(function(){
    console.log(arguments);
});

