trips = [];
geocoder = null;
map = null;
var googleLibLoaded = false; 
var log = log4javascript.getDefaultLogger();

// http://log4javascript.org/docs/quickstart.html
// log.trace(message[, message2, ... ][, exception])
// log.debug(message[, message2, ... ][, exception])
// log.debug(message[, message2, ... ][, exception])
// log.warn(message[, message2, ... ][, exception])
// log.error(message[, message2, ... ][, exception])
// log.fatal(message[, message2, ... ][, exception])

$(document).ready(function () {
    //  execute after form load --------------------------------------
    
    // log.debug('loadTripsFromLocalStore...');
    loadTripsFromLocalStore();

    // log.debug('displayTripTiles...');
    displayTripTiles();


    // register jquery events ----------------------------------------

    $('.jumbotron .btnnew').click(OnAddTrip);
    
    $('.tripForm .btnsave').click(OnSaveTripForm);
    $('.tripForm .btncancel').click(OnCancelTripForm);
    $('.tripForm #destination').blur(OnDestinationEntered);
    
    $('.locationsContainer .btnsave').click(OnSaveLocationsForm);
    $('.locationsContainer .btncancel').click(OnCancelLocationsForm);

    $('.locationForm #locationName').keydown(OnLocationKeydown);
    $('.locationForm #locationName').blur(OnFormLocationEntered);

});


