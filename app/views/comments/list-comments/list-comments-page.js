'use strict';
let listCommentsViewModel = require('./list-comments-view-model');
let basePage = require('../../common/base-page').defaultInstance;
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

function addCommentBtnTap(args) {
  let page = args.object.page;

  page.showModal('./modals/comment-tourist-site/comment-tourist-site-modal', viewModel.touristSite, function(err, commentedTouristSite) {
    if (err) {
      dialogs.alert({
        title: 'Error',
        message: 'Cannot comment this tourist site.',
        okButtonText: 'OK'
      });
      return;
    }

    if (commentedTouristSite) {
      dialogs.alert({
        title: 'Success',
        message: 'Tourist site commented successfully.',
        okButtonText: 'OK'
      })
        .then(function() {
          viewModel = new listCommentsViewModel.ListCommentsViewModel(commentedTouristSite);
          page.bindingContext = viewModel;
          loadComments();
        });
    }
  }, false);
}

function pageNavigatingTo(args) {
  let touristSite = args.context;
  viewModel = new listCommentsViewModel.ListCommentsViewModel(touristSite);
}

module.exports = {
  pageLoaded,
  pageNavigatingTo,
  loadComments,
  addCommentBtnTap,
  backBtnTap: basePage.backBtnTap
};
