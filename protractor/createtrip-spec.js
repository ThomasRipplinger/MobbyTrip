describe('Protractor trip UI tests', function () {

    it('should create TEST-01 trip', function () {
        browser.waitForAngularEnabled(false);
        browser.get('https://thomasripplinger.github.io/TravelLogBook');
        expect(browser.getTitle()).toEqual('TravelLogBook');

        // add trip, verify that form opens
        element(by.id('btnCreateNewTrip')).click();
        var tripForm = element.all(by.css('.tripForm'));
        expect(tripForm.count()).toEqual(1);
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(true);

        // create trip TEST-01 and save
        element(by.id('destination')).sendKeys('TEST-01');
        element(by.id('btnSave')).click();

        // verify form is closed (not visible) 
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(false);
    });

    it('should open TEST-01 trip and set trip properties', function () {
        browser.waitForAngularEnabled(false);
        browser.get('https://thomasripplinger.github.io/TravelLogBook');
        expect(browser.getTitle()).toEqual('TravelLogBook');

        // open trip (*** works only for one trip ***)
        element(by.css('.viewtrip')).click();
        // verify form is open
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(true);

        // set duration, etc.
        element(by.id('date')).sendKeys('date-01');
        element(by.id('length')).sendKeys('length-01');
        element(by.id('duration')).sendKeys('duration-01');
        element(by.id('desc')).sendKeys('desc-01');
        element(by.id('btnSave')).click();
        // verify form is closed (not visible) 

        expect(element(by.css('.tripForm')).isDisplayed()).toBe(false);
    });

    it('should open TEST-01 trip and verify trip properties', function () {
        browser.waitForAngularEnabled(false);
        browser.get('https://thomasripplinger.github.io/TravelLogBook');
        expect(browser.getTitle()).toEqual('TravelLogBook');

        // open trip (*** works only for one trip ***)
        element(by.css('.viewtrip')).click();
        // verify form is open
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(true);

        // check duration, etc.
        expect(element(by.id('date')).text()).toEqual('date-01');
        expect(element(by.id('length')).text()).toEqual('length-01');
        expect(element(by.id('duration')).text()).toEqual('duration-01');
        expect(element(by.id('desc')).text()).toEqual('desc-01');

        // TODO: wait .......

        element(by.id('btnCancel')).click();
        // verify form is closed (not visible) 
        expect(element(by.css('.tripForm')).isDisplayed()).toBe(false);
    });

    it('should remove TEST-01 trip', function () {
        browser.waitForAngularEnabled(false);
        browser.get('https://thomasripplinger.github.io/TravelLogBook');
        expect(browser.getTitle()).toEqual('TravelLogBook');

        // open trip, verify that data exists

    });

    it('should verify TEST-01 trip is removed', function () {
        browser.waitForAngularEnabled(false);
        browser.get('https://thomasripplinger.github.io/TravelLogBook');
        expect(browser.getTitle()).toEqual('TravelLogBook');

        // open trip, verify that data exists

    });


});