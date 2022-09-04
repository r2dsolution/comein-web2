import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthGuard } from '../core/guard/auth.guard';
import { HotelAdminFormComponent } from './hotel-admin-form/hotel-admin-form.component';
import { HotelAdminComponent } from './hotel-admin/hotel-admin.component';

const routes: Routes = [
  {
    path: '', component: HotelAdminComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data:{
      permissions:{
        only:['accessMenuHotelAdmin']
      }
    }
  },
  {
    path: ':id/edit', component: HotelAdminFormComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data:{
      permissions:{
        only:['accessMenuHotelAdmin']
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelAdminRoutingModule { }
