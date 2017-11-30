import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { ServicesPage } from '../services/services'

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
  comment;
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

  onModelChange(rate) {
  }

  submitComment() {
    console.log(this.comment)
    console.log(this.rate)
    var userData = JSON.parse(localStorage.getItem("userData"));    
    var commentRating = {
      commentText: this.comment,
      rating: this.rate,
      user: {userId: userData.id, userName: userData.firstName, picture: userData.profilePicture}
    }
    this.airconeProvider.submitCommentRating(commentRating)
    .then(res => {
      console.log(res)
      this.comment = '';
      this.rate = 0;
      this.navCtrl.push(ServicesPage);
    })
  }

}
