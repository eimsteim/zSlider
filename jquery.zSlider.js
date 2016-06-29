/*
 * Simple Slider（简单的滑动切换插件）
 * 
 * 优势：
 * 1.使用灵活，最少只需提供主要内容展示区的wrapper id or class，即可生成高度兼容的滑动切换插件。
 * 2.默认不生成样式，避免css冲突。
 * 
 * 依赖jQuery
 */
(function($){

    $.fn.zSlider = function(options){
        //default settings
        var defaults = {
            // contentWrapper: '',
            delay: 5000,
            dotsWrapper: undefined,
            align: 'vertical' //x-horizontal, y-vertical
        };

        var settings = $.extend(defaults, options);

        //main logical
        var ul = $(this).find('ul'),
            liH = ul.find('li').outerHeight(true),
            liW = ul.find('li').outerWidth(true),
            child_size = $(ul).children('li').length,
            autoPlay;

        var line_count = ul.outerHeight()/(ul.children('li:first').outerHeight());

        var v_dots_cur, v_dots_max;

        /**** 更新dots ****/
        var updateDots = function(tar_index) {

            if(settings.dotsWrapper){
                var dots = $(settings.dotsWrapper).find('.dots');
                $(dots).find('li.active').removeClass('active');
                $($(dots).children('li').get(tar_index)).addClass('active');
            }
        }

        /**** 滚动到指定target ****/
        //然而这里的target在水平切换时标识一个 li
        //而在垂直切换时标识一个 line
        var scrollTo = function(target) {

            if(settings.align == 'horizontal') { //horizontal

                //fresh li's active status
                var curr = $(ul).find('li.active');

                if(curr.length > 0) {
                    $(curr).removeClass('active');
                } else {
                    curr = $(ul).find('li:first');
                }

                var tar_index;
                if(target) {
                    tar_index = $(target).index();
                    $($(ul).children('li').get(tar_index)).addClass('active');
                } else {
                    var next = curr.next();
                    if($(next).index() > 0){
                        tar_index = $(next).addClass('active').index();
                    } else {
                        tar_index = 0; //back to first li
                        $(ul).find('li:first').addClass('active');
                    }
                }

                //adjust ul's width
                if(child_size > 0){
                    ul.css('width', child_size * 100 + '%');
                    ul.children('li').css('width', 100/child_size + '%');
                }

                ul.animate({
                    'left': -100 * tar_index + '%'
                },500,function(){
                    //update dots
                    updateDots(tar_index);
                });

            } else { //vertical

                //target == line
                //此时根据dots的index来切换（依赖于dots和content的同步性）

                var next_index;
                if(settings.dotsWrapper) {
                    //如果用户定义了dots
                    var next = $(settings.dotsWrapper).find('.dots>.dot.active').next();
                    if(next.length > 0) {
                        //如果有下一个
                        next_index = next.index();
                    } else {
                        //如果没有下一个，切换到第一个
                        next_index = 0;
                    }

                } else {
                    //如果用户没有使用dots
                    //v_dots_max: 虚拟dots，最大值
                    //v_dots_cur: 虚拟dots，当前值
                    if(v_dots_cur < v_dots_max) {
                        next_index = v_dots_cur++;
                    } else {
                        next_index = 0;
                        v_dots_cur = 0;
                    }
                }

                ul.animate({
                    'margin-top':-liH * next_index +'px'
                },500,function(){
                    //update dots
                    updateDots(next_index);
                });
            }
        }

        $(this).hover(function(){
            clearInterval(autoPlay);
        },function(){
            autoPlay=setInterval(function(){
                scrollTo();
            }, settings.delay?settings.delay:5000);
        }).trigger('mouseleave');

        //init dots
        if(settings.dotsWrapper){

            $(settings.dotsWrapper).append('<ol class="dots"></ol>');
            var dots = $(settings.dotsWrapper).find('.dots');

            if(settings.align == 'horizontal') {
                $.each(ul.children('li'), function(i, n){
                    $(dots).append('<li class="dot"></li>');
                });
            } else {
                //获取ul高度
                for(var i=0; i< line_count; i++){
                    $(dots).append('<li class="dot"></li>');
                }
            }

            $(dots).find('li:first').addClass('active');
            //bind event
            $(dots).find('li').on('click', function(){
                // stop autoplay first
                clearInterval(autoPlay);
                //scroll to target
                scrollTo($(ul.children('li')).get($(this).index()));

                // then restart autoplay
//                autoPlay=setInterval(function(){
//                    scrollTo();
//                }, settings.delay?settings.delay:5000);
            });
        } else {
            //初始化虚拟dots
            v_dots_cur = 0;
            if(settings.align == 'horizontal') {
                v_dots_max = ul.children('li').length;
            } else {
                //获取ul高度
                v_dots_max = line_count;
            }
        }

        return this;
    }

})(jQuery);