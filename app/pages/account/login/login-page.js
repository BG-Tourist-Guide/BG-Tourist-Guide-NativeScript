'use strict';

let loginViewModel = require('./login-view-model');
let customAnimations = require('../../../common/custom-animations');
let dialogs = require('ui/dialogs');
let frame = require('ui/frame');
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
      dialogs.alert({
        title: 'Login successfull.',
        message: 'You can now start using the application.',
        okButtonText: 'OK'
      })
        .then(function () {
          frame.topmost()
            .navigate({
              clearHistory: true,
              moduleName: './pages/main-menu/main-menu-page'
            });
        });
    }, function (err) {
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
