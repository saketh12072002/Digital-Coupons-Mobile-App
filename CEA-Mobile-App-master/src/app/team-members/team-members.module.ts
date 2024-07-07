import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamMembersPageRoutingModule } from './team-members-routing.module';

import { TeamMembersPage } from './team-members.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamMembersPageRoutingModule
  ],
  declarations: [TeamMembersPage]
})
export class TeamMembersPageModule {}
