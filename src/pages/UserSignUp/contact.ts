import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { Camera } from '@ionic-native/camera';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { MechloginPage } from '../mechlogin/mechlogin';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public userDetails: any = {firstName: '', email: '', phoneNumber: ''};
  base64Image:any;
  orderForm;
  referral: boolean = true;
  forMech: boolean;
  forUser: boolean;
  constructor(private toast: Toast, public navCtrl: NavController, public navParams: NavParams, public camera:Camera, public airconeProvider: AirconeProvider, public platform: Platform) {

    platform.registerBackButtonAction(() => {
      this.navCtrl.push(MechloginPage, {mechLogin: false} );  
    });  
  }

  ionViewDidLoad() {
  }

  submitDetails() {
 
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
