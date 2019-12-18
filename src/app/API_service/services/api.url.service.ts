import { Observable } from 'rxjs';
import { URL } from '../models/URL.model';
import { ResultModel } from '../models/Result.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class URLService {
  urlRoute = '/api/presentation';
  private constructor(private http: HttpClient) { }

  getURLs(): Observable<ResultModel<URL>> {
    return this.http.get<ResultModel<URL>>(this.urlRoute).pipe(
      tap(_ => console.log('fetched Collections')),
      catchError(this.handleError<ResultModel<URL>>('getUrl', null))
    );
  }

  getURL(id: number): Observable<ResultModel<URL>> {
    console.log('get url called with ID: ' + id);
    return this.http.get<ResultModel<URL>>(this.urlRoute + '/' + id.toString()).pipe(
      tap(_ => console.log('fetched Collections')),
      catchError(this.handleError<ResultModel<URL>>('getUrl', null))
    );
  }

  postURL(url: URL) {
    return this.http.post(this.urlRoute, url).pipe(
      tap(_ => console.log('posted URL')),
      catchError(this.handleError<ResultModel<URL>>('postURL', null))
    );
  }

  deleteURL(id: number) {
    return this.http.delete(this.urlRoute + '/${id}').pipe(
      tap(_ => console.log('deleted URL')),
      catchError(this.handleError<ResultModel<URL>>('deleteURL', null))
    );
  }

  patchURL(id: number, url: URL) {
    return this.http.patch(this.urlRoute + '/{id}', url).pipe(
      tap(_ => console.log('patched URL')),
      catchError(this.handleError<ResultModel<URL>>('patchURL', null))
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

