
        function initMap() {

            var center = {lat: 42.1342464, lng: -87.7810725};
            var map = new google.maps.Map(document.getElementById("map"), {
                      zoom: 11,
                      center: center
                      });

/*re-center on north shore when moved/resized courtesy of http://hsmoore.com/keep-google-map-v3-centered-when-browser-is-resized/*/
            google.maps.event.addDomListener(window, "resize", function() {
                var newCenter = center;
                google.maps.event.trigger(map, "resize");
                map.setCenter(newCenter);
            });
            updateMarkers(map);
    }

function updateMarkers(map) {
        console.log("trying to update markers");

            var locations = document.getElementById("location-list");
            for (var i = 0; i < locations.children.length; i++) {

                var markerLocations = locations.children[i].innerHTML;
                console.log("markerLocations: " + markerLocations);
                var geocoder = new google.maps.Geocoder();    // instantiate a geocoder object
                geocoder.geocode({ "address": markerLocations }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK ) {
                    var latLon = results[0].geometry.location + "";
                    var latLon = latLon.toString().replace("(","");
                    var latLon = latLon.replace(")","");
                    var splitLatLon = latLon.split(",");
                    var lat = Number(splitLatLon[0]);
                    var lon = Number(splitLatLon[1]);
                    var latLong = {lat: lat, lng: lon};
                    var marker = new google.maps.Marker({
                                 map: map,
                                 position: latLong
                                 });
                }
                else {
                    console.log("Geocode was not successful for the following reason: " + status);
                }
            });
        }
}




