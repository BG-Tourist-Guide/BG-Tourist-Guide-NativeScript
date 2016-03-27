'use strict';

let rateTouristSiteViewModel = require('./rate-tourist-site-view-model');
let frame = require('ui/frame');
let Stretch = require('ui/enums').Stretch;
let customAnimations = require('../../common/custom-animations');
let loader = require('nativescript-loading-indicator');
let viewModel;

function pageShownModally(args) {
  let touristSite = args.context;
  viewModel = new rateTouristSiteViewModel.RateTouristSiteViewModel(touristSite);

  let page = args.object;

  page.bindingContext = viewModel;
}

function rateBtnTap(args) {
  let page = args.object.page;
  let button = args.object;
  button.animateTap();
  loader.show();

  viewModel.rateTouristSite()
    .then(function(data) {
      loader.hide();
      page.closeModal(null, data);
    }, function(err) {
      loader.hide();
      page.closeModal(err, null);
    });
}

function cancelBtnTap(args) {
  let page = args.object.page;
  page.closeModal(null, null);
}

module.exports = {
  pageShownModally,
  rateBtnTap,
  cancelBtnTap
};
