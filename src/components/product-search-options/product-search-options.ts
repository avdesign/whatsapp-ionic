import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Category } from '../../app/model';
import { ProductSearchProvider } from '../../providers/product-search/product-search';
import { CategoryHttpProvider } from '../../providers/http/category-http';

/**
 * Generated class for the ProductSearchOptionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'product-search-options',
  templateUrl: 'product-search-options.html'
})
export class ProductSearchOptionsComponent implements OnInit {

  categories: Category[] = [];

  constructor(public productSearch: ProductSearchProvider,
              private categoryHttp: CategoryHttpProvider,
              private viewCtrl: ViewController) {
  }

  ngOnInit(): void {
    this.categoryHttp.list().subscribe(
      categories => this.categories = categories
    )
  }

  close(){
    this.viewCtrl.dismiss();
  }

  filter(){
    this.productSearch.onUpdate.next(true);
    this.close();
  }

}
