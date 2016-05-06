'use strict';

let applicationSettings = require('application-settings');
let constants = require('./constants');
let cacheService = require('./cache/cache-service');

class Settings {
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

  clearCache() {
    // Do not clear all application settings because it will clear the current user.
    let cachedItemsToClear = [constants.CACHE_LOCATION_KEY];

    cachedItemsToClear.forEach(cacheService.deleteItem); 
  }
}

module.exports = new Settings();