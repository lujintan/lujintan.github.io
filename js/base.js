var J = {};

J.browser = {
	isWebkit : /webkit/i.test(navigator.userAgent),
	oprea : /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ?  + ( RegExp["\x246"] || RegExp["\x242"] ) : undefined,
	gecko : /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent)
};
J.css = {};
J.eve = {
	transitionEnd : 'transitionend'
};
J.util = {
	forbideScroll : function(){
		var $doc = $(document.documentElement);
		!$doc.hasClass('forbide-scroll') && $doc.addClass('forbide-scroll');
	},
	resolveScroll : function(){
		var $doc = $(document.documentElement);
		$doc.hasClass('forbide-scroll') && $doc.removeClass('forbide-scroll');
	}
};

(function(){
	var _css = {
		transform : 'transform',
		transition : 'transition',
		transitionDelay : 'transition-delay'
	};
	var _eve = {
		transitionEnd : 'TransitionEnd',
		animationEnd : 'AnimationEnd'
	};
	var fr = '',
		eFr = '';
	if (J.browser.isWebkit){
		fr = '-webkit-';
		J.eve.transitionEnd = 'webkitTransitionEnd';
		J.eve.animationEnd = 'webkitAnimationEnd';
	}
	else if (J.browser.gecko){
		fr = '-moz-';
	}
	else if (J.browser.opera){
		fr = '-o-';
		J.eve.transitionEnd = 'OTransitionEnd';
		J.eve.animationEnd = 'OAnimationEnd';
	}
	for (var key in _css){
		_css[key] = fr + _css[key];
	}
	for (var key in _eve){
		_eve[key] = eFr + _eve[key];
	}
	J.css = _css;
})();

J.lock = {
	dnaScroll : false
};

J.menu = {
	singleAngel : 12,
	singleDelay : 50,
	init : function(){
		var df = $.Deferred(),
			$menu = $('#sideMenu'),
			$menuList = $menu.find('.mod-side-menu'),
			$menuItems = $menuList.children('li.mi');

		if (J.browser.isWebkit){
			document.body.scrollTop = 0;
		}
		else{
			document.documentElement.scrollTop = 0;
		}
		$menu.addClass('menu-init');
		$menuList.one(J.eve.transitionEnd, function(){
			var currentIndex = $menuList.children('li.current').index();

			var _renderMenu = function(index){
				for (var i = 0, len = $menuItems.length ; i < len ; i++){
					var offset = Math.abs(index - i);
					var menuItemCss = {};
					menuItemCss[J.css.transform] = 'rotateY(' + offset * J.menu.singleAngel + 'deg)';
					menuItemCss[J.css.transitionDelay] = offset * J.menu.singleDelay + 'ms';
					$($menuItems[i]).css(menuItemCss);
				}
			};

			_renderMenu(currentIndex);

			$menuItems.hover(function(){
				var $this = $(this);
				var hoverIndex = $this.index();
				_renderMenu(hoverIndex);
			}, function(){
				var currentIndex = $menuList.children('li.current').index();
				_renderMenu(currentIndex);
			});
			df.resolve();
		});

		return df.promise();
	}
};

J.ui = {
	tip : function(msg, type){
		var $tip = $([
			'<div class="j-ui-tip j-ui-' + type + '">',
				'<div class="t-m yh">' + msg + '</div>',
			'</div>'
		].join('')).appendTo(document.body);
		$tip.one(J.eve.animationEnd, function(){
			$tip.remove();
		});
	},
	mask: function(){
		var $mask = $('<div class="j-ui-mask un-vis"></div>').appendTo(document.body);
		setTimeout(function(){
			$mask.removeClass('un-vis');
		}, 50);
		return {
			$elem: $mask,
			hide: function(){
				$mask.one(J.eve.transitionEnd, function() {
					$mask.remove();
				});
				$mask.addClass('un-vis');
			}
		};
	}
};