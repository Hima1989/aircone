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
 // public location: any;

 map: GoogleMap;
  constructor(private statusBar:StatusBar, private toast: Toast, private loading: LoadingController, public navCtrl: NavController, public platform: Platform, public navParams: NavParams, private airconeProvider: AirconeProvider, public menu: MenuController) {
    platform.registerBackButtonAction(() => {
      if (this.backButtonPressed) {
        this.platform.exitApp();
      } else {
        this.toast.show(`Press again to exit airTech`, '4000', 'bottom').subscribe(
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
  // this.load.present();
    this.menu.enable(true, 'user');
    this.menu.enable(false, 'mech');
  }

  ionViewDidLoad() {
    this.statusBar.backgroundColorByHexString('#A9A9A9');
  }


  // presentToast() {
  //   let toast = this.toastCtrl.create({
  //     message: 'Double Click To Exit',
  //     duration: 3000,
  //     position: 'bottom'
  //   });
  //   toast.present();
  // }

// ngAfterViewInit() {
//   this.platform.ready().then(() => {
//     this.loadMap();
//   });  
// }

  // ionViewDidLoad() {
  // }

//   ionViewWillEnter() {
//   this.platform.ready().then(() => {
//     this.loadMap();
//   });  

// }


ionViewWillEnter() {
  this.platform.ready().then(() => {
    this.loadMap();
  });
  this.load = this.loading.create({
    content: 'Please Wait...'
});
this.load.present()
}

// loadMap() {
//   var locations = [
// {latitude: -33.890542, longitude: 151.274856},
// {latitude: -33.923036, longitude: 151.259052},
// {latitude: -34.028249, longitude: 151.157507},
// {latitude: -33.80010128657071, longitude: 151.28747820854187},
// {latitude: -33.950198, longitude: 151.259302}
// ];
// let self = this;

// let mapOptions: GoogleMapOptions = {
//     camera: {
//         target: {
//             lat: -33.890542,
//             lng: 151.274856
//         },
//         zoom: 15,
//         tilt: 30
//     }
// };

// this.map = GoogleMaps.create('map', mapOptions);

// // let restaurants = this.restaurants;
// this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
//     self.load.dismiss();
//     // this.load.dismiss()
// // console.log("entered")
//     for (let location of locations) {
//         let restaurant_position: LatLng = new LatLng(location.latitude, location.longitude);

//         this.map.addMarker({position: restaurant_position })
//         .then((marker) => {
//       });
//     }

// });
// }

loadMap() {
  // let self = this
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
          lat: 33.80010128657071,
          lng: -151.28747820854187
        },
          zoom: 0,
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
      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {
            // for (var i = 0; i < locations.length; i++) {
            //   this.map.addMarker({
            //       title: locations[i].latitude,
            //       icon: 'blue',
            //       animation: 'DROP',
            //       position: {
            //         lat: locations[i].latitude,
            //         lng: locations[i].longitude
            //       }
            //     })
            //     .then(marker => {
            //       marker.on(GoogleMapsEvent.MARKER_CLICK)
            //         .subscribe(() => {
            //           alert('exixtent user');
            //         });
            //     });
            //   }
            for (let location of locations) {
              let restaurant_position: LatLng = new LatLng(location.latitude, location.longitude);
      
              this.map.addMarker({position: restaurant_position })
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
