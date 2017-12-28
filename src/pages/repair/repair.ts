import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider) {
    this.request = navParams.get("request")
    this.getAllServiceSpares();
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

  sendBudget() {
    var finalPrice = 0;
    this.finalSpare.forEach(spare => {
      finalPrice += spare.rate*spare.sparerate
    });
    if (finalPrice) {
      finalPrice = finalPrice + parseInt(this.serviceRate)       
    } else {
      finalPrice = parseInt(this.serviceRate)
    }
    this.spareTotalPrice = finalPrice;  
    console.log(this.spareTotalPrice) 
     this.finalCharge = {spareInfo: this.finalSpare, finalServicePrice: this.spareTotalPrice}
     console.log(this.finalCharge)     
  }
  
  closeRequest() {
    this.airconeProvider.closeRequest(this.request.id, this.finalCharge)
    .then ( data => {
      console.log(data)
    })
  }

}
