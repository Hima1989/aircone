import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { StatusPage } from '../status/status';

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
  }

  loadRequests() {
    var userData = JSON.parse(localStorage.getItem("userData"))
    this.airconeProvider.loadRequests(userData.id)
    .then(res => {
      this.requests = res;
    })
  }

  goToStatus(request) {
    this.navCtrl.push(StatusPage, {request: request})
  }
    goBack() {
      this.navCtrl.popToRoot()
    }

  delete(request) {
  //  console.log(request)
    this.airconeProvider.deleteRequests(request.id)
    .then(res => {
      this.requests.splice(this.requests.indexOf(request),1)
    })
  }
}
