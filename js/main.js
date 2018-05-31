$(document).ready(function () {

    // $('.jumbotron .btnnew').click(function () {
    //     var displayStatus = $('.newtrip').css('display');
    //     if (displayStatus === 'none') {
    //         $('.newtrip').animate({ 'height': '270px' }, 500, 'linear');
    //         $('.newtrip').show();
    //     }
    //     else {
    //         $('.newtrip').animate({ 'height': '0px' }, 500, 'linear', function () {
    //             $('.newtrip').hide();
    //         });
    //     }
    // });

    $('.jumbotron .btnnew').click(function () {
        $('.newtrip').slideToggle(500, 'linear', function() {
            clearNewTripForm();
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

    $('.newtrip .btncancel').click(function () {
        $('.newtrip').slideToggle(500, 'linear');
        clearNewTripForm();
    });

    $('.newtrip .btnsave').click(function () {
        console.log('SAVING...');
        var trip = {
                id: 't001',
                // id: $('.newtrip #triptitle').val(),
                name: $('.newtrip #title').val(),
                length: $('.newtrip #length').val(),
                duration: $('.newtrip #duration').val(),
                date: $('.newtrip #date').val(),
                startlocation: $('.newtrip #startlocation').val(),
                endlocation: $('.newtrip #endlocation').val(),
                desc: $('.newtrip #desc').val()
            };

        var html = {text: ''};
        createTileHtml(html, trip);
        $('.newtrip').slideToggle(700, 'linear', function() {
            $('.triptiles').prepend(html.text);
        });
        clearNewTripForm();
    });

    // ------ close trip detail form ------
    $('.tripdetail .btnclose').click(function () {
        $('.tripdetail').fadeOut(700);
        displayTripTiles();
    });

    function saveTripsToLocalStore() {

        var demotrips = [
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
    
        var locations = [
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
            }
        ];
        console.log(demotrips);
        
        localStorage.setItem('trips', JSON.stringify(demotrips));
        return;
    }; 

    function loadTripsFromLocalStore() {
        trips = JSON.parse(localStorage.getItem('trips'));
        for(var i=0; i<trips.length; i++) {
            console.log('Trip #' + i + ':');
            console.log(trips[i]);
        }
        return;
    }; 

    function createTileHtml(html, trip) {
        html.text = '<div class="col-md-4 triptile" id="' + trip.id + '">' 
        +'<h2>' + trip.name + '</h2>'  
        + '<div>'
        + '<span class="trip-length">' + trip.length +' km</span>'
        + '<span class="trip-duration">' + trip.duration + ' Tage</span>' 
        + '</div>' 
        + '<span class="trip-desc-short">' + trip.desc + '</span>'
        + '<p><a class="btn btn-secondary viewtrip" href="#" role="button">Anschauen »</a></p>'
        + '</div>';
    };

    function clearNewTripForm() {
        $('.newtrip #title').val('');
        $('.newtrip #length').val('');
        $('.newtrip #duration').val('');
        $('.newtrip #date').val('');
        $('.newtrip #startlocation').val('');
        $('.newtrip #endlocation').val('');
        $('.newtrip #desc').val('');
    };

    function displayTripTilesOLD() {
        for(var i=0; i<trips.length; i++) {
            
            console.log("adding tile id #" +i);
            console.log(trips[i]);
            var newtile = '<div class="col-md-4 triptile ' + trips[i].id + '">' 
                +'<h2>' + trips[i].name + '</h2>'  
                + '<div>'
                + '<span class="trip-length">' + trips[i].length +' km</span>'
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
    }; 

    function displayTripTiles() {
        $('.triptile').remove();
        for(var i=0; i<trips.length; i++) {
            
            console.log("adding tile id #" +i);
            console.log(trips[i]);

            var html = {
                text: ''};
            
            createTileHtml(html, trips[i]);
            // console.log('created new tile:');
            // console.log(html.text);
 
            $('.triptiles').append(html.text);

            // ------------- view trip ------------
            $('.viewtrip').click(function() {
                console.log('show trip details...');
                var currentId = $(this).parent().parent().attr('id');
                var tiles = $('.triptile').not('#'+currentId);
                tiles.fadeOut(700);
                $('.tripdetail').fadeIn(700);
            })
        
        }
        return;
    }; 
    
//  -------------- START after form load ---------------

    var trips;

    console.log('loadTripsFromLocalStore...');
    loadTripsFromLocalStore();
    console.log('done.');

    console.log('addTripTiles...');
    displayTripTiles();
    console.log('done.');


});
