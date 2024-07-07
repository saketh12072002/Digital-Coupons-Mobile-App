import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepartmentListPageRoutingModule } from './department-list-routing.module';

import { DepartmentListPage } from './department-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepartmentListPageRoutingModule
  ],
  declarations: [DepartmentListPage]
})
export class DepartmentListPageModule {}
