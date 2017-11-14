"use strict";
var skjalftar = [];

$.ajax({
	'url': 'http://apis.is/earthquake/is',
	'type': 'GET',
	'dataType': 'JSON',
	'success': function(data)	{
		for (var i = 0; i < data.results.length; i++) {
			skjalftar.push({
				lat: data.results[i].latitude,
				lng: data.results[i].longitude,
				richter: data.results[i].size
			});
		}
		console.log(skjalftar);
	}
});


//Þetta er fall sem býr til kortið af Íslandi
function initMap()	{
	var stadsetning = {lat: 65, lng: -19};
	var kort = new google.maps.Map(document.getElementById('island'), {
		zoom: 6,
		center: stadsetning
	});
}