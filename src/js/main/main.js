(function() {
	var logo = new Logo();
	logo.loading();

// loading
	window.addEventListener('DOMContentLoaded', function(){
		var loader = document.querySelector('.loader'),
			circle = document.querySelector('.loader_circle'),
			menu = document.querySelector('.menu_wrapper'),
			img = document.querySelector('.loader_img'),
			start = new TimelineMax()
			
		start
			.to(circle, 0.5, {scale: 0, ease: Expo.easeOut, delay: 2})
			.set(loader, {display: 'none'})
			.set(menu, {zIndex: 5})
			.addCallback(logo.intro, 2)
			.addCallback(animIntro, 2)
			.addCallback(onResize, 2)		
	});
//

	var fn = {},
		iconspar = new Icons(),
		scroll = new AutoScroll(fn)
		imgTilt = new ImgTilt();
	
	imgTilt.enable();
	
	window.addEventListener('resize', onResize);

	function onResize(ev){
		width = window.innerWidth;
		height = window.innerHeight;
		mobile = (width < 769 || height < 601) ? true : false;

		imgTilt.resize();
		if (mobile) {
			if (!inputFocus) scroll.enableMobile();
			logo.disableHover();
			iconspar.enable();
			logo.clearProps();
		} else {
			scroll.enableDesktop();
			logo.resize();
			logo.enableHover();
			if (currentSec === 0){
				logo.scale.reverse();
			} else {
				logo.scale.play();
			}
		}
	}

// section specific animations
	var projects = [].slice.call(document.querySelectorAll('.proj_list li')),
		menu = document.querySelector('.menu'),
		introText = [].slice.call(document.querySelectorAll('.intro_title, .intro_subtitle, .intro_link')),
		arrows = [].slice.call(document.querySelectorAll('.intro_arrow')),
		skills = [].slice.call(document.querySelectorAll('.skills_title, .skills_list li')),
		icons = [].slice.call(document.querySelectorAll('.skills_icon')),
		links = [].slice.call(document.querySelectorAll('.contact_title, .icons_el')),
		form = [].slice.call(document.querySelectorAll('.contact_input, .contact_submit'));

	shuffle(icons);

	function animIntro(){
		TweenMax.staggerFrom(introText, 1, {y: +300, opacity: 0, ease: Expo.easeOut}, 0.1);
	}

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
		TweenMax.staggerFrom(skills, 1, {x: '-=500', opacity: 0, ease: Circ.easeOut, clearProps: 'transform'}, 0.05);
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