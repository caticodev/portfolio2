(function(){

	var fields = [].slice.call(document.querySelectorAll('.contact_field'));

	fields.forEach(function(inputEl){
		if(inputEl.value.trim() !== '') inputEl.parentNode.classList.add('filled');
		inputEl.addEventListener('focus', onInputFocus);
		inputEl.addEventListener('blur', onInputBlur);
	});

	function onInputFocus(ev) {
		ev.target.parentNode.classList.add('filled');
	}

	function onInputBlur(ev) {
		if(ev.target.value.trim() === '') {
			ev.target.parentNode.classList.remove('filled');
		}
	}

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
		if (validate()){
			ajax.ready(ajax.req(
				'POST', 
				'https://formspree.io/hello@catico.xyz',
				serialize(ev.target.elements),
				function(){
					document.querySelector('.contact_submit').disabled = true;
					document.querySelector(".contact_form").classList.add('done');
				}
			));
		}
	});

	function validate(){
		for (var i=0; i<fields.length; i++){
			input = fields[i].value.trim();
			msg = document.querySelector('.contact_error[data-name="'+fields[i].name+'"]');
			if (input === '' || (i===1 && !email(input))){
				msg.classList.add('show');
				break;
			} else{
				msg.classList.remove('show');
				if (i===fields.length-1) return true;
			}
		}
	}

	function email(address){
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(address);
	}

	function serialize(inputs){
		var data = '';
		for(var i=0; i<inputs.length; i++){
			data += inputs[i].name+'='+inputs[i].value+'&'; 
		}
		return data;
	}
}());