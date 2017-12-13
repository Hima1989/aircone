import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerservicePage } from './customerservice';

@NgModule({
  declarations: [
    CustomerservicePage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerservicePage),
  ],
})
export class CustomerservicePageModule {}
