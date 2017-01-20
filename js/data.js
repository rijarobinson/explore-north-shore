var locations = [
    {
    locationName: "Winnetka Thrift Shop",
    streetAddress: "992 Green Bay Rd",
    city: "Winnetka",
    state: "IL",
    comment: "Great place to get high end items on the cheap.",
    imgSrc: "images/wtshop.jpg",
    imgAttribution: "Winnetka Thrift Shop",
    category: "Shopping",
    latLon: {lat: 42.118897, lng: -87.745540},
    fSId: "4defd1cc227170314bad2a7a",
    description: ""
    },
    {
    locationName: "Forestway Drive",
    streetAddress: "Dundee Road and Forestway Drive",
    city: "Glencoe",
    state: "IL",
    comment: "Lovely drive featuring Skokie Lagoons.",
    imgSrc: "images/skokie-lagoons.jpg",
    category: "Drives",
    latLon: {lat: 42.137770, lng: -87.774490},
    fSId: "",
    description: "Starts at Dundee and Forestway in Glencoe on the north " +
                 "end and winds its way to Tower, then Willow Road. A " +
                 "great way to go north/south on the North Shore."
    },
    {
    locationName: "Sunset Ridge Road",
    streetAddress: "Sunset Ridge Road and Skokie Boulevard",
    city: "Northbrook",
    state: "IL",
    comment: "Nice drive if you need to go north/south on the North Shore.",
    imgSrc: "images/sunset-ridge.jpg",
    category: "Drives",
    latLon: {lat: 42.134889, lng: -87.789635},
    fSId: "",
    description: "Starts at Skokie Boulevard on the north end and goes " +
                 "straight down to Lake Avenue. If you need to continue " +
                 "on to Glenview Road, turn left and then right on Wagner, " +
                 "another pretty road."
    },
    {
    locationName: "ArrivaDolce",
    streetAddress: "1823 St Johns Ave",
    city: "Highland Park",
    state: "IL",
    comment: "Great breakfast & lunch sandwiches, gelato, and baked " +
             "goods. Oh, and coffee!",
    imgSrc: "images/arrivadolce.jpg",
    category: "Dining",
    latLon: {lat: 42.185851, lng:  -87.798208},
    fSId: "4df93ea745dd2b6764bb4048",
    description: ""
    },
    {
    locationName: "Highland Park Public Library",
    streetAddress: "494 Laurel Ave",
    city: "Highland Park",
    state: "IL",
    comment: "Lovely library with lots of activities. Nice kids area.",
    imgSrc: "images/hplib.jpg",
    category: "Public",
    latLon: {lat: 42.184765, lng: -87.796784},
    fSId: "4ab66d3bf964a5200b7720e3",
    description: ""
    },
    {
    locationName: "Pick-Staiger Concert Hall",
    streetAddress: "1 Arts Circle Drive",
    city: "Evanston",
    state: "IL",
    comment: "Fantastic hall with top-notch talent right on the lakefront.",
    imgSrc: "images/banner_pickstaiger1.jpg",
    category: "Entertainment",
    latLon: {lat: 42.052856, lng: -87.672195},
    fSId: "4b5475c7f964a5200ebc27e3",
    description: ""
    },
    {
    locationName: "Dowize Bistro",
    streetAddress: "1107 Central Ave",
    city: "Wilmette",
    state: "IL",
    comment: "Delicious Thai & Japanese food in an adorable restaurant. " +
             "Bento box lunches.",
    imgSrc: "images/dowize.jpg",
    category: "Dining",
    latLon: {lat: 42.076672, lng: -87.705205},
    fSId: "4fe6587fe4b0af2e67710fc6",
    description: ""
    },
    {
    locationName: "Rosewood Beach",
    streetAddress: "45 Roger Williams Ave",
    city: "Highland Park",
    state: "IL",
    comment: "Beautifully renovated beach in Highland Park. " +
             "You'll need to find parking offsite or know someone with a city sticker!",
    imgSrc: "images/rosewood.jpg",
    category: "Public",
    latLon: {lat: 42.167627, lng: -87.770139},
    fSId: "4bd2fb96046076b024e17471",
    description: ""
    },
    {
    locationName: "Jewett Park",
    streetAddress: "1107 Central Ave",
    city: "Deerfield",
    state: "IL",
    comment: "Great park. Lots of places to sit and watch your child.",
    imgSrc: "images/jewett.jpg",
    category: "Kids",
    latLon: {lat: 42.169163, lng: -87.848874},
    fSId: "4b085c45f964a5200a0a23e3",
    description: ""
    },
];

var urlStart = "https://chart.apis.google.com/chart?" +
               "chst=d_map_pin_letter&chld=%E2%80%A2|";

var categories = [
    {
    category: "Dining",
    markerURL: urlStart + "0000ff"},
    {category: "Drives",
    markerURL: urlStart + "006666"},
    {category: "Entertainment",
    markerURL: urlStart + "cc33ff"},
    {category: "Kids",
    markerURL: urlStart + "4286f4"},
    {category: "Public",
    markerURL: urlStart + "ffccff"},
    {category: "Shopping",
    markerURL: urlStart + "00ff99"}
];

var singleCategory = function(data) {
    this.category = data.category;
    this.markerURL = data.markerURL;
};

var singleLocation = function(data) {
    this.locationName = data.locationName;
    this.streetAddress = data.streetAddress;
    this.city = data.city;
    this.state = data.state;
    this.fullAddress = data.locationName + "-" + data.city;
    this.comment = data.comment;
    this.imgSrc = data.imgSrc;
    this.imgAttribution = data.imgAttribution;
    this.latLon = data.latLon;
    this.fSId = data.fSId;
    if (data.fSId) {
        this.linkToVenue = getFSStart() + data.fSId;
    }
    else {
        this.linkToVenue = "https://maps.google.com/maps?q=" +
                           data.latLon.lat + ", " + data.latLon.lng;
    }
    this.description = data.description;
    this.category = data.category;
    this.marker = data.marker;
};