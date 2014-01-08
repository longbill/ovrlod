$(function()
{

	$(window).load(function() {
	  $('.flexslider').flexslider({
	    animation: "slide"
	  });
	});

	
	$(window).bind('resize',resetPageSize);
	resetPageSize();


	var stop = 300;
	var w = 1000;
	var CONSTANTS = {
    	w: $(window).width(),
    	screen1 : 0,
    	screen1stop : w,
    	screen2ready1 : w+60,
    	screen2ready2 : w+120,
    	screen2ready3 : w+180,
    	screen2 : w+stop,
    	screen2stop : w+stop+w,
    	screen3 : (w+stop)*2,
    	screen3stop : w*3+stop*2,
    	screen4 : (w+stop)*3,
    	screen4stop : (w+stop)*3+w
	};

	var ANCHORS = 
	{
		'home' : CONSTANTS.screen1,
		'aboutus' : CONSTANTS.screen2,
		'work' : CONSTANTS.screen3,
		'inside' : CONSTANTS.screen4,
		'contact' : CONSTANTS.screen4stop
	};




	var s = skrollr.init(
	{
		constants: CONSTANTS,
    	smoothScrolling:true
    });


// 	$('a[href^=#]').click(function()
// 	{
// 		if (!this.href) return;
// 		var hash = this.href.split('#').pop();
// 		if (ANCHORS[hash] !== undefined)
// 		{
// 			$('body').animate({scrollTop: ANCHORS[hash]},300);
// 		}
// 	});
	
	
	(function()
	{
		var lastHash = location.hash;
		setInterval(function()
		{
			var currentHash = location.hash;
			if (currentHash != '' && currentHash != lastHash)
			{
				lastHash = currentHash;
				var hash = currentHash.replace('#','');
				arr = hash.split('/');
				gotoScreen(arr[0],arr[1]);
			}
		},100);
	})();
	
	function gotoScreen(hash,action)
	{
		if (ANCHORS[hash] !== undefined)
		{
			$('html,body').animate({scrollTop: ANCHORS[hash]},300);
			document.title = $('#'+hash).attr('data-pagetitle');
			$('header a.active').removeClass('active');
			$('header a[href$='+hash+']').addClass('active');
			if (action) showAction(hash,action);
		}
	}
	
	$('#home .home-tabs').each(function()
	{
		setInterval(slideNext,10000);
		var $container = $(this);
		function slideNext()
		{
			if ($(window).scrollTop() >= 1300) return;
			var $current = $container.find('.tab.active');
			var $next = $current.next('.tab');
			if ($next.length == 0) $next = $container.find('.tab').eq(0);
			$current.fadeOut(
			{
				duration: 500,
				easing: 'linear',
				complete: function()
				{
					setTimeout(function()
					{
						$next.fadeIn(
						{
							duration:500,
							easing:'linear',
							complete:function()
							{
								$current.removeClass('active');
								$next.addClass('active');
							}
						});
					},200);
				}
			});
		}
		
		$(this).find('.screen').each(function()
		{
			var $container = $(this);
			setInterval(next,3000);
			function next()
			{
				if ($(window).scrollTop() >= 1300) return;
				var $current = $container.find('a.active');
				var $next = $current.next('a');
				if ($next.length == 0) $next = $container.find('a').eq(0);
				$current.fadeOut(300,function()
				{
					setTimeout(function()
					{
						$next.fadeIn(300,function()
						{
							$current.removeClass('active');
							$next.addClass('active');
						});
					},100);
				});
			}
		});
	});
	
	


	var changeHashTimer;
	$(window).bind('scroll',function()
	{
		try{ clearTimeout(changeHashTimer); }catch(e){ }
		var _top = $(window).scrollTop();
		if (_top < 0) _top = 0;
		var hash = '';
		for(var key in ANCHORS)
		{
			if (_top >= ANCHORS[key] - w/2 && _top < ANCHORS[key] + w/2)
			{
				hash = key;
			}
		}
		if (hash)
		{
			changeHashTimer = setTimeout(function()
			{
				window.location.hash = '#'+hash;
			},500);
		}
	});


	if (window.location.hash)
	{
		var hash = location.hash.replace('#','');
		gotoScreen(hash);
	}


	//work page slide left/right
	(function()
	{
		var $wrapper = $('#work .workslide');
		var $ul = $wrapper.children('ul');
		var $next = $('#work .handler .next');
		var $prev = $('#work .handler .prev');
		var $item = $ul.children('li').eq(0);
		var width = $item.width();
		var Width = $wrapper.width();

		var windowItems = Math.round(Width/width);
		var totalItems = $ul.children('li').length;

		$ul.css('left','0px').data('current',0);

		check_availability();


		$next.mousedown(function(evt)
		{
			evt.preventDefault();
			evt.stopPropagation();
			var currentLeft = get_currentLeft();
			var newLeft = currentLeft + windowItems;
			if (newLeft +  windowItems >= totalItems ) newLeft = totalItems - windowItems;
			slideTo(newLeft);
		});

		$prev.mousedown(function(evt)
		{
			evt.preventDefault();
			evt.stopPropagation();
			var currentLeft = get_currentLeft();
			var newLeft = currentLeft - windowItems;
			if (newLeft < 0) newLeft = 0;
			slideTo(newLeft);
		});

		function slideTo(i)
		{
			$ul.animate({ left : -1*i*width },300,function()
			{
				$ul.data('current',i);
				check_availability();
			});
		}

		function get_currentLeft()
		{
			var i = $ul.data('current');
			if (!i) i = 0;
			return i;
		}

		function check_availability()
		{
			var currentLeft = get_currentLeft();
			var currentRight = currentLeft + windowItems;

			if (currentLeft <= 0)
				$prev.addClass('disabled');
			else
				$prev.removeClass('disabled');

			if (currentRight >= totalItems)
				$next.addClass('disabled');
			else
				$next.removeClass('disabled');
		}

	})();
	


	//click on work item
	var shouldAutoShowPorject = true;
	$('.workslide > ul > li').click(function()
	{
		var items = [];
		$(this).find('.details .img').each(function()
		{
			items.push(
			{
				img: $(this).attr('data-imageurl'),
				info: $(this).find('.info').html()
			});
		});
		if (items.length == 0) return;
		$('#work-info').data('items',items).data('current',0).animate({'top':0},300);
		$('#work-info img').removeAttr('src');
		showWorkInfo();
		if ($(this).attr('data-name'))
		{
			shouldAutoShowPorject = false;
			location.hash = '#work/'+$(this).attr('data-name');
			setTimeout(function()
			{
				shouldAutoShowPorject = true;
			},200);
		}
	});


	function showAction(_screen,action)
	{
		if (_screen == 'work' && shouldAutoShowPorject)
		{
			$('.workslide > ul > li[data-name='+action+']').trigger('click');
		}
	}


	$('#work-info .button.back').click(function()
	{
		$('#work-info').animate({'top':'-100%'},300);
		location.hash = '#work';
	});

	$('#work-info .button.info').click(function()
	{
		var root = $('#work-info');
		var current = root.data('current');
		var items = root.data('items');
		if (items && items[current])
		{
			$('#work-info-info .content').html(items[current].info);
			$('#work-info-info').fadeIn();
		}
	});

	$('#work-info .button').mousedown(function(evt)
	{
		var isNext = $(this).is('.next');
		var isPrev = $(this).is('.prev');
		if (!isNext && !isPrev) return;
		evt.preventDefault();

		var root = $('#work-info');
		root.data('current',root.data('current')+ ( isNext ? 1 : -1 ));
		showWorkInfo();
	});

	$('#work-info-info .button.back').click(function()
	{
		$('#work-info-info').fadeOut();
	});
});


function showWorkInfo()
{
	var root = $('#work-info');
	var items = root.data('items');
	var current = root.data('current');
	if (current <= 0)
		root.find('.button.prev').addClass('disabled');
	else
		root.find('.button.prev').removeClass('disabled');

	if (current >= items.length -1)
		root.find('.button.next').addClass('disabled');
	else
		root.find('.button.next').removeClass('disabled');

	if (!current || current <= 0) current = 0;
	if (current >= items.length) current = items.length - 1;
	$('#work-info').find('img').attr('src', items[current].img);
	$('#work-info').data('current',current);
}

function resetPageSize()
{
	var w = $(window).width();
	var h = $(window).height();

	$('div.chapter-wrap > div').width(w);
	$('div.chapter-wrap > div.about-div').width(w*1.5);
	$('div.chapter-wrap > div.work-div').width(w*1.5);
	$('div.chapter-wrap > div.inside-div').width(w*1.5);
	$('div.chapter-wrap > div.contact-div').width(w*1.5);
	$('div.chapter-wrap').height(h);
	//$('header').width(w);
}