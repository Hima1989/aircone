import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder } from '@angular/forms';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { MechanicPage } from '../mechanic/mechanic';
import { LoginpagePage } from '../loginpage/loginpage'
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
  constructor(public navCtrl: NavController,public airconeProvider: AirconeProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MechloginPage');
  }

  login() {
    console.log(this.loginForm.value.password);
   
    this.airconeProvider.userLogin(this.loginForm.value)
    .then(res => {
      this.loginForm.reset()      
      var tempData = [];                
      tempData.push(res);
      this.data = res;
      if (this.data.status === 200 && this.data.user.role[0] == 'MECHANIC') {
        this.navCtrl.push(MechanicPage);
        var mechUserInfo = {
          "firstName": tempData[0].user.firstName,
          "email": tempData[0].user.email,
          "phoneNumber": tempData[0].user.phoneNumber,
          "id": tempData[0].user.id,
          "lastName": tempData[0].user.lastName,
          "tokenId": tempData[0].user.tokenId,
          "role": tempData[0].user.role,
        }
        localStorage.setItem('userData', JSON.stringify(mechUserInfo));
      }
    })

  }
    goBack() {
    this.navCtrl.push(LoginpagePage)
  }
}
