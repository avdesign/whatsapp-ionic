import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, InfiniteScroll } from 'ionic-angular';
import { ChatMessage, ChatGroup } from '../../../app/model';
import { RedirectIfNotAuthProvider } from '../../../providers/redirect-if-not-auth/redirect-if-not-auth';
import { ChatMessageFbProvider } from '../../../providers/firebase/chat-message-fb';
import { IsCurrentUserPipe } from '../../../pipes/is-current-user/is-current-user';


/**
 * Generated class for the ChatMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-message',
  templateUrl: 'chat-message.html',
})
export class ChatMessagePage {

  chatGroup: ChatGroup;
  messages: {key: string, value: ChatMessage}[] = [];
  limit = 20;
  showContent = false;
  canMoreMessages = true;
  countNewMessages = 20;

  @ViewChild(Content)
  content: Content;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private chatMessageFb: ChatMessageFbProvider,
              private isCurrentUser: IsCurrentUserPipe,
              private redirectIfNotAuth: RedirectIfNotAuthProvider) {

    // this.chatGroup = this.navParams.get('chat_group');
    this.chatGroup = {
      id: 1,
      name: '',
      photo_url: '',
      viewed: false,
    };
  }

  /**
   * Proteção da página
   */
  ionViewCanEnter(){
    return this.redirectIfNotAuth.ionViewCanEnter();
  }

  ionViewDidLoad() {
    this.chatMessageFb.latest(this.chatGroup, this.limit)
        .subscribe((messages) => {
          this.messages = messages;
          setTimeout(() => {
            //this.scrollToBottom();
            this.showContent = true;
          }, 500);          
        });

    this.chatMessageFb.onAdded(this.chatGroup) 
        .subscribe((message) => {
          this.messages.push(message);
          if (!this.isCurrentUser.transform(message.value.user_id)) {
            this.countNewMessages++;
          }          
        });
  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    this.chatMessageFb
        .oldest(this.chatGroup, this.limit, this.messages[0].key)
        .subscribe((messages) => {
            if (!messages.length) {
                this.canMoreMessages = false;
            }
            this.messages.unshift(...messages);
            infiniteScroll.complete();
        }, () => infiniteScroll.complete());
  }


  scrollToBottom() {
    this.countNewMessages = 0;
    this.content.scrollToBottom(0);
  }


  showButtonScrollBottom() {
    const dimensions = this.content.getContentDimensions();
    const contentHeight = dimensions.contentHeight;
    const scrollTop = dimensions.scrollTop;
    const scrollHeight = dimensions.scrollHeight;

    return scrollHeight > scrollTop + contentHeight;
    // console.log('scrolltop', dimensions.scrollTop, 'scrollHeight', dimensions.scrollHeight, 'contentHeight', dimensions.contentHeight);
  }

}
