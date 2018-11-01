var { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['createtrip-spec.js'],
    multiCapabilities: [ {
      browserName: 'chrome'
    }],
    
    onPrepare: function () {
      //console logs configurations
      jasmine.getEnv().addReporter(new SpecReporter({
          displayStacktrace: 'all',      // display stacktrace for each failed assertion, values: (all|specs|summary|none) 
          displaySuccessesSummary: false, // display summary of all successes after execution 
          displayFailuresSummary: true,   // display summary of all failures after execution 
          displayPendingSummary: true,    // display summary of all pending specs after execution 
          displaySuccessfulSpec: true,    // display each successful spec 
          displayFailedSpec: true,        // display each failed spec 
          displayPendingSpec: false,      // display each pending spec 
          displaySpecDuration: false,     // display each spec duration 
          displaySuiteNumber: false,      // display each suite number (hierarchical) 
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