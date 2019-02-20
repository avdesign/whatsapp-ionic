import { Injectable } from '@angular/core';
import { environment } from '@app/env';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Order } from '../../app/model';
import { map } from 'rxjs/operators';



/*
  Generated class for the HttpOrderHttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderHttpProvider {

  private baseUrl = `${environment.api.url}/open/orders`;

  constructor(private http:HttpClient) { }

  list(page: number): Observable<{data: Array<Order>, meta: any}>{
    const fromObject = {page};    
    const params = new HttpParams({fromObject: (<any>fromObject)})
    return this.http
      .get<{data:Array<Order>, meta: any}>(this.baseUrl, {params});      
  }

  get(id: number): Observable<Order> {
    return this.http
        .get<{data: Order}>(`${this.baseUrl}/${id}`)
        .pipe(
          map(response => response.data)
        )
  }

  create(data: {product_id: number, amount: number}): Observable<Order>{
    return this.http
        .post<{data: Order}>(this.baseUrl, data)
        .pipe(
          map(response => response.data)
        );        
  }

  cancel(id: number): Observable<Order>{
    return this.http
        .patch<{data: Order}>(`${this.baseUrl}/${id}`, {})
        .pipe(
          map(response => response.data)
        );
  }
  
}
