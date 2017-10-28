import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginServicesProvider {

  headers: Headers;
  headersPost: Headers;
  options: RequestOptions;

  constructor(public http: Http) {
    
  }

  public login(postParams){
    let body = 'usuario=' + postParams.usuario + '&contrasena=' + postParams.contrasena;
    this.headersPost = new Headers({
      'Content-Type':'application/x-www-form-urlencoded'
    })
    let optionspost = new RequestOptions({
      headers: this.headersPost
    })

    return new Promise ((resolve, reject)=>{
      this.http.post('http://192.168.2.209:8080/runt/webresources/signin',body,optionspost)
      .subscribe(res=>{
        resolve(res);
      },(err)=>{
        resolve(err);
      });
    });
  }
}
