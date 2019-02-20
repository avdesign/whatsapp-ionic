import { Component, Input } from '@angular/core';
import { OrderStatus } from '../../app/model';


/**
 * Generated class for the OrderStatusComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'order-status',
  templateUrl: 'order-status.html'
})
export class OrderStatusComponent {

  STATUS_ENUM = OrderStatus

  @Input()
  status: OrderStatus;

  constructor() {
  }

}
