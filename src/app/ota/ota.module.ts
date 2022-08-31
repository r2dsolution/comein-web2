import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtaRoutingModule } from './ota-routing.module';
import { OtaComponent } from './ota/ota.component';
import { SharedModule } from '../shared/shared.module';
import { OtaDetailComponent } from './ota-detail/ota-detail.component';


@NgModule({
  declarations: [
    OtaComponent,
    OtaDetailComponent
  ],
  imports: [
    CommonModule,
    OtaRoutingModule,
    SharedModule
  ]
})
export class OtaModule { }
