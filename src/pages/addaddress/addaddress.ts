import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ModalController, Platform } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
import {Validators, FormBuilder } from '@angular/forms';
import { ManageAddressPage } from '../manage-address/manage-address';
import { Toast } from '@ionic-native/toast';


@IonicPage()
@Component({
  selector: 'page-addaddress',
  templateUrl: 'addaddress.html',
})
export class AddaddressPage {

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
 constructor(private toast: Toast, public navCtrl: NavController,public viewCtrl: ViewController, public airconeProvider: AirconeProvider, params: NavParams, private formBuilder: FormBuilder, public alertCtrl: AlertController, public modalCtrl: ModalController, public platform: Platform) {
  
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
  platform.registerBackButtonAction(() => {
    if (this.forRequest) {
      this.navCtrl.push(ManageAddressPage, {forRequest: this.forRequest, id: this.serviveId})
    } else {
      this.navCtrl.push(ManageAddressPage)
    }
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
          buttons: [{text: 'OK', 
          handler: () => {
          if (this.forRequest) {

          } else {
            this.navCtrl.push(ManageAddressPage)
          }
    }}]
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
                        this.navCtrl.push(ManageAddressPage, {forRequest: this.forRequest, id: this.serviveId})
                      } else {
                        this.navCtrl.push(ManageAddressPage)                        
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
    this.navCtrl.push(ManageAddressPage, {forRequest: this.forRequest, id: this.serviveId})
  } else {
    this.navCtrl.push(ManageAddressPage)
  }
 }

 checkForPin(event) {
  var patt = new RegExp("^[1-9][0-9]{5}$");
  var res = patt.test(event)
    if (res) {
      this.airconeProvider.getUserPincode(event)
      .then( res => {
        this.data = res;
        if (this.data.status == 200) {
          
              this.toast.show('Request for' + this.data.pincode.location+ 'is available', '5000', 'center').subscribe(
  toast => {
  }
);
        } else if (this.data.status == 404) {
          this.toast.show(`Location not available`, '5000', 'center').subscribe(
            toast => {
            })
        }
      })
    }
  }

}
