import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {Validators, FormBuilder } from '@angular/forms';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { MechanicPage } from '../mechanic/mechanic';
import { LoginpagePage } from '../loginpage/loginpage';
import { Toast } from '@ionic-native/toast';
import { StatusBar } from '@ionic-native/status-bar';
import { ChangePasswordPage } from '../change-password/change-password';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { SignupPage } from '../signup/signup';
/**
 * Generated class for the MechloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mechlogin',
  templateUrl: 'mechlogin.html',
})
export class MechloginPage {
  registerCredentials: any = {};
  loginForm;
  data;
  mechLogin: boolean;
  constructor(private statusBar:StatusBar, private toast: Toast, public navCtrl: NavController,public airconeProvider: AirconeProvider, public navParams: NavParams, private formBuilder: FormBuilder, public platform: Platform) {
    this.loginForm = this.formBuilder.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required],
    })
    if(navParams.get("mechLogin")) {
      this.mechLogin = navParams.get("mechLogin")
    } else {
      this.mechLogin = navParams.get("mechLogin")
    }
    platform.registerBackButtonAction(() => {
      this.navCtrl.push(LoginpagePage)
    });
  }

  ionViewDidLoad() {
    this.statusBar.backgroundColorByHexString('#dedede');
  }

  login() {
   
    this.airconeProvider.userLogin(this.loginForm.value)
    .then(res => {
      // this.loginForm.reset()   
      var tempData = [];                
      tempData.push(res);
      this.data = res;
      if (this.data.status === 200 && this.data.user.role[0] == 'MECHANIC') {
        this.navCtrl.push(MechanicPage); 
        this.navCtrl.setRoot(MechanicPage);                                                                  
        var mechUserInfo = {
          "firstName": tempData[0].user.firstName,
          "email": tempData[0].user.email,
          "phoneNumber": tempData[0].user.phoneNumber,
          "id": tempData[0].user.id,
          "lastName": tempData[0].user.lastName,
          "tokenId": tempData[0].user.tokenId,
          "role": tempData[0].user.role,
          "referralCode": tempData[0].user.referralCode
        }
        localStorage.setItem('userData', JSON.stringify(mechUserInfo));
        // this.toast.show(`Logged in as `+tempData[0].user.firstName, '3000', 'top').subscribe(
        //   toast => {
        //   }
        // );  
      } else if (this.data.status === 200 && this.data.user.role[0] == 'USER'){
          this.navCtrl.setRoot(HomePage);                                      
          if (this.data.user.firstName == null || this.data.user.email == null || this.data.user.phoneNumber == null || this.data.user.firstName == "" || this.data.user.email == "" || this.data.user.phoneNumber == "") {
            this.navCtrl.push(ProfilePage)
            // this.toast.show(`Please Update Profile`, '5000', 'center').subscribe(
            //   toast => {
            //   }
            // );                 
          } else {
            // this.toast.show(`Logged in as `+tempData[0].firstName, '3000', 'top').subscribe(
            //   toast => {
            //   }
            // );  
            this.navCtrl.setRoot(HomePage);                                                          
          }
          var userInfo = {
            "firstName": this.data.user.firstName,
            "email": this.data.user.email,
            "phoneNumber": this.data.user.phoneNumber,
            "id": this.data.user.id,
            "tokenId": this.data.user.tokenId,
            "accountType": this.data.user.accountType,
            "role": this.data.user.role,
            // "coords": this.coords
          }
          localStorage.setItem('userData', JSON.stringify(userInfo));
        // } 
      } else if (this.data.status === 404) {
        // this.toast.show(`User or Password mismatch`, '3000', 'center').subscribe(
        //   toast => {
        //   }
        // );   
      }
      else{
        
        // this.toast.show('Invalied User Id and Password', '5000', 'center').subscribe(
        //   toast => {
        //   }
        // );
      }
    }).catch( err => {
        // this.toast.show(`User not verified Yet`, '3000', 'top').subscribe(
        //   toast => {
        //   }
        // );  
          })
    

  }

  forgotPassword() {
    this.navCtrl.push(ChangePasswordPage, {forChangePassword: false})
  }

  signUp() {
    this.navCtrl.push(SignupPage)
  }

    goBack() {
    this.navCtrl.push(LoginpagePage)
  }
}
