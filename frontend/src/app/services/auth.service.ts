import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private url = 'http://127.0.0.1:3000/user/';

  register(user:any){
    return this.http.post(this.url + 'register', user);
  }

  login(user:any){
    return this.http.post(this.url + 'login', user);
  }

  logout(){

    localStorage.removeItem('token');
    window.location.reload();
  }

  isLoggedIn(){

    let token = localStorage.getItem('token');

    if(token){
      return true;
    }else{
      return false;
    }

  }
  getDataFromToken(){

    let token = localStorage.getItem('token');

    if(token){
      let cryptedData = token.split('.')[1];
      let decryptedData = window.atob(cryptedData);
      let objectData = JSON.parse( decryptedData );
      return objectData

      // return JSON.parse( window.atob( token.split('.')[1] ) );

    }
  }
}

