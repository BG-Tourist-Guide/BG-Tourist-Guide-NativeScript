'use strict';

let Observable = require('data/observable').Observable;
let mapsModule = require('nativescript-google-maps-sdk');

class ShowOnMapViewModel extends Observable {
  constructor(touristSite) {
    super();
    console.log('-------VM Ctor');
    this.touristSite = touristSite;
  }

  onMapReady(args) {
    let mapView = args.object;

    console.log("-------Setting a marker...");
    let marker = new mapsModule.Marker();
    marker.position = mapsModule.Position.positionFromLatLng(-33.86, 151.20);
    marker.title = "Sydney";
    marker.snippet = "Australia";
    marker.userData = { index: 1 };
    mapView.addMarker(marker);
  }
}

module.exports = {
  ShowOnMapViewModel: ShowOnMapViewModel,
  defaultInstance: new ShowOnMapViewModel()
};