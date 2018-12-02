describe('Protractor location UI tests', function () {

    // let baseURL = 'https://thomasripplinger.github.io/TravelLogBook';
    let baseURL = 'file:///C:/zDev/codecademy/001womoTrips/index.html';


    it('should create new trip TEST-01', function () {
        browser.waitForAngularEnabled(false);
        // browser.get('https://thomasripplinger.github.io/TravelLogBook');
        browser.get(baseURL);
        expect(browser.getTitle()).toEqual('TravelLogBook');

        // add trip, verify that form opens
        element(by.id('btnCreateNewTrip')).click();
        browser.sleep(2000);
        var tripForm = element.all(by.css('.tripForm'));
        expect(tripForm.count()).toEqual(1);
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(true);
        // create trip TEST-01 and save
        element(by.id('destination')).sendKeys('TEST-01');
        browser.sleep(1000);
        element(by.id('btnSaveTrip')).click();
        // verify form is closed (not visible) 
        browser.sleep(2000);
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(false);
    });

    it('should add a location to TEST-01 trip', function () {
        browser.waitForAngularEnabled(false);
        // browser.get('https://thomasripplinger.github.io/TravelLogBook');
        browser.get(baseURL);
        expect(browser.getTitle()).toEqual('TravelLogBook');

        element(by.id('TEST-01')).click();
        // verify form is open
        browser.sleep(2000);
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(true);
        // create location

        browser.wait(function() {  
            return $('#btn-newlocation').isPresent();
         }, 5000);
        element(by.id('btn-newlocation')).click();

        browser.wait(function() {  
            return $('#input-newlocation').isPresent();
         }, 5000);
        element(by.id('input-newlocation')).sendKeys('test-location1\n');

        // verify location form is open
        browser.wait(function() {  
            return $('.locationForm').isPresent();
         }, 5000);
        browser.sleep(2000);

        expect(element(by.css('.locationForm')).isDisplayed()).toBe(true);
        // set location data
        element(by.id('locationName')).clear();
        // element(by.id('locationName')).sendKeys('');
        // element(by.id('locationName')).sendKeys('location1-name');
        element(by.id('locationDate')).sendKeys('Di, 23 Okt. 2018');
        element(by.id('locationAddress')).sendKeys('location1-address');
        element(by.id('locationDesc')).sendKeys('location1-description');

        // wait - display form with test data.....
        browser.sleep(2000);
        // save and close location form
        element(by.id('btnLocationOk')).click(); 
        browser.sleep(2000);
        
        // save & close trip form
        browser.wait(function() {  
            return $('#btnSaveTrip').isPresent();
         }, 5000);
        // element(by.id('btnSaveTrip')).click();   // ************ problem here
        // verify trip form is closed (not visible) 
        // expect(element(by.css('.tripForm')).isDisplayed()).toBe(false);
        // verify location form is closed
        // expect(element(by.css('.locationForm')).isDisplayed()).toBe(false);
    });

    it('should verify location properties', function () {
        browser.waitForAngularEnabled(false);
        // browser.get('https://thomasripplinger.github.io/TravelLogBook');
        browser.get(baseURL);
        expect(browser.getTitle()).toEqual('TravelLogBook');   // page display OK

        browser.wait(function() {  
            return $('#TEST-01').isPresent();   // ............... wait until trip tile is displayed
         }, 5000);

        element(by.id('TEST-01')).click();
        // verify form is open
        browser.sleep(2000);
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(true);  // trip form opened

        browser.wait(function() {  
            return $('.existingLocation').isPresent();     // ................ wait until location tile is present
         }, 5000);

        // open location
        $('.existingLocation').click();    

        browser.wait(function() {  
            return $('.locationForm').isPresent();     // ............... wait until form is open
         }, 5000);

        // verify location data
        expect(element(by.id('locationName')).getAttribute('value')).toEqual('test-location1');   
        expect(element(by.id('locationDate')).getAttribute('value')).toEqual('Di, 23 Okt. 2018');
        expect(element(by.id('locationAddress')).getAttribute('value')).toEqual('location1-address');
        expect(element(by.id('locationDesc')).getAttribute('value')).toEqual('location1-description');
        
        // close trip form
        $('#btnCancel').click();   
        // verify trip form is closed (not visible) 
        browser.sleep(2000);
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(false);
        // verify location form is closed
        expect(element(by.css('.locationForm')).isDisplayed()).toBe(false);
    });

    xit('should rename the location', function () {
        browser.waitForAngularEnabled(false);
        // browser.get('https://thomasripplinger.github.io/TravelLogBook');
        browser.get(baseURL);
        expect(browser.getTitle()).toEqual('TravelLogBook');

        element(by.id('TEST-01')).click();
        // verify form is open
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(true);

        // open location
        browser.wait(function() {  // ...............wait for location tiles to be displayed
            return $('.existingLocation').isPresent();
         }, 5000);
        $('.existingLocation').click();

        browser.wait(function() {  // .............. wait until location form is open
            return $('.locationForm').isPresent();
         }, 5000);
        // browser.sleep(2000);

        expect(element(by.css('.locationForm')).isDisplayed()).toBe(true);
        // set location data
        element(by.id('locationName')).clear();
        element(by.id('locationName')).sendKeys('locationNEW');

        // wait - display form with test data.....
        browser.sleep(1000);
        // save and close location form
        element(by.id('btnLocationOk')).click(); 
        browser.sleep(1000);
        
        // verify location has been renamed
        let newLocationName = $('h4').getInnerHtml();  
        expect(newLocationName).toBe('locationNEW'); 

        // save & close location form
        browser.wait(function() {  
            return $('#btnSaveTrip').isPresent();
         }, 5000);
        element(by.id('btnSaveTrip')).click();
        // verify trip form is closed (not visible) 
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(false);
        // verify location form is closed
        expect(element(by.css('.locationForm')).isDisplayed()).toBe(false);
    });

    it('should delete TEST-01 trip', function () {
        browser.waitForAngularEnabled(false);
        // browser.get('https://thomasripplinger.github.io/TravelLogBook');
        browser.get(baseURL);
        expect(browser.getTitle()).toEqual('TravelLogBook');

        // delete trip
        element(by.css('.deletetrip')).click();
        // wait - display trip tiles.....
        browser.sleep(1000);
        // verify that tile is deleted
        expect(element(by.css('.triptile')).isPresent()).toBe(false);

    });

});