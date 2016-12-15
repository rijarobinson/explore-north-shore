function otherError() {
    alert("There was a problem retrieving required components.");
}

function errorAlert() {
    /* Using jquery here because this only appears in the
        event knockout components can't be loaded*/
  $("#map").children("h2").text("Error loading map. Check your internet " +
                                "connection or speak to the website owner.");
  $("#error").text("Error loading site. Check your internet " +
                                "connection or speak to the website owner.");
}

function getPinURL(category) {
    var categoryMarkerURL;
    categories.forEach(function( singleCategory ) {
        if (category == singleCategory.category) {
            categoryMarkerURL = singleCategory.markerURL;
        }
    });
    return categoryMarkerURL;
}

function stringIsIn(string, isIn) {
    string = string || "";
    if (isIn.length > string.length)
        return false;
    return string.indexOf(isIn) >= 0;
}

function setAllOnMap() {
    locations.forEach(function(locationItem) {
        locationItem.marker.setVisible(true);
    });
}

function getFSStart() {
    return "https://www.foursquare.com/v/";
}

function stopAnimation(marker) {
      setTimeout(function () {
        marker.setAnimation(null);
    }, 750);
}

var styleInfoWinA = "<div class='container' style='width: 100%'>" +
                    "<div class='row'><div class='col-md-12'>" +
                    "<div class='text-right'>";
var styleInfoWinB = "</div></div></div><div class='row'>" +
                    "<div class='col-md-2'><img src='";
var styleInfoWinC = "' style='max-width: 75px; min-width: 75px;'></div>" +
                    "<div class='col-md-2'></div>" +
                    "<div class='col-md-8 pad-top'>";
var styleInfoWinD = "</div></div><div class='row'><div class='col-md-12 hidden-xs'>" +
                    "<div class='add-padding'>";
var styleInfoWinE = "</div></div></div></div>";
