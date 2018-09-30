function OnOkLocationsForm() {
    log.info('saving location form');
    saveLocationsForm();
    hideLocationsForm();
    clearLocationsForm();  // for next time
    scrollIntoView('.jumbotron');
}

function OnNewLocation() {
    log.info('on new location...');
    // first save whatever location form is currently open
    if ($('.locationForm').is(":visible")) {
        saveLocationsForm();  
    }
    hideLocationsForm();
    clearLocationsForm();
    // add overlay then wait for user input
    var html = '<input type="text" class="form-control" id="input-newlocation" placeholder="neuer Ort / Zwischenstopp">';
    $('#btn-newlocation').empty();  // remove field in case already existing
    $(this).append(html);           // overlay current location button with input field
    $('#input-newlocation').keydown(OnLocationPopupKeydown);  // add handler for input processing
    $('#input-newlocation').focus();  
    if(!locationScrolled){              // scroll only once
        locationScrolled = true;
        scrollIntoView('#tripMap');
    }}

function OnDeleteLocation() {
    log.info('delete location...');

    hideLocationsForm();

    var tripId = $('#tripId').val();
    if(tripId == undefined) {
        log.error('ERROR: cant find trip Id');
        return;
    }
    var tripIndex = getTripIndexById(tripId);
    if(tripIndex == undefined) return;

    var locationId = $('#locationId').val();
    if(locationId == undefined) {
        log.error('ERROR: cant find location Id');
        return;
    }

    deleteLocation(tripId, locationId);

    saveTripsToLocalStore();
    clearLocationsForm();
    showLocationTiles(tripId);
}

function OnMoveLocation(event) {
    event.preventDefault(); // supress page reload
    log.info('move location...');

    const directionId = $(this).attr('id');
    log.debug('direction: ' + directionId);  // btnUp or btnDown

    var tripId = $('#tripId').val();
    if(tripId == undefined) {
        log.error('ERROR: cant find trip Id');
        return;
    }
    var tripIndex = getTripIndexById(tripId);
    if(tripIndex == undefined) return;

    var locationId = $('#locationId').val();
    if(locationId == undefined) {
        log.error('ERROR: cant find location Id');
        return;
    }
    var locationIndex = getLocationIndexById(tripIndex, locationId);
    if(locationIndex == undefined) return;

    // verify if at least 2 locations
    const locationCount = trip.tripArray[tripIndex].locations.length;
    if(locationCount < 2) return;

    // move upwards
    if(directionId == 'btnUp') {
        // verify if already on first location
        if(locationIndex == 0) return;
        // swap current with prev. location
        swapLocations(tripIndex, locationIndex, locationIndex-1);
    }
    // move downwards
    if(directionId == 'btnDown') {
        // verify if already on last location
        if(locationIndex == locationCount-1) return;
        // swap current with next location
        swapLocations(tripIndex, locationIndex, locationIndex+1);
    }

    showLocationTiles(tripId);
}

function OnViewLocation() {
    log.info('view location...');
    // toggle state
    $(this).button('toggle');

    // check if same location selected: do nothing
    var newLocationId = $(this).attr('id');
    var prevLocationId = $('#prevlocation').text();
    if (prevLocationId == newLocationId) {  // same
        // if locationsform displayed: save
        if ($('.locationForm').is(":visible")) {
            saveLocationsForm();  
        }
        showLocationForm();                 // toggle form
        if(!locationScrolled){              // scroll only once
            locationScrolled = true;
            scrollIntoView('#tripMap');
        }
        return; 
    }
    else {
        // if locationsform displayed: save
        if ($('.locationForm').is(":visible")) {
            saveLocationsForm();  
        }
        // save new location id
        $('#prevlocation').text(newLocationId);

        // fill location form (and init map)
        fillLocationFormWithData(newLocationId);
    }
    showLocationForm();
    if(!locationScrolled){              // scroll only once
        locationScrolled = true;
        scrollIntoView('#tripMap');
    }
}

function OnLocationPopupKeydown(event) {
    log.debug(event.keyCode);
    if(event.keyCode===13) {     // Enter
        OnLocationPopupEntered();
    }
    else if(event.keyCode===9) { // Tab
        OnLocationPopupEntered();
    }
    else if(event.keyCode===27) { // ESC
        $('#input-newlocation').remove();  // hide input field
        addEmptyLocationTile();
    }
    else if(event.keyCode===32) { // Space
        event.preventDefault();
        var locationName = $('#input-newlocation').val();
        $('#input-newlocation').val(locationName + ' ');  // add space, but prevent leaving the form
    }
}

function OnLocationKeydown(event) {
    if(event.keyCode===13) {     // Enter
        OnFormLocationEntered();
    }
}

function OnLocationPopupEntered(event) {
    log.info('location entered');
    log.debug(event);
    // user has entered a new location in popup overlay
    var locationName = $('#input-newlocation').val();
    $('#input-newlocation').remove();  // hide input field
    // check if valid entry
    if(locationName === '') {
        log.info('no location entered');
        addEmptyLocationTile();  // re-draw 'new location' tile
        return;
    }
    log.info('new location: ' + locationName);

    // add locations tile before the 'new location' tile:
    var tripId = $('.tripForm #tripId').val();
    var locationId = createLocation(tripId, locationName);
    showLocationTiles(tripId);   // update the location tiles
    fillLocationFormWithData(locationId);  // init form and update map
    showLocationForm();  
}

function OnFormLocationEntered() {
    log.info('form location entered...');
    // user has entered a new location in location form => update data and map
    var locationName = $('#locationName').val();
    if((locationName === '') || (locationName == undefined)) {
        log.info('no location entered');
        return;
    }
    log.info('modified location: ' + locationName);

    // update location name in data:
    var tripId = $('.tripForm #tripId').val();
    var locationId = $('.locationForm #locationId').val();
    var tripIndex = getTripIndexById(tripId);
    var locationIndex = getLocationIndexById(tripIndex, locationId);
    var locationDate = trip.tripArray[tripIndex].locations[locationIndex].date;
    trip.tripArray[tripIndex].locations[locationIndex].name = locationName;
    // update location name in tile:
    updateLocationTile(tripId, locationId, locationName, locationDate);
    // update map
    centerMapAroundAddressForLocation(locationName);
}

function OnFormDateEntered(dateText) {
    log.info('form date entered');
    log.debug('date: ' + dateText);

    // user has entered a new date in location form => update tile
    var locationName = $('#locationName').val();
 
    // update location date in data:
    var tripId = $('.tripForm #tripId').val();
    var locationId = $('.locationForm #locationId').val();
    var tripIndex = getTripIndexById(tripId);
    var locationIndex = getLocationIndexById(tripIndex, locationId);
    trip.tripArray[tripIndex].locations[locationIndex].date = dateText;
    // update location date in tile:
    updateLocationTile(tripId, locationId, locationName, dateText);
}

function addLocationTile_OLD(locationId, locationName) {
    log.info('add location tile');

    var html = '<button type="button" '
    + 'class="btn-location locationTile existingLocation" '
    + 'id="' + locationId + '">' 
    + '<span>' + locationName + '<span>'
    + '</button>'
    $('.locationTiles').append(html);

}

function addLocationTile(tripId, locationId) {
    log.info('add location tile');

    if(!trip.opened) {
        log.error('ERROR: trip not open, cant add tile');
        return ERROR;
    }

    var locationIndex = getLocationIndexById(trip.index, locationId);

    var locationName = trip.tripArray[trip.index].locations[locationIndex].name;
    var locationDate = trip.tripArray[trip.index].locations[locationIndex].date;
    locationDate = formatDateForTiledisplay(tripId, locationId, locationDate);
    var distanceFromLastLocation = trip.tripArray[trip.index].locations[locationIndex].distance;
    if(distanceFromLastLocation == undefined) distanceFromLastLocation = '';
    var durationFromLastLocation = trip.tripArray[trip.index].locations[locationIndex].duration;
    if(durationFromLastLocation == undefined) durationFromLastLocation = '';

    // var html = '<div class="btn-location locationTile existingLocation col-md-4" id="' + locationId + '">'
    var html = '<div class="btn-location locationTile existingLocation " id="' + locationId + '">'
        + '<div class="row">'
        // +   '<h4 class="col-sm-10">' + locationName + '</h4>'
        +   '<h4>' + locationName + '</h4>'
        // +   '<button type="button" class="deletelocation close col-sm-2" aria-label="Close">'
        // +     '<span aria-hidden="true">&times;</span>'
        // +   '</button>'
        + '</div>'
        + '<div>'
        + '<span class="location-info" id="locationTileDate">' + locationDate + '</span>'
        + '</div>'
        + '<span class="location-info" id="locationTileDistance">' + distanceFromLastLocation + '</span>'
        + '<span class="location-info" id="locationTileDuration"> ' + durationFromLastLocation + '</span>'
        // + '<p><a class="btn btn-secondary viewlocation" href="#" role="button">Anschauen »</a></p>'
        + '</div>';
    // log.debug(html);
    $('.locationTiles').append(html);
}

function updateLocationTile(tripId, locationId, locationName, locationDate) {
    log.info('update location tile');
    var $locTile = $('#' + locationId);   // find location tile by Id
    if($locTile.length) {
        locationDate = formatDateForTiledisplay(tripId, locationId, locationDate);
        log.debug('location name, date, id: ' + locationName + ', ' + locationDate + ', ' + locationId);
        // $locTile.find('span').text(locationName);   // update the name of the location tile 
        $locTile.find('h4').text(locationName);                  // update name of the location tile 
        $locTile.find('#locationTileDate').text(locationDate);   // update date of the location tile 
    }
    else {
        log.error('ERROR: could not find location tile for name update');
    }
}

function formatDateForTiledisplay(tripId, locationId, locationDate) {
    // undefined? return empty string
    if(locationDate == undefined) {
        // log.debug('tripId ' + tripId + ', locationId ' + locationId + ': undefined date');
        return '';
    }

    var locationIndex = getLocationIndexById(trip.index, locationId);
    if(locationIndex == undefined) return '';

    // first location? add "start"
    if(locationIndex == 0) {
        // log.debug('tripId ' + tripId + ', locationId ' + locationId + ': start');
        return locationDate + ' (Start)';
    }

    // last location? add "end"
    if(locationIndex == trip.tripArray[trip.index].locations.length - 1) {
        // log.debug('tripId ' + tripId + ', locationId ' + locationId + ': end');
        return locationDate + ' (Ende)';
    }

    // stop w/o overnight? add "stopover"
    if(trip.tripArray[trip.index].locations[locationIndex].nights == 0) {
        // log.debug('tripId ' + tripId + ', locationId ' + locationId + ': stopover');
        return locationDate + ' (Zwischenstop)';
    }

    // 1 night? return date w/o change
    if(trip.tripArray[trip.index].locations[locationIndex].nights == 1) {
        // log.debug('tripId ' + tripId + ', locationId ' + locationId + ': 1 night');
        return locationDate;
    }

    // more than 1 night? add # of nights to date
    // log.debug('tripId ' + tripId + ', locationId ' + locationId + ': several nights');
    return locationDate + ' (' + trip.tripArray[trip.index].locations[locationIndex].nights + ' Tage)';
}

function addEmptyLocationTile() {
    log.info('add empty location tile');
    $('#btn-newlocation').remove();  // remove
    var html = '<button type="button" class="btn-location locationTile" id="btn-newlocation">' 
            + '<span class="mr-3">' + 'Ort hinzufügen' + '</span>'
            + '<i class="fas fa-angle-double-right"></i></button>';
    $('.locationTiles').append(html);  // add
    $('#btn-newlocation').click(OnNewLocation);
}

function showLocationTiles() {
    log.info('show location tiles for trip: ' + tripId);

    if(!trip.opened) {
        log.error('ERROR: trip not open, cant show tiles');
        return ERROR;
    }

    $('.locationTiles').empty();  // delete all existing locations

    // add existing locations for this trip:
    if(trip.tripArray[trip.index].locations) {
        for (var i = 0; i < trip.tripArray[trip.index].locations.length; i++) {
            addLocationTile(trip.id, trip.tripArray[trip.index].locations[i].id);
            log.debug('adding location: ' + trip.tripArray[trip.index].locations[i].name);
        }
    }
    // add handlers
    $('.existingLocation').click(OnViewLocation);

    // button 'add new' at the end:
    addEmptyLocationTile(); 

    // show location tiles
    if(!($('.locationsContainer').is(':visible'))) {
        $('.locationsContainer').slideToggle(500, 'linear', function () {
            // log.debug('toggling location tiles');
        });
    }
} 

function hideLocationTiles() {
    log.info('hide location tiles');
    $('.locationsContainer').fadeOut(700);    
}

function fillLocationFormWithData(locationId) {
    log.info('fill location form with data');
    $('.locationForm #locationId').val(trip.locId);
    $('.locationForm #locationName').val(trip.locName);
    $('.locationForm #locationDate').val(trip.locDate);
    $('.locationForm #locationNights').val(trip.locNights);
    $('.locationForm #locationDistance').val(trip.locDistance);
    $('.locationForm #locationDuration').val(trip.locDuration);
    $('.locationForm #locationAddress').val(trip.locAddress);
    $('.locationForm #locationDesc').val(trip.locDescription);

    // $('.locationForm #locationId').val(trip.tripArray[tripIndex].locations[locationIndex].id);
    // $('.locationForm #locationName').val(trip.tripArray[tripIndex].locations[locationIndex].name);
    // $('.locationForm #locationDate').val(trip.tripArray[tripIndex].locations[locationIndex].date);
    // $('.locationForm #locationNights').val(trip.tripArray[tripIndex].locations[locationIndex].nights);
    // $('.locationForm #locationDistance').val(trip.tripArray[tripIndex].locations[locationIndex].distance);
    // $('.locationForm #locationDuration').val(trip.tripArray[tripIndex].locations[locationIndex].duration);
    // $('.locationForm #locationAddress').val(trip.tripArray[tripIndex].locations[locationIndex].address);
    // $('.locationForm #locationDesc').val(trip.tripArray[tripIndex].locations[locationIndex].desc);

    centerMapAroundAddressForLocation(trip.locName);
}

function showLocationForm() {
    log.info('show location form');
    // toggle only if not visible
    if(!($('.locationForm').is(':visible'))) {
        $('.locationForm').slideToggle(500, 'linear', function () {
            ;
        });
    }
}

function hideLocationsForm() {
    log.info('hide location form');
    $('.locationForm').fadeOut(1000 );    
}

function clearLocationsForm() {
    log.info('clear location form');
    $('.locationForm #locationId').val('');
    $('.locationForm #locationName').val('');
    $('.locationForm #locationDate').val('');
    $('.locationForm #locationNights').val('');
    $('.locationForm #locationDistance').val('');
    $('.locationForm #locationDuration').val('');
    $('.locationForm #locationAddress').val('');
    $('.locationForm #locationDesc').val('');
}

function saveLocationsForm() {
    log.info('save location form');
    var locationId;
    var locationIndex;
    var newLocation;
    var tripId = $('.tripForm #tripId').val();
    var tripIndex = getTripIndexById(tripId);
    log.info('saving location data for trip index:' + tripIndex);

    // check if new location (Id field empty)
    var locationId = $('.locationForm #locationId').val();
    if (locationId === '') {
        log.error('ERROR: location id not found - cant save');
        return ERROR;
    }
    locationId = parseInt(locationId);
    locationIndex = getLocationIndexById(tripIndex, locationId);

    // prepare object with form data
    var location = {
        id: locationId,
        name: $('.locationForm #locationName').val(),
        date: $('.locationForm #locationDate').val(),
        nights: $('.locationForm #locationNights').val(),
        distance: $('.locationForm #locationDistance').val(),
        duration: $('.locationForm #locationDuration').val(),
        address: $('.locationForm #locationAddress').val(),
        desc: $('.locationForm #locationDesc').val()
    };

    trip.tripArray[tripIndex].locations[locationIndex] = location;
    saveTripsToLocalStore();
}

function createLocation(tripId, locationName) {
    log.info('create new location id');
    var tripIndex = getTripIndexById(tripId);
    if(tripIndex == undefined) {
        log.error('ERROR: could not find tripIndex');
        return undefined;
    }
    var largestId = 0;
    var newId;
    // iterate over locations of current trip
    if(trip.tripArray[tripIndex].locations) { 
        if (trip.tripArray[tripIndex].locations) {
            for (var i = 0; i < trip.tripArray[tripIndex].locations.length; i++) {
                if (parseInt(trip.tripArray[tripIndex].locations[i].id) > largestId)
                    largestId = parseInt(trip.tripArray[tripIndex].locations[i].id);
            }
        }
    }
    newId = largestId + 1;

    // init locations array if empty
    if (trip.tripArray[tripIndex].locations === undefined) {
        trip.tripArray[tripIndex].locations = [];
    }
    trip.tripArray[tripIndex].locations.push({id: newId, name: locationName}); // add new location to array

    return newId;
}

function deleteLocation(tripId, locationId) {
    log.info('delete location');
    log.debug('location Id: ' + locationId);

    if(tripId == undefined) return ERROR;
    var tripIndex = getTripIndexById(tripId);   // if not found: returns undefined
    if(tripIndex == undefined) return ERROR;

    if(locationId == undefined) return ERROR;
    var locationIndex = getLocationIndexById(tripIndex, locationId);   // if not found: returns undefined
    if(locationIndex == undefined) return ERROR;

    trip.tripArray[tripIndex].locations.splice(locationIndex, 1); // remove 1 element starting from index 
    return OK; 
}

function swapLocations(tripIndex, firstIndex, secondIndex) {
    const firstLocation = trip.tripArray[tripIndex].locations[firstIndex];
    const secondLocation = trip.tripArray[tripIndex].locations[secondIndex];
    trip.tripArray[tripIndex].locations[secondIndex] = firstLocation;
    trip.tripArray[tripIndex].locations[firstIndex] = secondLocation;
}

function getLocationIndexById(tripIndex, locationId) {
    // find current location index in array
    for (var i = 0; i < trip.tripArray[tripIndex].locations.length; i++) {
        if (parseInt(trip.tripArray[tripIndex].locations[i].id) === parseInt(locationId)) {
            return (i);
        }
    }
    log.error('ERROR: location ID not found');
    return (undefined);
}

function initDemoLocations(tripId) {
    log.info('init demo locations');
    var tripIndex = getTripIndexById(tripId);
    if(tripIndex == undefined) return;

    // init if no locations exist yet
    if (trip.tripArray[tripIndex].locations === undefined) {
        trip.tripArray[tripIndex].locations = [];

        var locId = createLocation(tripId);
        trip.tripArray[tripIndex].locations[0] = {
            id: locId,
            name: 'Ort1',
            desc: 'blabla'
        };

        locId = createLocation(tripId);
        trip.tripArray[tripIndex].locations.push({
            id: locId,
            name: 'Ort2',
            desc: 'blabla'
        });

        locId = createLocation(tripId);
        trip.tripArray[tripIndex].locations.push({
            id: locId,
            name: 'Ort3',
            desc: 'blabla'
        });
        log.debug(trip.tripArray[tripIndex].locations);
    }
}
