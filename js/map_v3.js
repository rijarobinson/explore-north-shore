var map;
var infowindow;


  function initialize() {


    var center = { lat: 42.127470, lng: -87.754953 };
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

    infowindow = new google.maps.InfoWindow({
      minWidth: 300,
      maxWidth: 300 });
    setUpMarkers();
}

function setUpMarkers() {

/*storing new information in locations dataset*/


  var styleInfoWinA = '<div class="container" style="width: 100%"><div class="row"><div class="col-md-12"><div class="text-right">';
  var styleInfoWinB = '</div></div></div><div class="row"><div class="col-md-2"><img src="';
  var styleInfoWinC = '" style="max-width: 75px; min-width: 75px;"></div><div class="col-md-2"></div><div class="col-md-8 pad-top">';
  var styleInfoWinD = '</div></div><div class="row"><div class="col-md-12"><div class="add-padding">';
  var styleInfoWinE = '</div></div></div></div>';


locations.forEach(function(location) {
      location.linkToVenue = 'https://foursquare.com/v/' + location.fSId;

    var fsRequestTimeout = setTimeout(function() {
        tips = "There was a problem with getting the foursquare data.";
    }, 8000);

    if(location.fSId == '') {
      location.tips = location.description;
      location.name = location.locationName;
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
    }

/*create the markers and set infowindow content*/

/* TDO DO: If I click on a marker and detail is shown at left either show list or switch to detail on clicked marker */
      var marker, category, markerColor;

      category = location.category;

      var markerImageURL = "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|";

      if (category == 'Entertainment') {
        markerColor = "cc33ff"
      }
      else if (category == 'Dining') {
        markerColor = "0000ff"
      }
      else if (category == 'Drives') {
        markerColor = "006666"
      }
      else if (category == 'Public') {
        markerColor = "ffccff"
      }
      else {
        markerColor = "00ff99"
      }

      var markerImage = new google.maps.MarkerImage(markerImageURL + markerColor);

      marker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          position: location.latLon,
          map: map,
          icon: markerImage
        });

      marker.fSId = location.fSId;

      google.maps.event.addListener(marker, 'click', (function(location) {
        return function() {
          var content;
          marker.setAnimation(google.maps.Animation.BOUNCE);
          stopAnimation(marker);
          if (marker.fSId) {
            content = styleInfoWinA +
                      '<img src="images/foursquare.png" style="width: 100px;">' + styleInfoWinB + location.imgSrc +
                       styleInfoWinC + '<a href="' + location.linkToVenue + '">' + location.locationName +
                      '</a><br>' + location.category +
                      styleInfoWinD + 'Tips from FOURSQUARE<br>' + location.tips +
                      styleInfoWinE;
          }
          else {
            content = styleInfoWinA + '<div class="tiny-text">No FOURSQUARE listing for this item.</div>' + styleInfoWinB + location.imgSrc +
                      styleInfoWinC +
                      location.locationName + '<br>' + location.category +
                      styleInfoWinD + location.tips +
                      styleInfoWinE;
          }
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      })(location));


    location.marker = marker;
    })

ko.applyBindings(new ViewModel());

}

function stopAnimation(marker) {
      setTimeout(function () {
        marker.setAnimation(null);
    }, 750);
}

