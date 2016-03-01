'use strict';

let mainMenuViewModel = require('./main-menu-view-model');
let frame = require('ui/frame');
let viewModel;

function pageLoaded(args) {
  let page = args.object;
  viewModel = mainMenuViewModel.defaultInstance;  
  let viewModelInstance = viewModel;
  
  if (!viewModelInstance.currentUser) {
    frame.topmost()
      .navigate('./pages/account/account-page');
    
    return;
  }
  
  page.bindingContext = viewModelInstance;
}

module.exports = {
  pageLoaded
};
