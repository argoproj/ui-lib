'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

require('ts-node/register');

let Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var helpers = require('./helpers');

let capabilities = {
    'browserName': process.env.AX_BROWSER_NAME || 'chrome',
    'phantomjs.binary.path': require('phantomjs-prebuilt').path,
};

if (process.env.SELENIUM_IP) {
    capabilities.seleniumAddress = `http://${process.env.SELENIUM_IP}:4444/wd/hub`;
}

let myIP = require('my-ip')();

exports.config = {
    baseUrl: `http://${myIP}:3001/`,

    // use `npm run e2e`
    specs: [
        helpers.root('src/test/e2e/**.spec.ts'),
    ],
    exclude: [],

    framework: 'jasmine2',

    allScriptsTimeout: 110000,

    jasmineNodeOpts: {
        showTiming: true,
        showColors: true,
        isVerbose: false,
        includeStackTrace: false,
        defaultTimeoutInterval: 400000
    },
    directConnect: !process.env.SELENIUM_IP,
    params: {
        user: {
            username: process.env.AX_ADMIN_USERNAME,
            password: process.env.AX_ADMIN_PASSWORD,
        },
        testScm: {
            type: 'bitbucket',
            repo: 'https://bitbucket.org/applatix/gui-testing.git',
            username: 'axauto',
            password: 'ax123456'
        },
        axClusterUrl: 'https://' + process.env.AX_CLUSTER_HOST + '/v1',
    },
    capabilities: capabilities,

    onPrepare: function() {
        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
          savePath: './.tmp/e2e-test-report/',
          filePrefix: 'index'
        }));
        browser.manage().timeouts().implicitlyWait(10000);
        browser.driver.manage().window().setSize(1280, 1024);
    },

    useAllAngular2AppRoots: true
};

