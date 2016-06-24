/*
 * Simple Slider（简单的滑动切换插件）
 * 
 * 优势：
 * 1.使用灵活，最少只需提供主要内容展示区的wrapper id or class，即可生成高度兼容的滑动切换插件。
 * 2.默认不生成样式，避免css冲突。
 * 3.支持横向和纵向的滑动切换（横向未完成）。
 * 
 * 依赖jQuery
 */
(function($){

	$.fn.zSlider = function(options){
		//default settings
		var defaults = {
			// contentWrapper: '',
			delay: 5000,
			dotsWrapper: undefined
		};

		var settings = $.extend(defaults, options);

		//main logical
		var ul = $(this).find('ul'),
            liH = ul.find('li').outerHeight(true),
            autoPlay;

		var scrollTo = function(target) {
			//fresh li's active status
            var curr = $(ul).find('li.active'); $(curr).removeClass('active');
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

            ul.animate({
                'margin-top':-liH * tar_index +'px'
            },500,function(){
                //update dots
                if(settings.dotswrapper){
                    var dots = $(settings.dotswrapper).find('.dots');
                    $(dots).find('li.active').removeClass('active');
                    $($(dots).children('li').get(tar_index)).addClass('active');
                }

            });
		}




        $(this).hover(function(){
        	clearInterval(autoPlay);
        },function(){
            autoPlay=setInterval(function(){
                scrollTo();
            }, settings.delay?settings.delay:5000);
        }).trigger('mouseleave');

        //init dots
        var dot_num = ul.children('li').length;
        if(settings.dotswrapper){

            $(settings.dotswrapper).append('<ol class="dots"></ol>');
            var dots = $(settings.dotswrapper).find('.dots');

            $.each(ul.children('li'), function(i, n){
                $(dots).append('<li class="dot"></li>');
            });
            $(dots).find('li:first').addClass('active');
            //bind event
            $(dots).find('li').on('click', function(){
                // stop autoplay first
                clearInterval(autoPlay);
                //scroll to target
                scrollTo($(ul.children('li')).get($(this).index()));

                // then restart autoplay
                autoPlay=setInterval(function(){
                    scrollTo();
                }, settings.delay?settings.delay:5000);
            });
        }
		


		return this;
	}

})(jQuery);