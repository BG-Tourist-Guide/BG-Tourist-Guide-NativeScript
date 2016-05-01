'use strict';

let mainMenuViewModel = require('./main-menu-view-model');
let customAnimations = require('../../common/custom-animations');
let constants = require('../../common/constants');
let frame = require('ui/frame');
let animation = require('ui/animation');
let enums = require('ui/enums');
let application = require('application');
let platform = require('platform');
let isMainMenuSlided = false;
let menuOffset = 0;
let animationDuration = 350;
let slMainMenu;
let slSideMenu;
let viewModel;

function pageLoaded(args) {
  let page = args.object;
  viewModel = new mainMenuViewModel.MainMenuViewModel();

  if (!viewModel.currentUser) {
    frame.topmost()
      .navigate({
        backstackVisible: false,
        moduleName: './views/account/account-page'
      });

    return;
  }

  page.bindingContext = viewModel;

  slMainMenu = page.getViewById('slMainMenu');
  slSideMenu = page.getViewById('slSideMenu');

  menuOffset = calculateMenuOffset();

  orderMenus();
}

function allBtnTap(args) {
  let button = args.object;
  button.animateTap()
    .then(function() {
      frame.topmost()
        .navigate({
          moduleName: './views/tourist-sites/list-tourist-sites/list-tourist-sites-page',
          context: {
            type: constants.ALL_TOURIST_SITES_TYPE
          }
        });
    });
}

function officialBtnTap(args) {
  let button = args.object;
  button.animateTap()
    .then(function() {
      frame.topmost()
        .navigate({
          moduleName: './views/tourist-sites/list-tourist-sites/list-tourist-sites-page',
          context: {
            type: constants.OFFICIAL_TOURIST_SITES_TYPE
          }
        });
    });
}

function unofficialBtnTap(args) {
  let button = args.object;
  button.animateTap()
    .then(function() {
      frame.topmost()
        .navigate({
          moduleName: './views/tourist-sites/list-tourist-sites/list-tourist-sites-page',
          context: {
            type: constants.UNOFFICIAL_TOURIST_SITES_TYPE
          }
        });
    });
}

function nearMeBtnTap(args) {
  let button = args.object;
  button.animateTap()
    .then(function() {
      frame.topmost()
        .navigate('./views/tourist-sites/near-me/near-me-page');
    });
}

function addNewBtnTap(args) {
  let button = args.object;
  button.animateTap()
    .then(function() {
      frame.topmost()
        .navigate('./views/tourist-sites/add-tourist-site/add-tourist-site-page');
    });
}

function logoutBtnTap(args) {
  let button = args.object;
  button.animateTap()
    .then(function() {
      viewModel.logout();

      frame.topmost()
        .navigate({
          backstackVisible: true,
          moduleName: './views/account/account-page'
        });
    });
}

function menuImageTap(args) {
  let image = args.object;
  image.animateTap()
    .then(function() {
      toggleSideMenu();
    });
}

function slMainMenuTap(args) {
  if (isMainMenuSlided) {
    toggleSideMenu();
  }
}

function toggleSideMenu() {
  let animations = [createAnimationOptions(slMainMenu, isMainMenuSlided ? 0 : menuOffset),
    createAnimationOptions(slSideMenu, isMainMenuSlided ? -menuOffset : 0)];

  let slideMenusAnimation = new animation.Animation(animations);

  slideMenusAnimation.play()
    .then(function() {
      isMainMenuSlided = !isMainMenuSlided;
    });
}

function createAnimationOptions(target, xOffset) {
  return {
    target: target,
    translate: {
      y: 0,
      x: xOffset
    },
    duration: animationDuration,
    curve: enums.AnimationCurve.easeInOut
  };
}

if (application.android) {
  let superOnBackPressed = application.android.currentContext.onBackPressed;

  application.android.currentContext.onBackPressed = function() {
    if (isMainMenuSlided) {
      toggleSideMenu();
      return;
    }

    return superOnBackPressed();
  };
}

application.on(application.orientationChangedEvent, function(args) {
  slMainMenu.x = 0;
  slSideMenu.x = 0;
  menuOffset = calculateMenuOffset();

  orderMenus();
});

function calculateMenuOffset() {
  let sideMenuWidthInPercents = parseFloat(slSideMenu.width) / 100;
  return platform.screen.mainScreen.widthDIPs * sideMenuWidthInPercents;
}

function orderMenus() {
  slSideMenu.animate({
    translate: {
      y: 0,
      x: -menuOffset
    },
    duration: 1
  });

  slMainMenu.animate({
    translate: {
      y: 0,
      x: 0
    },
    duration: 1
  });
}

module.exports = {
  pageLoaded,
  menuImageTap,
  nearMeBtnTap,
  allBtnTap,
  officialBtnTap,
  unofficialBtnTap,
  addNewBtnTap,
  logoutBtnTap,
  slMainMenuTap
};
