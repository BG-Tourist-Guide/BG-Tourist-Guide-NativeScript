'use strict';
let frame = require('ui/frame');
let customAnimations = require('../../common/custom-animations');
let loader = require('nativescript-loading-indicator');

class BasePage {
  constructor() {
    this.loader = loader;
  }
  
  backBtnTap(args) {
    frame.goBack();
  }
}

module.exports = {
  BasePage: BasePage,
  defaultInstance: new BasePage()
};