'use strict';
let listCommentsViewModel = require('./list-comments-view-model');
let frame = require('ui/frame');
let dialogs = require('ui/dialogs');
let viewModel = listCommentsViewModel.defaultInstance;

function pageLoaded(args) {
  let page = args.object;
  if (!viewModel) {
    viewModel = new listCommentsViewModel.ListCommentsViewModel();
  }

  loadComments();

  page.bindingContext = viewModel;
}

function loadComments() {
  viewModel.loadComments()
    .then(function(data) {
    }, function(err) {
      dialogs.alert({
        title: 'Error',
        message: 'Cannot load comments.',
        okButtonText: 'OK'
      });
    });
}

function pageNavigatingTo(args) {
  let touristSite = args.context;
  viewModel = new listCommentsViewModel.ListCommentsViewModel(touristSite);
}

module.exports = {
  pageLoaded,
  pageNavigatingTo,
  loadComments
};
