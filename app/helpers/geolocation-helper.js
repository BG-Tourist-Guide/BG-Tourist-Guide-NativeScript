'use strict';

let geolocation = require('nativescript-geolocation');
let requester = require('../web/requester').defaultInstance;

class GeolocationHelper {
  isEnabled() {
    return geolocation.isEnabled();
  }

  enableLocationRequest() {
    return geolocation.enableLocationRequest();
  }

  getCurrentLocation(configuration) {
    let promise = new Promise(function (resolve, reject) {
      geolocation.getCurrentLocation(configuration)
        .then(resolve, function (err) {
          return requester.getJsonAsync('http://ipinfo.io/json', true);
        })
        .then(function (response) {          
          let latitude = +response.loc.split(',')[0];
          let longitude = +response.loc.split(',')[1];

          let location = {
            latitude,
            longitude
          };

          resolve(location);
        }, reject);
    });

    return promise;
  }
}

module.exports = {
  GeolocationHelper: GeolocationHelper,
  defaultInstance: new GeolocationHelper()
};