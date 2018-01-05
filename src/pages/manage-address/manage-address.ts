import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, ModalController } from 'ionic-angular';
import {Validators, FormBuilder } from '@angular/forms';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { ServicesPage } from '../services/services';

/**
 * Generated class for the ManageAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-address',
  templateUrl: 'manage-address.html',
})
export class ManageAddressPage {

  oldAddress;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public airconeProvider: AirconeProvider, public modalCtrl: ModalController) {

    this.loadAddresses();
  }

  ionViewDidLoad() {
  }

  addAddress() {
    let addressModal = this.modalCtrl.create(Address);
    addressModal.present();
  }

   loadAddresses() {
    var userData = JSON.parse(localStorage.getItem("userData"));
      this.airconeProvider.getUserAddress(userData.id)
      .then(data => {
        this.oldAddress = data;
      })    
   }

   editAddress(address) {
    let addressModal = this.modalCtrl.create(Address, {userAddress: address});
    addressModal.present();    
  }

   deleteAddress(address) {
    var userData = JSON.parse(localStorage.getItem("userData"));
    this.airconeProvider.deleteUserAddress(userData.id, address)
    .then(data => {
        this.loadAddresses()
    })   
   }

   goBack() {
     this.navCtrl.push(ServicesPage)
   }

}


@Component({
  selector: 'page-add-address',
  templateUrl: 'addAddress.html',
})
export class Address {
  public request = {};
  orderForm;
  adminDetails;
  data;
  oldAddress;
  userAddress;
  oldAdd: boolean = false
  oldAddressId;
 constructor(public navCtrl: NavController,public viewCtrl: ViewController, public airconeProvider: AirconeProvider, params: NavParams, private formBuilder: FormBuilder, public alertCtrl: AlertController) {
  
  if (params.get('userAddress')) {
    this.userAddress = params.get('userAddress')
    this.request = this.userAddress
    // console.log(this.userAddress.id)
    this.oldAddressId = this.userAddress.id;
    console.log(this.oldAddressId)
    this.oldAdd = true
  }
  
  this.orderForm  = this.formBuilder.group({
    Name: ['', Validators.required],
    City: ['', Validators.required],
    Phone: ['', Validators.required],
    AltPhone: ['', Validators.required],
    Door: ['', Validators.required],
    Street: ['', Validators.required],
    Area: ['', Validators.required],
    Pincode: ['', Validators.required]      
  }); 


}

 sendRequest() {
  var userData = JSON.parse(localStorage.getItem("userData"));

  if(!this.oldAdd) {
    this.airconeProvider.addAddress(userData.id, this.orderForm.value)
    .then(data => {
         this.data = data;
      if (this.data.status == 200) {
        let alert = this.alertCtrl.create({
          title: 'Address Added!',
          subTitle: 'Your Address is Successfully Added!',
          buttons: ['OK']
        });
        alert.present();
      } else if ( this.data.status == 404) {
        let alert = this.alertCtrl.create({
          title: 'Address Cant Add!',
          subTitle: 'Sorry Service not available at your location!',
          buttons: ['OK']
        });
        alert.present();
      }
  
      this.orderForm.reset()  
    })
  } else if(this.oldAdd) {
    // console.log(this.orderForm.value)
    // console.log(this.oldAddressId)
    this.airconeProvider.updateAddress(userData.id, this.oldAddressId, this.orderForm.value)
    .then(data => {
         this.data = data;
      if (this.data.status == 200) {
        let alert = this.alertCtrl.create({
          title: 'Address Updated!',
          subTitle: 'Your Address is Successfully Updated!',
          buttons: ['OK']
        });
        alert.present();
      } else if ( this.data.status == 404) {
        let alert = this.alertCtrl.create({
          title: 'Address Cant Update!',
          subTitle: 'Sorry Service not available at your location!',
          buttons: ['OK']
        });
        alert.present();
      }
  
      this.orderForm.reset()  
    })
  }

}



 dismiss() {
   this.navCtrl.push(ManageAddressPage)
 }

}
