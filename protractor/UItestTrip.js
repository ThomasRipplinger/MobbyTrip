describe('Protractor trip UI tests', function () {

    // let baseURL = 'https://thomasripplinger.github.io/TravelLogBook';
    let baseURL = 'file:///C:/zDev/codecademy/001womoTrips/index.html';


    it('should create new trip TEST-01', function () {
        browser.waitForAngularEnabled(false);
        browser.get(baseURL);
        expect(browser.getTitle()).toEqual('TravelLogBook');

        // add trip, verify that form opens
        element(by.id('btnCreateNewTrip')).click();
        var tripForm = element.all(by.css('.tripForm'));
        expect(tripForm.count()).toEqual(1);
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(true);
        // create trip TEST-01 and save
        element(by.id('destination')).sendKeys('TEST-01');
        browser.sleep(1000);
        element(by.id('btnSaveTrip')).click();
        // verify form is closed (not visible) 
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(false);
    });

    it('should open TEST-01 trip and set trip properties', function () {
        browser.waitForAngularEnabled(false);
        browser.get(baseURL);
        expect(browser.getTitle()).toEqual('TravelLogBook');

        browser.sleep(1000);
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

    it('should rename TEST-01 trip to TEST-02', function () {
        browser.waitForAngularEnabled(false);
        browser.get(baseURL);
        expect(browser.getTitle()).toEqual('TravelLogBook');

        browser.wait(function()  {              // .........wait until tiles are displayed
            return $('.triptile').isPresent();
        }, 5000);
        // browser.sleep(1000);
        element(by.id('TEST-01')).click();
        browser.wait(function()  {              // .........wait until form is open  
            return $('.tripForm').isDisplayed();
        }, 5000);
        // verify form is open
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(true);
    
        // change trip name
        element(by.id('destination')).clear();
        element(by.id('destination')).sendKeys('TEST-02');
        browser.sleep(1000);

        // save & close trip form
        element(by.id('btnSaveTrip')).click();
        // verify form is closed (not visible) 
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(false);
        // verify TRIP-02 tile exists
        expect(element(by.id('TEST-02')).isPresent()).toBe(true);
    });

    it('should delete TEST-02 trip', function () {
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