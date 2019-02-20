import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { OrderStatus, Order } from '../../app/model';
import { OrderHttpProvider } from '../../providers/http/order-http';
import { HttpErrorResponse } from '@angular/common/http';
//import { Clipboard } from '@ionic-native/clipboard/ngx';


/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {

  STATUS_ENUM = OrderStatus
  order: Order;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private orderHttp: OrderHttpProvider,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController
              /*private clipboard: Clipboard*/) {
    this.order = this.navParams.get('order');           
  }

  ionViewDidLoad() {
  }

  cancel(){
    const loader = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loader.present();
    this.orderHttp
        .cancel(this.order.id)
        .subscribe(order => {
          this.order = order;
          loader.dismiss();
          const toast = this.toastCtrl.create({            
            message: `Cancelamento realizado com sucesso!`,
            duration: 7000
          });
          toast.present();
        }, (responseErro: HttpErrorResponse) => {
          loader.dismiss();
        });
  }


  copy(){
    //this.clipboard.copy(this.order.payment_link);
    const toast = this.toastCtrl.create({            
      message: `Link de pagamento copiado com sucesso!`,
      duration: 7000
    });
    toast.present();
  }

}
