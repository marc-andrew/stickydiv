/*!
Sticky Div jQuery plugin.

Version 1.0.0
Full source at https://github.com/marc-andrew/stickydiv
Demo at http://marcandrew.net/stickydiv

MIT License (http://www.opensource.org/licenses/mit-license.html)
*/

;(function($){

	$.fn.stickydiv = function(){

		/**
		 * Start Sticky Div
		 */

		return this.each(function() {

			var stickyWrapper	 = $(this),
				scrollPos		 = 0,
				lastScrollPos	 = 0,
				lastTopPos		 = 0,
				lastDownPos		 = 0,
				spacing			 = 0,
				thresholdUp		 = 0,
				thresholdDown	 = 0,
				newThresholdUp	 = 0,
				newThresholdDown = 0;

			$(window).scroll(function() {
				var baseScrollPos		= $(this).scrollTop(),
					stickyWrapperHeight = stickyWrapper.height(),
					windowHeight		= $(window).height(),
					mainHeight			= $('#main').height(),
					threshold			= stickyWrapperHeight - windowHeight;

				// Check if parents exiest and get the height of each one
				if(stickyWrapper.parent().prev().length) {
					stickyWrapper.parent().prevAll(":visible").each(function(){
						spacing = $(this).outerHeight();
					});
				}

				// Change scroll position if parents exiest, if not spacing will stay as 0
				scrollPos = baseScrollPos - spacing;

				if(threshold > 0) {
				// If sticky wrapper is bigger than the window
					if(scrollPos > lastScrollPos) {
						/* **************** Scroll down **************** */

						var maxScrollDown = mainHeight - (stickyWrapperHeight - threshold);

						if(scrollPos >= 0 && scrollPos < maxScrollDown) {

							if(thresholdUp > 0 && thresholdUp < threshold) {
								newThresholdDown = thresholdUp;
							} else {
								newThresholdDown = threshold;
							}

							if(thresholdDown < newThresholdDown) {
								// threshold up not passed

								stickyWrapper.removeClass('sticky').css({
									'position' : 'absolute',
									'top' : lastTopPos,
									'bottom' : 'auto'
								});

								thresholdDown = scrollPos - lastTopPos;
							} else {
								// THRESHOLD PASSED

								stickyWrapper.addClass('sticky').css({
									'position' : 'fixed',
									'top' : 'auto',
									'bottom' : 0
								});

								thresholdDown = threshold;
							}

							thresholdUp = 0;
							lastDownPos = scrollPos;
						} else if(scrollPos >= maxScrollDown) {
							/* ***************** End Scroll down ***************** */

							stickyWrapper.removeClass('sticky').css({
								'position' : 'absolute',
								'top' : 'auto',
								'bottom' : 0
							});

							thresholdUp = 0;
							lastDownPos = maxScrollDown;
						}
					} else {
						/* ***************** Scroll up ***************** */

						var maxScrollUp = mainHeight - (stickyWrapperHeight);

						if(scrollPos >= 0 && scrollPos < maxScrollUp) {

							if(thresholdDown > 0 && thresholdDown < threshold) {
								newThresholdUp = thresholdDown;
							} else {
								newThresholdUp = threshold;
							}

							if(thresholdUp < newThresholdUp) {
								// Threshold up not passed

								stickyWrapper.removeClass('sticky').css({
									'position' : 'absolute',
									'top' : lastDownPos - threshold,
									'bottom' : 'auto'
								});

								thresholdUp = lastDownPos - scrollPos;
							} else {
								// THRESHOLD PASSED

								stickyWrapper.addClass('sticky').css({
									'position' : 'fixed',
									'top' : 0,
									'bottom' : 'auto'
								});

								thresholdUp = threshold;
							}

							thresholdDown = 0;
							lastTopPos = scrollPos;
						} else if(scrollPos <= 0) {
							/* ***************** End Scroll up ***************** */

							stickyWrapper.removeClass('sticky').css({
								'position' : 'static',
								'top' : 'auto',
								'bottom' : 'auto'
							});

							lastTopPos = 0;
							lastDownPos = 0;
							thresholdUp = 0;
						}
					}
				} else {
				// If sticky wrapper is smaller than the window
					if(scrollPos > 0) {
						/* **************** Scroll down **************** */

						stickyWrapper.addClass('sticky').css({
							'position' : 'fixed',
							'top' : 0,
							'bottom' : 'auto'
						});
					} else {
						/* ***************** End Scroll up ***************** */

						stickyWrapper.removeClass('sticky').css({
							'position' : 'static',
							'top' : 'auto',
							'bottom' : 'auto'
						});
					}
				}

				lastScrollPos = scrollPos;
			});

		});

	};

})(jQuery);