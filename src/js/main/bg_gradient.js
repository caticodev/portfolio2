(function() {
	var height = $w.innerHeight(),
		sec  = $(".overlay"),
		inc, scroll;

	$w.scroll(function(){
		console.log(scroll);
		scroll = $(this).scrollTop();
		if (scroll < height){
			opacity(1);
		} else if ( scroll < 2*height){
			opacity(2);
		} else {
			opacity(3);
		}
	});

	function opacity(i){
		sec.css('opacity', 0);
		$(sec[i-1]).css('opacity', i - scroll/height);
		$(sec[i]).css('opacity', scroll/height - i + 1);
	}

}());
