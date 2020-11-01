import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import {ViewOrdersComponent} from './view-orders/view-orders.component';
import {ManageProductsComponent} from './manage-products/manage-products.component';

const routes: Routes = [
  {path:'',component:AdminHomeComponent,
  children:[
    {path:'view-orders',component:ViewOrdersComponent},
    {path:'manage-products',component:ManageProductsComponent}
  ]


}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
