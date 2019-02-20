import { ChatMessagePage } from '../chat-messages/chat-message/chat-message';
import { MainPage } from '../main/main';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

import { FirebaseAuthProvider } from '../../providers/auth/firebase-auth';
import { AuthProvider } from '../../providers/auth/auth';
import { environment } from '@app/env';

@IonicPage()
@Component({
  selector: 'page-login-phone-number',
  templateUrl: 'login-phone-number.html',
})
export class LoginPhoneNumberPage {

  showFirebaseUI = environment.showFirebaseUI;
  loader: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private firebaseAuth: FirebaseAuthProvider,
              private authServer: AuthProvider,
              private loadingCtrl: LoadingController) {
  }

  // algo inicial para que se o usuário estiver autenticado já vai para mainPag
  // Carregar o firebaseui-form
  // se autenticado redireciona pro mainPag ou para customerCreatePag
  // se voltar para página carregar o firebaseui-form 
  ionViewDidLoad() {
    //this.firebaseAuth.getToken().then((token) => console.log(token), (error) => console.log(error));
    const unsubscribed = this.firebaseAuth.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          this.loader = this.loadingCtrl.create({
            content: 'Carregando...'
          });
          this.loader.present();
          this.handleAuthUser();
          unsubscribed();
        }
    });

    /**
     * Opção do sistema de login
     */
    if (environment.showFirebaseUI) {
      this.firebaseAuth.makePhoneNumberForm('#firebase-ui');
    }
      
  }

  handleAuthUser(){
    this.authServer
      .login()
      .subscribe((token) => {
        this.loader.dismiss();
        // Abre na página principal
        this.redirectToMainPage();
      }, (responseError) => {
        this.loader.dismiss();
        // Redireciona para criação da conta com o firebaseui-form
        if (environment.showFirebaseUI) {
          this.firebaseAuth
            .makePhoneNumberForm('#firebase-ui')
            .then(() => this.handleAuthUser());
        }

        this.redirectCustumerCreatePage();
      });
  }

  redirectToMainPage(){
    this.navCtrl.setRoot(MainPage);
  }

  redirectCustumerCreatePage(){
    this.navCtrl.push(ChatMessagePage)
  }


}
