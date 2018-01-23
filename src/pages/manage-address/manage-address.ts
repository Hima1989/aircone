import { Component } from '@angular/core';
import { IonicPage, NavController, App, NavParams, AlertController, ViewController, ModalController } from 'ionic-angular';
import {Validators, FormBuilder } from '@angular/forms';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { ServicesPage } from '../services/services';
import { SendrequestPage } from '../sendrequest/sendrequest';
import { Toast } from '@ionic-native/toast';



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
  constructor(public app: App, public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public alertCtrl: AlertController, public airconeProvider: AirconeProvider, public modalCtrl: ModalController) {
    if (navParams.get("id")) {
      this.serviceId = navParams.get("id"); 
      this.forRequest = true;
    }
    if (navParams.get("forRequest")) {
      this.forRequest = true;
    }
    this.loadAddresses();
  }

  ionViewDidLoad() {
  }

  goBackToRequest() {
      this.viewCtrl.dismiss();  
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
    this.viewCtrl.dismiss().then(() => {
      this.app.getRootNav().push(SendrequestPage, {id: this.serviceId, selectedAddress: address});
    });
     }
   }

   editAddress(address) {
     this.viewCtrl.dismiss()
    let addressModal = this.modalCtrl.create(Address, {userAddress: address, forRequest: this.forRequest, id: this.serviceId});
    addressModal.present();    
  }

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
          }
        },
        {
          text: 'Ok',
          cssClass:'icon-color',
          handler: data => {
            var userData = JSON.parse(localStorage.getItem("userData"));
    this.airconeProvider.deleteUserAddress(userData.id, address)
    .then(data => {
        this.loadAddresses()
    }) 
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
 constructor(public app: App, private toast: Toast, public navCtrl: NavController,public viewCtrl: ViewController, public airconeProvider: AirconeProvider, params: NavParams, private formBuilder: FormBuilder, public alertCtrl: AlertController, public modalCtrl: ModalController) {
  
  if (params.get('userAddress')) {
    this.userAddress = params.get('userAddress')
    this.request = this.userAddress
    this.oldAddressId = this.userAddress.id;
    this.oldAdd = true
  }

  if (params.get('id')) {
    this.serviveId = params.get('id')
  }

  if (params.get('forRequest')) {
    this.forRequest = true;
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

checkForPin(event) {
  var patt = new RegExp("^[1-9][0-9]{5}$");
  var res = patt.test(event)
    if (res) {
      this.airconeProvider.getUserPincode(event)
      .then( res => {
        this.data = res;
        if (this.data.status == 200) {
              this.toast.show(`Location Available`, '5000', 'center').subscribe(
                  toast => {
                    console.log(toast);
                  }
                );
              // toast.present();
        } else if (this.data.status == 404) {
           this.toast.show(`Location Not Available`, '5000', 'center').subscribe(
                  toast => {
                    console.log(toast);
                  }
                );
            // toast.present();
        }
      })
    }
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
    this.airconeProvider.updateAddress(userData.id, this.oldAddressId, this.orderForm.value)
    .then(data => {
         this.data = data;
      if (this.data.status == 200) {
        let alert = this.alertCtrl.create({
          title: 'Address Updated!',
          subTitle: 'Your Address is Successfully Updated!',
          buttons: [{text: 'OK', 
                      handler: () => {
                      if (this.forRequest) {
                      this.viewCtrl.dismiss().then(() => {
                        this.app.getRootNav().push(ManageAddressPage, {forRequest: this.forRequest, id: this.serviveId});
                      })
                      } else {
                      this.viewCtrl.dismiss().then(() => {
                        this.app.getRootNav().push(ManageAddressPage);
                      });
                      }
                }}]
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
   if (this.forRequest) {
     this.viewCtrl.dismiss()
   } else {
    this.viewCtrl.dismiss()    
   }
 }

}
