'use strict';

let loginViewModel = require('./login-view-model');
let dialogs = require('ui/dialogs');
let frame = require('ui/frame');
let basePage = require('../../common/base-page').defaultInstance;
let viewModel;

function pageLoaded(args) {
  let page = args.object;
  viewModel = new loginViewModel.LoginViewModel();

  page.bindingContext = viewModel;
}

function loginBtnTap(args) {
  let button = args.object;
  button.animateTap();
  basePage.loader.show();

  viewModel.login()
    .then(function () {
      basePage.loader.hide();
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
      basePage.loader.hide();
      dialogs.alert({
        title: 'Login failed.',
        message: err.message,
        okButtonText: 'OK'
      });
    });
}

module.exports = {
  pageLoaded,
  loginBtnTap,
  backBtnTap: basePage.backBtnTap
};
