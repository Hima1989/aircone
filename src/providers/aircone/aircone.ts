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
 //baseURL = "https://air-cone-backend.appspot.com"; //production
  baseURL = "http://localhost:80"; //development
  constructor(public http: Http, public device: Device) {
    console.log('Hello AirconeProvider Provider');
  }

  socialLogin(data) {
    return new Promise(resolve => {
      this.http.post(this.baseURL+'/user/createSocialLogin',data)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.log(this.data)
          resolve(this.data);
        });
    });

  }

  userLogin(data) {
    console.log("hitted")
    return new Promise(resolve => {
      this.http.post(this.baseURL+'/user/login',data)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }

  loadServices() {
    return new Promise(resolve => {
      this.http.get(this.baseURL+'/service/getAllSerive')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getOneService(id) {
    return new Promise(resolve => {
      this.http.get(this.baseURL+'/service/'+ id +'/getOneSerive')
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    })
  }

  sendRequest(data) {
    return new Promise(resolve => {
      this.http.post(this.baseURL+'/create/Request',data)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  loadRequests(userId) {
    return new Promise(resolve => {
      this.http.get(this.baseURL+'/get/' +userId+ '/getRequests')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  cancelRequest(requestId) {
    return new Promise(resolve => {
      this.http.get(this.baseURL+'/cancel/request/'+requestId)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }


}
