function tripTest() {

    log.debug('*** running tripTest ***');

    if (getTripIndexForId(1) > 0) 
        log.debug('PASSED test getTripIndexForId for Id=1');
    else
        log.debug('FAILED test getTripIndexForId for Id=1');

    if (getTripIndexForId(99999) > 0) 
        log.debug('FAILED test getTripIndexForId for Id=99999');

    if (getTripIndexForId(99999) === undefined) 
        log.debug('PASSED test getTripIndexForId for Id=99999');

    log.debug('*** done');
    return(true);
}
