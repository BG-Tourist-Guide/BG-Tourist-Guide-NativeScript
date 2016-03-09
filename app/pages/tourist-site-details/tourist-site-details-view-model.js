'use strict';

let Observable = require('data/observable').Observable;
let ObservableArray = require('data/observable-array').ObservableArray;
let geolocation = require('../../helpers/geolocation-helper.js').defaultInstance;
let touristSitesService = require('../../web/services/tourist-sites-service').defaultInstance;
let usersHelper = require('../../helpers/users-helper').defaultInstance;

class TouristSiteDetailsViewModel extends Observable {
  constructor(touristSite) {
    super();

    if (touristSite) {
      this.touristSite = touristSite;
      this.calculateRating();
      this.canRate = this.decideCanRate();
    }
  }

  decideCanRate() {
    this.touristSite.ratings.forEach(function (item) {
      if (item.author === usersHelper.getCurrentUserFromLocalStorage().userName) {
        return false;
      }
    });

    return true;
  }

  calculateRating() {
    if (this.touristSite.ratings.length === 0) {
      this.touristSite.calculatedRating = 0;
    }
    else {
      let ratingsSum = this.touristSite.ratings.reduce(function (first, second) {
        return first.value + second.value;
      }, 0);

      this.touristSite.calculatedRating = ratingsSum / this.touristSite.ratings.length;
    }
  }
}

module.exports = {
  TouristSiteDetailsViewModel: TouristSiteDetailsViewModel,
  defaultInstance: new TouristSiteDetailsViewModel()
};