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
    var fSIdList = document.getElementById('location-list').getElementsByClassName("location-fsid");
    var descriptions = document.getElementById('location-list').getElementsByClassName("location-description");


    for (i = 0; i < latLng.length; i++) {

      var position = latLng[i].innerHTML;
      var latLongStrip = position.replace("{lat: ","").replace("lng: ","").replace("}","");
      var latlngSplit = latLongStrip.split(',');

      var lat = (parseFloat(latlngSplit[0]));
      var lng = (parseFloat(latlngSplit[1]));

      var image = imageList[i].src;
      var comment = comments[i].innerHTML;

      var fSId = fSIdList[i].innerHTML;

      var description = descriptions[i].innerHTML;

      var tips = '';
      var name = '';

      var linkToVenue = 'https://foursquare.com/v/' + fSId;

    var fsRequestTimeout = setTimeout(function() {
        tips = "There was a problem with getting the foursquare data.";
    }, 8000);

    if(fSId == '') {
      tips = description;
      name = 'another source for name';
    }
    else {
      $.ajax({
          url: "https://api.foursquare.com/v2/venues/" + fSId + "/tips?limit=10&sort=recent&client_id=PVIQJ5PWWLE3UMRRNDZ3X1SWVFEHIXNRH12HCXEF0D0J5GOQ&client_secret=YJ0TST4PGCM41UPONGMIEW2ZKOP04XAX2SJSMXGYI3DYMTEU&v=20161209",
          async: false,
          dataType: 'json',
          success: function(data) {
            returnedTips = JSON.stringify(data.response["tips"]['items'][0]["text"]);
            tips = returnedTips.replace(/\"/g,"");
            clearTimeout(fsRequestTimeout);
          },
          error: function() {
            tips = "There was a problem with getting the foursquare data";
          },
      });
            $.ajax({
          url: "https://api.foursquare.com/v2/venues/" + fSId + "?limit=10&sort=recent&client_id=PVIQJ5PWWLE3UMRRNDZ3X1SWVFEHIXNRH12HCXEF0D0J5GOQ&client_secret=YJ0TST4PGCM41UPONGMIEW2ZKOP04XAX2SJSMXGYI3DYMTEU&v=20161209",
          async: false,
          dataType: 'json',
          success: function(data) {
            returnedName = JSON.stringify(data.response["venue"]['name']);
            name = returnedName.replace(/\"/g,"");

            clearTimeout(fsRequestTimeout);
          },
          error: function() {
            tips = "There was a problem with getting the foursquare data";
          },
      });

    }

      var marker, i;

      marker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          position: {lat: lat, lng: lng},
          map: map
        });
      marker.image = image;
      marker.comment = comment;
      marker.tips = tips;
      marker.name = name;
      marker.fSId = fSId;
      marker.linkText = linkToVenue;
      markers.push(marker);

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          var content;
          marker.setAnimation(google.maps.Animation.BOUNCE);
          stopAnimation(marker);
          if (marker.fSId) {
            content = '<div class="text-right"><img src="images/foursquare.png" style="width: 100px;"></div>' +
                      '<div class="add-padding"><a href="' + marker.linkText + '"><span class="add-padding">' +
                      '<img src="' + marker.image + '"style="width: 50px;"></span>' +
                      marker.name + '</div></a><div class="add-padding">' + marker.tips + '</div></div>';
          }
          else {
            content = '<div class="text-right">No FOURSQUARE listing for this item.</div><span class="add-padding">' +
            '<img src="' + marker.image + '"style="width: 50px;"></span><span class="add-padding">' +
            marker.name + '</span></a><div class="add-padding">' + marker.tips + '</div></div>';
          }
          infowindow.setContent(content);
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
