import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentListPage } from './department-list.page';

const routes: Routes = [
  {
    path: '',
    component: DepartmentListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentListPageRoutingModule {}
