import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/*
  Generated class for the ProductSearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductSearchProvider {

  options = {
    orderBy: 'latest', //oldest
    categories: [],
    search: ''
  }  
 // 
  /**
   * è assim que vamos permitir a comunicação dos três componentes
   * ProductSearchbarComponent 
   * ProductListComponent
   * ProductHttpProvider
   */
  onUpdate = new Subject<any>();


}
