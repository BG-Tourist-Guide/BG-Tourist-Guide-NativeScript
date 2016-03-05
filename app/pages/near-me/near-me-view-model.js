'use strict';

let Observable = require('data/observable').Observable;
let ObservableArray = require('data/observable-array').ObservableArray;
let geolocation = require('../../helpers/geolocation-helper.js').defaultInstance;
let touristSitesService = require('../../web/services/tourist-sites-service').defaultInstance;

class NearMeViewModel extends Observable {
  constructor() {
    super();
    this.title = 'Near me';
    this.radius = 10;
    this.touristSites = new ObservableArray([]);
  }

  findTouristSitesNearMe() {
    let that = this;
    this.touristSites.splice(0, this.touristSites.length);

    let promise = new Promise(function (resolve, reject) {
      if (!geolocation.isEnabled()) {
        geolocation.enableLocationRequest();
        resolve(true);
        return;
      }

      geolocation.getCurrentLocation({
        updateDistance: 10,
        maximumAge: 3000,
        timeout: 5 * 1000
      }).
        then(function (location) {
          return touristSitesService.getTouristSitesNearPosition(location, that.radius);
        }, reject)
        .then(function (data) {
          data.forEach(function (item) {
            that.touristSites.push(item);
          });

          resolve(true);
        }, reject);
    });

    return promise;
  }
}

module.exports = {
  NearMeViewModel: NearMeViewModel,
  defaultInstance: new NearMeViewModel()
};