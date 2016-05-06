'use strict';

let Observable = require('data/observable').Observable;
let barcodeScanner = require('nativescript-barcodescanner');
let users = require('../../helpers/users-helper').defaultInstance;
let TouristSitesService = require('../../web/services/tourist-sites-service').TouristSitesService;
let touristSitesService = new TouristSitesService();

class MainMenuViewModel extends Observable {
  constructor() {
    super();
    this.title = 'BG Tourist Guide';
    this.currentUser = users.getCurrentUserFromLocalStorage();
  }

  logout() {
    users.setCurrentUserInLocalStorage(null);
  }

  scanQrCode() {
    let promise = new Promise(function(resolve, reject) {
      barcodeScanner.available()
        .then(function(available) {
          if (available) {
            barcodeScanner.hasCameraPermission()
              .then(function(granted) {
                if (granted) {
                  barcodeScanner.scan({
                    cancelLabel: "Stop scanning", // iOS only, default 'Close'.
                    showFlipCameraButton: true,   // Android only, default false (on iOS it's always available). 
                  })
                    .then(function(result) {
                      if (!result.text) {
                        reject({
                          message: "Invalid barcode"
                        });
                        return;
                      }

                      touristSitesService.visitTouristSite({
                        _id: result.text
                      })
                        .then(resolve, reject);
                    }, reject);
                } else {
                  barcodeScanner.requestCameraPermission()
                    .then(function() {
                      console.log("Camera permission requested");
                    });
                }
              });


          } else {
            reject({
              message: 'Scanning barcodes is not available on your phone.'
            });
          }
        });
    });

    return promise;
  }
}

module.exports = {
  MainMenuViewModel: MainMenuViewModel,
  defaultInstance: new MainMenuViewModel()
};