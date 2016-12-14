
function otherError() {
    alert("There was a problem retrieving required components.")
}

function errorAlert() {
  $("#map").children("h2").text("Error loading map. Check your internet " +
                                "connection or speak to the website owner.")
}

function getPinURL(category) {
    console.log(category);
    console.log(categories.category);
/*  pseudocode:
    where category == categories.category;
    return categories.markerURL;
*/
}
