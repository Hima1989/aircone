import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MechHomePage } from './mech-home';

@NgModule({
  declarations: [
    MechHomePage,
  ],
  imports: [
    IonicPageModule.forChild(MechHomePage),
  ],
})
export class MechHomePageModule {}
