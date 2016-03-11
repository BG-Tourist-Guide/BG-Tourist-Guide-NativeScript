'use strict';

let mainMenuViewModel = require('./main-menu-view-model');
let customAnimations = require('../../common/custom-animations');
let constants = require('../../common/constants');
let frame = require('ui/frame');
let viewModel;

function pageLoaded(args) {
  let page = args.object;
  viewModel = new mainMenuViewModel.MainMenuViewModel();

  if (!viewModel.currentUser) {
    frame.topmost()
      .navigate({
        backstackVisible: false,
        moduleName: './pages/account/account-page'
      });

    return;
  }

  page.bindingContext = viewModel;
}

function allBtnTap(args) {
  let button = args.object;
  button.animateTap()
    .then(function() {
      frame.topmost()
        .navigate({
          moduleName: './pages/tourist-sites/list-tourist-sites/list-tourist-sites-page',
          context: {
            type: constants.ALL_TOURIST_SITES_TYPE
          }
        });
    });
}

function officialBtnTap(args) {
  let button = args.object;
  button.animateTap()
    .then(function() {
      frame.topmost()
        .navigate({
          moduleName: './pages/tourist-sites/list-tourist-sites/list-tourist-sites-page',
          context: {
            type: constants.OFFICIAL_TOURIST_SITES_TYPE
          }
        });
    });
}

function unofficialBtnTap(args) {
  let button = args.object;
  button.animateTap()
    .then(function() {
      frame.topmost()
        .navigate({
          moduleName: './pages/tourist-sites/list-tourist-sites/list-tourist-sites-page',
          context: {
            type: constants.UNOFFICIAL_TOURIST_SITES_TYPE
          }
        });
    });
}

function nearMeBtnTap(args) {
  let button = args.object;
  button.animateTap()
    .then(function() {
      frame.topmost()
        .navigate('./pages/tourist-sites/near-me/near-me-page');
    });
}

function logoutBtnTap(args) {
  let button = args.object;
  button.animateTap()
    .then(function() {
      viewModel.logout();

      frame.topmost()
        .navigate({
          backstackVisible: true,
          moduleName: './pages/account/account-page'
        });
    });
}

module.exports = {
  pageLoaded,
  nearMeBtnTap,
  allBtnTap,
  officialBtnTap,
  unofficialBtnTap,
  logoutBtnTap
};
