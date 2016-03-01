'use strict';
let applicationSettings = require('application-settings');
let constants = require('../common/constants');

class UsersHelper {
  setCurrentUserInLocalStorage(user) {
    applicationSettings.setString(constants.APPLICATION_SETTINGS_USER_KEY, user ? JSON.stringify(user) : '');
    return user;
  }

  getCurrentUserFromLocalStorage() {
    let jsonUser = applicationSettings.getString(constants.APPLICATION_SETTINGS_USER_KEY);
    
    if (jsonUser) {
      return JSON.parse(jsonUser);
    }
    else {
      return null;
    }
  }
}

module.exports = {
  UsersHelper: UsersHelper,
  defaultInstance: new UsersHelper()
};