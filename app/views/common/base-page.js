'use strict';
let frame = require('ui/frame');
let customAnimations = require('../../common/custom-animations');
let LoadingIndicator = require('nativescript-loading-indicator').LoadingIndicator;
let loader = new LoadingIndicator();

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