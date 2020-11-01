import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Subject } from 'rxjs';

export interface products{
  id:number;
  name:string;
  category:string;
  imageUrl:string;
  price:number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
rootUrl='http://localhost:3000/products';
productAdded$ = new Subject<boolean>();
editProduct$ = new Subject<number>();
  constructor(private http:HttpClient) { }
addNewProduct(product:products){
  return this.http.post<products>(this.rootUrl,product);
}

  getProducts(){
    return this.http.get<products[]>(this.rootUrl);
  }
  getProduct(id:number){
    return this.http.get<products>(`${this.rootUrl}/${id}`);
  }
  getProductsByCategory(params:string){
return this.http.get<products[]>(this.rootUrl,{
  params: new HttpParams().set('category',params)
})
  }
  deleteProduct(id:number){
    return this.http.delete(`${this.rootUrl}/${id}`);

  }
  updateProduct(id:number,product:products){
    return this.http.put<products>(`${this.rootUrl}/${id}`,product);
  }
  searchProduct(term:string){
return this.http.get<products[]>(this.rootUrl,{
  params:new HttpParams().set('q',term)
})
  }
}
