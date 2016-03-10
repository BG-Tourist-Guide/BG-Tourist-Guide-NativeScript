'use strict';
let viewModule = require('ui/core/view');
let animations = require('nativescript-effects');

viewModule.View.prototype.animateTap = function(duration, opacity) {
  duration = duration || 50;
  opacity = opacity || 0.8;

  let that = this;
  let promise = new Promise(function(resolve, reject) {
    that.fadeTo(duration, opacity)
      .then(function() {
        return that.fadeTo(duration, 1);
      })
      .then(resolve, reject);
  });

  return promise;
};