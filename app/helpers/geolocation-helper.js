'use strict';

let geolocation = require('nativescript-geolocation');
let requester = require('../web/requester').defaultInstance;
let cacheService = require('../common/cache/cache-service');
let constants = require('../common/constants');
let settings = require('../common/settings');

class GeolocationHelper {
  isEnabled() {
    return geolocation.isEnabled();
  }

  enableLocationRequest() {
    return geolocation.enableLocationRequest();
  }

  getCurrentLocation(configuration) {
    if (settings.isCacheEnabled() && cacheService.hasItem(constants.CACHE_LOCATION_KEY)) {
      return new Promise(function (resolve, reject) {
        resolve(cacheService.getItem(constants.CACHE_LOCATION_KEY));
      });
    }
    
    let promise = new Promise(function (resolve, reject) {
      geolocation.getCurrentLocation(configuration)
        .then(function(location) {
          if (settings.isCacheEnabled()) {
            let cacheDuration = settings.cacheDuration();
            cacheService.addItem(constants.CACHE_LOCATION_KEY, location, cacheDuration);
          }
          
          resolve(location);
        }, function (err) {
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