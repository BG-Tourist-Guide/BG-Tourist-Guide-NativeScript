'use strict';

let Observable = require('data/observable').Observable;
let ObservableArray = require('data/observable-array').ObservableArray;
let geolocation = require('../../../helpers/geolocation-helper.js').defaultInstance;
let touristSitesService = require('../../../web/services/tourist-sites-service').defaultInstance;
let usersService = require('../../../web/services/users-service').defaultInstance;
let usersHelper = require('../../../helpers/users-helper').defaultInstance;

class TouristSiteDetailsViewModel extends Observable {
  constructor(touristSite) {
    super();

    if (touristSite) {
      this.touristSite = touristSite;
      this.title = touristSite.title;
      this.calculateRating();
      this.canRate = this.decideCanRate();
    }
  }

  decideCanRate() {
    let canRate = true;
    this.touristSite.ratings.forEach(function(item) {
      if (item.author === usersHelper.getCurrentUserFromLocalStorage().userName) {
        canRate = false;
      }
    });

    return canRate;
  }

  calculateRating() {
    if (this.touristSite.ratings.length === 0) {
      this.touristSite.calculatedRating = 0;
    }
    else {
      let ratingsSum = this.touristSite.ratings.reduce(function(sum, item) {
        return sum + (item.value || 0);
      }, 0);

      this.touristSite.calculatedRating = (ratingsSum / this.touristSite.ratings.length) | 0;
    }
  }

  visitTouristSite() {
    let updatedTouristSite;
    let that = this;
    let promise = new Promise(function(resolve, reject) {
      touristSitesService.visitTouristSite(that.touristSite)
        .then(function(dbTouristSite) {
          updatedTouristSite = dbTouristSite;
          return usersService.updateProfileInformation();
        }, reject)
        .then(function(dbUser) {
          resolve(updatedTouristSite);
        }, reject);
    });

    return promise;
  }
}

module.exports = {
  TouristSiteDetailsViewModel: TouristSiteDetailsViewModel,
  defaultInstance: new TouristSiteDetailsViewModel(null)
};