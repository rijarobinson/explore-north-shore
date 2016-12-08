  function initialize() {
    var locations = [
    {
    locationName: 'Winnetka Thrift Shop',
    streetAddress: '500 Green Bay Road',
    city: 'Winnetka',
    state: 'IL',
    comment: 'Great place to get high end items on the cheap.',
    imgSrc: 'http://www.placekitten.com/600/300',
    imgAttribution: 'http://www.placekitten.com',
    searchTerms: [ { term: "shopping" },
                     { term: "store" },
                     { term: "budget" },
                     { term: "bargain" } ]
    },
    {
    locationName: 'Forestway Drive',
    streetAddress: 'Dundee Road and Forestway Drive',
    city: 'Glencoe',
    state: 'IL',
    comment: 'Lovely drive featuring Skokie Lagoons.',
    imgSrc: 'http://www.placekitten.com/500/250',
    searchTerms: [{ term: 'nature'},{ term: 'beauty'},{ term: 'drive'},{ term: 'bike'}]
    },
    {
    locationName: 'ArrivaDolce',
    streetAddress: '1823 St Johns Ave',
    city: 'Highland Park',
    state: 'IL',
    comment: 'Great breakfast & lunch sandwiches, gelato, and baked goods. Oh, and coffee!',
    imgSrc: 'images/arrivadolce.jpg',
    searchTerms: [{ term: 'gelato'},{ term: 'restaurant'},{ term: 'coffee'},{ term: 'tea'},{ term: 'lunch'}]
    },
    {
    locationName: 'Highland Park Public Library',
    streetAddress: '494 Laurel Ave',
    city: 'Highland Park',
    state: 'IL',
    comment: 'Lovely library with lots of activities. Nice kids area.',
    imgSrc: 'http://www.placekitten.com/200/100',
    searchTerms: [{ term: 'books'},{ term: 'classes'},{ term: 'read'},{ term: 'downtown'}]
    },
    {
    locationName: 'Pick-Staiger Concert Hall',
    streetAddress: '1 Arts Circle Drive',
    city: 'Evanston',
    state: 'IL',
    comment: 'Fantastic hall with top-notch talent right on the lakefront.',
    imgSrc: 'http://www.placekitten.com/200/100',
    searchTerms: [{ term: 'arts'},{ term: 'music'},{ term: 'entertainment'},{ term: 'northwestern'}]
    },
    {
    locationName: 'Dowize Bistro',
    streetAddress: '1107 Central Ave',
    city: 'Wilmette',
    state: 'IL',
    comment: 'Delicious Thai & Japanese food in an adorable restaurant. Bento box lunches.',
    imgSrc: 'http://www.placekitten.com/200/100',
    searchTerms: [{ term: 'thai'},{ term: 'japanese'},{ term: 'restaurant'},{ term: 'bento'}]
    },
    ]
;

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: new google.maps.LatLng(42.1342464, -87.7810725),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var geocoder = new google.maps.Geocoder();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      var address = locations[i].locationName + ", " + locations[i].streetAddress + ", " + locations[i].city;

        geocoder.geocode({ "address": address }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK ) {
            latLng = results[0].geometry.location;
                }
                else {
                    console.log("Geocode was not successful for the following reason: " + status);
                }
            });

      marker = new google.maps.Marker({
        position: new google.maps.LatLng(latLng),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  }

  function loadScript() {
      var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDDVId7-jJjGL6LwbveKl60DqYi4GEubgs&v=3.exp&' +
      'callback=initialize';
  document.body.appendChild(script);
  }

  window.onload = loadScript;
