'use strict';

let allTouristSitesViewModel = require('./all-tourist-sites-view-model');
let customAnimations = require('../../../common/custom-animations');
let loader = require('nativescript-loading-indicator');
let frame = require('ui/frame');
let dialogs = require('ui/dialogs');
let viewModel;

function pageLoaded(args) {
  let page = args.object;
  viewModel = new allTouristSitesViewModel.AllTouristSitesViewModel();

  page.bindingContext = viewModel;

  loadTouristSites();
}

function loadTouristSites(args) {
  viewModel.loadTouristSites()
    .then(function (data) {
    }, function (err) {
      dialogs.alert({
        title: 'Error',
        message: 'Cannot load tourist sites.',
        okButtonText: 'OK'
      });
    });
}

function itemTap(args) {
  let index = args.index;

  let touristSite = viewModel.touristSites.getItem(index);

  frame.topmost()
    .navigate({
      moduleName: './pages/tourist-site-details/tourist-site-details-page',
      context: touristSite
    });
}

module.exports = {
  pageLoaded,
  loadTouristSites,
  itemTap
};
