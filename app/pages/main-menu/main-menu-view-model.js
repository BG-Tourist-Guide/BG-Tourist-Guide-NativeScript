'use strict';

let Observable = require('data/observable').Observable;

class MainMenuViewModel extends Observable {
  constructor() {
    super();
    this.title = 'BG Tourist Guide';
  }
}

module.exports = {
  MainMenuViewModel: MainMenuViewModel,
  defaultInstance: new MainMenuViewModel()
};