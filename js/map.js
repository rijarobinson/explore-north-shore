var map;
var markers = [];

function geoCodeLocations() {

    var locations = document.getElementsByClassName("location-address");
    for (var i = 0; i < locations.length; i++) {
        var markerLocations = locations[i].innerHTML;
        var image = document.getElementsByTagName("img");
        console.log("image source: " + image);
        console.log("markerLocations: " + markerLocations);
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ "address": markerLocations }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK ) {
            var latLon = results[0].geometry.location;
            var marker = new google.maps.Marker({
                                animation: google.maps.Animation.DROP,
                                map: map,
                                position: latLon,
                                 });
            marker.info = new google.maps.InfoWindow({
                  content: String(results[0].geometry.location)
            });
            google.maps.event.addListener(marker, 'click', function() {
                marker.info.open(map, marker);
                });


            markers.push(marker);


                }
                else {
                    console.log("Geocode was not successful for the following reason: " + status);
                }
            });
        }
}

function initMap() {
    var center = {lat: 42.1342464, lng: -87.7810725};
    map = new google.maps.Map(document.getElementById("map"), {
              zoom: 11,
              center: center
              });

    google.maps.event.addDomListener(window, "resize", function() {
        var newCenter = center;
        google.maps.event.trigger(map, "resize");
        map.setCenter(newCenter);
            });

    setMapOnAll(map);

}

function setMapOnAll(map) {
    geoCodeLocations();
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function deleteMarkers() {
    clearMarkers();
    markers = [];
}

