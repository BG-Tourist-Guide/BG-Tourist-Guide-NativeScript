'use strict';

let Observable = require('data/observable').Observable;
let ObservableArray = require('data/observable-array').ObservableArray;
let touristSitesService = require('../../../web/services/tourist-sites-service').defaultInstance;

class ListTouristSitesViewModel extends Observable {
  constructor(type) {
    super();
    this.title = 'Tourist sites';
    this.touristSites = new ObservableArray([]);
    this.page = 0;
    this.isLoading = false;
    this.type = type;
  }

  loadTouristSites() {
    this.page++;
    this.set('isLoading', true);
    let that = this;

    let promise = new Promise(function (resolve, reject) {
      touristSitesService.getForPage(that.page, that.type)
        .then(function (data) {
          data.forEach(function (item) {
            that.touristSites.push(item);
          });

          that.set('isLoading', false);

          resolve(true);
        }, function (err) {
          that.set('isLoading', false);
          reject(err);
        });
    });

    return promise;
  }
}

module.exports = {
  ListTouristSitesViewModel: ListTouristSitesViewModel,
  defaultInstance: new ListTouristSitesViewModel()
};