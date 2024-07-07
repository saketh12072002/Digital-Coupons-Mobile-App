import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Signup1Page } from './signup1.page';

const routes: Routes = [
  {
    path: '',
    component: Signup1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Signup1PageRoutingModule {}
