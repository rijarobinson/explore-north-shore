var map;
var markers = [];
var latLon;
var marker;
var infowindow;

function geoCodeLocations() {
    console.log("markers before: " + markers);

    var locations = document.getElementsByClassName("location-list");
    console.log("locations: " + locations);
    for (var i = 0; i < locations.length; i++) {
        var markerLocations = locations[i].innerHTML;
/*        var image = document.getElementsByTagName("img");
        console.log("image source: " + image);*/
        console.log("markerLocations: " + markerLocations);
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ "address": markerLocations }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK ) {
            latLon = results[0].geometry.location;
            markerArray(latLon);
                }
                else {
                    console.log("Geocode was not successful for the following reason: " + status);
                }
            });

/*            var marker = new google.maps.Marker({
                                animation: google.maps.Animation.DROP,
                                map: map,
                                position: marker,
                                 });
*//*            marker.info = new google.maps.InfoWindow({
                  content: String(results[0].geometry.location)
            });
*/
/*            google.maps.event.addListener(marker, 'click', function() {
                marker.info.open(map, marker);
                });
*/

        }

    setMarker(markers);
}


        function markerArray(latLon) {
            markers.push(latLon);
        }



function setMarker(markers) {
    for (m in markers) {
        console.log("in setMarker: " + markers[m]);



        marker = new google.maps.Marker({
                                animation: google.maps.Animation.DROP,
                                map: map,
                                position: markers[m],
                                 });




/*
        infowindow = new google.maps.InfoWindow({
                  content: String(markers[m])
            });



        google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
                });
*/    }





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

