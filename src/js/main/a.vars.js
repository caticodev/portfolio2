var mobile = ((window.innerWidth < 701 || window.innerHeight < 601) ? true : false),
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