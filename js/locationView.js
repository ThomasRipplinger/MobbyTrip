
function OnOkLocationsForm() {
    event.preventDefault(); // supress page reload
    log.info('saving location form');
    saveLocationsForm();
    hideLocationsForm();
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
    event.preventDefault(); // supress page reload
    log.info('delete location...');

    var locationId = $('#locationId').val();  
    if((locationId == undefined) || (locationId == '')) {
        log.error('ERROR: cant find location Id: ' + locationId);
        return;
    }

    loc.open(locationId);
    loc.delete(locationId);
    
    trip.saveToLocalStore('tripdata');
    hideLocationsForm();
    clearLocationsForm();
    showLocationTiles();
}

function OnMoveLocation(event) {
    event.preventDefault(); // supress page reload
    log.info('move location...');

    if(!loc.opened) return;

    const directionId = $(this).attr('id');
    log.debug('direction: ' + directionId);  // btnUp or btnDown

    // var locationId = $('#locationId').val();
    // if(locationId == undefined) {
    //     log.error('ERROR: cant find location Id');
    //     return;
    // }

    // verify if at least 2 locations
    const locationCount = loc.locArray.length;
    if(locationCount < 2) return;

    // move upwards
    if(directionId == 'btnUp') {
        // verify if already on first location
        if(locationIndex == 0) return;
        // swap current with prev. location
        swapLocations(locationIndex, locationIndex-1);
    }
    // move downwards
    if(directionId == 'btnDown') {
        // verify if already on last location
        if(locationIndex == locationCount-1) return;
        // swap current with next location
        swapLocations(locationIndex, locationIndex+1);
    }

    showLocationTiles();
}

function OnViewLocation() {
    log.info('view location');
    // toggle state
    $(this).button('toggle');

    var newLocationId = parseInt($(this).attr('id'));
    var prevLocationId = parseInt($('#prevlocation').text());

    // if same location selected: do nothing
    if (prevLocationId == newLocationId) {  
        return;
    }

    // if very first location selection: show form
    // if (isNaN(prevLocationId)) {  
    //     $('#prevlocation').text(newLocationId);    // save new location id
    //     showLocationForm();                 // toggle form
    //     if(!locationScrolled){              // scroll only once
    //         locationScrolled = true;
    //         scrollIntoView('#tripMap');
    //     }
    //     return; 
    // }
    
    // different location selected: save current, show new form...
        
    $('#prevlocation').text(newLocationId);    // save new location id

    // if locationsform displayed and not very first location selection: save current form content
    if (($('.locationForm').is(":visible"))  && (Number.isInteger(prevLocationId))) {
        saveLocationsForm();
        loc.close();
    }

    // open new location, fill location form and init map
    loc.open(newLocationId);
    updateLocationForm();
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
    if(!trip.opened) return;

    var locationId = loc.create(locationName);

    showLocationTiles();    // update the location tiles
    loc.open(locationId);
    updateLocationForm();   // init form and update map
    showLocationForm();  
}

function OnFormLocationEntered() {
    log.info('form location entered...');
    // user has entered a new location in location form => update data and map
    var locationName = $('#locationName').val();
    if((locationName === '') || (locationName == undefined)) {
        log.info('no location entered');
        $('#locationName').val(loc.name);   // restore previous name in case user has entered ''
        return;
    }
    log.info('modified location: ' + locationName);

    // update location name in data:
    // var tripId = $('.tripForm #tripId').val();
    // var locationId = $('.locationForm #locationId').val();
    // var tripIndex = getTripIndexById(tripId);
    // var locationIndex = getLocationIndexById(tripIndex, locationId);
    loc.name = locationName;
    // update location name in tile:
    // var locationDate = loc.locArray[loc.index].date;
    // updateLocationTile(trip.id, loc.id, locationName, locationDate);
    updateLocationTile();
    // update map
    centerMapAroundAddressForLocation(locationName);
}

function OnFormDateEntered(dateText) {
    log.info('form date entered');
    log.debug('date: ' + dateText);

    // user has entered a new date in location form => update tile
    loc.date = dateText;
    // update location date in tile:
    updateLocationTile();
}

function addLocationTile() {
    log.info('add location tile');
    if(!loc.opened) {
        log.error('ERROR: location not open, cant add tile');
        return ERROR;
    }
    if(loc.distance === undefined) loc.distance = '';
    if(loc.duration === undefined) loc.duration = '';

    var html = '<div class="btn-location locationTile existingLocation" id="' + loc.id + '">'
        + '<div class="row">'
        // +   '<h4 class="col-sm-10">' + locationName + '</h4>'
        +   '<h4>' + loc.name + '</h4>'
        // +   '<button type="button" class="deletelocation close col-sm-2" aria-label="Close">'
        // +     '<span aria-hidden="true">&times;</span>'
        // +   '</button>'
        + '</div>'
        + '<div>'
        + '<span class="location-info" id="locationTileDate">' + loc.tileDate + '</span>'
        + '</div>'
        + '<span class="location-info" id="locationTileDistance">' + loc.distance + '</span>'
        + '<span class="location-info" id="locationTileDuration"> ' + loc.duration + '</span>'
        // + '<p><a class="btn btn-secondary viewlocation" href="#" role="button">Anschauen »</a></p>'
        + '</div>';
    // log.debug(html);
    $('.locationTiles').append(html);
}

function updateLocationTile() {
    log.info('update location tile');
    if(!loc.opened) {
        log.error('ERROR: location not open, cant add tile');
        return ERROR;
    }

    var $locTile = $('#' + loc.id);   // find location tile by Id
    if($locTile.length) {
        $locTile.find('h4').text(loc.name);                      // update name of the location tile 
        $locTile.find('#locationTileDate').text(loc.tileDate);   // update date of the location tile 
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

function showLocationTiles() {
    log.info('show location tiles for trip: ' + trip.id);

    if(!trip.opened) {
        log.error('ERROR: trip not open, cant show tiles');
        return ERROR;
    }

    $('.locationTiles').empty();  // delete all existing locations

    // add existing locations for this trip:
    if(trip.locArray !== undefined) {
        for (var i = 0; i < trip.locArray.length; i++) {
            let locId = trip.locArray[i].id;
            loc.open(locId);
            log.debug('adding location: ' + loc.name);
            addLocationTile();
            loc.close();
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

function updateLocationForm() {
    if(!loc.opened) {
        log.error('ERROR: location not open, cant update form');
        return ERROR;
    }

    log.info('fill location form with data');
    $('.locationForm #locationId').val(loc.id);
    $('.locationForm #locationName').val(loc.name);
    $('.locationForm #locationDate').val(loc.date);
    $('.locationForm #locationNights').val(loc.nights);
    $('.locationForm #locationDistance').val(loc.distance);
    $('.locationForm #locationDuration').val(loc.duration);
    $('.locationForm #locationAddress').val(loc.address);
    $('.locationForm #locationDesc').val(loc.desc);

    var testId = $('.locationForm #locationId').val();   // ***********TODO remove
    log.debug('loc ID just set: ' + testId);

    centerMapAroundAddressForLocation(loc.name);
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
    locationScrolled = false;
    clearLocationsForm();
    // toggle only if visible
    if(($('.locationForm').is(':visible'))) {
        $('.locationForm').slideToggle(500, 'linear', function () {
            scrollIntoView('.jumbotron');
        });
    }
    // $('.locationForm').fadeOut(1000 );    
}

function clearLocationsForm() {
    log.info('clear location form');
    $('.locationsContainer #prevlocation').text('');
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

    if(!loc.opened || !trip.opened) {
        log.error('ERROR: trip / location not open, cant save');
        return ERROR;
    }
    
    // prepare object with form data
    var locationObj = {
        id: parseInt($('.locationForm #locationId').val()),
        name: $('.locationForm #locationName').val(),
        date: $('.locationForm #locationDate').val(),
        nights: $('.locationForm #locationNights').val(),
        distance: $('.locationForm #locationDistance').val(),
        duration: $('.locationForm #locationDuration').val(),
        address: $('.locationForm #locationAddress').val(),
        desc: $('.locationForm #locationDesc').val()
    };
    log.debug('Saving location data:');
    log.debug(locationObj);
    loc.locArray[loc.index] = locationObj;
    trip.saveToLocalStore('tripdata');
}