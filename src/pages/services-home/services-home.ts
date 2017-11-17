import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides  } from 'ionic-angular';
import { ServicesPage } from '../services/services';
import { AirconeProvider } from '../../providers/aircone/aircone';


/**
 * Generated class for the ServicesHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services-home',
  templateUrl: 'services-home.html',
})
export class ServicesHomePage {

    service;
    @ViewChild(Slides) slides: Slides;
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider) {
    this.service = navParams.get("postValue");
    console.log(this.service)    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesHomePage');
  }

  goBack() {
    console.log("clicked")
    this.navCtrl.push(ServicesPage);
  }


}
