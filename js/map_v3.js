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
/* APPOINTMENT: I don't want to have to initialize the map everytime I update the markers.
I know I can delete markers and reset them, but I also want to initialize the map once
and only update the markers when locationList changes. I also think this is related to
the order of the files in Index.html. I want to initialize the map upon load, then make a call to
setUpMarkers from app.js when I want to update the markers, passing in the map and preferable the
locationList so I don't have to get elements from the DOM*/

}

function setUpMarkers(map) {

    var infowindow = new google.maps.InfoWindow();
/* Would like to style markers by category (e.g. restaurant, entertainment, nature). Would prefer
to do using the dataset rather than getting elements from DOM. So wait post-appt*/

/* APPOINTMENT: I want to get data from locationList rather than DOM, I think the issue
has something to do with how my js files are ordered*/
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
          marker.setAnimation(google.maps.Animation.BOUNCE);
          stopAnimation(marker);
          infowindow.setContent('<img src="' + marker.image + '"style="width: 50px;"><br>' + marker.comment + '');
          infowindow.open(map, marker);
        }
      })(marker, i));

      var listItemElement = document.getElementsByClassName("location-address")[i];

      google.maps.event.addDomListener(listItemElement, 'click', (function(marker, i) {
        return function() {
          if (infowindow) {
            infowindow.close();
          }
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      })(marker, i));

    }

  }

function stopAnimation(marker) {
      setTimeout(function () {
        marker.setAnimation(null);
    }, 750);
}

