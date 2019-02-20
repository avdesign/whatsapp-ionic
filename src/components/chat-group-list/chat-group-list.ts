import { Component} from '@angular/core';
import { ChatGroup, ChatMessage } from '../../app/model';
import { ChatGroupFbProvider } from '../../providers/firebase/chat-group-fb';
import { App } from 'ionic-angular';
import { ChatGroupViewerProvider } from '../../providers/chat-group-viewer/chat-group-viewer';
import { ChatMessagePage } from '../../pages/chat-messages/chat-message/chat-message';


/**
 * Generated class for the ChatGroupListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-group-list',
  templateUrl: 'chat-group-list.html'
})
export class ChatGroupListComponent {

  groups: ChatGroup[] = [];
  chatActive: ChatGroup;
  // abrir o grupo ref a notificaçãodas depois dos grupos carregados
  chatGroupIdToFirstOpen = null; 
  
  constructor(private chatGroupFb: ChatGroupFbProvider, 
              private app: App,
              private chatGroupViewer: ChatGroupViewerProvider) {
  }

  ngOnInit(){
    this.chatGroupFb
        .list()
        .subscribe((groups) => {
          groups.forEach((group) => {
            this.chatGroupViewer.loadViewed(group);
          })
          this.groups = groups;
          this.goToMessagesFromNotification();
        });

    this.chatGroupFb
        .onAdded()
        .subscribe((group) => {
          this.chatGroupViewer.loadViewed(group);
          this.groups.unshift(group);
        });

    this.chatGroupFb.onChanged()
        .subscribe((group) => {
          const index = this.groups.findIndex((g => g.id === group.id));
          if (index === 1) {
            return;
          }

          if(!this.chatActive || group.id !== this.chatActive.id) {
            this.chatGroupViewer.loadViewed(group);
          } else {
            this.chatGroupViewer.viewed(group);
          }

          this.groups.slice(index, 1);
          this.groups.unshift(group);
        });
  }

  formatTextMessage(message: ChatMessage){
    return message.content.length > 20 ? message.content.slice(0,20)+'...' :  message.content;
  }
  
  goToMessagesFromNotification(chatGroupId = null) {
    if(chatGroupId) {
      // guardar na variavel
      this.chatGroupIdToFirstOpen = chatGroupId;
    }

    if(this.chatGroupIdToFirstOpen){
      const group = this.getById(this.chatGroupIdToFirstOpen);
      if(group){
        this.goToMessages(group);
      }
    }

  }

  getById(chatGroupId) {
    //push notification = string
    const index = this.groups.findIndex((group) => group.id == chatGroupId);
    return index === -1 ? null: this.groups[index];
  }


  goToMessages(group: ChatGroup){
    this.chatGroupViewer.viewed(group);
    //this.chatActive = group;
    this.app.getRootNav().push(ChatMessagePage, {'chat_group': group});
  }

}
