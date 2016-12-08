var markers = [];


  function initialize() {


    var center = {lat: 42.1342464, lng: -87.7810725};
/*    console.log("center: " + center.lat + ", " + center.lng);
*/
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: center,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    google.maps.event.addDomListener(window, "resize", function() {
    var newCenter = center;
    google.maps.event.trigger(map, "resize");
    map.setCenter(newCenter);
        });

    setUpMarkers(map);
}

function setUpMarkers(map) {

    var infowindow = new google.maps.InfoWindow();

    var latLng = document.getElementById('location-list').getElementsByClassName("location-latLon");
    var imageList = document.getElementById('location-list').getElementsByClassName("location-picture");
    var comments = document.getElementById('location-list').getElementsByClassName("location-comment");

    for (i = 0; i < latLng.length; i++) {

      var position = latLng[i].innerHTML;
      var latLongStrip = position.replace("{lat: ","").replace("lng: ","").replace("}","");
      var latlngSplit = latLongStrip.split(',');

      var lat = (parseFloat(latlngSplit[0]));
      var lng = (parseFloat(latlngSplit[1]));

      var image = imageList[i].src;
      var comment = comments[i].innerHTML;

      var marker, i;

      marker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          position: {lat: lat, lng: lng},
          map: map
        });
      marker.image = image;
      marker.comment = comment;
      markers.push(marker);

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent('<img src="' + marker.image + '"style="width: 50px;"><br>' + marker.comment + '');
          infowindow.open(map, marker);
        }
      })(marker, i));

    }

  }