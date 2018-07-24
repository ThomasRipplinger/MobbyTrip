function ClickSaveLocationsForm() {
    SaveLocationsForm();
    hideLocationsForm();
    clearLocationsForm();  // for next time
}

function saveLocationsForm() {
    // check if location form is open 
    var locationId = $('.locationdetail #locationId').val();
    if (locationId === '') {
        return
    };
    var tripId = $('.newtrip #tripId').val();
    var tripIndex = getTripIndexForId(tripId);
    var locationIndex = getLocationIndexForId(tripIndex, locationId);
    console.log('saving trip detail data for trip index:' + tripIndex);

    // update data
    trips[tripIndex].locations[locationIndex] = {
        id: parseInt(locationId),
        name: $('.locationdetail #locationName').val(),
        desc: $('.locationdetail #locationDesc').val()
    };
    saveTripsToLocalStore();
}

function ClickCancelLocationsForm() {
    hideLocationsForm();
    clearLocationsForm();  // clear for next time
}

function ClickNewLocation() {
    // hide locations form 
    hideLocationsForm();
    clearLocationsForm();
    // add overlay then wait for user input
    var html = '<input type="text" class="form-control" id="input-newlocation" placeholder="neuer Ort oder Zwischenstopp...">';
    $('#btn-newlocation').empty();  // remove field in case already existing
    $(this).append(html);           // overlay current location button with input field
    $('#input-newlocation').blur(OnLocationPopupEntered);  // add handler for input processing
    $('#input-newlocation').keydown(OnLocationPopupKeydown);  // add handler for input processing
    $('#input-newlocation').focus();    
}

function ClickViewLocation() {
    // check if same location selected: do nothing
    var newLocationId = $(this).attr('id');
    var prevLocationId = $('#prevlocation').text();
    if (prevLocationId === newLocationId) {
        return;  // same, do nothing 
    }
    else {
        // if locationsform displayed: save
        if(prevLocationId!=='') {
            saveLocationsForm();
        }
        $('#prevlocation').text(newLocationId);

        // fill data in location form 
        var currentTripId = $('.newtrip #tripId').val();
        var tripIndex = getTripIndexForId(currentTripId);
        var locationIndex = getLocationIndexForId(tripIndex, newLocationId);
        $('.locationdetail #locationId').val(trips[tripIndex].locations[locationIndex].id);
        $('.locationdetail #locationName').val(trips[tripIndex].locations[locationIndex].name);
        $('.locationdetail #locationDesc').val(trips[tripIndex].locations[locationIndex].desc);
    }
    showLocationForm();
}

function getLocationIndexForId(tripIndex, locationId) {
    // find current location index in array
    for (var i = 0; i < trips[tripIndex].locations.length; i++) {
        if (parseInt(trips[tripIndex].locations[i].id) === parseInt(locationId)) {
            return (i);
        }
    }
    console.log('ERROR: location ID not found');
    return (undefined);
}

function OnLocationPopupKeydown(event) {
    // console.log(event.keyCode);
    if(event.keyCode===13) {     // Enter
        OnLocationPopupEntered();
    }
    else if(event.keyCode===27) { // ESC
        $('#input-newlocation').remove();  // hide input field
        addNewLocationTile();
    }
}

function OnLocationKeydown(event) {
    if(event.keyCode===13) {     // Enter
        OnFormLocationEntered();
    }
}

function OnLocationPopupEntered() {
    // user has entered a new location in popup overlay
    var location = $('#input-newlocation').val();
    $('#input-newlocation').remove();  // hide input field
    // check if valid entry
    if(location==='') {
        console.log('no location entered');
        addNewLocationTile();  // re-draw 'new location' tile
        return;
    }
    // add to data + add locations tile before the 'new location' tile
    console.log('Location: ' + location);
    var tripId = $('.newtrip #tripId').val();
    var tripIndex = getTripIndexForId(tripId);
    var locationId = createNewLocationId(tripIndex);
    trips[tripIndex].locations.push({name: location, id: locationId});
    showLocationTiles(tripIndex);   // update the location tiles
    $('.locationdetail #locationId').val(locationId);  // update location id in form
    $('.locationdetail #locationName').val(location);  // update location name in form
    // init and show location form
    initDemoLocations(tripIndex);
    showLocationForm();
    // update map
    centerLocationMapAroundAddress(location, "locationMap");
}

function OnFormLocationEntered() {
    // user has entered a new location in location form => update data and map
    var location = $('#locationName').val();
    if((location==='') || (location==undefined)) {
        console.log('no location entered');
        return;
    }
    console.log('location: ' + location);
    var tripId = $('.newtrip #tripId').val();
    var locationId = $('.locationdetail #locationId').val();
    var tripIndex = getTripIndexForId(tripId);
    var locationIndex = getLocationIndexForId(locationId);
    trips[tripIndex].locations[locationIndex].name = location;
    centerTripMapAroundAddress(location, "locationMap");
}

function addLocationTile(locationName, locationId) {
    var html = '<button type="button" class="btn-location existingLocation" id="' + locationId + '">' 
    + '<span>' + locationName + '<span>'
    // +  '<span class="glyphicon glyphicon-plus"></span>'
    + '</button>';
    $('.location-buttons').append(html);
}

function addNewLocationTile() {
    $('#btn-newlocation').remove();  // remove
    var html = '<button type="button" class="btn-location" id="btn-newlocation">' 
            + '<span class="mr-3">' + 'Ort hinzufügen' + '</span>'
            + '<i class="fas fa-angle-double-right"></i></button>';
    $('.location-buttons').append(html);  // add
    $('#btn-newlocation').click(ClickNewLocation);
}

function showLocationTiles(tripIndex) {

    // $('.location-buttons').not('#addNewLocation').remove();
    $('.location-buttons').empty();  // delete all existing locations

    // add existing locations for this trip:
    for (var i = 0; i < trips[tripIndex].locations.length; i++) {
        addLocationTile(trips[tripIndex].locations[i].name, trips[tripIndex].locations[i].id);
    }
    // add handlers
    $('.existingLocation').click(ClickViewLocation);

    // button 'add new' at the end:
    addNewLocationTile();

    // show location tiles
    if(!($('.triplocations').is(':visible'))) {
        $('.triplocations').slideToggle(500, 'linear', function () {
            // console.log('toggling location tiles');
        });
    }
}

function hideLocationTiles() {
    $('.triplocations').fadeOut(700);    
}

function showLocationForm() {
    // toggle only if not visible
    if(!($('.locationdetail').is(':visible'))) {
        $('.locationdetail').slideToggle(500, 'linear', function () {
            // console.log('showing location details');
        });
    }
}

function hideLocationsForm() {
    $('.locationdetail').fadeOut(700);    
}

function clearLocationsForm() {
    $('.locationdetail #locationId').val('');
    $('.locationdetail #locationName').val('');
    $('.locationdetail #locationAddress').val('');
    $('.locationdetail #locationDesc').val('');
    $('.locationdetail #locationPrice').val('');
    $('.locationdetail #locationRating').val('');
}

function createNewLocationId(tripIndex) {
    var largestId = 0;
    // iterate over locations of current trip
    if (trips[tripIndex].locations) {
        for (var i = 0; i < trips[tripIndex].locations.length; i++) {
            if (parseInt(trips[tripIndex].locations[i].id) > largestId)
                largestId = parseInt(trips[tripIndex].locations[i].id);
        }
    }
    return largestId + 1;
}

function initDemoLocations(tripIndex) {
    // locations.push({
    //         id: 1,
    //         name: 'Sisteron stop1',
    //         duration: 1,
    //         desc: 'Beschreibung der Location... bla bla bla bla bla bla bla bla ',
    //         camping_name: 'L´Ardeche',
    //         camping_adress: 'adresse hier...',
    //         camping_website: 'www.lardeche.fr',
    //         camping_price: '35',
    //         camping_rating: 3,
    //         camping_desc: 'Kommentar zum Camping hier...'
    //     });


    // init if no locations exist yet
    if (trips[tripIndex].locations === undefined) {
        trips[tripIndex].locations = [];

        var locId = createNewLocationId(tripIndex);
        trips[tripIndex].locations[0] = {
            id: locId,
            name: 'neuer Ort1',
            desc: 'blabla 11111'
        };

        locId = createNewLocationId(tripIndex);
        trips[tripIndex].locations.push({
            id: locId,
            name: 'neuer Ort2',
            desc: 'blabla 222222'
        });

        locId = createNewLocationId(tripIndex);
        trips[tripIndex].locations.push({
            id: locId,
            name: 'neuer Ort3',
            desc: 'blabla 333333'
        });
        console.log(trips[tripIndex].locations);
    }
}
