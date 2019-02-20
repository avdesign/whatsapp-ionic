import { Injectable } from '@angular/core';
import firebaseConfig from '../../app/firebase-config';
import * as firebase from 'firebase';
import scriptjs from 'scriptjs';


declare const firebaseui;
//firebase reconhecer window
(<any>window).firebase = firebase;

/*
  Generated class for the FirebaseAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseAuthProvider {

  private ui;

  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  /**
   * Retorna o firebase
   */
  get firebase(){
    return firebase;
  }

  /**
   * await - só permite qua as proximas linhas sejam execultadas 
   * depois que a promessa foi resolvida.
   * @param selectorElement 
   */
  async makePhoneNumberForm(selectorElement: string): Promise<any>{
    await this.getFirebaseUI();
    return new Promise((resolve) => {      
      // proximas linhas 
      const uiConfig = {
        signInOptions: [
          firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          signInSuccessWithAuthResult: (authResult, redirectUrl) => {
              console.log('authResult -> ',authResult);
              //console.log(redirectUrl);
              resolve(true);
              return false;
          }
        }
      }
      this.makeFormFirebaseUi(selectorElement, uiConfig)
  
    });
  }

  /**
   * Carregar script de tradução para pt
   */
  private async getFirebaseUI(): Promise<any>{
    return new Promise((resolve, regect) => {
      if(window.hasOwnProperty('firebaseui')) { // evitar carregar script externo novamente
        resolve(firebaseui);
        return
      }
      scriptjs('https://www.gstatic.com/firebasejs/ui/3.4.1/firebase-ui-auth__pt.js', () => {
        resolve(firebaseui)
      });
    });
  }

  async getToken(): Promise<string>{
    try {
      const user = await this.getUser();
      if (!user) {
        throw new Error('Usuario não existe');
      }
      
      const token = await user.getIdTokenResult(); 
      return token.token;

    } catch (e) {
      return Promise.reject(e);
    }
  }


  /**
   * Verificar se está autenticado no firebase
   */
  async isAuth(): Promise<boolean> {
    try {
      const user = await this.getUser();
      return user !== null;
    } catch(e) {
      return false;
    }
    
  }

  private makeFormFirebaseUi(selectorElement, uiConfig){
    if (!this.ui) {
      this.ui = new firebaseui.auth.AuthUI(firebase.auth());
      this.ui.start(selectorElement, uiConfig);
    } else {
      this.ui.delete().then(() => {
        this.ui = new firebaseui.auth.AuthUI(firebase.auth());
        this.ui.start(selectorElement, uiConfig);  
      })
    }
  }


  /**
   * Retorna dados do user no callback 
   * unsubscribed() destroi a inscrição da função (execulta só uma vez)
   */
  getUser(): Promise<firebase.User | null> {
    const currentUser = this.getCurrentUser();
    if(currentUser) {
      return Promise.resolve(currentUser);
    }
    return new Promise((resolve,reject) => {
      const unsubscribed = this.firebase
          .auth()
          .onAuthStateChanged((user) => {
            resolve(user);
            unsubscribed();
          },(error) => {
              reject(error);
              unsubscribed();
          });
    });
  }

  /**
   * Verifica se já existe um usuário
   * @returns user | null
   */
  private getCurrentUser(): firebase.User | null{
    return this.firebase.auth().currentUser;
  }

}