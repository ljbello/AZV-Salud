//var server = "http://localhost:8000/api/";
//var server = 'http://app.infraruba.com:6969/api/'
// var server = window.location.protocol + '//' + window.location.host + '/api/';

var server = 'http://18.221.41.184/api/';




//Disable buttons for 3 seconds prevent dobleclick
$(".button-disabled").click(function () {
	var button_obj = $(this);
	button_obj.attr("disabled", true);
	setTimeout(function () {
		button_obj.attr("disabled", false);
	}, 3000);
});

function format_date(date) {

	if (date != null) {
		var d = new Date(date)

		var mm = d.getMonth() + 1; // getMonth() is zero-based
		var dd = d.getDate() + 1;

		var date_return = [d.getFullYear(),
		(mm > 9 ? '' : '0') + mm,
		(dd > 9 ? '' : '0') + dd
		].join('-');
	} else {
		var date_return = '';
	}

	return date_return;
}

function format_time(string_date) {
	var _time = new Date(string_date);

	h = (_time.getHours().toString().length < 2 ? '0' + _time.getHours().toString() : _time.getHours().toString());
	m = (_time.getMinutes().toString().length < 2 ? '0' + _time.getMinutes().toString() : _time.getMinutes().toString());

	return h + ':' + m;

}

function convertUTCDateToLocalDate(date) {
	var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60);

	var offset = date.getTimezoneOffset() / 60;
	var hours = date.getHours();

	newDate.setHours(hours - offset);

	return newDate;
}

function shortDate(date) {
	return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}

// function getCookie(name) {
// 	var cookieValue = null;
// 	if (document.cookie && document.cookie !== '') {
// 		var cookies = document.cookie.split(';');
// 		for (var i = 0; i < cookies.length; i++) {
// 			var cookie = jQuery.trim(cookies[i]);
// 			// Does this cookie string begin with the name we want?
// 			if (cookie.substring(0, name.length + 1) === (name + '=')) {
// 				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
// 				break;
// 			}
// 		}
// 	}
// 	return cookieValue;
// }
// var csrftoken = getCookie('csrftoken');

// $.ajaxSetup({
// 	beforeSend: function (xhr) {
// 		// console.log(getCookie('csrftoken'));
// 		// console.log(getCookie('ENTRO A LA FUNCION'));

// 		xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
// 	}
// });

function checkForm() {
	var isFormValid = true;
	$(".form-control").each(function () {

		if ($.trim($(this).val()).length == 0) {
			isFormValid = false;
		}
	});
	return isFormValid;
}
var setElementHeight = function () {
	var height = $(window).height();
	$('.scrollbar').css('height', (height));
};

$(window).on("resize", function () {
	setElementHeight();
}).resize();

function showDays(firstDate, secondDate) {

	var startDay = new Date(firstDate);
	var endDay = new Date(secondDate);
	var millisecondsPerDay = 1000 * 60 * 60 * 24;

	var millisBetween = startDay.getTime() - endDay.getTime();
	var days = millisBetween / millisecondsPerDay;

	// Round down.
	return (Math.floor(days));
}
// LOADER
function loader(show) {
	if (show) {
		$('.loader').removeClass('hidden');
	}
	else {
		$('.loader').addClass('hidden');

	}
}

function sortByKey(jsObj){
    var sortedArray = [];

    // Push each JSON Object entry in array by [key, value]
    for(var i in jsObj)
    {
        sortedArray.push([jsObj[i]]);
    }

    // Run native sort function and returns sorted array.
    return sortedArray.sort();
}

$('.datepicker').datepicker(
	{
	  todayHighlight: true,
	  format: "mm-dd-yyyy",
	  autoclose: true,
	});
$(".datepicker").on("blur", function(e) { $(this).datepicker("hide"); });

