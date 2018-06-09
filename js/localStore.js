
// LOAD TIPS FROM LOCAL STORE ########################
function loadTripsFromLocalStore() {
    trips = JSON.parse(localStorage.getItem('trips'));
    logTrips('Loading trip data...');
}

// SAVE TRIP TO LOCAL STORE ##########################
function saveTripsToLocalStore() {

    // clear trips array
    trips.length = 0;

    // get collection of current trip tiles
    var $triptiles = $('.triptile')

    // iterate over the collection to construct the new trips object array 
    console.log('found ' + $triptiles.length + ' tiles');
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

    logTrips('Saved trip data:');
    localStorage.setItem('trips', JSON.stringify(trips));
}
