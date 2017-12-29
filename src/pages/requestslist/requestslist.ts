import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider) {
    this.loadRequests()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestslistPage');
  }

  loadRequests() {
    var userData = JSON.parse(localStorage.getItem("userData"))
    this.airconeProvider.loadRequests(userData.id)
    .then(res => {
      this.requests = res;
      console.log(this.requests)
    })
  }

  goToStatus(request) {
    this.navCtrl.push(StatusPage, {request: request})
  }
    goBack() {
    this.navCtrl.push(HomePage)
  }
}
