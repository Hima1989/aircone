import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { Camera } from '@ionic-native/camera';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { MechloginPage } from '../mechlogin/mechlogin';
import {Validators, FormBuilder } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public userDetails: any = {firstName: '', email: '', phoneNumber: ''};
  base64Image:any;
  orderForm;
  referredBy;
  coords;
  constructor(private toast: Toast, public navCtrl: NavController, public navParams: NavParams, public camera:Camera, public airconeProvider: AirconeProvider, public platform: Platform, private formBuilder: FormBuilder, private geolocation: Geolocation) {

    this.orderForm  = this.formBuilder.group({
      firstName: ['', Validators.required],
      phoneNumber: ['', Validators.required],      
      email: ['', Validators.required],
      password: ['', Validators.required],
      rePassword: ['', Validators.required],
      // referredBy: ['', Validators.required],
    });

    platform.registerBackButtonAction(() => {
      this.navCtrl.push(MechloginPage, {mechLogin: false} );  
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

  submitDetails() {
    console.log(this.orderForm.value)
    if (this.referredBy) {
      this.orderForm.value.referredBy = this.referredBy;
    }
    if (this.coords) {
      this.orderForm.value.coords = this.coords;
    }
    if (this.base64Image) {
      this.orderForm.value.image = this.base64Image;
    }
    this.orderForm.value.role = "USER";
    if (this.orderForm.value.password === this.orderForm.value.rePassword) {
      this.airconeProvider.appUserRegister(this.orderForm.value)
      .then( res => {
        console.log("success fully registered")
      })
    }
  }
  presentToast() {
     this.toast.show(`Profile not update`, '5000', 'center').subscribe(
            toast => {
            }
          );     
  }

  updateToast() {
     this.toast.show(`Profile updated`, '5000', 'center').subscribe(
            toast => {
            }
          );     
  }

  accessGallery(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
     }).then((imageData) => {
       this.base64Image = 'data:image/jpeg;base64,'+imageData;
       this.fileChange()
      }, (err) => {
       console.log(err);
     });
   }

   myfile: any;
   fileChange() {
     this.myfile = this.base64Image;
     this.airconeProvider.fileUploadBase64(this.myfile)
     .then(data => {
      this.myfile = data;
      },
   err => {
     console.log(err);
     });
   }

  goBack() {
    this.navCtrl.push(MechloginPage, {mechLogin: false} );      
  }


}
