import { Injectable } from '@angular/core';
import {HttpClient,HttpClientModule,HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken:any;
  user:{};
 
  constructor(private  http:HttpClient,
    private jwtHelper: JwtHelperService) {
  }
  registerUser(user){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json'); 
    return this.http.post('http://localhost:3000/users/register',user,{headers:headers}).pipe(map((res:any)=>res));
  }
  authenticateUser(user){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json'); 
    return this.http.post('http://localhost:3000/users/authenticate',user,{headers:headers}).pipe(map((res:any)=>res));
  }
  getProfile(){
    console.log("IN");
    this.loadToken();
    console.log(this.authToken);
    let headers=new HttpHeaders(
      { Authorization:this.authToken,
        'Content-Type':'application/json'
      }
    );  
    console.log(headers);
    return  this.http.get('http://localhost:3000/users/profile',{headers:headers}).pipe(map((res:any)=>res));
  }
  
  loggedIn() {
      console.log(this.jwtHelper.isTokenExpired());
      return !this.jwtHelper.isTokenExpired();
  }
  loadToken(){
    const token=localStorage.getItem('id_token');
    this.authToken=token;
  }
  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken=token;
    this.user=user;
  }
  logout(){
    console.log("In logout");
    this.authToken=null;
    this.user=null; 
    localStorage.clear();
    console.log(localStorage.getItem('id_token'));
  }
}
