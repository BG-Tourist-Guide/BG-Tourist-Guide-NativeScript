'use strict';

let loginViewModel = require('./login-view-model');
let customAnimations = require('../../../common/custom-animations');
let viewModel;

function pageLoaded(args) {
  let page = args.object;
  viewModel = loginViewModel.defaultInstance;
  
  page.bindingContext = viewModel;
}

function loginBtnTap(args) {
  let button = args.object;
  button.animateTap();
  
  viewModel.login()
    .then(function () {
      console.log('Logged in!');
    });
}

module.exports = {
  pageLoaded,
  loginBtnTap
};
