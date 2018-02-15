import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { MechanicPage } from '../mechanic/mechanic';
import { MechHomePage } from '../mech-home/mech-home';
/**
 * Generated class for the RepairPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-repair',
  templateUrl: 'repair.html',
})
export class RepairPage {
  request;
  spares;
  toppings;
  finalSpare: any = [];
  finalCharge;
  finalSpareServiceCharge;
  service;
  getCompleted;
  finalService
  constructor(public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider, public alertCtrl: AlertController, public platform: Platform) {
    this.request = navParams.get("request")
    this.getCompleted = navParams.get("status")    
    this.getAllServiceSpares();
    this.getService();
    platform.registerBackButtonAction(() => {
      this.navCtrl.push(MechHomePage, {details: this.request, status: this.getCompleted})
    });
  }

  ionViewDidLoad() {
  }

  spareSelect(topping) {
    this.finalSpare = [];
    topping.forEach(top => {
      this.spares.forEach(spare => {
        if (top == spare.sparename) {
          spare.rate = 1
          this.finalSpare.push(spare);
        }
      });
    });
  }

  serviceSelect(topping) {
    this.finalService = [];
    topping.forEach(top => {
      this.service.subServicePrice.forEach(spare => {
        if (top.id == spare.id) {
          spare.rate = 1
          this.finalService.push(spare);
        }
      });
    });
  }

  removeSpare(spare) {
    this.finalService.splice(this.finalService.indexOf(spare),1)
  }

  removeService(service) {
    this.finalSpare.splice(this.finalSpare.indexOf(service),1)
  }

  getAllServiceSpares() {
    var serviceId = this.request.serviceId
    this.airconeProvider.getServiceSpares(serviceId)
    .then( data => {
      this.spares = data;
    })
  }

  getService() {
    this.airconeProvider.getOneService(this.request.serviceId)
    .then(res => {
      this.service = res;
    });
  }

  sendBudget() {

    var finalSparePrice = 0;
    this.finalSpare.forEach(spare => {
      finalSparePrice += spare.rate*spare.sparerate
    });

    var finalServicePrice = 0;
    this.finalService.forEach(service => {
      finalServicePrice += service.rate*service.Price
    });

    var finalCharge = finalSparePrice + finalServicePrice
    this.finalCharge = finalCharge

     this.finalSpareServiceCharge = {finalSparePrice: finalSparePrice, finalSpare: this.finalSpare, finalServicePrice: finalServicePrice, finalService: this.finalService, finalCharge: finalCharge }
     
    }
  
  closeRequest() {
    if (this.finalSpareServiceCharge && this.finalCharge) {
      this.airconeProvider.closeRequest(this.request.id, this.finalSpareServiceCharge)
      .then ( data => {
        this.navCtrl.push(MechanicPage, {status: this.getCompleted})
      })
    } else {
      let alert = this.alertCtrl.create({
        title: 'Set up Final Price!',
        subTitle: 'Please include atleast Service price!',
        buttons: ['OK']
      });
      alert.present();
    }

  }

  getSpareStatus() {
    if (this.finalSpareServiceCharge && this.finalCharge) {
      this.airconeProvider.getSpareStatus(this.request.id, this.finalSpareServiceCharge)
      .then ( data => {
        let alert = this.alertCtrl.create({
          title: 'Spares Sended!',
          subTitle: 'Spares List Is Successfully sended!',
          buttons: ['OK']
        });
        alert.present();    
      })
    } else {
      let alert = this.alertCtrl.create({
        title: 'Set up Final Price!',
        subTitle: 'Please include atleast Service price!',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  goBack() {
    this.navCtrl.push(MechHomePage, {details: this.request, status: this.getCompleted})
  }

}