import { Collections } from './models/Collection.model';
import { ResultModel } from './models/Result.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  infoScreenServer = '/api/collection/all';
  constructor(
    private http: HttpClient) { }

    getCollections(): Observable<ResultModel<Collections>> {

      return this.http.get<ResultModel<Collections>>(this.infoScreenServer).pipe(
        tap(_ => console.log('fetched Collections')),
        catchError(this.handleError<ResultModel<Collections>>('getCollections', null))
      );
    }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      return null;
    };
  }

}
