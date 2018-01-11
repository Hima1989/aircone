import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, ModalController, ToastController } from 'ionic-angular';
import { ServicesHomePage } from '../services-home/services-home';
import { AirconeProvider } from '../../providers/aircone/aircone';
import {Validators, FormBuilder } from '@angular/forms';
import { ManageAddressPage } from '../manage-address/manage-address';
import { ServicesPage } from '../services/services';

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
  type: any = [];
  subService:any = {type: "", ton: "", quantity: ""};

  constructor(private toastCtrl: ToastController, public platform: Platform, params: NavParams, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider, private formBuilder: FormBuilder, public alertCtrl: AlertController) {
    this.orderForm  = this.formBuilder.group({
      Name: ['', Validators.required],
      City: ['', Validators.required],
      Phone: ['', Validators.required],
      AltPhone: ['', Validators.required],
      Door: ['', Validators.required],
      Street: ['', Validators.required],
      Area: ['', Validators.required],
      Quantity: [''],
      subService:[''],
      serviceTon:[''],
      serviceQuantity:[''],
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

  checkForPin(event) {
  var patt = new RegExp("^[1-9][0-9]{5}$");
  var res = patt.test(event)
    if (res) {
      this.airconeProvider.getUserPincode(event)
      .then( res => {
        this.data = res;
        if (this.data.status == 200) {
              let toast = this.toastCtrl.create({
              message: 'Location Available',
              duration: 4000,
              position: 'bottom'
              });
              toast.present();
        } else if (this.data.status == 404) {
          let toast = this.toastCtrl.create({
            message: 'Location Not Available',
            duration: 10000,
            position: 'bottom'
            });
            toast.present();
        }
      })
    }
  }

  // addAddress() {
  //   let addressForm = this.modalCtrl.create(ViewAddress, {id: this.serviceId});
  //   addressForm.present();
  // }

  addAddress() {
    let addressForm = this.modalCtrl.create(ManageAddressPage, {id: this.serviceId});
    addressForm.present();
  }

  addQuantity() {
    if (this.subService.type == '' && this.subService.ton == '' && this.subService.quantity == '') {
      let toast = this.toastCtrl.create({
        message: 'Please Enter Type Of Service and Quantity',
        duration: 4000,
        position: 'bottom'
        });
        toast.present();
    } else {
      this.type.push(this.subService);
      this.subService = {type: "", ton: "", quantity: ""};
    }

  }

  removeQuantity(serviceType) {
    this.type.splice(this.type.indexOf(serviceType), 1)
    console.log(this.type)
  }

  ionViewDidLoad() {
  }

  sendRequest() {
    if (this.type.length > 0 && this.type[0].quantity != '') {
      
   this.orderForm.value.Type = this.type;
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
          buttons: [{text: 'OK', 
          handler: () => {
          this.navCtrl.push(ServicesPage)
    }}]
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
  } else {
    let toast = this.toastCtrl.create({
      message: 'Please Enter Type Of Service and Quantity',
      duration: 8000,
      position: 'bottom'
      });
      toast.present();
  }
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

