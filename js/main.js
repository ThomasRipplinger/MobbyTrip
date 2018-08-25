trips = [];
geocoder = null;
map = null;
var googleLibLoaded = false; 
// var log = log4javascript.getDefaultLogger();
var log = log4javascript.getLogger();
var popUpAppender = new log4javascript.PopUpAppender();
popUpAppender.setUseOldPopUp();
popUpAppender.setNewestMessageAtTop(true);
popUpAppender.setScrollToLatestMessage(true);
popUpAppender.setWidth(800);
popUpAppender.setInitiallyMinimized(true);   // show with click on cog => OnSettings()
log.addAppender(popUpAppender);
// log.setLevel(log4javascript.Level.INFO);

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

    $('.jumbotron #btnCreateNewTrip').click(OnAddTrip);
    $('.jumbotron #btnSettings').click(OnSettings);
    
    $('.tripForm #btnSave').click(OnSaveTripForm);
    $('.tripForm #btnCancel').click(OnCancelTripForm);
    $('.tripForm #btnRoute').click(drawRoute);
    $('.tripForm #destination').blur(OnDestinationEntered);
    
    $('.locationsContainer #btnSave').click(OnSaveLocationsForm);
    $('.locationsContainer #btnCancel').click(OnCancelLocationsForm);
    $('.locationsContainer #btnDelete').click(OnDeleteLocation);
    $('.locationsContainer #btnUp').click(OnMoveLocation);
    $('.locationsContainer #btnDown').click(OnMoveLocation);

    $('.locationForm #locationName').keydown(OnLocationKeydown);
    $('.locationForm #locationName').blur(OnFormLocationEntered);

});


