import { Observable } from 'rxjs';
import { ResultModel } from '../models/Result.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { MagicSettings } from '../models/MagicSettings.model';

@Injectable({
  providedIn: 'root',
})
export class MagicService {
  urlRoute = '/api/magic';
  private constructor(private http: HttpClient) { }

  getMagic(id: number): Observable<ResultModel<MagicSettings>> {
    return this.http.get<ResultModel<MagicSettings>>(this.urlRoute + '/{id}').pipe(
      tap(_ => console.log('fetched Collections')),
      catchError(this.handleError<ResultModel<MagicSettings>>('getMagic', null))
    );
  }

  postMagic(url: URL) {
    return this.http.post(this.urlRoute, url).pipe(
      tap(_ => console.log('posted URL')),
      catchError(this.handleError<ResultModel<MagicSettings>>('postMagic', null))
    );
  }

  deleteMagic(id: number) {
    return this.http.delete(this.urlRoute + '/${id}').pipe(
      tap(_ => console.log('deleted URL')),
      catchError(this.handleError<ResultModel<MagicSettings>>('deleteMagic', null))
    );
  }

  patchMagic(id: number, url: MagicSettings) {
    return this.http.patch(this.urlRoute + '/{id}', url).pipe(
      tap(_ => console.log('patched URL')),
      catchError(this.handleError<ResultModel<MagicSettings>>('patchMagic', null))
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

