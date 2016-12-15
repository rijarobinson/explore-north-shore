var ViewModel = function() {
    var self = this;

    /* Establish basic bindings */

    this.locationList = ko.observableArray([]);
    this.currentLocation = ko.observable( this.locationList()[0] );
    this.selectedChoice = ko.observable( this.locationList()[0] );


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

/* Add filter features */


    this.filter = ko.observable("");
    this.searching = ko.observable(false);
    this.categoryFilter = ko.observable("");

    this.filterByCategory = function(category) {
        self.categoryFilter(category.category);
        self.filter('');
        self.showList();
    }

/* If there is no text typed in filter input and category hasn't been
    clicked, just display the locationItems. Otherwise, find matches
    using the ko filter and display them */

    this.filteredItems = ko.computed(function() {
        var categoryFilter = self.categoryFilter();
        var filter = self.filter().toLowerCase();
        var searchString;
        if (!filter) {
            if (!categoryFilter) {
                self.searching(false);
                setAllOnMap();
                return this.locationList();
            }
            else {
                return ko.utils.arrayFilter(this.locationList(),
                    function(single) {
                    console.log("searchString:" + searchString);
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
            return ko.utils.arrayFilter(this.locationList(),
                function(single) {
                searchString = single.fullAddress.toLowerCase();
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




/* Hide/show elements */

    this.hidden = ko.observable(false);

/* If a single location is selected, hide certain elements and show
    the single location elements */

    self.selectLocation = function(theLocation) {
        google.maps.event.trigger(theLocation.marker,"click");
        self.currentLocation(theLocation);
        self.hidden(true);
    }

    self.selectedChoice.subscribe(function(theLocation) {
        google.maps.event.trigger(theLocation.marker,"click");
        self.currentLocation(theLocation);
    });

    self.hideList = function() {
        self.hidden(true);
    }

    self.showList = function() {
        self.hidden(false);
        self.currentLocation("");
        if (infowindow) {
            infowindow.close();
            google.maps.event.trigger(map, "resize");
            map.setCenter({lat: 42.127470, lng: -87.754953});
        }
    }

    self.resetSearch = function() {
        self.searching(false);
        self.hidden(false);
        self.filter("");
        self.filterByCategory("");
    }

    self.resetMapZoom = function() {
        google.maps.event.trigger(map, "resize");
        map.setCenter({lat: 42.127470, lng: -87.754953});
        map.setZoom(11);
    }
}