import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubSink } from 'subsink';
import {AuthService} from '../auth/auth.service';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
isSignedin:boolean;
noOfCartItems:number;
subs = new SubSink();
isCheckOut:boolean=false;
isPlaceOrder:boolean=false;

  constructor(private auth:AuthService,private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.subs.add(this.auth.isSignedin$.subscribe((signin)=>{
      this.isSignedin=signin;
      if(localStorage.getItem('auth') === 'true'){
        this.isSignedin=JSON.parse(localStorage.getItem('auth'));
      }
        
      this.router.navigateByUrl('/products');
    }));
   this.subs.add(this.userService.noOfCartItems$.subscribe((res)=>{
     this.noOfCartItems=res;
   }));
   this.subs.add(this.userService.isCheckOut$.subscribe((res)=>{
     this.isCheckOut=res;
   }));
   this.subs.add(this.userService.isPlaceOrder$.subscribe((res)=>{
     this.isPlaceOrder=res;
    
   }));
   
  
  }
  onSignOut(){
    this.auth.signout();
  }
  ngOnDestroy(){
    this.subs.unsubscribe();
    
  }

}
