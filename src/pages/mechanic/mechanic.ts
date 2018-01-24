import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
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
  getCompleted: boolean = false
  constructor(public navCtrl: NavController, public navParams: NavParams, private airconeProvider: AirconeProvider, public menu: MenuController) {
    this.menu.enable(false, 'user');
    this.menu.enable(true, 'mech');
    if (navParams.get("status")) {
      this.getCompleted = navParams.get("status");
    }
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



// import {Validators, FormBuilder } from '@angular/forms';
// import { Toast } from '@ionic-native/toast';
// @Component({
//   selector: 'changePassword-page-mechanic',
//   templateUrl: 'changePassword.html',
// })
// export class ChangePasswordPage {

//   orderForm;
//   userDetails: any = {email: '', oldPass: '', newPass: '',ReNewPass: ''}

//   constructor(private toast: Toast, public navCtrl: NavController, public navParams: NavParams, private airconeProvider: AirconeProvider, private formBuilder: FormBuilder) {
//     this.getUserDetails();
//     this.orderForm = this.formBuilder.group({
//       email: ['', Validators.required],
//       oldPass: ['', Validators.required],
//       newPass: ['', Validators.required],
//       ReNewPass: ['', Validators.required],
//     })
//   }

//   goBack() {

//   }

//   getUserDetails() {
//     var  userData = localStorage.getItem('userData');
//      var user = JSON.parse(userData);
//      this.airconeProvider.loaduser(user.id)
//      .then(data => {
//        this.userDetails = data;
//      })
//   }

//   submitDetails() {
//     var pass = this.orderForm.value
//     var  userData = localStorage.getItem('userData');
//     var user = JSON.parse(userData);
//     if (pass.newPass == pass.oldPass) {
//       this.airconeProvider.changePassword(user.id, pass)
//       .then(data => {
//         // this.userDetails = data;
//         console.log(data)
//       })   
//     } else {
//       this.toast.show(`Old and New password not equal`, '3000', 'center').subscribe(
//         toast => {
//         })
//     }
//     console.log(this.orderForm.value)
//   }
// }
