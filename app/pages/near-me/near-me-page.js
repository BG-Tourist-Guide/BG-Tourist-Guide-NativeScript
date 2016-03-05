'use strict';

let nearMeViewModel = require('./near-me-view-model');
let customAnimations = require('../../common/custom-animations');
let loader = require('nativescript-loading-indicator');
let frame = require('ui/frame');
let dialogs = require('ui/dialogs');
let viewModel;

function pageLoaded(args) {
  let page = args.object;
  viewModel = nearMeViewModel.defaultInstance;

  page.bindingContext = viewModel;

  loader.show();

  viewModel.findTouristSitesNearMe()
    .then(function (data) {
      loader.hide();
    }, function (err) {
      loader.hide();
      dialogs.alert({
        title: 'Error',
        message: 'Cannot find your location or there is no connection to the server.',
        okButtonText: 'OK'
      });
    });
}

function searchBtnTap(args) {
  let button = args.object;
  button.animateTap();

  loader.show();

  viewModel.findTouristSitesNearMe()
    .then(function (data) {
      loader.hide();
    }, function (err) {
      loader.hide();
    });
}

module.exports = {
  pageLoaded,
  searchBtnTap
};
