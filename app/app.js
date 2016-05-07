/*globals GMSServices*/

'use strict';

// Need to require the application module first because of NativeScript specific settings in it.
let application = require('application');
let users = require('./helpers/users-helper').defaultInstance;
let startingModuleName = './views/main-menu/main-menu-page';

if (!users.getCurrentUserFromLocalStorage()) {
  startingModuleName = './views/account/account-page'
}

if(application.ios) {
  GMSServices.provideAPIKey('AIzaSyCPfj-u-cjBpBjtMTg6zFg_dyP_Ca7kNrE');
}

application.start({ moduleName: startingModuleName });
