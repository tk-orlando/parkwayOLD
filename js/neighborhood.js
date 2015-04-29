var map;

function CreateMap(properties, numProperties)
{
	var mapOptions;
	if(numProperties == 1){
		var latlong = properties[0].split('|');
		mapOptions = {
          center: new google.maps.LatLng(latlong[3], latlong[4]),
          zoom: 14,
		  disableDefaultUI: true,
		  zoomControl: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
	}
	else{
    	mapOptions = {
          center: new google.maps.LatLng(32.29876, -90.18481),
          zoom: 7,
		  disableDefaultUI: true,
		  zoomControl: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
	}
        map = new google.maps.Map(document.getElementById("neighborhoodMap"), mapOptions);
		var bounds = new google.maps.LatLngBounds();		
		var infoWindow = new google.maps.InfoWindow();		
		for(var i = 0; i < numProperties; ++i){
			var info = properties[i].split('|');
			var marker = new google.maps.Marker({position: new google.maps.LatLng(info[3], info[4]),map: map, icon: info[2]});
			var text = $("#neighborhoodPopupDiv").html();
			text = text.replace("#IMAGE_URL#", info[2]);
			text = text.replace("#LINK#", info[5]);
			text = text.replace("#NAME#", info[0]);
			text = text.replace("#TITLE#", info[1]);
			makeInfoWindowEvent(map, infoWindow, text, marker);
			bounds.extend(new google.maps.LatLng(info[3], info[4]));
		}
		
	if(numProperties != 1){
		map.fitBounds(bounds);	
	}
	
	var listener = google.maps.event.addListener(map, "idle", function() { 
	  if (map.getZoom() > 15) map.setZoom(15); 
	  google.maps.event.removeListener(listener); 
	});
}

function makeInfoWindowEvent(map, infowindow, contentString, marker) {
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
    });
}