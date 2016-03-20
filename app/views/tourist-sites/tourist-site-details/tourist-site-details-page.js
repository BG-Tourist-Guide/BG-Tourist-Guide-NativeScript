'use strict';

let touristSiteDetailsViewModel = require('./tourist-site-details-view-model');
let frame = require('ui/frame');
let dialogs = require('ui/dialogs');
let loader = require('nativescript-loading-indicator');
let viewModel = touristSiteDetailsViewModel.defaultInstance;

function pageLoaded(args) {
  let page = args.object;

  page.bindingContext = viewModel;
}

function navigatingTo(args) {
  let touristSite = args.context;

  viewModel = new touristSiteDetailsViewModel.TouristSiteDetailsViewModel(touristSite);
}

function rateBtnTap(args) {
  let page = args.object.page;

  page.showModal('./modals/rate-tourist-site/rate-tourist-site-modal', viewModel.touristSite, function(err, ratedTouristSite) {
    if (err) {
      dialogs.alert({
        title: 'Error',
        message: 'Cannot rate this tourist site.',
        okButtonText: 'OK'
      });
      return;
    }

    if (ratedTouristSite) {
      dialogs.alert({
        title: 'Success',
        message: 'Tourist site rated successfully.',
        okButtonText: 'OK'
      })
        .then(function() {
          viewModel = new touristSiteDetailsViewModel.TouristSiteDetailsViewModel(ratedTouristSite);
          page.bindingContext = viewModel;
        });
    }
  }, false);
}

function showOnMapBtnTap(args) {
  let button = args.object;
  button.animateTap()
    .then(function() {
      frame.topmost()
        .navigate({
          moduleName: './views/tourist-sites/show-on-map/show-on-map-page',
          context: viewModel.touristSite
        });
    });
}

function visitBtnTap(args) {
  let button = args.object;
  let page = button.page;

  button.animateTap()
    .then(function() {
      loader.show();
      return viewModel.visitTouristSite();
    })
    .then(function(responsetouristSite) {
      loader.hide();
      viewModel = new touristSiteDetailsViewModel.TouristSiteDetailsViewModel(responsetouristSite);
      page.bindingContext = viewModel;
      dialogs.alert({
        title: 'Success',
        message: 'Tourist site visited successfully.',
        okButtonText: 'OK'
      });
    }, function(err) {
      loader.hide();
      dialogs.alert({
        title: 'Error',
        message: 'You cannot visit this tourist site right now. Please try again later.',
        okButtonText: 'OK'
      });
    });
}

function commentsBtnTap(args) {
  let button = args.object;
  button.animateTap()
    .then(function() {
      frame.topmost()
        .navigate({
          moduleName: './views/comments/list-comments/list-comments-page',
          context: viewModel.touristSite
        });
    });
}

module.exports = {
  pageLoaded,
  navigatingTo,
  rateBtnTap,
  showOnMapBtnTap,
  visitBtnTap,
  commentsBtnTap
};
