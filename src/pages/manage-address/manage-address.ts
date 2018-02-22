import { Component } from '@angular/core';
import { IonicPage, NavController, App, Platform, NavParams, AlertController, ViewController, ModalController } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { SendrequestPage } from '../sendrequest/sendrequest';



import { AddaddressPage } from '../addaddress/addaddress';
import { HomePage } from '../home/home';



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
  noaddress: boolean = false;
  constructor(public app: App, public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public alertCtrl: AlertController, public airconeProvider: AirconeProvider, public modalCtrl: ModalController, public platform: Platform) {
    if (navParams.get("id")) {
      this.serviceId = navParams.get("id"); 
      this.forRequest = true;
    }
    if (navParams.get("forRequest")) {
      this.forRequest = true;
    }
    this.loadAddresses();
    platform.registerBackButtonAction(() => {
      if (this.forRequest) {
        this.navCtrl.push(SendrequestPage, {id: this.serviceId})  
      } else {
        this.navCtrl.setRoot(HomePage).then(() =>{
          this.navCtrl.popToRoot();
        });
      }
  }); 
  }

  ionViewDidLoad() {
  }

  goBackToRequest() {
      this.navCtrl.push(SendrequestPage, {id: this.serviceId})  
  }

  addAddress() {
    this.navCtrl.push(AddaddressPage)
  }

   loadAddresses() {
    var userData = JSON.parse(localStorage.getItem("userData"));
      this.airconeProvider.getUserAddress(userData.id)
      .then(data => {
        this.oldAddress = data;
        if(this.oldAddress.length === 0) {
          this.noaddress = true;
        }       
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
    this.navCtrl.push(AddaddressPage, {userAddress: address, forRequest: this.forRequest, id: this.serviceId})
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
    this.navCtrl.setRoot(HomePage).then(() =>{
      this.navCtrl.popToRoot();
    });
  }
 

}
