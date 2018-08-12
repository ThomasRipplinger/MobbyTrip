
function localStoreTest() {

    log.debug('*** running localStoreTest ***');

    if (!loadSaveLoadkeepsSameNumberOfTrips()) 
        log.error('ERROR in test loadSaveLoadkeepsSameNumberOfTrips');
    else
        log.debug('PASSED test loadSaveLoadkeepsSameNumberOfTrips');

    if (!checkIfallPropertiesAreSaved()) 
        log.error('ERROR in test checkIfallPropertiesAreSaved');
    else
        log.debug('PASSED test checkIfallPropertiesAreSaved');

    log.debug('*** done');
    return(true);
}


function loadSaveLoadkeepsSameNumberOfTrips() {

    // load existing data
    trips.length = 0;
    loadTripsFromLocalStore();

    // check if data in local store
    if (trips === null) {
        log.error('ERROR - no trips in local store');  // should not happen...
        return(false);
    }

    // memorize number of trips    
    var numberOfTrips1 = trips.length;

    // save and load again
    saveTripsToLocalStore();
    trips.length = 0;
    loadTripsFromLocalStore();

    // check if data in local store
    if (trips === null) {
        log.error('ERROR - no trips in local store after saving');  
        return(false);
    }

    // check if same number of trips as before    
    var numberOfTrips2 = trips.length;
    if (numberOfTrips1 !== numberOfTrips2) {
        log.error('ERROR - different number of trips after save/load cycle');  
        return(false);    
    }

    return(true);
}


function checkIfallPropertiesAreSaved() {

    var passflag = true;

    // load existing data
    trips.length = 0;
    loadTripsFromLocalStore();

    // check if data in local store
    if (trips === null) {
        log.error('ERROR - no trips in local store');  // should not happen...
        return(false);
    }
    // memorize number of trips    
    var numberOfTrips1 = trips.length;

    // create and save test data
    var testtrip = {
        id: 'testdata-001',
        destination: 'test-destination',
        name: 'test-name',
        length: '123456',
        duration: '365',
        desc: 'test-description bla bla 1234567890 !"§$%&/()=? end of description.'
    };
    trips.unshift(testtrip);
    saveTripsToLocalStore();

    
    // check if data in local store
    trips.length = 0;
    loadTripsFromLocalStore();
    if (trips === null) {
        log.error('ERROR - no trip in local store after saving test data');
        passflag = false;
    }

    // memorize number of trips again, should be one more as before    
    var numberOfTrips2 = trips.length;

    if (numberOfTrips1 !== (numberOfTrips2 - 1)) {
        log.error('ERROR - number of trips not increased after saving test trip');
        log.debug('before: ' + numberOfTrips1 + '  after: ' + numberOfTrips2);
        passflag = false;
    }

    // check if test data loaded correctly
    if (trips[0].id !== 'testdata-001') {
        log.error('ERROR - failed to save/load test data: id');
        passflag = false;
    }
    if (trips[0].destination !== 'test-destination') {
        log.error('ERROR - failed to save/load test data: destination');
        passflag = false;
    }
    if (trips[0].name !== 'test-name') {
        log.error('ERROR - failed to save/load test data: name');
        passflag = false;
    }
    if (trips[0].length !== '123456') {
        log.error('ERROR - failed to save/load test data: name');
        passflag = false;
    }
    if (trips[0].duration !== '365') {
        log.error('ERROR - failed to save/load test data: duration');
        passflag = false;
    }
    if (trips[0].desc !== 'test-description bla bla 1234567890 !"§$%&/()=? end of description.') {
        log.error('ERROR - failed to save/load test data: description');
        passflag = false;
    }

    // delete test data and save
    log.debug('delete test trip data');
    trips.splice(0,1);  // test data is at beginning of array
    saveTripsToLocalStore();

    // final test:  load data, number of trips should be same as at start
    trips.length = 0;
    loadTripsFromLocalStore();
    var numberOfTrips3 = trips.length;
    if (numberOfTrips1 !== numberOfTrips3) {
        log.error('ERROR - number of trips not same as at test start');
        passflag = false;
    }

    return (passflag);
}