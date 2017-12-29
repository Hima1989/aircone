import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesPage } from '../services/services';
import { Camera } from '@ionic-native/camera';
import { AirconeProvider } from '../../providers/aircone/aircone';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public userDetails;
  base64Image:any;
  orderForm;
  constructor(public navCtrl: NavController, public navParams: NavParams, public camera:Camera, public airconeProvider: AirconeProvider) {
    this.getUserDetails();
    // this.orderForm  = this.formBuilder.group({
          
    // });
  }

  ionViewDidLoad() {
  }

  submitDetails() {
    console.log(this.userDetails)
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
     this.airconeProvider.fileUpload(this.myfile)
     .then(data => {
      //  this.service.image = '';
      //  this.service.image = (data['files'][0].url);
      console.log(data['files'][0].url);
     },
   err => {
     console.log(err);
     });
   }

  goBack() {
    this.navCtrl.push(ServicesPage);    
  }

  getUserDetails() {
  var  userData = localStorage.getItem('userData');
   this.userDetails = JSON.parse(userData);
  }

}
