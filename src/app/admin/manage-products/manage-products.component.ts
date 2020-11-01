import { Component,  OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import {debounceTime, distinctUntilChanged, shareReplay, switchMap,map} from 'rxjs/operators';
import { products, ProductService } from 'src/app/products/product.service';
import { shippingAdd, UserService } from 'src/app/users/user.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit,OnDestroy {
  searchForm = new FormGroup({
    term:new FormControl(''),
    
  })
  
  

  subs= new SubSink();


products:products[]=[];
  constructor(private productService:ProductService,private toastr:ToastrService) { }


ngOnInit(){

this.subs.add(this.searchForm.valueChanges.pipe(
  map(({term})=>{
return term;
  }),
  debounceTime(2000),
  distinctUntilChanged(),
  
  switchMap((term)=>{
    return this.productService.searchProduct(term);
  })
).subscribe((res)=>{
  this.products=res;
}))
 

this.subs.add(this.productService.getProducts().subscribe((res)=>{
  this.products=res;
  
}))
this.subs.add(this.productService.productAdded$.subscribe(()=>{
  this.productService.getProducts().subscribe((res)=>{
    this.products=res;
    
  })
}))

  }
  onDelete(index:number){
    this.subs.add(this.productService.deleteProduct(this.products[index].id).subscribe(()=>{
      this.productService.getProducts().subscribe((res)=>{
        this.products=res;
        
      })
this.toastr.success('Item deleted from database!','deleted');
    }))
  }
 
  ngOnDestroy(){
this.subs.unsubscribe();
  }
  onEdit(index:number){
    let Id=this.products[index].id;
    this.productService.editProduct$.next(Id);
  }
  

}
