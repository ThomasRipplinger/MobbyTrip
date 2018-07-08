
function initializeMap() {

    // return;  // #######################################

    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
        zoom: 8,
        center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

// for trip MAIN form 
function centerMapAroundAddress(address, mapElement) {

    // return;  // #######################################
    
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
        zoom: 8,
        center: latlng
    }
    console.log('Address: ' + address);
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == 'OK') {
            for (var i = 0; i < results.length; i++) {
                console.log('result #' + i + results[i].formatted_address);
            }
            
            var map = new google.maps.Map(document.getElementById(mapElement), mapOptions);
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function mapsAPIinitDone() {
    console.log('Init Google maps API done');
}


