
$(document).ready(function () {

    var trips = [];
    var locations = [];
    var geocoder;
    var map;


    //  ################### Execute after form load #######################

    console.log('loadTripsFromLocalStore...');
    loadTripsFromLocalStore();

    console.log('addTripTiles...');
    displayTripTiles();

    console.log('initDemoLocations...');
    initDemoLocations();

    //  ################### END form load #################################


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

    // LOAD FROM LOCAL STORE #############################
    function loadTripsFromLocalStore() {
        trips = JSON.parse(localStorage.getItem('trips'));
        logTrips('Loading trip data...');
    }
    
    // SAVE TRIP TO LOCAL STORE ##########################
    function saveTripsToLocalStore() {

        // clear trips array
        trips.length = 0;
        
        // get collection of current trip tiles
        var $triptiles = $('.triptile')

        // iterate over the collection to construct the new trips object array 
        console.log('found ' + $triptiles.length + ' tiles');
        for(var i=0; i<$triptiles.length; i++) {
            var $tile = $triptiles.eq(i);  
            var trip = {};
            trip['id'] = 't001';
            trip['destination'] = $tile.find('h2').text();
            trip['length'] = $tile.find('.trip-length').text();
            trip['duration'] = $tile.find('.trip-duration').text();
            trip['description'] = $tile.find('.trip-desc-short').text();
            trips.push(trip);
        }

        logTrips('Saved trip data:');
        localStorage.setItem('trips', JSON.stringify(trips));
    }

    function logTrips(logcomment) {
        console.log(logcomment);
        if (trips !== null) {
            for (var i = 0; i < trips.length; i++) {
                console.log('Trip #' + i + ':');
                console.log(trips[i]);
            }
        }
    }

    function makeTileHtml(html, trip) {
        html.text = '<div class="col-md-4 triptile" id="' + trip.id + '">'
            + '<div class="row">'
            +   '<h2 class="col-sm-10">' + trip.destination + '</h2>'
            +   '<button type="button" class="deletetrip close col-sm-2" aria-label="Close">'
            +     '<span aria-hidden="true">&times;</span>'
            +   '</button>'
            + '</div>'
            + '<div>'
            + '<span class="trip-length">' + trip.length + ' km</span>'
            + '<span class="trip-duration">' + trip.duration + ' Tage</span>'
            + '</div>'
            + '<span class="trip-desc-short">' + trip.desc + '</span>'
            + '<p><a class="btn btn-secondary viewtrip" href="#" role="button">Anschauen »</a></p>'
            + '</div>';
        // console.log(html.text);
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

        // add all tiles from clean slate
        $('.triptile').remove();
        if (trips !== null) {
            for (var i = 0; i < trips.length; i++) {
                console.log("adding tile id #" + i);
                // console.log(trips[i]);
                var html = { text: '' };
                makeTileHtml(html, trips[i]);
                $('.triptiles').append(html.text);
            }

            // ------------- add view trip handler ------------
            $('.viewtrip').click(function () {
                console.log('show trip details...');
                var currentId = $(this).parent().parent().attr('id');
                var tiles = $('.triptile').not('#' + currentId);
                tiles.fadeOut(700);
                // show trip-detail form
                $('.tripdetail').fadeIn(700);
                displayLocationList();
            })

            // ------------- add delete trip handler ----------
            $('.deletetrip').click(function () {
                console.log('delete trip: ' + $(this).parent().find('h2').text());
                $(this).parent().parent().remove();
                setTimeout(saveTripsToLocalStore, 2000);  // only works with timeout 2000ms...
            })
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

    // ###################### NEW TRIP - show form  ###########
    $('.jumbotron .btnnew').click(function () {
        $('.newtrip').slideToggle(500, 'linear', function () {
            clearNewTripForm();

            // ##################
            initializeMap();
            // ##################
        });
    });

    // ----------------- test, remove ------------------------
    $('.jumbotron .btnsave').click(function () {
        saveTripsToLocalStore();
    });

    // ----------------- test, remove ------------------------
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

    // #################### NEW TRIP - SAVE ##################
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
        setTimeout(saveTripsToLocalStore, 2000);  // only works with timeout 2000ms...
        clearNewTripForm();
    });

    // -------------- close trip detail form w/o saving ------
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

function setDemoTrips() {

    trips = [
        {
            id: 't001',
            name: 'trip01',
            length: 320,
            duration: 9,
            date: 'August 2017',
            desc: 'Beschreibung der Reise ...bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ...',
        },
        {
            id: 't002',
            name: 'trip02',
            length: 550,
            duration: 4,
            date: 'März 2017',
            desc: 'Beschreibung der Reise ...bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ...',
        },
        {
            id: 't003',
            name: 'trip03',
            length: 699,
            duration: 5,
            date: 'Jan. 2018',
            desc: 'Beschreibung der Reise ...bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ...',
        }
    ];
    console.log(trips);
}