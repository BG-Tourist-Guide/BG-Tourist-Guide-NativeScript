'use strict';

let Observable = require('data/observable').Observable;
let settings = require('./../../common/settings');

class SettingsViewModel extends Observable {
  constructor() {
    super();
    this.pageTitle = 'Settings';
    this.cacheDurationsValues = [5, 30, 60, 5 * 60, 10 * 60, 30 * 60, 60 * 60];
    this.cacheDurations = ['5 seconds', '30 seconds', '1 minute', '5 minutes', '10 minutes', '30 minutes', '1 hour'];
    this.selectedCacheDuration = this.cacheDurationsValues.indexOf(settings.cacheDuration());
    
    this.cacheEnabled = settings.isCacheEnabled();
  }
  
  saveSettings() {
    if (this.cacheEnabled) {
      settings.enableCache();
    } else {
      settings.disableCache();
    }
    
    settings.setCacheDuration(this.cacheDurationsValues[this.selectedCacheDuration]);
  }
  
  clearCache() {
    settings.clearCache();
  }
}

module.exports = {
  SettingsViewModel: SettingsViewModel,
  defaultInstance: new SettingsViewModel()
};