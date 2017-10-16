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

// 人数统计
$(".value").numberRock({
    speed:20,
    count:305178
})

// 给按钮绑定跳转事件
$('.button-wrapper').click(function(){
	window.location.href="/questionnaire/";
});