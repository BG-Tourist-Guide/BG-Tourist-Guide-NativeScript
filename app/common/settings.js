'use strict';

let applicationSettings = require('application-settings');
let constants = require('./constants');

module.exports = class Settings {
  enableCache() {
    applicationSettings.setBoolean(constants.APPLICATION_SETTINGS_IS_CACHE_ENABLED_KEY, true);
  }
  
  disableCache() {
    applicationSettings.setBoolean(constants.APPLICATION_SETTINGS_IS_CACHE_ENABLED_KEY, false);
  }
  
  isCacheEnabled() {
    return !!applicationSettings.getBoolean(constants.APPLICATION_SETTINGS_IS_CACHE_ENABLED_KEY);
  }
  
  setCacheDuration(duration) {
    applicationSettings.setNumber(constants.APPLICATION_SETTINGS_CACHE_DURATION_KEY, duration);
  }
  
  cacheDuration() {
    if (applicationSettings.hasKey(constants.APPLICATION_SETTINGS_CACHE_DURATION_KEY)) {
      return applicationSettings.getNumber(constants.APPLICATION_SETTINGS_CACHE_DURATION_KEY);
    } else {
      return constants.DEFAULT_CACHE_DURATION;
    }
  }
};