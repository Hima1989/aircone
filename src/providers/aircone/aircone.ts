import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Device } from '@ionic-native/device';

/*
  Generated class for the AirconeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AirconeProvider {

  data;

  constructor(public http: Http, public device: Device) {
    console.log('Hello AirconeProvider Provider');
  }

  socialLogin(data) {
    return new Promise(resolve => {
      this.http.post('http://localhost:1337/user/createSocialLogin',data)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.log(this.data)
          resolve(this.data);
        });
    });

  }

  userLogin(data) {
    return new Promise(resolve => {
      this.http.post('http://localhost:1337/user/login',data)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }

  loadServices() {
    return new Promise(resolve => {
      this.http.get('http://localhost:1337/service/getAllSerive')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }


}
