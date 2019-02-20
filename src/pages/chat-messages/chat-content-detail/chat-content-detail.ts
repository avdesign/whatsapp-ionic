import { Component, Input } from '@angular/core';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ChatMessage } from '../../../app/model';
import { environment } from '@app/env';

/**
 * Generated class for the ChatContentDetailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-content-detail',
  templateUrl: 'chat-content-detail.html'
})
export class ChatContentDetailComponent {

  @Input()
  message: ChatMessage;

  constructor(private photoViewer: PhotoViewer){

  }

  /*
  constructor(private photoViewer: PhotoViewer, private buildUrl: BuildUrlPipe) {
  }

  showImage2(message: ChatMessage){    
    const url = this.buildUrl.transform(message.content);
    this.photoViewer.show(url);
  }
    */


  showImage(src){
    const url = `${environment.baseFilesUrl}/${src}`;
    this.photoViewer.show(url);
  }



}
