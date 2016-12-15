var map;
var infowindow;


function initialize() {
    var center = { lat: 42.127470, lng: -87.754953 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    google.maps.event.addDomListener(window, "resize", function() {
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });

    infowindow = new google.maps.InfoWindow({
        minWidth: 300,
        maxWidth: 300 });
        setUpMarkers();
    }


function setUpMarkers() {

/*storing new information in locations dataset*/
/* TODO: Enhancement-See if I can get a random tip instead of
    displaying the same one every time */

locations.forEach(function(location) {
    location.linkToVenue = getFSStart() + location.fSId;

    var fsRequestTimeout = setTimeout(function() {
        tips = "There was a problem with getting the foursquare data.";
    }, 8000);

    if(location.fSId == "") {
        location.tips = location.description;
        location.name = location.locationName;
    }
    else {
        $.ajax({
            url: "https://api.foursquare.com/v2/venues/" + location.fSId +
                 "/tips?limit=10&sort=recent&client_id=" +
                 "PVIQJ5PWWLE3UMRRNDZ3X1SWVFEHIXNRH12HCXEF0D0J5GOQ&" +
                 "client_secret=YJ0TST4PGCM41UPONGMIEW2ZKOP04XAX2SJS" +
                 "MXGYI3DYMTEU&v=20161209",
            dataType: "json",
            success: function(data) {
                returnedTips = JSON.stringify(data.response.tips.items[0].text);
                location.tips = returnedTips.replace(/"/g,"");
                clearTimeout(fsRequestTimeout);
            },
            error: function() {
                location.tips = "There was a problem with getting " +
                                "the foursquare data";
            }
        });
    }

/* create the markers and set infowindow content */

/* TODO: Interface improvement-If I click on a marker and detail is
    shown at left either show list or switch to detail on clicked marker */

    var marker, category, markerColor, markerImage;

    category = location.category;
    markerImage = new google.maps.MarkerImage(getPinURL(category));

    marker = new google.maps.Marker({
             animation: google.maps.Animation.DROP,
             position: location.latLon,
             map: map,
             icon: markerImage
    });

    marker.fSId = location.fSId;

/* HTML helper text variables for the infowindow are in helper.js */

    google.maps.event.addListener(marker, "click", (function(location) {
        return function() {
            var content;
            marker.setAnimation(google.maps.Animation.BOUNCE);
            stopAnimation(marker);
            if (marker.fSId) {
                content = styleInfoWinA +
                          "<img src='images/foursquare.png' " +
                          "style='width: 100px;'>" + styleInfoWinB +
                          location.imgSrc + styleInfoWinC + "<a href='" +
                          location.linkToVenue + "'>" +
                          location.locationName + "</a><br>" +
                          location.category + styleInfoWinD +
                          "Tips from FOURSQUARE<br>" + location.tips +
                          styleInfoWinE;
            }
            else {
                content = styleInfoWinA + "<div class='tiny-text'>No " +
                          "FOURSQUARE listing for this item.</div>" +
                          styleInfoWinB + location.imgSrc + styleInfoWinC +
                          location.locationName + "<br>" + location.category +
                          styleInfoWinD + location.tips + styleInfoWinE;
            }
        infowindow.setContent(content);
        infowindow.open(map, marker);
        }
    })(location));

    location.marker = marker;
});

ko.applyBindings(new ViewModel());

}