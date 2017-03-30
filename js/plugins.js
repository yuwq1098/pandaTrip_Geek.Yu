/*
 * 熊猫旅行的插件脚本 
 * 作者Geek.Yu 在2017-03-27 10:43:00 创建了它，
 * 若您对此脚本存在疑问，请联系作者Geek.Yu  qq:1098654043
 */

// 在浏览器浏览器中排除特定的“控制台”报错
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
        }
        //创建haorooms的实体
        var myPlugin = new MyPlugin();
        return myPlugin;
        
    };

    // 限时秒杀
    $.fn.secondsKill = function(option){

        var $el,           // 所指定的$DOM
            timeBlock,     // 获取每个时间块
            defaults,      // 默认配置
            setting,       // 实际的配置
            timestamp,     // 获取当前时间戳
            timeDiff,      // 获取时间差
            endKill = null,       // 接收倒计时结束的回调
            timer;         // 定时器
       
        $el = $(this);
        var p_hour = $el.find("span.p_hour");
        var p_minute = $el.find("span.p_minute");
        var p_second = $el.find("span.p_second");

        timeBlock = $el.find("em"); 
        defaults = { 
            endTime: 1502150888,     // 默认结束时间2017-08-08 08:08:08
            bgColor:"#313536",
            isOneDay: true,          //是否只是单天24小时内倒计时，是的话就是24小时，否的话就是100天
            killEndFunc: null,       //秒杀结束方法
        };
        // 参数继承，意思是后面的参数如果和前面的参数存在相同的名称，那么后面的会覆盖前面的参数值。
        setting = $.extend(defaults,option);

        timestamp = Date.parse(new Date())/1000;
        timeDiff = setting.endTime - timestamp;
        // 如果时间差过大,就直接取范围上限的值
        timeDiff = setting.isOneDay ? (timeDiff>86400?86399:timeDiff) : (timeDiff > 8640000?8639999:timeDiff);
        endKill = setting.killEndFunc;
        
        // 进入定时器前先渲染一次
        render();
        timer = setInterval(function(){
            render();
        },1000);

        // 改变时间块的样式
        timeBlock.css({
            backgroundColor:setting.bgColor,
        });
        // 默认的秒杀结束方法
        function defaultEndKill(){
            //清除定时器
            clearInterval(timer);
        }
        // 时间补零
        function textFill(needle){
            return (needle < 10 ? ("0" + needle) : needle).toString(); 
        } 
        // 倒计时指针渲染
        function render(){
            // 各指针数值
            var hh = Math.floor(timeDiff / 3600); 
            var mm = Math.floor(timeDiff / 60) - (hh * 60);
            var ss = Math.floor(timeDiff) - (hh * 3600) - (mm * 60); 
            // 补零
            hh = textFill(hh);
            mm = textFill(mm);
            ss = textFill(ss);
            // 渲染DOM
            p_hour.html("<em>"+hh.substr(0,1) +"</em>"+"<em>"+hh.substr(1,1)+"</em>");
            p_minute.html("<em>"+mm.substr(0,1)+"</em>"+"<em>"+mm.substr(1,1)+"</em>");
            p_second.html("<em>"+ss.substr(0,1)+"</em>"+"<em>"+ss.substr(1,1)+"</em>");
            if(timeDiff<=0){
                endKill?endKill():false;
                defaultEndKill();
                return false;
            }
            return timeDiff--;
        }

        return this;
    }

    // 侧边悬浮条
    $.fn.suspensionNav = function(option){

        var $el,                      // 所指定的$DOM
            defaults,                 // 默认配置
            setting,                  // 实际的配置
            childSize,                // 浮动导航的个数
            boxDataItems = [],        // 数据集，浮动导航所带的数据=>指向实际页面内容
            boxHeightItems = [],      // 数据集，浮动导航指向页面内容的高度
            boxScrollTopItems = [],   // 数据集，浮动导航指向页面内容的滚动条高度
            w_scrollTop;              // 定义win滚动条高度
        
        var $W = $(window);
        w_scrollTop = $W.scrollTop();
        // 获取页面中的主要内容盒子
        var $boxMain = $("#box-items");
       
        $el = $(this);
        childSize = $el.find("li").length;
        
        // 赋值，浮动导航所带的数据=>指向实际页面内容
        for(var i=0; i<childSize;i++){
            var _boxData = $el.find("li").eq(i).attr("data-box");
            var _height = $boxMain.find("[data-box='"+_boxData+"']").height();
            var _scrollTop = $boxMain.find("[data-box='"+_boxData+"']").offset().top;
            boxDataItems.push(_boxData);
            boxHeightItems.push(_height);
            boxScrollTopItems.push(_scrollTop);

        }

        defaults = {
            onShowY : 300,       // 滚动条起始显示位置
            unShowY : 10000,     // 滚动条结束显示位置
        };
        // 参数继承，意思是后面的参数如果和前面的参数存在相同的名称，那么后面的会覆盖前面的参数值。
        setting = $.extend(defaults,option);
        
        // 初始化调用findPosition
        scrollFunc();
        $W.scroll(scrollFunc);

        for (i=0;i<boxDataItems.length;i++) {
            var section = $el.find("li").eq(i);
            section.on("click",scrollPageTo);
        }
        
        // 显示侧浮导航条
        function eShow(){
            $el.fadeIn(300);
        }
        // 隐藏侧浮导航条
        function eHide(){
            $el.fadeOut(300);
        }
        // 页面滚动回调
        function scrollFunc(){
            w_scrollTop = $W.scrollTop();
            if(w_scrollTop<setting.onShowY||w_scrollTop>setting.unShowY){
                eHide();   
                return false;
            }
            eShow();
            findPosition(); 
        }

        // 更新当前页面滚动块元素
        function findPosition(){
            for (i=0;i<boxDataItems.length;i++) {
                var section = $el.find("li").eq(i);
                if(w_scrollTop>=boxScrollTopItems[i]-(boxHeightItems[i]/1.8)){
                    if(i==5||i==6){
                        $el.find("li").removeClass("active");
                        $el.find("li").eq(5).addClass("active");
                        $el.find("li").eq(6).addClass("active");
                    }else{
                        section.addClass("active").siblings("li").removeClass("active");
                    }
                    
                }
                
            }
        }

        // 跳转至目标部分
        function scrollPageTo(el){
            var $el,
                thisData,           
                _index = -1,        //获取所点击元素的下标
                _scrollTop = 0,     // 获取目标位置的滚动条高度
                _boxHeight = 0,     // 获取目标盒子高度
                oScrollVal = 0,     
                scrollDiff = 0,     // 当前滚动条距离目标滚动条的差值
                speed = 0;          // 滚动速率

            $el = $(el.currentTarget);
            thisData = $el.attr("data-box");

            for(var i = 0 ;i< boxDataItems.length;i++){
                if(thisData===boxDataItems[i]){
                    _index = i;
                    break;
                }
            }
            _scrollTop = boxScrollTopItems[_index];
            _boxHeight = boxHeightItems[_index];
            
            // 计算出一个speed值，让滚动效果更好
            oScrollVal = Math.floor(boxScrollTopItems[i]-(boxHeightItems[i]/1.8))+80;
            scrollDiff = Math.floor(Math.abs(w_scrollTop-oScrollVal)/1.3);
            speed = (100-Math.floor((Math.sqrt(scrollDiff))))*12 + 200;
            // 再次触发时强制溢出dom上的全部动画，然后进行新一轮动画
            $("html,body").stop().animate({  
                scrollTop:  oScrollVal+"px",
            }, speed);  
        }

    }

    // 首页导航切换（轮播区）
    $.fn.navFunc = function() {
        var $el,
            $mainFunc,
            $childFunc,
            m_tapLink,
            dataFunc;

        $el = $(this);
        $mainFunc = $el.find(".main-func");
        $childFunc = $el.find(".child-func");

        m_tapLink = $mainFunc.find("ul li .tap-link");
        m_tapLink.on("mouseover",function(e){
            var _this = $(e.currentTarget);
            var _thisParent = _this.parent("li");

            // 控制main-taplink的高亮
            _thisParent.addClass("active").siblings("li").removeClass("active");
            // 控制绑定的data-func显隐
            dataFunc =  _this.attr("data-func");
            var c_itemFunc = $childFunc.find("[data-func="+dataFunc+"]");
            c_itemFunc.stop(false,true).fadeIn(300).siblings(".func-item").stop(false,true).fadeOut(150);
        });
        return this;
    }; 

    // 图片懒加载
    $.fn.imgLazyLoad = function(option) {
        var $el;
        
        defaults = { 
            imgDomItem: [],                        // 需要懒加载的DOM集合             
            effect : "fadeIn",                     // 切换动画
        };
        // 参数继承，意思是后面的参数如果和前面的参数存在相同的名称，那么后面的会覆盖前面的参数值。
        setting = $.extend(defaults,option);

        $el = $(this);
        $el.lazyload({
            effect : setting.effect,
        });
    }

    // 顶部搜索条下拉组件
    $.dropDown = function(option) {
        var $el,           
            $select,             // select的DOM
            $surface,            // 触发下拉的DOM
            optionsItem = [],    // 数组集，options选项集合
            optionsDOM = '',     // 字符串，options的DOM拼接
            defaults,            // 默认配置
            setting,             // 实际的配置
            $temp = {},          // 模板
            arrow;               // 箭头

        defaults = { 
            el: "",                                              // 指定默认的dom
            bgColor: "#fff",                                     // 背景色
            speedCurve: "cubic-bezier(0.42, 0.42, 0.28, 1)",     // 速度曲线
            entityClass: "dropdowm-entity",                      // 指定模拟选择框的类名
            width: "240px",                                          // 触发下拉的DOM的宽度
        };
        // 参数继承，意思是后面的参数如果和前面的参数存在相同的名称，那么后面的会覆盖前面的参数值。
        setting = $.extend(defaults,option);

        $el = $(setting.el);
        // 一般$传入的对象都需要[0]
        $select = $el.find("select")[0];

        for (var i = 0; i<$select.length; i++){
            optionsItem.push($select.options[i].text+"||"+$select.options[i].value);
        }
        
        $temp.select = '<section class="'+defaults.entityClass+'"><ul>{options}</ul></section>';
        $temp.option = '<li value="{value}">{text}</li>';
        
        // 拼接虚拟选择框的DOM
        function jointDOM(item){
            var _selectTemp,
                _optTemp,
                _value,
                _text;
            
            if(!item||item.length<=0) return null; 
            for(var i = 0; i<item.length;i++){
                _selectTemp = $temp.select;
                _optTemp = $temp.option;
                _value = item[i].replace(/.*[|^2]/,'');
                _text = item[i].replace(/[|^2].*/,'');
                
                _optTemp = (_optTemp.replace('{value}',_value)).replace('{text}',_text);
                optionsDOM = optionsDOM + _optTemp;
            }
            return _selectTemp.replace('{options}',optionsDOM);
        }
        
        // 获取虚拟选择框的DOM
        var innerDOM = jointDOM(optionsItem);
        $el.append(innerDOM);

        $surface = $el.find(".dropdown-surface");
        
        arrow = $surface.find("i");
        var opened = true;

        var $entityDOM = $("."+defaults.entityClass);
        $entityDOM.css({
            width: setting.width,
        })
        
        $surface.on("click",function(){
            if(!innerDOM) return false;
            if(opened){
                arrow.addClass("active");
            }else{
                arrow.removeClass("active");
            }   
            $entityDOM.slideToggle(300,function(){
                opened = !opened;
            }); 
        });
        
        var $entityDOM_li = $entityDOM.find("li");
        $entityDOM_li.on("click",function(){
            var $this = $(this);
            var _text = $this.text();
            var _value = $this.val();
            
            $surface.find("em").text(_text);
            $surface.attr("value",_value);
            if(opened){
                arrow.addClass("active");
            }else{
                arrow.removeClass("active");
            }   
            $entityDOM.slideToggle(300,function(){
                opened = !opened;
            }); 
        });
        

    }; 

    // 首页内容区tap切换
    $.boxNavTap = function(option) {

        var $el,           
            $boxInfo,         // box-content里的信息,这里指向到ul节点
            tempItem = {},       // 集合，储存不同类型的模板
            defaults,            // 默认配置
            liItemDOM = '',      // 字符串，li的DOM拼接
            setting;             // 实际的配置
        
        tempItem = {
            t1  :   '<li><a href="javascript:;">\
                            <div class="imgWrap">\
                                <img src="img/loading_img.jpg" data-original="{:images}" alt="{:name}"/>\
                            </div>\
                            <section class="b_content">\
                                <p class="info clearfix">\
                                    <span class="pull-left">{:name}</span>\
                                </p>\
                                <span class="vital unit-money">\
                                    <em>{:price_min}</em>起\
                                </span>\
                            </section>\
                        </a></li>',

            t2  :   '<li><a href="javascript:;">\
                            <div class="imgWrap">\
                                <img src="img/loading_img.jpg" data-original="{:images}" alt="{:name}"/>\
                            </div>\
                            <section class="b_content">\
                                <h4 class="subtitle">{:name}</h4>\
                                <p class="info pull-left">{:vbase}出发</p>\
                                <span class="vital unit-money">\
                                    <em>{:price_min}</em>起\
                                </span>\
                            </section>\
                        </a></li>',
        }

        defaults = { 
            el: "",                         // 指定默认的dom
            id: "id",                       // 指定切换条参数标识
            tempType: 1,                    // 模板类型
            oJson: "",                      // 数据对象
        };
        // 参数继承，意思是后面的参数如果和前面的参数存在相同的名称，那么后面的会覆盖前面的参数值。
        setting = $.extend(defaults,option);

        $el = $(setting.el);
        // box-content里的信息,这里指向到ul节点
        $boxInfo = $el.find(".box-info");

        var boxDom = '<section class="clearfix box-layout complete-center"><ul>{:dom}</ul></section>';
        var $li_navbar = $el.find(".h_navbar li");
        $li_navbar.on("click",function(){
            
            var _this = $(this),
                param,         // 获取所点击tap带的值参
                realUrl,       // 真正起作用的url
                data,          // ajax获取的数据集
                innerDOM;      // 新的ul内容DOM
            
            // 如果点击li已经是被触发状态，那么就跳出
            if(_this.hasClass("active")) return false;
            // 获取值参
            param = _this.find("a").attr("rel");
            data = $$finalData[setting.oJson][("d"+param).toString()][0];
            if(!data||data.length<=0){
                // 如果没有数据时
                $boxInfo.html("");
            }else{
                // 获取拼接后的的ul内容DOM
                innerDOM = jointDOM(data);
                // console.log(innerDOM);
                $boxInfo.html(innerDOM);

                // 重新启用图片懒加载
                $boxInfo.find("div.imgWrap img").imgLazyLoad({
                    effect : "fadeIn",
                });
            };

            _this.addClass("active").siblings("li").removeClass("active");
            
        });

        // 拼接ul内容DOM
        function jointDOM(data){

            var tempType = setting.tempType,     // 获得模板类型
                _liTemp,                         // 接收li的模板
                tempNo,                          // 获得tempItem的属性键
                _href,               // 对应字段 :href           
                _images,             // 对应字段 :images
                _name,               // 对应字段 :name
                _vbase,              // 对应字段 :vbase
                _price_min;          // 对应字段 :price_min
            
            // 删除dom记录
            liItemDOM = '';
            tempNo = ("t"+tempType).toString();
           
            for(var i = 0; i<data.length;i++){

                _liTemp = tempItem[tempNo];
                var _data  = data[i];
                                    
                _images    = _data.images;         
                _name      = _data.name;             
                _vbase     = _data.vbase;               
                _price_min = _data.price_min;   
                
                // 把所有相应字段匹配掉
                _liTemp  = _liTemp.replace(/{:images}/g,_images);
                _liTemp  = _liTemp.replace(/{:name}/g,_name);
                _liTemp  = _liTemp.replace(/{:vbase}/g,_vbase);
                _liTemp  = _liTemp.replace(/{:price_min}/g,_price_min);

                liItemDOM = liItemDOM + _liTemp;
            }
            return boxDom.replace(/{:dom}/g,liItemDOM);
        }

    };

})(jQuery); 