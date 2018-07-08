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
    $('#input-newlocation').blur(OnLocationEntered);  // add handler for input processing
    $('#input-newlocation').focus();    
}

function ClickViewLocation() {

    // check if same location selected: do nothing

    // check if different location selected: save / fill in data / show location

    // TODO: *************** fill in data
    showLocationsForm();
}

function OnLocationEntered() {
    var location = $('#input-newlocation').val();
    if(location==='') {
        console.log('no location entered');
        $('#input-newlocation').remove();  // hide input field
        showLocationsForm();
        return;
    }
    console.log('Location: ' + location);
    $('#input-newlocation').remove();  // hide input field
    showLocationsForm();
    centerMapAroundAddress(location, "locationMap");
}

function showLocationTiles() {

    var locations = [];
    initDemoLocations(locations); 
    // $('.location-buttons').not('#addNewLocation').remove();
    $('.location-buttons').empty();  // delete all existing locations

    // add existing locations for this trip:
    for (var i = 0; i < locations.length; i++) {
        var html = '<button type="button" class="btn-location existingLocation">' 
        + '<span>' + locations[i].name + '<span>'
        +  '<span class="glyphicon glyphicon-plus"></span>'
        + '</button>';
        $('.location-buttons').append(html);
    }
    // button 'add new' at the end:
    html = '<button type="button" class="btn-location" id="btn-newlocation">' 
            + '<span class="mr-3">' + 'Ort hinzufügen' + '</span>'
            + '<i class="fas fa-angle-double-right"></i></button>';
    $('.location-buttons').append(html);

    // add 'view location' handler
    $('.existingLocation').click(ClickViewLocation);

    // add 'new location' handler
    $('#btn-newlocation').click(ClickNewLocation);

    // show location tiles
    $('.triplocations').slideToggle(500, 'linear', function () {
        // console.log('toggling location tiles');
    });

}

function hideLocationTiles() {
    $('.triplocations').fadeOut(700);    
}

function showLocationsForm() {

    // TODO: toggle only if not visible

// Checks css for display:[none|block], ignores visibility:[true|false]
// $(element).is(":visible");

    $('.locationdetail').slideToggle(500, 'linear', function () {
        console.log('showing location details');
    });
}

function hideLocationsForm() {
    $('.tripdetail').fadeOut(700);    
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

function initDemoLocations(locations) {
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

        locations.push({name: 'Ort abc1'});
        locations.push({name: 'Ort abc2'});
        locations.push({name: 'Ort abc3'});
}
