import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DigitalCouponsPage } from './digital-coupons.page';

const routes: Routes = [
  {
    path: '',
    component: DigitalCouponsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigitalCouponsPageRoutingModule {}
