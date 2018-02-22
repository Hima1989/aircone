import { Component,ViewChild } from '@angular/core';
import { Platform, Nav, IonicPage, NavController, NavParams, Slides, LoadingController, ModalController, ViewController } from 'ionic-angular';
import { ServicesPage } from '../services/services';
import { AirconeProvider } from '../../providers/aircone/aircone';
import { SendrequestPage } from '../sendrequest/sendrequest';


// import { ImageViewerController } from "ionic-img-viewer";


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

    oneService;
    serviceId;
    public service = {};
    @ViewChild(Slides) slides: Slides;
    @ViewChild(Nav) nav;
    
  constructor(public loadingCtrl: LoadingController, public viewCtrl: ViewController, public platform: Platform, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public airconeProvider: AirconeProvider) {
    this.oneService = navParams.get("postValue");
    this.serviceId = navParams.get("id");    
    this.getService()
    // this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        this.navCtrl.push(ServicesPage);
      });
      
//  });
// this.presentLoadingCustom();
  }
  // onClick(imageToView) {
  //   const viewer = this.imageViewerCtrl.create(imageToView)
  //   viewer.present();
  // }

  ionViewDidLoad() {
    // this.slides.lockSwipes(true)
  }


  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box"></div>
        </div>`,
      duration: 5000
    });
  
    loading.present();
  }

  presentProfileModal() {
    var id;
    if(this.oneService) {
       id = this.oneService.id;      
    } else {
       id = this.serviceId;      
    }
    let profileModal = this.modalCtrl.create(Profile, { serviceId: id });
    profileModal.present();
  }

  getService() {
    var id;
    if(this.oneService) {
       id = this.oneService.id;      
    } else {
       id = this.serviceId;      
    }
    this.airconeProvider.getOneService(id)
    .then(res => {
      this.service = res;
    });
  }

  goBack() {
    this.navCtrl.push(ServicesPage);
    //this.navCtrl.pop()
  }

  sendRequest(id) {
    this.navCtrl.push(SendrequestPage, {
      id: id
    });    
  }


}

@Component({
  selector: 'page-services-home',
  templateUrl: 'services-model.html',
})
export class Profile {
  @ViewChild(Slides) slides: Slides;
  serviceId;
  service = {};
 constructor(public viewCtrl: ViewController, public platform: Platform, public airconeProvider: AirconeProvider, params: NavParams) {
   this.serviceId = params.get('serviceId')
   this.getService();
  //  this.platform.ready().then(() => {
    this.platform.registerBackButtonAction(() => {
      this.viewCtrl.dismiss();   
    });
// });

 }

 
 getService() {
  this.airconeProvider.getOneService(this.serviceId)
  .then(res => {
    this.service = res;
  });
}

 dismiss() {
   this.viewCtrl.dismiss();
 }

}
