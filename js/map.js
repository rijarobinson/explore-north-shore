
        function initMap() {

            var center = {lat: 42.1342464, lng: -87.7810725};
            var map = new google.maps.Map(document.getElementById("map"), {
                      zoom: 11,
                      center: center
                      });

/*need to get list of items on index.html (because we will be doing search later) and set markers*/

            var locations = document.getElementById("location-list");
            for (var i = 0; i < locations.children.length; i++) {

            var markerLocations = locations.children[i].innerHTML;
            console.log("markerLocations: " + markerLocations);
            var geocoder = new google.maps.Geocoder();    // instantiate a geocoder object
            var address = markerLocations;
            geocoder.geocode({ "address": address }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK ) {
                    var latLon = results[0].geometry.location + "";
                    var latLon = latLon.toString().replace("(","");
                    var latLon = latLon.replace(")","");
                    var splitLatLon = latLon.split(",");
                    var lat = Number(splitLatLon[0]);
                    var lon = Number(splitLatLon[1]);
                    var uluru = {lat: lat, lng: lon};
                    var marker = new google.maps.Marker({
                                 map: map,
                                 position: uluru
                                 });
                }
                else {
                    console.log("Geocode was not successful for the following reason: " + status);
                }
            });
        }
        }
