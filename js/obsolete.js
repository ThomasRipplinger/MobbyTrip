// OBSOLETE functions -------------------------------------

function animateForm() {
    var displayStatus = $('.tripForm').css('display');
    if (displayStatus === 'none') {
        $('.tripForm').animate({ 'height': '270px' }, 500, 'linear');
        $('.tripForm').show();
    }
    else {
        $('.tripForm').animate({ 'height': '0px' }, 500, 'linear', function () {
            $('.tripForm').hide();
        });
    }
}

function displayTripTilesOLD() {
    for (var i = 0; i < trips.length; i++) {

        log.debug("adding tile id #" + i);
        log.debug(trips[i]);
        var newtile = '<div class="col-md-4 triptile ' + trips[i].id + '">'
            + '<h2>' + trips[i].name + '</h2>'
            + '<div>'
            + '<span class="trip-length">' + trips[i].length + ' km</span>'
            + '<span class="trip-duration">' + trips[i].duration + ' Tage</span>'
            + '</div>'
            + '<span class="trip-desc-short">' + trips[i].desc + '</span>'
            + '<p><a class="btn btn-secondary" href="#" role="button">Anschauen »</a></p>'
            + '</div>';
        // log.debug('created new tile:');
        // log.debug(newtile);
        // log.debug(trips);

        $('.tripTiles').append(newtile);
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
    log.debug(trips);
}