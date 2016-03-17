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
        moduleName: './views/account/account-page'
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
          moduleName: './views/tourist-sites/list-tourist-sites/list-tourist-sites-page',
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
          moduleName: './views/tourist-sites/list-tourist-sites/list-tourist-sites-page',
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
          moduleName: './views/tourist-sites/list-tourist-sites/list-tourist-sites-page',
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
        .navigate('./views/tourist-sites/near-me/near-me-page');
    });
}

function addNewBtnTap(args) {
  let button = args.object;
  button.animateTap()
    .then(function() {
      frame.topmost()
        .navigate('./views/tourist-sites/add-tourist-site/add-tourist-site-page');
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
          moduleName: './views/account/account-page'
        });
    });
}

module.exports = {
  pageLoaded,
  nearMeBtnTap,
  allBtnTap,
  officialBtnTap,
  unofficialBtnTap,
  addNewBtnTap,
  logoutBtnTap
};
