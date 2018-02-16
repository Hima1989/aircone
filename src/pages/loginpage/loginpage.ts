import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
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
  constructor(private statusBar:StatusBar, public platform: Platform, public navCtrl: NavController, public googlePlus: GooglePlus, public navParams: NavParams, private fb: Facebook, public airconeProvider: AirconeProvider, private geolocation: Geolocation,private toast: Toast) {
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
    });
    this.statusBar.backgroundColorByHexString('#ff6d79');
  }

  ionViewDidLoad() {
    this.statusBar.backgroundColorByHexString('#ff6d79');
  }


  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginpagePage');
  // }

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

  }

  tempLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {
      // console.log(res.authResponse.)
      this.getUserDetail(res.authResponse.userID)
      // console.log('Logged into Facebook!', res)
      
    }
  )
    .catch(e => 
      {
        console.log("not get")
      }
      // console.log('Error logging into Facebook', e)
    );
  
  
  // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
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
            if (!tempData[0].firstName || tempData[0].email == null || tempData[0].phoneNumber == null || tempData[0].firstName == "" || tempData[0].email == "" || tempData[0].phoneNumber == "") {
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
            var userInfo = {
              "firstName": tempData[0].firstName,
              "email": tempData[0].email,
              "phoneNumber": tempData[0].phoneNumber,
              "id": tempData[0].id,
              "tokenId": tempData[0].tokenId,
              "role": tempData[0].role,
              "accountType": tempData[0].accountType,
              // "coords": this.coords
            }
            localStorage.setItem('userData', JSON.stringify(userInfo));
          // } 
        })
      })
      .catch(e => {
        console.log(e);
      });
  }

  facebookLogin() {
                    this.toast.show(`Google Login comming soon...`, '3000', 'top').subscribe(
                      toast => {
                      }
                    ); 
        //  var userDetails = {"identifier":"gleedtechuser@gmail.com","password":"123123123","email":"gleedtechuser@gmail.com"}

        //  var userDetails = {"identifier":"doddibalubharadwaj@gmail.com","password":"123123123","email":"doddibalubharadwaj@gmail.com"}

        //     this.airconeProvider.userLogin(userDetails)
        //       .then(res => {
        //         var tempData = [];                
        //         tempData.push(res);
        //         this.data = res;
        //         console.log(this.data)
        //         if (this.data.status === 200 && this.data.user.role[0] == 'USER') {
        //           this.navCtrl.setRoot(HomePage);                                      
        //           if (!tempData[0].user.firstName || !tempData[0].user.email || !tempData[0].user.phoneNumber || tempData[0].user.firstName == "" || tempData[0].user.email == "" || tempData[0].user.phoneNumber == "") {
        //             this.navCtrl.push(ProfilePage)
        //             // this.toast.show(`Please Update Profile`, '5000', 'center').subscribe(
        //             //   toast => {
        //             //   }
        //             // );                 
        //           } else {
        //             // this.toast.show(`Logged in as `+tempData[0].user.firstName, '3000', 'top').subscribe(
        //             //   toast => {
        //             //   }
        //             // );  
        //             this.navCtrl.setRoot(HomePage);                                                          
        //           }
        //           var userInfo = {
        //             "firstName": tempData[0].user.firstName,
        //             "email": tempData[0].user.email,
        //             "phoneNumber": tempData[0].user.phoneNumber,
        //             "id": tempData[0].user.id,
        //             "lastName": tempData[0].user.lastName,
        //             "tokenId": tempData[0].user.tokenId,
        //             "role": tempData[0].user.role,
        //             "accountType": tempData[0].user.accountType,
        //             "coords": this.coords,
        //           }
        //           localStorage.setItem('userData', JSON.stringify(userInfo));
        //         } 

        //         // else if (this.data.status === 200 && this.data.user.role[0] == 'MECHANIC') {
        //         //   this.navCtrl.push(MechanicPage);
        //         //   var mechUserInfo = {
        //         //     "firstName": tempData[0].user.firstName,
        //         //     "email": tempData[0].user.email,
        //         //     "phoneNumber": tempData[0].user.phoneNumber,
        //         //     "id": tempData[0].user.id,
        //         //     "lastName": tempData[0].user.lastName,
        //         //     "tokenId": tempData[0].user.tokenId,
        //         //     "role": tempData[0].user.role,
        //         //     "coords": this.coords
        //         //   }
        //         //   localStorage.setItem('userData', JSON.stringify(mechUserInfo));
        //         // }
        //       })
            

    // alert("clicked")
    // // this.navCtrl.push(HomePage);
    // let permissions = new Array<string>();
    // // let nav = this.navCtrl;
    // // let env = this;
    // //the permissions your facebook app needs from the user
    // permissions = ["public_profile"];
    // this.fb.login(permissions)
    //   .then(function (response) {
    //     let userId = response.authResponse.userID;
    //     let params = new Array<string>();

    //     //Getting name and gender properties
    //     this.fb.api("/me?fields=name,gender", params)
    //       .then(function (user) {
    //         user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
    //       alert(user)
    //         // now we have the users info, let's save it in the NativeStorage
    //         var userDetails: any = {
    //           firstName: user.name,
    //           email: user.email,
    //           profilePic: user.picture,
    //           role: "USER",
    //           socialType: 'FACEBOOK'
    //         };

    //         this.airconeProvider.socialLogin(userDetails)
    //           .then(res => {
    //             // var a: any = res;
    //             localStorage.setItem('user', userId);
    //             // var b = localStorage.getItem('user');
    //             // alert(b);
    //           })
    //       })

    //   }, function (error) {
    //     // alert(error);
      // });
  }

  doGoogleLogin() {
    this.googlePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
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

}
