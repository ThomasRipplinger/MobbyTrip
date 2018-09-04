var log = log4javascript.getLogger();
var popUpAppender = new log4javascript.PopUpAppender();
popUpAppender.setUseOldPopUp();
popUpAppender.setNewestMessageAtTop(true);
popUpAppender.setScrollToLatestMessage(true);
popUpAppender.setWidth(800);
// popUpAppender.setInitiallyMinimized(true);   // start minimized
log.addAppender(popUpAppender);


describe("TravelLog test suite", function() {

  // beforeEach(function() {
  // });

  describe("trip/location management tests", function() {
    var newTripId;
    var newLocationId;
    
    // beforeEach(function() {
    // });

    it("should create a new trip", function() {
      newTripId = createTrip();
      expect(newTripId).toBeGreaterThanOrEqual(0);
    });

    it("should create a new location", function() {
      newLocationId = createLocation(newTripId);
      expect(newLocationId).toBeGreaterThanOrEqual(0);
    });

    it("should remove the location", function() {
      expect(deleteLocation(newTripId, newLocationId)).toEqual(OK);
    });

    it("should remove the trip", function() {
      expect(deleteTrip(newTripId)).toEqual(OK);
    });

  });

  describe("other tests", function() {
    
    // beforeEach(function() {
    // });

  });
  
});
