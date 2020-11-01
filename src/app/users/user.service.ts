import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReplaySubject, Subject} from 'rxjs';
export interface cartData{
  id:number;
  quantity:number;
  name:string;
  price:number;
  imageUrl:string;
}
export interface shippingAdd{
  name:string;
  address:string;
  phone:number
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  noOfCartItems$ = new Subject<number>();
  isCheckOut$ = new Subject<boolean>();
  isPlaceOrder$= new Subject<boolean>();
  orderPlaced$= new ReplaySubject<shippingAdd>();
  
  
  rootUrl='http://localhost:3000/cart';
  rootUrl2='http://localhost:3000/orders';

  constructor(private http:HttpClient) { }
  addtoCart(cart:cartData){
    return this.http.post(`${this.rootUrl}/`,cart);
  }
  getCart(){
    return this.http.get<cartData[]>(this.rootUrl);
  }
  deleteCart(id:number){
    return this.http.delete(`${this.rootUrl}/${id}`);
    }
  updateCart(id:number,cartData:cartData){
    return this.http.put<cartData>(`${this.rootUrl}/${id}`,cartData);
  }
  
}
