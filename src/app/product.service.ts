import {Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
 import { Observable } from 'rxjs';
import { Product } from './models/Product';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private REST_API_URL = 'http://localhost:8081/api/products'
  router: any;
  constructor(private httpClient: HttpClient) {}
  public getProducts(){
    const url = this.REST_API_URL;
    return this.httpClient.get<any>(url, httpOptions)
    .pipe(catchError(this.handleError));
  }
  private handleError (error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error(error.error.message)
    } else {
      console.error(
       `${error.status} ` + `${error.error}` 
      )
    }
    return throwError('Something went wrong');
  };

  addProductByCategory(categoryId: number, product: any): Observable<any> {
    const url = `${this.REST_API_URL}/categories/${categoryId}/products`;
    return this.httpClient.post(url, product);
  }
  
     public deleteProduct(id:number):Observable<any>{
    return this.httpClient.delete<any>(`${this.REST_API_URL}/${id}`);

   }

   public getProduct(id:number){
    const url = this.REST_API_URL + "/" + id;
    return this.httpClient.get<any>(url, httpOptions).pipe(catchError(this.handleError))
   }

   public updateProduct(id:number, data: Product){
    const url = this.REST_API_URL + "/" + id;
    return this.httpClient.put<any>(url, data, httpOptions).pipe(catchError(this.handleError))
   }

   public editProduct(id: any){
    this.router.navigate(['product-form', id]);
   }
}
