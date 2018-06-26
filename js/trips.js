
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
        $('.viewtrip').click(viewTripDetails);

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

function viewTripDetails() {

    console.log('show trip details...');
    var currentId = $(this).parent().parent().attr('id');
    
    // fade out all tiles except for selected one
    // var tiles = $('.triptile').not('#' + currentId);
    // fade out ALL tiles 
    var tiles = $('.triptile');
    tiles.fadeOut(700);

    // show trip form with data of selected trip
    // var selectedTrip = null;
    var selectedTripIndex = null;
    for(var i=0; i<trips.length; i++) {
        var tripId = trips[i].id;
        if(parseInt(currentId) === parseInt(tripId)) {
            // selectedTrip = trips[i];
            selectedTripIndex = i;
            break;
        }
    }
    if(selectedTripIndex === null) {
        console.log('Error: selected trip not found or ID not set');
        showTripFormNew();
    }
    else {
        showTripFormFilled(selectedTripIndex);
    }

    // show trip-detail form
    $('.tripdetail').fadeIn(700);
    // displayLocationList();
    initTripDetailForm();
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

// NEW TRIP - show empty form  
function showTripFormNew() {
    clearTripForm();
    showTripForm();
}

// show form  
function showTripForm() {

    // remove "new trip" button
    $('#createNewTrip').css("display", "none");

    // show form
    $('.newtrip').slideToggle(500, 'linear', function () {
        initializeMap();
        initTripDetailForm();
    });

}

// EDIT TRIP - show form with data
function showTripFormFilled(selectedTripIndex) {
    
    console.log('selected trip index:');
    console.log(selectedTripIndex);  // ######################### TODO: remove
    $('.newtrip #id').val(trips[selectedTripIndex].id);
    $('.newtrip #destination').val(trips[selectedTripIndex].destination);
    $('.newtrip #name').val(trips[selectedTripIndex].name);
    $('.newtrip #length').val(trips[selectedTripIndex].length);
    $('.newtrip #duration').val(trips[selectedTripIndex].duration);
    $('.newtrip #date').val(trips[selectedTripIndex].date);
    $('.newtrip #desc').val(trips[selectedTripIndex].desc);

    centerMapAroundAddress(trips[selectedTripIndex].destination, "map");
    showTripForm();
}

function closeTripForm() {
    $('.newtrip').slideToggle(500, 'linear', function() {
        // show "new trip" button again
        $('#createNewTrip').css("display", "inline");
    });
}

// NEW TRIP - SAVE ###############################
function saveTripFormData() {

    var newTrip;
    var tripId;
    console.log('saving trip data...');

    tripId = $('.newtrip #id').val();
    console.log('Trip Id: ' + tripId);

    // check if new trip
    if(tripId ==='') {
        console.log('new trip...');
        newTrip = true;
        var trip = {
            id: createNewTripId(),
            destination: $('.newtrip #destination').val(),
            name: $('.newtrip #name').val(),
            length: $('.newtrip #length').val(),
            duration: $('.newtrip #duration').val(),
            // date: $('.newtrip #date').val(),
            desc: $('.newtrip #desc').val()
        };
        trips.unshift(trip);  // add to beginning of array
    }
    else {
        newTrip = false;
        // find current trip index in array
        for(var i=0; i<trips.length; i++) {
            if(parseInt(trips[i].id) === parseInt(tripId)) {
                trips[i] = {
                    id: parseInt(tripId),
                    destination: $('.newtrip #destination').val(),
                    name: $('.newtrip #name').val(),
                    length: $('.newtrip #length').val(),
                    duration: $('.newtrip #duration').val(),
                    // date: $('.newtrip #date').val(),
                    desc: $('.newtrip #desc').val()
                };
                break;
            }
        }
        if(i === trips.length + 1) {   // TODO: test #####################
            console.log('ERROR: trip ID not found, not saving!');
            return;   
        }
    }

    console.log(trip);   // TODO: remove ########################
    saveTripsToLocalStore(); 
    closeTripDetailForm();
    displayTripTiles();

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
        closeTripForm();
    // }

    // clear for next time
    clearTripForm();
}

// destination entered - center map around the dest. 
function destinationEntered() {
    var destAddress = $('.newtrip #destination').val();
    console.log('New Destination: ' + destAddress);
    centerMapAroundAddress(destAddress, "map");
}

function cancelTripForm() {
    closeTripDetailForm();
    closeTripForm();
    displayTripTiles();
    clearTripForm();
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
    return(true); // ####################################

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

