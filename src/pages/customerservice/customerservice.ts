import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { Toast } from '@ionic-native/toast';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider, private toast: Toast) {
  }

  ionViewDidLoad() {
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
      this.toast.show(`Thanks For Your Service, We Will Consider Your FeedBack!`, '5000', 'center').subscribe(
        toast => {
        }
      );
    });
    this.navCtrl.popToRoot()
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
  this.navCtrl.popToRoot()
}  

}
