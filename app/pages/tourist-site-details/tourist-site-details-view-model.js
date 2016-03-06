'use strict';

let Observable = require('data/observable').Observable;
let ObservableArray = require('data/observable-array').ObservableArray;
let geolocation = require('../../helpers/geolocation-helper.js').defaultInstance;
let touristSitesService = require('../../web/services/tourist-sites-service').defaultInstance;

class TouristSiteDetailsViewModel extends Observable {
  constructor() {
    super();
    this.title = '';
    this.touristSite = {};
  }
}

module.exports = {
  TouristSiteDetailsViewModel: TouristSiteDetailsViewModel,
  defaultInstance: new TouristSiteDetailsViewModel()
};