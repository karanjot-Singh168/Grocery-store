import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PlaceOrderComponent } from './place-order/place-order.component';


@NgModule({
  declarations: [CartComponent, CheckoutComponent, PlaceOrderComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,FormsModule
  ],
  exports:[CartComponent,CheckoutComponent]
})
export class UsersModule { }
