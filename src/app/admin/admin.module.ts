import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import {SharedModule} from '../shared/shared.module';
import { from } from 'rxjs';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [AdminHomeComponent, ViewOrdersComponent, ManageProductsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,SharedModule,ReactiveFormsModule,FormsModule
  ]
})
export class AdminModule { }
