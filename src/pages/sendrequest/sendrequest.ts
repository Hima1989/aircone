import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, ViewController, ModalController } from 'ionic-angular';
import { ServicesHomePage } from '../services-home/services-home';
import { AirconeProvider } from '../../providers/aircone/aircone';
import {Validators, FormBuilder } from '@angular/forms';
import { ManageAddressPage } from '../manage-address/manage-address';

/**
 * Generated class for the SendrequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sendrequest',
  templateUrl: 'sendrequest.html',
})
export class SendrequestPage {

  serviceId;
  public request = {};
  public service = {};
  orderForm;
  adminDetails;
  pincodes;
  data;
  oldAddress;
  selectedAddress;

  constructor(public platform: Platform, params: NavParams, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider, private formBuilder: FormBuilder, public alertCtrl: AlertController) {
    this.orderForm  = this.formBuilder.group({
      Name: ['', Validators.required],
      City: ['', Validators.required],
      Phone: ['', Validators.required],
      AltPhone: ['', Validators.required],
      Door: ['', Validators.required],
      Street: ['', Validators.required],
      Area: ['', Validators.required],
      Quantity: [''],
      // Type: ['', Validators.required],
      Pincode: ['', Validators.required]      
    });
    this.serviceId = navParams.get("id");   
    this.getService();
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        //this.nav.setRoot(ServicesPage);
        this.navCtrl.push(ServicesHomePage, {
          id: this.serviceId
        });
      });
 });
 this.getAdmin()
 if (params.get('selectedAddress')) {
  this.request = navParams.get('selectedAddress')  
  // this.request =  JSON.stringify(this.selectedAddress)
 }
 //this.getPincodes();
  }

  getAdmin() {
    this.airconeProvider.getAdmin()
    .then( data => {
      this.adminDetails = data
    })
  }

  // addAddress() {
  //   let addressForm = this.modalCtrl.create(ViewAddress, {id: this.serviceId});
  //   addressForm.present();
  // }

  addAddress() {
    let addressForm = this.modalCtrl.create(ManageAddressPage, {id: this.serviceId});
    addressForm.present();
  }

  ionViewDidLoad() {
  }

  sendRequest() {
   this.orderForm.value.Type = serviceType;
    var userData = JSON.parse(localStorage.getItem("userData"));
    var requestDetails = {
      service: this.service,
      user: userData,
      request: this.orderForm.value,
      status: 'ORDER_REQUESTED',
      assignedBy: userData.id,
      assignedTo:  this.adminDetails.id
    }
    this.airconeProvider.sendRequest(requestDetails)
    .then(res => {
      this.data = res;
      if (this.data.status == 200) {
        let alert = this.alertCtrl.create({
          title: 'Request Sent!',
          subTitle: 'Your Requests Succesfully Sent, We Will Contact You Soon!',
          buttons: ['OK']
        });
        alert.present();
      } else if ( this.data.status == 404) {
        let alert = this.alertCtrl.create({
          title: 'Request Cant!',
          subTitle: 'Sorry Service not available at your location!',
          buttons: ['OK']
        });
        alert.present();
      }

      this.orderForm.reset()      
    });
  }

  getService () {
    this.airconeProvider.getOneService(this.serviceId)
    .then(res => {
      this.service = res;
    })
  }


  goBack() {
    this.navCtrl.push(ServicesHomePage, {
      id: this.serviceId
    })
  }

  openType() {
    let TypeForm = this.modalCtrl.create(SendrequestModelPage, {id: this.serviceId});
    TypeForm.present();
  
  }

}
@Component({
  selector: 'page-sendrequest',
  templateUrl: 'sendrequestModel.html'
})
export class SendrequestModelPage {
  serviceId;
  service;
  subService;
  constructor(public navCtrl: NavController, navparams: NavParams, public viewCtrl: ViewController, public airconeProvider: AirconeProvider, params: NavParams) {
    this.serviceId = navparams.get("id"); 
    this.getService();
  }

  getService() {
    this.airconeProvider.getOneService(this.serviceId)
    .then(res => {
      this.service = res;
    })
  }

  sendSubServiceQuantity() {
    serviceType = this.service.subService
    this.viewCtrl.dismiss();  
  }

  goBack() {
    this.viewCtrl.dismiss();   
  }
}

var serviceType;

@Component({
  selector: 'page-address-home',
  templateUrl: 'addressLoad.html',
})
export class ViewAddress {
  oldAddress;
  serviceId;
 constructor(public navCtrl: NavController, navparams: NavParams, public viewCtrl: ViewController, public airconeProvider: AirconeProvider, params: NavParams) {
   this.loadAddresses();
   this.serviceId = navparams.get("id"); 
 }

 
 loadAddresses() {
  var userData = JSON.parse(localStorage.getItem("userData"));
    this.airconeProvider.getUserAddress(userData.id)
    .then(data => {
      this.oldAddress = data;
    })    
 }

 addAddress(address) {
   this.navCtrl.push(SendrequestPage, {selectedAddress: address, id: this.serviceId})
   this.viewCtrl.dismiss();   
 }

 dismiss() {
   this.viewCtrl.dismiss();
 }

}