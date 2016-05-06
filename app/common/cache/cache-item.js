'use strict';

class CacheItem {
  constructor(key, content, expirationDate) {
    this.key = key;
    this.content = content;
    this.expirationDate = expirationDate;
    this.cachedOn = new Date();
  }
}

module.exports = CacheItem;