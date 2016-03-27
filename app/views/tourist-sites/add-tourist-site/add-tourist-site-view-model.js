'use strict';

let Observable = require('data/observable').Observable;
let geolocation = require('../../../helpers/geolocation-helper.js').defaultInstance;
let touristSitesService = require('../../../web/services/tourist-sites-service').defaultInstance;

class AddTouristSiteViewModel extends Observable {
  constructor() {
    super();
    this.pageTitle = 'Add tourist site';
    this.description = '';
    this.address = '';
    this.latitude = null;
    this.longitude = null;
    this.useMyCurrentLocation = false;
  }

  addTouristSite() {
    let touristSite = {
      title: this.title,
      description: this.description,
      address: this.address,
      isOfficial: false,
      isApprovedForVisiting: false
    };

    let that = this;

    let promise = new Promise(function(resolve, reject) {
      if (that.useMyCurrentLocation) {
        geolocation.getCurrentLocation()
          .then(function(location) {
            touristSite.latitude = location.latitude;
            touristSite.longitude = location.longitude;

            return touristSitesService.addTouristSite(touristSite);
          }, reject)
          .then(resolve, reject);
      } else {
        touristSite.latitude = that.latitude;
        touristSite.longitude = that.longitude;

        touristSitesService.addTouristSite(touristSite)
          .then(resolve, reject);
      }
    });

    return promise;
  }
}

module.exports = {
  AddTouristSiteViewModel: AddTouristSiteViewModel,
  defaultInstance: new AddTouristSiteViewModel()
};