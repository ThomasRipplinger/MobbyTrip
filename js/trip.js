class Trip {

    constructor() {
        // properties
        this.opened =  false;    // trip opened / selected
        this.id =      null;     // id for selected trip
        this.index =   null;     // index for tripArray for selected trip
        this.tripArray = [];     // holds all trip data
        this.locArray = [];      // access location data
    }

    get id() {
        if(this.opened) return this._id;
        else return null;
    }

    set id(value) {
        if(this.opened) {
            // this.tripArray[this.index].id = value;
            this._id = value;
        }
    }

    get index() {
        if(this.opened) return this._index;
        else return null;
    }
    set index(value) {
        if(this.opened) this._index = value;
    }

    get destination() {
        if(this.opened) return this.tripArray[this.index].destination;
        else return null;
    }
    set destination(value) {
        if(this.opened) this.tripArray[this.index].destination = value;
        else return null;
    }

    get length() {
        if(this.opened) return this.tripArray[this.index].length;
        else return null;
    }
    set length(value) {
        if(this.opened) this.tripArray[this.index].length = value;
        else return null;
    }

    get date() {
        if(this.opened) return this.tripArray[this.index].date;
        else return null;
    }
    set date(value) {
        if(this.opened) this.tripArray[this.index].date = value;
        else return null;
    }

    get duration() {
        if(this.opened) return this.tripArray[this.index].duration;
        else return null;
    }
    set duration(value) {
        if(this.opened) this.tripArray[this.index].duration = value;
        else return null;
    }

    get description() {
        if(this.opened) return this.tripArray[this.index].description;
        else return null;
    }
    set description(value) {
        if(this.opened) this.tripArray[this.index].description = value;
        else return null;
    }
    
    get locArray() {
        // if(this.opened) return this.tripArray[this.index].locations;
        if(this.opened) {
            if(this.tripArray[this.index].locArray !== undefined) {
                // log.info('access new locArray structure')
                return this.tripArray[this.index].locArray;
            }
            // else if(this.tripArray[this.index].locations !== undefined) {
            //     log.info('*** access old locations structure')
            //     this.tripArray[this.index].locArray = this.tripArray[this.index].locations.slice();
            //     return this.tripArray[this.index].locations;
            // }
        else    
            return null;
        }
    }
    set locArray(value) {
        // if(this.opened) this.tripArray[this.index].locations = value;
        if(this.opened) this.tripArray[this.index].locArray = value;
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
            this.opened = true;
            this.id = tripId;
            this.index = tripIndex;
            log.info('+++ Open trip with id / name ' + this.id + ' / ' + this.destination);
        }
    }

    close()         {         // close an open trip. Will invalidate the properties from above
        log.info('+++ Close trip with id / name ' + this.id + ' / ' + this.destination);
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
            date: '',
            length: '',
            duration: '',
            desc: '',
            // locArray: ['rom', 'rio'] // init location array with each new trip
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

    logAllTrips(logcomment) {
        log.info(logcomment);
        
        // if ((this.tripArray !== null) && (this.tripArray !== undefined)) {
        //     for (var i = 0; i < this.tripArray.length; i++) {
        //         log.debug('Trip #' + i + ':', this.tripArray[i]);
        //     }
        // }
    }

    loadFromLocalStore() {
        this.tripArray = JSON.parse(localStorage.getItem('tripdata'));
        this.logAllTrips('loaded trip data');
        // console.log('Dump of all trip data:');
        // console.log(JSON.stringify(this.tripArray));
    }
    
    saveToLocalStore() {
        // localStorage.setItem('tripdataBACKUP01', JSON.stringify(this.tripArray));
        // localStorage.setItem('tripdata', JSON.stringify(this.tripArray));
        this.logAllTrips('***************NOT saved trip data');
    }

}

