'use strict';

let touristSiteDetailsViewModel = require('./tourist-site-details-view-model');
let customAnimations = require('../../common/custom-animations');
let loader = require('nativescript-loading-indicator');
let frame = require('ui/frame');
let dialogs = require('ui/dialogs');
let viewModel;

function pageLoaded(args) {
  let page = args.object;
  viewModel = new touristSiteDetailsViewModel.TouristSiteDetailsViewModel();

  page.bindingContext = viewModel;
}

function navigatedTo(args) {
  console.dir(args.context);
}

module.exports = {
  pageLoaded,
  navigatedTo
};
