import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, ModalController } from 'ionic-angular';
import {Validators, FormBuilder } from '@angular/forms';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { ServicesPage } from '../services/services';
import { SendrequestPage } from '../sendrequest/sendrequest';


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
  serviceId;
  forRequest: boolean = false; 
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public alertCtrl: AlertController, public airconeProvider: AirconeProvider, public modalCtrl: ModalController) {
    if (navParams.get("id")) {
      this.serviceId = navParams.get("id"); 
      this.forRequest = true;
      console.log(this.serviceId)
    } else {
      console.log("noserviceid")      
    }
    if (navParams.get("forRequest")) {
      this.forRequest = true;
    }

    this.loadAddresses();
  }

  ionViewDidLoad() {
  }

  goBackToRequest() {
    if (this.forRequest) {
      this.navCtrl.push(SendrequestPage, {id: this.serviceId})
    } else {
      this.viewCtrl.dismiss();      
    }
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

   addAddressToForm(address) {
    if (this.forRequest) {
      this.navCtrl.push(SendrequestPage, {id: this.serviceId, selectedAddress: address})
    }
   }

   editAddress(address) {
    let addressModal = this.modalCtrl.create(Address, {userAddress: address, forRequest: this.forRequest, id: this.serviceId});
    addressModal.present();    
  }

  //  deleteAddress(address) {
  //   var userData = JSON.parse(localStorage.getItem("userData"));
  //   this.airconeProvider.deleteUserAddress(userData.id, address)
  //   .then(data => {
  //       this.loadAddresses()
  //   })   
  //   this.doConfirm()
  //  }

   
  doConfirm(address) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Items',
      message: 'Do you want to remove this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass:'icon-color',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          cssClass:'icon-color',
          handler: data => {
            console.log('Items Removed!');
            var userData = JSON.parse(localStorage.getItem("userData"));
    this.airconeProvider.deleteUserAddress(userData.id, address)
    .then(data => {
        this.loadAddresses()
    }) 
            //Call you API to remove Items here.
          }
        }
      ]
    });
    alert.present();
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
  forRequest;
  serviveId;
 constructor(public navCtrl: NavController,public viewCtrl: ViewController, public airconeProvider: AirconeProvider, params: NavParams, private formBuilder: FormBuilder, public alertCtrl: AlertController, public modalCtrl: ModalController) {
  
  if (params.get('userAddress')) {
    this.userAddress = params.get('userAddress')
    this.request = this.userAddress
    // console.log(this.userAddress.id)
    this.oldAddressId = this.userAddress.id;
    this.oldAdd = true
  }

  if (params.get('id')) {
    this.serviveId = params.get('id')
    console.log(this.serviveId)
  }

  if (params.get('forRequest')) {
    this.forRequest = true;
    console.log(this.forRequest)
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
          buttons: [{text: 'OK', 
                      handler: () => {
                      console.log('Cancel clicked');
                      let addressModal = this.modalCtrl.create(ManageAddressPage, {forRequest: this.forRequest, id: this.serviveId});
                      addressModal.present(); 
                }}]
        });
        alert.present();
        console.log(alert)
      } else if ( this.data.status == 404) {
        let alert = this.alertCtrl.create({
          title: 'Address Cant Update!',
          subTitle: 'Sorry Service not available at your location!',
          buttons: ['OK']
        });
        alert.present();
      }
  
      this.orderForm.reset()  
      // let addressModal = this.modalCtrl.create(ManageAddressPage, {forRequest: this.forRequest});
      // addressModal.present(); 
    })
  }

}



 dismiss() {
   if (this.forRequest) {
     this.viewCtrl.dismiss()
   } else {
    this.navCtrl.push(ManageAddressPage)    
   }
 }

}
