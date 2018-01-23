import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RepairPage } from '../repair/repair';
import { MechanicPage } from '../mechanic/mechanic';
/**
 * Generated class for the MechHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mech-home',
  templateUrl: 'mech-home.html',
})
export class MechHomePage {

  request;
  serviceInfo;
  userRequest;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (navParams.get("details")) {
      this.request = navParams.get("details")  
      this.serviceInfo = this.request;
      this.userRequest = this.request.request;   
      console.log(this.request.spareInfo) 
    }

  }

  ionViewDidLoad() {
  }

  startService() {
    this.navCtrl.push(RepairPage, {request: this.request})
  }

  goBack() {
    this.navCtrl.push(MechanicPage)
  }



}
