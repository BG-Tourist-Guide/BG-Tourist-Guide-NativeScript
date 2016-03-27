'use strict';

let addTouristSiteViewModel = require('./add-tourist-site-view-model');
let basePage = require('../../common/base-page').defaultInstance;
let frame = require('ui/frame');
let dialogs = require('ui/dialogs');
let viewModel = new addTouristSiteViewModel.AddTouristSiteViewModel();

function pageLoaded(args) {
  let page = args.object;

  viewModel = new addTouristSiteViewModel.AddTouristSiteViewModel();

  page.bindingContext = viewModel;
}

function addBtnTap(args) {
  let button = args.object;
  button.animateTap()
    .then(function() {
      if (!viewModel.title ||
      !viewModel.description ||
      (!viewModel.useMyCurrentLocation && (!viewModel.latitude || !viewModel.longitude))) {
        dialogs.alert({
          title: 'Error',
          message: 'The title and descriptions fields are required. If you do not want to use your current location fill the latitude and longitude fields.',
          okButtonText: 'OK'
        });
        return;
      }
      
      basePage.loader.show();
      
      viewModel.addTouristSite()
        .then(function(createdTouristSite) {
          basePage.loader.hide();
          dialogs.alert({
            title: 'Success',
            message: `Tourist site ${viewModel.title} added successfully. When it is approved it will be added for visiting.`,
            okButtonText: 'OK'
          })
          .then(function(){
            frame.topmost()
              .navigate('./views/main-menu/main-menu-page');
          });
        }, function (err) {
          basePage.loader.hide();
          dialogs.alert({
            title: 'Error',
            message: `Tourist site ${viewModel.title} was not added. Please try again when you have internet connection and try again later.`,
            okButtonText: 'OK'
          });
        });
    });
}

module.exports = {
  pageLoaded,
  addBtnTap,
  backBtnTap: basePage.backBtnTap
};
