class Location {
    // The location class has only one global instance object (loc)
    // It is linked to the global trip object
    // For data access a specific location needs to be OPENed for further processing (call .open for a location ID)
    // During OPEN the location index is set and will be used for all further data access via the getters/setters
    // Access is always via the location array (which in turn references the location array within the TRIP object)

    constructor(trip) {
        // properties
        this.trip = trip;       // location will be part of this trip     
        this.opened = false;    // location opened / selected
        this.index = null;      // index in locArray for selected location
    }

    get index() {
        if (this.opened) return this._index;
        else return null;
    }
    set index(value) {
        // works w/o open location because is used when opening
        this._index = value;
    }

    get id() {
        // if (this.opened) return this.locArray[this.index].id;
        if (this.opened) return this._id;
        else return null;
    }
    set id(value) {
        // if (this.opened) this.locArray[this.index].id = value;
        if (this.opened) this._id = value;
    }

    get name() {
        if (this.opened) return this.locArray[this.index].name;
        else return null;
    }
    set name(value) {
        if (this.opened) this.locArray[this.index].name = value;
    }

    get date() {
        if (this.opened) return this.locArray[this.index].date;
        else return null;
    }
    set date(value) {
        if (this.opened) this.locArray[this.index].date = value;
    }

    get nights() {
        if (this.opened) return this.locArray[this.index].nights;
        else return null;
    }
    set nights(value) {
        if (this.opened) this.locArray[this.index].nights = value;
    }

    get distance() {
        if (this.opened) return this.locArray[this.index].distance;
        else return null;
    }
    set distance(value) {
        if (this.opened) this.locArray[this.index].distance = value;
    }

    get duration() {
        if (this.opened) return this.locArray[this.index].duration;
        else return null;
    }
    set duration(value) {
        if (this.opened) this.locArray[this.index].duration = value;
    }

    get address() {
        if (this.opened) return this.locArray[this.index].address;
        else return null;
    }
    set address(value) {
        if (this.opened) return this.locArray[this.index].address = value;
    }

    get desc() {
        if (this.opened) return this.locArray[this.index].desc;
        else return null;
    }
    set desc(value) {
        if (this.opened) this.locArray[this.index].desc = value;
    }

    get locArray() {   // holds the location data for one trip
        // works w/o open location because is used when opening
        if(!this.trip.opened) {
            log.error('ERROR: trip not open, cant access locArray');
            return null;
        }
        return this.trip.locArray;
    }
    set locArray(value) {
        if (!this.opened) {
            log.error('ERROR: location not open, cant access locArray');
            return;
        }
        if(!this.trip.opened) {
            log.error('ERROR: trip not open, cant access locArray');
            return;
        }
        this.trip.locArray = value;
    }

    get tileDate() {   // returns date info with specific formation for display in location tile
        if (!this.opened) return null;
        // const locationDate = this.locArray[this.index].date;
        let locationDate = this.date;

        // date undefined? return empty string
        if (locationDate === undefined) return '';

        // first location? add "start"
        if (this.index == 0) {
            return locationDate + ' (Start)';
        }

        // last location? add "end"
        if (this.index == this.locArray.length - 1) {
            return locationDate + ' (Ende)';
        }

        // stop w/o overnight? add "stopover"
        if (this.nights == 0) {
            return locationDate + ' (Zwischenstop)';
        }

        // 1 night? return date w/o change
        if (this.nights == 1) {
            return locationDate;
        }

        // more than 1 night? add # of nights to date
        return locationDate + ' (' + this.nights + ' Tage)';
    }

    open(locationId) { // open a specific location for further processing
        // check if location exists, if yes set index for all further access
        if(this.locArray) {
            for(var i=0; i < this.locArray.length; i++) {
                if(locationId == this.locArray[i].id) {
                    this.opened = true;
                    this.index = i;
                    this.id = locationId;
                    log.info('+++ Open location with id / name ' + this.id + ' / ' + this.name);
                    return OK;
                }
            }
        }
        else {
            this.index = null;
            this.opened = false;
            log.error('ERROR - could not open location with id ' + locationId);
        }
        return ERROR;
    }

    // open(locationId) { // open a specific location for further processing. Will set current id/index and open properties
    //     var locationIndex = this.getIndex(locationId);
    //     if (locationIndex === null) {
    //         this.opened = false;
    //         log.error('ERROR - could not open location with id ' + locationId);
    //     } else {
    //         this.opened = true;
    //         this.id = locationId;
    //         this.index = locationIndex;
    //         // this.locArray = this.trip[this.trip.index]._locArray;   // no need - access via getter
    //         log.info('+++ Open location with id / name ' + this.id + ' / ' + this.name);
    //     }
    // }

    close() { // close an open location
        // log.info('+++ Close location with id / name ' + this.id + ' / ' + this.name);
        this.opened = false;
    }

    create(locationName) {
        log.info('create new location id');
        var largestId = 0;
        var newId;

        // iterate over locations of current trip to find largest id
        if (this.locArray) {
            for (var i = 0; i < this.locArray.length; i++) {
                if (parseInt(this.locArray[i].id) > largestId)
                    largestId = parseInt(this.locArray[i].id);
            }
        }
        newId = largestId + 1;

        // this.open(newId);
        // // init locations array if empty
        // if (this.locArray === undefined) {
        //     this.locArray = [];
        // }

        // add new location to array
        this.locArray.push({
            id: newId,
            name: locationName
        }); 
        return newId;
    }

    delete(locationId) {
        log.info('delete location');
        log.debug('location Id: ' + locationId);
        if (locationId === undefined) return ERROR;
        if (!this.opened) return ERROR;

        this.locArray.splice(this.index, 1); // remove 1 element starting from index 
        this.close();
        return OK;
    }

    swap(firstIndex, secondIndex) {
        if (!this.opened) return ERROR;
        if (this.locArray[firstIndex] === undefined) return ERROR;
        if (this.locArray[secondIndex] === undefined) return ERROR;

        const firstLocation = this.locArray[firstIndex];
        const secondLocation = this.locArray[secondIndex];
        this.locArray[secondIndex] = firstLocation;
        this.locArray[firstIndex] = secondLocation;
    }

    getIndex(locationId) {  // find location index for id
        // works w/o open location because is used when opening
        for (var i = 0; i < this.locArray.length; i++) {
            if (parseInt(this.locArray[i].id) === parseInt(locationId)) {
                return (i);
            }
        }
        log.error('ERROR: location id not found');
        return null;
    }

    // getId(locationIndex) {  // get location id 
    //     if (!this.locArray) return null;
    //     if (locationIndex >= this.locArray.length) return null;

    //     return this.locArray[locationIndex].id;
    // }
}

function initDemoLocations() {
    // log.info('init demo locations');
    // if (!trip.opened) return ERROR;

    // // init if no locations exist yet
    // if (trip.locArray === undefined) {
    //     trip.locArray = [];

    //     location.create('locationABC');
    //     location.create('locationXYZ');
    //     location.create('location...');
    // }
}
