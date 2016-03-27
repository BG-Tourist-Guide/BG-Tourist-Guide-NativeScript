'use strict';

let nearMeViewModel = require('./near-me-view-model');
let basePage = require('../../common/base-page').defaultInstance;
let frame = require('ui/frame');
let dialogs = require('ui/dialogs');
let isBackNavigation = false;
let viewModel;

function pageLoaded(args, a) {
  let page = args.object;

  if (!isBackNavigation) {
    viewModel = nearMeViewModel.defaultInstance;

    page.bindingContext = viewModel;

    basePage.loader.show();

    viewModel.findTouristSitesNearMe()
      .then(function(data) {
        basePage.loader.hide();
      }, function(err) {
        basePage.loader.hide();
        dialogs.alert({
          title: 'Error',
          message: 'Cannot find your location or there is no connection to the server.',
          okButtonText: 'OK'
        });
      });
  }
}

function searchBtnTap(args) {
  let button = args.object;
  button.animateTap()
    .then(function() {
      basePage.loader.show();

      viewModel.findTouristSitesNearMe()
        .then(function(data) {
          basePage.loader.hide();
        }, function(err) {
          basePage.loader.hide();
          dialogs.alert({
            title: 'Error',
            message: 'Cannot find your location or there is no connection to the server.',
            okButtonText: 'OK'
          });
        });
    });
}

function itemTap(args) {
  let index = args.index;

  let touristSite = viewModel.touristSites.getItem(index);

  frame.topmost()
    .navigate({
      moduleName: './views/tourist-sites/tourist-site-details/tourist-site-details-page',
      context: touristSite
    });
}

function pageNavigatingTo(args) {
  isBackNavigation = args.isBackNavigation;
}

module.exports = {
  pageLoaded,
  pageNavigatingTo,
  searchBtnTap,
  itemTap,
  backBtnTap: basePage.backBtnTap
};
