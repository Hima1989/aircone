import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, MenuController } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { ServicesHomePage } from '../services-home/services-home';

/**
 * Generated class for the ServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

  public services: any = [];
  servicesHomePage: any = ServicesHomePage;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider, public app: App, public menu: MenuController) {
    this.loadServices();
    menu.enable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesPage');
  }

  loadServices() {
    this.airconeProvider.loadServices()
    .then(res => {
      this.services = res;
    });
  }

  clickService (service) {
    this.navCtrl.push(ServicesHomePage, {
      postValue: service
    });
  }

}
