import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginpagePage } from './loginpage';
import { AirconeProvider } from '../../providers/aircone/aircone'

@NgModule({
  declarations: [
    LoginpagePage,
  ],
  providers: [
    AirconeProvider
  ],
  imports: [
    IonicPageModule.forChild(LoginpagePage),
  ],
})
export class LoginpagePageModule {}
