;(function(window, document, undefined){

	'use strict';
	var x, y, raf;

	function ImgTilt(){
		this.layers = [].slice.call(document.querySelectorAll('.intro_bgImg.top'));
		this.left = this.layers[0].getBoundingClientRect().left;
		this.top = this.layers[0].getBoundingClientRect().top;
		this.width = this.layers[0].offsetWidth;
		this.height = this.layers[0].offsetHeight;

		this.onMouseMove = this.onMouseMove.bind(this);
    this.onDeviceOrientation = this.onDeviceOrientation.bind(this);
    this.mCoords = this.mCoords.bind(this);
    this.dCoords = this.dCoords.bind(this);
	}

	ImgTilt.prototype.mCoords = function(par, dim, pos, i){
		return 2*((i+1)*par/this.layers.length)/dim*pos - ((i+1)*par/this.layers.length);
	};

	ImgTilt.prototype.dCoords = function(par, pos, i){
		return pos/par*(i+1);
	};

	ImgTilt.prototype.enable = function(){
		window.addEventListener('mousemove', this.onMouseMove);
		window.addEventListener('deviceorientation', this.onDeviceOrientation);
	};

	ImgTilt.prototype.disable = function(){
		window.removeEventListener('mousemove', this.onMouseMove);
		window.removeEventListener('deviceorientation', this.onDeviceOrientation);
		cancelAnimationFrame(raf);
	};
	
	ImgTilt.prototype.onMouseMove = function(ev){
		var self = this;

		raf = requestAnimationFrame(function(){
			x = ev.clientX - self.left;
			y = ev.clientY - self.top;
			var w = self.width,
				h = self.height,
				coords = self.mCoords;

			for(var i=0; i<self.layers.length; i++){
				self.layers[i].style.transform = 'perspective(700px) translate3d(' + coords(-15, w, x, i) + 'px,' + coords(-15, h, y, i) + 'px,' + coords(10, h, y, i) + 'px) rotate3d(1,0,0,' + coords(2, h, y, i) + 'deg) rotate3d(0,1,0,' + coords(10, w, x, i) + 'deg)';
			}	
		});
	};

	ImgTilt.prototype.onDeviceOrientation = function(ev){
		var self = this;

		raf = requestAnimationFrame(function(){
			var x = ev.beta,
				y = ev.gamma,
				z = ev.alpha,
				coords = self.dCoords;

			for(var i=0; i<self.layers.length; i++){
				self.layers[i].style.transform = 'perspective(700px) translate3d(' + coords(10, x, i) + 'px,' + coords(10, y, i) + 'px,' + coords(10, z, i) + 'px) rotate3d(1,0,0,' + x*(i+1)/10 + 'deg) rotate3d(0,1,0,' + y*(i+1)/10 + 'deg)';
			}
		});
	};

	ImgTilt.prototype.resize = function(){
		this.width = this.layers[0].offsetWidth;
		this.height = this.layers[0].offsetHeight;
	}

	window['ImgTilt'] = ImgTilt;

})(window, document);