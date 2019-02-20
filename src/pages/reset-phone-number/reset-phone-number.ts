import { CustomerHttpProvider } from './../../providers/http/customer-http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseAuthProvider } from '../../providers/auth/firebase-auth';
import { LoginOptionsPage } from '../login-options/login-options';
import { environment } from '@app/env';


/**
 * Generated class for the ResetPhoneNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-phone-number',
  templateUrl: 'reset-phone-number.html',
})
export class ResetPhoneNumberPage {
  email = new FormControl('', [Validators.required, Validators.email]);

  hasBtnEmailClicked = false;
  showFirebaseUI = environment.showFirebaseUI;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private firebaseAuth: FirebaseAuthProvider,
              private customerHttp: CustomerHttpProvider,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad ResetPhoneNumberPage');
  }

  loadFirebaseUI() {
      this.hasBtnEmailClicked = true;
      this.handleUpdate();
  }

  handleUpdate() {
      if (environment.showFirebaseUI) {
          this.firebaseAuth
              .makePhoneNumberForm('#firebase-ui')
              .then(() => {
                  this.requestUpdatePhoneNumber();
              });
      }
  }

  requestUpdatePhoneNumber() {
      const loader = this.loadingCtrl.create({
        content: 'Carregando...'
      });
      loader.present();
      const email = this.email.value;
      this.customerHttp.requestUpdatePhoneNumber(email)
          .subscribe(() => {
                  loader.dismiss();
                  const alert = this.alertCtrl.create({
                      title: 'Alerta',
                      subTitle: `
                          Um e-mail com a validação da mudança foi enviado.
                          Para logar, valide com o novo telefone.
                          `,
                      buttons: [
                          {
                              text: 'Ok',
                              handler: () => {
                                  this.navCtrl.setRoot(LoginOptionsPage);
                              }
                          }
                      ]
                  });
                  alert.present();
              },
              () => {
                  loader.dismiss();
                  const toast = this.toastCtrl.create({
                      message: 'Não foi possível requisitar a alteração do telefone',
                      duration: 3000
                  });
                  toast.present();
                  this.handleUpdate();
              });

  }

}
