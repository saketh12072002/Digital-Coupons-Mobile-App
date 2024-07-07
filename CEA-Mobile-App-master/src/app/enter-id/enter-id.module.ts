import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterIdPageRoutingModule } from './enter-id-routing.module';

import { EnterIdPage } from './enter-id.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterIdPageRoutingModule
  ],
  declarations: [EnterIdPage]
})
export class EnterIdPageModule {}
