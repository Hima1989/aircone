import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { HomePage } from '../home/home';
import { GooglePlus } from '@ionic-native/google-plus';


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
  
  constructor(public navCtrl: NavController, public googlePlus: GooglePlus, public navParams: NavParams, public fb: Facebook, public airconeProvider: AirconeProvider) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginpagePage');
  // }

  facebookLogin() {
    
    alert("clicked")
    // this.navCtrl.push(HomePage);
    let permissions = new Array<string>();
    // let nav = this.navCtrl;
    // let env = this;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];
    this.fb.login(permissions)
      .then(function (response) {
        let userId = response.authResponse.userID;
        let params = new Array<string>();

        //Getting name and gender properties
        this.fb.api("/me?fields=name,gender", params)
          .then(function (user) {
            user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
          alert(user)
            // now we have the users info, let's save it in the NativeStorage
            var userDetails: any = {
              firstName: user.name,
              email: user.email,
              profilePic: user.picture,
              role: "USER",
              socialType: 'FACEBOOK'
            };

            this.airconeProvider.socialLogin(userDetails)
              .then(res => {  
                // var a: any = res;
                localStorage.setItem('user', userId);
                // var b = localStorage.getItem('user');
                // alert(b);
              })
          })

      }, function (error) {
        // alert(error);
      });
  }

  doGoogleLogin() {
    let nav = this.navCtrl;
    let env = this;
    let me = this;
    this.googlePlus.login({
      'scopes': '',
      'webClientId': '921571607582-htbi22idd872g0ngv2qhe0vuq4jmu7lu.apps.googleusercontent.com',
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
             var a: any = res;
            // console.log(a.id);
           
            // localStorage.setItem('user', a.id);
            // localStorage.setItem('name', a.firstName);
            // var b = localStorage.getItem('user');
          }, err => {})
      })
      .catch(err => alert(err + "IT wont work here"));
  }

}
