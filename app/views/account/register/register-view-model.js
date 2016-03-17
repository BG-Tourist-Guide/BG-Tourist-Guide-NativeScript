'use strict';

let Observable = require('data/observable').Observable;
let users = require('../../../web/services/users-service').defaultInstance;

class RegisterViewModel extends Observable {
  constructor() {
    super();
    this.title = 'Register';
    this.userName = '';
    this.password = '';
  }

  register() {
    let that = this;

    let promise = new Promise(function (resolve, reject) {
      users.register(that.userName, that.password)
        .then(function (data) {
          return users.login(that.userName, that.password);
        }, reject)
        .then(function (data) {
          resolve(data);
        }, reject);
    });

    return promise;
  }
}

module.exports = {
  RegisterViewModel: RegisterViewModel,
  defaultInstance: new RegisterViewModel()
};