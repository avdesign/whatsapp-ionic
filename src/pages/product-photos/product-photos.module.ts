import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductPhotosPage } from './product-photos';

@NgModule({
  declarations: [
    ProductPhotosPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductPhotosPage),
  ],
})
export class ProductPhotosPageModule {}
