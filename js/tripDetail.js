
function initTripDetailForm() {
    displayLocationList();
}

function displayLocationList() {

    var locations = [];
    initDemoLocations(locations); 
    // $('.location-buttons').not('#addNewLocation').remove();
    $('.location-buttons').empty();  // delete all existing locations
    // add existing locations for this trip:
    for (var i = 0; i < locations.length; i++) {
        var html = '<button type="button" class="btn-location">' 
        + '<span>' + locations[i].name + '<span>'
        +  '<span class="glyphicon glyphicon-plus"></span>'
        + '</button>';
        $('.location-buttons').append(html);
    }
    // button 'add new' at the end:
    html = '<button type="button" class="btn-location">' 
            + '<span class="mr-3">' + 'Ort hinzufügen' + '</span>'
            + '<i class="fas fa-angle-double-right"></i></button>';
    $('.location-buttons').append(html);
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
