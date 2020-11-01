import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { products } from 'src/app/products/product.service';
import { cartData, shippingAdd, UserService } from 'src/app/users/user.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit,OnDestroy {
subs=new SubSink();
shippingAdd:shippingAdd;
isOrderPlaced:boolean=false;
orderDetails:cartData[]=[];

  constructor(private userService:UserService) { }

  ngOnInit(): void {
this.subs.add(this.userService.orderPlaced$.subscribe((res)=>{
this.shippingAdd=res;
this.isOrderPlaced=true;

}))
  
    this.subs.add(this.userService.getCart().subscribe((res)=>{
this.orderDetails=res;

    }))
    

    
    
  }
  get totalPrice(){
    let res = this.orderDetails.reduce((sum,item)=>{
  return (item.quantity * item.price) + sum;
    },0);
    
    return res;
  }



  ngOnDestroy(){
    
    this.subs.unsubscribe();
  }

}
