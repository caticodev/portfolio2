(function() {
	var fn = {},
		logo = new Logo(),
		iconspar = new Icons(),
		scroll = new AutoScroll()
		// parallax = new Parallax(document.getElementById('icons')),
		imgTilt = new ImgTilt();
	
	logo.enableHover();
	logo.resize();
	imgTilt.enable();

	window.addEventListener('resize', function(){
		logo.resize();
		imgTilt.resize();
		scroll.resize();
	});

// loading
	window.addEventListener('load', function(){
		var loader = document.querySelector('.loader'),
			circle = document.querySelector('.loader_circle'),
			img = document.querySelector('.loader_img'),
			start = new TimelineMax();

		start
			.set(img, {display: 'none', delay: 2})
			.to(circle, 0.5, {scale: 0, ease: Expo.easeOut})
			.set(loader, {display: 'none'})
			.addCallback(logo.intro, 2)
			.addCallback(animIntro, 2)
	});
//

// intro animation
	var introText = [].slice.call(document.querySelectorAll('.intro_title, .intro_subtitle, .intro_link'));

	function animIntro(){
		TweenMax.staggerFrom(introText, 1, {y: +300, opacity: 0, ease: Expo.easeOut}, 0.1);
	}
//




//auto scroll
	// var container = document.querySelector('.main'),
	// 		wrapper = document.querySelector('.wrapper'),
	// 		menuBtns = [].slice.call(document.querySelectorAll('.menu_btn')),
	// 		introLink = document.querySelector('.intro_link'),
	// 		logoLink = document.querySelector('.logo'),
	// 		animationTime = 1000,
	// 		lastScroll = 0, currentSec = 0, index = 0, quietPeriod = 100;

	// if (mobile){
	// 	iconspar.enable();
	// 	introLink.addEventListener('click', mobileScroll);
	// 	menuBtns.forEach(function(el, i){
	// 		el.addEventListener('click', mobileScroll);
	// 	});
	// 	wrapper.addEventListener('scroll', function(ev){
	// 		menuBtns.forEach(function(el, i){
	// 			el.classList.remove('active');
	// 		});	
	// 		if (wrapper.scrollTop < document.querySelector(menuBtns[1].getAttribute('href')).offsetTop) {
	// 			menuBtns[0].classList.add('active');	
	// 		} else if (wrapper.scrollTop < document.querySelector(menuBtns[2].getAttribute('href')).offsetTop) {
	// 			menuBtns[1].classList.add('active');
	// 		} else if (wrapper.scrollTop < document.querySelector(menuBtns[3].getAttribute('href')).offsetTop) {
	// 			menuBtns[2].classList.add('active');
	// 		} else {
	// 			menuBtns[3].classList.add('active');
	// 		}
	// 	})
	// } else {
	// 	document.addEventListener('mousewheel', onScroll);
	// 	document.addEventListener('DOMMouseScroll', onScroll);
	// 	document.addEventListener("touchstart",  onTouch);
	// 	introLink.addEventListener('click', function(ev){ ev.preventDefault(); scrollDown(1); });
	// 	logoLink.addEventListener('click', function(ev){ ev.preventDefault(); scrollDown(0); });
	// 	menuBtns.forEach(function(el, i){
	// 		el.addEventListener('click', function(ev){ ev.preventDefault(); scrollDown(i); });
	// 	});
	// }

	// function mobileScroll(ev){
	// 	ev.preventDefault();
	// 	pos = document.querySelector(this.getAttribute('href')).offsetTop;
	// 	TweenLite.to(wrapper, 1, {scrollTo: {y: pos}, ease: Circ.easeOut});
	// }

	// var start;

	// function onTouch(ev){
	// 	start = ev.touches[0].pageY;
	// 	document.addEventListener("touchmove", swipe);
	// }

	// function swipe(ev){
	// 	var delta = start - ev.touches[0].pageY;
	// 	console.log(delta);

	// 	if (delta > 0){
	// 		if (index !== 3) index += 1;
	// 	} else {
	// 		if (index !== 0) index -= 1;
	// 	}

	// 	if (index !== currentSec) scrollDown(index);
	// 	document.removeEventListener("touchmove", swipe);
	// }
	
	// function onScroll(ev){
	// 	ev.preventDefault();
		
	// 	var delta = ev.wheelDelta || -ev.detail,
	// 			timeNow = new Date().getTime();

	// 	if(timeNow - lastScroll < quietPeriod + animationTime) {
	// 		ev.preventDefault();
	// 		return;
	// 	}

	// 	if (delta < 0) {
	// 		if (index !== 3) index += 1;
	// 	} else {
	// 		if (index !== 0) index -= 1;
	// 	}

	// 	if (index !== currentSec) scrollDown(index);
	// 	lastScroll = timeNow;
	// }

	// var scrollDown = function(no){
	// 	fn["leaveSec"+currentSec]();
	// 	TweenLite.to(container, 1, {y: -100*no + '%', ease:Circ.easeOut});
	// 	menuBtns.forEach(function(el, i){
	// 		i === no ? el.classList.add('active') : el.classList.remove('active');
	// 	});
	// 	fn["enterSec"+no]();
	// 	currentSec = no;
	// 	index = no;
	// };
//

// section specific animations
	var projects = [].slice.call(document.querySelectorAll('.proj_list li')),
		menu = document.querySelector('.menu'),
		skills = [].slice.call(document.querySelectorAll('.skills_title, .skills_list li')),
		icons = [].slice.call(document.querySelectorAll('.skills_icon')),
		links = [].slice.call(document.querySelectorAll('.contact_title, .icons_el')),
		form = [].slice.call(document.querySelectorAll('.contact_input, .contact_submit'));

	shuffle(icons);

	fn.enterSec0 = function(){
		logo.scale.reverse();
		logo.enableHover();
		imgTilt.enable();
		animIntro();
	};

	fn.leaveSec0 = function(){
		logo.scale.play();
		logo.disableHover();
		imgTilt.disable();
	};

	fn.enterSec1 = function(){	
		TweenMax.staggerFrom(projects, 0.75, {y:'+=500', opacity: 0}, 0.05);
	};

	fn.leaveSec1 = function(){
	};

	fn.enterSec2 = function(){
		TweenMax.staggerFrom(skills, 1, {x: '-=500', opacity: 0, ease: Circ.easeOut}, 0.05);
		TweenMax.staggerFrom(icons, 1, {scale: 0, ease: Back.easeOut}, 0.05);
		iconspar.enable();
	};

	fn.leaveSec2 = function(){
		iconspar.disable();
	};

	fn.enterSec3 = function(){
		TweenMax.staggerFrom(links, 1, {y: '+=500', opacity: 0, ease: Circ.easeOut}, 0.1);
		TweenMax.staggerFrom(form, 1, {y: '+=500', opacity: 0, ease: Circ.easeOut, clearProps: 'all'}, 0.1);
	};

	fn.leaveSec3 = function(){
		setTimeout(function(){
			document.querySelector('.contact_overlay').classList.remove('done');
		}, 1000);
	};
//
}());