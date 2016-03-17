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
      moduleName: './views/account/login/login-page'
    });
}

function registerBtnTap(args) {
  let button = args.object;
  button.animateTap();

  frame.topmost()
    .navigate({
      backstackVisible: false,
      moduleName: './views/account/register/register-page'
    });
}

module.exports = {
  pageLoaded,
  loginBtnTap,
  registerBtnTap
};
