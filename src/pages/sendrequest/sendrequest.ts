import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { ServicesHomePage } from '../services-home/services-home';
import { AirconeProvider } from '../../providers/aircone/aircone';
import {Validators, FormBuilder } from '@angular/forms';

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

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider, private formBuilder: FormBuilder, public alertCtrl: AlertController) {
    this.orderForm  = this.formBuilder.group({
      Name: ['', Validators.required],
      City: ['', Validators.required],
      Phone: ['', Validators.required],
      AltPhone: ['', Validators.required],
      Door: ['', Validators.required],
      Street: ['', Validators.required],
      Area: ['', Validators.required],
      Quantity: [''],
      Type: ['', Validators.required],
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
 //this.getPincodes();
  }

  getAdmin() {
    this.airconeProvider.getAdmin()
    .then( data => {
      this.adminDetails = data
    })
  }


  ionViewDidLoad() {
  }

  sendRequest() {
   //console.log(this.orderForm.value)
    //this.orderForm.reset()
    var userData = JSON.parse(localStorage.getItem("userData"));
    var requestDetails = {
      service: this.service,
      user: userData,
      request: this.orderForm.value,
      status: 'ORDER_REQUESTED',
      assignedBy: userData.id,
      assignedTo:  this.adminDetails.id
    }
    console.log(requestDetails)
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

  // getPincodes() {
  //   this.airconeProvider.getAllPincodes()
  //   .then(res => {
  //     this.pincodes = res;
  //     console.log(this.pincodes)
  //   })
  // }

  // pinchange(ev: any){
  //   let val = ev;
  //   //val = JSON.stringify(val)
  //    if (val) {
  //     this.pincodes.forEach(pin => {
  //       console.log(pin.pincode)
  //       console.log(val)
  //       if (val === pin.pincode) {
  //         console.log("ok")
  //       } else {
  //         console.log("notok")
  //       }
  //     });
  //    }

  // }

  goBack() {
    this.navCtrl.push(ServicesHomePage, {
      id: this.serviceId
    })
  }
}
@Component({
  selector: 'page-sendrequest',
  templateUrl: 'sendrequestModel.html'
})
export class SendrequestModelPage {

}