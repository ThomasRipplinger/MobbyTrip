
function displayLocationList() {
    $('.location').not('#addNewLocation').remove();
    for (var i = 0; i < locations.length; i++) {

        console.log("adding location #" + i);
        console.log(locations[i].name);

        var html = '<div class="location p-2">' + locations[i].name + '</div>';
        $('.locationlist').append(html);
    }
    return;
}

// -------------- close trip detail form w/o saving ------
function closeTripDetailForm() {
    $('.tripdetail').fadeOut(700);
    displayTripTiles();
}


function initDemoLocations() {
    locations = [
        {
            id: 001,
            name: 'Sisteron',
            duration: 1,
            desc: 'Beschreibung der Location... bla bla bla bla bla bla bla bla ',
            camping_name: 'L´Ardeche',
            camping_adress: 'adresse hier...',
            camping_website: 'www.lardeche.fr',
            camping_price: '35',
            camping_rating: 3,
            camping_desc: 'Kommentar zum Camping hier...'
        },
        {
            name: 'location 002'
        },
        {
            name: 'location 003'
        },
        {
            name: 'location 004'
        },
        {
            name: 'location 005'
        }
    ];
}
