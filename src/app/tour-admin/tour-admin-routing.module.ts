import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthGuard } from '../core/guard/auth.guard';
import { TourAdminFormComponent } from './tour-admin-form/tour-admin-form.component';
import { TourAdminComponent } from './tour-admin/tour-admin.component';

const routes: Routes = [
  {
    path:'',
    component: TourAdminComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data:{
      permissions:{
        only:['accessMenuTourAdmin']
      }
    }
  },
  {
    path: ':id/edit', component: TourAdminFormComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data:{
      permissions:{
        only:['accessMenuTourAdmin']
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourAdminRoutingModule { }
