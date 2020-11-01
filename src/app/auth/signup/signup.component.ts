import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import {Matchpassword} from '../matchpassword';
import { ActivatedRoute, Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
  subs= new SubSink();
signupForm = new FormGroup({
  'email':new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  'password':new FormControl('',[Validators.required,Validators.minLength(8)]),
  'passwordConfirmation':new FormControl('',[Validators.required])
},{validators:[this.matchpassword.validate]})
  constructor(private auth:AuthService,private matchpassword:Matchpassword,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
 
onSubmit(form) {
  const {email,password} = form.value;
  this.subs.add(this.auth.signup(email,password).subscribe({
    next:()=>{
      this.auth.isSignedin$.next(true);
      localStorage.setItem('auth',JSON.stringify(true));
      this.toastr.success('Signed up successfully','Success')
this.router.navigateByUrl('/products')
    },
    error:()=>{

  this.signupForm.setErrors({unknownError:true})

    }
  }))
}
  
  onClick(){
this.router.navigate(['/signin'])
  }
ngOnDestroy(){
  this.subs.unsubscribe();
}
}
