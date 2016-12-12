/*active markers are stored in an array. Will use this if I decide to delete markers
upon placing searched markers. If not, I don't need array.*/
var markers = [];
var map;
var infowindow;


  function initialize() {


    var center = {lat: 42.1342464, lng: -87.7810725};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: center,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    google.maps.event.addDomListener(window, "resize", function() {
    var newCenter = center;
    google.maps.event.trigger(map, "resize");
    map.setCenter(newCenter);
        });

    infowindow = new google.maps.InfoWindow();
    setUpMarkers();
/* APPOINTMENT: I don't want to have to initialize the map everytime I update the markers.
I know I can delete markers and reset them, but I also want to initialize the map once
and only update the markers when locationList changes. I also think this is related to
the order of the files in Index.html. I want to initialize the map upon load, then make a call to
setUpMarkers from app.js when I want to update the markers, passing in the map and preferable the
locationList so I don't have to get elements from the DOM*/

}

function setUpMarkers() {

/* Would like to style markers by category (e.g. restaurant, entertainment, nature). Would prefer
to do using the dataset rather than getting elements from DOM. So wait post-appt*/

/*    var latLng = document.getElementById('location-list').getElementsByClassName("location-latLon");
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
*/

/*storing new information in locations dataset*/
locations.forEach(function(location) {
      location.linkToVenue = 'https://foursquare.com/v/' + location.fSId;

    var fsRequestTimeout = setTimeout(function() {
        tips = "There was a problem with getting the foursquare data.";
    }, 8000);

    if(location.fSId == '') {
      location.tips = location.description;
      location.name = 'another source for name';
    }
    else {
      $.ajax({
          url: "https://api.foursquare.com/v2/venues/" + location.fSId + "/tips?limit=10&sort=recent&client_id=PVIQJ5PWWLE3UMRRNDZ3X1SWVFEHIXNRH12HCXEF0D0J5GOQ&client_secret=YJ0TST4PGCM41UPONGMIEW2ZKOP04XAX2SJSMXGYI3DYMTEU&v=20161209",
          dataType: 'json',
          success: function(data) {
            returnedTips = JSON.stringify(data.response["tips"]['items'][0]["text"]);
            location.tips = returnedTips.replace(/\"/g,"");
            clearTimeout(fsRequestTimeout);
          },
          error: function() {
            location.tips = "There was a problem with getting the foursquare data";
          },
      });
            $.ajax({
          url: "https://api.foursquare.com/v2/venues/" + location.fSId + "?limit=10&sort=recent&client_id=PVIQJ5PWWLE3UMRRNDZ3X1SWVFEHIXNRH12HCXEF0D0J5GOQ&client_secret=YJ0TST4PGCM41UPONGMIEW2ZKOP04XAX2SJSMXGYI3DYMTEU&v=20161209",
          dataType: 'json',
          success: function(data) {
            returnedName = JSON.stringify(data.response["venue"]['name']);
            location.name = returnedName.replace(/\"/g,"");

            clearTimeout(fsRequestTimeout);
          },
          error: function() {
            location.tips = "There was a problem with getting the foursquare data";
          },
      });

    }

      var marker, i;

      marker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          position: location.latLon,
          map: map,
        });

      /*pull these properties out of location*/
      marker.fSId = location.fSId;
      marker.linkText = location.linkToVenue;
      markers.push(marker);


      google.maps.event.addListener(marker, 'click', (function(location, i) {
        return function() {
          var content;
          marker.setAnimation(google.maps.Animation.BOUNCE);
          stopAnimation(marker);
          if (marker.fSId) {
            content = '<div class="text-right"><img src="images/foursquare.png" style="width: 100px;"></div>' +
                      '<div class="add-padding"><a href="' + location.linkText + '"><span class="add-padding">' +
                      '<img src="' + location.imgSrc + '"style="width: 50px;"></span>' +
                      location.name + '</div></a><div class="add-padding">Tips from FOURSQUARE<br>' + location.tips + '</div></div>';
          }
          else {
            content = '<div class="text-right">No FOURSQUARE listing for this item.</div><span class="add-padding">' +
            '<img src="' + location.imgSrc + '"style="width: 50px;"></span><span class="add-padding">' +
            location.name + '</span></a><div class="add-padding">' + location.tips + '</div></div>';
          }
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      })(location, i));


    location.marker = marker;

/*
      google.maps.event.addListener(marker, 'click', (function(location, i) {
        return function() {
          if (infowindow) {
            infowindow.close();
          }
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      })(location, i));
*/
    })

ko.applyBindings(new ViewModel());

}


function stopAnimation(marker) {
      setTimeout(function () {
        marker.setAnimation(null);
    }, 750);
}

function errorAlert() {
  alert("Map did not load!");
}