;(function(window, document, undefined){

	'use strict';

	var container = document.querySelector('.main'),
		wrapper = document.querySelector('.wrapper'),
		menuBtns = [].slice.call(document.querySelectorAll('.menu_btn')),
		introLink = document.querySelector('.intro_link'),
		logoLink = document.querySelector('.logo'),
		animationTime = 1000,
		lastScroll = 0, index = 0, quietPeriod = 100, start;

	function AutoScroll(fn){
		this.fn = fn;
		this.currentSec = 0
		introLink.addEventListener('click', function(ev){ scrollLink(ev, this, 1); });
		for (var i=0; i<menuBtns.length; i++){
			menuBtns[i].addEventListener('click', function(ev){ scrollLink(ev, this, i); });
		}
		logoLink.addEventListener('click', function(ev){ ev.preventDefault(); scrollDown(0); });
		devSpecFunc();

		scrollDown = scrollDown.bind(this);
		onScroll = onScroll.bind(this);
		swipe = swipe.bind(this);
	}

	function devSpecFunc(){
		if (mobile){
			wrapper.addEventListener('scroll', mobileBtns);
		} else {
			document.addEventListener('mousewheel', onScroll);
			document.addEventListener('DOMMouseScroll', onScroll);
			document.addEventListener("touchstart",  onTouch);
		}
	}

	function scrollLink(ev, el, no){
		ev.preventDefault(); 
		mobile ? mobileScroll(el) : scrollDown(no);
	}

	function mobileBtns(){
		for (var i=0; i<menuBtns.length; i++){
			menuBtns[i].classList.remove('active');
		}
		for (var i=0; i<menuBtns.length; i++){
			if (i===3) { menuBtns[i].classList.add('active'); break; }
			if (wrapper.scrollTop < document.querySelector(menuBtns[i+1].getAttribute('href')).offsetTop) {
				menuBtns[i].classList.add('active');
				break;
			}
		}
	}

	function mobileScroll(el){
		TweenLite.to(wrapper, 1, {
			scrollTo: {y: document.querySelector(el.getAttribute('href')).offsetTop}, 
			ease: Circ.easeOut
		});
	}

	function onTouch(ev){
		start = ev.touches[0].pageY;
		document.addEventListener("touchmove", swipe);
	}

	function swipe(ev){
		var delta = start - ev.touches[0].pageY;
		console.log(delta);

		if (delta > 0){
			if (index !== 3) index += 1;
		} else {
			if (index !== 0) index -= 1;
		}

		if (index !== this.currentSec) scrollDown(index);
		document.removeEventListener("touchmove", swipe);
	}
	
	function onScroll(ev){
		ev.preventDefault();
		
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

		if (index !== this.currentSec) scrollDown(index);
		lastScroll = timeNow;
	}

	var scrollDown = function(no){
		this.fn["leaveSec"+this.currentSec]();
		TweenLite.to(container, 1, {y: -100*no + '%', ease:Circ.easeOut});
		menuBtns.forEach(function(el, i){
			i === no ? el.classList.add('active') : el.classList.remove('active');
		});
		this.fn["enterSec"+no]();
		this.currentSec = no;
		index = no;
	};

	AutoScroll.prototype.resize = function(){
		wrapper.removeEventListener('scroll', mobileBtns);
		document.removeEventListener('mousewheel', onScroll);
		document.removeEventListener('DOMMouseScroll', onScroll);
		document.removeEventListener("touchstart",  onTouch);
		devSpecFunc();
	};

	window['AutoScroll'] = AutoScroll;

})(window, document);