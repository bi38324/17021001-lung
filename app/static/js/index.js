$(function(){
	//点文字可选中
	$(".list-wrapper").selectRadio();
	//复选框点文字可以选中
	$(".list-wrapper").selectCheck();

	// 更改跳转属性
	$('.list-wrapper li').click(function(){
		$(this).parent(".list-wrapper").parent(".inner-wrapper").attr("date-title",1);
		$(this).parent(".list-wrapper").parent(".last").attr("date-title", 0);
	});

	// 判断多项选择
	$(".more-sel-lung .list-wrapper li").click(function(){
		if($(".more-sel-lung .last_lung_item").hasClass('check_span--checked')){
			$('.more-sel-lung .check_span:not(".last_lung_item")').removeClass('check_span--checked');
		}
	});

	$(".more-sel-work .list-wrapper li").click(function(){
		if($(".more-sel-work .last_work_item").hasClass('check_span--checked')){
			$('.more-sel-work .check_span:not(".last_work_item")').removeClass('check_span--checked');
		}
	});

	// 点击按钮
	let selectObj = {};
    let key ;
    let key1;
    let key2;
    let value;
    let arr1 = [];
    let arr2 = [];
    $(".button-wrapper").click(function(e){
    	e.preventDefault();
    	if($(".list-wrapper li span").hasClass("radio_span--checked")|| $(".list-wrapper li span").hasClass("check_span--checked")){
    		$(".select-wrapper").children('.inner-wrapper').each(function(index,element){
    			key = $(this).children('h3').text();// 获取标题的名字

    			// 更换题目
    			if($(this).attr("date-title")==1 && $(this).attr("date-last")==0){
    				value = $(this).children(".list-wrapper").children().children('.radio_span--checked').next().text();
        			selectObj[key] = value;
    				
    				// 倒数第二题（多选）
    				let arr1 =[];
					$(this).children('.list-wrapper').children().children('.check_span--checked').each(function(){
						let item1 =$(this).next().text(); // 肺部疾病选项
						arr1.push(item1);
						key1 = '肺部疾病史';
						selectObj[key1] = arr1;
					});
    										
    				$(this).hide().next().show();
    			}


    			// 判断最后一题（多选）
				if($(this).attr("date-title")==0&&$(this).attr("date-last")==1){
					$(this).children('.list-wrapper').children().children('.check_span--checked').each(function(){
    					let item2 = $(this).next().text(); // 职业接触史的选项
    					arr2.push(item2);
    					key2 = '职业接触史';
    					selectObj[key2] = arr2;
    					let obj = JSON.stringify(selectObj);
    					sessionStorage.setItem('key',obj);
    					window.location.href="/info/";
    				});
				}		
        	});
        }
    });
}); 