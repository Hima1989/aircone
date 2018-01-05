import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController, AlertController, ToastController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { Push, PushObject } from "@ionic-native/push";
//import { Network } from "@ionic-native/network";

// import { TabsPage } from '../pages/tabs/tabs';
import { LoginpagePage } from '../pages/loginpage/loginpage';
import { HomePage } from '../pages/home/home';
import { ServicesPage } from '../pages/services/services';
import { ServicesHomePage } from '../pages/services-home/services-home';
import { ProfilePage } from '../pages/profile/profile';
import { RequestslistPage } from '../pages/requestslist/requestslist';
import { CustomerservicePage } from '../pages/customerservice/customerservice';
import { ManageAddressPage } from '../pages/manage-address/manage-address';
import { AirconeProvider } from '../providers/aircone/aircone';
// import { SocialSharing } from '@ionic-native/social-sharing';
import { SocialSharing } from '@ionic-native/social-sharing';
//import { Geolocation } from '@ionic-native/geolocation';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav;

  rootPage:any = HomePage;
  loginPage: any = LoginpagePage;
  servicesPage: any = ServicesPage;
  servicesHomePage: any = ServicesHomePage;
  profilePage:any = ProfilePage;
  requestslistPage: any = RequestslistPage;
  userInfo;
 // nav: NavController

  constructor(public airconeProvider: AirconeProvider, public platform: Platform, public alertCtrl: AlertController, public statusBar: StatusBar, public splashScreen: SplashScreen, public menuCtrl: MenuController, public toast: ToastController, private socialSharing: SocialSharing) {
 //   this.initializeApp();

    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    //   this.initPushNotification();      
    });
  }

  // ngAfterViewInit() {
  //   this.platform.ready().then(() => {
  //     this.loadMap();
  //   });
  // }

  // loadMap() {

  //   var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };

  //   this.geolocation.getCurrentPosition(options).then((resp) => {
  //     console.log(resp.coords.latitude+", "+resp.coords.longitude);

  //     //console.log(JSON.stringify(resp));
  //     // resp.coords.latitude
  //     // resp.coords.longitude
  //    }).catch((error) => {
  //      console.log('Error getting location', error);
  //    });

  // }

  

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     // Okay, so the platform is ready and our plugins are available.
  //     // Here you can do any higher level native things you might need.
  //     this.statusBar.styleDefault();
  //     // this.statusBar.overlaysWebView(true);
  //     // this.statusBar.backgroundColorByHexString('#bba1d0');//yoga
  //     // this.statusBar.backgroundColorByHexString('#c3696b');// recipie
  //     //  this.statusBar.backgroundColorByHexString('#2cb26d');//fitness
  //     //  this.statusBar.backgroundColorByHexString('#815da2');//Beauty
  //     this.statusBar.backgroundColorByHexString("#4ec3ea"); //my tips

  //     this.splashScreen.hide();
  //   });
  // }

  // initPushNotification() {
  //   if (!this.platform.is("cordova")) {
  //     console.warn(
  //       "Push notifications not initialized. Cordova is not available - Run in physical device"
  //     );
  //     return;
  //   }

  //   const options: any = {
  //     android: {
  //       senderID: "21168605319"
  //     },
  //     ios: {
  //       alert: "true",
  //       badge: false,
  //       sound: "true"
  //     },
  //     windows: {}
  //   };
  //   const pushObject: PushObject = this.push.init(options);
  //   pushObject.on("registration").subscribe((data: any) => {
  //     this.airconeProvider.pushSetup(data.registrationId);
  //     //TODO - send device token to server
  //   });

  //   pushObject.on("notification").subscribe((data: any) => {
  //     //if user using app and push notification comes
  //     if (data.additionalData.foreground) {
  //       // if application open, show popup
  //       let confirmAlert = this.alertCtrl.create({
  //         title: data.title,
  //         message: data.message,
  //         buttons: [
  //           {
  //             text: "Ignore",
  //             role: "cancel"
  //           },
  //           {
  //             text: "View",
  //             handler: () => {
  //               this.nav.push(HomePage, {
  //                 postValue: data.additionalData,
  //                 title: data.title
  //               });
  //             }
  //           }
  //         ]
  //       });
  //       confirmAlert.present();
  //     } else {
  //       this.nav.push(HomePage, {
  //         postValue: data.additionalData,
  //         title: data.title
  //       });
  //     }
  //   });

  //   pushObject
  //     .on("error")
  //     .subscribe(error => console.error("Error with Push plugin", error));
  // }

  // displayNetworkUpdate(connectionState: string) {
  //   let networkType = this.network.type;
  //   this.toast
  //     .create({
  //       message: `You are now ${connectionState} via ${networkType}`,
  //       duration: 3000,
  //       position: "middle",
  //       showCloseButton: false,
  //       cssClass: "Toast modifyFav"
  //     })
  //     .present();
  // }

  otherShare() {
    this.socialSharing.share("Air Cone","aircone app","http://www.freepngimg.com/download/air_conditioner/6-2-ac-picture.png",
      "https://play.google.com/store/apps/details?id=com.gleed.mytips&hl=en"
    )
      .then((data) => {
      },
      (err) => {
      })
      this.menuCtrl.close();      
  }

  home() {
    this.menuCtrl.close();
    this.nav.push(HomePage)    
  }

  customerService() {
    this.menuCtrl.close();
    this.nav.push(CustomerservicePage)  
  }

  profile() {
    this.menuCtrl.close();
    this.nav.push(ProfilePage)    
  }

  myRequests() {
    this.menuCtrl.close();
    this.nav.push(RequestslistPage)
  }

  addAddress() {
    this.menuCtrl.close();
    this.nav.push(ManageAddressPage)
  }

  logout() {
    this.menuCtrl.close();
    this.nav.push(LoginpagePage)
    localStorage.removeItem("userData")
  //  this.nav.push(LoginpagePage); 
   }

   closeSideBar() {
    this.menuCtrl.close();    
   }

}
