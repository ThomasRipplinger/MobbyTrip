
function loadTripsFromLocalStore() {
    trips = JSON.parse(localStorage.getItem('tripdata'));
    // trips = JSON.parse(localStorage.getItem('trips'));
    logAllTrips('loaded trip data');
}

function saveTripsToLocalStore() {
    localStorage.setItem('tripdata', JSON.stringify(trips));
    logAllTrips('saved trip data');
}


function saveTripsToLocalStore_UIbased() {  // OBSOLETE remove

    // clear trips array
    trips.length = 0;

    // get collection of current trip tiles
    var $triptiles = $('.triptile')

    // iterate over the collection to construct the new trips object array 
    // console.log('found ' + $triptiles.length + ' tiles');
    for (var i = 0; i < $triptiles.length; i++) {
        var $tile = $triptiles.eq(i);
        var trip = {};
        trip['id'] = 't001';
        trip['destination'] = $tile.find('h2').text();
        trip['length'] = $tile.find('.trip-length').text();
        trip['duration'] = $tile.find('.trip-duration').text();
        trip['description'] = $tile.find('.trip-desc-short').text();
        trips.push(trip);
    }

    logAllTrips('Saved trip data');
    localStorage.setItem('trips', JSON.stringify(trips));
}
