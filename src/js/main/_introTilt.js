var layers = [].slice.call(document.querySelectorAll('.intro_bgImg.top')),
		bLeft = layers[0].getBoundingClientRect().left,
		bTop = layers[0].getBoundingClientRect().top,
		w = layers[0].offsetWidth, 
		h = layers[0].offsetHeight,
		imgTilt = {},
		x, y;

function onMouseMove(ev){
	x = ev.clientX - bLeft;
	y = ev.clientY - bTop;
	layers.forEach(function(el, i){
		TweenLite.set(el, {
			transformPerspective: 700,
			x: mCoords(-15, w, x, i), 
			y: mCoords(-15, h, y, i), 
			z: mCoords(10, h, y, i), 
			rotationX: mCoords(2, h, y, i), 
			rotationY: mCoords(10, w, x, i)
		});
	});
}

function onDeviceOrientation(ev){
	x = ev.beta;
	y = ev.gamma;
	z = ev.alpha;

	layers.forEach(function(el, i){
		TweenLite.set(el, {
			transformPerspective: 700,
			x: dCoords(10, x, i), 
			y: dCoords(10, y, i), 
			z: dCoords(10, z, i), 
			rotationX: x*(i+1)/10, 
			rotationY: y*(i+1)/10,
		});
	});
}

function mCoords(par, dim, pos, i){
	return 2*((i+1)*par/layers.length)/dim*pos - ((i+1)*par/layers.length);
}

function dCoords(par, pos, i){
	return pos/par*(i+1);
}

imgTilt.enable = function(){
	window.addEventListener('mousemove', onMouseMove );
	window.addEventListener('deviceorientation', onDeviceOrientation);
}

imgTilt.disable = function(){
	window.removeEventListener('mousemove', onMouseMove );
	window.removeEventListener('deviceorientation', onDeviceOrientation);
}

imgTilt.enable();