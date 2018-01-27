import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { HomePage } from '../home/home';
import { GooglePlus } from '@ionic-native/google-plus';
import { ProfilePage } from '../profile/profile';
import { Geolocation } from '@ionic-native/geolocation';
import { MechloginPage } from '../mechlogin/mechlogin';
import { Toast } from '@ionic-native/toast';
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
  constructor(public platform: Platform, public navCtrl: NavController, public googlePlus: GooglePlus, public navParams: NavParams, public fb: Facebook, public airconeProvider: AirconeProvider, private geolocation: Geolocation,private toast: Toast) {

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
     console.log(this.coords.latitude)
     }).catch((error) => {
       console.log('Error getting location', error);
     });

  }

  facebookLogin() {

         var userDetails = {"identifier":"gleedtechuser@gmail.com","password":"123123123","email":"gleedtechuser@gmail.com"}

        //  var userDetails = {"identifier":"doddibalubharadwaj@gmail.com","password":"123123123","email":"doddibalubharadwaj@gmail.com"}

            this.airconeProvider.userLogin(userDetails)
              .then(res => {
                var tempData = [];                
                tempData.push(res);
                this.data = res;
                if (this.data.status === 200 && this.data.user.role[0] == 'USER') {
                  this.navCtrl.setRoot(HomePage);                                      
                  if (!tempData[0].user.firstName || !tempData[0].user.email || !tempData[0].user.phoneNumber || tempData[0].user.firstName == "" || tempData[0].user.email == "" || tempData[0].user.phoneNumber == "") {
                    this.navCtrl.push(ProfilePage)
                    this.toast.show(`Please Update Profile`, '5000', 'center').subscribe(
                      toast => {
                      }
                    );                 
                  } else {
                    this.navCtrl.setRoot(HomePage);                                                          
                    // this.navCtrl.push(HomePage);  
                  }
                  var userInfo = {
                    "firstName": tempData[0].user.firstName,
                    "email": tempData[0].user.email,
                    "phoneNumber": tempData[0].user.phoneNumber,
                    "id": tempData[0].user.id,
                    "lastName": tempData[0].user.lastName,
                    "tokenId": tempData[0].user.tokenId,
                    "role": tempData[0].user.role,
                    "coords": this.coords
                  }
                  localStorage.setItem('userData', JSON.stringify(userInfo));
                } 

                // else if (this.data.status === 200 && this.data.user.role[0] == 'MECHANIC') {
                //   this.navCtrl.push(MechanicPage);
                //   var mechUserInfo = {
                //     "firstName": tempData[0].user.firstName,
                //     "email": tempData[0].user.email,
                //     "phoneNumber": tempData[0].user.phoneNumber,
                //     "id": tempData[0].user.id,
                //     "lastName": tempData[0].user.lastName,
                //     "tokenId": tempData[0].user.tokenId,
                //     "role": tempData[0].user.role,
                //     "coords": this.coords
                //   }
                //   localStorage.setItem('userData', JSON.stringify(mechUserInfo));
                // }
              })
            

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
    //   });
  }

  doGoogleLogin() {
    this.googlePlus.login({})
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }

  mechLogin() {
    this.navCtrl.push(MechloginPage);
  }
}
