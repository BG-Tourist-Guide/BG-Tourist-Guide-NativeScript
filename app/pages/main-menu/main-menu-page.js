'use strict';

let viewModel = require("./main-menu-view-model");

function pageLoaded(args) {
  var page = args.object;
  page.bindingContext = viewModel.defaultInstance;
}

module.exports = {
  pageLoaded
};
