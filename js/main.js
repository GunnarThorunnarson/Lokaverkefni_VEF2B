"use strict";
var skjalftar = [];
var lengd = 0;
var skjaftaFylki = [];
var dt = '2017-02-17T22:32:25.000Z';
//console.log(new Date(dt).toLocaleString('en-CA', { hour12:true }));

function initMap() {//Þetta er fallið sem birtir google maps
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
					richter: data.results[i].size,
					hvar: data.results[i].humanReadableLocation,
					hvenaer: data.results[i].timestamp
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
				//Þetta er fall sem býr til hringi á kortið fyrir hvern skjálfta frá apis.is
				function init() {
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
						synaSkala(skjalftaHringur, skjalftar[x].richter.toString(), {lat: skjalftar[x].lat, lng: skjalftar[x].lng}, skjalftar[x].hvar, skjalftar[x].hvenaer);						
					}
					uppfaera(skjaftaFylki, skjalftar, 1, 10);					
					/*function deila(str) {
						var parts = str.split('T');
						parts = str.split('.');
						return parts[0]
					}*/			
					function uppfaera(circle, skali, min, max)	{//Þetta er fall sem býr til slider og virknina bakvið hann
						var slider = document.getElementById('slider');
						noUiSlider.create(slider, {
							start: [0, 11],
							connect: true,
							margin: 1,
							range: {
								'min': 0, 
								'max': 10
							}
						});
						var inputNumber1 = document.getElementById('value-min');
						var inputNumber2 = document.getElementById('value-max');
						
						console.log(skjalftaHringur);
						slider.noUiSlider.on('update', function(values, handle) {
							var value = values[handle];
							if(handle){
								inputNumber2.value = value;
							} else {
								inputNumber1.value = value;
							}
							for (var y = 0; y < lengd; y++) {//Þetta er filter fyrir skjalftana
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
						inputNumber1.addEventListener('change', function() {
							slider.noUiSlider.set([null, this.value]);
						});					
						inputNumber2.addEventListener('change', function() {
							slider.noUiSlider.set([this.value, null]);
						});
					}	

					function synaSkala(circle, skali, local, hvar, hvenaer)	{//Opnar infowindow þegar smellt er á skjalfta
						console.log(hvenaer);
						var infowindow = new google.maps.InfoWindow({//Þetta er infowindow frá google maps						
							content: '<p>Staðsetning:  ' + hvar + '</p>' +
									 '<p>Stærð: ' + skali + '</p>' +
									 '<p>Tími: ' + moment(hvenaer).format('HH:MM') + '</p>' +
									 '<p>Dagsetning: ' + moment(hvenaer).format('DD/MM/YYYY') + '</p>',
							position: local
						});
						circle.addListener('click', function() {
 							infowindow.open(circle.get('kort'), circle);
 						}); 						
					}		
					
				}
				$(init);//Keyrir init fallið
			}());//Endir
		}		
	});		
}
