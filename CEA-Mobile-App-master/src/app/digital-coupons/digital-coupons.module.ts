import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DigitalCouponsPageRoutingModule } from './digital-coupons-routing.module';

import { DigitalCouponsPage } from './digital-coupons.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DigitalCouponsPageRoutingModule
  ],
  declarations: [DigitalCouponsPage]
})
export class DigitalCouponsPageModule {}
