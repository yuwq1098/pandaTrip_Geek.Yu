// 首页轮播图
var mySwiper = new Swiper('#index-carousel', {
	autoplay: 5000,     //可选选项，自动滑动
	autoplayDisableOnInteraction : false,  //用户操作后，不禁止自动滑动
	effect : 'fade',
	touchAngle : 20,
	speed:600,         //速度
	loop : true,     //环路
	mousewheelControl : true,            //滚轮触发
	paginationClickable: true,           //分页点击
	pagination : '.swiper-pagination',   //分页器
    // 关闭淡出，保留淡入
    fade: {
	  crossFade: false,
	},
    // 如果滑动停了，那么重新开启它
	onAutoplayStop: function(swiper){
	    mySwiper.startAutoplay();
	},
});

// 初始化加载插件
$.initJQPlugin().joinUs();
// 功能导航区域切换调用
$("#nav-func").navFunc();
