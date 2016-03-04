'use strict';

let Observable = require('data/observable').Observable;
let users = require('../../helpers/users-helper').defaultInstance;

class NearMeViewModel extends Observable {
  constructor() {
    super();
    this.title = 'Near me';
  }

  findTouristSitesNearMe() {
    let promise = new Promise(function (resolve, reject) {

    });

    return promise;
  }
}

module.exports = {
  NearMeViewModel: NearMeViewModel,
  defaultInstance: new NearMeViewModel()
};