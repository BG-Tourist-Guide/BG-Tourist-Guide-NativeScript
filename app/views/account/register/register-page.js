'use strict';

let loginViewModel = require('./register-view-model');
let dialogs = require('ui/dialogs');
let frame = require('ui/frame');
let basePage = require('../../common/base-page').defaultInstance;
let viewModel;

function pageLoaded(args) {
  let page = args.object;
  viewModel = new loginViewModel.RegisterViewModel();

  page.bindingContext = viewModel;
}

function registerBtnTap(args) {
  let button = args.object;
  button.animateTap();
  basePage.loader.show({
    message: 'Registering.'
  });

  viewModel.register()
    .then(function () {
      basePage.loader.hide();
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
      basePage.loader.hide();
      dialogs.alert({
        title: 'Registration failed.',
        message: err.message,
        okButtonText: 'OK'
      });
    });
}

module.exports = {
  pageLoaded,
  registerBtnTap,
  backBtnTap: basePage.backBtnTap
};
