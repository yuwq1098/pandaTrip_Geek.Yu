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
    $.fn.mainFunc = function() {
        var $el = $(this);
        console.log($el);      
    };  
})(jQuery); 