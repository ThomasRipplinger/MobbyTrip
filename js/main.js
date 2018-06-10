
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

    $('.jumbotron .btnnew').click(showNewTripForm);
    
    $('.newtrip .btnsave').click(saveNewTrip);
    
    $('.newtrip #destination').blur(destinationEntered);
    
    $('.newtrip .btncancel').click(cancelNewTripForm);

    $('.tripdetail .btnclose').click(closeTripDetailForm);
    

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


