import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, TextInput, LoadingController } from 'ionic-angular';
import { CustomerHttpProvider } from '../../providers/http/customer-http';
import { MainPage } from '../main/main';



/**
 * Generated class for the CustomerCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-create',
  templateUrl: 'customer-create.html',
})
export class CustomerCreatePage {

  form: FormGroup;
  photoPreview;

  @ViewChild('inputFilePhoto')
  inputFilePhoto: TextInput;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder,
              private customerHttp: CustomerHttpProvider,
              private loadingCtrl: LoadingController) {

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required,Validators.email,Validators.maxLength(100)]],
      photo: null
    });            
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerCreatePage');
  }

  submit(){
    const loader = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loader.present();
    this.customerHttp
      .create(this.form.value)
      .subscribe(() => {
        //console.log('Cliente foi criado');
        loader.dismiss();
        this.navCtrl.setRoot(MainPage);
      }, () => {
        loader.dismiss();
      })
  }

  /**
   * Simular click do input type=file para button
   */
  selectPhoto(){
    const nativeElement = this.inputFilePhoto.getElementRef().nativeElement;
    const inputFile = nativeElement.querySelector('input');
    inputFile.click();
    return false;
  }

  onChoosePhoto(files: FileList){
    if (!files.length) {
      return;
    }
    this.makePhotoPreview(files[0]);
    this.form.get('photo').setValue(files[0]);
  }

  makePhotoPreview(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (event: ProgressEvent) => {
      const target = event.target;
      this.photoPreview = (<any>target).result;
    }
  }


}
