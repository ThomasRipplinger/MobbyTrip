class Trip {

    constructor() {
        // properties
        this.opened =  false;    // trip opened / selected
        this.id =      null;     // id for selected trip
        this.index =   null;     // index for tripArray for selected trip
        this.tripArray = [];     // holds all trip data
    }

    get id() {
        if(this.opened) return this.id;
        else return null;
    }

    set id(value) {
        if(this.opened) {
            this.tripArray[this.index].id = value;
            this.id = value;
        }
        else return null;
    }

    get index() {
        if(this.opened) return this.index;
        else return null;
    }

    set index(value) {
        if(this.opened) this.index = value;
    }

    get name() {
        if(this.opened) return this.tripArray[this.index].name;
        else return null;
    }

    get length() {
        if(this.opened) return this.tripArray[this.index].length;
        else return null;
    }

    get duration() {
        if(this.opened) return this.tripArray[this.index].duration;
        else return null;
    }

    get description() {
        if(this.opened) return this.tripArray[this.index].description;
        else return null;
    }
    
    get locArray() {
        if(this.opened) return this.tripArray[this.index].locArray;
        else return null;
    }
    
    open(tripId)    {   // open a specific trip for further processing. Will set current id/index and open properties
        var tripIndex = this.getIndex(tripId);
        if(tripIndex === null) {
            this.id = null;
            this.index = null;
            this.opened = false;
            log.error('ERROR - could not open trip with id ' + tripId);
        } 
        else {
            this.id = tripId;
            this.index = tripIndex;
            this.opened = true;
            log.info('+++ Open trip with id / name ' + this.id + ' / ' + this.name);
        }
    }

    close()         {         // close an open trip. Will invalidate the properties from above
        log.info('+++ Close trip with id / name ' + this.id + ' / ' + this.name);
        this.opened = false;
        this.id = null;
        this.index = null;
    }
    
    create() { // create a new trip with new id, returns the new trip id
        log.info('create new trip id');
        var largestId = 0;
        var newId;
        // iterate over trips
        if ((this.tripArray !== undefined) && (this.tripArray !== null)) {
            for (var i = 0; i < this.tripArray.length; i++) {
                if (parseInt(this.tripArray[i].id) > largestId)
                    largestId = parseInt(this.tripArray[i].id);
            }
        } else {
            this.tripArray = []; // init in case of empty array
        }
        newId = largestId + 1;

        // init new array member
        var tripItem = {
            id: newId,
            destination: '',
            name: '',
            length: '',
            duration: '',
            desc: '',
            locArray: [] // init location array with each new trip
        };
        this.tripArray.unshift(tripItem); // add new trip to beginning of array

        return newId;
    }

    deleteByName(tripName) { // delete trip
        log.info('delete trip by name');
        log.debug('trip name: ' + tripName);

        for(var i=0; i<this.tripArray.length; i++) {
            if(this.tripArray[i].destination === tripName){
                log.info('found - deleting trip: ' + tripName);
                this.tripArray.splice(i, 1); // remove 1 element starting from i 
                return OK;
            }
        }
        // not found...
        log.error('ERROR: can´t find trip name for deletion in trip array');
        return ERROR;
    }

    delete() { // delete current trip
        log.info('delete currrent trip');
        log.debug('trip id: ' + this.id);

        if(!this.opened) {  
            log.error('ERROR: can´t delete, trip not open');
            return ERROR;
        }
        this.tripArray.splice(this.index, 1); // remove 1 element starting from index
        this.close();
        return OK;
    }

    getIndex(tripId) { // find current trip index in array
        for (var i = 0; i < this.tripArray.length; i++) {
            if (parseInt(this.tripArray[i].id) === parseInt(tripId)) {
                return (i);
            }
        }
        log.error('ERROR: trip id not found');
        return null;
    }

}

function logAllTrips(logcomment) {
    log.info(logcomment);
    if ((this.tripArray !== null) && (this.tripArray !== undefined)) {
        for (var i = 0; i < trip.tripArray.length; i++) {
            log.debug('Trip #' + i + ':', trip.tripArray[i]);
        }
    }
}
