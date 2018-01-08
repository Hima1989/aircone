import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, MenuController, Platform } from 'ionic-angular';
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

  // public services: any = [{images:"assets/images/services-home1.png",serviceName:"Air Conditioner"},{images:"assets/images/services-home2.png",serviceName:"refregirator"},{images:"assets/images/services-home3.png",serviceName:"Microvowen"},{images:"assets/images/services-home4.png",serviceName:"Washing Mechine"}];
  public services: any = [];
  servicesHomePage: any = ServicesHomePage;
  backButtonPressed: boolean;
  backButtonPressedTimer;
  
  
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider, public app: App, public menu: MenuController) {
    this.loadServices();
    menu.enable(true);
    var i = 0;
    // platform.registerBackButtonAction(() => {
    //   i++;
    //    if (i == 2) {
    //     platform.exitApp(); // IF IT'S THE ROOT, EXIT THE APP.        
    //    } else {
    //      alert("double tap to exit the app")      
    //    }
      
    // });

    platform.registerBackButtonAction(() => {
      if (this.backButtonPressed) {
        this.platform.exitApp();
      } else {
        // this.toastCtrl.('Press again to exit App');
        window.alert('Press again to exit')
        this.backButtonPressed = true;
        if (this.backButtonPressedTimer) {
          clearTimeout(this.backButtonPressedTimer);
        }
        this.backButtonPressedTimer = setTimeout(() => {
          this.backButtonPressed = false
        }, 4000);
      }
      
    });


  }

  ionViewDidLoad() {
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
