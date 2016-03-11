'use strict';

let Observable = require('data/observable').Observable;

class ShowOnMapViewModel extends Observable {
  constructor() {
    super();
  }
}

module.exports = {
  ShowOnMapViewModel: ShowOnMapViewModel,
  defaultInstance: new ShowOnMapViewModel()
};