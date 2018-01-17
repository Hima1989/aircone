import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { ServicesPage } from '../services/services';
import { HomePage } from '../home/home';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider, public alertCtrl: AlertController,private toast: Toast) {
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
      let alert = this.alertCtrl.create({
        title: 'Request Sent!',
        subTitle: 'Thanks For Your Service, We Will Consider Your FeedBack!',
        buttons: ['OK']
      });
      alert.present();
    });
    this.navCtrl.push(ServicesPage)
  } else {
    this.presentToast()
  }
}
presentToast() {
    this.toast.show(`Please Enter Comment`, '5000', 'center').subscribe(
  toast => {
    console.log(toast);
  }
);
  }

goBack() {
      this.navCtrl.push(HomePage)
  }  

  
    // let toast = this.toastCtrl.create({
    //   message: 'Please Enter Comment',
    //   duration: 2000,
    //   position: 'middle'
    // });  
    // toast.present();


}
