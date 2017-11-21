(function() {

  	var circles = [
  		{	
  			lat: 5
  			lng: 5
  			richter: 5
  		}
  		{
  			lat: 5
  			lng: 5
  			richter: 3
  		}
  		{
  			lat: 44
  			lng: 66
  			richter: 1
  		}
  		{
  			lat: 22
  			lng: 55
  			richter: 7
  		}

  	];

  	var rows = [],                        // rows array
    	$min = $('#value-min'),           // Minimum text input
    	$max = $('#value-max'),           // Maximum text input
     	$table = $('#rates');             // The table that shows results

	function update(min, max)	{
		circles.forEach(function(circle) {
			if(circle.) {}
		});
	} 

	function init() {                     // Tasks when script first runs
  		$('#slider').noUiSlider({           // Set up the slide control
    		range: [0, 150], start: [65, 90], handles: 2, margin: 20, connect: true,
      		serialization: {to: [$min, $max],resolution: 1}
    	});
   
  	}

  	$(init);                              // Call init() when DOM is ready
}());