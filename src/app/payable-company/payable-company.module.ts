import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayableCompanyRoutingModule } from './payable-company-routing.module';
import { PayableCompanyComponent } from './payable-company/payable-company.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PayableCompanyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PayableCompanyRoutingModule
  ]
})
export class PayableCompanyModule { }
