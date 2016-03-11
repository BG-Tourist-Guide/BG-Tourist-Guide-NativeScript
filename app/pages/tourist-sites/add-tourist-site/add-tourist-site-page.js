'use strict';

let addTouristSiteViewModel = require('./add-tourist-site-view-model');
let frame = require('ui/frame');
let dialogs = require('ui/dialogs');
let viewModel;

function pageLoaded(args) {
  let page = args.object;

  viewModel = new addTouristSiteViewModel.AddTouristSiteViewModel();

  page.bindingContext = viewModel;
}

module.exports = {
  pageLoaded
};
