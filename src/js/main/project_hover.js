(function() {
	if (!mobile){
		var getDirection = function (ev, obj) {
			var x = ev.pageX,
					y = ev.pageY,
					top = obj.offsetTop,
					left = obj.offsetLeft,
					w = obj.offsetWidth,
					h = obj.offsetHeight;

			var val = { 
				top: Math.abs(y - top),
				right: Math.abs(x - left - w),
				bottom: Math.abs(y - top - h),
				left: Math.abs(x - left) 
			}
			return Object.keys(val).reduce(function(a, b){ return val[a] < val[b] ? a : b });
		};

		[].slice.call(document.querySelectorAll('.proj li')).forEach(function (el) {
			
				el.addEventListener('mouseenter', function (ev) {
					el.className ='in-' + getDirection(ev, this);
					// animateEls(el);
				});

				el.addEventListener('mouseleave', function (ev) {
					el.className ='out-' + getDirection(ev, this);
				});
			
		});

		function animateEls(el){
			TweenMax.staggerFrom(el.children[1].children[2].children, 0.5, 
				{x: 135, ease: Back.easeOut.config(15), delay: 0.3}, 0.2);
		}
	}
}());