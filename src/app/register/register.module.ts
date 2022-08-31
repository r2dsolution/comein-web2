import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { RegisterRoutingModule } from './register-routing.module';
import { OtpComponent } from './otp/otp.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { RegisterComponent } from './register/register.component';
import { PreBookingConsentComponent } from './pre-booking-consent/pre-booking-consent.component';
import { PersonalBookingConsentComponent } from './personal-booking-consent/personal-booking-consent.component';


@NgModule({
  declarations: [
    OtpComponent,
    CreatePasswordComponent,
    RegisterComponent,
    PreBookingConsentComponent,
    PersonalBookingConsentComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule
  ]
})
export class RegisterModule { }
