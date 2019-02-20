import { OrderDetailPage } from './../order-detail/order-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Product, ProductPhoto } from '../../app/model';
import { ProductHttpProvider } from '../../providers/http/product-http';
import { ProductPhotosPage } from '../product-photos/product-photos';
import { OrderStorePage } from '../order-store/order-store';


/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  productId: number;
  productData: {product: Product, photos: ProductPhoto[]};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private productHttp: ProductHttpProvider,
              private modalCtrl: ModalController) {
    this.productId = this.navParams.get('product');            
  }


  ionViewWillLoad() {
    this.productHttp
        .get(this.productId)
        .subscribe(data => this.productData = data)
  }

  openPhotos() {
    this.navCtrl.push(ProductPhotosPage, {product_data: this.productData});
  }

  openOrderStore(){
    const modal = this.modalCtrl.create(OrderStorePage, {
      product: this.productData.product
    });
    /** 
     * modal.onDidDismiss (antes de fechado )
     * modal.onWillDismiss (depois de fechado)
     */
    modal.onWillDismiss(result => {
      if (result) {
        this.navCtrl.push(OrderDetailPage, {order: result})
      }

    });
    modal.present();
  }

}
