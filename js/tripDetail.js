
function initTripDetailForm() {
    displayLocationList();
}

function displayLocationList() {

    var locations = [];
    initDemoLocations(locations); 
    // $('.location-buttons').not('#addNewLocation').remove();
    $('.location-buttons').empty();  // TODO: ************   enable this line ************  delete all existing locations
    // add existing locations for this trip:
    for (var i = 0; i < locations.length; i++) {
        var html = '<button type="button" class="btn-location">' 
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
    // add 'new location' handlers ----------
    $('#btn-newlocation').click(showNewLocationPopup);
}

function showNewLocationPopup() {
    var html = '<input type="text" class="form-control" id="input-newlocation" placeholder="neuer Ort oder Zwischenstopp...">';
    $('#btn-newlocation').empty();  // remove field in case already existing
    $(this).append(html);           // overlay current location button with input field
    $('#input-newlocation').blur(locationEntered);  // add handler for input processing
    $('#input-newlocation').focus();    
}

function locationEntered() {
    var location = $('#input-newlocation').val();
    if(location==='') {
        console.log('no location entered');
        $('#input-newlocation').remove();  // hide input field
        displayLocationList();
        return;
    }
    console.log('Location: ' + location);
    $('#input-newlocation').remove();  // hide input field
    displayLocationList();
    showTripDetailForm();
    centerMapAroundAddress(location, "locationMap");
}

function showTripDetailForm() {
    $('.locationdetail').slideToggle(500, 'linear', function () {
        console.log('showing location details');
    });
}

// -------------- close trip detail form w/o saving ------
function closeTripDetailForm() {
    $('.tripdetail').fadeOut(700);    
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

        locations.push({name: 'Ort abc'});
        locations.push({name: 'Ort abc'});
        locations.push({name: 'Ort abc'});
}
