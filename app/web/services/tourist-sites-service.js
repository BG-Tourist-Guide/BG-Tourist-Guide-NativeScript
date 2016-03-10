'use strict';

let requester = require('../requester').defaultInstance;
let responseHelper = require('../helpers/response-helper').defaultInstance;

class TouristSitesService {
  getForPage(page, type) {
    page = page || 0;

    let promise = new Promise(function(resolve, reject) {
      requester.getJsonAsync(`/api/tourist-sites?page=${page}&type=${type}`)
        .then(function(response) {
          responseHelper.handleResponseInPromise(response, resolve, reject);
        });
    });

    return promise;
  }

  getTouristSitesNearPosition(position, radius) {
    let promise = new Promise(function(resolve, reject) {
      requester
        .getJsonAsync(`/api/tourist-sites/near-me?latitude=${position.latitude}&longitude=${position.longitude}&radius=${radius}`)
        .then(function(response) {
          responseHelper.handleResponseInPromise(response, resolve, reject);
        }, reject);
    });

    return promise;
  }

  rateTouristSite(touristSiteId, ratingValue) {
    let promise = new Promise(function(resolve, reject) {
      let data = {
        id: touristSiteId,
        value: ratingValue
      };
            
      requester.postJsonAsync('/api/tourist-sites/rate', data)
        .then(function(response) {
          responseHelper.handleResponseInPromise(response, resolve, reject);
        }, reject);
    });

    return promise;
  }
}

module.exports = {
  TouristSitesService: TouristSitesService,
  defaultInstance: new TouristSitesService()
};