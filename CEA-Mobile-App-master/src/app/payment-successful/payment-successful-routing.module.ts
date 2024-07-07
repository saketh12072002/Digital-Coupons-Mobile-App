import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentSuccessfulPage } from './payment-successful.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentSuccessfulPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentSuccessfulPageRoutingModule {}
