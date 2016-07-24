var width, height, mobile,
	inputFocus = false,
	currentSec = 0;

function shuffle(a){
	var j, x, i;
  for (i = a.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}

var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
