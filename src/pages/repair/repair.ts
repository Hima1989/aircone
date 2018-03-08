import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { MechanicPage } from '../mechanic/mechanic';
import { MechHomePage } from '../mech-home/mech-home';
import { Toast } from '@ionic-native/toast';

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
  finalService;
  comment;
  showComment: boolean = false;
  extraSpare: any = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider, public alertCtrl: AlertController, public platform: Platform, private toast: Toast) {
    this.request = navParams.get("request")
    // this.finalSpare = this.request.finalSpare
    // this.finalService = this.request.finalService    
    // this.finalCharge = this.request.finalCharge
        if(this.request.finalSpare !== undefined) {  
        this.finalSpare = this.request.finalSpare
    }
    if(this.request.finalService !== undefined) {
      this.finalService = this.request.finalService          
    }
    if (this.request.finalCharge) {
      this.finalCharge = this.request.finalCharge      
    }
    this.getCompleted = navParams.get("status")    
    this.getAllServiceSpares();
    this.getService();
    platform.registerBackButtonAction(() => {
      this.navCtrl.push(MechHomePage, {details: this.request, status: this.getCompleted})
    });
  }

  ionViewDidLoad() {
  }

  showSpareComment() {
    // if (this.showComment === false) {
    this.showComment = true;
    // } else {
    //   this.showComment = false;
    // }
    if(this.comment) {
      this.extraSpare.push(this.comment)      
      this.comment = ''
    }
  }

  removeEctraSpare(ext) {
    this.extraSpare.splice(this.extraSpare.indexOf(ext), 1)
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
    this.finalSpare.splice(this.finalSpare.indexOf(spare),1)    
  }

  removeService(service) {
    this.finalService.splice(this.finalService.indexOf(service),1)    
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
    if (this.finalSpare) {
      this.finalSpare.forEach(spare => {
        finalSparePrice += spare.rate*spare.sparerate
      });
    }


    var finalServicePrice = 0;
    if (this.finalService) {
      this.finalService.forEach(service => {
        finalServicePrice += service.rate*service.Price
      });
    }


    var finalCharge = finalSparePrice + finalServicePrice
    this.finalCharge = finalCharge

    // if(!this.comment) {
    //   this.comment = "empty list"
    // }

     this.finalSpareServiceCharge = {finalSparePrice: finalSparePrice, finalSpare: this.finalSpare, finalServicePrice: finalServicePrice, finalService: this.finalService, finalCharge: finalCharge, extras: this.extraSpare }
    }
  
  closeRequest() {
    if (this.finalSpareServiceCharge && this.finalCharge) {
      this.airconeProvider.closeRequest(this.request.id, this.finalSpareServiceCharge)
      .then ( data => {
        this.navCtrl.push(MechanicPage, {status: this.getCompleted})
                this.toast.show(`Thanx for using our service`, '3000', 'top').subscribe(
          toast => {
          }
        );  
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