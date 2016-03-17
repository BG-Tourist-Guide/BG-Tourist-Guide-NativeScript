/*globals GMSServices*/

'use strict';
let application = require('application');

if(application.ios) {
  GMSServices.provideAPIKey('AIzaSyCPfj-u-cjBpBjtMTg6zFg_dyP_Ca7kNrE');
}

application.start({ moduleName: './views/main-menu/main-menu-page' });
