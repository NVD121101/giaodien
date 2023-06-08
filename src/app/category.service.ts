import {Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
 import { Observable } from 'rxjs';
import { Category } from './models/Category';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private REST_API_URL = 'http://localhost:8081/api/categories'
  router: any;
  constructor(private httpClient: HttpClient) {}
  public getCategories(){
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

  public addCategory(data: Category){
    const url = this.REST_API_URL;
    return this.httpClient.post<any>(url, data, httpOptions).pipe(catchError(this.handleError));
  }
  
     public deleteCategory(id:number):Observable<any>{
    return this.httpClient.delete<any>(`${this.REST_API_URL}/${id}`);

   }

   public getCategory(id:number){
    const url = this.REST_API_URL + "/" + id;
    return this.httpClient.get<any>(url, httpOptions).pipe(catchError(this.handleError))
   }

   public updateCategory(id:number, data: Category){
    const url = this.REST_API_URL + "/" + id;
    return this.httpClient.put<any>(url, data, httpOptions).pipe(catchError(this.handleError))
   }

   public editCategory(id: any){
    this.router.navigate(['category-form', id]);
   }
}
