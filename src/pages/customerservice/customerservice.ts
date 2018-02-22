import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { Toast } from '@ionic-native/toast';
import { HomePage } from '../home/home';
import { CallNumber } from '@ionic-native/call-number';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider, private toast: Toast, public platform: Platform, private callNumber: CallNumber) {
    platform.registerBackButtonAction(() => {
      this.navCtrl.setRoot(HomePage).then(() =>{
        this.navCtrl.popToRoot();
      });
    }); 
  }

  ionViewDidLoad() {
  }

  callAdminNumber() {
    this.callNumber.callNumber("9705931593", true)
    .then(() => {})
    .catch(() => {});
  }

  servicesubmit(){
    if (this.comment) {
    var userData = JSON.parse(localStorage.getItem("userData"));
    var requestDetails = {
      user: userData,
      comment: this.comment   
    }
    this.airconeProvider.sendFeedback(requestDetails)
    .then(res => {
      this.toast.show(`Thank You, We Will Consider Your FeedBack!`, '5000', 'center').subscribe(
        toast => {
        }
      );
    });
    this.navCtrl.setRoot(HomePage).then(() =>{
      this.navCtrl.popToRoot();
    });
  } else {
    this.presentToast()
  }
}
presentToast() {
    this.toast.show(`Please Enter Comment`, '5000', 'center').subscribe(
  toast => {
  }
);
  }

goBack() {
  this.navCtrl.setRoot(HomePage).then(() =>{
    this.navCtrl.popToRoot();
  });
}  

}
