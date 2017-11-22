import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestslistPage } from './requestslist';

@NgModule({
  declarations: [
    RequestslistPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestslistPage),
  ],
})
export class RequestslistPageModule {}
