'use strict';

let Observable = require('data/observable').Observable;
let mapsModule = require('nativescript-google-maps-sdk');
let application = require('application');

class ShowOnMapViewModel extends Observable {
  constructor(touristSite) {
    super();
    this.touristSite = touristSite;
    this.latitude = touristSite ? touristSite.latitude : 0;
    this.longitude = touristSite ? touristSite.longitude : 0;
  }

  onMapReady(args) {
    let mapView = args.object;
    
    let marker = new mapsModule.Marker();
    marker.position = mapsModule.Position.positionFromLatLng(this.latitude, this.longitude);
    marker.userData = { index: 1 };
    mapView.addMarker(marker);
  }
}

module.exports = {
  ShowOnMapViewModel: ShowOnMapViewModel,
  defaultInstance: new ShowOnMapViewModel()
};