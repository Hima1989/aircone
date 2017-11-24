import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';

/**
 * Generated class for the StatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {

  request;
  rate;
  constructor(public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider) {
    this.request = navParams.get("request")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
  }

  cancelRequest(){
    console.log(this.request)   
    this.airconeProvider.cancelRequest(this.request.id)
    .then(res => {
      console.log(res)
    })
  }

  onModelChange(forms1) {
    console.log(forms1)
  }

}
