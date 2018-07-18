function tripTest() {

    console.log('*** running tripTest ***');

    if (getTripIndexForId(1) > 0) 
        console.log('PASSED test getTripIndexForId for Id=1');
    else
        console.log('FAILED test getTripIndexForId for Id=1');

    if (getTripIndexForId(99999) > 0) 
        console.log('FAILED test getTripIndexForId for Id=99999');

    if (getTripIndexForId(99999) === undefined) 
        console.log('PASSED test getTripIndexForId for Id=99999');

    console.log('*** done');
    return(true);
}
