'use strict';

let CacheItem = require('./cache-item');
let applicationSettings = require('application-settings');
const INFINITE_CACHE_DATE = new Date(5000, 1, 1);

class CacheService {
  addItem(key, content, cacheDurationInSeconds) {
    let cacheExpirationDate = new Date();
    if (cacheDurationInSeconds) {
      cacheExpirationDate.setSeconds(cacheExpirationDate.getSeconds() + cacheDurationInSeconds);
    } else {
      cacheExpirationDate = INFINITE_CACHE_DATE;
    }
    
    let cacheItem = new CacheItem(key, content, cacheExpirationDate);
    
    applicationSettings.setString(key, JSON.stringify(cacheItem));
  }
  
  getItem(key) {
    if (this.hasItem(key)) {
      return JSON.parse(applicationSettings.getString(key)).content;
    } else {
      return null;
    }
  }
  
  hasItem(key) {
    let hasKey = applicationSettings.hasKey(key);
    
    if (hasKey) {
      let item = JSON.parse(applicationSettings.getString(key));
      item.expirationDate = new Date(item.expirationDate);
      
      if (item.expirationDate > new Date()) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  
  deleteItem(key) {
    let hasKey = applicationSettings.hasKey(key);
    
    if (hasKey) {
      applicationSettings.remove(key);
    }
  }
  
  clearAllItems() {
    applicationSettings.clear();
  }
}

module.exports = new CacheService();