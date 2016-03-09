'use strict';
let viewModule = require('ui/core/view');
let animations = require('nativescript-effects');

viewModule.View.prototype.animateTap = function (duration, opacity) {
  duration = duration || 25;
  opacity = opacity || 0.8;
  
  let that = this;
  this.fadeTo(duration, opacity)
        .then(function () {
          that.fadeTo(duration, 1);
        });
};