import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { MechHomePage } from '../mech-home/mech-home'
/**
 * Generated class for the MechanicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mechanic',
  templateUrl: 'mechanic.html',
})
export class MechanicPage {

  public mechRequests: any
  public showRequest: boolean = false;
  public showComment: boolean = true;
  role;
  constructor(public navCtrl: NavController, public navParams: NavParams, private airconeProvider: AirconeProvider) {
    this.getMechanicRequestList();
    // if (localStorage.getItem("userData")) {
    //   var userDetails  = JSON.parse(localStorage.getItem("userData"));
    //   // this.role = userDetails.role[0];
    //   // console.log(this.role)
    //   if (userDetails.role[0] == 'USER') {
    //     this.role = false;
        
    //   }
    // }

  }

  ionViewDidLoad() {
  }

  getMechanicRequestList() {
    var userData = JSON.parse(localStorage.getItem('userData'))
    this.airconeProvider.getMechanicRequests(userData.id)
    .then(data => {
      this.mechRequests = data;
      if (this.mechRequests.length > 0) {
        this.showRequest = true;
        this.showComment = false;
      }
    })
  }

  goToRequest(request) {
    this.navCtrl.push(MechHomePage, {details: request});
  }

}
