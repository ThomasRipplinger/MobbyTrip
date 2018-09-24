
function loadTripsFromLocalStore() {
    trip.tripArray = JSON.parse(localStorage.getItem('tripdata'));
    // trips = JSON.parse(localStorage.getItem('trips'));
    logAllTrips('loaded trip data');
    // console.log('Dump of all trip data:');
    // console.log(JSON.stringify(trips));
}

function saveTripsToLocalStore() {
    localStorage.setItem('tripdata', JSON.stringify(trip.tripArray));
    logAllTrips('saved trip data');
}

function saveToFile(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
// saveToFile(jsonData, 'json.txt', 'text/plain');

function verifyFileAPIsupport() {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        log.info('File API support verfied, ok');
        return OK;
    } else {
        log.error('Error: The File APIs are not fully supported in this browser.');
        return ERROR;
    }
}

