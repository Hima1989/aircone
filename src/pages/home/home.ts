import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Content, Slides, LoadingController, MenuController } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { Toast } from '@ionic-native/toast';
import { ServicesPage } from '../services/services'
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  LatLng
 } from '@ionic-native/google-maps';
 import { StatusBar } from '@ionic-native/status-bar';
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
  role;
  backButtonPressed: boolean
  backButtonPressedTimer;
  load;
  accountType;
  // llatitude = 17.6881;
  // llongitude = 83.2131;
 // public location: any;

 map: GoogleMap;
  constructor(private statusBar:StatusBar, private toast: Toast, private loading: LoadingController, public navCtrl: NavController, public platform: Platform, public navParams: NavParams, private airconeProvider: AirconeProvider, public menu: MenuController) {
    platform.registerBackButtonAction(() => {
      if (this.backButtonPressed) {
        this.platform.exitApp();
      } else {
        this.toast.show(`Press again to exit aer Tech`, '4000', 'bottom').subscribe(
          toast => {
          }
        );
        this.backButtonPressed = true;
        if (this.backButtonPressedTimer) {
          clearTimeout(this.backButtonPressedTimer);
        }
        this.backButtonPressedTimer = setTimeout(() => {
          this.backButtonPressed = false
        }, 4000);
      }
      this.menu.close()    
    });
    var userdata = JSON.parse(localStorage.getItem("userData"))
    if(userdata) {
      this.accountType = userdata.accountType
      if(this.accountType == 'social') {
        this.menu.enable(false, 'registerUser');
        this.menu.enable(true, 'user');
      } else if (this.accountType == 'web') {
        this.menu.enable(true, 'registerUser');
        this.menu.enable(false, 'user');
      }
    }
  }

  ionViewDidLoad() {
    this.statusBar.backgroundColorByHexString('#dedede');
  }


ionViewWillEnter() {
  this.platform.ready().then(() => {
    this.loadMap();
  });
  this.load = this.loading.create({
    content: 'Please Wait...'
});
this.load.present()
}


loadMap() {
  this.airconeProvider.getUserComments()
  .then(res => {
    this.comments = res;
    var locations = [];
    this.comments.forEach(element => {
      if (element.coords) {
        locations.push(element.coords)        
      }
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
        target: {
          lat: 17.7262,
          lng: 83.3155
        },
          zoom: 12,
          tilt: 30,
        },
        gestures:{
          rotate:false,
          tilt:false,
          scroll:false,
          zoom: false
        }
      
      };
  
      this.map = GoogleMaps.create('map', mapOptions);
      this.map.setCompassEnabled(false)
      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {
            for (let location of locations) {
              let restaurant_position: LatLng = new LatLng(location.latitude, location.longitude);
      
              this.map.addMarker({position: restaurant_position})
              .then((marker) => { 
            });
          }
        });
        this.load.dismiss();                            
      });
    }



  sendRequest() {
    this.navCtrl.push(ServicesPage)
  }

 getcommentsList() {
  this.airconeProvider.getUserComments()
  .then(res => {
    this.comments = res;
    });
  }

}
