// 引用缓存数据
var value = localStorage.getItem("key");
var val =JSON.parse(value);
var person_info={};
var relationship='';

// 点击显示与受检者关系
$('#sel').change(function(){
	relationship = $("#sel").val();
	if(relationship!='与受检人关系'){
		var relation = '与受检人关系';
		person_info[relation] = relationship;
	}else{
		relationship = '';
	}
});

// 点击显示性别
$('.male').click(function(){
if($('.male .outcircle').hasClass('color')){
	$('.male .outcircle').addClass('color')
}else{
	$('.male .outcircle').addClass('color')
}
});
$('.famale').click(function(){
if($('.famale .outcircle').hasClass('color')){
	$('.famale .outcircle').addClass('color')
}else{
	$('.famale .outcircle').addClass('color')
}
});

$('.famale').click(function(){
if($('.male .outcircle').hasClass('color')){
	$('.male .outcircle').removeClass('color');
	$('.famale .outcircle').addClass('color');
}
});
$('.male').click(function(){
if($('.famale .outcircle').hasClass('color')){
	$('.famale .outcircle').removeClass('color');
	$('.male .outcircle').addClass('color');
}
});

// 验证各个选项
/***********失去焦点判断**********/
$('input').blur(function(){
    if($(this).is('#userName')){         //姓名验证
        var na=/^[\u4E00-\u9FA5]{2,4}$/;
        if($('#userName').val()!=""){
            if(!(na.test($('#userName').val()))){
               $('#userName').val('').attr('placeholder','请输入2-4字的中文');
               return false;
            }
        }
    }

    if($(this).is('#userAge')){         // 年龄验证
        var exp_age= /^([0-9]|[1-9][0-9]|(1[01][0-9]|120))$/;
        if($('#userAge').val()!=''){
            if(!(exp_age.test($('#userAge').val()))){
                $('#userAge').val('').attr('placeholder','请输入0-120之间的整数');
                return false;
            }
        }
    }

    if($(this).is('#userWeight')){     // 体重验证
       if($('#userWeight').val()!=""){
           if($('#userWeight').val()>250 || $('#userWeight').val()<0 ){
               $('#userWeight').val('').attr('placeholder','请输入0~250之间的数字');
               return false;
           }
       }
    }

    if($(this).is('#userHeight')){      // 身高验证
       if($('#userHeight').val()!=""){
           if($('#userHeight').val()>236 || $('#userHeight').val()<10 ){
               $('#userHeight').val('').attr('placeholder','请输入10~236之间的数字');
               return false;
           }
       }
    }

    if($(this).is('#cityChoice')){     // 常住地验证
    	if($('#cityChoice').val()===""){
          $('#cityChoice').attr('placeholder','请选择您的常住地');
      }
    }

});

// 点击按钮实现提交
$('.submit_up').click(function(e){
	e.preventDefault();
	// 获取数据	
	var key= '基本信息';
	var name = '姓名';
	var gender = '性别';
	var age = '年龄';
	var weight = '体重';
	var height = '身高';
	var place = '常住地';
	val[key] = person_info;
	var uname = $('#userName').val();
  	var uage = $('#userAge').val();
  	var uweight = $('#userWeight').val();
  	var uheight = $('#userHeight').val();
  	var uplace = $('#cityChoice').val();
  	var ugender;
  	if($('.male .outcircle').hasClass('color')){
  		ugender='男';
  	}else if($('.famale .outcircle').hasClass('color')){
  		ugender='女';
  	}
    person_info[name] = uname;
    person_info[gender] = ugender;
    person_info[age] = uage;
    person_info[weight] = uweight;
    person_info[height] = uheight;
    person_info[place] = uplace;


    // 验证码倒计时
      var wait = 60;
      var isCheck;
      function countDown(obj) {
        isCheck = false;
        if(isCheck===false){
          if(wait === 0){
            obj.removeAttribute('disabled');
            obj.value = '获取验证码';
            wait = 60;
            isCheck=false;
          }else{
            obj.setAttribute('disabled',true);
            obj.value = `${wait}s后重新发送`;
            wait--;
            setTimeout(function(){
              countDown(obj);
            },1000);
            isCheck = true;
          }
        } 
      }

    
    // 满足以上条件实现数据存储，页面的跳转
  	if(uname!="" && relationship!=""  && uage!="" && uweight!="" && uheight!="" && uplace!="" && $('.person .outcircle').hasClass('color')){
      $(".phone").animate({
        height:'toggle',
        opacity:1
      });

      $('.code').click(function(e){
        e.preventDefault();
        if($('#phone').val()==""){
          $('.right-number').show();
        }
      });


      //聚焦提示
      $('#phone').focus(function(){
        $('.right-number').hide();
      });

      $('#code').focus(function(){
        $('.right-code').hide();
      });
      
  	}else{
  		$(".mask").animate({
        height:'toggle',
        opacity:1
      });
  	}
});

      /*验证手机*/
      var Data = '';
      var btn = $("#j_getVerifyCode");
      timerButton.verify("#j_getVerifyCode",{
        time: 60, // 倒计时时间
        event: "click", // 触发事件的方式
        condition: function(){
          var phoneReg = /^(\+86|0086)?\s*1[34578]\d{9}$/,flag = phoneReg.test($('#phone').val());
          if(!flag){
            $('.right-number').show();
            return false;
          }else{

               var phone = $('#phone').val();
               // console.log(phone);
              $('.right-code').hide();
              var data = {
                  phone:phone
              };
              // console.log(data);
              $.ajax({
                type: 'POST',
                url: '/api/v1/account/authcode/phone/',
                data:JSON.stringify(data),
                headers: {
                      'Content-Type': 'application/json',
                        'appId': 'AP339457443459235841'
                },
                success: function (data) {
                    Data = data;
                    // console.log(Data)
                },
                  error: function(){
                    console.log('获取参数错误')
                  }
              });
            return true;
          }
        },
        unableClass: "unabled", // 按钮不能使用时的class
        runningText: "s后重新获取", // 计时正在进行中的按钮显示的文字
        timeUpText: "重新获取", // 时间到了按钮显示的文字
        progress: function(time){ // 计时正在进行中的回调
          btn.val(time + "s秒后重新获取");
        },
        timeUp: function(time){ // 计时结束时进行的回调
          btn.val('重新获取');
        }
      });
      /*验证手机*/


// 点击弹框关闭按钮
$('.close').click(function(){
  	$(".mask").animate({
    height:'toggle',
    opacity:0
  });
});




// 点击登录按钮

$('.sign-in').click(function(e){
    e.preventDefault();
    if($('#code').val()==""){
        $('.right-code').show();
        $('.right-number').show();
    }else{
        $('#right-code').hide();
        var phone = $('#phone').val();
        var authcode = $('#code').val();
        var auth_obj ={
            phone: phone,
            authcode: authcode,
            val: val
        };
        // console.log(authcode);
       $.ajax({
            type: 'POST',
            url: '/api/v1/account/login/phone/',
            data:JSON.stringify(auth_obj),
            async:true,
            // dataType : "jsonp",//jsonp数据类型
            // jsonp: "jsonpCallback",//服务端用于接收callback调用的function名的参数
            headers: {
                  'Content-Type': 'application/json',
                    'appId': 'AP339457443459235841'
            },
            success: function (data) {
                if(data === '验证码有误'){
                    $('.right-code').show();
                }else{
                    $('.cartoon').show();
                    var Data = data.accessToken;
                    var s = {
                        'accessToken':Data
                    };
                    if(Data) {
                        $.ajax({
                            type: 'POST',
                            url: '/api/v1/sample/list/',
                            async: true,
                            data: JSON.stringify(s),
                            headers: {
                                'Content-Type': 'application/json',
                                'appId': 'AP339457443459235841'
                            },
                            success: function (result) {
                                //存用户的条形码和姓名过去
                                var code = JSON.stringify(result);
                                //存入
                                localStorage.code = code;
                                console.log(localStorage.code)
                            }
                        });

                        // 调用模型
                         $.ajax({
                            type: 'POST',
                            url: '/api/v1/algorithm/lung-cancer-2C/',
                            async:true,
                            data: JSON.stringify(val),
                            headers: {
                                'Content-Type': 'application/json',
                                'appId': 'AP339457443459235841'
                            },
                            success: function (result) {
                                //存模型返回数据
                                var str = JSON.stringify(result);
                                console.log(str);
                                //存入
                                localStorage.obj = str;
                            }
                        });

                        //存AccessToken到下一页
                        localStorage.token = Data;
                        console.log(Data);
                        window.location.href = '/canvas/';
                    }
                }
            },
            error: function(){
                alert('获取参数错误');
            }
       });
    }
});


// 点击不需要跳过按钮，实现页面跳转
$('.refuse').click(function(e){
  e.preventDefault();
  $('.cartoon').show();
     $.ajax({
        type: 'POST',
        url: '/api/v1/algorithm/lung-cancer-2C/',
        async: true,
        data: JSON.stringify(val),
        headers: {
              'Content-Type': 'application/json',
                'appId': 'AP339457443459235841'
        },
        success: function(result){
            //存数据去下一页
                 var str = JSON.stringify(result);
                 var vak = {val};
                 var vaa = JSON.stringify(vak);
                 // console.log(result);
                 // console.log(vaa);
                //存入
                localStorage.obj = str;
                localStorage.token = '';//没有登录时，token为空
                localStorage.val = vaa;//存入调查问卷信息
            // console.log(localStorage.val);
                window.location.href = '/canvas/';
        }
    });
});

