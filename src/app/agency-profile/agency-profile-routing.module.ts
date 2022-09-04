import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthGuard } from '../core/guard/auth.guard';
import { AgencyProfileFormComponent } from './agency-profile-form/agency-profile-form/agency-profile-form.component';
import { AgencyProfileComponent } from './agency-profile/agency-profile.component';

const routes: Routes = [
  {
    path: '',
    component: AgencyProfileFormComponent,
    canActivate: [AuthGuard, NgxPermissionsGuard],
    data:{
      permissions:{
        only:['accessMenuTourCompany']
      }
    }
  },
  // {
  //   path: ':id/edit',
  //   component: AgencyProfileFormComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyProfileRoutingModule { }
