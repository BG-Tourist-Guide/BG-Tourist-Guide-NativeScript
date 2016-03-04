'use strict';

let nearMeViewModel = require('./near-me-view-model');
let customAnimations = require('../../common/custom-animations');
let frame = require('ui/frame');
let viewModel;

function pageLoaded(args) {
  let page = args.object;
  viewModel = nearMeViewModel.defaultInstance;

  page.bindingContext = viewModel;

  viewModel.findTouristSitesNearMe()
    .then(function (data) {
      console.dir(data);
    }, function (err) {
      console.dir(err);
    });
}

module.exports = {
  pageLoaded
};
