;(function(window, document, undefined){

	'use strict';

	var container = document.querySelector('.main'),
		wrapper = document.querySelector('.wrapper'),
		menuBtns = [].slice.call(document.querySelectorAll('.menu_btn')),
		introLink = document.querySelector('.intro_link'),
		logoLink = document.querySelector('.logo_wrapper'),

		animationTime = 1000,
		lastScroll = 0, index = 0, quietPeriod = 100, start;

	function AutoScroll(fn){
		this.fn = fn;
		introLink.addEventListener('click', function(ev){ scrollLink(ev, this, 1); });
		menuBtns.forEach(function(el, i){
			el.addEventListener('click', function(ev){ scrollLink(ev, this, i); });
		});
		logoLink.addEventListener('click', function(ev){ ev.preventDefault(); scrollDown(0); });

		scrollDown = scrollDown.bind(this);
		onScroll = onScroll.bind(this);
		swipe = swipe.bind(this);
	}

	function scrollLink(ev, el, no){
		ev.preventDefault(); 
		mobile ? mobileScroll(el) : scrollDown(no);
	}

	function mobileBtns(){
		for (var j=0; j<menuBtns.length; j++){
			menuBtns[j].classList.remove('active');
		}
		for (var i=0; i<menuBtns.length; i++){
			if (i===3) { menuBtns[i].classList.add('active'); currentSec = i; break; }
			if (wrapper.scrollTop < document.querySelector(menuBtns[i+1].getAttribute('href')).offsetTop - height/2) {
				menuBtns[i].classList.add('active');
				currentSec = i;
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

	var swipe = function(ev){
		var delta = start - ev.touches[0].pageY;

		if (delta > 0){
			if (index !== 3) index += 1;
		} else {
			if (index !== 0) index -= 1;
		}

		if (index !== currentSec) scrollDown(index);
		document.removeEventListener("touchmove", swipe);
	};
	
	var onScroll = function(ev){
		ev.preventDefault();

		index = currentSec;
		
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

		if (index !== currentSec) scrollDown(index);
		lastScroll = timeNow;
	};

	var scrollDown = function(no){
		this.fn["leaveSec"+currentSec]();
		// TweenLite.to(container, 1, {y: -100*no + '%', ease: Circ.easeOut});
		TweenLite.to(container, 1, {transform: 'translateY('+ -100*no + 'vh)', ease: Circ.easeOut});
		for (var i=0; i<menuBtns.length; i++){
			i === no ? menuBtns[i].classList.add('active') : menuBtns[i].classList.remove('active');
		}
		this.fn["enterSec"+no]();
		currentSec = no;
		index = no;
	};

	AutoScroll.prototype.enableMobile = function(){
		document.removeEventListener('mousewheel', onScroll);
		document.removeEventListener('DOMMouseScroll', onScroll);
		document.removeEventListener("touchstart",  onTouch);
		TweenLite.set(container, {y: '0%'});
		TweenLite.set(wrapper, {scrollTo: {y: document.querySelector(menuBtns[currentSec].getAttribute('href')).offsetTop}});
		wrapper.addEventListener('scroll', mobileBtns);
	};

	AutoScroll.prototype.enableDesktop = function(){
		wrapper.removeEventListener('scroll', mobileBtns);
		wrapper.scrollTop = 0;
		TweenLite.set(container, {transform: 'translateY('+ -100*currentSec + 'vh)', ease: Circ.easeOut});
		document.addEventListener('mousewheel', onScroll);
		document.addEventListener('DOMMouseScroll', onScroll);
		document.addEventListener("touchstart",  onTouch);
	};

	window['AutoScroll'] = AutoScroll;

})(window, document);