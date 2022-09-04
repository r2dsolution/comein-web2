import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyProfileRoutingModule } from './agency-profile-routing.module';
import { AgencyProfileComponent } from './agency-profile/agency-profile.component';
import { AgencyProfileFormComponent } from './agency-profile-form/agency-profile-form/agency-profile-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AgencyProfileComponent,
    AgencyProfileFormComponent
  ],
  imports: [
    CommonModule,
    AgencyProfileRoutingModule,
    SharedModule
  ]
})
export class AgencyProfileModule { }
