import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@app/env';
import { Product, ProductPhoto } from '../../app/model';
import { ProductSearchProvider } from '../product-search/product-search';


@Injectable()
export class ProductHttpProvider{

  private baseUrl = `${environment.api.url}/open/products`;

  constructor(private http:HttpClient, private productSearch: ProductSearchProvider) { }

  list(page: number): Observable<{data: Array<Product>, meta: any}>{
    /******* Paginação *******************************************/
    const fromObject = {
      page,
      'categories[]': this.productSearch.options.categories,
      sort: this.productSearch.options.orderBy == 'latest' ? '-created_at' : 'created_at',
      search: this.productSearch.options.search

    }
    const params = new HttpParams({fromObject: (<any>fromObject)})
    /************************************************************ */
    return this.http
      .get<{data:Array<Product>, meta: any}>
      (this.baseUrl, {params});      
  }

  get(id: number): Observable<{product: Product, photos: ProductPhoto[]}> {
    return this.http
        .get<{data: any}>(`${this.baseUrl}/${id}`)
        .pipe(
          map(response => response.data)
        )
  }

}
