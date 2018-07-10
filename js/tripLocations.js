function ClickSaveLocationsForm(tripId) {

    console.log('saving trip detail data for ' + tripId);

    var locationId = $('.locationdata #locationId').val();
    var newLocation;
    // check if new location
    if(locationId ==='') {
        // add new 
        console.log('new location...');
        newLocation = true;
        var location = {
            id: createNewLocationId(),
            name: $('.locationdata #name').val(),
            desc: $('.locationdata #desc').val()
        };
        trips[tripId].locations.unshift(location);  // add to beginning of array
    }
    else {
        // update existing
        newLocation = false;
        // find current location index in array
        var i=0;
        for(i=0; i<locations.length; i++) {
            if(parseInt(locations[i].id) === parseInt(locationId)) {
                trips[tripId].locations[i] = {
                    id: parseInt(locationId),
                    name: $('.locationdata #name').val(),
                    desc: $('.locationdata #desc').val()
                };
                break;
            }
        }
        if(i === trips[tripId].locations.length + 1) {   // TODO: test #####################
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
    var html = '<input type="text" class="form-control" id="input-newlocation" placeholder="neuer Ort oder Zwischenstopp...">';
    $('#btn-newlocation').empty();  // remove field in case already existing
    $(this).append(html);           // overlay current location button with input field
    $('#input-newlocation').blur(OnLocationPopupEntered);  // add handler for input processing
    $('#input-newlocation').keydown(OnLocationPopupKeydown);  // add handler for input processing
    $('#input-newlocation').focus();    
}

function ClickViewLocation() {

    // check if same location selected: do nothing

    // check if different location selected: save / fill in data / show location

    // TODO: *************** fill in data
    showLocationsForm();
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
        OnLocationEntered();
    }
}

function OnLocationPopupEntered() {
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
    locations.push({name: location});
    showLocationTiles();   // update the location tiles
    showLocationsForm();
    centerLocationMapAroundAddress(location, "locationMap");
}

function OnLocationEntered() {
    var location = $('#locationName').val();
    if((location==='') || (location==undefined)) {
        console.log('no location entered');
        return;
    }
    console.log('Location: ' + location);
    centerTripMapAroundAddress(location, "locationMap");
}

function addLocationTile(locationName) {
    var html = '<button type="button" class="btn-location existingLocation">' 
    + '<span>' + locationName + '<span>'
    +  '<span class="glyphicon glyphicon-plus"></span>'
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

function showLocationTiles() {

    // $('.location-buttons').not('#addNewLocation').remove();
    $('.location-buttons').empty();  // delete all existing locations

    // add existing locations for this trip:
    for (var i = 0; i < locations.length; i++) {
        addLocationTile(locations[i].name);
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
    $('.locationdata #id').val('');
    $('.locationdata #name').val('');
    $('.locationdata #desc').val('');
}


function createNewLocationId(tripId) {

    var largestId = 0;
    // iterate over trips
    if(trips[tripId].locations !== undefined) {
        for(var i=0; i<trips[tripId].locations.length; i++) {
            if(parseInt(trips[tripId].locations[i].id) > largestId) 
                largestId = parseInt(trips[tripId].locations[i].id);
        }
    }
    return largestId + 1;
}

function initDemoLocations() {
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
    if(locations[0] === undefined) {
        locations.push({name: 'Ort abc1'});
        locations.push({name: 'Ort abc2'});
        locations.push({name: 'Ort abc3'});
    }
}
