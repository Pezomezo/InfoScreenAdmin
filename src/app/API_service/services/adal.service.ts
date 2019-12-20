import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, Component } from '@angular/core';
import { adal } from 'adal-angular';
import * as AuthenticationContext from 'adal-angular/lib/adal';


@Injectable({
  providedIn: 'root'
})

export class AdalService {
  private _config: adal.Config;
  private _context: adal.AuthenticationContext;

  constructor(private http: HttpClient) {
    this._config = environment.adalConfig;
    this._context = new AuthenticationContext(this._config);
  }

  get config(): adal.Config {
    return this._config;
  }

  get context(): adal.AuthenticationContext {
    return this._context;
  }

  get isLogged(): boolean {
    const user = this._context.getCachedUser();
    const token = this._context.getCachedToken(this._config.clientId);
    return !!user && !!token;
  }

}
