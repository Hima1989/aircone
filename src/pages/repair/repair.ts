import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  spareRate;
  spare;
  spareTotalPrice;
  serviceRate;
  finalCharge;
  service;
  serviceRateQuantity;
  constructor(public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider, public alertCtrl: AlertController) {
    this.request = navParams.get("request")
    this.getAllServiceSpares();
    this.getService();
  }

  ionViewDidLoad() {
  }

  spareSelect(topping) {
    topping.forEach(top => {
      this.spares.forEach(spare => {
        if (top == spare.sparename) {
          this.finalSpare.push(spare);
        }
      });
    });
  }

  removeSpare(spare) {
    this.finalSpare.splice(this.finalSpare.indexOf(spare),1)
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
    // console.log(this.serviceRate)
    var finalPrice = 0;
    this.finalSpare.forEach(spare => {
      finalPrice += spare.rate*spare.sparerate
    });

        // if (finalPrice) {
        //   finalPrice = finalPrice + this.serviceRate.Price*this.serviceRateQuantity     
        // } else {
        //   finalPrice = this.serviceRate.Price*this.serviceRateQuantity
        // }

        if(this.serviceRate) {
          this.spareTotalPrice = finalPrice + this.serviceRate.Price*this.serviceRateQuantity   
        } else {
          this.spareTotalPrice = finalPrice
        }

    // this.spareTotalPrice = finalPrice;  
     this.finalCharge = {spareInfo: this.finalSpare, finalServicePrice: this.spareTotalPrice, service: this.serviceRate}
        console.log(this.finalCharge)
    }
  
  closeRequest() {
    if (this.finalCharge.finalServicePrice > 0) {
      this.airconeProvider.closeRequest(this.request.id, this.finalCharge)
      .then ( data => {
        this.navCtrl.push(MechanicPage)
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
    this.navCtrl.push(MechHomePage, {details: this.request})
  }

}
