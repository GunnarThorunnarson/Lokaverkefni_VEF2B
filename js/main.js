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
			var stadsetning = {lat: 65, lng: -19};
			var kort = new google.maps.Map(document.getElementById('island'), {
				zoom: 6,
				center: stadsetning,
				disableDefaultUI: true
			});
			(function() {
				function init() {
					var rows = [],
						$min = $('#value-min'),
						$max = $('#value-max'),
						$table = $('#rates');
					for(var x = 0; x < lengd; x++) {
						var skjalftaHringur = new google.maps.Circle({
							strokeColor: '#FF0000',
           					strokeOpacity: 0.5,
           					strokeWeight: 5,
           					fillColor: '#FF0000',
        	   				fillOpacity: 0.35,
           					map: kort,
           					center: {lat: skjalftar[x].lat, lng: skjalftar[x].lng},
           					radius: skjalftar[x].richter * 10000
						});
						
					}
					
					for (var y = 0; y < lengd; y++) {
						update(skjalftaHringur, skjalftar[y].richter, $min, $max.val());
					}
					
					$('#slider').noUiSlider({
						range: [0, 11],
						start: [5, 11],
						handles: 2,
						margin: 1,
						connect: true,
						serialization: {to: [$min, $max], resolution: 1}
					});
					function update(circle, skali, min, max)	{
						if(skali >= min && skali <= max) {
							circle.setMap(kort);
							//skali = 1;
						}
						else {
							circle.setMap(null);
						}
						var name = document.getElementById("value-max").value;
						console.log(name);
					}
					
					
				}
				$(init);
			}());
		}		
	});		
}
  
/* Þetta var bara eitthvað test
function synaSkala(circle, skali, local)	{
	var infowindow = new google.maps.InfoWindow({
		content: skali,
		position: local
	});
}*/

