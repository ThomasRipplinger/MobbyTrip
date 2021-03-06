const OK = 0;
const ERROR = 1;
trip = new Trip();              // create global trip object, will hold all trip data
loc = new Location(trip);
locationScrolled = false;     // scoll only once with first display of a location for a trip

// Google maps objects & vars
geocoder = null;
map = null;
var directionsDisplay;           // map directions object
var googleLibLoaded = false; 

// Logging stuff, see http://log4javascript.org/docs/quickstart.html
var log = log4javascript.getLogger();
var popUpAppender = new log4javascript.PopUpAppender();
popUpAppender.setUseOldPopUp();
popUpAppender.setNewestMessageAtTop(true);
popUpAppender.setScrollToLatestMessage(true);
popUpAppender.setWidth(800);
popUpAppender.setInitiallyMinimized(true);   // show with click on cog => OnSettings()
log.addAppender(popUpAppender);
// log.setLevel(log4javascript.Level.INFO);

// log.trace(message[, message2, ... ][, exception])
// log.debug(message[, message2, ... ][, exception])
// log.debug(message[, message2, ... ][, exception])
// log.warn(message[, message2, ... ][, exception])
// log.error(message[, message2, ... ][, exception])
// log.fatal(message[, message2, ... ][, exception])

$(document).ready(function () {
    //  execute after form load --------------------------------------
    
    // log.debug('loadTripsFromLocalStore...');
    trip.loadFromLocalStore('tripdata');

    // log.debug('displayTripTiles...');
    displayTripTiles(trip);


    // register jquery events ----------------------------------------

    $('.jumbotron #btnCreateNewTrip').click(OnAddTrip);
    $('.jumbotron #btnSettings').click(OnSettings);
    
    $('.tripForm #btnSaveTrip').click(OnSaveTripForm);
    $('.tripForm #btnCancel').click(OnCancelTripForm);
    $('.tripForm #btnRoute').click(OnDrawRoute);
    $('.tripForm #destination').blur(OnDestinationEntered);
    
    $('.locationsContainer #btnLocationOk').click(OnOkLocationsForm);
    $('.locationsContainer #btnDelete').click(OnDeleteLocation);
    $('.locationsContainer #btnUp').click(OnMoveLocation);
    $('.locationsContainer #btnDown').click(OnMoveLocation);

    $('.locationForm #locationName').keydown(OnLocationKeydown);
    $('.locationForm #locationName').blur(OnFormLocationEntered);

    $(".locationForm #locationDate").datepicker({
      showWeek: true,
      firstDay: 1,
      dateFormat: "D, d M yy",
      onSelect: OnFormDateEntered
    });
    $(".locationForm #locationDate").datepicker($.datepicker.regional["de"]);
});
