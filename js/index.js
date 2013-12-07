$(function()
{
	$(window).bind('resize',resetPageSize);
	resetPageSize();


	var stop = 300;
	var w = 1000;
	var s = skrollr.init(
	{
		constants: {
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
    	},
    	smoothScrolling:true
    });





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

	$('.workslide > ul > li').click(function()
	{
		$('#work-info').show();
	});


	$('#work-info .button.back').click(function()
	{
		$('#work-info').hide();
	});

	$('#work-info .button.info').click(function()
	{
		$('#work-info-info').show();
	});

	$('#work-info-info .button.back').click(function()
	{
		$('#work-info-info').hide();
	});


});


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