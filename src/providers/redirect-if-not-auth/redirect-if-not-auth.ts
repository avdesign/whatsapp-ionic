import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { App } from 'ionic-angular';


/*
  Generated class for the RedirectIfNotAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RedirectIfNotAuthProvider {

  constructor(private auth: AuthProvider, private app: App) {
  }

  ionViewCanEnter(): Promise<boolean>{
    return this.auth.isFullyAuth()
        .then(isAuth => {
          if(!isAuth){
            setTimeout(() => {
              console.log('getRootNav');
              //this .navCtrl.push( 'LoginOptionsPage' );
              
              this.app.getRootNav().push('LoginOptionsPage');
            })
          }
          return isAuth;
        })
  }
}
