$(document).ready(function(){


$('.do-menu-open, .do-menu-close').on('click', function(event){
	event.preventDefault();
	$('.site-nav').toggleClass('is-open'); // open/close mobile menu on click
});
	
/* open and close header drawer */
$('.tab').on('click', function(event){
	event.preventDefault();
	
	var screenSize = $(window).width(); //test screen size

	$('.do-drawer-close').on('click', function(event){
		// in mobile menu, close drawer on click
		event.preventDefault();
		closeDrawer();
	});

	if($(this).hasClass('is-open')){
		closeDrawer();
	}else{
		openDrawer();
		var scrollInit = $(window).scrollTop();
		
		if( screenSize > 728 ){
			//if on desktopish, watch for scroll to close drawer
			startWatching();
		}
		
	}

	function openDrawer(){
		$('.site-header, .utility-drawer, .tab').addClass('is-open');
	}

	function closeDrawer(){
		$('.site-header, .utility-drawer, .tab').removeClass('is-open');
	}

	function startWatching(){
		$(window).on('scroll',function(){

			var scrollCurrent = $(window).scrollTop();
			var scrollDiff = scrollInit - scrollCurrent;
	
			//if drawer's open & you scroll more than 15px, close it.
			if( ( Math.abs( scrollDiff ) > 15 ) && ($('.utility-drawer').hasClass('is-open')) ){
				closeDrawer(); //close the drawer
				$(window).off('scroll'); //once drawer closes, stop watching scroll
				stageScroll(); // call stage scroll for positioning line
			}

		});
	}

});
/* end header drawer */

function stageScroll(){
	$(window).on('scroll', function(){

		var secondStageOffset = $('.second-stage').offset().top;
		var scrollPos = $(window).scrollTop();
	
		if( scrollPos + 15 > secondStageOffset ){
			$('.site-header').addClass('is-filled');
		}else{
			$('.site-header').removeClass('is-filled');
		}
	
		if( scrollPos > 20 ){
			$('#temp-desc').addClass('fade-out');
		}else{
			$('#temp-desc').removeClass('fade-out');
		}
	
	});

}

if( $('.second-stage').length !== 0 ){
	stageScroll(); //only use stage scroll if on the homepage (when second stage is present)
}

function youtubeResize(){
		
		// Find all YouTube videos
		var $allVideos = $("iframe[src^='http://www.youtube.com'], iframe[src^='https://www.youtube.com'], iframe[src^='//player.vimeo.com'], iframe[src^='https://player.vimeo.com'], iframe[src^='http://player.vimeo.com']"),

		    // The element that is fluid width
		    $fluidEl = $(".text, .text-page");

		// Figure out and save aspect ratio for each video
		$allVideos.each(function() {

		  $(this)
		    .data('aspectRatio', this.height / this.width)

		    // and remove the hard coded width/height
		    .removeAttr('height')
		    .removeAttr('width');

		});

		// When the window is resized
		$(window).resize(function() {

		  var newWidth = $fluidEl.width();

		  // Resize all videos according to their own aspect ratio
		  $allVideos.each(function() {

		    var $el = $(this);
		    $el
		      .width(newWidth)
		      .height(newWidth * $el.data('aspectRatio'));

		  });

		// Kick off one resize to fix all videos on page load
		}).resize();
	}
	
	youtubeResize();



});