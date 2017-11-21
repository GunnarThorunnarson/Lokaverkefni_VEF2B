"use strict";
var skjalftar = [];
var lengd = 0;


function initMap() {
	//Næ í gögn frá apis.is
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
	circle.addListener('click', function() {
		//infowindow.open(circle.get('kort'), circle);
	});
}
(function() {
var rows = [],                        // rows array
   	$min = $('#value-min'),           // Minimum text input
   	$max = $('#value-max'),           // Maximum text input
   	$table = $('#rates');
	function init() {                     // Tasks when script first runs
		$('#slider').noUiSlider({           // Set up the slide control
	   		range: [0, 11], start: [0, 11], handles: 2, margin: 1, connect: true,
	   		serialization: {to: [$min, $max],resolution: 1}
	   	});	   
	}
	$(init);
}());

