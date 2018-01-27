import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder } from '@angular/forms';
import { Toast } from '@ionic-native/toast';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { MechanicPage } from '../mechanic/mechanic'

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  orderForm;
  userDetails: any = {email: '', oldPass: '', newPass: '',ReNewPass: ''};
  data;

  constructor(private toast: Toast, public navCtrl: NavController, public navParams: NavParams, private airconeProvider: AirconeProvider, private formBuilder: FormBuilder) {
    this.getUserDetails();
    this.orderForm = this.formBuilder.group({
      email: ['', Validators.required],
      oldPass: ['', Validators.required],
      newPass: ['', Validators.required],
      ReNewPass: ['', Validators.required],
    })
  }

  ionViewDidLoad() {
  }

  goBack() {
    this.navCtrl.push(MechanicPage, {status: true})
  }
    
      getUserDetails() {
        var  userData = localStorage.getItem('userData');
         var user = JSON.parse(userData);
         this.airconeProvider.loaduser(user.id)
         .then(data => {
           this.userDetails = data;
         })
      }
    
      submitDetails() {
        var pass = this.orderForm.value
        var  userData = localStorage.getItem('userData');
        var user = JSON.parse(userData);
        if (pass.newPass == pass.ReNewPass) {
          this.airconeProvider.changePassword(user.id, pass)
          .then(res => {
            var tempData = [];                
            tempData.push(res);
            this.data = res;
            if(this.data.status === 200) {
              this.navCtrl.push(MechanicPage, {status: true})              
              this.toast.show(`New Password has updated`, '3000', 'center').subscribe(
                toast => {
                })
            } else if (this.data.status === 404) {
              this.toast.show(`Old Password Incorrect`, '3000', 'center').subscribe(
                toast => {
                })
            }
          })   
        } else {
          this.toast.show(`Old and New password not equal`, '3000', 'center').subscribe(
            toast => {
            })
        }
        console.log(this.orderForm.value)
      }

}
