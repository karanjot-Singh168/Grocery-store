import { Component, OnDestroy, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit,OnDestroy {
  subs = new SubSink();
loginForm = new FormGroup({
  'email':new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  'password':new FormControl('',[Validators.required,Validators.minLength(8)])
  

})
  constructor(private auth:AuthService,private ToastrService:ToastrService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
  }
onSubmit(form){
const {email,password}=form.value;
this.subs.add(this.auth.login(email,password).subscribe({
  next:()=>{
    this.auth.isSignedin$.next(true);
    localStorage.setItem('auth',JSON.stringify(true));
    this.ToastrService.success('Logged in','Success');
this.router.navigateByUrl('/products');
  },
  error:()=>{
this.loginForm.setErrors({unknownError:true})
}
}))
}
ngOnDestroy(){
  this.subs.unsubscribe();
}
}
