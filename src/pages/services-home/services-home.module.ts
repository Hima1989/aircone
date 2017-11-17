import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesHomePage } from './services-home';

@NgModule({
  declarations: [
    ServicesHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ServicesHomePage),
  ],
})
export class ServicesHomePageModule {}
