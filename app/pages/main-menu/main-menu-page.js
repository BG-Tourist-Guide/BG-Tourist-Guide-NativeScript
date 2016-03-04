'use strict';

let mainMenuViewModel = require('./main-menu-view-model');
let customAnimations = require('../../common/custom-animations');
let frame = require('ui/frame');
let viewModel;

function pageLoaded(args) {
  let page = args.object;
  viewModel = mainMenuViewModel.defaultInstance;

  if (!viewModel.currentUser) {
    frame.topmost()
      .navigate('./pages/account/account-page');

    return;
  }

  page.bindingContext = viewModel;
}

function nearMeBtnTap(args) {
  let button = args.object;
  button.animateTap();

  frame.topmost()
    .navigate('./pages/near-me/near-me-page');
}

function logoutBtnTap(args) {
  let button = args.object;
  button.animateTap();

  viewModel.logout();

  frame.topmost()
    .navigate({
      clearHistory: true,
      moduleName: './pages/account/account-page'
    });
}

module.exports = {
  pageLoaded,
  nearMeBtnTap,
  logoutBtnTap
};
