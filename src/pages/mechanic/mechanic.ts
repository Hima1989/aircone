import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { MechHomePage } from '../mech-home/mech-home';
import { Toast } from '@ionic-native/toast';
import { StatusBar } from '@ionic-native/status-bar';

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
  getCompleted: boolean = false;
  backButtonPressed: boolean
  backButtonPressedTimer;
  constructor(private statusBar:StatusBar, private toast: Toast, public navCtrl: NavController, public navParams: NavParams, private airconeProvider: AirconeProvider, public menu: MenuController, public platform: Platform) {
    this.menu.enable(false, 'user');
    this.menu.enable(true, 'mech');
    if (navParams.get("status")) {
      this.getCompleted = navParams.get("status");
    }
    this.getMechanicRequestList();
    platform.registerBackButtonAction(() => {
      if (this.backButtonPressed) {
        this.platform.exitApp();
      } else {
        this.toast.show(`Press again to exit aer Tech`, '4000', 'bottom').subscribe(
          toast => {
          }
        );
        this.backButtonPressed = true;
        if (this.backButtonPressedTimer) {
          clearTimeout(this.backButtonPressedTimer);
        }
        this.backButtonPressedTimer = setTimeout(() => {
          this.backButtonPressed = false
        }, 4000);
      }
      this.menu.close()    
    });

  }

  ionViewDidLoad() {
    this.statusBar.backgroundColorByHexString('#dedede');
  }


  getMechanicRequestList() {
    var userData = JSON.parse(localStorage.getItem('userData'))
    if (this.getCompleted == false && userData) {
      this.airconeProvider.getMechanicRequests(userData.id)
      .then(data => {
        this.mechRequests = data;
        if (this.mechRequests.length > 0) {
          this.showRequest = true;
          this.showComment = false;
        }
      })
    } else if(this.getCompleted == true && userData) {  
      this.airconeProvider.getMechanicCompletedRequests(userData.id)
      .then(data => {
        this.mechRequests = data;
        if (this.mechRequests.length > 0) {
          this.showRequest = true;
          this.showComment = false;
        }
      })
    }
  }

  goToRequest(request) {
    this.navCtrl.push(MechHomePage, {details: request, status: this.getCompleted});
  }

}
