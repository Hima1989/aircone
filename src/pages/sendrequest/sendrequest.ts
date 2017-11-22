import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider, private formBuilder: FormBuilder, public alertCtrl: AlertController) {
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
    this.serviceId = navParams.get("id");   
    this.getService()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendrequestPage');
  }

  sendRequest() {
  //  console.log(this.orderForm.value)
    this.orderForm.reset()
    var userData = JSON.parse(localStorage.getItem("userData"));
    var requestDetails = {
      service: this.service,
      user: userData,
      request: this.orderForm.value
    }
    this.airconeProvider.sendRequest(requestDetails)
    .then(res => {
      console.log(res)
      let alert = this.alertCtrl.create({
        title: 'Request Sent!',
        subTitle: 'Your Requests Succesfully Sent, We Will Contact You Soon!',
        buttons: ['OK']
      });
      alert.present();
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
}
