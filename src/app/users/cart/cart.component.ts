import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {UserService,cartData} from '../user.service';
import {ToastrService} from 'ngx-toastr';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,OnDestroy {
cartProducts:cartData[]=[];
subs = new SubSink();
constructor(private userService:UserService,private router:Router,private toastr:ToastrService) { }
ngOnInit(): void {
    this.subs.add(this.userService.getCart().subscribe((res)=>{
      this.cartProducts=res;
      
      this.userService.noOfCartItems$.next(res.length);
      }))
      this.totalPrice;
  }
onDeleteCart(product:cartData){
this.subs.add(this.userService.deleteCart(product.id).subscribe(()=>{
  this.toastr.success('Item deleted from cart','Deleted!');
  this.userService.getCart().subscribe((res)=>{
    this.cartProducts=res;
    
    this.userService.noOfCartItems$.next(res.length);
    })
}))

}
onUpdateCart(quantity:number,index:number){



let cartData={
  id:this.cartProducts[index].id,
  quantity,
  name:this.cartProducts[index].name,
  price:this.cartProducts[index].price,
  imageUrl:this.cartProducts[index].imageUrl

}
this.subs.add(this.userService.updateCart(this.cartProducts[index].id,cartData).subscribe(()=>{
  this.toastr.success('Cart updated','Success!');
  this.userService.getCart().subscribe((res)=>{
    this.cartProducts=res;
  })

}))
}
get totalPrice(){
  let res = this.cartProducts.reduce((sum,item)=>{
return (item.quantity * item.price) + sum;
  },0);
  
  return res;
}
onClickCheckout(){
  this.userService.isCheckOut$.next(true);
  this.router.navigateByUrl('/checkout');
}
ngOnDestroy(){
  this.subs.unsubscribe();
}

}
