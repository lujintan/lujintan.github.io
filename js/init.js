(function(){
	var $win = $(window);
	
	var _bindBack2top = function(){
		var $back2top = $('#uiBack2top').click(function(e){
            e.preventDefault();
            var doc = document.body.scrollTop ? document.body : document.documentElement;

            $(doc).animate({
                'scrollTop': 0
            }, 300);
        });

        $win.scroll(function(){
        	if ($win.scrollTop() > 200){
                $back2top.addClass('show');
            } else{
                $back2top.removeClass('show');
            }
        });
	};

    var _bindWxClick = function(){
        var $btWx = $('#btWxLink');
        var $wx = $([
                '<div class="ui-wx-wp un-vis">',
                    '<img src="/image/ico_wx_qr.png" />',
                '</div>'
            ].join('')).hide().appendTo(document.body);
        $btWx.click(function(e){
            e.preventDefault();
            var mask = J.ui.mask();
            $wx.show();
            setTimeout(function(){
                $wx.removeClass('un-vis');
            }, 50);
            mask.$elem.one('click', function(){
                $wx.one(J.eve.transitionEnd, function(){
                    $wx.hide();
                });
                $wx.addClass('un-vis');
                mask.hide();
            });
        });
    };

    var _btSidebarInit = function(){
        var $catWrapper = $('#catWrapper');
        var $lis = $catWrapper.find('.c-l .ci');
        $lis.each(function(index, li){
            var $li = $(li);
            $li.css(J.css.transitionDelay, index * 80 + 'ms');
        });
        $catWrapper.removeClass('un-init');
    };

	var main = function(){
		$win.load(function(){
			_bindBack2top();
            _bindWxClick();
            _btSidebarInit();
		});
	};
	main();
})();