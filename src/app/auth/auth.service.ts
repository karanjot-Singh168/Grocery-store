import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Subject } from 'rxjs';

interface Credentials{
  id:number;
  email:string;
  password:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
isSignedin$ = new BehaviorSubject<boolean>(false);
rootUrl='http://localhost:3000/users';
rootUrl2='http://localhost:3000/login';
  constructor(private http:HttpClient) { }
  login(email,password){
return this.http.post<Credentials>(this.rootUrl2,{
  email,password
})
   }
signup(email,password){
  return this.http.post<Credentials>(this.rootUrl,{
    email,password
  })
}
  signout(){
    setTimeout(()=>{
      this.isSignedin$.next(false);
          },3000);
  }
}
