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
    scrollIntoView('#tripMap');
}

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
    var locationIndex = getLocationIndexById(tripIndex, locationId);
    if(locationIndex == undefined) return;

    log.debug('delete location: ' + locationId + ' index: ' + locationIndex);

    trips[tripIndex].locations.splice(locationIndex, 1); // remove 1 element starting from index 

    saveTripsToLocalStore();
    clearLocationsForm();
    showLocationTilesForTrip(tripId);
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
    const locationCount = trips[tripIndex].locations.length;
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

    showLocationTilesForTrip(tripId);
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
        scrollIntoView('#tripMap');
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
    scrollIntoView('#tripMap');
}

function OnLocationPopupKeydown(event) {
    log.debug(event.keyCode);
    if(event.keyCode===13) {     // Enter
        OnLocationPopupEntered();
    }
    else if(event.keyCode===27) { // ESC
        $('#input-newlocation').remove();  // hide input field
        addEmptyLocationTile();
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
    var locationId = createNewLocationId(tripId);
    addLocationData(tripId, locationId, locationName);  // add location to array
    showLocationTilesForTrip(tripId);   // update the location tiles
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
    trips[tripIndex].locations[locationIndex].name = locationName;
    // update location name in tile:
    updateLocationTile(locationId, locationName);
    // update map
    centerMapAroundAddressForLocation(locationName);
}

function addLocationTile(locationId, locationName) {
    log.info('add location tile');

    var html = '<button type="button" '
    + 'class="btn-location locationTile existingLocation" '
    + 'id="' + locationId + '">' 
    + '<span>' + locationName + '<span>'
    + '</button>'
    // close icon (bootstrap times icon X)
    // +   '<button type="button" class="deleteLocation close" aria-label="Close">'
    // +   '<span aria-hidden="true">&times;</span>'
    // +   '</button>';
    // log.debug(html);
    $('.locationTiles').append(html);

    // add 'delete location' handler 
    // $('.deleteLocation').off("click");           // remove all existing
    // $('.deleteLocation').click(deleteLocation);  // ensure we only have one per button
}

function updateLocationTile(locationId, locationName) {
    log.info('update location tile');
    var $locTile = $('#' + locationId);   // find location tile by Id
    if($locTile.length) {
        log.debug('location name and id: ' + locationName + ', ' + locationId);
        $locTile.find('span').text(locationName);   // update the name of the location tile 
    }
    else {
        log.error('ERROR: could not find location tile for name update');
    }
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

function showLocationTilesForTrip(tripId) {
    log.info('show location tiles for trip: ' + tripId);

    var tripIndex = getTripIndexById(tripId);
    if(tripIndex===undefined) return;

    // $('.locationTiles').not('#addNewLocation').remove();
    $('.locationTiles').empty();  // delete all existing locations

    // add existing locations for this trip:
    if(trips[tripIndex].locations) {
        for (var i = 0; i < trips[tripIndex].locations.length; i++) {
            addLocationTile(trips[tripIndex].locations[i].id, trips[tripIndex].locations[i].name);
            log.debug('adding location: ' + trips[tripIndex].locations[i].name);
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
    var tripId = $('.tripForm #tripId').val();
    var tripIndex = getTripIndexById(tripId);
    var locationIndex = getLocationIndexById(tripIndex, locationId);
    $('.locationForm #locationId').val(trips[tripIndex].locations[locationIndex].id);
    $('.locationForm #locationName').val(trips[tripIndex].locations[locationIndex].name);
    $('.locationForm #locationAddress').val(trips[tripIndex].locations[locationIndex].address);
    $('.locationForm #locationDesc').val(trips[tripIndex].locations[locationIndex].desc);
    $('.locationForm #locationNights').val(trips[tripIndex].locations[locationIndex].nights);
    $('.locationForm #locationCost').val(trips[tripIndex].locations[locationIndex].cost);
    $('.locationForm #locationSource').val(trips[tripIndex].locations[locationIndex].source);

    centerMapAroundAddressForLocation(trips[tripIndex].locations[locationIndex].name);
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
    $('.locationForm #locationAddress').val('');
    $('.locationForm #locationDesc').val('');
    $('.locationForm #locationNights').val('');
    $('.locationForm #locationCost').val('');
    $('.locationForm #locationSource').val('');
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
        log.info('saving new location...');
        newLocation = true;
        locationId = createNewLocationId(tripId);
    }
    else {
        newLocation = false;
        locationId = parseInt(locationId);
    }
    locationIndex = getLocationIndexById(tripIndex, locationId);

    // prepare object with form data
    var location = {
        id: locationId,
        name: $('.locationForm #locationName').val(),
        desc: $('.locationForm #locationDesc').val(),
        address: $('.locationForm #locationAddress').val(),
        nights: $('.locationForm #locationNights').val(),
        cost: $('.locationForm #locationCost').val(),
        source: $('.locationForm #locationSource').val()
    };

    if(newLocation) {
        // init locations array if empty
        if (trips[tripIndex].locations === undefined) {
            trips[tripIndex].locations = [];
        }
        trips[tripIndex].locations.push(location); // add new location to array
    }
    else {   // just update data
        trips[tripIndex].locations[locationIndex] = location;
    };

    saveTripsToLocalStore();
}

function createNewLocationId(tripId) {
    log.info('create new location id');
    var tripIndex = getTripIndexById(tripId);
    var largestId = 0;
    // iterate over locations of current trip
    if(trips[tripIndex].locations) { 
        if (trips[tripIndex].locations) {
            for (var i = 0; i < trips[tripIndex].locations.length; i++) {
                if (parseInt(trips[tripIndex].locations[i].id) > largestId)
                    largestId = parseInt(trips[tripIndex].locations[i].id);
            }
        }
    }
    return largestId + 1;
}

function swapLocations(tripIndex, firstIndex, secondIndex) {
    const firstLocation = trips[tripIndex].locations[firstIndex];
    const secondLocation = trips[tripIndex].locations[secondIndex];
    trips[tripIndex].locations[secondIndex] = firstLocation;
    trips[tripIndex].locations[firstIndex] = secondLocation;
}

function addLocationData(tripId, locationId, locationName) {
    var tripIndex = getTripIndexById(tripId);
    // init locations array if empty
    if (trips[tripIndex].locations === undefined) {
        trips[tripIndex].locations = [];
    }
    trips[tripIndex].locations.push({id: locationId, name: locationName});  
}

function getLocationIndexById(tripIndex, locationId) {
    // find current location index in array
    for (var i = 0; i < trips[tripIndex].locations.length; i++) {
        if (parseInt(trips[tripIndex].locations[i].id) === parseInt(locationId)) {
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
    if (trips[tripIndex].locations === undefined) {
        trips[tripIndex].locations = [];

        var locId = createNewLocationId(tripId);
        trips[tripIndex].locations[0] = {
            id: locId,
            name: 'Ort1',
            desc: 'blabla'
        };

        locId = createNewLocationId(tripId);
        trips[tripIndex].locations.push({
            id: locId,
            name: 'Ort2',
            desc: 'blabla'
        });

        locId = createNewLocationId(tripId);
        trips[tripIndex].locations.push({
            id: locId,
            name: 'Ort3',
            desc: 'blabla'
        });
        log.debug(trips[tripIndex].locations);
    }
}
