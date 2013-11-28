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