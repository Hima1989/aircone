import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {Validators, FormBuilder } from '@angular/forms';
import { Toast } from '@ionic-native/toast';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { MechanicPage } from '../mechanic/mechanic';
import { MechloginPage } from '../mechlogin/mechlogin';

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
  forChangePassword;

  constructor(private toast: Toast, public navCtrl: NavController, public navParams: NavParams, private airconeProvider: AirconeProvider, private formBuilder: FormBuilder, public platform: Platform) {
    if(navParams.get("forChangePassword")) {
      this.forChangePassword = true
      this.getUserDetails();      
    }
    if(navParams.get("forChangePassword") === false) {
      this.forChangePassword = false
    }
    this.orderForm = this.formBuilder.group({
      email: ['', Validators.required],
      oldPass: [''],
      newPass: ['', Validators.required],
      ReNewPass: ['', Validators.required],
    })
    platform.registerBackButtonAction(() => {
      if (this.forChangePassword) {
        this.navCtrl.push(MechanicPage, {status: true})      
      } else {
        this.navCtrl.push(MechloginPage)
      }
    });
  }

  ionViewDidLoad() {
  }

  goBack() {
    if (this.forChangePassword) {
      this.navCtrl.push(MechanicPage, {status: true})      
    } else {
      this.navCtrl.push(MechloginPage)
    }
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
          
          if (this.forChangePassword) {
            console.log(this.forChangePassword)
            console.log("hitted")
            var  userData = localStorage.getItem('userData');
            var user = JSON.parse(userData);
            if (pass.newPass == pass.ReNewPass && !pass.oldPass) {
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
          } else {
            if (pass.newPass == pass.ReNewPass) {
              this.airconeProvider.resetPassword(pass)
              .then( res => {
                this.toast.show(`New Password has updated`, '3000', 'center').subscribe(
                  toast => {
                  })
              })
            }  else {
              this.toast.show(`Old and New password not equal`, '3000', 'center').subscribe(
                toast => {
                })
            }

          }


        }
        

}
