(function() {
	var fn = {};

// settings
	var container = document.querySelector('.main'),
			introLink = document.querySelector('.intro_link'),
			menuBtns = [].slice.call(document.querySelectorAll('.menu_item')),
			animationTime = 1000,
			easing = 'ease';
//
	var lastScroll = 0,
			index = 0,
			reveal = false;
			quietPeriod = 100;

	var logo = document.querySelector('.logo_wrapper'),
		logomain = document.querySelector('.logo'),
		svg = document.querySelector('.logo svg'),
		introText = document.querySelector('.intro_text').children,
		projects = [].slice.call(document.querySelectorAll('.proj_list li')),
		introBorder = document.querySelector('.intro_border'),
		menu = document.querySelector('.menu'),
		paths = [].slice.call(document.querySelectorAll('.shape path')),
		shapes = [].slice.call(document.querySelectorAll('.shape')),
		left = [].slice.call(document.querySelectorAll('.left .shape')),
		right = [].slice.call(document.querySelectorAll('.right .shape')),
		rotate,
		count = 0;

	var parallax = new Parallax(document.getElementById("icons"), {
	  scalarX: 6,
	  scalarY: 6,
	  frictionX: 0.5,
	  frictionY: 0.5,
	  originX: 0,
	  originY: 0.5
	});

	parallax.disable();

	shuffle(paths);
	function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
	}

	// intro animation
	TweenMax.staggerFrom(paths, .5, {opacity: 0, ease: Back.easeIn }, 0.03);
	TweenMax.staggerFrom(introText, 1.5, {y: +200, opacity: 0}, 0.1);
	// TweenLite.from(introBorder, 1, {height: 0});

	var transformCSS = function(pos, time, easing){
		return "-webkit-transform: translate3d(0, " + pos + "%, 0); -webkit-transition: -webkit-transform " + time + "ms " + easing + "; -moz-transform: translate3d(0, " + pos + "%, 0); -moz-transition: -moz-transform " + time + "ms " + easing + "; -ms-transform: translate3d(0, " + pos + "%, 0); -ms-transition: -ms-transform " + time + "ms " + easing + "; transform: translate3d(0, " + pos + "%, 0); transition: transform " + time + "ms " + easing + ";";
	}

	var scrollDown = function(index){
		container.style.cssText = transformCSS(-100*index, animationTime, easing);
		menuBtns.forEach(function(el, i){
			i===index ? el.classList.add('active') : el.classList.remove('active');
		});
		fn["section"+index]();
	}

	

	var scaleLogo = new TimelineLite({paused: true, onReverseComplete: function(){
		TweenLite.set(logomain, {clearProps: 'all'});
		TweenLite.set(logo, {clearProps: 'all'});
		TweenLite.set(svg, {clearProps: 'all'});
	}});

	scaleLogo
		.to(logomain, 0.8, {width: 'auto', height: 'auto', cursor: 'pointer', className:'+=small'})
		.to(logo, 0.8, {top: '20px', left: '20px', transform: 'none' }, 0)
		.to(svg, 0.8, {width: 80, height: 80}, 0);

	fn.section0 = function(){
		parallax.disable();
		scaleLogo.reverse();
		logo.addEventListener('mouseover', logoMouseOver);
		logo.addEventListener('mouseout', logoMouseOut);
		logo.addEventListener('mousemove', logoMouseMove);
	}

	fn.section1 = function(){
		parallax.disable();
		scaleLogo.play();
		logo.removeEventListener('mouseover', logoMouseOver);
		logo.removeEventListener('mouseout', logoMouseOut);
		logo.removeEventListener('mousemove', logoMouseMove);		
		TweenMax.staggerFrom(projects, .75, {y:'+=500', opacity: 0}, 0.05);
	}

	fn.section2 = function(){
		parallax.enable();
	}

	fn.section3 = function(){
		parallax.disable();
	}

	document.addEventListener('mousewheel', function(ev){
		var delta = ev.wheelDelta || -ev.detail,
			timeNow = new Date().getTime();

		if(timeNow - lastScroll < quietPeriod + animationTime) {
			ev.preventDefault();
			return;
		}

		if (delta < 0) {
			if (index !== 3) index += 1;
		} else {
			if (index !== 0) index -= 1;
		}

		scrollDown(index);
		lastScroll = timeNow;
	});

	introLink.addEventListener('click', function(ev){ scrollDown(1); });
	menuBtns.forEach(function(el, i){
		el.addEventListener('click', function(ev){ ev.preventDefault(); scrollDown(i); });
	})

	
	shuffle(paths);
	function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
	}

	var rand = function() {
    return Math.random()*3+1;
	}	

	logo.addEventListener('mouseover', logoMouseOver);
	logo.addEventListener('mouseout', logoMouseOut);
	logo.addEventListener('mousemove', logoMouseMove);

	function logoMouseOver(){
		left.forEach(function(el){
			TweenLite.to(el, 0.5,
				{x: -rand()*30, scale: rand(), svgOrigin:'125 125', ease: Expo.easeOut},
				0
			);
		});
		right.forEach(function(el){
			TweenLite.to(el, 0.5,
				{x: rand()*30, scale: rand(), svgOrigin:'125 125', ease: Expo.easeOut},
				0
			);
		});
		rotate = TweenMax.to(paths, 30,
			{rotation: 360, transformOrigin:'center center', repeat: -1, ease: Power0.easeNone}
		);
	}

	function logoMouseOut(){
		TweenLite.to(shapes, 0.5,
			{x: 0, scale: 1, ease: Expo.easeIn, clearProps: "transform", overwrite: true}
		);
		TweenLite.to(paths, 0.5,
			{directionalRotation:"0_short"}
		);
		rotate.kill();
	}

	function logoMouseMove(){
		count++;
		if (count > 70){
			left.forEach(function(el){
				TweenLite.to(el, 1,
					{x: -rand()*30, scale: rand(), svgOrigin:'125 125', ease: Expo.easeOut},
					0
				);
			});
			right.forEach(function(el){
				TweenLite.to(el, 1,
					{x: rand()*30, scale: rand(), svgOrigin:'125 125', ease: Expo.easeOut},
					0
				);
			});
			count = 0;
		}
	}

	[].slice.call( document.querySelectorAll( '.contact_field' ) ).forEach( function( inputEl ) {
			// in case the input is already filled..
			if( inputEl.value.trim() !== '' ) {
				inputEl.parentNode.classList.add('filled');
			}

			// events:
			inputEl.addEventListener( 'focus', onInputFocus );
			inputEl.addEventListener( 'blur', onInputBlur );
		} );

		function onInputFocus( ev ) {
			ev.target.parentNode.classList.add('filled');
		}

		function onInputBlur( ev ) {
			if( ev.target.value.trim() === '' ) {
				ev.target.parentNode.classList.remove('filled');
			}
		}

	// var lastpos = {};	
	// 	if (!lastpos.x) {
	// 		lastpos.x = ev.clientX;
	// 		lastpos.y = ev.clientY;
	// 	}
	// 	var x = lastpos.x - ev.clientX,
	// 			y = lastpos.y - ev.clientY;
	// 	left.forEach(function(el){
	// 		var scale = el._gsTransform.scaleX;
	// 		TweenLite.set(el, {x: '+='+x*scale/10, y: '+='+y*scale/10} );
	// 	});

	// 	right.forEach(function(el){
	// 		var scale = el._gsTransform.scaleX;
	// 		TweenLite.set(el, {x: '-='+x*scale/10, y: '+='+y*scale/10} );
	// 	});
	// 	lastpos = {x: ev.clientX, y: ev.clientY};
	
}());