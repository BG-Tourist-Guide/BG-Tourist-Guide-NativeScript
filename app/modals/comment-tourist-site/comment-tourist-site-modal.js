'use strict';

let commentTouristSiteViewModel = require('./comment-tourist-site-view-model');
let frame = require('ui/frame');
let Stretch = require('ui/enums').Stretch;
let customAnimations = require('../../common/custom-animations');
let LoadingIndicator = require('nativescript-loading-indicator').LoadingIndicator;
let loader = new LoadingIndicator();
let viewModel = commentTouristSiteViewModel.defaultInstance;

function pageShownModally(args) {
  let touristSite = args.context;
  viewModel = new commentTouristSiteViewModel.CommentTouristSiteViewModel(touristSite);

  let page = args.object;

  page.bindingContext = viewModel;
}

function commentBtnTap(args) {
  let page = args.object.page;
  let button = args.object;
  button.animateTap();
  loader.show({
    message:'Sending comment.'
  });

  viewModel.commentTouristSite()
    .then(function(data) {
      loader.hide();
      page.closeModal(null, data);
    }, function(err) {
      loader.hide();
      console.dir(err);
      page.closeModal(err, null);
    });
}

function cancelBtnTap(args) {
  let page = args.object.page;
  page.closeModal(null, null);
}

module.exports = {
  pageShownModally,
  commentBtnTap,
  cancelBtnTap
};
