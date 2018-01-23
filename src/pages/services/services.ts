import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, MenuController, Platform } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { ServicesHomePage } from '../services-home/services-home';
import { Toast } from '@ionic-native/toast';

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
  
  
  constructor(private toast: Toast, public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider, public app: App, public menu: MenuController) {
    this.loadServices();
    menu.enable(true)
  
    platform.registerBackButtonAction(() => {
      if (this.backButtonPressed) {
        this.platform.exitApp();
      } else {
        this.presentToast();
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

  presentToast() {
    this.toast.show('Double Click To Exit', '5000', 'center').subscribe(
                  toast => {
                    console.log(toast);
                  }
                );
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
