function ClickSaveLocationsForm() {

    var tripId = $('.newtrip #id').val();
    var tripIndex = getTripIndexForId(tripId);
    console.log('saving trip detail data for trip index:' + tripIndex);

    var locationId = $('locationdetail').val();
    var newLocation;
    // check if new location
    if(locationId ==='') {
        // add new 
        console.log('new location...');
        newLocation = true;
        var location = {
            id: createNewLocationId(),
            name: $('locationdetail').val(),
            desc: $('.locationdetail #desc').val()
        };
        trips[tripIndex].locations.shift(location);  // add to end of array
    }
    else {
        // update    console.log('existing location...');
        newLocation = false;
        // find current location index in array
        var i=0;
        for(i=0; i<trips[tripIndex].locations.length; i++) {
            if(parseInt(trips[tripIndex].locations[i].id) === parseInt(locationId)) {
                trips[tripIndex].locations[i] = {
                    id: parseInt(locationId),
                    name: $('.locationdetail #locationName').val(),
                    desc: $('.locationdetail #dlocationDesc').val()
                };
                break;
            }
        }
        if(i === trips[tripIndex].locations.length) {   
            console.log('ERROR: location ID not found, not saving!');
            return;   
        }
    }

    saveTripsToLocalStore(); 
    hideLocationsForm();
    clearLocationsForm();  // clear for next time
}

function ClickCancelLocationsForm() {
    hideLocationsForm();
    clearLocationsForm();  // clear for next time
}

function ClickNewLocation() {
    // hide locations form 
    hideLocationsForm();
    selectedLocation = '';
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
    var newLocationId = $(this).find('.btn-location #id').text();
    var prevLocationId = $('#prevlocation').text();
    if (prevLocationId === newLocationId) {
        return;  // same, do nothing 
    }
    else {
        // different location selected: save current location
        $('#prevlocation').text(newLocationId);

        ClickSaveLocationsForm();

        // different location selected: fill in data 
        var currentTripId = $('.newtrip #id').val();
        var tripIndex = getTripIndexForId(tripId);
        var locationIndex = getLocationIndexForId(newLocationId);
        $('.locationdetail #locationName').val(trips[tripIndex].locations[locationIndex].name);
        $('.locationdetail #locationDesc').val(trips[tripIndex].locations[locationIndex].desc);
    }
}
showLocationsForm();


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
        OnLocationEntered();
    }
}

function OnLocationPopupEntered() {

    var tripId = $('.newtrip #id').val();
    var tripIndex = getTripIndexForId(tripId);

    var location = $('#input-newlocation').val();
    if(location==='') {
        console.log('no location entered');
        $('#input-newlocation').remove();  // hide input field
        addNewLocationTile();  // re-draw 'new location' tile
        return;
    }
    console.log('Location: ' + location);
    $('#input-newlocation').remove();  // hide input field
    // add locations tile before the 'new location' tile
    trips[tripIndex].locations.push({name: location, id: createNewLocationId(tripIndex)});
    showLocationTiles(tripIndex);   // update the location tiles
    showLocationsForm();
    centerLocationMapAroundAddress(location, "locationMap");
}

function OnLocationEntered() {
    var location = $('#locationName').val();
    if((location==='') || (location==undefined)) {
        console.log('no location entered');
        return;
    }
    console.log('location: ' + location);
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

function showLocationsForm() {
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
    $('.locationdetail #id').val('');
    $('.locationdetail #locationName').val('');
    $('.locationdetail #locationAddress').val('');
    $('.locationdetail #locationDesc').val('');
    $('.locationdetail #locationPrice').val('');
    $('.locationdetail #locationRating').val('');
}

function createNewLocationId(tripIndex) {
    var largestId = 0;
    // iterate over locations of current trip
    if (trips[tripIndex].locations !== undefined) {
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
