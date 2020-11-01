import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import {ProductService,products} from '../product.service';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import {cartData, UserService} from '../../users/user.service';
import { ConstantPool } from '@angular/compiler';
import {ToastrService} from 'ngx-toastr';
import {FormGroup,FormControl} from '@angular/forms';
import { SubSink } from 'subsink';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit,OnDestroy {
  subs = new SubSink();
  p: number = 1;
categoryForm = new FormGroup({
  category:new FormControl('')
})




products:products[];
isLoggedIn:boolean;
addtoCart:number;


noOfItemsCart:number;
CartItems:cartData[]=[];



  constructor(private toastr:ToastrService,private productService:ProductService,private auth:AuthService,private router:Router,private userService:UserService,private authService:AuthService) {
   
   
   }

  ngOnInit(): void {
    


this.subs.add(this.categoryForm.valueChanges.subscribe((value)=>{
  
if(value.category === 'bread' || value.category === 'pulses and beans' || value.category === 'fruits' || value.category === 'vegetables'){
  this.productService.getProductsByCategory(value.category).subscribe((res)=>{
    this.products=res;
  })
}
else {
this.productService.getProducts().subscribe((res)=>{
    this.products=res;
    
        })
}
}))

this.subs.add(this.productService.getProducts().subscribe((res)=>{
this.products=res;

    }))
    this.subs.add(this.auth.isSignedin$.subscribe((loggedIn)=>{
this.isLoggedIn=loggedIn;
    }))
    this.subs.add(this.userService.getCart().subscribe((res)=>{
      this.CartItems=res;
this.noOfItemsCart=res.length;
this.userService.noOfCartItems$.next(this.noOfItemsCart);
    }))
    
  }
  onAddtoCart(index:number){
let res = this.CartItems.find(item=>{
  return this.products[index].id === item.id;
})
if(res && this.isLoggedIn){
this.toastr.warning('Item already exists in the cart','Duplicate item!')
}
else if(this.isLoggedIn){
       this.addtoCart=index;
    
      
    }
    
else {
this.router.navigateByUrl('/signin');
}
  }
  buy(product:products,form:NgForm){
    this.addtoCart =-1;
   
    let cartData={
      id:product.id,
      quantity:form.value.quantity,
name:product.name,
imageUrl:product.imageUrl,
price:product.price

    }
   
    
    this.subs.add(this.userService.addtoCart(cartData).subscribe(()=>{
      this.toastr.success('Success','Item added to cart successfully');
    this.userService.noOfCartItems$.next(this.noOfItemsCart + 1);
    }))
  }
  ngOnDestroy(){
    this.subs.unsubscribe();
    
  }

}
