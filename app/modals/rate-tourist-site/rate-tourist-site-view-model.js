'use strict';

let Observable = require('data/observable').Observable;
let touristSitesService = require('../../web/services/tourist-sites-service').defaultInstance;
let usersHelper = require('../../helpers/users-helper').defaultInstance;

class RateTouristSiteViewModel extends Observable {
  constructor(touristSite) {
    super();

    if (touristSite) {
      this.touristSite = touristSite;
    }

    this.rating = 0;
    this.ratings = [5, 4, 3, 2, 1];
  }
}

module.exports = {
  RateTouristSiteViewModel: RateTouristSiteViewModel,
  defaultInstance: new RateTouristSiteViewModel()
};