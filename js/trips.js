
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
    var tiles = $('.triptile').not('#' + currentId);
    tiles.fadeOut(700);
    // show trip-detail form
    $('.tripdetail').fadeIn(700);
    displayLocationList();
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

// NEW TRIP - show form  #########################
function showNewTripForm() {

    $('.newtrip').slideToggle(500, 'linear', function () {
        clearNewTripForm();
        // ##################
        initializeMap();
        console.log('initDemoLocations...');
        initDemoLocations();
    });
}

// NEW TRIP - SAVE ###############################
function saveNewTrip() {

    console.log('saving trip data...');
    var trip = {
        id: 't001',
        destination: $('.newtrip #destination').val(),
        name: $('.newtrip #name').val(),
        length: $('.newtrip #length').val(),
        duration: $('.newtrip #duration').val(),
        // date: $('.newtrip #date').val(),
        desc: $('.newtrip #desc').val()
    };
    
    // add to trip array and store
    trips.unshift(trip);
    saveTripsToLocalStore(); 

    // add tile with new trip data
    var html = { text: '' };
    makeTileHtml(html, trip);

    // hide new trip form & clear for next time
    $('.newtrip').slideToggle(700, 'linear', function () {
        $('.triptiles').prepend(html.text);
    });
    // setTimeout(saveTripsToLocalStore, 2000);  // only works with timeout 2000ms...
    clearNewTripForm();
}

// Destination entered - center map around the dest. 
function destinationEntered() {
    console.log('New Destination: ' + $('.newtrip #destination').val());
    codeAddress();
}

function cancelNewTripForm() {
    $('.newtrip').slideToggle(500, 'linear');
    clearNewTripForm();
}

function clearNewTripForm() {
    $('.newtrip #destination').val('');
    $('.newtrip #name').val('');
    $('.newtrip #length').val('');
    $('.newtrip #duration').val('');
    $('.newtrip #date').val('');
    $('.newtrip #desc').val('');
}

function logTrips(logcomment) {
    console.log(logcomment);
    return(true); // ####################################

    if (trips !== null) {
        for (var i = 0; i < trips.length; i++) {
            console.log('Trip #' + i + ':');
            console.log(trips[i]);
        }
    }
}

