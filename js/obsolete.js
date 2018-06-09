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