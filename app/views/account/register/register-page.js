'use strict';

let loginViewModel = require('./register-view-model');
let customAnimations = require('../../../common/custom-animations');
let dialogs = require('ui/dialogs');
let frame = require('ui/frame');
let loader = require('nativescript-loading-indicator');
let viewModel;

function pageLoaded(args) {
  let page = args.object;
  viewModel = new loginViewModel.RegisterViewModel();

  page.bindingContext = viewModel;
}

function registerBtnTap(args) {
  let button = args.object;
  button.animateTap();
  loader.show();

  viewModel.register()
    .then(function () {
      loader.hide();
      dialogs.alert({
        title: 'Registration successfull.',
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
        title: 'Registration failed.',
        message: err.message,
        okButtonText: 'OK'
      });
    });
}

module.exports = {
  pageLoaded,
  registerBtnTap
};
