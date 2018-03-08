import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
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
  paramData;
  baseURL = "ec2-52-15-87-36.us-east-2.compute.amazonaws.com"; //production
    // baseURL = "http://localhost:80"; //development
  constructor(public http: Http, public device: Device) {
  }
  

  socialLogin(data) {
    return new Promise(resolve => {
      this.http.post(this.baseURL+'/user/createSocialLogin',data)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }

  appUserRegister(data) {
    return new Promise(resolve => {
      this.http.post(this.baseURL+'/user/appUser/register',data)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }


  userLogin(data) {
    return new Promise(resolve => {
      this.http.post(this.baseURL+'/user/login',data)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }

  changePassword(userId, data) {
    return new Promise(resolve => {
      this.http.post(this.baseURL+'/user/' +userId+ '/change/userPassword',data)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  changeuserPassword(userId, data) {
    return new Promise(resolve => {
      this.http.post(this.baseURL+'/user/' +userId+ '/changePassword/userPassword',data)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
      });
    }

  resetPassword(data) {
    return new Promise(resolve => {
      this.http.post(this.baseURL+'/user/mechPassword/forgotpassword',data)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  resetUserPassword(data) {
    return new Promise(resolve => {
      this.http.post(this.baseURL+'/user/userPassword/forgotpassword',data)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  loaduser(uderId) {
    return new Promise(resolve => {
      this.http.get(this.baseURL+'/user/'+uderId+'/listOneUser')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }

  loadServices() {
    return new Promise(resolve => {
      this.http.get(this.baseURL+'/service/getAllServicesForAdmin')
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

  deleteRequests(requestId) {
    return new Promise(resolve => {
      this.http.delete(this.baseURL+'/delete/' +requestId+ '/request')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  fileUploadBase64(file) {
    // let headers = new Headers();
    // let formData: FormData = new FormData();
    // formData.append('content', file);

    var data:any = {
      imgbase64:file
    }

    return new Promise(resolve => {
      this.http.post('http://ec2-52-66-121-193.ap-south-1.compute.amazonaws.com/file/base64/upload', data)
      // this.http.post('http://ec2-52-66-121-193.ap-south-1.compute.amazonaws.com/file/uploads3', formData, {
        // headers: headers
      // })
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        })
    });
  }

  userDetailsUpdate(userDetails) {
    return new Promise(resolve => {
      this.http.put(this.baseURL+'/user/'+userDetails.id+'/detailsUpdate', userDetails)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  cancelRequest(requestId, data) {
    return new Promise(resolve => {
      this.http.post(this.baseURL+'/cancel/request/'+requestId, data)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  submitCommentRating(data) {
    return new Promise(resolve => {
      this.http.post(this.baseURL+'/create/commentRating', data)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getUserComments() {
    return new Promise(resolve => {
      this.http.get(this.baseURL+'/get/allComments')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  pushSetup(deviceTokenVal) { 
    var userData = JSON.parse(localStorage.getItem("userData"));  

    return new Promise(resolve => {
      var device = this.getDeviceDetails();
      var body = {
        userId: userData.id,
        deviceId: device,
        deviceToken: deviceTokenVal,
        appType: 'all'
        // appType: this.categoryid
      }
      this.http.post(this.baseURL+'/user/map', body)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }

  getDeviceDetails() {
    return this.device.uuid;
  }

  sendFeedback(data) {
    return new Promise(resolve => {
      this.http.post(this.baseURL+'/create/feedback', data)
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    });
  }

  getMechanicRequests(mechId) {
    return new Promise(resolve => {
      this.http.get(this.baseURL+'/get/'+mechId+'/allMechRequest')
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    });
  }

  getMechanicCompletedRequests(mechId) {
    return new Promise(resolve => {
      this.http.get(this.baseURL+'/get/'+mechId+'/allMechCompletedRequest')
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    });
  }

  getAdmin() {
    return new Promise(resolve => {
      this.http.get(this.baseURL+'/user/getadmin')
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    });
  }

  getUserPincode(pincode) {
    return new Promise(resolve => {
      this.http.get(this.baseURL+'/get/'+pincode+'/UserPincode')       
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        })
    });
  }

  getServiceSpares(serviceId) {
    return new Promise(resolve => {
      this.http.get(this.baseURL+'/get/'+serviceId+'/getServiceWiseSpares')       
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        })
    });
  }

  closeRequest(requestId, data) {
    return new Promise(resolve => {
      this.http.post(this.baseURL+'/get/'+requestId+'/clodeRequest', data)       
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        })
    });
  }

  getSpareStatus(requestId, data) {
    return new Promise(resolve => {
      this.http.post(this.baseURL+'/send/'+requestId+'/sparesList', data)       
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        })
    });
  }

  fileUpload(file) {
    let headers = new Headers();
    let formData: FormData = new FormData();
    formData.append('content', file);

    // var data:any = {
    //   imgbase64:file
    // }

    return new Promise(resolve => {
      // this.http.post('http://ec2-52-66-121-193.ap-south-1.compute.amazonaws.com/file/base64/upload', data)
      this.http.post('http://ec2-52-66-121-193.ap-south-1.compute.amazonaws.com/file/uploads3', formData, {
        headers: headers
      })
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        })
    });
  }

  addAddress(userId, data) {
    return new Promise(resolve => {
      this.http.post(this.baseURL+'/user/'+userId+'/adduseraddress', data)       
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        })
    });
  }

  updateAddress(userId, addressId, data) {
    return new Promise(resolve => {
      this.http.post(this.baseURL+'/user/'+userId+ '/'+addressId+ '/updateUserAddress', data)       
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        })
    });
  }

  getUserAddress(userId) {
    return new Promise(resolve => {
      this.http.get(this.baseURL+'/user/'+userId+'/loaduserAddress')       
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        })
    });
  }

  deleteUserAddress(userId, data) {
    return new Promise(resolve => {
      this.http.post(this.baseURL+'/user/'+userId+ '/'+data.id+ '/deleteUserAddress', data)       
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        })
    });
  }

  getSettings() {
    return new Promise(resolve => {
      this.http.get(this.baseURL+'/get/settings')       
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        })
    });
  }


}
