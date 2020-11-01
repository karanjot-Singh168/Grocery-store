import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CartComponent} from '../users/cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PlaceOrderComponent } from './place-order/place-order.component';

const routes: Routes = [
  {path:'cart',component:CartComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'place-order',component:PlaceOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
