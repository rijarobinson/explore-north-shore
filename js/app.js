var locations = [
    {
    locationName: 'Winnetka Thrift Shop',
    streetAddress: '992 Green Bay Rd',
    city: 'Winnetka',
    state: 'IL',
    comment: 'Great place to get high end items on the cheap.',
    imgSrc: 'http://www.placekitten.com/600/300',
    imgAttribution: 'http://www.placekitten.com',
    searchTerms: [ { term: "shopping" },
                     { term: "store" },
                     { term: "budget" },
                     { term: "bargain" } ],
    latLon: {lat: 42.118897, lng: -87.745540}
    },
    {
    locationName: 'Forestway Drive',
    streetAddress: 'Dundee Road and Forestway Drive',
    city: 'Glencoe',
    state: 'IL',
    comment: 'Lovely drive featuring Skokie Lagoons.',
    imgSrc: 'http://www.placekitten.com/500/250',
    searchTerms: [{ term: 'nature'},{ term: 'beauty'},{ term: 'drive'},{ term: 'bike'}],
    latLon: {lat: 42.137770, lng: -87.774490}
    },
    {
    locationName: 'ArrivaDolce',
    streetAddress: '1823 St Johns Ave',
    city: 'Highland Park',
    state: 'IL',
    comment: 'Great breakfast & lunch sandwiches, gelato, and baked goods. Oh, and coffee!',
    imgSrc: 'images/arrivadolce.jpg',
    searchTerms: [{ term: 'gelato'},{ term: 'restaurant'},{ term: 'coffee'},{ term: 'tea'},{ term: 'lunch'}],
    latLon: {lat: 42.185851, lng:  -87.798208}
    },
    {
    locationName: 'Highland Park Public Library',
    streetAddress: '494 Laurel Ave',
    city: 'Highland Park',
    state: 'IL',
    comment: 'Lovely library with lots of activities. Nice kids area.',
    imgSrc: 'http://www.placekitten.com/200/100',
    searchTerms: [{ term: 'books'},{ term: 'classes'},{ term: 'read'},{ term: 'downtown'}],
    latLon: {lat: 42.184765, lng: -87.796784}
    },
    {
    locationName: 'Pick-Staiger Concert Hall',
    streetAddress: '1 Arts Circle Drive',
    city: 'Evanston',
    state: 'IL',
    comment: 'Fantastic hall with top-notch talent right on the lakefront.',
    imgSrc: 'images/banner_pickstaiger1.jpg',
    searchTerms: [{ term: 'arts'},{ term: 'music'},{ term: 'entertainment'},{ term: 'northwestern'}],
    latLon: {lat: 42.052856, lng: -87.672195}
        },
    {
    locationName: 'Dowize Bistro',
    streetAddress: '1107 Central Ave',
    city: 'Wilmette',
    state: 'IL',
    comment: 'Delicious Thai & Japanese food in an adorable restaurant. Bento box lunches.',
    imgSrc: 'http://www.placekitten.com/150/75',
    searchTerms: [{ term: 'thai'},{ term: 'japanese'},{ term: 'restaurant'},{ term: 'bento'}],
    latLon: {lat: 42.076672, lng: -87.705205}
    },
    ];

var singleLocation = function(data) {

    this.locationName = ko.observable(data.locationName);
    this.streetAddress = ko.observable(data.streetAddress);
    this.city = ko.observable(data.city);
    this.state = ko.observable(data.state);
    this.fullAddress = ko.computed(function() {
        return data.locationName + '-' + data.streetAddress + '-' + data.city;
    })
    this.comment = ko.observable(data.comment);
    this.imgSrc = ko.observable(data.imgSrc);
    this.imgAttribution = ko.observable(data.imgAttribution);
    this.latLon = ko.observable('{lat: ' + data.latLon.lat + ', lng: ' + data.latLon.lng + '}');

}

var ViewModel = function() {
    var self = this;

    this.locationList = ko.observableArray([]);

    this.currentLocation = ko.observable( this.locationList()[0] );


    locations.forEach(function(locationItem) {
        self.locationList.push( new singleLocation(locationItem) );
    });
    /*trying to sort list by city*/
    self.locationList.sort(function (left, right) { return left.city == right.city ? 0 : (left.city < right.city ? -1 : 1) })



/*search function*/
    self.query = ko.observable('')

    self.query.subscribe(function(value) {
        self.locationList.removeAll();
        locations.forEach(function(locationItem) {
        var searchString = locationItem.locationName + locationItem.streetAddress + locationItem.city;
            if(searchString.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                self.locationList.push( new singleLocation(locationItem) );
            }
        });
        /*TODO: figure out how to do this without initializing maps*/
        initialize();
        })

    this.selectLocation = function(theLocation) {
        self.currentLocation(theLocation);
        $("#location-list").css("display", "none");
    }

    this.showList = function() {
        $("#location-list").css("display", "block");
        $("#location").css("display", "none");
        initialize();
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


ko.applyBindings(new ViewModel());
