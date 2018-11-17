var { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['UItestTrip.js', 'UItestLocation.js'],
    multiCapabilities: [ {
      browserName: 'chrome'
    }],
    // multiCapabilities: [{
    //     'browserName': 'chrome'
    //   }, {
    //     'browserName': 'firefox'
    // }],    

    onPrepare: function () {
      browser.manage().window().setSize(1280, 1024);
      //console logs configurations
      jasmine.getEnv().addReporter(new SpecReporter({
          displayStacktrace: 'summary',   // display stacktrace for each failed assertion, values: (all|specs|summary|none) 
          displaySuccessesSummary: false, // display summary of all successes after execution 
          displayFailuresSummary: true,   // display summary of all failures after execution 
          displayPendingSummary: false,    // display summary of all pending specs after execution 
          displaySuccessfulSpec: true,    // display each successful spec 
          displayFailedSpec: true,        // display each failed spec 
          displayPendingSpec: false,      // display each pending spec 
          displaySpecDuration: true,     // display each spec duration 
          displaySuiteNumber: true,      // display each suite number (hierarchical) 
          colors: {
              success: 'green',
              failure: 'red',
              pending: 'yellow'
          },
          prefixes: {
              success: '✓ ',
              failure: '✗ ',
              pending: '* '
          },
          customProcessors: []
      }));
  }
}