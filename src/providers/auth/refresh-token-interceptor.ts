import { Injector, Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { flatMap, tap } from 'rxjs/operators';
import { AuthProvider } from './auth';
import { App } from 'ionic-angular';
import { LoginOptionsPage } from '../../pages/login-options/login-options';
import { JwtInterceptor } from '@auth0/angular-jwt';

@Injectable()

export class RefreshTokenInterceptor implements HttpInterceptor {

  private _jwtInterceptor: JwtInterceptor;

  constructor(private authService: AuthProvider,
              private app: App,
              private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.jwtInterceptor
    if (!this.authService.getToken() 
        || !this.isTokenExpired() 
        || req.url === this.authService.refreshUrl()) {

          return this.handleRequest(req, next);

    } else {
      return this.authService
              .refresh()
              .pipe(
                flatMap(data => {
                  const obs = this._jwtInterceptor.intercept(req, next);
                  this.setPipes(obs);
                  return obs;
                })
              )
    }
  }

  isTokenExpired(){
    const token = this.authService.getToken();
    return this.authService.isTokenExpired(token);
  }

  private handleRequest(req: HttpRequest<any>, next: HttpHandler) {
    const obs = next.handle(req);
    this.setPipes(obs);
    return obs;
  }

  private setPipes(observable: Observable<any>) {
    observable.pipe(
        tap((event: HttpEvent<any>) => {
            //console.log('Set Pipe '+event);
            this.setNewTokenIfResponseValid(event);
        }, (eventError: HttpEvent<any>) => {
            this.setNewTokenIfResponseValid(eventError);
            this.redirectToLoginIfUnauthenticated(eventError);
        })
    )
  }

  private get jwtInterceptor(): JwtInterceptor {
    if (this._jwtInterceptor) {
        return this._jwtInterceptor;
    }

    const interceptors = this.injector.get(HTTP_INTERCEPTORS);
    const index = interceptors.findIndex((interceptor) => interceptor instanceof JwtInterceptor);
    this._jwtInterceptor = interceptors[index] as JwtInterceptor;
    //console.log(interceptors);
    return this._jwtInterceptor;

  }

  private redirectToLoginIfUnauthenticated(eventError: HttpEvent<any>){
    if( eventError instanceof HttpResponseBase && eventError.status == 401) {
      this.authService.setToken(null);
      this.app.getRootNav().setRoot(LoginOptionsPage);
    }
  }

  

  private setNewTokenIfResponseValid(event: HttpEvent<any>){
    if(event instanceof HttpResponseBase) {
      const authorizationHeader = event.headers.get('authorization');
      //console.log(authorizationHeader);
      if(authorizationHeader){
        const token = authorizationHeader.split(' ')[1];
        this.authService.setToken(token);
      }
    }
  }


  

}