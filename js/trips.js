function ClickAddTrip() {
    clearTripForm();
    showTripForm();
}

function ClickViewTrip() {

    // console.log('show trip details...');
    var tripId = $(this).parent().parent().attr('id');
    
    // fade out all tiles except for selected one
    // var tiles = $('.triptile').not('#' + tripId);
    // fade out ALL tiles 
    var tiles = $('.triptile');
    tiles.fadeOut(700);

    // show trip form with data of selected trip
    var tripIndex = getTripIndexForId(tripId);
    if(tripIndex) {
        fillTripFormWithData(tripIndex);
    }

    // show location tiles
    $('.tripdetail').fadeIn(700);
    initDemoLocations(tripIndex);   
    showLocationTiles(tripIndex);  

}

function ClickSaveTripForm() {
    var tripId;
    var locations = [];
    console.log('saving trip data...');

    tripId = $('.newtrip #id').val();
    console.log('Trip Id: ' + tripId);

    // check if new trip
    if (tripId === '') {
        newTrip = true;
        console.log('new trip...');
        tripId = createNewTripId();
    }
    else {
        newTrip = false;
        tripId = parseInt(tripId);
    }

    var trip = {
        id: tripId,
        destination: $('.newtrip #destination').val(),
        name: $('.newtrip #name').val(),
        length: $('.newtrip #length').val(),
        duration: $('.newtrip #duration').val(),
        // date: $('.newtrip #date').val(),
        desc: $('.newtrip #desc').val(),
        locations: locations
    };

    if (newTrip) {
        trips.unshift(trip);  // add new trip to beginning of array
    }
    else {
        // find current trip index in array
        var tripIndex = getTripIndexForId(tripId);
        // update data
        if (tripIndex) {
            trips[tripIndex] = trip;
        }
    }

    // console.log(trip);   
    saveTripsToLocalStore(); 
    closeTripForm();  // will also hide location tiles and form
    displayTripTiles();
    clearTripForm();  // clear for next time

    // if(newTrip) {
    //     // hide new trip form & add tile 
    //     $('.newtrip').slideToggle(700, 'linear', function () {
    //     var html = { text: '' };
    //     makeTileHtml(html, trip);                      // create html for new tile with new trip data
    //     $('.triptiles').prepend(html.text);            // add as first tile
    //     $('.viewtrip').eq(0).click(viewTripDetails);   // add handler
    //     $('.deletetrip').eq(0).click(deleteTrip);      // add handler
    //     });
    // }
    // else {   // just close trip form
        // closeTripForm();
    // }
}

function ClickCancelTripForm() {
    closeTripForm();
    displayTripTiles();
    clearTripForm();
}

function displayTripTiles() {

    // add all tiles from clean slate
    $('.triptile').remove();   
    if (trips !== null) {
        for (var i = 0; i < trips.length; i++) {
            // console.log("adding tile id #" + i);
            // console.log(trips[i]);
            var html = { text: '' };
            makeTileHtml(html, trips[i]);
            $('.triptiles').append(html.text);
        }

        // ------------- add 'view trip' handler ------------
        $('.viewtrip').click(ClickViewTrip);

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
    // console.log(html.text);
}

function deleteTrip() {
    
    var destinationToDelete = $(this).parent().find('h2').text();

    if(destinationToDelete === null) {
        console.log('ERROR: can´t find destinationToDelete');
        return;
    }
    console.log('delete trip: ' + destinationToDelete);
    
    // remove tile
    $(this).parent().parent().remove();

    // remove from trips array and store
    var deleteflag = false;
    for(var i=0; i<trips.length; i++) {
        if(trips[i].destination === destinationToDelete){
            console.log('found - deleting trip: ' + destinationToDelete);
            trips.splice(i, 1); // remove 1 element starting from i 
            deleteflag = true;
            break;
        }
    }
    if(deleteflag === false) {
        console.log('ERROR: can´t find destinationToDelete in trips array');
    }
    // setTimeout(saveTripsToLocalStore, 2000);  // only works with timeout 2000ms...
    saveTripsToLocalStore();
}

function fillTripFormWithData(tripIndex) {
    // console.log('selected trip index:');
    // console.log(tripIndex);  
    $('.newtrip #id').val(trips[tripIndex].id);
    $('.newtrip #destination').val(trips[tripIndex].destination);
    $('.newtrip #name').val(trips[tripIndex].name);
    $('.newtrip #length').val(trips[tripIndex].length);
    $('.newtrip #duration').val(trips[tripIndex].duration);
    $('.newtrip #date').val(trips[tripIndex].date);
    $('.newtrip #desc').val(trips[tripIndex].desc);

    centerTripMapAroundAddress(trips[tripIndex].destination, "map");
    showTripForm();
}

function showTripForm() {
    $('.newtrip').slideToggle(500, 'linear', function () {
        initializeMap();
        toggleNewTripButton();
    });

}

function closeTripForm() {
    $('.newtrip').slideToggle(500, 'linear', function() {
        hideLocationTiles();
        hideLocationsForm();
        toggleNewTripButton();
    });
}

// destination entered - center map around the dest. 
function destinationEntered() {
    var destAddress = $('.newtrip #destination').val();
    console.log('New Destination: ' + destAddress);
    centerTripMapAroundAddress(destAddress, "map");
}

function clearTripForm() {
    $('.newtrip #id').val('');
    $('.newtrip #destination').val('');
    $('.newtrip #name').val('');
    $('.newtrip #length').val('');
    $('.newtrip #duration').val('');
    $('.newtrip #date').val('');
    $('.newtrip #desc').val('');
}

function logAllTrips(logcomment) {
    console.log(logcomment);
    if (trips !== null) {
        for (var i = 0; i < trips.length; i++) {
            console.log('Trip #' + i + ':');
            console.log(trips[i]);
        }
    }
}

function createNewTripId() {
    var largestId = 0;
    // iterate over trips
    if(trips !== undefined) {
        for(var i=0; i<trips.length; i++) {
            if(parseInt(trips[i].id) > largestId) 
                largestId = parseInt(trips[i].id);
        }
    }
    return largestId + 1;
}


function toggleNewTripButton() {
    $('#createNewTrip').slideToggle(500);
}

function getTripIndexForId(tripId) {
    // find current trip index in array
    var i = 0;
    for (i = 0; i < trips.length; i++) {
        if (parseInt(trips[i].id) === parseInt(tripId)) {
            return(i);
        }
    }
    if (i === trips.length) {
        console.log('ERROR: trip ID not found');
        return(undefined);
    }
}

function OBSOLETE_setNewTripButtonVisibility(show) {
    if (show) {
        $('#createNewTrip').fadeIn(700);
    }
    else {
        $('#createNewTrip').fadeOut(700);

    }
}
