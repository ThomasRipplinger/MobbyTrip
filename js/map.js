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

function geocodeCallbackTrip(results, status) {
    if (status == 'OK') {
        if (results === undefined) {
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
        MAP = new google.maps.Map(document.getElementById('tripMap'), mapOptions);  // global var
        MAP.setCenter(geocode);
      
        // manage markers
        // var marker = new google.maps.Marker({
        //     map: map,
        //     draggable: true,
        //     position: results[0].geometry.location
        // });
        // marker.addListener('draged', OnTripMarkerPositionChanged);
    } else {
        log.error('ERROR: geocode not successful for the following reason: ' + status);
    }
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

function drawRoute() {
    log.info('drawing route');
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionRequest = {};
    var tripId;

    tripId = $('.tripForm #tripId').val();
    if(tripId !== undefined) {
        makeRequest(tripId, directionRequest);
    }
    else {
        log.error('ERROR: tripId not found');
    }
    if(directionRequest == null) return;

    directionsDisplay.setMap(MAP);   // bind to map object
    directionsService.route(directionRequest.content, function(result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);   // draw route
            // directionsDisplay.setPanel(document.getElementById('tripDirections'));  // bind directions panel
            // $('#tripDirections').slideToggle(500, 'linear');
        }
        else {
            log.error('ERROR calculating route, status:' + status);
        }
    });
}

function makeRequest(tripId, directionRequest) {
    log.info('create direction request for trip');
    // console.log(trips[tripId]);

    var tripIndex = getTripIndexById(tripId);
    if(tripIndex == undefined) {
        directionRequest.content = null;
        log.error('ERROR invalid trip id');
        return;
    }
    if(trips[tripIndex].locations == undefined) {
        directionRequest.content = null;
        log.error('ERROR invalid location array');
        return;
    }
    var locationCount = trips[tripIndex].locations.length;
    if(locationCount < 2) { // with 2 locations there's origin and destination, otherwise not
        directionRequest.content = null;
        log.info('less than 2 locations - will not return direction request');
        return;
    }
    // at least 2 locations exist
    directionRequest.content =  {
        origin: trips[tripIndex].locations[0].name,
        destination: trips[tripIndex].locations[locationCount-1].name,
        waypoints: [],
        provideRouteAlternatives: false,
        optimizeWaypoints: false,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC
    };    
    // for more than 2 locations: add waypoints
    for(var i=2; i<trips[tripIndex].locations.length; i++) {
        var waypointObject = {
            location: trips[tripIndex].locations[i].name,
            stopover: false
        }
        directionRequest.content.waypoints.push(waypointObject);
    }
    
    log.debug('direction request:' );
    log.debug(directionRequest.content);
    console.log(directionRequest.content);
}