import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { AllProductsComponent } from './all-products/all-products.component';
import {NgxPaginationModule} from 'ngx-pagination';




@NgModule({
  declarations: [AllProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,FormsModule,ReactiveFormsModule,NgxPaginationModule
  ],
  exports:[AllProductsComponent]
})
export class ProductsModule { }
