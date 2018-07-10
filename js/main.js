var trips = [];
var locations = [];
var geocoder;
var map;

$(document).ready(function () {

    //  execute after form load --------------------------------------

    // console.log('loadTripsFromLocalStore...');
    loadTripsFromLocalStore();

    // console.log('displayTripTiles...');
    displayTripTiles();


    // register jquery events ----------------------------------------

    $('.jumbotron .btnnew').click(ClickAddTrip);
    
    $('.newtrip .btnsave').click(ClickSaveTripForm);
    $('.newtrip .btncancel').click(ClickCancelTripForm);
    $('.newtrip #destination').blur(destinationEntered);
    
    $('.triplocations .btnsave').click(ClickSaveLocationsForm);
    $('.triplocations .btncancel').click(ClickCancelLocationsForm);

    $('.locationdetail #locationName').keydown(OnLocationKeydown);
    $('.locationdetail #locationName').blur(OnLocationEntered);

});


