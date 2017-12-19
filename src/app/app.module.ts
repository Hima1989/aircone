import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
//import { Push } from "@ionic-native/push";
//import { Network } from "@ionic-native/network";


import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
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
import { MechanicPage } from '../pages/mechanic/mechanic'
import { Ionic2RatingModule } from 'ionic2-rating';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AirconeProvider } from '../providers/aircone/aircone';
import { Facebook } from '@ionic-native/facebook';
import { Device } from "@ionic-native/device";
import { GooglePlus } from "@ionic-native/google-plus";
import {
  GoogleMaps
 } from '@ionic-native/google-maps';
 import { Geolocation } from '@ionic-native/geolocation';
 import firebase from 'firebase';

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
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
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
    MechanicPage
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
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
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
    MechanicPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AirconeProvider,
    Facebook,
    Device,
    GoogleMaps,
    GooglePlus,
    Geolocation
  ]
})
export class AppModule {}
