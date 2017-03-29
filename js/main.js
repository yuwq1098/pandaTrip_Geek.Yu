/*
 * 熊猫旅行的主要js
 * 作者Geek.Yu 在2017-03-27 10:43:00 创建了它，
 * 若您对此js存在疑问，请联系作者Geek.Yu  qq:1098654043
 */

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


// 获得中心内容的滚动条高度
var boxItems_scrollTop = $("#box-items").offset().top;
var boxItems_height = $("#box-items").height();
// 侧悬浮导航
$("#suspensionNav").suspensionNav({
	onShowY : boxItems_scrollTop-80,       // 滚动条起始显示位置
    unShowY : boxItems_scrollTop+boxItems_height-400,     // 滚动条结束显示位置
});

// 顶部搜索条下拉组件
$.dropDown({
	el:"#main-dropdown",
	width: "200px",
});

// 功能导航区域切换调用
$("#nav-func").navFunc();

// 首页限时优惠倒计时
$("#count-down").secondsKill({
	endTime: 2500000000,   //结束时间
	killEndFunc: null,     //倒计时结束的回调
});

// 必游景点tap内容切换
$.boxNavTap({
    el: "section[data-box='must-see']",
    tempType: 1,
    oJson: "mustSee",
});

// 热门周边tap内容切换
$.boxNavTap({
    el: "section[data-box='popular-around']",
    tempType: 2,
    oJson: "popularAround",
});

// 当地酒店tap内容切换
$.boxNavTap({
    el: "section[data-box='local-hotel']",
    tempType: 1,
    oJson: "localHotel",
});

// 国内游tap内容切换
$.boxNavTap({
    el: "section[data-box='domestic-travel']",
    tempType: 2,
    oJson: "domesticTravel",
});

// 首页box_content图片懒加载
$(".box-content div.imgWrap img").imgLazyLoad();

// 入住人头像图片懒加载
$(".content-box-7 .p_icon_list img").imgLazyLoad();


// 初始化加载插件
$.initJQPlugin().joinUs();