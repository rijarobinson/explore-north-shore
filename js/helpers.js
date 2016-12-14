
function otherError() {
    alert("There was a problem retrieving required components.")
}

function errorAlert() {
  $("#map").children("h2").text("Error loading map. Check your internet " +
                                "connection or speak to the website owner.")
}

function getPinURL(category) {
    var categoryMarkerURL;
    categories.forEach(function( singleCategory )
    {
        if (category == singleCategory.category) {
            categoryMarkerURL = singleCategory.markerURL;
        }
    });
    return categoryMarkerURL;
}

