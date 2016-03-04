'use strict';

let requester = require('../requester').defaultInstance;
let responseHelper = require('../helpers/response-helper').defaultInstance;

class TouristSitesService {
  getForPage(page) {
    page = page || 0;

    let promise = new Promise(function (resolve, reject) {
      requester.getJsonAsync(`/api/tourist-sites?page=${page}`)
        .then(function (response) {
          responseHelper.handleResponseInPromise(response, resolve, reject);
        });
    });

    return promise;
  }

  getTouristSitesNearPosition(position, radius) {
    let promise = new Promise(function (resolve, reject) {
      requester
        .getJsonAsync(`/api/tourist-sites/near-me?latitude=${position.latitude}&longitude=${position.longitude}&radius=${radius}`)
        .then(function (response) {
          responseHelper.handleResponseInPromise(response, resolve, reject);
        });
    });

    return promise;
  }
}

module.exports = {
  TouristSitesService: TouristSitesService,
  defaultInstance: new TouristSitesService()
};