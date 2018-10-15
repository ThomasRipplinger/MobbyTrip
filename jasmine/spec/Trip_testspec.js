var log = log4javascript.getLogger();
var popUpAppender = new log4javascript.PopUpAppender();
popUpAppender.setUseOldPopUp();
popUpAppender.setNewestMessageAtTop(true);
popUpAppender.setScrollToLatestMessage(true);
popUpAppender.setWidth(800);
// popUpAppender.setInitiallyMinimized(true);   // start minimized
log.addAppender(popUpAppender);


describe("TravelLogBook test suite", function() {

  // beforeEach(function() {
  // });

  describe("TRIP class tests", function() {

    testTrip = new Trip();              
    var tripId;

    // beforeEach(function() {
    // });

    it("should create a new trip", function() {
      tripId = testTrip.create();
      expect(tripId).toBeGreaterThanOrEqual(0);
      expect(testTrip.opened).toEqual(false);
    });

    it("should open the trip", function() {
      testTrip.open(tripId);
      expect(testTrip.opened).toEqual(true);
    });

    it("should save and reload trip data (start with empty store)", function() {
      // prepare test data
      testTrip.destination = 'test-destination01';
      testTrip.length = '1001';
      testTrip.date = 'May 2018';
      testTrip.duration = '10';
      testTrip.description = 'test-description 01';
      
      // save
      testTrip.saveToLocalStore('testdata');
      
      // reset 
      testTrip.destination = null;
      testTrip.length = null;
      testTrip.date = null;
      testTrip.duration = null;
      testTrip.description = null;
      testTrip.close();

      // re-load
      testTrip.loadFromLocalStore('testdata');
      testTrip.open(tripId);

      expect(testTrip.opened).toEqual(true);
      expect(testTrip.destination).toEqual('test-destination01');
      expect(testTrip.length).toEqual('1001');
      expect(testTrip.date).toEqual('May 2018');
      expect(testTrip.duration).toEqual('10');
      expect(testTrip.description).toEqual('test-description 01');
    });

    it("should delete the trip", function() {
      expect(testTrip.delete()).toEqual(OK);
    });

  });

  describe("TripVIEW tests", function() {
    
    // beforeEach(function() {
    // });

    // it("should pass API availabiltiy", function() {
    //   expect(verifyFileAPIsupport()).toEqual(OK);
    // })

  });
  
});
