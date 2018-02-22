import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { LoginpagePage } from '../pages/loginpage/loginpage';
import { ServicesPage } from '../pages/services/services';
import { ServicesHomePage } from '../pages/services-home/services-home';
import { Profile } from '../pages/services-home/services-home';
import { CustomerservicePage } from '../pages/customerservice/customerservice';
import { ProfilePage } from '../pages/profile/profile';
import { SendrequestPage } from '../pages/sendrequest/sendrequest';
import { NotificationsPage } from '../pages/notifications/notifications';
import { RequestslistPage } from '../pages/requestslist/requestslist';
import { StatusPage } from '../pages/status/status';
import { MechanicPage } from '../pages/mechanic/mechanic';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { MechHomePage } from '../pages/mech-home/mech-home';
import { RepairPage } from '../pages/repair/repair';
import { MechloginPage } from '../pages/mechlogin/mechlogin';
import { ManageAddressPage } from '../pages/manage-address/manage-address';
import { AddaddressPage } from '../pages/addaddress/addaddress';
import { Terms } from '../pages/loginpage/loginpage';

import { Ionic2RatingModule } from 'ionic2-rating';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AirconeProvider } from '../providers/aircone/aircone';
import { Facebook } from '@ionic-native/facebook';
import { Device } from "@ionic-native/device";
import { GooglePlus } from "@ionic-native/google-plus";
import { Camera } from "@ionic-native/camera";
import { SocialSharing } from '@ionic-native/social-sharing';
import { Toast } from '@ionic-native/toast';
import { CallNumber } from '@ionic-native/call-number';
import { NativeGeocoder } from '@ionic-native/native-geocoder';


import { GoogleMaps } from '@ionic-native/google-maps';
 import { Geolocation } from '@ionic-native/geolocation';
 import firebase from 'firebase';
 import { AdMob } from "@ionic-native/admob";
 

 firebase.initializeApp({
  apiKey: "AIzaSyCmxpCPemj61ksg62uE8UUhlMD3zZdd7Bw",
  authDomain: "aircone-2afb8.firebaseapp.com",
  databaseURL: "https://aircone-2afb8.firebaseio.com",
  projectId: "aircone-2afb8",
  storageBucket: "",
  messagingSenderId: "381828792113"
});


@NgModule({
  declarations: [
    MyApp,
    SignupPage,
    HomePage,
    LoginpagePage,
    ServicesPage,
    ServicesHomePage,
    ProfilePage,
    SendrequestPage,
    NotificationsPage,
    RequestslistPage,
    StatusPage,
    Profile,
    CustomerservicePage,
    MechanicPage,
    MechHomePage,
    RepairPage,
    MechloginPage,
    ManageAddressPage,
    ChangePasswordPage,
    AddaddressPage,
    Terms
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    Ionic2RatingModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignupPage,
    HomePage,
    LoginpagePage,
    ServicesPage,
    ServicesHomePage,
    ProfilePage,
    SendrequestPage,
    NotificationsPage,
    RequestslistPage,
    StatusPage,
    Profile,
    CustomerservicePage,
    MechanicPage,
    MechHomePage,
    RepairPage,
    MechloginPage,
    ManageAddressPage,
    ChangePasswordPage,
    AddaddressPage,
    Terms
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AirconeProvider,
    Facebook,
    Device,
    GoogleMaps,
    AdMob,
    GooglePlus,
    Geolocation,
    Camera,
    SocialSharing,
    Toast,
    CallNumber,
    NativeGeocoder
  ]
})
export class AppModule {}
