import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { HomePage } from '../home/home';
import { GooglePlus } from '@ionic-native/google-plus';
import { ServicesPage } from '../services/services';
import { MechanicPage } from '../mechanic/mechanic';
import { Geolocation } from '@ionic-native/geolocation';
import { MechloginPage } from '../mechlogin/mechlogin';

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
  constructor(public platform: Platform, public navCtrl: NavController, public googlePlus: GooglePlus, public navParams: NavParams, public fb: Facebook, public airconeProvider: AirconeProvider, private geolocation: Geolocation) {
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

    var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };

    this.geolocation.getCurrentPosition(options).then((resp) => {
      this.coords = {
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude
      }
    //  console.log(this.coords)
     }).catch((error) => {
       console.log('Error getting location', error);
     });

  }

  facebookLogin() {

         var userDetails = {"identifier":"gleedtechuser@gmail.com","password":"123123123","email":"doddibalubharadwaj@gmail.com"}

         //var userDetails = {"identifier":"gleedtechmech@gmail.com","password":"123123123","email":"doddibalubharadwaj@gmail.com"}
         
            this.airconeProvider.userLogin(userDetails)
              .then(res => {
                var tempData = [];                
                tempData.push(res);
                this.data = res;
                if (this.data.status === 200 && this.data.user.role[0] == 'USER') {
                //  console.log(this.coords)
                  this.navCtrl.push(ServicesPage);
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
                else if (this.data.status === 200 && this.data.user.role[0] == 'MECHANIC') {
                  this.navCtrl.push(MechanicPage);
                  var mechUserInfo = {
                    "firstName": tempData[0].user.firstName,
                    "email": tempData[0].user.email,
                    "phoneNumber": tempData[0].user.phoneNumber,
                    "id": tempData[0].user.id,
                    "lastName": tempData[0].user.lastName,
                    "tokenId": tempData[0].user.tokenId,
                    "role": tempData[0].user.role,
                    "coords": this.coords
                  }
                  localStorage.setItem('userData', JSON.stringify(mechUserInfo));
                }
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
    // let nav = this.navCtrl;
    // let env = this;
    // let me = this;
    this.googlePlus.login({
      'scopes': '',
      'webClientId': '455882486075-90366665k6ehek4t8rvp5ej9499ga65m.apps.googleusercontent.com',
      'offline': true
    })
      .then(res => {
        alert(res)
        var userDetails: any = {
          firstName: res.displayName,
          email: res.email,
          profilePic: res.imageUrl,
          role: "USER",
          socialType: 'GOOGLE'
        };
        alert(userDetails.firstName);
        // alert(userDetails.profilePic);
        // alert(userDetails.email);
        // alert(userDetails.role);
        this.airconeProvider.socialLogin(userDetails)
          .then(res => {            
            //  var a: any = res;
            // console.log(a.id);

            // localStorage.setItem('user', a.id);
            // localStorage.setItem('name', a.firstName);
            // var b = localStorage.getItem('user');
          }, err => {})
      })
      .catch(err => alert(err + "IT wont work here"));
  }

  mechLogin() {
    this.navCtrl.push(MechloginPage);
  }
}
