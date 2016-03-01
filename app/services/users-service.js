'use strict';
let applicationSettings = require('application-settings');
let constants = require('../common/constants');

class UsersService {
  saveCurrentUserInLocalStorage(user) {
    let promise = new Promise(function (resolve, reject) {
      applicationSettings.setString(constants.APPLICATION_SETTINGS_USER_KEY, JSON.stringify(user));
      
      resolve(user);
    });
    
    return promise;
  }
  
  getCurrentUserFromLocalStorage() {
    let promise = new Promise(function (resolve, reject) {
      let jsonUser = applicationSettings.getString(constants.APPLICATION_SETTINGS_USER_KEY);
      
      resolve(JSON.parse(jsonUser));
    });
    
    return promise;
  }
  
  login(userName, password) {
    let promise = new Promise(function (resolve, reject) {
      resolve();
    });
    
    return promise;
  }
}

module.exports = {
  UsersService: UsersService,
  defaultInstance: new UsersService()
};