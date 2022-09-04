import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TermAndConditionComponent } from './shared/term-and-condition/term-and-condition.component';


const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'test', loadChildren: () => import('./test/test.module').then(m => m.TestModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'login-role', loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule) },
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: 'booking', loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule) },
  { path: 'hotel-staff', loadChildren: () => import('./hotel-staff/hotel-staff.module').then(m => m.HotelStaffModule) },
  { path: 'hotel-admin', loadChildren: () => import('./hotel-admin/hotel-admin.module').then(m => m.HotelAdminModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'tour', loadChildren: () => import('./tour/tour.module').then(m => m.TourModule) },
  { path: 'tour-package', loadChildren: () => import('./tour-package/tour-package.module').then(m => m.TourPackageModule) },
  { path: 'tour-admin', loadChildren: () => import('./tour-admin/tour-admin.module').then(m => m.TourAdminModule) },
  { path: 'agency-profile', loadChildren: () => import('./agency-profile/agency-profile.module').then(m => m.AgencyProfileModule) },
  { path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule) },
  { path: 'tour-booking', loadChildren: () => import('./tour-booking/tour-booking.module').then(m => m.TourBookingModule) },
  { path: 'ota', loadChildren: () => import('./ota/ota.module').then(m => m.OtaModule) },
  { path: 'term-condition', component: TermAndConditionComponent },


  { path: '**', component: PageNotFoundComponent, pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
