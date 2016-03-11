'use strict';

let nearMeViewModel = require('./near-me-view-model');
let customAnimations = require('../../../common/custom-animations');
let loader = require('nativescript-loading-indicator');
let frame = require('ui/frame');
let dialogs = require('ui/dialogs');
let isBackNavigation = false;
let viewModel;

function pageLoaded(args, a) {
  let page = args.object;

}

module.exports = {
  pageLoaded
};
