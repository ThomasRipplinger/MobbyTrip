
$(document).ready(function () {

    var trips = [];
    var locations = [];
    var geocoder;
    var map;

    //  execute after form load --------------------------------------

    console.log('loadTripsFromLocalStore...');
    loadTripsFromLocalStore();

    console.log('displayTripTiles...');
    displayTripTiles();


    // register jquery events ----------------------------------------

    $('.jumbotron .btnnew').click(ClickAddTrip);
    
    $('.newtrip .btnsave').click(ClickSaveTripForm);
   
    $('.newtrip .btncancel').click(ClickCancelTripForm);
    
    $('.newtrip #destination').blur(destinationEntered);
    
    $('.triplocations .btnsave').click(ClickSaveLocationsForm);

    $('.triplocations .btncancel').click(ClickCancelLocationsForm);
    

    // ----------------- test, remove --------------------------------
    $('.jumbotron .btnsave').click(function () {
        saveTripsToLocalStore();
    });
    $('.jumbotron .btnload').click(function () {
        console.log('LOADING...');
        loadTripsFromLocalStore();
        console.log('done.');
    });

});


