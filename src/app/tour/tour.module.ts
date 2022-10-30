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
import { SetupTopupRateComponent } from './setup-topup-rate/setup-topup-rate.component';
import { SetupTopupRateAllComponent } from './setup-topup-rate-all/setup-topup-rate-all.component';
import { SetupTopupRateSelectComponent } from './setup-topup-rate-select/setup-topup-rate-select.component';
import { SetupTopupRateFormComponent } from './setup-topup-rate-form/setup-topup-rate-form.component';


@NgModule({
  declarations: [
    TourComponent,
    TourFormComponent,
    TourDashboardComponent,
    PaymentDashboardComponent,
    SetupPaymentConditionComponent,
    SetupPaymentConditionAllComponent,
    SetupPaymentConditionSelectComponent,
    SetupTopupRateComponent,
    SetupTopupRateAllComponent,
    SetupTopupRateSelectComponent,
    SetupTopupRateFormComponent
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
