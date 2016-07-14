;(function(window, document, undefined){

	'use strict';

	var center, 
		layers = [], 
		bounds,
		x = 0,
		y = 0,
		mx = 0,
		my = 0,
		vx = 0,
		vy = 0,
		levels = [0.1, 0.2, 0.5, 0.6, 0.9, 1];

	function Icons(){
		for(var i=0; i<levels.length; i++){
			layers.push([].slice.call(document.querySelectorAll('.layer[data-level="'+levels[i]+'"]')));
		}
		bounds = document.getElementById('icons').getBoundingClientRect();
		center = {x: window.innerWidth * 0.5, y: window.innerHeight * 0.5}

		this.onMouseMove = this.onMouseMove.bind(this);
    this.onDeviceOrientation = this.onDeviceOrientation.bind(this);
    this.enable = this.enable.bind(this);
    this.animate = this.animate.bind(this);
	}

	Icons.prototype.enable = function(){
		window.addEventListener('mousemove', this.onMouseMove);
		window.addEventListener('deviceorientation', this.onDeviceOrientation);
		this.raf = requestAnimationFrame(this.animate);
	};

	Icons.prototype.disable = function(){
		window.removeEventListener('mousemove', this.onMouseMove);
		window.removeEventListener('deviceorientation', this.onDeviceOrientation);
		cancelAnimationFrame(this.raf);
	};
	
	Icons.prototype.onMouseMove = function(ev){
		x = (ev.clientX - center.x) / center.x;
		y = (ev.clientY - center.y) / center.y;		
	};

	Icons.prototype.animate = function(){
		mx = x * bounds.width * 0.1;
		my = y * bounds.height * 0.1;
		vx += (mx - vx) * 0.1;
		vy += (my - vy) * 0.1;

		for(var i=0; i<layers.length; i++){
			for(var j=0; j<layers[i].length; j++){
				layers[i][j].style.transform = 'translate3d('+ (-vx*levels[i]) +'px, '+ (-vy*levels[i]) +'px , 0)';
			}
		}
		this.raf = requestAnimationFrame(this.animate);
	}

	Icons.prototype.onDeviceOrientation = function(ev){
		if (window.innerHeight > window.innerWidth){
			y = ev.beta/30;
    	x = ev.gamma/30;
		} else {
			x = ev.beta/30;
    	y = ev.gamma/30;
		}
	};

	window['Icons'] = Icons;

})(window, document);