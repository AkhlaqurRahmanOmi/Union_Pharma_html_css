'use strict';
jQuery(function($) {
	$('form.quform').Quform();

	// Tooltips
	if(window.tippy) {
		$('.quform-tooltip').each(function () {
			tippy(this, {
				theme: 'quform'
			});
		});
	}

	// Changes subject to a text field when 'Other' is chosen
	$('#subject').replaceSelectWithTextInput({ onValue: 'Other' });
});

(function ($) {
	$(window).on('load', function () {
		// Preload images
		var images = [
			'quform/images/close.png',
			'quform/images/success.png',
			'quform/images/error.png',
			'quform/images/default-loading.gif'
		];

		// Preload images for any active themes
		if ($('.quform-theme-light-light, .quform-theme-light-rounded').length) {
			images = images.concat([
				'quform/themes/light/images/button-active-bg-rep.png',
				'quform/themes/light/images/close.png',
				'quform/themes/light/images/input-active-bg-rep.png'
			]);
		}

		if ($('.quform-theme-dark-dark, .quform-theme-dark-rounded').length) {
			images = images.concat([
				'quform/themes/dark/images/button-active-bg-rep.png',
				'quform/themes/dark/images/close.png',
				'quform/themes/dark/images/input-active-bg-rep.png',
				'quform/themes/dark/images/loading.gif'
			]);
		}

		if ($('.quform-theme-minimal-light').length) {
			images = images.concat([
				'quform/themes/minimal/images/close-light.png'
			]);
		}

		if ($('.quform-theme-minimal-dark').length) {
			images = images.concat([
				'quform/themes/minimal/images/close-dark.png',
				'quform/themes/minimal/images/loading-dark.gif'
			]);
		}

		$.preloadImages(images);
	});
})(jQuery);
