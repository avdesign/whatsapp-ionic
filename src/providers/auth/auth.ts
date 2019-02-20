import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseAuthProvider } from './firebase-auth';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { flatMap, tap } from 'rxjs/operators';
import { User } from '../../app/model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@app/env';

declare const cordova;
const TOKEN_KEY = 'code_shopping_token';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  me: User = null;

  constructor(public http: HttpClient, private firebaseAuth: FirebaseAuthProvider) {
    const token = this.getToken();
    //console.log(token);
    this.setUserFromToken(token);
  }

  login(): Observable<{ token: string }> {
    // Requisição AJAX (Observable) --- depente --- Promessa
    return fromPromise(this.firebaseAuth.getToken())
      .pipe(
        flatMap( token => {
          return this.http
            .post<{token: string}>(`${environment.api.url}/login_vendor`, {token})
            .pipe(
              tap(data => this.setToken(data.token))
            )
        })
      );
  }


  setToken(token: string) {
    this.setUserFromToken(token);
    token ? window.localStorage.setItem(TOKEN_KEY, token) : window.localStorage.removeItem(TOKEN_KEY);
  }

  private setUserFromToken(token: string) {
    const decodedPayloadToken = new JwtHelperService().decodeToken(token);
    this.me = decodedPayloadToken ? {
        id: decodedPayloadToken.sub,
        name: decodedPayloadToken.name,
        email: decodedPayloadToken.email,
        role: decodedPayloadToken.role,
        profile: decodedPayloadToken.profile
    } : null;

    //console.log(this.me);
  }


  getToken(): string | null{   
    return window.localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Verificar se esta logado na Api e no Firebase
   */
  async isFullyAuth(): Promise<boolean> {
    console.log('Auth: Verifica se esta logado na Api/Fb');  
    return Promise.all([this.isAuth(), this.firebaseAuth.isAuth()])
        .then(values => values[0] && values[1]);
  }


  /**
   * Verificar se está autenticado na Api
   */
  async isAuth(): Promise<boolean> {
    const token = this.getToken();
    if (!token) {
      console.log('Auth Api: false');  
      return false;
    }
    if (this.isTokenExpired(token)) {
        try {
            await this.refresh().toPromise();
        } catch (e) {
            console.log('Erro ao fazer refresh token', e);
            return false;
        }
    }
    console.log('Auth Api: true');  
    return true;
  }


  isTokenExpired(token: string) {
    return new JwtHelperService().isTokenExpired(token, 30);
  }

  refresh(): Observable<{ token: string }> {
    return this.http
        .post<{ token: string }>(this.refreshUrl(), {})
        .pipe(
            tap(data => this.setToken(data.token))
        )
  }

  refreshUrl() {
    return `${environment.api.url}/refresh`;
  }

  logout(): Observable<any> {
    return forkJoin(
      // logout firebase
      this.firebaseAuth.firebase.auth().signOut(),
      // logout nativo
      cordova.plugins.firebase.auth.signOut(),
      // logout api
      this.http.post(`${environment.api.url}/logout`, {})
          .pipe(
            tap(() => this.setToken(null))
          )
    )
  }


}
