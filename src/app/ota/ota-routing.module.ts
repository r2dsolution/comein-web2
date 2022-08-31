import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthGuard } from '../core/guard/auth.guard';
import { OtaDetailComponent } from './ota-detail/ota-detail.component';
import { OtaComponent } from './ota/ota.component';

const routes: Routes = [
  {
    path: '', component: OtaComponent,
    canActivate:[AuthGuard, NgxPermissionsGuard],
    data:{
      permissions:{
        only: [
          'accessMenuOTA'
        ]
       }
    }
  },
  {
    path: ':id/detail', component: OtaDetailComponent,
    canActivate:[AuthGuard, NgxPermissionsGuard],
    data:{
      permissions:{
        only: [
          'accessMenuOTA'
        ]
       }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtaRoutingModule { }
