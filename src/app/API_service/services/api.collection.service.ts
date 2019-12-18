import { Collections } from '../models/Collection.model';
import { ResultModel } from '../models/Result.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  infoScreenServer = '/api/collection';
  constructor(
    private http: HttpClient) { }

    getCollections( route: string ): Observable<ResultModel<Collections>> {

      return this.http.get<ResultModel<Collections>>(this.infoScreenServer + '/' + route ).pipe(
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
