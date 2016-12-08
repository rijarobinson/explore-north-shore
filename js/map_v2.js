var map;
var markers = [];

function geoCodeLocations() {
    var locations = document.getElementById("location-list");
    for (var i = 0; i < locations.children.length; i++) {
        var markerLocations = locations.children[i].innerHTML;
        console.log("markerLocations: " + markerLocations);
        var geocoder = new google.maps.Geocoder();    // instantiate a geocoder object
        geocoder.geocode({ "address": markerLocations }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK ) {
            var latLon = results[0].geometry.location;
            var marker = new google.maps.Marker({
                                 map: map,
                                 position: latLon
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
    geoCodeLocations();
}

function setMapOnAll(map) {
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