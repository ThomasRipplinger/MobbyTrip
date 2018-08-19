function OnLocationsMapClicked(event) {
    log.info('map clicked:' + event.latLng);
    getAdressByGeocode(event.latLng, "locationName", "locationAddress");  // reverse geocode, set result to form elements
} 

function OnLocationMarkerPositionChanged(event) {
    log.info('marker position changed' + event.latLng);
    getAdressByGeocode(event.latLng, "locationName", "locationAddress");  // reverse geocode, set result to form elements
    // oder: var position = marker.getPosition();
}

function OnTripMarkerPositionChanged() {
    log.info('marker position changed');
    // TODO
}

// function initializeMap(mapElement) {
//     log.info('init map');
//     if (!googleLibLoaded) {
//         log.debug('failed to load map resources - maybe due to missing internet connection');
//         return;
//     }
//     geocoder = new google.maps.Geocoder();
//     var latlng = new google.maps.LatLng(-34.397, 150.644);
//     var mapOptions = {
//         zoom: 8,
//         center: latlng
//     }
//     map = new google.maps.Map(document.getElementById(mapElement), mapOptions);
// }

// function centerTripMapAroundAddress(address, mapElement) {
//     if (!googleLibLoaded) {
//         log.debug('failed to load map resources - check internet connection');
//         return;
//     }
//     var geocoder = new google.maps.Geocoder();
//     var latlng = new google.maps.LatLng(-34.397, 150.644);
//     var mapOptions = {
//         zoom: 8,
//         center: latlng
//     }
//     log.debug('Address: ' + address);
//     geocoder.geocode({ 'address': address }, function (results, status) {
//         if (status == 'OK') {
//             if (results === undefined) return;
//             var map = new google.maps.Map(document.getElementById(mapElement), mapOptions);
//             // map.addListener('click', OnTripMapClicked);
//             map.setCenter(results[0].geometry.location);
//             var marker = new google.maps.Marker({
//                 map: map,
//                 position: results[0].geometry.location
//             });
//         } else {
//             log.debug('Geocode was not successful for the following reason: ' + status);
//         }
//     });
// }

function centerMapAroundAddressForTrip(address) {
    log.info('center map around address for trip');
    if (!googleLibLoaded) {
        log.debug('failed to load map resources - check missing internet connection');
        return;
    }
    log.debug('Address to center: ' + address);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, geocodeCallbackTrip);
}

function centerMapAroundAddressForLocation(address) {
    log.info('center map around address for location');
    if (!googleLibLoaded) {
        log.debug('failed to load map resources - check missing internet connection');
        return;
    }
    log.debug('Address to center: ' + address);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, geocodeCallbackLocations);
}

function geocodeCallbackTrip(results, status) {
    if (status == 'OK') {
        if(results === undefined) {
            log.error('ERROR: geocode result undefined');
            return;
        } 
        var geocode = results[0].geometry.location;    
        log.debug('Address geocode: ' + geocode);
        // var latlng = new google.maps.LatLng(-34.397, 150.644);
        var mapOptions = {
            zoom: 8,
            center: geocode
            }
        var map = new google.maps.Map(document.getElementById('tripMap'), mapOptions);
        map.setCenter(geocode);

        // manage markers
        var marker = new google.maps.Marker({
            map: map,
            draggable: true,
            position: results[0].geometry.location
        });
        marker.addListener('draged', OnTripMarkerPositionChanged);
    } 
    else {
        log.error('ERROR: geocode not successful for the following reason: ' + status);
    }
}

function geocodeCallbackLocations(results, status) {
    if (status == 'OK') {
        if(results === undefined) {
            log.error('ERROR: geocode result undefined');
            return;
        } 
            
        var geocode = results[0].geometry.location;    
        log.debug('Address geocode: ' + geocode);
        // var latlng = new google.maps.LatLng(-34.397, 150.644);
        var mapOptions = {
            zoom: 11,
            center: geocode
            }
        var map = new google.maps.Map(document.getElementById('locationMap'), mapOptions);
        // map.setCenter(geocode);

        // manage markers
        var marker = new google.maps.Marker({
            map: map,
            draggable: true,
            position: results[0].geometry.location
        });
        map.addListener('click', OnLocationsMapClicked);
        marker.addListener('draged', OnLocationMarkerPositionChanged);
    } 
    else {
        log.error('ERROR: geocode not successful for the following reason: ' + status);
    }
}

function getAdressByGeocode(latLng, locationNameElementId, locationAddressElementId) {
    log.info('get adress for geocode');
    var geocoder = new google.maps.Geocoder;

    geocoder.geocode({ 'location': latLng }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                // set adress to name-element:
                var address = results[0].formatted_address;
                var long_name = results[0].address_components[2].long_name
                log.debug('address: ' + address);
                log.debug('name: ' + long_name);
                $('#' + locationAddressElementId).val(address);
                $('#' + locationNameElementId).val(long_name);
            } else {
                log.debug('No results found');
            }
        } else {
            log.debug('Reverse geocoder failed due to: ' + status);
        }
    });
}

function mapsAPIinitDone() {
    log.info('Init Google maps API done');
    googleLibLoaded = true;
}
