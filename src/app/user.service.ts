import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from './models/User';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private REST_API_URL = 'http://localhost:8081/api/users'
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

  public addPUser(data: User){
    const url = this.REST_API_URL;
    return this.httpClient.post<any>(url, data, httpOptions).pipe(catchError(this.handleError));
  }
  
     public deleteUser(id:number):Observable<any>{
    return this.httpClient.delete<any>(`${this.REST_API_URL}/${id}`);

   }

   public getUser(id:number){
    const url = this.REST_API_URL + "/" + id;
    return this.httpClient.get<any>(url, httpOptions).pipe(catchError(this.handleError))
   }

   public updateUser(id:number, data: User){
    const url = this.REST_API_URL + "/" + id;
    return this.httpClient.put<any>(url, data, httpOptions).pipe(catchError(this.handleError))
   }

   public editUser(id: any){
    this.router.navigate(['user-form', id]);
   }
}
