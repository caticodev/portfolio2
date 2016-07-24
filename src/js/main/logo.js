;(function(window, document, undefined){

	'use strict';

	var count = 0,
		rotate, logo, wrapper, svg, shapes, left, right, paths, interval;

	function Logo(){
		logo = document.querySelector('.logo');
		wrapper = document.querySelector('.logo_wrapper');
		svg = document.querySelector('.logo svg');
		shapes = [].slice.call(document.querySelectorAll('.logo .shape'));
		left = [].slice.call(document.querySelectorAll('.logo .left .shape'));
		right = [].slice.call(document.querySelectorAll('.logo .right .shape'));
		paths = [].slice.call(document.querySelectorAll('.logo .shape path'));

		this.intro = this.intro.bind(this);
		this.resize = this.resize.bind(this);
		this.clearProps = this.clearProps.bind(this);
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
		this.scale = new TimelineLite({paused: true, 
			onReverseComplete: this.clearProps });

		this.scale
			.to(logo, 0.8,
				{width: 'auto', height: 'auto', cursor: 'pointer'}, 
				0)
			.to(wrapper, 0.8,
				{top: '20px', left: '20px', x: '0%'}, 
				0)
			.to(svg, 0.8, 
				{width: 80, height: 80, fill: 'white', stroke: 'white', strokeOpacity: '0.9'}, 
				0);
		
	};

	Logo.prototype.clearProps = function(){
		if (this.scale) this.scale.kill();
		TweenLite.set(logo, {clearProps: 'all'});
		TweenLite.set(wrapper, {clearProps: 'all'});
		TweenLite.set(svg, {clearProps: 'all'});
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
		TweenLite.set(logo, {className: '+=main'});
		TweenLite.set(paths, {opacity: 1});
		TweenMax.staggerFrom(paths, 0.5, {opacity: 0, ease: Back.easeIn }, 0.01);
	};

	Logo.prototype.loading = function(){
		shuffle(paths);
		TweenMax.staggerTo(paths, 0.3, {opacity: 1, ease: Circ.easeIn, yoyo: true, repeat: -1}, 0.03);
	};

	window['Logo'] = Logo;

})(window, document);