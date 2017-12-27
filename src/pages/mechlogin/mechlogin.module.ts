import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MechloginPage } from './mechlogin';

@NgModule({
  declarations: [
    MechloginPage,
  ],
  imports: [
    IonicPageModule.forChild(MechloginPage),
  ],
})
export class MechloginPageModule {}
