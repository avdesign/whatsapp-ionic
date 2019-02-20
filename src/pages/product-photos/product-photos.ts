import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product, ProductPhoto } from '../../app/model';


/**
 * Generated class for the ProductPhotosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-photos',
  templateUrl: 'product-photos.html',
})
export class ProductPhotosPage {

  productData: {product: Product, photos: ProductPhoto[]}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.productData = this.navParams.get('product_data');
  }

  ionViewDidLoad() {
    
  }

}
