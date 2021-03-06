import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { Toast } from '@ionic-native/toast';
import { MechanicPage } from '../mechanic/mechanic';
import { HomePage } from '../home/home';
// import {Validators, FormBuilder } from '@angular/forms';


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

  public userDetails: any = {firstName: '', email: '', phoneNumber: ''};
  base64Image:any;
  orderForm;
  referral: boolean = true;
  forMech: boolean;
  forUser: boolean;
  data;
  constructor(private toast: Toast, public navCtrl: NavController, public navParams: NavParams, public camera:Camera, public airconeProvider: AirconeProvider, public menu: MenuController, public platform: Platform) {
    this.getUserDetails();
    // this.menu.enable(true, 'user');
    // this.menu.enable(false, 'mech');
    // this.orderForm  = this.formBuilder.group({
    //   firstName: ['', Validators.required],
    //   email: ['', Validators.required],
    //   mobileNumber: ['', Validators.required]   
    // });
    platform.registerBackButtonAction(() => {
      if (this.forUser) {
        this.navCtrl.setRoot(HomePage).then(() =>{
          this.navCtrl.popToRoot();
        });
      }
      if (this.forMech) {
        this.navCtrl.push(MechanicPage);          
      }
    });  
  }

  ionViewDidLoad() {
  }

  submitDetails() {
    if(this.userDetails.firstName == undefined || this.userDetails.mobileNumber == undefined || this.userDetails.mobileNumber == "" || this.userDetails.firstName == ""){
      this.presentToast();
    }else{
      if (this.myfile) {
        this.userDetails.image = this.myfile.imageURL;
      }
      this.airconeProvider.userDetailsUpdate(this.userDetails)
      .then(res => {        
        this.data = res;
        if (this.data.status == 404) {
          this.toast.show(`PhoneNumber already used for another account`, '5000', 'center').subscribe(
            toast => {
            }
          ); 
        } else {
          this.updateToast();
          if (this.forUser) {
            this.navCtrl.setRoot(HomePage).then(() =>{
              this.navCtrl.popToRoot();
            });
          }
          if (this.forMech) {
            this.navCtrl.push(MechanicPage);          
          }
        } 

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
     });
   }

  goBack() {
    if (this.forUser) {
      this.navCtrl.setRoot(HomePage).then(() =>{
        this.navCtrl.popToRoot();
      });
    }
    if (this.forMech) {
      this.navCtrl.push(MechanicPage);          
    }
  }

  getUserDetails() {
  var  userData = localStorage.getItem('userData');
   var user = JSON.parse(userData);
   if(user) {
    this.airconeProvider.loaduser(user.id)
    .then(data => {
     this.userDetails = data
     if(this.userDetails.role[0] == 'MECHANIC') {
       this.forMech = true;
       this.forUser = false;
     }
     if(this.userDetails.role[0] == 'USER') {
       this.forMech = false;
       this.forUser = true;
     }
     this.base64Image = this.userDetails.image
     if(this.userDetails.referredBy) {
       this.referral = false;
     }
    })
   }
   }


}
