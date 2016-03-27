'use strict';

let Observable = require('data/observable').Observable;
let mapsModule = require('nativescript-google-maps-sdk');
let application = require('application');

class ShowOnMapViewModel extends Observable {
  constructor(touristSite) {
    super();
    this.touristSite = touristSite;
    this.title = touristSite ? touristSite.title : '';
    this.latitude = touristSite ? touristSite.latitude : 0;
    this.longitude = touristSite ? touristSite.longitude : 0;
  }

  onMapReady(args) {
    let mapView = args.object;
    
    let marker = new mapsModule.Marker();
    marker.position = mapsModule.Position.positionFromLatLng(this.touristSite.latitude, this.touristSite.longitude);
    marker.title = "title";
    marker.snippet = "snippet";
    marker.userData = { index: 1 };
    mapView.addMarker(marker);
  }
}

module.exports = {
  ShowOnMapViewModel: ShowOnMapViewModel,
  defaultInstance: new ShowOnMapViewModel()
};