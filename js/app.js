/*tried to import info from supplied file, will have to try again later*/
/*function getJSONP(url, success) {

    var ud = '_' + +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0]
               || document.documentElement;

    window[ud] = function(data) {
        head.removeChild(script);
        success && success(data);
    };

    script.src = url.replace('callback=?', 'callback=' + ud);
    head.appendChild(script);

}*/
/*found on stackoverflow.com*/

/*var locations = getJSONP("data/data.json", function(data) {
    console.log("data: " + data);
});*/


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

}

var ViewModel = function() {
    var self = this;

    this.locationList = ko.observableArray([]);

    locations.forEach(function(locationItem) {
        self.locationList.push( new singleLocation(locationItem) );
    });

/*search function*/
    self.query = ko.observable('')

    self.query.subscribe(function(value) {
        self.locationList.removeAll();
        deleteMarkers();
        locations.forEach(function(locationItem) {
        var searchString = locationItem.locationName + locationItem.streetAddress + locationItem.city;
            if(searchString.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                self.locationList.push( new singleLocation(locationItem) );
            }
        });

        setMapOnAll(map);
/*minor bug, query limit if typing too fast, still not updating properly*/
        })

}

ko.applyBindings(new ViewModel());
