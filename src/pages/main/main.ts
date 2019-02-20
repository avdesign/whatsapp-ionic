import { Component, ViewChild } from '@angular/core';
import { SuperTab, SuperTabs } from 'ionic2-super-tabs';
import { IonicPage, NavController, NavParams, PopoverController, ToastController } from 'ionic-angular';
import { RedirectIfNotAuthProvider } from '../../providers/redirect-if-not-auth/redirect-if-not-auth';
import { ChatGroupListComponent } from '../../components/chat-group-list/chat-group-list';
import { AudioRecorderProvider } from '../../providers/audio-recorder/audio-recorder';
import { PushNotificationProvider } from '../../providers/push-notification/push-notification';
import { ChatInvitationProvider } from '../../providers/chat-invitation/chat-invitation';
import { MoreOptionsComponent } from '../../components/more-options/more-options';
import { ProductListComponent } from '../../components/product-list/product-list';
import { OrderListComponent } from '../../components/order-list/order-list';


/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {  

  chatGroupList = ChatGroupListComponent;
  productList = ProductListComponent;
  orderList = OrderListComponent;

  canShowSearchbar = false;
  
  @ViewChild(SuperTabs)
  superTabs: SuperTabs;

  @ViewChild('tabChatGroupList')
  tabChatGroupList: SuperTab;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private audioRecorder: AudioRecorderProvider,
              private redirectIfNotAuth: RedirectIfNotAuthProvider,
              private popover: PopoverController,
              private pushNotification: PushNotificationProvider,
              private chatIvitation: ChatInvitationProvider,
              private tostCtrl: ToastController) {
    //console.log('Hello, MainPage');            
  }

  /**
   * Proteção da página
   */
  ionViewCanEnter(){
    return this.redirectIfNotAuth.ionViewCanEnter();
  }

  ionViewDidLoad() {
    //Registra token das notificações do FirebaseMessaging
    this.pushNotification.registerToken();
    // Recebendo uma nova Mensagem
    this.pushNotification.onNewMessage()
        .subscribe(data => {
          console.log(data);
          if (data.background) {
            const component: ChatGroupListComponent = this.tabChatGroupList.getViews()[0].instance;
            component.goToMessagesFromNotification(data.data.chat_group_id);
  
          }

        });
    // Mensagem para se escrever no grupo
    this.pushNotification.onChatGroupSubscribe()
        .subscribe(data => {
          console.log(data);
          const toast = this.tostCtrl.create({
            message: `Sua inscrição no grupo ${data.data.chat_group_name} foi aprovada.`,
            duration: 7000
          });
          toast.present();
        });
    
    const hasPermissionToRecorder = this.audioRecorder.hasPermission;
    this.audioRecorder.requestPermission()
        .then((result) => {
          console.log('Permissão para Gravação', result);
          if (result && !hasPermissionToRecorder) {
            this.audioRecorder.showAlertToCloseApp();
          }
        });

    this.chatIvitation.requestInvitation();
  }

  /**
   * Disparar ao clicar nos 3 pontinhos
   */
  presentMoreOptions(event){
    const popover = this.popover.create(MoreOptionsComponent);
    popover.present({
      ev: event
    })
  }

  /**
   * Verificar qual tab está aberta, para mostrar o icone search
   * 
   */
  get canShowSearchIcon(){
    const superTab = this.superTabs.getActiveTab();
    return superTab.tabId === 'products';
  }

  /**
   * Verifica qual tab está aberta para remover o box Search
   */

  onTabSelect(event){
    if (event.id !== "products") {
      this.canShowSearchbar = false;
    }
  } 

}
