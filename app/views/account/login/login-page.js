'use strict';

let loginViewModel = require('./login-view-model');
let customAnimations = require('../../../common/custom-animations');
let dialogs = require('ui/dialogs');
let frame = require('ui/frame');
let loader = require('nativescript-loading-indicator');
let viewModel;

function pageLoaded(args) {
  let page = args.object;
  viewModel = new loginViewModel.LoginViewModel();

  page.bindingContext = viewModel;
}

function loginBtnTap(args) {
  let button = args.object;
  button.animateTap();
  loader.show();

  viewModel.login()
    .then(function () {
      loader.hide();
      dialogs.alert({
        title: 'Login successfull.',
        message: 'You can now start using the application.',
        okButtonText: 'OK'
      })
        .then(function () {
          frame.topmost()
            .navigate({
              moduleName: './views/main-menu/main-menu-page'
            });
        });
    }, function (err) {
      loader.hide();
      dialogs.alert({
        title: 'Login failed.',
        message: err.message,
        okButtonText: 'OK'
      });
    });
}

module.exports = {
  pageLoaded,
  loginBtnTap
};
