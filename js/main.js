
$(document).ready(function () {

    var trips = [];
    var locations = [];
    var geocoder;
    var map;


    //  ################### START after form load #######################

    console.log('loadTripsFromLocalStore...');
    loadTripsFromLocalStore();

    console.log('addTripTiles...');
    displayTripTiles();

    console.log('initDemoLocations...');
    initDemoLocations();

    //  ################### END form load ###############################


    function initializeMap() {
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(-34.397, 150.644);
        var mapOptions = {
            zoom: 8,
            center: latlng
        }
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
    }

    function codeAddress() {
        var address = document.getElementById('destination').value;
        console.log('Address: ' + address);
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == 'OK') {
                for (var i = 0; i < results.length; i++) {
                    console.log('result #' + i + results[i].formatted_address);
                }
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

    // LOAD FROM LOCAL STORE ###############################
    function loadTripsFromLocalStore() {
        trips = JSON.parse(localStorage.getItem('trips'));
        logTrips();
    }
    
    // SAVE TO LOCAL STORE ###############################
    function saveTripsToLocalStore() {

        // var demotrips = [
        //     {
        //         id: 't001',
        //         name: 'trip01',
        //         length: 320,
        //         duration: 9,
        //         date: 'August 2017',
        //         desc: 'Beschreibung der Reise ...bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ...',
        //     },
        //     {
        //         id: 't002',
        //         name: 'trip02',
        //         length: 550,
        //         duration: 4,
        //         date: 'März 2017',
        //         desc: 'Beschreibung der Reise ...bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ...',
        //     },
        //     {
        //         id: 't003',
        //         name: 'trip03',
        //         length: 699,
        //         duration: 5,
        //         date: 'Jan. 2018',
        //         desc: 'Beschreibung der Reise ...bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ...',
        //     }
        // ];
        // console.log(demotrips);

        // select all trip tiles and construct trips object for storage
        console.log('Trips before saving:');
        logTrips();

        // clear trips array
        trips.length = 0;
        
        // get collection of current trip tiles
        var $triptiles = $('.triptile')

        // interate over the collection to construct the new trips object array 
        for(var i=0; i<$triptiles.length; i++) {
            var $tile = $triptiles.eq(i);  
            var trip = {};
            trip['name'] = $tile.find('h2').text();
            trip['length'] = $tile.find('.trip-length').text();
            trip['duration'] = $tile.find('.trip-duration').text();
            trip['description'] = $tile.find('.trip-desc-short').text();
            trips.push(trip);
        }

        console.log('Trips after saving:');
        logTrips();

        // !!!!!!!!!!!!!!!!!
        // localStorage.setItem('trips', JSON.stringify(trips));
    }

    function logTrips() {
        if (trips !== null) {
            for (var i = 0; i < trips.length; i++) {
                console.log('Trip #' + i + ':');
                console.log(trips[i]);
            }
        }
    }

    function makeTileHtml(html, trip) {
        html.text = '<div class="col-md-4 triptile" id="' + trip.id + '">'
            + '<h2>' + trip.name + '</h2>'
            + '<div>'
            + '<span class="trip-length">' + trip.length + ' km</span>'
            + '<span class="trip-duration">' + trip.duration + ' Tage</span>'
            + '</div>'
            + '<span class="trip-desc-short">' + trip.desc + '</span>'
            + '<p><a class="btn btn-secondary viewtrip" href="#" role="button">Anschauen »</a></p>'
            + '</div>';
    }

    function clearNewTripForm() {
        $('.newtrip #destination').val('');
        $('.newtrip #name').val('');
        $('.newtrip #length').val('');
        $('.newtrip #duration').val('');
        $('.newtrip #date').val('');
        $('.newtrip #desc').val('');
    }
    
    function displayTripTiles() {
        $('.triptile').remove();
        if (trips !== null) {
            for (var i = 0; i < trips.length; i++) {
                console.log("adding tile id #" + i);
                // console.log(trips[i]);
                var html = { text: '' };
                makeTileHtml(html, trips[i]);
                $('.triptiles').append(html.text);

                // ------------- view trip ------------
                $('.viewtrip').click(function () {
                    console.log('show trip details...');
                    var currentId = $(this).parent().parent().attr('id');
                    var tiles = $('.triptile').not('#' + currentId);
                    tiles.fadeOut(700);
                    // show trip-detail form
                    $('.tripdetail').fadeIn(700);
                    displayLocationList();
                })
            }
        }
    }

    function displayLocationList() {
        $('.location').not('#addNewLocation').remove();
        for (var i = 0; i < locations.length; i++) {

            console.log("adding location #" + i);
            console.log(locations[i].name);

            var html = '<div class="location p-2">' + locations[i].name + '</div>';
            $('.locationlist').append(html);
        }
        return;
    }

    function initDemoLocations() {
        locations = [
            {
                id: 001,
                name: 'Sisteron',
                duration: 1,
                desc: 'Beschreibung der Location... bla bla bla bla bla bla bla bla ',
                camping_name: 'L´Ardeche',
                camping_adress: 'adresse hier...',
                camping_website: 'www.lardeche.fr',
                camping_price: '35',
                camping_rating: 3,
                camping_desc: 'Kommentar zum Camping hier...'
            },
            {
                name: 'location 002'
            },
            {
                name: 'location 003'
            },
            {
                name: 'location 004'
            },
            {
                name: 'location 005'
            }
        ];
    }

    // ###################### CREATE NEW TRIP #########################
    $('.jumbotron .btnnew').click(function () {
        $('.newtrip').slideToggle(500, 'linear', function () {
            clearNewTripForm();

            // ##################
            initializeMap();
            // ##################
        });
    });

    $('.jumbotron .btnsave').click(function () {
        console.log('SAVING...');
        saveTripsToLocalStore();
        console.log('done.');
    });

    $('.jumbotron .btnload').click(function () {
        console.log('LOADING...');
        loadTripsFromLocalStore();
        console.log('done.');
    });

    // Destination entered - center map around the dest. 
    $('.newtrip #destination').blur(function () {
        console.log('New Destination: ' + $('.newtrip #destination').val());
        codeAddress();
    });

    $('.newtrip .btncancel').click(function () {
        $('.newtrip').slideToggle(500, 'linear');
        clearNewTripForm();
    });

    // ######################### SAVE NEW TRIP #####################
    $('.newtrip .btnsave').click(function () {
        console.log('SAVING...');
        var trip = {
            id: 't001',
            destination: $('.newtrip #destination').val(),
            name: $('.newtrip #name').val(),
            length: $('.newtrip #length').val(),
            duration: $('.newtrip #duration').val(),
            // date: $('.newtrip #date').val(),
            desc: $('.newtrip #desc').val()
        };

        var html = { text: '' };
        makeTileHtml(html, trip);
        $('.newtrip').slideToggle(700, 'linear', function () {
            $('.triptiles').prepend(html.text);
        });
        saveTripsToLocalStore();
        clearNewTripForm();
    });

    // ------ close trip detail form ------
    $('.tripdetail .btnclose').click(function () {
        $('.tripdetail').fadeOut(700);
        displayTripTiles();
    });

});

function mapsAPIinitDone() {
    console.log('Init Google maps API done');
}

// OBSOLETE functions -------------------------------------
function animateForm() {
    var displayStatus = $('.newtrip').css('display');
    if (displayStatus === 'none') {
        $('.newtrip').animate({ 'height': '270px' }, 500, 'linear');
        $('.newtrip').show();
    }
    else {
        $('.newtrip').animate({ 'height': '0px' }, 500, 'linear', function () {
            $('.newtrip').hide();
        });
    }
}
function displayTripTilesOLD() {
    for (var i = 0; i < trips.length; i++) {

        console.log("adding tile id #" + i);
        console.log(trips[i]);
        var newtile = '<div class="col-md-4 triptile ' + trips[i].id + '">'
            + '<h2>' + trips[i].name + '</h2>'
            + '<div>'
            + '<span class="trip-length">' + trips[i].length + ' km</span>'
            + '<span class="trip-duration">' + trips[i].duration + ' Tage</span>'
            + '</div>'
            + '<span class="trip-desc-short">' + trips[i].desc + '</span>'
            + '<p><a class="btn btn-secondary" href="#" role="button">Anschauen »</a></p>'
            + '</div>';
        // console.log('created new tile:');
        // console.log(newtile);
        // console.log(trips);

        $('.triptiles').append(newtile);
    }
    return;
}
