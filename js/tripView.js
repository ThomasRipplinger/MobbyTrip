
function OnAddTrip() {
    log.info('adding new trip');
    // var tripId = createTrip();
        
    var tripId = trip.create();
    trip.open(tripId);
    if(!trip.opened) {
        log.error('ERROR - could not create new trip');
        return;
    }
    
    clearTripForm();
    // initDemoLocations(trip.id);   TODO
    fillTripFormWithData(true);   // true = neuer Trip
    hideTripTiles();
    showTripForm();
}

function OnDeleteTrip() {
    log.info('delete trip...');
    
    var tripNameToDelete = $(this).parent().find('h2').text();

    if(tripNameToDelete === null) {
        log.error('ERROR: can´t find trip name for delete');
        return;
    }
    log.info('delete trip: ' + tripNameToDelete);
    
    // remove tile
    $(this).parent().parent().remove();

    // remove trip data
    trip.deleteByName(tripNameToDelete);
    trip.saveToLocalStore();
}

function OnViewTrip() {
    log.info('view trip');
    var tripId = $(this).parent().parent().attr('id');

    if((tripId == undefined) || (tripId == null)) {
        log.error('ERROR: trip id for selected trip not found');
        return ERROR;
    }

    trip.open(tripId);
    if(trip.opened) {
        hideTripTiles();
        showTripForm();           
        fillTripFormWithData();
        //initDemoLocations(tripId);          // TODO - will add locations if no locations exists yet
        scrollIntoView('#tripMap');
    }
    else {
        log.error('ERROR: unable to open trip: ' + trip.id);
    }
}

function OnSaveTripForm() {
    log.info('saving trip data');
    var tripId;

    if($('.tripForm #destination').val().length == 0) {
        log.info('no trip name - no saving');
        return;
    }

    tripId = parseInt($('.tripForm #tripId').val());
    log.debug('saving trip Id: ' + tripId);
   
    // update existing trip
    // update trip data, don't touch locations (saving is done when location data changes)
  
    trip.open(tripId);
    if (trip.opened) {
        trip.destination = $('.tripForm #destination').val();
        trip.date = $('.tripForm #date').val();
        trip.length = $('.tripForm #length').val();
        trip.duration = $('.tripForm #duration').val();
        trip.description = $('.tripForm #desc').val();
    }

    // log.debug(trip);   
    trip.saveToLocalStore(); 
    hideLocationsForm();
    hideLocationTiles();
    hideTripForm();     // will also hide location tiles and form
    clearTripForm();    // clear for next time
    displayTripTiles();
    locationScrolled = false;
}

function OnCancelTripForm() {
    log.info('cancel trip form...');
    var isNewTrip = $('.tripForm #isNew').val();
    if(isNewTrip) {
        log.info('cancel new trip - removing tripId');
        trip.delete();
    }
    else {
        log.info('cancel existing trip - just close form');
    }

    hideLocationsForm();
    hideLocationTiles();
    hideTripForm();     // will also hide location tiles and form
    clearTripForm();    // clear for next time
    displayTripTiles();
    locationScrolled = false;
}

// destination entered - center map around the dest. 
function OnDestinationEntered() {
    log.info('new destination entered...');
    var destAddress = $('.tripForm #destination').val();
    log.debug('New Destination: ' + destAddress);
    centerMapAroundAddressForTrip(destAddress);
}

function OnSettings(event) {
    event.preventDefault(); // supress page reload
    popUpAppender.show();
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
    if (trip.tripArray) {
        const numberOfTiles = trip.tripArray.length;
        for (var i = 0; i < trip.tripArray.length; i++) {
            // log.debug("adding tile id #" + i);
            // log.debug(trip.tripArray[i]);
            var html = { text: '' };
            makeTripTileHtml(html, trip.tripArray[i]);
            $('.tripTiles').append(html.text);
        }

        // ------------- add 'view trip' handler ------------
        $('.viewtrip').click(OnViewTrip);

        // ------------- add 'delete trip' handler ----------
        $('.deletetrip').click(OnDeleteTrip);
        
    }
} 

function makeTripTileHtml(html, tripItem) {

    html.text = '<div class="col-md-4 triptile" id="' + tripItem.id + '">'
        + '<div class="row">'
        +   '<h2 class="col-sm-10">' + tripItem.destination + '</h2>'
        +   '<button type="button" class="deletetrip close col-sm-2" aria-label="Close">'
        +     '<span aria-hidden="true">&times;</span>'
        +   '</button>'
        + '</div>'
        + '<div>'
        + '<span class="trip-length">' + tripItem.length + ' km</span>'
        + '<span class="trip-duration">' + tripItem.duration + ' Tage</span>'
        + '</div>'
        + '<span class="trip-desc-short">' + tripItem.desc + '</span>'
        + '<p><a class="btn btn-secondary viewtrip" href="#" role="button">Anschauen »</a></p>'
        + '</div>';
    // log.debug(html.text);
}

function fillTripFormWithData(isNewTrip) {
    log.info('fill trip form for trip id:' + trip.id);

    $('.tripForm #tripId').val(trip.id);
    $('.tripForm #isNew').val(isNewTrip);
    $('.tripForm #destination').val(trip.destination);
    $('.tripForm #length').val(trip.length);
    $('.tripForm #duration').val(trip.duration);
    $('.tripForm #date').val(trip.date);
    $('.tripForm #desc').val(trip.description);
    // $('.tripForm #tripId').val(trip.tripArray[trip.index].id);
    // $('.tripForm #isNew').val(isNewTrip);
    // $('.tripForm #destination').val(trip.tripArray[trip.index].destination);
    // $('.tripForm #length').val(trip.tripArray[trip.index].length);
    // $('.tripForm #duration').val(trip.tripArray[trip.index].duration);
    // $('.tripForm #date').val(trip.tripArray[trip.index].date);
    // $('.tripForm #desc').val(trip.tripArray[trip.index].description);

    if(trip.destination !== null) {
        centerMapAroundAddressForTrip(trip.destination);
    }
}

function showTripForm() {
    log.info('show trip form for id: ' + trip.id);
    $('.tripForm').slideToggle(500, 'linear', function () {
        toggleNewTripButton();
        // initializeMap('tripMap');
        showLocationTiles();
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
    $('.tripForm #length').val('');
    $('.tripForm #duration').val('');
    $('.tripForm #date').val('');
    $('.tripForm #desc').val('');
    $('.tripForm #directionsStatus').val('');
}

function toggleNewTripButton() {
    log.info('toggle trip button');
    $('#btnCreateNewTrip').slideToggle(500);
}

function scrollIntoView(elementSelector) {
    $('html, body').animate({ scrollTop: $(elementSelector).offset().top } , 1000 );    
}
