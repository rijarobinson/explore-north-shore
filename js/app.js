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
    latLon: {lat: 42.118897, lng: -87.745540},
    fSId: '4defd1cc227170314bad2a7a',
    description: ''
    },
    {
    locationName: 'Forestway Drive',
    streetAddress: 'Dundee Road and Forestway Drive',
    city: 'Glencoe',
    state: 'IL',
    comment: 'Lovely drive featuring Skokie Lagoons.',
    imgSrc: 'http://www.placekitten.com/500/250',
    searchTerms: [{ term: 'nature'},{ term: 'beauty'},{ term: 'drive'},{ term: 'bike'}],
    latLon: {lat: 42.137770, lng: -87.774490},
    fSId: '',
    description: 'Starts at Dundee and Forestway in Glencoe on the north end and winds its way to Tower, then Willow Road. A great way to go north/south on the North Shore.'
    },
    {
    locationName: 'Sunset Ridge Road',
    streetAddress: 'Sunset Ridge Road and Skokie Boulevard',
    city: 'Northbrook',
    state: 'IL',
    comment: 'Nice drive if you need to go north/south on the North Shore.',
    imgSrc: 'http://www.placekitten.com/500/250',
    searchTerms: [{ term: 'nature'},{ term: 'beauty'},{ term: 'drive'}],
    latLon: {lat: 42.134889, lng: -87.789635},
    fSId: '',
    description: 'Starts at Skokie Boulevard on the north end and goes straight down to Lake Avenue. If you need to continue on to Glenview Road, turn left and then right on Wagner, another pretty road.'
    },
    {
    locationName: 'ArrivaDolce',
    streetAddress: '1823 St Johns Ave',
    city: 'Highland Park',
    state: 'IL',
    comment: 'Great breakfast & lunch sandwiches, gelato, and baked goods. Oh, and coffee!',
    imgSrc: 'images/arrivadolce.jpg',
    searchTerms: [{ term: 'gelato'},{ term: 'restaurant'},{ term: 'coffee'},{ term: 'tea'},{ term: 'lunch'}],
    latLon: {lat: 42.185851, lng:  -87.798208},
    fSId: '4df93ea745dd2b6764bb4048',
    description: ''
    },
    {
    locationName: 'Highland Park Public Library',
    streetAddress: '494 Laurel Ave',
    city: 'Highland Park',
    state: 'IL',
    comment: 'Lovely library with lots of activities. Nice kids area.',
    imgSrc: 'http://www.placekitten.com/200/100',
    searchTerms: [{ term: 'books'},{ term: 'classes'},{ term: 'read'},{ term: 'downtown'}],
    latLon: {lat: 42.184765, lng: -87.796784},
    fSId: '4ab66d3bf964a5200b7720e3',
    description: ''
    },
    {
    locationName: 'Pick-Staiger Concert Hall',
    streetAddress: '1 Arts Circle Drive',
    city: 'Evanston',
    state: 'IL',
    comment: 'Fantastic hall with top-notch talent right on the lakefront.',
    imgSrc: 'images/banner_pickstaiger1.jpg',
    searchTerms: [{ term: 'arts'},{ term: 'music'},{ term: 'entertainment'},{ term: 'northwestern'}],
    latLon: {lat: 42.052856, lng: -87.672195},
    fSId: '4b5475c7f964a5200ebc27e3',
    description: ''
    },
    {
    locationName: 'Dowize Bistro',
    streetAddress: '1107 Central Ave',
    city: 'Wilmette',
    state: 'IL',
    comment: 'Delicious Thai & Japanese food in an adorable restaurant. Bento box lunches.',
    imgSrc: 'http://www.placekitten.com/150/75',
    searchTerms: [{ term: 'thai'},{ term: 'japanese'},{ term: 'restaurant'},{ term: 'bento'}],
    latLon: {lat: 42.076672, lng: -87.705205},
    fSId: '4fe6587fe4b0af2e67710fc6',
    description: ''
    },
    ];

var singleLocation = function(data) {

    this.locationName = data.locationName;
    this.streetAddress = data.streetAddress;
    this.city = data.city;
    this.state = data.state;
    this.fullAddress = ko.computed(function() {
        return data.locationName + '-' + data.streetAddress + '-' + data.city;
    })
    this.comment = data.comment;
    this.imgSrc = data.imgSrc;
    this.imgAttribution = data.imgAttribution;
    this.latLon = ko.observable('{lat: ' + data.latLon.lat + ', lng: ' + data.latLon.lng + '}');
    this.fSId = data.fSId;
    this.description = data.description;
    this.searchTerms = ko.computed(function() {
        data.searchTerms.join();
    })
    this.marker = data.marker;


}

var ViewModel = function() {
    var self = this;

    this.locationList = ko.observableArray([]);

    this.currentLocation = ko.observable( this.locationList()[0] );


    locations.forEach(function(locationItem) {
        self.locationList.push( new singleLocation(locationItem) );
    });

/*    this.sortedLocationList = ko.computed(function() {
           return self.locationList().sort(function (left, right) {
                return left.city() == right.city() ?
                     0 :
                     (left.city() < right.city() ? -1 : 1);
           });
        });*/



/*search function*/
/*    self.query = ko.observable('')

    self.query.subscribe(function(value) {
        self.locationList.removeAll();
        locations.forEach(function(locationItem) {
        var searchString = locationItem.locationName + locationItem.streetAddress + locationItem.city + locationItem.searchTerms;
            if(searchString.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                self.locationList.push( new singleLocation(locationItem) );
            }
        });
        /*TODO: figure out how to do this without initializing maps, just place the markers (preferably
            from locationList*/
/*        initialize();
        })
*/

/*filter is not currently doing anything--try after making other changes.*/

self.filter = ko.observable('')

this.filteredItems = ko.computed(function() {
    var filter = this.filter().toLowerCase();
    if (!filter) {
        return this.locationList();
    } else {
        console.log("the list is trying to be filtered.");
        return ko.utils.arrayFilter(this.locationList, function(single) {

        var searchString = single.locationName + single.streetAddress + single.city + single.searchTerms;

            return ko.utils.stringStartsWith(searchString.toLowerCase(), filter);
        });
    }
}, this);

        ko.utils.stringStartsWith = function (string, startsWith) {
            string = string || "";
            if (startsWith.length > string.length)
                return false;
            return string.substring(0, startsWith.length) === startsWith;
        },

self.hidden = ko.observable(false);


    self.selectLocation = function(theLocation) {
        self.currentLocation(theLocation);
        self.hidden(true);
    }


    self.hideList = function() {
        self.hidden(true);
        console.log("hide list was accessed");
    }

    self.showList = function() {
        self.hidden(false);
        self.currentLocation('');
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
