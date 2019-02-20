import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging';
import { Platform } from 'ionic-angular';
import { UserProfileHttp } from '../http/user-profile-http';
import { merge } from 'rxjs/observable/merge';
import { map, shareReplay } from 'rxjs/operators';

enum NotificationType {
  CHAT_GROUP_SUBSCRIBE = "1",
  NEW_MESSAGE = "2"
}


/*
  Generated class for the PushNotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PushNotificationProvider {

  /**
   * Junta os 2 tipos de mensagem
   */
  private notification = merge<{background: boolean, data: any}>(
    this.fcm.onBackgroundMessage()
        .pipe(
          map(data => ({background: true, data}))
        ),
    this.fcm.onMessage()
        .pipe(
          map(data => ({background: false, data}))
        
        ),
  ).pipe(shareReplay());


  constructor(private fcm: FirebaseMessaging, 
              private platform: Platform,
              private profileHttp: UserProfileHttp) {
  }



  registerToken(){
    if (this.platform.is('ios')) {
      this.fcm.requestPermission()
          .then(() => {
            //envio do token
            this.saveToken();
          })
    }

    if (this.platform.is('android')) {
      //envio do token
      this.saveToken();
    }

  }

  private saveToken() {
    this.fcm.getToken().then((token) => {
      this.profileHttp.update({device_token: token})
          .subscribe(() => {            
            console.log('Token FirebaseMessaging de notificações foi registardo');
            //console.log(token);
          });
    })
  }

  /**
   * Quando o usuário se inscreveu no grupo
   */
  onChatGroupSubscribe(): Observable<{background: boolean, data: any}>{
    return Observable.create(observer => {
      this.notification.subscribe(data => {
        console.log('on_chat_subscribe');
        if(data.data.type === NotificationType.CHAT_GROUP_SUBSCRIBE){
          observer.next(data);
        }
      })
    })    
  }

  /**
   * Quando agente recebe uma nova mensagem
   */
  onNewMessage(): Observable<{background: boolean, data: any}>{
    return Observable.create(observer => {
      this.notification.subscribe(data => {
        console.log('on_new_message');
        if(data.data.type === NotificationType.NEW_MESSAGE){
          observer.next(data);
        }
      })
    })    
  }


}
