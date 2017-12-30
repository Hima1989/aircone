import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { ServicesPage } from '../services/services';
import { RequestslistPage } from '../requestslist/requestslist';

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
  requested;
  closed;
  approved
  gsmile: any = {gs1: 's', gs2: 's', gs3: 's', gs4: 's', gs5: 's'}
  lsmile: any = {ls1: '', ls2: '', ls3: '', ls4: '', ls5: ''}
  constructor(public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider) {
    this.request = navParams.get("request")
    console.log(this.request.status)
    if (this.request.status == 'ORDER_REQUESTED') {
      this.requested = 'requested';
    }
    if (this.request.status == 'ORDER_CLOSED') {
      this.closed = 'closed';
    }
    if (this.request.status == 'ORDER_APPROVED') {
      this.approved = 'approved';
    }
  }

  ionViewDidLoad() {
  }

   smileyAdd(isSmile) {
     this.rate = isSmile;
     console.log(isSmile)
     if (isSmile == 1) {
       this.lsmile = {ls1: undefined, ls2: 's', ls3: 's', ls4: 's', ls5: 's'}
       this.gsmile = {gs1: 's', gs2: undefined, gs3: undefined, gs4: undefined, gs5: undefined}
     }
     if (isSmile == 2) {
      this.lsmile = {ls1: 's', ls2: undefined, ls3: 's', ls4: 's', ls5: 's'}
      this.gsmile = {gs1: undefined, gs2: 's', gs3: undefined, gs4: undefined, gs5: undefined}
     }
     if (isSmile == 3) {
      this.lsmile = {ls1: 's', ls2: 's', ls3: undefined, ls4: 's', ls5: 's'}
      this.gsmile = {gs1: undefined, gs2: undefined, gs3: 's', gs4: undefined, gs5: undefined}
     }
     if (isSmile == 4) {
      this.lsmile = {ls1: 's', ls2: 's', ls3: 's', ls4: undefined, ls5: 's'}
      this.gsmile = {gs1: undefined, gs2: undefined, gs3: undefined, gs4: 's', gs5: undefined}
     }
     if (isSmile == 5) {
      this.lsmile = {ls1: 's', ls2: 's', ls3: 's', ls4: 's', ls5: undefined}
      this.gsmile = {gs1: undefined, gs2: undefined, gs3: undefined, gs4: undefined, gs5: 's'}
     }
   }

   reSmileyAdd(isSmile) {
    this.rate = isSmile;    
    if (isSmile == 1) {
      this.lsmile = {ls1: undefined, ls2: 's', ls3: 's', ls4: 's', ls5: 's'}
      this.gsmile = {gs1: 's', gs2: undefined, gs3: undefined, gs4: undefined, gs5: undefined}
    }
    if (isSmile == 2) {
      this.lsmile = {ls1: 's', ls2: undefined, ls3: 's', ls4: 's', ls5: 's'}
      this.gsmile = {gs1: undefined, gs2: 's', gs3: undefined, gs4: undefined, gs5: undefined}
     }
     if (isSmile == 3) {
      this.lsmile = {ls1: 's', ls2: 's', ls3: undefined, ls4: 's', ls5: 's'}
      this.gsmile = {gs1: undefined, gs2: undefined, gs3: 's', gs4: undefined, gs5: undefined}
     }
     if (isSmile == 4) {
      this.lsmile = {ls1: 's', ls2: 's', ls3: 's', ls4: undefined, ls5: 's'}
      this.gsmile = {gs1: undefined, gs2: undefined, gs3: undefined, gs4: 's', gs5: undefined}
     }
     if (isSmile == 5) {
      this.lsmile = {ls1: 's', ls2: 's', ls3: 's', ls4: 's', ls5: undefined}
      this.gsmile = {gs1: undefined, gs2: undefined, gs3: undefined, gs4: undefined, gs5: 's'}
     }
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
    var userData = JSON.parse(localStorage.getItem("userData"));    
    var commentRating = {
      commentText: this.comment,
      rating: this.rate,
      user: {userId: userData.id, userName: userData.firstName, picture: userData.profilePicture}
    }
    console.log(commentRating)
    this.airconeProvider.submitCommentRating(commentRating)
    .then(res => {
      this.comment = '';
      this.rate = 0;
      this.navCtrl.push(ServicesPage);
    })
  }
  goBack() {
    this.navCtrl.push(RequestslistPage)
  }
  
}
