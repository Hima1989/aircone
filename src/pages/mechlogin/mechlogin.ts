import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {Validators, FormBuilder } from '@angular/forms';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { MechanicPage } from '../mechanic/mechanic';
import { LoginpagePage } from '../loginpage/loginpage';
import { Toast } from '@ionic-native/toast';
import { StatusBar } from '@ionic-native/status-bar';
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
  data
  constructor(private statusBar:StatusBar, private toast: Toast, public navCtrl: NavController,public airconeProvider: AirconeProvider, public navParams: NavParams, private formBuilder: FormBuilder, public platform: Platform) {
    this.loginForm = this.formBuilder.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required],
    })
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
      console.log("ok")   
      var tempData = [];                
      tempData.push(res);
      this.data = res;
      if (this.data.status === 200 && this.data.user.role[0] == 'MECHANIC') {
        this.navCtrl.push(MechanicPage);
        // this.toast.show(`Logged in as `+tempData[0].user.firstName, '3000', 'top').subscribe(
        //   toast => {
        //   }
        // );  
        // this.navCtrl.setRoot(MechanicPage);                                                                  
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
      } else if (this.data.status === 404) {
        this.toast.show(`User or Password mismatch`, '3000', 'center').subscribe(
          toast => {
          }
        );   
      }
      else{
        
        this.toast.show('Invalied User Id and Password', '5000', 'center').subscribe(
          toast => {
          }
        );
      }
    })

  }
    goBack() {
    this.navCtrl.push(LoginpagePage)
  }
}
