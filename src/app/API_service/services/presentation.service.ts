import { Observable } from 'rxjs';
import { ResultModel } from '../models/Result.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { MagicSettings } from '../models/MagicSettings.model';
import { PresentationSettings } from '../models/PresentationSettings.model';

@Injectable({
  providedIn: 'root',
})
export class PresentationService {
  urlRoute = '/api/presentation';
  private constructor(private http: HttpClient) { }

  getPresentations(id: number): Observable<ResultModel<PresentationSettings>> {
    return this.http.get<ResultModel<PresentationSettings>>(this.urlRoute + '/{id}').pipe(
      tap(_ => console.log('fetched Collections')),
      catchError(this.handleError<ResultModel<PresentationSettings>>('getMagic', null))
    );
  }

  postPresentation(url: PresentationSettings): Observable<PresentationSettings> {
    return this.http.post<PresentationSettings>(this.urlRoute, url).pipe(
      tap(_ => console.log('posted URL')),
      catchError(this.handleError('postMagic', url))
    );
  }

  deleteDeletePresentation(id: number) {
    return this.http.delete(this.urlRoute + '/${id}').pipe(
      tap(_ => console.log('deleted URL')),
      catchError(this.handleError<ResultModel<PresentationSettings>>('deleteMagic', null))
    );
  }

  patchPresentation(id: number, url: PresentationSettings) {
    return this.http.patch(this.urlRoute + '/' + id, url).pipe(
      tap(_ => console.log('patched URL')),
      catchError(this.handleError<ResultModel<PresentationSettings>>('patchMagic', null))
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

