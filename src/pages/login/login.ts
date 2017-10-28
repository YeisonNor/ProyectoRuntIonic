import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LoginServicesProvider } from '../../providers/login-services/login-services';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public email: string;
  public contrasena: string;
  rootPage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
              public loginService: LoginServicesProvider, public navController:NavController) {
  }

  login(){
    let postParams = {
      email : this.email,
      contrasena : this.contrasena
    }
    this.loginService.login(postParams)
    .then((user)=>{
      let respuesta = JSON.parse(user["_body"]);
      //alert(respuesta.message);
      this.navController.setRoot(HomePage, {
        token: respuesta.token
      });
    }).catch((err)=>{
      alert("error "+err);
    })
  }

}
