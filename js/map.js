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

function initializeMap(mapElement) {
    log.info('init map');
    if (!googleLibLoaded) {
        log.debug('failed to load map resources - maybe due to missing internet connection');
        return;
    }
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
        zoom: 8,
        center: latlng
    }
    map = new google.maps.Map(document.getElementById(mapElement), mapOptions);
}

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

function centerMapAroundAddress(address, mapElement) {
    log.info('center map');
    if (!googleLibLoaded) {
        log.debug('failed to load map resources - check missing internet connection');
        return;
    }
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    if(mapElement==='locationMap'){
        var mapOptions = {
            zoom: 11,
            center: latlng
        }
    } 
    else {  // trip Map
        var mapOptions = {
            zoom: 8,
            center: latlng
        }
    }
    log.debug('Address: ' + address);
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == 'OK') {
            if(results === undefined) return;
            var map = new google.maps.Map(document.getElementById(mapElement), mapOptions);
            if(mapElement==='locationMap') {
                map.addListener('click', OnLocationsMapClicked);
            }
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                draggable: true,
                position: results[0].geometry.location
            });
            if(mapElement==='locationMap') {
                marker.addListener('draged', OnLocationMarkerPositionChanged);
            }
            else {
                marker.addListener('draged', OnTripMarkerPositionChanged);
            }
        } else {
            log.debug('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function getAdressByGeocode(latLng, locationNameElementId, locationAddressElementId) {
    log.info('get adress for geocode');
    var geocoder = new google.maps.Geocoder;

    geocoder.geocode({ 'location': latLng }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                // set adress to name-element:
                // log.debug('adress: ' + results[0].formatted_address);
                $('#' + locationAddressElementId).val(results[0].formatted_address);
                $('#' + locationNameElementId).val(results[0].address_components[2].long_name);
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
