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
 // public location: any;

 map: GoogleMap;
  constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams, private airconeProvider: AirconeProvider) {
  }


ngAfterViewInit() {
  this.platform.ready().then(() => {
    this.loadMap();
  });  
}


loadMap() {

  this.airconeProvider.getUserComments()
  .then(res => {
    this.comments = res;
    var locations = [];
    this.comments.forEach(element => {
      locations.push(element.coords)
    });
    
  // var locations = [
  //   [-33.890542, 151.274856],
  //   [-33.923036, 151.259052],
  //   [-34.028249, 151.157507],
  //   [-33.80010128657071, 151.28747820854187],
  //   [-33.950198, 151.259302]
  // ];
      let mapOptions: GoogleMapOptions = {
        camera: {
          zoom: 15,
          tilt: 30
        }
      };
  
      this.map = GoogleMaps.create('map', mapOptions);
  
      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {
          console.log(locations)
            for (var i = 0; i < locations.length; i++) {
              this.map.addMarker({
                  title: locations[i].latitude,
                  icon: 'blue',
                  animation: 'DROP',
                  position: {
                    lat: locations[i].latitude,
                    lng: locations[i].longitude
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
      });
    }



  sendRequest() {
    this.navCtrl.push(LoginpagePage)
  }

//  getcommentsList() {
//   this.airconeProvider.getUserComments()
//   .then(res => {
//     this.comments = res;
//     });
//   }

}
