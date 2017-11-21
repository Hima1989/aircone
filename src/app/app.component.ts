import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { TabsPage } from '../pages/tabs/tabs';
import { LoginpagePage } from '../pages/loginpage/loginpage';
import { HomePage } from '../pages/home/home';
import { ServicesPage } from '../pages/services/services';
import { ServicesHomePage } from '../pages/services-home/services-home';
import { ProfilePage } from '../pages/profile/profile';
import { RequestslistPage } from '../pages/requestslist/requestslist'

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
 // nav: NavController

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl: MenuController) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  profile() {
    this.menuCtrl.close();
    this.nav.push(ProfilePage)    
  }

  myRequests() {
    this.menuCtrl.close();
    this.nav.push(RequestslistPage)
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
