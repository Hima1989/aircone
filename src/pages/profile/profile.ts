import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesPage } from '../services/services';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public userDetails;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getUserDetails()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  goBack() {
    this.navCtrl.push(ServicesPage);    
  }

  getUserDetails() {
  var  userData = localStorage.getItem('userData');
   this.userDetails = JSON.parse(userData);
  }

}
