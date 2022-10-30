import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourComponent } from './tour/tour.component';
import { TourRoutingModule } from './tour-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TourFormComponent } from './tour-form/tour-form.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { TourDashboardComponent } from './tour-dashboard/tour-dashboard.component';
import { PaymentDashboardComponent } from './payment-dashboard/payment-dashboard.component';
import { SetupPaymentConditionComponent } from './setup-payment-condition/setup-payment-condition.component';
import { SetupPaymentConditionAllComponent } from './setup-payment-condition-all/setup-payment-condition-all.component';
import { SetupPaymentConditionSelectComponent } from './setup-payment-condition-select/setup-payment-condition-select.component';


@NgModule({
  declarations: [
    TourComponent,
    TourFormComponent,
    TourDashboardComponent,
    PaymentDashboardComponent,
    SetupPaymentConditionComponent,
    SetupPaymentConditionAllComponent,
    SetupPaymentConditionSelectComponent
  ],
  providers: [
    NgxImageCompressService
  ],
  imports: [
    CommonModule,
    TourRoutingModule,
    SharedModule,
  ]
})
export class TourModule { }
