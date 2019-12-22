import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { URL } from '../models/URL.model';
import { ResultModel } from '../models/Result.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { RepetitionModel } from '../models/Repetition.model';
import { PowerStateModel } from '../models/PowerState.model';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  private constructor(private http: HttpClient) { }
  urlRepetitionRoute = '/api/repetition';
  urlPowerStatesRoute = '/api/powerstates';

  getRepetitions(): Observable<ResultModel<RepetitionModel>> {
    return this.http.get<ResultModel<RepetitionModel>>(this.urlRepetitionRoute).pipe(
      tap(_ => console.log('fetched Repetitions')),
      catchError(this.handleError<ResultModel<RepetitionModel>>('getRepetitions', null))
    );
  }

  getPowerStates(): Observable<ResultModel<PowerStateModel>> {
    return this.http.get<ResultModel<PowerStateModel>>(this.urlPowerStatesRoute).pipe(
      tap(_ => console.log('fetched PowerStates')),
      catchError(this.handleError<ResultModel<PowerStateModel>>('getPowerStates', null))
    );
  }


  getRepetition(id: number): Observable<ResultModel<RepetitionModel>> {
    console.log('get url called with ID: ' + id);
    return this.http.get<ResultModel<RepetitionModel>>(this.urlRepetitionRoute + '/' + id.toString()).pipe(
      tap(_ => console.log('fetched Repetition')),
      catchError(this.handleError<ResultModel<RepetitionModel>>('geRtRepetition', null))
    );
  }

  getPowerState(id: number): Observable<ResultModel<PowerStateModel>> {
    console.log('get url called with ID: ' + id);
    return this.http.get<ResultModel<PowerStateModel>>(this.urlPowerStatesRoute + '/' + id.toString()).pipe(
      tap(_ => console.log('fetched PowerState')),
      catchError(this.handleError<ResultModel<PowerStateModel>>('getPowerState', null))
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

