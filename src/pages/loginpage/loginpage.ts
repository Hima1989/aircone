import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, ModalController } from 'ionic-angular';
// import { Facebook } from '@ionic-native/facebook';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { HomePage } from '../home/home';
import { GooglePlus } from '@ionic-native/google-plus';
import { ProfilePage } from '../profile/profile';
import { Geolocation } from '@ionic-native/geolocation';
import { MechloginPage } from '../mechlogin/mechlogin';
import { Toast } from '@ionic-native/toast';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
/**
 * Generated class for the LoginpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loginpage',
  templateUrl: 'loginpage.html',
})
export class LoginpagePage {

  homePage = HomePage;
  data;
  coords;
  backButtonPressed: boolean
  backButtonPressedTimer;
  errr;
  userLocation: any = {};
  userLocation1;
  constructor(private nativeGeocoder: NativeGeocoder, private statusBar:StatusBar, public platform: Platform, public navCtrl: NavController, public googlePlus: GooglePlus, public navParams: NavParams, private fb: Facebook, public airconeProvider: AirconeProvider, private geolocation: Geolocation,private toast: Toast, public modalCtrl: ModalController) {
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
    });
    this.statusBar.backgroundColorByHexString('#8526e4');
  }

  ionViewDidLoad() {
    this.statusBar.backgroundColorByHexString('#8526e4');
  }


  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {

    var options = { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true };

    this.geolocation.getCurrentPosition(options).then((resp) => {
      this.coords = {
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude
      }

     }).catch((error) => {
       console.log('Error getting location', error);
     });
     if (this.coords) {
      this.nativeGeocoder.reverseGeocode(this.coords.latitude, this.coords.longitude)
      .then((result: NativeGeocoderReverseResult) => {
        this.coords.userLocation = JSON.stringify(result[0].subLocality);
      })
      .catch((error: any) => console.log(error));
     }


  }

  tempLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {
      this.getUserDetail(res.authResponse.userID)      
    }
  )
    .catch(e => 
      {
        console.log("not get")
      }
    );
  }

  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(res => {
        var userDetails = {"email": res.email, "image": res.picture.data.url, "firstName": res.name, "role": "USER", "coords": this.coords}
        this.airconeProvider.socialLogin(userDetails)
        .then(res => {
          var tempData = [];                
          tempData.push(res);
          this.data = res;
          
          // if (this.data.status === 200 && this.data.user.role[0] == 'USER') {
            this.navCtrl.setRoot(HomePage);                                      
            if (!tempData[0].firstName || tempData[0].email == null || tempData[0].mobileNumber == null || tempData[0].firstName == "" || tempData[0].email == "" || tempData[0].mobileNumber == "") {
              this.navCtrl.push(ProfilePage)
              this.toast.show(`Please Update Profile`, '5000', 'center').subscribe(
                toast => {
                }
              );                 
            } else {
              this.toast.show(`Logged in as `+tempData[0].firstName, '3000', 'top').subscribe(
                toast => {
                }
              );  
              this.navCtrl.setRoot(HomePage);                                                          
            }
            if(!tempData[0].referredBy) {
              tempData[0].referredBy = ''
            }
            var userInfo = {
              "firstName": tempData[0].firstName,
              "email": tempData[0].email,
              "phoneNumber": tempData[0].phoneNumber,
              "id": tempData[0].id,
              "tokenId": tempData[0].tokenId,
              "role": tempData[0].role,
              "accountType": tempData[0].accountType,
              "referralCode": tempData[0].referredBy,
            }
            localStorage.setItem('userData', JSON.stringify(userInfo));
        })
      })
      .catch(e => {
        console.log(e);
      });
  }

  facebookLogin() {
                    // this.toast.show(`Google Login comming soon...`, '3000', 'top').subscribe(
                    //   toast => {
                    //   }
                    // ); 
        //  var userDetails = {"identifier":"gleedtechuser@gmail.com","password":"123123123","email":"gleedtechuser@gmail.com"}

         var userDetails = {"identifier":"doddibalubharadwaj@gmail.com","password":"123123123","email":"doddibalubharadwaj@gmail.com"}

            this.airconeProvider.userLogin(userDetails)
              .then(res => {
                var tempData = [];                
                tempData.push(res);
                this.data = res;
                if (this.data.status === 200 && this.data.user.role[0] == 'USER') {
                  this.navCtrl.setRoot(HomePage);                                      
                  if (!tempData[0].user.firstName || !tempData[0].user.email || !tempData[0].user.phoneNumber || tempData[0].user.firstName == "" || tempData[0].user.email == "" || tempData[0].user.phoneNumber == "") {
                    this.navCtrl.push(ProfilePage)
                    // this.toast.show(`Please Update Profile`, '5000', 'center').subscribe(
                    //   toast => {
                    //   }
                    // );                 
                  } else {
                    // this.toast.show(`Logged in as `+tempData[0].user.firstName, '3000', 'top').subscribe(
                    //   toast => {
                    //   }
                    // );  
                    this.navCtrl.setRoot(HomePage);                                                          
                  }
                  var userInfo = {
                    "firstName": tempData[0].user.firstName,
                    "email": tempData[0].user.email,
                    "mobileNumber": tempData[0].user.phoneNumber,
                    "id": tempData[0].user.id,
                    "lastName": tempData[0].user.lastName,
                    "tokenId": tempData[0].user.tokenId,
                    "role": tempData[0].user.role,
                    "accountType": tempData[0].user.accountType,
                    "coords": this.coords,
                  }
                  localStorage.setItem('userData', JSON.stringify(userInfo));
                } 
              })
            
  }

  doGoogleLogin() {
    this.googlePlus.login({
      // 'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '399098528529-ekgcf7skomc1a4j37p52e1hfere4p9vo.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
    .then(res => this.errr = 'ok')
    .catch(err => this.errr = err);
    
  }

  mechLogin() {
    this.navCtrl.push(MechloginPage, {mechLogin: true} );
  }

  login() {
    this.navCtrl.push(MechloginPage, {mechLogin: false, resetUserPassword: true} );
  }

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(Terms);
    profileModal.present();
  }

}


@Component({
  selector: 'terms-home',
  templateUrl: 'terms.html',
})
export class Terms {
  serviceId;
  settings: any = {}
 constructor(public viewCtrl: ViewController, public platform: Platform, public airconeProvider: AirconeProvider, params: NavParams) {
  this.getSettings();
    this.platform.registerBackButtonAction(() => {
      this.viewCtrl.dismiss();   
    });
 }

 getSettings() {
   this.airconeProvider.getSettings()
   .then( res => {
    this.settings = res[0];
   })
 }

 dismiss() {
   this.viewCtrl.dismiss();
 }

}
