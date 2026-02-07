jQuery(function ($) {
	// accordian
	$('.accordion-toggle').on('click', function(){
		$(this).closest('.panel-group').children().each(function(){
		$(this).find('>.panel-heading').removeClass('active');
		 });

	 	$(this).closest('.panel-heading').toggleClass('active');
	});

	//Initiat WOW JS
	new WOW().init();

	// portfolio filter
	$(window).load(function(){'use strict';
		var $portfolio_selectors = $('.portfolio-filter >li>a');
		var $portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector : '.portfolio-item',
			layoutMode : 'fitRows'
		});
		
		$portfolio_selectors.on('click', function(){
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector });
			return false;
		});
	});

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
	});	

	//Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
	    //social_tools: false
	    overlay_gallery: false,
	    show_title: false,
	    hideflash: true,
	    social_tools: "",
	    iframe_markup: "<iframe src='{path}' width='{width}' height='{height}' frameborder='no' allowfullscreen='true'></iframe>",
	    deeplinking: false
	});

    //Sort random function
	//function random(owlSelector) {
	//    owlSelector.children().sort(function () {
	//        return Math.round(Math.random()) - 0.5;
	//    }).each(function () {
	//        $(this).appendTo(owlSelector);
	//    });
	//}

	//$("#owl-wrap").owlCarousel({
	//    navigation: true,
	//    navigationText: [
    //    "<i class='icon-chevron-left icon-white'><</i>",
    //    "<i class='icon-chevron-right icon-white'>></i>"
	//    ],
	//    beforeInit: function (elem) {
	//        //Parameter elem pointing to $("#owl-demo")
	//        random(elem);
	//    }
	//});
});

// Nivo Lightbox
//$('a').nivoLightbox({
//    effect: 'fadeScale',                             // The effect to use when showing the lightbox
//    theme: 'default',                           // The lightbox theme to use
//    keyboardNav: true,                          // Enable/Disable keyboard navigation (left/right/escape)
//    clickOverlayToClose: true,                  // If false clicking the "close" button will be the only way to close the lightbox
//    onInit: function () { },                       // Callback when lightbox has loaded
//    beforeShowLightbox: function () { },           // Callback before the lightbox is shown
//    afterShowLightbox: function (lightbox) { },    // Callback after the lightbox is shown
//    beforeHideLightbox: function () { },           // Callback before the lightbox is hidden
//    afterHideLightbox: function () { },            // Callback after the lightbox is hidden
//    onPrev: function (element) { },                // Callback when the lightbox gallery goes to previous item
//    onNext: function (element) { },                // Callback when the lightbox gallery goes to next item
//    errorMessage: 'The requested content cannot be loaded. Please try again later.' // Error message when content can't be loaded
//});