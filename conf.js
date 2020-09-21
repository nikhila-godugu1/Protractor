exports.config = {
  framework: "jasmine2",
  //seleniumAddress: 'http://localhost:4444/wd/hub',       // To run the script against Selenium Server
  specs: [
    "spec/regressionTest.spec.js",
    "spec/smokeTest.spec.js",
  ],

  exculde: [],                                              // To exclude scripts

  directConnect: true,                                      // To run the script directly in local

  capabilities: {
    //shardTestFiles: true,                                 // To run scripts in parallel
    //maxInstances: 2                                       // Number of scripts to run in parallel
    browserName: "chrome",
    chromeOptions: {
      args: [
        "--disable-gpu",
      ],
    },
  },

  // multiCapabilities: [                                   // To run the scripts on both Firfox and Chrome
  //   {
  //     browserName: "firefox",
  //   },
  //   {
  //     browserName: "chrome",
  //   },
  // ],

  onPrepare: function () {
    browser.ignoreSynchronization = true;
    (global.baseUrl = "https://www.macys.com/"),
      (global.WAIT_TIME = 10000),
      (global.SLEEP_TIME = 3000),
      browser.driver.manage().window().maximize(),
      browser.manage().timeouts().pageLoadTimeout(45000);
  },

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
  },
};
