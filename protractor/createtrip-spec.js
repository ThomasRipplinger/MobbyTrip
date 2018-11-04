describe('Protractor trip UI tests', function () {

    // let baseURL = 'https://thomasripplinger.github.io/TravelLogBook';
    let baseURL = 'file:///C:/zDev/codecademy/001womoTrips/index.html';


    it('should create TEST-01 trip', function () {
        browser.waitForAngularEnabled(false);
        // browser.get('https://thomasripplinger.github.io/TravelLogBook');
        browser.get(baseURL);
        expect(browser.getTitle()).toEqual('TravelLogBook');

        // add trip, verify that form opens
        element(by.id('btnCreateNewTrip')).click();
        var tripForm = element.all(by.css('.tripForm'));
        expect(tripForm.count()).toEqual(1);
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(true);
        // create trip TEST-01 and save
        element(by.id('destination')).sendKeys('TEST-01');
        element(by.id('btnSaveTrip')).click();
        // verify form is closed (not visible) 
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(false);
    });

    it('should open TEST-01 trip and set trip properties', function () {
        browser.waitForAngularEnabled(false);
        // browser.get('https://thomasripplinger.github.io/TravelLogBook');
        browser.get(baseURL);
        expect(browser.getTitle()).toEqual('TravelLogBook');

        // open trip (*** works only for one trip ***)
        // element(by.css('.viewtrip')).click();
        element(by.id('TEST-01')).click();
        // verify form is open
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(true);
        // set duration, etc.
        element(by.id('date')).sendKeys('date-01');
        element(by.id('length')).sendKeys('length-01');
        element(by.id('duration')).sendKeys('duration-01');
        element(by.id('desc')).sendKeys('desc-01');
        // save & close trip form
        element(by.id('btnSaveTrip')).click();
        // verify form is closed (not visible) 
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(false);
    });

    it('should verify TEST-01 trip properties', function () {
        browser.waitForAngularEnabled(false);
        // browser.get('https://thomasripplinger.github.io/TravelLogBook');
        browser.get(baseURL);
        expect(browser.getTitle()).toEqual('TravelLogBook');

        // open trip (*** works only for one trip ***)
        // element(by.css('.viewtrip')).click();
        element(by.id('TEST-01')).click();
        // verify form is open
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(true);
        // check duration, etc.
        expect(element(by.id('date')).getAttribute('value')).toEqual('date-01');
        expect(element(by.id('length')).getAttribute('value')).toEqual('length-01');
        expect(element(by.id('duration')).getAttribute('value')).toEqual('duration-01');
        expect(element(by.id('desc')).getAttribute('value')).toEqual('desc-01');
        // wait - display form with test data.....
        browser.sleep(1000);
        // close form
        element(by.id('btnCancel')).click();
        // verify form is closed (not visible) 
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(false);
    });

    it('should add a location to TEST-01 trip', function () {
        browser.waitForAngularEnabled(false);
        // browser.get('https://thomasripplinger.github.io/TravelLogBook');
        browser.get(baseURL);
        expect(browser.getTitle()).toEqual('TravelLogBook');

        element(by.id('TEST-01')).click();
        // verify form is open
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(true);
        // create location

        browser.wait(function() {  
            return $('#btn-newlocation').isPresent();
         }, 5000);
         // browser.sleep(2000);  // required - CLARIFY TODO
        element(by.id('btn-newlocation')).click();

        browser.wait(function() {  
            return $('#input-newlocation').isPresent();
         }, 5000);
        element(by.id('input-newlocation')).sendKeys('test-location1\n');

        // verify location form is open
        browser.wait(function() {  
            return $('.locationForm').isPresent();
         }, 5000);
        // browser.sleep(2000);

        expect(element(by.css('.locationForm')).isDisplayed()).toBe(true);
        // set location data
        element(by.id('locationName')).clear();
        element(by.id('locationName')).sendKeys('location1-name');
        element(by.id('locationDate')).sendKeys('Di, 23 Okt. 2018');
        element(by.id('locationAddress')).sendKeys('location1-address');
        element(by.id('locationDesc')).sendKeys('location1-description');

        // wait - display form with test data.....
        browser.sleep(2000);
        // save and close location form
        element(by.id('btnLocationOk')).click(); 
        browser.sleep(5000);
        
        // save & close trip form
        element(by.id('btnSaveTrip')).click();   // ************ problem here
        // verify trip form is closed (not visible) 
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(false);
        // verify location form is closed
        expect(element(by.css('.locationForm')).isDisplayed()).toBe(false);
    });

    xit('should verify test-01 location', function () {
        browser.waitForAngularEnabled(false);
        // browser.get('https://thomasripplinger.github.io/TravelLogBook');
        browser.get(baseURL);
        expect(browser.getTitle()).toEqual('TravelLogBook');

        // open trip (*** works only for one trip ***)
        // element(by.css('.viewtrip')).click();
        // element(by.buttonText('Anschauen »')).click();
        element(by.id('TEST-01')).click();
        // verify form is open
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(true);

        browser.sleep(1000);   // required (TODO: remove)

        // open location
        // element(by.css('.btn-location .existingLocation')).click();
        // element(by.css('.existingLocation')).click();
        element(by.id('1')).click();
        // verify location form is open
        browser.sleep(1000);
        expect(element(by.css('.locationForm')).isDisplayed()).toBe(true);
        // verify location data
        expect(element(by.id('locationName')).getAttribute('value')).toEqual('location1-name');
        // expect(element(by.id('locationName')).getAttribute('value')).toEqual('test-location1');   // TODO: should verify modified name !!
        expect(element(by.id('locationDate')).getAttribute('value')).toEqual('Di, 23 Okt. 2018');
        expect(element(by.id('locationAddress')).getAttribute('value')).toEqual('location1-address');
        expect(element(by.id('locationDesc')).getAttribute('value')).toEqual('location1-description');
        // wait - display form with test data.....
        browser.sleep(3000);
        // close trip form
        element(by.id('btnCancel')).click();
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