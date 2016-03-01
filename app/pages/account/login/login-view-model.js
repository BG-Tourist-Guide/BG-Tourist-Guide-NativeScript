'use strict';

let Observable = require('data/observable').Observable;
let users = require('../../../web/services/users-service').defaultInstance;

class LoginViewModel extends Observable {
  constructor() {
    super();
    this.title = 'Login';
    this.userName = '';
    this.password = '';
  }

  login() {
    let that = this;
    
    let promise = new Promise(function (resolve, reject) {
      users.login(that.userName, that.password)
        .then(function (data) {
          resolve(data);
        }, reject);
    });

    return promise;
  }
}

module.exports = {
  AccountViewModel: LoginViewModel,
  defaultInstance: new LoginViewModel()
};