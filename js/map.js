
function initializeMap() {
    if (!googleLibLoaded) {
        console.log('failed to load map resources - maybe due to missing internet connection');
        return;
    }
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
        zoom: 8,
        center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function centerTripMapAroundAddress(address, mapElement) {
    if (!googleLibLoaded) {
        console.log('failed to load map resources - maybe due to missing internet connection');
        return;
    }
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
        zoom: 8,
        center: latlng
    }
    console.log('Address: ' + address);
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == 'OK') {
            if (results === undefined) return;
            // for (var i = 0; i < results.length; i++) {
            //     console.log('result #' + i + results[i].formatted_address);
            // }
            var map = new google.maps.Map(document.getElementById(mapElement), mapOptions);
            // map.addListener('click', OnTripMapClicked);
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

function centerLocationMapAroundAddress(address, mapElement) {
    if (!googleLibLoaded) {
        console.log('failed to load map resources - maybe due to missing internet connection');
        return;
    }
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
        zoom: 11,
        center: latlng
    }
    console.log('Address: ' + address);
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == 'OK') {
            if(results === undefined) return;
            var map = new google.maps.Map(document.getElementById(mapElement), mapOptions);
            map.addListener('click', OnLocationsMapClicked);
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                draggable: true,
                position: results[0].geometry.location
            });
            // marker.addListener('position_changed', OnMarkerPositionChanged);
            marker.addListener('dragend', OnMarkerPositionChanged);
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function OnLocationsMapClicked(event) {
    // console.log('map clicked:' + event.latLng);
    getAdressFromGeocode(event.latLng, "locationMap", "locationName", "locationAddress");  // reverse geocode, set result to form elements
} 

function OnMarkerPositionChanged() {
    console.log('marker position changed');
    // TODO: get adress of new marker position
    // var position = marker.getPosition();
}

function getAdressFromGeocode(latLng, mapElementId, locationNameElementId, locationAddressElementId) {

    var geocoder = new google.maps.Geocoder;

    geocoder.geocode({ 'location': latLng }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                // set adress to name-element:
                // console.log('adress: ' + results[0].formatted_address);
                $('#' + locationAddressElementId).val(results[0].formatted_address);
                $('#' + locationNameElementId).val(results[0].address_components[2].long_name);
            } else {
                console.log('No results found');
            }
        } else {
            console.log('Reverse geocoder failed due to: ' + status);
        }
    });
}

function mapsAPIinitDone() {
    console.log('Init Google maps API done');
    googleLibLoaded = true;
}
