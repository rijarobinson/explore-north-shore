var locations = [
    {
    locationName: 'Winnetka Thrift Shop',
    streetAddress: '992 Green Bay Rd',
    city: 'Winnetka',
    state: 'IL',
    comment: 'Great place to get high end items on the cheap.',
    imgSrc: 'http://www.placekitten.com/600/300',
    imgAttribution: 'http://www.placekitten.com',
    category: "shopping",
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
    category: 'drives',
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
    category: 'drives',
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
    category: 'dining',
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
    category: 'public',
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
    category: 'entertainment',
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
    category: 'dining',
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
    this.fullAddress = data.locationName + '-' + data.streetAddress + '-' + data.city;
    this.comment = data.comment;
    this.imgSrc = data.imgSrc;
    this.imgAttribution = data.imgAttribution;
    this.latLon = ko.observable('{lat: ' + data.latLon.lat + ', lng: ' + data.latLon.lng + '}');
    this.fSId = data.fSId;
    this.description = data.description;
    this.category = data.category;
    this.marker = data.marker;


}

var ViewModel = function() {
    var self = this;

    this.locationList = ko.observableArray([]);

    this.currentLocation = ko.observable( this.locationList()[0] );
    locations.forEach(function(locationItem) {
        self.locationList.push( new singleLocation(locationItem) );
    });


this.locationList().sort(function (left, right) {
                return left.city == right.city ?
                     0 :
                     (left.city < right.city ? -1 : 1);
           });

self.filter = ko.observable('')

this.filteredItems = ko.computed(function() {
    var filter = self.filter().toLowerCase();
    if (!filter) {
        setAllOnMap();
        return this.locationList()
    } else {
        return ko.utils.arrayFilter(this.locationList(), function(single) {
            var searchString = single.fullAddress.toLowerCase();
            if (ko.utils.stringIsIn(searchString, filter) === true) {
                single.marker.setVisible(true);
                return ko.utils.stringIsIn(searchString, filter);
            }
            else {
                single.marker.setVisible(false);
            };
        });
    }
}, this);


ko.utils.stringIsIn = function(string, isIn) {
    string = string || "";
    if (isIn.length > string.length)
        return false;
    return string.indexOf(isIn) >= 0;
}


self.hidden = ko.observable(false);


    this.selectLocation = function(theLocation) {
        google.maps.event.trigger(theLocation.marker,'click');
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
        if (infowindow) {
            infowindow.close();
            google.maps.event.trigger(map, "resize");
            map.setCenter({lat: 42.1342464, lng: -87.7810725});
        }
    }
}

function setAllOnMap() {
    locations.forEach(function(locationItem) {
        locationItem.marker.setVisible(true);
    });
}
