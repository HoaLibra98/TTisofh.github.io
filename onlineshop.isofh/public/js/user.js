// $(document).ready(function (e) {
// 	new WOW().init();
// 	function banner(){
// 		var banner_left= $('.container').offset().left;
// 		$('.home-banner-info').css({'right':banner_left});
// 	}
// 	function priceList(){
// 		$('.priceList-mobile-icon-right').click(function () {
// 			$(this).closest( ".priceList-mobile-item" ).find('.priceList-mobile-info').slideDown();
// 			$(this).closest( ".priceList-mobile-item" ).find('.priceList-mobile-icon-down').css({'display':'flex'});
// 			$(this).hide();
// 		});
// 		$('.priceList-mobile-icon-down').click(function () {
// 			$(this).closest( ".priceList-mobile-item" ).find('.priceList-mobile-info').slideUp();
// 			$(this).closest( ".priceList-mobile-item" ).find('.priceList-mobile-icon-right').css({'display':'flex'});
// 			$(this).hide();
// 		});
// 	}
// 	priceList();
// 	$(window).on('resize', function() {
// 		banner();
//    	}).trigger('resize');

// 	// $(window).on('load', function() {
// 	//    parallax();
// 	//    popupshow();
// 	// });
// });