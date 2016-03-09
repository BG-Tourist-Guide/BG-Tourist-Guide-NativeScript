'use strict';

let rateTouristSiteViewModel = require('./rate-tourist-site-view-model');
let frame = require('ui/frame');
let Stretch = require('ui/enums').Stretch;
let viewModel;

function pageShownModally(args) {
  let touristSite = args.context;
  viewModel = new rateTouristSiteViewModel.RateTouristSiteViewModel(touristSite);
  
  let page = args.object;
  
  page.bindingContext = viewModel;
}

module.exports = {
  pageShownModally
};
