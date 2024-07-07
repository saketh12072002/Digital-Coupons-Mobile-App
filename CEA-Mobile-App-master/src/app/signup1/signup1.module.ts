import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Signup1PageRoutingModule } from './signup1-routing.module';

import { Signup1Page } from './signup1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Signup1PageRoutingModule
  ],
  declarations: [Signup1Page]
})
export class Signup1PageModule {}
