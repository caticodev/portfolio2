;(function(window, document, undefined){

	'use strict';

	var count = 0,
		rotate, logo, wrapper, svg, shapes, left, right, paths, interval;

	function Logo(){
		logo = document.querySelector('.logo.desktop');
		wrapper = document.querySelector('.logo.desktop .logo_wrapper');
		svg = document.querySelector('.logo.desktop svg');
		shapes = [].slice.call(document.querySelectorAll('.logo.desktop .shape'));
		left = [].slice.call(document.querySelectorAll('.logo.desktop .left .shape'));
		right = [].slice.call(document.querySelectorAll('.logo.desktop .right .shape'));
		paths = [].slice.call(document.querySelectorAll('.logo.desktop .shape path'));

		this.intro = this.intro.bind(this);
		this.resize = this.resize.bind(this);
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

	Logo.prototype.resize = function(){
		if (this.scale) this.scale.kill();

		this.scale = new TimelineLite({paused: true, 
			// onComplete: function(){
			// 	TweenLite.set(logo, {width: 'auto', height: 'auto', cursor: 'pointer'});
			// },
			onReverseComplete: function(){
				TweenLite.set(logo, {clearProps: 'all'});
				TweenLite.set(wrapper, {clearProps: 'all'});
				TweenLite.set(svg, {clearProps: 'all'});
		}});

		this.scale
			.to(logo, 0.8,
				// {width: '100%', height: '90%', cursor: 'auto'}, 
				{width: 'auto', height: 'auto', cursor: 'pointer'}, 
				0)
			.to(wrapper, 0.8,
				// {top: '15%', left: '50%', x: '-50%'}, 
				{top: '20px', left: '20px', x: '0%'}, 
				0)
			.to(svg, 0.8,
				// {width: '41vh', height: '41vh', fill: 'url(.#g443)', stroke: 'url(.#g443)', strokeOpacity: '0.3'}, 
				{width: 80, height: 80, fill: 'white', stroke: 'white', strokeOpacity: '0.9'}, 
				0);
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

	Logo.prototype.enableHover = function(){
		wrapper.addEventListener('mouseover', this.logoMouseOver);
		wrapper.addEventListener('mouseout', this.logoMouseOut);
	};

	Logo.prototype.disableHover = function(){
		wrapper.removeEventListener('mouseover', this.logoMouseOver);
		wrapper.removeEventListener('mouseout', this.logoMouseOut);
		this.logoMouseOut();
	};

	Logo.prototype.intro = function(){
		shuffle(paths);
		TweenMax.staggerFrom(paths, 0.3, {opacity: 0, ease: Circ.easeIn }, 0.01);
	};

	window['Logo'] = Logo;

})(window, document);