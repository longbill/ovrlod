$(document).ready(function() {
  // function for the Page Div width Fix
  // var total = $('.chapter-wrap > div').length;
  var totalWidth = 0;
  $('.chapter-wrap > div').each(function () {
    if ($(this).hasClass('home-div') || $(this).hasClass('contact-div')) {
      $(this).width($('body').width());
    } else {
      $(this).width(
	  parseInt( $('body').width() + $('body').width()/3)
	   ); 
    }
    
	totalWidth += parseInt($(this).outerWidth(),10);
	$('div.chapter-wrap').width( totalWidth );
  
  });
  
  //End here
  
  $('html, body').mousewheel(function(e, delta) {
				this.scrollLeft -= (delta * 100);
				e.preventDefault();
  });
  
  
  
var documentScrollLeft = 0;
$(window).scroll(function() {
	documentScrollLeft = $(document).scrollLeft();
	console.log (   documentScrollLeft );
    if ( documentScrollLeft + $(window).width() == $('div.chapter-wrap').width()) {
		$("nav ul li a").removeClass('active');
		$("nav ul li:last-child a").addClass('active');
	} 	
	else if ( documentScrollLeft >= $('div.chapter-wrap > div:eq(1)').position().left ) 
	{
	 $('div.chapter-wrap > div').each(function (i) {
            if ( $(this).position().left <= documentScrollLeft ) {
				$('nav ul li a').removeClass('active');
                $('nav ul li a').eq(i-1).addClass('active');
            }  
        });
	} else {
	  $('nav a.active').removeClass('active');
	}
});
  
  
$('div.chapter-wrap > div').each(function(){
 var realtar = $(this).find('a[href^="#"]');
  realtar.click(function(){
    var targetIn = realtar.attr('href');
	$("html, body").stop().animate({
		scrollLeft: $(targetIn).offset().left,
		scrollTop: $(targetIn).offset().top
    }, 1200);
 });
});

$("div.workslide ul > li").each(function(){
 
 $(this).hover(
  function () {
    $(this).find('div.heading').stop().fadeIn('slow');
  },
  function () {
   $(this).find('div.heading').stop().fadeOut('slow');
  }
);

 
});
  
  // Function for project Gallery
  var totalImages = $("div.workslide ul > li").length;
  var imageWidth = $("div.workslide ul > li:first").width(); // = 346
  var totalWidth = imageWidth /*346*/  * totalImages; /*4*/   // = 1384
  var visibleLi = Math.round($("div.workslide ul").width() / imageWidth); //3
  var visibleWidth = visibleLi * imageWidth; // 1034      3 * 346
  var stopPosition = (visibleWidth - totalWidth);
  $('div.workslide ul').width(totalWidth);
  $(".prev").click(function () {
    if ($("div.workslide ul").position().left < 0 && !$("div.workslide ul").is(":animated")) {
      $("div.workslide ul").animate({
        left: "+=" + imageWidth + "px"
      }, function () {

      });
    }
  });
  $(".next").click(function () {
    if ($("div.workslide ul").position().left > stopPosition && !$("div.workslide ul").is(":animated")) {
      $("div.workslide ul").animate({
        left: "-=" + imageWidth + "px"
      });
    }
  });
  
  //Project Overlay Function
  $("div.workslide ul > li").each(function (el) {
    $(this).click(function (div) {
      if ($(this).find('div.details').length > 0) {
        var leftPos = $(window).scrollLeft();
        var offset = $('.work-div').position();
        $('html,body').animate({
          scrollLeft: offset.left
        }, 500);
        $('body').css({
          'overflow': 'hidden'
        })
        $('body').find('span.prev').removeClass().addClass('prev-a');
        $('body').find('span.next').removeClass().addClass('next-a');
        var Ovrlay = $("<div class='ovrlay'></div>");
        //Ovrlay.width($('div.work-div').width()).position(offset.left);
        var ContentBox = $("<div class='ovrlay-content'></div>");
        var ContentBoxWrap = $("<div class='ovrlay-wrap'></div>");
        var Allimages = $(this).find('div.details').html();
        var ImageUrl = $(this).find('div.details div.img').data('imageurl');
        var Allcaps = $(this).find('div.info');
        Allcaps.hide();
        //$('.ovrlay').css({ 'left' : offset })
        Ovrlay.appendTo('div.work-div');
        ContentBox.appendTo('div.work-div');
        var width = $('div.work-div').width();
        var containerWidth = $("div.ovrlay-content").width();
        var leftMargin = (width - containerWidth) / 2;
        ContentBoxWrap.append(Allimages);
        ContentBoxWrap.appendTo(ContentBox);
        
		//Looping Through Datatype and appending Image to DIV for Overlay Gallery
		ContentBoxWrap.find('div.img').each(function () {
          $(this).append("<img src=" + $(this).data('imageurl') + " alt='' >");
        });
        ContentBoxWrap.find('div.img:first').addClass('first current').fadeIn();
        ContentBoxWrap.find('div.img:last-child').addClass('last');
        ContentBoxWrap.find('div.info').hide();
		var infoText = ContentBoxWrap.find('div.current:visible > div.info').text();
        $('div.work-div').append("<div class='infoovr'> </div>  <div class='desc'> " + infoText + " </div>");
		 $('div.work-div').append("<div class='close'> </div>");
        
		// Next & Previous Emails
		var $next = $('span.next-a');
        var $prev = $('span.prev-a');
        $next.click(function (event) {
          activeElem = ContentBox.find('div.current');
          $prev.fadeTo('fast', 1.0);
          if (!activeElem.is(':last-child')) {
            activeElem.removeClass('current').next().fadeOut('slow').addClass('current').fadeIn('slow');
            $('div.desc').empty();
            $('div.desc').append(ContentBox.find('div.current:visible > .info').html());
          } else {
            $next.fadeTo('fast', 0.50);
          }
        });
        $prev.click(function () {
          activeElem = ContentBox.find('div.current');
          $next.fadeTo('fast', 1.0);
          if (!activeElem.is(':first-child')) {
            activeElem.removeClass('current').prev().fadeOut('slow').addClass('current').fadeIn('slow');
            $('div.desc').empty();
            $('div.desc').append(ContentBox.find('div.current:visible > .info').html());
          } else {
            $prev.fadeTo('fast', 0.50);
          }
        });
		
		//Appending Close and Picture Caption Button
		
		 
		 $('div.infoovr').click(function(){
		  $('div.work-div').find('div.desc').slideToggle('slow');
		 });
		 
		 $('div.close').click(function(){
		   $(this).remove();
		   ContentBox.fadeOut().remove();
		   Ovrlay.fadeOut().remove();
		   $('div.infoovr,div.close,div.desc').remove();
		   $('body').css({'overflow':'visible'});
		   $('body').find('span.prev-a').fadeTo('fast',1.0);
		   $('body').find('span.next-a').fadeTo('fast',1.0);
		   $('body').find('span.prev-a').removeClass().addClass('prev');
           $('body').find('span.next-a').removeClass().addClass('next');
		   
		 });
      }
    });
  });
   
   
  $(".logo").click(function(event){
				   
			
		           var target = $(this).attr("href");
				   document.title = $("body").find('div'+target).data('pagetitle');
		           $("html, body").stop().animate({
		               scrollLeft: $(target).offset().left,
					   scrollTop: $(target).offset().top
		           }, 1200);
  
  });
  
  $("nav ul li a").click(function(event){
		           
				   $("nav ul li a").removeClass('active');
				   $(this).addClass('active');
				   var loc = window.location;
				   
		           var target = $(this).attr("href");
		           document.title = $("body").find('div'+target).data('pagetitle');
				   $("html, body").stop().animate({
		               scrollLeft: $(target).offset().left,
					   scrollTop: $(target).offset().top
		           }, 1200);
				   
});

if(window.location.hash) {
   var str =  window.location.hash;
   $("nav ul li a").removeClass('active');
   $('nav ul li a[href="' + str + '"]').addClass('active');
   $("html, body").stop().animate({
		scrollLeft: $(str).offset().left,
		scrollTop: $(str).offset().top
   }, 1200);
   document.title = $("body").find('div'+str).data('pagetitle');
  } else {
    return false;
}
 
			   
			   

}); // Main Closing