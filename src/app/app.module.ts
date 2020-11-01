import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {ProductsModule} from './products/products.module';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {ToastrModule} from 'ngx-toastr';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ProductsModule,AuthModule,UsersModule,ToastrModule.forRoot()
  ]
,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
