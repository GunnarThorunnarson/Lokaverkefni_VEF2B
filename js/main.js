function initMap()	{
	var stadsetning = {lat: 65, lng: -19};
	var kort = new google.maps.Map(document.getElementById('island'), {
		zoom: 6,
		center: stadsetning
	});
}