import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderStorePage } from './order-store';

@NgModule({
  declarations: [
    OrderStorePage,
  ],
  imports: [
    IonicPageModule.forChild(OrderStorePage),
  ],
})
export class OrderStorePageModule {}
