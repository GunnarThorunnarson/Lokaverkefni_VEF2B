"use strict";
var skjalftar = [];
var lengd = 0;

//Næ í gögn frá apis.is

//Þetta er fall sem býr til kortið af Íslandi
/*$.ajax({
	'url': 'http://apis.is/earthquake/is',
	'type': 'GET',
	'dataType': 'JSON',
	'success': function(data)	{
		//Set gögnin í fylki
		for (var i = 0; i < data.results.length; i++) {
			skjalftar.push({
				lat: data.results[i].latitude,
				lng: data.results[i].longitude,
				richter: data.results[i].size
			});
		}		
		lengd = data.results.length;
		console.log(lengd);

	}		

});*/

function initMap() {
	$.ajax({
		'url': 'http://apis.is/earthquake/is',
		'type': 'GET',
		'dataType': 'JSON',
		'success': function(data)	{
			//Set gögnin í fylki
			for (var i = 0; i < data.results.length; i++) {
				skjalftar.push({
					lat: data.results[i].latitude,
					lng: data.results[i].longitude,
					richter: data.results[i].size
				});
			}		
			lengd = skjalftar.length;
			console.log(skjalftar[3].lat);
			var stadsetning = {lat: 65, lng: -19};
			var kort = new google.maps.Map(document.getElementById('island'), {
				zoom: 6,
				center: stadsetning,
				disableDefaultUI: true
			});
			for (var x = 0; x < lengd; x++) {
				/*var markerar = new google.maps.Marker({
					map: kort, 
					position: {lat: skjalftar[x].lat, lng: skjalftar[x].lng}
				});*/
				var skjalftaHringur = new google.maps.Circle({
					strokeColor: '#FF0000',
            		strokeOpacity: 0.8,
            		strokeWeight: 2,
            		fillColor: '#FF0000',
            		fillOpacity: 0.35,
            		map: kort,
            		center: {lat: skjalftar[x].lat, lng: skjalftar[x].lng},
            		radius: skjalftar[x].richter * 10000
				});
				synaSkala(skjalftaHringur, skjalftar[x].richter.toString(), {lat: skjalftar[x].lat, lng: skjalftar[x].lng});

			}
		}		

	});		
}
function synaSkala(circle, skali, local)	{
	var infowindow = new google.maps.InfoWindow({
		content: skali,
		position: local
	});
	circle.addListener('mouseover', function() {
		infowindow.open(circle.get('kort'), circle);
	});
	circle.addListener('mouseout', function()	{
		infowindow.close(circle.get('kort'), circle);
	})
} 

