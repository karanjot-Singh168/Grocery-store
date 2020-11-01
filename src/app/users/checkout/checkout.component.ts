import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { cartData, shippingAdd, UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { ConstantPool } from '@angular/compiler';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit,OnDestroy {
orderSummary:cartData[]=[];
formFilled:boolean=false;
shippingAddress:shippingAdd;
subs = new SubSink();


@ViewChild('f') form:NgForm;
  constructor(private userService:UserService,private router:Router,private ToastrService:ToastrService) { }

  ngOnInit(): void {
    this.subs.add(this.userService.getCart().subscribe((res)=>{
      this.orderSummary=res;
    }))
  }
  get totalPrice(){
    let res = this.orderSummary.reduce((sum,item)=>{
  return (item.quantity * item.price) + sum;
    },0);
    
    return res;
  }
  
  onPlaceOrderClick(){
    
    if(this.formFilled){
      
      
     this.userService.isPlaceOrder$.next(true);
      this.ToastrService.success('Order placed successfully','Success!');
      this.router.navigateByUrl('/place-order');
      this.userService.orderPlaced$.next(this.shippingAddress);
      
    }
    else {
      this.ToastrService.warning('Please fill in shipping details in order to proceed','Oops!');
    }

  }
  onSubmit(form:NgForm){
this.shippingAddress=form.value;
if(form.valid){
this.formFilled=true;
  this.ToastrService.success('Success!','Shipping details submitted successfully');
  form.reset();
  }

  }
ngOnDestroy(){
  this.subs.unsubscribe();
}

}
