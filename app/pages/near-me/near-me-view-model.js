'use strict';

let Observable = require('data/observable').Observable;
let ObservableArray = require('data/observable-array').ObservableArray;
let geolocation = require('nativescript-geolocation');
let touristSitesService = require('../../web/services/tourist-sites-service').defaultInstance;
let enums = require('ui/enums');

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
        desiredAccuracy: enums.Accuracy.high,
        updateDistance: 10,
        maximumAge: 3000,
        timeout: 20 * 1000
      }).
        then(function (location) {
          console.log('-------Location');
          return touristSitesService.getTouristSitesNearPosition(location, that.radius);
        }, function (err) {
          console.log('-------Error when getting the current location.');
          console.log(err);
          reject({
            message: err
          });
        })
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