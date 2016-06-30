(function(){

	var ajax = {
		ready: function ready (fn) {
		  if (typeof fn !== 'function') { return; }
		  if (document.readyState === 'complete') { return fn(); }

		  document.addEventListener('DOMContentLoaded', fn, false);
		},
		req: function ajaxRequest (method, url, data, callback) {
		  var xmlhttp = new XMLHttpRequest();

		  xmlhttp.onreadystatechange = function () {
		    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
		      callback(xmlhttp.response);
		    }
		  };

		  xmlhttp.open(method, url, true);
		  xmlhttp.setRequestHeader("Accept", "application/json");
		  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		  xmlhttp.send(data);
		}
	};

	document.getElementById("contact_form").addEventListener("submit", function(ev){
		ev.preventDefault();
		// ajax.ready(ajax.req(
		// 	'POST', 
		// 	'https://formspree.io/kathy0kate@gmail.com',
		// 	serialize(ev.target.elements),
		// 	function(){
				var btn = document.querySelector('.contact_submit');
				btn.disabled = true;
				btn.classList.add('done');
				document.querySelector('.contact_overlay').classList.add('done');
		// 	}
		// ));
	});

	function serialize(inputs){
		var data = '';
		for(var i=0; i<inputs.length; i++){
			data += inputs[i].name+'='+inputs[i].value+'&' 
		}
		return data;
	}
}());