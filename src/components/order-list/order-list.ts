import { Component } from '@angular/core';
import { Toast, NavParams, InfiniteScroll, Refresher } from 'ionic-angular';
import { OrderHttpProvider } from '../../providers/http/order-http';
import { OrderDetailPage } from '../../pages/order-detail/order-detail';

/**
 * Generated class for the OrderListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'order-list',
  templateUrl: 'order-list.html'
})
export class OrderListComponent {

  orders = {
    data: []
  };
  page = 1;
  canMoreOrders = true;
  doNotOrder = true;
  toastLoading: Toast;

  constructor(private orderHttp: OrderHttpProvider,
              private navParams: NavParams) {
  }

  getOrders(){
    return this.orderHttp.list(this.page);
  }

  ionViewDidLoad(){
    this.getOrders()
        .subscribe((orders) => {
          this.orders = orders
          if (!orders.data.length) {
            this.doNotOrder = false;
          }
        }, () => {

        });
  }

  doRefresh(refresher: Refresher){
    this.reset();
    this.getOrders()
        .subscribe((orders) => {
          this.orders = orders;
          if (!orders.data.length) {
            this.doNotOrder = false;            
          }
          refresher.complete();
        }, error => {
          //console.log("error: doRefresh", error);
          refresher.complete();
        });
  }

  reset() {
    this.page = 1;
    this.canMoreOrders = true;
    this.doNotOrder = true;
  }

  doInfinite(infiniteScroll: InfiniteScroll) {    
    this.page++;
    this.getOrders()
        .subscribe((orders) => {
          this.orders.data = this.orders.data.concat(orders.data);
          if (!orders.data.length) {
            this.canMoreOrders = false;
          }
          infiniteScroll.complete();
        }, error => {
          infiniteScroll.complete();
          console.log('Error doInfinite ', error);
        });
  }


  openOrderDetail(order){
    const navRoot = this.navParams.get('rootNavCtrl');
    navRoot.push(OrderDetailPage, {order});
  }

}
