import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { MechHomePage } from '../mech-home/mech-home';
import { Toast } from '@ionic-native/toast';
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
  constructor(private toast: Toast, public navCtrl: NavController, public navParams: NavParams, private airconeProvider: AirconeProvider, public menu: MenuController, public platform: Platform) {
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
        this.toast.show(`Press again to exit airTech`, '4000', 'bottom').subscribe(
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
    
    if (this.getCompleted == false) {
      var userData = JSON.parse(localStorage.getItem('userData'))
      this.airconeProvider.getMechanicRequests(userData.id)
      .then(data => {
        this.mechRequests = data;
        if (this.mechRequests.length > 0) {
          this.showRequest = true;
          this.showComment = false;
        }
      })
    } else if(this.getCompleted == true) {  
      var userDataa = JSON.parse(localStorage.getItem('userData'))
      this.airconeProvider.getMechanicCompletedRequests(userDataa.id)
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
