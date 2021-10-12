import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Book } from "./book";
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})

export class CrudService {

  //Node Express API
  REST_API: string = 'http://localhost:8000/api';

  //Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient){}

  //Add

  AddBook(data: Book): Observable<any>{
   let API_URL = `${this.REST_API}/add-book`;

    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )

  }

   handleError(error: HttpErrorResponse){

    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = `Error Code: ${error.status}`
    }

    console.log(errorMessage);
    return throwError(errorMessage);

  }
}


