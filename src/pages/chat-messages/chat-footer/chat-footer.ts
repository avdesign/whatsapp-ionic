import {Component, ViewChild} from '@angular/core';
import {ChatMessageHttpProvider} from '../../../providers/http/chat-message-http';
import { ItemSliding, TextInput, AlertController } from 'ionic-angular';
import Timer from 'easytimer.js/dist/easytimer.min';
import {AudioRecorderProvider} from '../../../providers/audio-recorder/audio-recorder';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operators';

/**
 * Generated class for the ChatFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'chat-footer',
    templateUrl: 'chat-footer.html'
})
export class ChatFooterComponent {

    subjectReleaseAudioButton = new Subject();

    text: string = '';
    messageType = 'text';
    timer = new Timer();
    recording = false;
    sending = false;

    @ViewChild('inputFileImage')
    inputFileImage: TextInput;

    @ViewChild('itemSliding')
    itemSliding: ItemSliding;

    constructor(private chatMessageHttp: ChatMessageHttpProvider,
                private audioRecorder: AudioRecorderProvider,
                private alertCtrl: AlertController) {
    }

    ngOnInit() {
        this.onStopRecord();
    }

    onDrag() {
        if (this.itemSliding.getSlidingPercent() > 0.9) {
            this.itemSliding.close();
            this.clearRecording();
            this.audioRecorder.stopRecord()
                .then((blob) => console.log('stop recording'),
                    error => console.log(error)
                );
        }
    }

    onStopRecord() {
        this.subjectReleaseAudioButton
            .pipe(
                debounceTime(500))
            .subscribe(() => {
                if (!this.recording) {
                    return;
                }
                if (this.itemSliding.getSlidingPercent() === 0) {
                    this.clearRecording();
                    this.audioRecorder.stopRecord()
                        .then(
                            (blob) => this.sendMessageAudio(blob),
                            //(blob) => console.log(blob),
                            error => console.log(error)
                        );
                }
            });
    }

    holdAudioButton() {
        // const record = this.media.create('recording.aac');
        // record.startRecord();
        // setTimeout(() => {
        //     record.stopRecord();
        //     record.play();
        // }, 5000);
        if (!this.audioRecorder.hasPermission){
            this.showAlertPermission();
            return;
        }
        this.recording = true;
        this.audioRecorder.startRecord();
        this.timer.start({precision: 'seconds'});
        this.timer.addEventListener('secondsUpdated', (e) => {
            // console.log(e);
            const time = this.getMinuteSeconds();
            this.text = `${time} Gravando ...`;
        });
    }


    showAlertPermission() {
        const alert = this.alertCtrl.create({
            title: 'Aviso',
            message: 'No momento você não tem permissão para gravar aúdios. Deseja ativar?',
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        this.audioRecorder
                            .requestPermission()
                            .then((result) => {
                                console.log('Permissão para gravação', result);
                                if (result) {
                                    this.audioRecorder.showAlertToCloseApp();
                                }
                            });
                    }
                }, {
                    text: 'Cancelar'
                }
            ]
        });
        alert.present();
    }
    

    private getMinuteSeconds() {
        return this.timer.getTimeValues().toString().substring(3);
    }

    releaseAudioButton() {
        this.subjectReleaseAudioButton.next();
    }

    private clearRecording() {
        this.timer.stop();
        this.text = '';
        this.recording = false;
    }

    sendMessageText() {
        this.sendMessage({content: this.text, type: 'text'});
    }

    sendMessageImage(files: FileList) {
        if (!files.length) {
            return;
        }
        this.sendMessage({content: files[0], type: 'image'});
    }

    sendMessageAudio(blob: Blob) {
        if (!blob.size) {
            return;
        }
        this.sendMessage({content: blob, type: 'audio'});
    }

    sendMessage(data: { content, type }) {
        this.sending = true;
        this.chatMessageHttp
            .create(1, data)
            .subscribe(() =>  {
                this.sending = false;
                if(data.type === 'text'){
                    this.text = '';
                }
            }, () => {
                this.sending = false;
            });
    }

    selectImage() {
        const nativeElement: HTMLElement = this.inputFileImage.getElementRef().nativeElement;
        const inputFile = nativeElement.querySelector('input');
        inputFile.click();
    }

    getIconSendMessage() {
        if (this.messageType === 'text') {
            return this.text === '' ? 'mic' : 'send';
        }
        return 'mic';
    }
}