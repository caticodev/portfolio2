;(function(window, document, undefined){

	'use strict';

	var count = 0,
		rotate, logo, wrapper, svg, shapes, left, right, paths, interval;

	function Logo(){
		logo = document.querySelector('.logo');
		wrapper = document.querySelector('.logo_wrapper');
		svg = document.querySelector('.logo svg');
		shapes = [].slice.call(document.querySelectorAll('.shape'));
		left = [].slice.call(document.querySelectorAll('.left .shape'));
		right = [].slice.call(document.querySelectorAll('.right .shape'));
		paths = [].slice.call(document.querySelectorAll('.shape path'));

		this.scale = new TimelineLite({paused: true, onReverseComplete: function(){
			TweenLite.set(logo, {clearProps: 'all'});
			TweenLite.set(wrapper, {clearProps: 'all'});
			TweenLite.set(svg, {clearProps: 'all'});
		}});

		this.scale
			.to(logo, 0.8, {width: 'auto', height: 'auto', cursor: 'pointer', className:'+=small'})
			.to(wrapper, 0.8, {top: '20px', left: '20px', transform: 'none' }, 0)
			.to(svg, 0.8, {width: 80, height: 80}, 0);

		this.intro = this.intro.bind(this);
	}

	var rand = function() {
	  return Math.random()*3+1;
	};	

	Logo.prototype.logoMouseOver = function(){
		animTriangles();
		interval = setInterval(animTriangles, 2500);
		rotate = TweenMax.to(paths, 30,
			{rotation: 360, transformOrigin:'center center', repeat: -1, ease: Power0.easeNone}
		);
	};

	Logo.prototype.logoMouseOut = function(){
		TweenLite.to(shapes, 0.5,
			{x: 0, scale: 1, ease: Expo.easeIn, clearProps: "transform", overwrite: true}
		);
		TweenLite.to(paths, 0.5,
			{directionalRotation:"0_short"}
		);
		if (rotate) rotate.kill();
		clearInterval(interval);
	};

	function animTriangles(){
		for (var i = 0; i < left.length; i++){
			TweenLite.to(left[i], 1, {
				x: -rand()*30, 
				scale: rand(), 
				svgOrigin:'125 125', 
				ease: Expo.easeOut,
			}, 0);
		}
		for (var j = 0; j < right.length; j++){
			TweenLite.to(right[j], 1, {
				x: rand()*30, 
				scale: rand(), 
				svgOrigin:'125 125', 
				ease: Expo.easeOut
			}, 0);
		}
	}

	// Logo.prototype.logoMouseMove = function(){
	// 	count++;
	// 	if (count > 70){
	// 		for (var i = 0; i < left.length; i++){
	// 			TweenLite.to(left[i], 1,
	// 				{x: -rand()*30, scale: rand(), svgOrigin:'125 125', ease: Expo.easeOut},
	// 				0
	// 			);
	// 		}
	// 		for (var j = 0; j < right.length; j++){
	// 			TweenLite.to(right[j], 1,
	// 				{x: rand()*30, scale: rand(), svgOrigin:'125 125', ease: Expo.easeOut},
	// 				0
	// 			);
	// 		}
	// 		count = 0;
	// 	}
	// };

	Logo.prototype.enableHover = function(){
		wrapper.addEventListener('mouseover', this.logoMouseOver);
		wrapper.addEventListener('mouseout', this.logoMouseOut);
		// wrapper.addEventListener('mousemove', this.logoMouseMove);
	};

	Logo.prototype.disableHover = function(){
		wrapper.removeEventListener('mouseover', this.logoMouseOver);
		wrapper.removeEventListener('mouseout', this.logoMouseOut);
		// wrapper.removeEventListener('mousemove', this.logoMouseMove);
		this.logoMouseOut();
	};

	Logo.prototype.intro = function(){
		shuffle(paths);
		TweenMax.staggerFrom(paths, 0.3, {opacity: 0, ease: Circ.easeIn }, 0.01);
	};

	window['Logo'] = Logo;

})(window, document);