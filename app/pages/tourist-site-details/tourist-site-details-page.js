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

function rateBtnTap(args) {
  let page = args.object.page;

  page.showModal('./modals/rate-tourist-site/rate-tourist-site-modal', viewModel.touristSite, function(args) {
    console.log('-------Close callback args');
    console.dir(args);
  }, false);
}

module.exports = {
  pageLoaded,
  navigatingTo,
  rateBtnTap
};
