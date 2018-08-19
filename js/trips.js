function OnAddTrip() {
    log.info('adding trip...');
    clearTripForm();
    var tripId = createNewTripId();
    var isNewTrip = true;
    initDemoLocations(tripId);
    fillTripFormWithData(tripId, isNewTrip);
    hideTripTiles();
    showTripForm(tripId);
}

function OnViewTrip() {

    log.info('view trip...');
    var tripId = $(this).parent().parent().attr('id');

    
    hideTripTiles();
    showTripForm(tripId);           // ************************************** TODO
    fillTripFormWithData(tripId);
    initDemoLocations(tripId);   // will add locations if no locations exists yet
    // showTripForm(tripId);           // will also show location tiles for trip
}

function OnSaveTripForm() {
    log.info('saving trip data...');
    var tripId;

    tripId = $('.tripForm #tripId').val();
    tripId = parseInt(tripId);
    log.debug('Trip Id: ' + tripId);
   
    // update existing trip
    var tripIndex = getTripIndexById(tripId);   // if not found: returns undefined
    // update data, don't touch locations (saving is done when location data changes)
    if (tripIndex !== undefined) {
        trips[tripIndex].destination = $('.tripForm #destination').val();
        trips[tripIndex].name = $('.tripForm #name').val();
        trips[tripIndex].length = $('.tripForm #length').val();
        trips[tripIndex].duration = $('.tripForm #duration').val();
        trips[tripIndex].desc = $('.tripForm #desc').val();
    }

    // log.debug(trip);   
    saveTripsToLocalStore(); 
    hideLocationsForm();
    hideLocationTiles();
    hideTripForm();     // will also hide location tiles and form
    clearTripForm();    // clear for next time
    displayTripTiles();
}

function OnCancelTripForm() {
    log.info('cancel trip form...');
    var isNewTrip = $('.tripForm #isNew').val();
    if(isNewTrip) {
        log.info('cancel new trip - removing tripId');
        removeTripId();
    }
    else {
        log.info('cancel existing trip - just close form');
    }

    hideLocationsForm();
    hideLocationTiles();
    hideTripForm();     // will also hide location tiles and form
    clearTripForm();    // clear for next time
    displayTripTiles();
}

// destination entered - center map around the dest. 
function OnDestinationEntered() {
    log.info('new destination entered...');
    var destAddress = $('.tripForm #destination').val();
    log.debug('New Destination: ' + destAddress);
    centerMapAroundAddressForTrip(destAddress);
}

function hideTripTiles() {
    // fade out all tiles except for selected one
    // var tiles = $('.triptile').not('#' + tripId);
    var tiles = $('.triptile');
    tiles.fadeOut(700);
}

function displayTripTiles() {
    log.info('display trip tiles...');
    // add all tiles from clean slate
    $('.triptile').remove();   
    if (trips !== null) {
        for (var i = 0; i < trips.length; i++) {
            // log.debug("adding tile id #" + i);
            // log.debug(trips[i]);
            var html = { text: '' };
            makeTileHtml(html, trips[i]);
            $('.tripTiles').append(html.text);
        }

        // ------------- add 'view trip' handler ------------
        $('.viewtrip').click(OnViewTrip);

        // ------------- add 'delete trip' handler ----------
        $('.deletetrip').click(deleteTrip);
        
    }
}

function makeTileHtml(html, trip) {

    html.text = '<div class="col-md-4 triptile" id="' + trip.id + '">'
        + '<div class="row">'
        +   '<h2 class="col-sm-10">' + trip.destination + '</h2>'
        +   '<button type="button" class="deletetrip close col-sm-2" aria-label="Close">'
        +     '<span aria-hidden="true">&times;</span>'
        +   '</button>'
        + '</div>'
        + '<div>'
        + '<span class="trip-length">' + trip.length + ' km</span>'
        + '<span class="trip-duration">' + trip.duration + ' Tage</span>'
        + '</div>'
        + '<span class="trip-desc-short">' + trip.desc + '</span>'
        + '<p><a class="btn btn-secondary viewtrip" href="#" role="button">Anschauen »</a></p>'
        + '</div>';
    // log.debug(html.text);
}

function deleteTrip() {
    log.info('delete trip...');
    
    var destinationToDelete = $(this).parent().find('h2').text();

    if(destinationToDelete === null) {
        log.error('ERROR: can´t find destinationToDelete');
        return;
    }
    log.info('delete trip: ' + destinationToDelete);
    
    // remove tile
    $(this).parent().parent().remove();

    // remove from trips array and store
    var deleteflag = false;
    for(var i=0; i<trips.length; i++) {
        if(trips[i].destination === destinationToDelete){
            log.info('found - deleting trip: ' + destinationToDelete);
            trips.splice(i, 1); // remove 1 element starting from i 
            deleteflag = true;
            break;
        }
    }
    if(deleteflag === false) {
        log.error('ERROR: can´t find destinationToDelete in trips array');
    }
    // setTimeout(saveTripsToLocalStore, 2000);  // only works with timeout 2000ms...
    saveTripsToLocalStore();
}

function removeTripId() {
    log.info('remove trip Id...');

    var tripId = $('.tripForm #tripId').val();
    tripId = parseInt(tripId);
    log.debug('Trip Id: ' + tripId);
    var tripIndex = getTripIndexById(tripId);   // if not found: returns undefined
    if(tripIndex !== undefined) {
        trips.splice(tripIndex, 1); // remove 1 element starting from index 
    }
}

function fillTripFormWithData(tripId, isNewTrip) {
    log.info('fill trip form for trip id:' + tripId);

    var tripIndex = getTripIndexById(tripId);
    if(tripIndex === undefined) return; 

    $('.tripForm #tripId').val(trips[tripIndex].id);
    $('.tripForm #isNew').val(isNewTrip);
    $('.tripForm #destination').val(trips[tripIndex].destination);
    $('.tripForm #name').val(trips[tripIndex].name);
    $('.tripForm #length').val(trips[tripIndex].length);
    $('.tripForm #duration').val(trips[tripIndex].duration);
    $('.tripForm #date').val(trips[tripIndex].date);
    $('.tripForm #desc').val(trips[tripIndex].desc);

    if(trips[tripIndex].destination !== null) {
        centerMapAroundAddressForTrip(trips[tripIndex].destination);
    }
}

function showTripForm(tripId) {
    log.info('show trip form for id: ' + tripId);
    $('.tripForm').slideToggle(500, 'linear', function () {
        toggleNewTripButton();
        // initializeMap('tripMap');
        showLocationTilesForTrip(tripId);
    });
}

function hideTripForm() {
    log.info('hide trip form...');
    $('.tripForm').slideToggle(500, 'linear', function() {
        hideLocationTiles();
        hideLocationsForm();
        toggleNewTripButton();
    });
}

function clearTripForm() {
    log.info('clear trip form...');
    $('.tripForm #tripId').val('');
    $('.tripForm #isNew').val('');
    $('.tripForm #destination').val('');
    $('.tripForm #name').val('');
    $('.tripForm #length').val('');
    $('.tripForm #duration').val('');
    $('.tripForm #date').val('');
    $('.tripForm #desc').val('');
}

function toggleNewTripButton() {
    log.info('toggle trip button');
    $('#createNewTrip').slideToggle(500);
}

function scrollMapIntoView() {
    // var mapElement = document.getElementById('tripMap');
    // mapElement.scrollIntoView({ block: 'start',  behavior: 'smooth' });

    // $('#tripMap').scrollTop(200);

}

function logAllTrips(logcomment) {
    log.info(logcomment);
    if (trips !== null) {
        for (var i = 0; i < trips.length; i++) {
            log.debug('Trip #' + i + ':', trips[i]);
        }
    }
}

function createNewTripId() {
    log.info('create new trip id...');
    var largestId = 0;
    var newId;
    // iterate over trips
    if(trips !== undefined) {
        for(var i=0; i<trips.length; i++) {
            if(parseInt(trips[i].id) > largestId) 
                largestId = parseInt(trips[i].id);
        }
    }
    newId = largestId + 1;

    // init new array member
    if(!trips) trips = [];  // init in case of empty array
    var trip = {
        id: newId,
        destination: '',
        name: '',
        length: '',
        duration: '',
        desc: '',
        locations: []       // init location array with each new trip
    };
    trips.unshift(trip);    // add new trip to beginning of array

    return newId;
}


function getTripIndexById(tripId) {
    // find current trip index in array
    for (var i = 0; i < trips.length; i++) {
        if (parseInt(trips[i].id) === parseInt(tripId)) {
            return(i);
        }
    }
    log.error('ERROR: trip ID not found');
    return(undefined);
}

function OBSOLETE_setNewTripButtonVisibility(show) {
    if (show) {
        $('#createNewTrip').fadeIn(700);
    }
    else {
        $('#createNewTrip').fadeOut(700);

    }
}
