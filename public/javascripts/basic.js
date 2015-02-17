var static_url = window.location;

$(document).ready(function() {
/* 	document.getElementById('container').style.height = $(window).height();
	document.getElementById('container').style.height = $(window).height(); */
	
	$(document).bind('keyup', function(e) {
		if(e.which === 116) {
			//window.onbeforeunload = function() {};
		} else if (e.which === 13) {
			$.modal.close()
		} else if (e.which === 118) {
			var x = callAjax((static_url + 'proxy'), '?srch=/tv-27937-Archer/season-6-episode-5&source=primewire&ext=ag&www=true');
		} else if (e.which === 119) {	
			/* var postData = {
				username: $("#in_usr").val(),
				pass: $("#in_pass").val()
			}
			var request = $.ajax({
				url: '/login',
				type: 'POST',
				data: postData,
				contentType: 'application/x-www-form-urlencoded',
				dataType: 'json'
			}); 
			
			request.success(function(rslt) {
				var x = 1;
			}); */
		}
	});
});

function login() {
	var postData = {
		username: $("#in_usr").val(),
		password: $("#in_pass").val()
	}
	
	var request = $.ajax({
		url: '/login',
		type: 'POST',
		data: postData,
		contentType: 'application/x-www-form-urlencoded',
		dataType: 'json'
	}); 
	
	request.success(function(rslt) {
		var x = 1;
	});
}

function callAjax(webUrl, queryString) {
    var xmlHttpObject = null;

    try {
        // Firefox, Opera 8.0+, Safari...

        xmlHttpObject = new XMLHttpRequest();
    }
    catch (ex) {
        // Internet Explorer...

        try {
            xmlHttpObject = new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch (ex) {
            xmlHttpObject = new ActiveXObject('Microsoft.XMLHTTP');
        }
    }

    if (xmlHttpObject == null) {
        window.alert('AJAX is not available in this browser');
        return;
    }

    xmlHttpObject.open("GET", webUrl + queryString, false);
    xmlHttpObject.send();

    var valueSent = xmlHttpObject.responseText;

    return valueSent;
}

