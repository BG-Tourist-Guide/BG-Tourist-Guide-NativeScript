'use strict';

let Observable = require('data/observable').Observable;
let users = require('../../services/users-service').defaultInstance;

class AccountViewModel extends Observable {
  constructor() {
    super();
    this.title = 'Account';
    this.getCurrentUser();
  }
  
  getCurrentUser() {
    let that = this;
    
    users.getCurrentUserFromLocalStorage()
      .then(function (user) {
        that.set('currentUser', user);
      });
  }
}

module.exports = {
  AccountViewModel: AccountViewModel,
  defaultInstance: new AccountViewModel()
};