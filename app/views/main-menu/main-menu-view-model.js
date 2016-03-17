'use strict';

let Observable = require('data/observable').Observable;
let users = require('../../helpers/users-helper').defaultInstance;

class MainMenuViewModel extends Observable {
  constructor() {
    super();
    this.title = 'BG Tourist Guide';
    this.currentUser = users.getCurrentUserFromLocalStorage();
  }
  
  logout() {
    users.setCurrentUserInLocalStorage(null);
  }
}

module.exports = {
  MainMenuViewModel: MainMenuViewModel,
  defaultInstance: new MainMenuViewModel()
};