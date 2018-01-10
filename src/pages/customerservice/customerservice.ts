import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { ServicesPage } from '../services/services'
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

  constructor(private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider, public alertCtrl: AlertController) {
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

  //   goBack() {
  //   this.navCtrl.push(ServicesHomePage {
  //     id: this.serviceId
  //   })
  // }  

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Please Enter Comment',
      duration: 3000,
      position: 'bottom'
    });
  
    // toast.onDidDismiss(() => {
    //   console.log('Dismissed toast');
    // });
  
    toast.present();
  }

}
