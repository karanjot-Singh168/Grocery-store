import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { products, ProductService } from 'src/app/products/product.service';
import { UserService } from 'src/app/users/user.service';
import { SubSink } from 'subsink';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit,OnDestroy {
  subs = new SubSink();
  isEdit:boolean=false;
image:string='';
gotImage:boolean=false;
productId:number;
addForm = new FormGroup({
  name: new FormControl('',[Validators.required]),
  category: new FormControl('',[Validators.required]),
  price:new FormControl('',[Validators.required]),
  imageUrl:new FormControl('',[Validators.required])
})
  constructor(private productsService:ProductService,private toastr:ToastrService) { }

  ngOnInit(): void {




    this.subs.add(this.productsService.editProduct$.subscribe((id)=>{
      this.productId=id;
      this.isEdit=true;
this.productsService.getProduct(id).subscribe((product)=>{
  this.gotImage=true;
  this.image=product.imageUrl;
  this.addForm.setValue({
    name:product.name,
    category:product.category,
    price:product.price,
    imageUrl:product.imageUrl
  })
})
    }))
  }
  onSubmit(form){
    if(form.invalid){
      return;
    }
    else {
this.subs.add(this.productsService.addNewProduct(form.value).subscribe(()=>{
  this.addForm.reset();
  this.toastr.success('Product added successfully','Added!');
  this.productsService.productAdded$.next(true);
}))
    }
  }
  onClickUpdate(form){
    this.isEdit=false;
    this.gotImage=false;
    
this.subs.add(this.productsService.updateProduct(this.productId,form.value).subscribe(()=>{

  this.toastr.success('Item updated successfully','Updated!');
form.reset();
  this.productsService.productAdded$.next(true);
}))
  }
  
ngOnDestroy(){
  this.subs.unsubscribe();
}
}
