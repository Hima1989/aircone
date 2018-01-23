import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, MenuController, Platform, ToastController } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { ServicesHomePage } from '../services-home/services-home';
import { HomePage } from '../home/home';

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
  
  
  constructor(private toastCtrl: ToastController, public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider, public app: App, public menu: MenuController) {
    this.loadServices();
    menu.enable(true)
    
    platform.registerBackButtonAction(() => {
      if(menu.isOpen != null) {   
        // console.log(menu.isOpen)
        console.log(menu.isOpen)        
        menu.close()
      }
      if (!menu.isOpen) {
        this.navCtrl.push(HomePage)                
      }
      
    });    
   
  }

  ionOpen() {
    console.log("hitted")
    this.platform.registerBackButtonAction(() => {
      this.menu.close()
    }); 
  }

  

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Double Click To Exit',
      duration: 3000,
      position: 'bottom'
    });
  
    // toast.onDidDismiss(() => {
    //   console.log('Dismissed toast');
    // });
  
    toast.present();
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
