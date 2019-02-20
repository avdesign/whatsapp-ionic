import { ProductSearchOptionsComponent } from './../product-search-options/product-search-options';
import { Component, Output, EventEmitter } from '@angular/core';
import { ProductSearchProvider } from '../../providers/product-search/product-search';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the ProductSearchBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'product-searchbar',
  templateUrl: 'product-searchbar.html'
})
export class ProductSearchbarComponent {

  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();

  constructor(public productSearch: ProductSearchProvider,
              private modalCtrl: ModalController) {
  }

  back(){
    this.onBack.emit(true);
  }

  filter(){
    this.productSearch.onUpdate.next(true);
  }

  openProductSearchOptions(){
    const modal = this.modalCtrl.create(ProductSearchOptionsComponent);
    modal.present();
  }
}
