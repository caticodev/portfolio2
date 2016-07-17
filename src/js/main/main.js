(function() {
	var fn = {},
		logo = new Logo(),
		iconspar = new Icons(),
		scroll = new AutoScroll(fn)
		imgTilt = new ImgTilt();
	
	logo.enableHover();
	logo.resize();
	imgTilt.enable();
	if (mobile) iconspar.enable();
	
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
		TweenMax.staggerFrom(arrows, 0.5, {opacity: 0, repeat: -1, yoyo: true}, 0.6);
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