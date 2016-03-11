'use strict';

let addTouristSiteViewModel = require('./add-tourist-site-view-model');
let frame = require('ui/frame');
let dialogs = require('ui/dialogs');
let customAnimations = require('../../../common/custom-animations');
let viewModel = new addTouristSiteViewModel.AddTouristSiteViewModel();
let loader = require('nativescript-loading-indicator');

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
      
      loader.show();
      
      viewModel.addTouristSite()
        .then(function(createdTouristSite) {
          loader.hide();
          dialogs.alert({
            title: 'Success',
            message: `Tourist site ${viewModel.title} added successfully. When it is approved it will be added for visiting.`,
            okButtonText: 'OK'
          })
          .then(function(){
            frame.topmost()
              .navigate('./pages/main-menu/main-menu-page');
          });
        }, function (err) {
          loader.hide();
          console.log('-------Error');
          console.log(err);
          console.dir(err);
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
  addBtnTap
};
