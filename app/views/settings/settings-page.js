'use strict';

let settingsViewModel = require('./settings-view-model');
let basePage = require('../common/base-page').defaultInstance;
let viewModel = new settingsViewModel.SettingsViewModel();
let dialogs = require('ui/dialogs');

function pageLoaded(args) {
  let page = args.object;

  viewModel = new settingsViewModel.SettingsViewModel();

  page.bindingContext = viewModel;
}

function saveBtnTap(args) {
  let button = args.object;
  button.animateTap()
    .then(function() {
      viewModel.saveSettings();
      dialogs.alert({
        title: 'Success.',
        message: 'Settings saved.',
        okButtonText: 'OK'
      });
    });
}

function clearCacheBtnTap(args) {
  let button = args.object;
  button.animateTap()
    .then(function() {
      viewModel.clearCache();
      dialogs.alert({
        title: 'Success.',
        message: 'Cache cleared.',
        okButtonText: 'OK'
      });
    });
}

module.exports = {
  pageLoaded,
  saveBtnTap,
  clearCacheBtnTap,
  backBtnTap: basePage.backBtnTap
};
