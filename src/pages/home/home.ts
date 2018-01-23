import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Content, Slides, ToastController, MenuController } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { ServicesPage } from '../services/services'
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
  role;
  backButtonPressed;
  backButtonPressedTimer;
 // public location: any;

 map: GoogleMap;
  constructor(private toastCtrl: ToastController, public navCtrl: NavController, public platform: Platform, public navParams: NavParams, private airconeProvider: AirconeProvider, public menu: MenuController) {
    if (localStorage.getItem("userData")) {
      var userDetails  = JSON.parse(localStorage.getItem("userData"));
      // this.role = userDetails.role[0];
      // console.log(this.role)
      if (userDetails.role[0] == 'USER') {
        this.role = true;
        
      }
    }
    platform.registerBackButtonAction(() => {
      if (this.backButtonPressed) {
        this.platform.exitApp();
      } else {
        this.presentToast();
        this.backButtonPressed = true;
        if (this.backButtonPressedTimer) {
          clearTimeout(this.backButtonPressedTimer);
        }
        this.backButtonPressedTimer = setTimeout(() => {
          this.backButtonPressed = false
        }, 4000);
      }
    });
    this.airconeProvider.paramData = "hi all";

    this.menu.enable(true, 'user');
    this.menu.enable(false, 'mech');

  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Double Click To Exit',
      duration: 3000,
      position: 'bottom'
    });
  
    // toast.onDidDismiss(() => {
    //   console.log('Dismissed toast');
    // });
  
    toast.present();
  }

// ngAfterViewInit() {
//   this.platform.ready().then(() => {
//     this.loadMap();
//   });  
// }

  ionViewDidLoad() {
  }

//   ionViewWillEnter() {
//   this.platform.ready().then(() => {
//     this.loadMap();
//   });  

// }


ionViewDidEnter() {
  this.platform.ready().then(() => {
    this.loadMap();
    // this.map.setVisible(true)
  });


}

// ionViewDidLeave() {
//   if(this.map!=null){
//     this.map.clear();
//     this.map.setVisible(false);
//     this.map.setDiv(null);

// }
//   // this.map = null;
// }


loadMap() {
  console.log("map function loded")
  this.airconeProvider.getUserComments()
  .then(res => {
    this.comments = res;
    var locations = [];
    this.comments.forEach(element => {
      if (element.coords) {
        locations.push(element.coords)        
      }
    });
    console.log("locations taking")
  // var locations = [
  //   [-33.890542, 151.274856],
  //   [-33.923036, 151.259052],
  //   [-34.028249, 151.157507],
  //   [-33.80010128657071, 151.28747820854187],
  //   [-33.950198, 151.259302]
  // ];
      let mapOptions: GoogleMapOptions = {
        camera: {          
        // target: {
        //   lat: 33.80010128657071,
        //   lng: -151.28747820854187
        // },
          zoom: 18,
          tilt: 30,
        }
      };
  
      this.map = GoogleMaps.create('map', mapOptions);
      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {
          console.log("entered into maps")
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
                  console.log("ok")
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
    this.navCtrl.push(ServicesPage)
  }

//  getcommentsList() {
//   this.airconeProvider.getUserComments()
//   .then(res => {
//     this.comments = res;
//     });
//   }

}
