
var singleCategory = function(data) {
    this.category = data.category;
    this.markerURL = data.markerURL;
};

var singleLocation = function(data) {
    this.locationName = data.locationName;
    this.streetAddress = data.streetAddress;
    this.city = data.city;
    this.state = data.state;
    this.fullAddress = data.locationName + '-' + data.city;
    this.comment = data.comment;
    this.imgSrc = data.imgSrc;
    this.imgAttribution = data.imgAttribution;
    this.latLon = data.latLon;
    this.fSId = data.fSId;
    if (data.fSId) {
        this.linkToVenue = "https://www.foursquare.com/v/" + data.fSId;
    }
    else {
        this.linkToVenue = "https://maps.google.com/maps?q=" + data.latLon.lat + ", " + data.latLon.lng;
    }
    this.description = data.description;
    this.category = data.category;
    this.marker = data.marker;
};

var ViewModel = function() {
    var self = this;
    this.mapStatus = ko.observable('Loading map...');

    this.locationList = ko.observableArray([]);

    this.currentLocation = ko.observable( this.locationList()[0] );

    locations.forEach(function(locationItem) {
        self.locationList.push( new singleLocation(locationItem) );
    });

    this.categoryList = ko.observableArray([]);

    categories.forEach(function(category) {
        self.categoryList.push( new singleCategory(category) );
    });


this.locationList().sort(function (left, right) {
                return left.city == right.city ?
                     0 :
                     (left.city < right.city ? -1 : 1);
           });


self.filter = ko.observable('');
self.searching = ko.observable(false);
self.categoryFilter = ko.observable('');

this.filterByCategory = function(category) {
    self.categoryFilter(category.category);
}


this.filteredItems = ko.computed(function() {
    var categoryFilter = self.categoryFilter();
    var filter = self.filter().toLowerCase();
    if (!filter) {
        if (!categoryFilter) {
            self.searching(false);
            setAllOnMap();
            return this.locationList()
        }
        else {
            return ko.utils.arrayFilter(this.locationList(), function(single) {
                var searchString = single.category;
                if (stringIsIn(searchString, categoryFilter) === true) {
                    single.marker.setVisible(true);
                    self.searching(true);
                    infowindow.close();
                    map.setCenter({lat: 42.127470, lng: -87.754953});
                    return stringIsIn(searchString, categoryFilter);
                }
                else {
                    single.marker.setVisible(false);
                };
            });
        }
    } else {
        return ko.utils.arrayFilter(this.locationList(), function(single) {
            var searchString = single.fullAddress.toLowerCase();
            if (stringIsIn(searchString, filter) === true) {
                single.marker.setVisible(true);
                self.searching(true);
                infowindow.close();
                map.setCenter({lat: 42.127470, lng: -87.754953});
                return stringIsIn(searchString, filter);
            }
            else {
                single.marker.setVisible(false);
            };
        });
    }
}, this);


self.hidden = ko.observable(false);


    this.selectLocation = function(theLocation) {
        google.maps.event.trigger(theLocation.marker,'click');
        self.currentLocation(theLocation);
        self.hidden(true);
}

    self.hideList = function() {
        self.hidden(true);
    }

    self.showList = function() {
        self.hidden(false);
        self.currentLocation('');
        if (infowindow) {
            infowindow.close();
            google.maps.event.trigger(map, "resize");
            map.setCenter({lat: 42.127470, lng: -87.754953});
        }
    }

    self.resetSearch = function() {
        self.searching(false);
        self.hidden(false);
        self.filter('');
        self.filterByCategory('');
    }


    self.resetMapZoom = function() {
        google.maps.event.trigger(map, "resize");
        map.setCenter({lat: 42.127470, lng: -87.754953});
        map.setZoom(11);
    }

}

function setAllOnMap() {
    locations.forEach(function(locationItem) {
        locationItem.marker.setVisible(true);
    });
}

