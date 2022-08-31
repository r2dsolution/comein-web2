import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { OtpComponent } from './otp/otp.component';
import { PersonalBookingConsentComponent } from './personal-booking-consent/personal-booking-consent.component';
import { PreBookingConsentComponent } from './pre-booking-consent/pre-booking-consent.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '', component: RegisterComponent 
  },
  {
    path: 'create-password', component: CreatePasswordComponent 
  },
  {
    path: 'otp', component: OtpComponent 
  },
  {
    path: 'pre-consent', component: PreBookingConsentComponent
  },
  {
    path: 'personal-consent', component: PersonalBookingConsentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
