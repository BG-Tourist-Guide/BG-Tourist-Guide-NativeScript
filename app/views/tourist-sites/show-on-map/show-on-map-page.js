'use strict';
let showOnMapViewModel = require('./show-on-map-view-model');
let customAnimations = require('../../../common/custom-animations');
let loader = require('nativescript-loading-indicator');
let frame = require('ui/frame');
let dialogs = require('ui/dialogs');
let isBackNavigation = false;
let viewModel = showOnMapViewModel.defaultInstance;

function pageLoaded(args, a) {
  let page = args.object;
  let touristSite = args.context;
  
  viewModel = new showOnMapViewModel.ShowOnMapViewModel(touristSite);
}

function onMapReady(args) {
  viewModel.onMapReady(args);
}

function onMarkerSelect(args) {
   console.log("Clicked on " +args.marker.title);
}
 
function onCameraChanged(args) {
    console.log("Camera changed: " + JSON.stringify(args.camera)); 
}

module.exports = {
  pageLoaded,
  onMapReady,
  onCameraChanged,
  onMarkerSelect
};
