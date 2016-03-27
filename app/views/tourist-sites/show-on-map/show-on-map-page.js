'use strict';
let showOnMapViewModel = require('./show-on-map-view-model');
let basePage = require('../../common/base-page').defaultInstance;
let frame = require('ui/frame');
let dialogs = require('ui/dialogs');
let isBackNavigation = false;
let viewModel = showOnMapViewModel.defaultInstance;

function pageLoaded(args) {
  let page = args.object;
}

function onMapReady(args) {
  viewModel.onMapReady(args);
}

function onMarkerSelect(args) {
  console.log("Clicked on " + args.marker.title);
}

function onCameraChanged(args) {
  console.log("Camera changed: " + JSON.stringify(args.camera));
}

function pageNavigatingTo(args) {
  let touristSite = args.context;

  viewModel = new showOnMapViewModel.ShowOnMapViewModel(touristSite);
}

module.exports = {
  pageLoaded,
  pageNavigatingTo,
  onMapReady,
  onCameraChanged,
  onMarkerSelect,
  backBtnTap: basePage.backBtnTap
};
