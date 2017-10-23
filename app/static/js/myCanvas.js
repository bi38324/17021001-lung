<script>
 // 判断是移动还是pc
	function IsPC() {
		var userAgentInfo = navigator.userAgent,
			Agents = ["Android", "iPhone",
				"SymbianOS", "Windows Phone",
				"iPad", "iPod"],
			flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	}
	//PC端和移动端方法倍数的判断
	var scale = 1;
	if (!IsPC()) {
		scale = 4;
	}
	var vm = new Vue({
		el: '#content',
		data: {
			data: '',
			isA: false,
			results: '',//接收请求的数据
			check_information: '',
			image: '',
			important: '',
			number: '',//用户得分
			showNum: [],//存储每个项目的级别
			unonloading: false,//true：没有登录  false:登录
			user: false,//true:老用户 false:新用户
			reportDatas: [
				{ name: "谢霆锋", category: "编码", code: "1222222222" },
				{ name: "古天乐", category: "编码", code: "1222233222" },
				{ name: "黄晓明", category: "编码", code: "1222233322" },
				{ name: "谢霆锋", category: "编码", code: "1222222222" },
				{ name: "古天乐", category: "编码", code: "1222233222" },
				{ name: "黄晓明", category: "编码", code: "1222233322" }
			],
			candata: [{
				name: "吸烟影响指数"
			}, {
				name: "BMl影响指数"
			}, {
				name: "职业影响指数"
			}, {
				name: "运动影响指数"
			}, {
				name: "PM2.5影响指数"
			}, {
				name: "非健康饮食影响指数"
			}, {
				name: "健康饮食影响指数"
			}],
			step: [{ value: 0, beforeMove: 0, afterMove: 0, symbol: 0 },
			{ value: 0, beforeMove: 0, afterMove: 0, symbol: 0 },
			{ value: 0, beforeMove: 0, afterMove: 0, symbol: 0 },
			{ value: 0, beforeMove: 0, afterMove: 0, symbol: 0 },
			{ value: 0, beforeMove: 0, afterMove: 0, symbol: 0 },
			{ value: 0, beforeMove: 0, afterMove: 0, symbol: 0 },
			{ value: 0, beforeMove: 0, afterMove: 0, symbol: 0 }
			],        //初始化每个滚轮步长值
			categoryNames: [
				{
					name: "吸烟",
					num: 0

				}, {
					name: "BMI",
					num: 0
				},
				{
					name: "职业",
					num: 0
				},
				{
					name: "运动",
					num: 0
				},
				{
					name: "PM2.5",
					num: 0
				},
				{
					name: "非健康饮食",
					num: 0
				},
				{
					name: "健康饮食",
					num: 0
				}]
		},
		mounted: function () {
			this.preview();
		},
		updated: function () {
			this.drawCircle();//数据更新后调用
		},
		methods: {
			preview: function () {
				// console.log(localStorage.obj);
				this.results = JSON.parse(localStorage.obj;);
				this.important = this.results.important;this.results.image;
				this.image =  	this.data = this.results.healthy;//健康建议
				this.check_information = this.results.check_information;
				this.number = this.check_information.zhiShu;//获取用户得分
				console.log("打印结果");
				console.log(this.important);
				console.log(this.image);
				console.log(this.check_information);
				console.log(this.number);
				// this.$http.get('./data/image.json').then(function (response) {
				// 	this.results = response.body; //接收请求的数据
				// 	this.important = this.results.important;this.results.image;
				// 	this.image =  	this.data = this.results.healthy;//健康建议
				// 	this.check_information = this.results.check_information;
				// 	this.number = this.check_information.zhiShu;//获取用户得分
				// });
			},
			selectp(event) {
				event.currentTarget.classList.toggle("new_downlist")
				event.currentTarget.children[0].children[0].classList.toggle("square_rotate")
			},
			//风险曲线部分代码
			move: function (index) {
				var that = this;//变量替换
				var btn = that.$refs['btn' + index][0];//获取滚轮;
				var grade = that.$refs['grade' + index][0];//获取项目等级dom;
				var bg = that.$refs['bg' + index][0];//获取进度条dom;
				var bar = that.$refs['bar' + index][0];//获取进度条容器dom;
				var btnWidth = btn.offsetWidth;//滚轮的宽度
				var barWidth = bar.offsetWidth;//包裹进度条的盒子的宽度
				var max = barWidth - btnWidth;//滑块滑动的最大距离
				if (that.step[index].symbol == 0) {
					that.step[index].beforeMove = event.changedTouches[0].pageX;
					that.step[index].symbol = 1;//只在第一次加载时获取包裹进度条的盒子的坐标
				}
				bar.ontouchmove = function (event) {
					that.step[index].afterMove = event.changedTouches[0].pageX;//获取滑动时的坐标
					that.step[index].value = that.step[index].afterMove - that.step[index].beforeMove;//滑动前后坐标差
					if (that.step[index].value <= btnWidth) {
						that.step[index].value = 0;//坐标差小于滑块的宽度，不移动
					}
					else if (that.step[index].value >= max) {
						that.step[index].value = max;
					}
					else {
						//不做任何处理
					}
					btn.style.left = that.step[index].value + 'px';
					bg.style.width = that.step[index].value + 'px';
					that.showNum[index] = Math.round(((that.step[index].value) / barWidth) * 5);
					that.categoryNames[index].num = that.showNum[index];
				}
				//手指移开,停止移动
				bar.ontouchend = function (event) {
					bar.ontouchmove = null;
				}
			},
			//canvas画图
			drawCircle: function () {
				function inte(percent) {
					var canvas_1 = document.querySelector('#canvas_1');
					var canvas_2 = document.querySelector('#canvas_2');
					var ctx_1 = canvas_1.getContext('2d');
					var ctx_2 = canvas_2.getContext('2d');
					//画底部的灰色圆环
					ctx_1.beginPath();
					canvas_1.width = canvas_1.width * scale;
					canvas_1.height = canvas_1.height * scale;
					ctx_1.lineWidth = 10 * scale;
					ctx_1.arc(canvas_1.width / 2, canvas_1.height / 2, canvas_1.width / 2 - ctx_1.lineWidth / 2, 0, Math.PI * 2, false);
					ctx_1.strokeStyle = "#EEE";
					ctx_1.closePath();
					ctx_1.stroke();
					if (percent < 0 || percent > 100) {
						throw new Error('percent must be between 0 and 100');
						return
					}
					var angle = 0;
					var timer;
					canvas_2.width = canvas_2.width * scale;
					canvas_2.height = canvas_2.height * scale;
					(function draw() {
						timer = setTimeout(draw, 10);
						// 在给顶的矩形内清除制定的像素
						ctx_2.clearRect(0, 0, canvas_2.width, canvas_2.height)
						//百分比圆环
						ctx_2.beginPath();
						ctx_2.lineCap = "round";
						ctx_2.lineWidth = 10 * scale;
						ctx_2.arc(canvas_2.width / 2, canvas_2.height / 2, canvas_2.width / 2 - ctx_2.lineWidth / 2, 0, angle * Math.PI / 180, false);
						angle++;
						var percentAge = parseInt((angle / 360) * 100)
						if (angle > (percent / 100 * 360)) {
							percentAge = percent
							clearTimeout(timer);
						};
						ctx_2.strokeStyle = "#3FE2EB";
						ctx_2.stroke();
						ctx_2.closePath();
						ctx_2.save();
						ctx_2.beginPath();
						ctx_2.rotate(90 * Math.PI / 180)
						ctx_2.font = ' 180px Ruler';
						ctx_2.fillStyle = '#3FE2EA';
						var text = percentAge;
						ctx_2.fillText(text, 220, -300);
						ctx_2.closePath();
						ctx_2.restore();
					})()
				}
				// console.log(this.number);
				window.onload = inte(this.number);
			},
			jieShi: function () {
				layer.open({
					type: 1,
					title: false,
					skin: 'layui-layer-rim', //加上边框
					area: ['330px', '560px'], //宽高
					content: '<div style="color:#25384c ;font-size:14px;text-align:left; letter-spacing:2px;margin:0 auto; padding:15px 10px 10px 15px;line-height:22px;border-bottom 1px solid #3fc5e5;"><div><b>风险模型包括8个生活习惯以及环境因素位点：</b></div><div><b>1.吸烟指数：</b>吸烟指数=每日吸烟根数*总吸烟年数，分为6档，0档为0，5档为401+，贡献率30% </div><div font-size:14px ><b>2.BMI指数：</b>分为6档，0档为<18.5，5档为40+，贡献率5% </div><div><b>3.职业影响：</b>分为6档，0档为工作环境无污染，5档为毒气工作环境，贡献率10%</div><div><b>4.运动：</b>分为6档，0档为每日运动0分钟，5档为160分钟+，贡献率5%</div><div><b>5.PM2.5指数：</b>分为6档，0档为PM2.5指数0，5档为2500+，贡献率10%</div><div><b>6.健康饮食：</b>分为6档，0档为从不摄取此类食物，5档为大量摄取，贡献率5%</div><div><b>7.非健康饮食：</b>分为6档，0档为从不摄取此类食物，5档为大量摄取，贡献率5%</div><div><b>8.遗传病史：</b>分为2档，0档为无家族遗传史，5档为有家族遗传史，贡献率15% 。此外，基因贡献率为15% 。</div><div><b></b>健康风险曲线模型目前仅涵盖20-80岁的风险变化，因为20岁以下风险较小，80岁以上风险也趋于稳定。参考文献：Cancer Statistics in China, 2015。</div></div>'
				});
			},
			//改变健康曲线
			changeResult: function () {
				this.$http.post(
					'',//提交的地址
					{
						categoryNames: "111"
					}, {
						'headers': {
							'Content-Type': 'x-www-form-urlencoded'
						}
					}).then(function () {
						console.log("请求成功");
					}, function () {
						console.log("请求失败");
					});

			},
			// 新用户弹窗
			new_Information: function () {
				layer.open({
					title: '提示',
					type: 1,
					area: ['295px', '150px'], //此处设置宽高
					skin: 'demo-class', //样式类名
					closeBtn: 0, //不显示关闭按钮
					shade: [0.8, '#a0a0a0'],
					btn: '知道了',
					btnAlign: 'c',
					shadeClose: false,
					content: '<div style="color:#25384c ;font-size:14px;text-align:left; letter-spacing:2px;margin:0 auto; padding:15px 10px 10px 15px;line-height:22px;border-bottom 1px solid #3fc5e5;"><div style="text-align:center"></div><div style="color:#666666;text-align:center;font-size:16px">对不起检测不到你的基因数据</div></div>'

				});
			},
		}
	});

	/*********解决滑动侧边栏，底部页面跟随一起滑动********/
	var $body = $('body');
	var scrollTop;
	function lockBody() {
		scrollTop = $body.scrollTop();//body设置为fixed之后会飘到顶部，所以要动态计算当前用户所在高度
		$body.css({
			'overflow': 'hidden',
			'position': 'fixed',
			'top': scrollTop * -1
		});
	}
	function unLockBody() {
		$body.css({
			'overflow': 'auto',
			'position': 'static'
		});
		// 恢复原滚动位置
		window.scrollTo(0, scrollTop);
	}
	//老用户弹窗
	var scrollTop;
	function old_Information() {
		layer.open({
			type: 1,
			title: '选择你要关联的报告',
			content: $('#report'),
			area: '350px',//width：350px
			btn: '确定',
			btnAlign: 'c',
			scrollbar: false,
			success: function () {
				scrollTop = document.scrollingElement.scrollTop;
				// lockBody();
				unLockBody();
			},
			cancel: function () {
				unLockBody();
			},
		});
	}
</script>