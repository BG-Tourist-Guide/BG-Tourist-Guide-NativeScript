'use strict';

let Observable = require('data/observable').Observable;
let geolocation = require('../../../helpers/geolocation-helper.js').defaultInstance;
let touristSitesService = require('../../../web/services/tourist-sites-service').defaultInstance;

class AddTouristSiteViewModel extends Observable {
  constructor() {
    super();
    this.title = '';
    this.description = '';
    this.address = '';
    this.latitude = null;
    this.longitude = null;
    this.useMyCurrentLocation = false;
  }
}

module.exports = {
  AddTouristSiteViewModel: AddTouristSiteViewModel,
  defaultInstance: new AddTouristSiteViewModel()
};