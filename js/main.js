"use strict";
var skjalftar = [];
var lengd = 0;
var skjaftaFylki = [];


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
					/*var rows = [],
						$min = $('#value-min'),
						$max = $('#value-max'),
						$table = $('#rates');*/
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
						skjaftaFylki.push(skjalftaHringur);						
					}
					uppfaera(skjaftaFylki, skjalftar, 1, 10);
				
					function uppfaera(circle, skali, min, max)	{
						var slider = document.getElementById('slider');

						noUiSlider.create(slider, {
							start: [0, 11],
							connect: true, 
							range: {
								'min': 0, 
								'max': 10
							}
						});
						console.log(skjalftaHringur);
						slider.noUiSlider.on('update', function(values, handle) {
							for (var y = 0; y < lengd; y++) {
								console.log(skali[y].richter);
									if(skali[y].richter >= values[0] && skali[y].richter <= values[1]){
										//circle.setMap(kort);
										circle[y].setMap(kort);
									}
									else{
										circle[y].setMap(null);
									}
								}
						});						
						
						if(1 == 1) {
							//circle.setMap(kort);
							//skali = 1;
							
						}
						else {
							circle.setMap(null);
						}
						
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

