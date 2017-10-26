
$(document).ready(
    function() {
        var nowpage = 0;
        //给最大的盒子增加事件监听
        $(".container").swipe(
            {
                swipe:function(event, direction, distance, duration, fingerCount) {
                     if(direction == "up"){
                        nowpage = nowpage + 1;
                     }else if(direction == "down"){
                        nowpage = nowpage - 1;
                     }
                     if(nowpage > 1){
                        nowpage = 1;
                     }
                     if(nowpage < 0){
                        nowpage = 0;
                     }
                    $(".container").animate({"top":nowpage * -100 + "%"},400);
                    $(".page").eq(nowpage).addClass("cur").siblings().removeClass("cur");
                }
            }
        );
    }
);

// document.addEventListener('scroll', function () {
//     var div = document.getElementById('div')
//     if (document.body.scrollTop === div.offsetTop) {
//        console.log('hello')
//     }
// })


// 读取本地文件计算总人数
// var obj = {"c1":1,"c2":2};
// var arr = Object.keys(obj);
// var len = arr.length;
// console.log(len);//结果为2


var arr = [];
$.getJSON("./static/config/rank_1023.json", function (data){
 　 var arr = Object.keys(data);
    var number = arr.length;
    console.log(number);
    // 人数统计
    $(".value").numberRock({
        speed:20,
        count:number
    });
});



 // 给按钮绑定跳转事件
$('.button-wrapper').click(function(){
	window.location.href="/questionnaire/";
});
