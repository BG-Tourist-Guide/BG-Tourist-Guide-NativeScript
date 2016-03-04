'use strict';

let accountViewModel = require('./account-view-model');
let frame = require('ui/frame');
let customAnimations = require('../../common/custom-animations');
let viewModel;

function pageLoaded(args) {
  let page = args.object;
  viewModel = accountViewModel.defaultInstance;
  page.bindingContext = viewModel;
}

function loginBtnTap(args) {
  let button = args.object;
  button.animateTap();

  frame.topmost()
    .navigate({
      backstackVisible: false,
      moduleName: './pages/account/login/login-page'
    });
}

module.exports = {
  pageLoaded,
  loginBtnTap
};
