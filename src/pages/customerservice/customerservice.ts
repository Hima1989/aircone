import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
// import { ServicesHomePage } from '../services-home/services-home';

/**
 * Generated class for the CustomerservicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customerservice',
  templateUrl: 'customerservice.html',
})
export class CustomerservicePage {

  comment;

  constructor(public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
  }

  servicesubmit(){
    console.log(this.comment)
    var userData = JSON.parse(localStorage.getItem("userData"));
    var requestDetails = {
      user: userData,
      comment: this.comment   
    }
    console.log(requestDetails)
    this.airconeProvider.sendFeedback(requestDetails)
    .then(res => {
      let alert = this.alertCtrl.create({
        title: 'Request Sent!',
        subTitle: 'Your Requests Succesfully Sent, We Will Contact You Soon!',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  //   goBack() {
  //   this.navCtrl.push(ServicesHomePage {
  //     id: this.serviceId
  //   })
  // }  

}
