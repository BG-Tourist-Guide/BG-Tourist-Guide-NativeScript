'use strict';

let touristSiteDetailsViewModel = require('./tourist-site-details-view-model');
let frame = require('ui/frame');
let Stretch = require('ui/enums').Stretch;
let viewModel;

function pageLoaded(args) {
  let page = args.object;
  
  page.bindingContext = viewModel;
}

function navigatingTo(args) {
  let touristSite = args.context;

  viewModel = new touristSiteDetailsViewModel.TouristSiteDetailsViewModel(touristSite);
}

module.exports = {
  pageLoaded,
  navigatingTo
};
