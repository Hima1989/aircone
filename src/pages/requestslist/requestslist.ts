import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { StatusPage } from '../status/status';
import { HomePage } from '../home/home';

/**
 * Generated class for the RequestslistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-requestslist',
  templateUrl: 'requestslist.html',
})
export class RequestslistPage {

  requests;

  constructor(public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider, public platform: Platform) {
    this.loadRequests()
    platform.registerBackButtonAction(() => {
      this.navCtrl.setRoot(HomePage).then(() =>{
        this.navCtrl.popToRoot();
      });
    });  
  }

  ionViewDidLoad() {
  }

  loadRequests() {
    var userData = JSON.parse(localStorage.getItem("userData"))
    this.airconeProvider.loadRequests(userData.id)
    .then(res => {
      this.requests = res;
    })
  }

  goToStatus(request) {
    if(request.status != 'ORDER_CANCELLED'){
      this.navCtrl.push(StatusPage, {request: request})
    }
   
  }
    goBack() {
      this.navCtrl.setRoot(HomePage).then(() =>{
        this.navCtrl.popToRoot();
      });
    }

  delete(request) {
  //  console.log(request)
    this.airconeProvider.deleteRequests(request.id)
    .then(res => {
      this.requests.splice(this.requests.indexOf(request),1)
    })
  }
}
