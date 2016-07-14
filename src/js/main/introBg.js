;(function(window, document, undefined){

	'use strict';
	var x, y;

	function ImgTilt(element){
		this.layers = element;
		this.left = this.layers[0].getBoundingClientRect().left;
		this.top = this.layers[0].getBoundingClientRect().top;
		this.width = this.layers[0].offsetWidth;
		this.height = this.layers[0].offsetHeight;

		this.onMouseMove = this.onMouseMove.bind(this);
    this.onDeviceOrientation = this.onDeviceOrientation.bind(this);
    this.mCoords = this.mCoords.bind(this);
    this.animate = this.animate.bind(this);
	}

	ImgTilt.prototype.mCoords = function(par, dim, pos, i){
		return 2*((i+1)*par/this.layers.length)/dim*pos - ((i+1)*par/this.layers.length);
	};

	ImgTilt.prototype.dCoords = function(par, pos, i){
		return pos/par*(i+1);
	};

	ImgTilt.prototype.enable = function(){
		window.addEventListener('mousemove', this.onMouseMove);
		// window.addEventListener('deviceorientation', this.onDeviceOrientation);
		this.raf = requestAnimationFrame(this.animate);
	};

	ImgTilt.prototype.disable = function(){
		window.removeEventListener('mousemove', this.onMouseMove);
		// window.removeEventListener('deviceorientation', this.onDeviceOrientation);
		cancelAnimationFrame(this.raf);
	};
	
	ImgTilt.prototype.onMouseMove = function(ev){
		x = ev.clientX - this.left;
		y = ev.clientY - this.top;
			// w = this.width,
			// h = this.height,
			// coords = this.mCoords;
	};

	ImgTilt.prototype.onDeviceOrientation = function(ev){
		var x = ev.beta,
			y = ev.gamma,
			z = ev.alpha,
			coords = this.dCoords;

		for(var i=0; i<this.layers.length; i++){
			this.layers[i].style.transform = 'perspective(700px) translate3d(' + coords(10, x, i) + 'px,' + coords(10, y, i) + 'px,' + coords(10, z, i) + 'px) rotate3d(1,0,0,' + x*(i+1)/10 + 'deg) rotate3d(0,1,0,' + y*(i+1)/10 + 'deg)';
		}
	};

	ImgTilt.prototype.animate = function(){
		var w = this.width,
			h = this.height,
			coords = this.mCoords;

		for(var i=0; i<this.layers.length; i++){
			this.layers[i].style.transform = 'perspective(700px) translate3d(' + coords(-15, w, x, i) + 'px,' + coords(-15, h, y, i) + 'px,' + coords(10, h, y, i) + 'px) rotate3d(1,0,0,' + coords(2, h, y, i) + 'deg) rotate3d(0,1,0,' + coords(10, w, x, i) + 'deg)';
		}	
		this.raf = requestAnimationFrame(this.animate);
	}

	window['ImgTilt'] = ImgTilt;

})(window, document);