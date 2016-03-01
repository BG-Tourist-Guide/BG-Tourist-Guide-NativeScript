'use strict';

let mainMenuViewModel = require('./main-menu-view-model');
let customAnimations =  require('../../common/custom-animations');
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

function logoutBtnTap(args) {
  let button = args.object;
  button.animateTap();
  
  viewModel.logout();
  
  frame.topmost()
    .navigate({
      clearHistory: true,
      moduleName: './pages/account/account-page'
    });
}

module.exports = {
  pageLoaded,
  logoutBtnTap
};
