import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  Marker,
  LatLng,
  MarkerOptions
 } from '@ionic-native/google-maps';

import { Component, ElementRef, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})

export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    //this.loadMap();
    this.loadmap2();
  }

  loadmap2() {
    let element: HTMLElement = document.getElementById("map");

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 45.467100,
          lng: -73.625021
        },
        zoom: 0
        //,tilt: 30
      }
    };

    this.map = this.googleMaps.create(element, mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
          // Move to the position with animation
          this.map.animateCamera({
            target: {
              lat: 45.467100,
              lng: -73.625021
            },
            zoom: 17,
            //tilt: 60,
            //bearing: 140,
            duration: 2000
          }, function() {

            // Add a maker
            this.addMarker({
              position: {
                lat: 45.467100,
                lng: -73.625021
              },
              title: "몬트리올 서광교회\n4020 rue Grand Boulevard,\nMontreal QC H4B 2X5",
              //snippet: "This plugin is awesome!",
              animation: 'BOUNCE'
            }, function(marker) {
              // Show the info window
              marker.showInfoWindow();
              // Catch the click event
              marker.on(GoogleMapsEvent.MARKER_CLICK, function() {
                // To do something...
                // alert("Hello world!");
              });
            });
          });
        });
  }

  loadMap() {
    let element: HTMLElement = document.getElementById("map");

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 45.467100,
          lng: -73.625021
        },
        zoom: 18
        //,tilt: 30
      }
    };

    this.map = this.googleMaps.create(element, mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        //alert('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
            title: '몬트리올 서광교회',
            icon: 'red',
            animation: 'BOUNCE',
            position: {
              lat: 45.467100,
              lng: -73.625021
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                //alert('clicked');
              });
          });

      });
  }
}

// ios : AIzaSyCEqprxPvgDL0wPxkQJGT4oJGd48Bd5fdM
// android : AIzaSyAOWGonAeuvMn9Rl-QTUQ3puIq-FEj1xiA

//ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID=AIzaSyAOWGonAeuvMn9Rl-QTUQ3puIq-FEj1xiA --variable API_KEY_FOR_IOS=AIzaSyCEqprxPvgDL0wPxkQJGT4oJGd48Bd5fdM