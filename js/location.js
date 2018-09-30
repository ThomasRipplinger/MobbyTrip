class Location {

    constructor(trip) {
        // properties
        this.trip = trip; // location will be part of this trip     TODO
        this.opened = false; // trip opened / selected
        this.id = null; // id for selected location
        this.index = null; // index for locArray for selected location
        this.locArray = []; // holds all location data
    }

    get id() {
        if (this.opened) return this.id;
        else return null;
    }

    set id(value) {
        // if (this.opened) this.locArray[this.index]._id = value;
        if (this.opened) this._id = value;
    }

    get index() {
        if (this.opened) return this.index;
        else return null;
    }

    set index(value) {
        if (this.opened) this._index = value;
        else return null;
    }

    get name() {
        if (this.opened) return this.locArray[this.index].name;
        else return null;
    }

    get date() {
        if (this.opened) return this.locArray[this.index].date;
        else return null;
    }

    get nights() {
        if (this.opened) return this.locArray[this.index].nights;
        else return null;
    }

    get distance() {
        if (this.opened) return this.locArray[this.index].distance;
        else return null;
    }

    get duration() {
        if (this.opened) return this.locArray[this.index].duration;
        else return null;
    }

    get address() {
        if (this.opened) return this.locArray[this.index].address;
        else return null;
    }

    get desc() {
        if (this.opened) return this.locArray[this.index].desc;
        else return null;
    }

    get tileDate() {
        if (!this.opened) return null;
        const locationDate = this.locArray[this.index].date;

        // date undefined? return empty string
        if (locationDate == undefined) return '';

        // first location? add "start"
        if (this.index == 0) {
            return locationDate + ' (Start)';
        }

        // last location? add "end"
        if (this.index == this.locArray.length - 1) {
            return locationDate + ' (Ende)';
        }

        // stop w/o overnight? add "stopover"
        if (this.locArray[this.index].nights == 0) {
            return locationDate + ' (Zwischenstop)';
        }

        // 1 night? return date w/o change
        if (this.locArray[this.index].nights == 1) {
            return locationDate;
        }

        // more than 1 night? add # of nights to date
        return locationDate + ' (' + this.locArray[this.index].nights + ' Tage)';
    }

    open(locationId) { // open a specific location for further processing. Will set current id/index and open properties
        var locationIndex = this.getIndex(locationId);
        if (locationIndex === null) {
            this.id = null;
            this.index = null;
            this.opened = false;
            log.error('ERROR - could not open location with id ' + locationId);
        } else {
            this.opened = true;
            this.id = locationId;
            this.index = locationIndex;
            // this.locArray = this.trip.locArray;
            log.info('+++ Open location with id / name ' + this.id + ' / ' + this.name);
        }
    }

    close() { // close an open location
        log.info('+++ Close location with id / name ' + this.id + ' / ' + this.name);
        this.opened = false;
    }

    create(locationName) {
        log.info('create new location id');

        if (!this.opened) {
            log.error('ERROR: location not open');
            return null;
        }
        var largestId = 0;
        var newId;
        // iterate over locations of current trip
        if (this.locArray) {
            for (var i = 0; i < this.locArray.length; i++) {
                if (parseInt(this.locArray[i].id) > largestId)
                    largestId = parseInt(this.locArray[i].id);
            }
        }
        newId = largestId + 1;

        // init locations array if empty
        if (this.locArray === undefined) {
            this.locArray = []; // TODO: setter
        }
        this.locArray.push({
            id: newId,
            name: locationName
        }); // add new location to array

        return newId;
    }

    delete(locationId) {
        log.info('delete location');
        log.debug('location Id: ' + locationId);

        if (locationId === undefined) return ERROR;
        if (!this.opened) return ERROR;

        this.open(locationId);
        if (!this.opened) return ERROR;

        this.locArray.splice(this.index, 1); // remove 1 element starting from index 
        return OK;
    }

    swap(firstIndex, secondIndex) {
        if (!this.opened) return ERROR;

        const firstLocation = this.locArray[firstIndex];
        const secondLocation = this.locArray[secondIndex];
        this.locArray[secondIndex] = firstLocation;
        this.locArray[firstIndex] = secondLocation;
    }

    getIndex(locationId) {
        // find current location index in array
        if (!this.opened) return null;

        for (var i = 0; i < this.locArray.length; i++) {
            if (parseInt(this.locArray[i].id) === parseInt(locationId)) {
                return (i);
            }
        }
        log.error('ERROR: location id not found');
        return null;
    }
}

function initDemoLocations() {
    log.info('init demo locations');
    if (!trip.opened) return ERROR;

    // init if no locations exist yet
    if (trip.locArray === undefined) {
        trip.locArray = [];

        location.create('locationABC');
        location.create('locationXYZ');
        location.create('location...');
    }
}
