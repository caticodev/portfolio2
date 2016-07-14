var mobile = ((window.innerWidth < 701 || window.innerHeight < 601) ? true : false);

function shuffle(a){
	var j, x, i;
  for (i = a.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
};

// window.addEventListener('resize', function () { 
//   mobile = (window.innerWidth > 700 ? false : true);
//   window.location.reload(); 
// });