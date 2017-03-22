// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
(function($){
    $.fn.myJQPlugin = function() {  
        // 没有必要使用$(this)  
        // $(this) 跟 $($('#element'))是一样的   
        this.html("Hello,world");
        var $this = $(this);
        this.click(function(){
            $this.hide(); //注意这里的this不再指向jQuery元素，这里的this指向当前这个function对象
        });
    };
    // 初始化加载插件
    $.initJQPlugin = function(){

        var MyPlugin= function() {}
        //定义haorooms的方法
        MyPlugin.prototype = {

            //加入我们
            joinUs: function() {
                var logZ1 = "\n探险家智旅是一家为中国旅游业提供\n"
                   +"全域旅游规划设计+产品策划+软件开发+系统集成+运营维护\n"
                   +"的四维一体化高新信息技术研发与互联网整合行销解决方案的科技公司。\n\n\n"
                   +"如果您像我们一样深深地热爱互联网和旅行\n"
                   +"那么还犹豫什么，赶紧加入我们\n"
                           +"探险家能为你实现梦想提供最广阔的平台\n\n";
                var logZ2 = "请将简历发送至："+"%c txjer@hr.com";
                var logZ3 = "探险家智旅官网："+"%c https://www.txjer.com";
                var logZ2_style = "color:#349039; font-size:20px;\n\n";
                var logZ3_style = "color:#349039; line-height:32px; font-size:20px;\n\n";

                console.log(logZ1);           
                console.log(logZ2 , logZ2_style);
                console.log(logZ3 , logZ3_style);
                return false;   
            },
            ooo:function(){
                console.log("aaaa");
                return false;
            }
        }
        //创建haorooms的实体
        var myPlugin = new MyPlugin();
        return myPlugin;
        
    };
    // 首页导航切换（轮播区）
    $.fn.navFunc = function() {
        var $el,
            $mainFunc,
            $childFunc,
            m_tapLink,
            isAnimation = true,
            dataFunc;
        
        $el = $(this);
        $mainFunc = $el.find(".main-func");
        $childFunc = $el.find(".child-func");
    
        m_tapLink = $mainFunc.find("ul li .tap-link");
        m_tapLink.on("mouseover",function(e){
            if(!isAnimation){ return false; }
            isAnimation = !isAnimation;
            var _this = $(e.currentTarget);
            var _thisParent = _this.parent("li");

            // 控制main-taplink的高亮
            _thisParent.addClass("active").siblings("li").removeClass("active");
            // 控制绑定的data-func显隐
            dataFunc =  _this.attr("data-func");
            var c_itemFunc = $childFunc.find("[data-func="+dataFunc+"]");
            c_itemFunc.fadeIn(200).siblings(".func-item").fadeOut(150);
            setTimeout(function(){
                isAnimation = !isAnimation;
            },100);
        });
        return this;
    }; 

})(jQuery); 