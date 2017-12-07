import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Content, Slides } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { LoginpagePage } from '../loginpage/loginpage';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
 } from '@ionic-native/google-maps';
 //import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild(Content) content: Content;
  @ViewChild(Slides) slides: Slides;

  comments
  public comment: any;
  i;
  userlocation;


 map: GoogleMap;
  constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams, private airconeProvider: AirconeProvider) {
    this.getcommentsList();
  }


ngAfterViewInit() {
  this.platform.ready().then(() => {
    this.loadMap();
  });
}


loadMap() {

  var locations = [
    [-33.890542, 151.274856],
    [-33.923036, 151.259052],
    [-34.028249, 151.157507],
    [-33.80010128657071, 151.28747820854187],
    [-33.950198, 151.259302]
  ];

      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: -33.890542,
            lng: 151.274856
          },
          zoom: 15,
          tilt: 30
        }
      };
  
      this.map = GoogleMaps.create('map', mapOptions);
  
      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {

          for (var i = 0; i < locations.length; i++) {
          this.map.addMarker({
              title: 'airCone User',
              icon: 'blue',
              animation: 'DROP',
              position: {
                lat: locations[i][0],
                lng: locations[i][1]
              }
            })
            .then(marker => {
              marker.on(GoogleMapsEvent.MARKER_CLICK)
                .subscribe(() => {
                  alert('exixtent user');
                });
            });
          }
  
        });
    }



  sendRequest() {
    this.navCtrl.push(LoginpagePage)
  }

 getcommentsList() {
   console.log("asdcasd")
  this.airconeProvider.getUserComments()
  .then(res => {

    this.comments = res;

    
  });
 }

}
