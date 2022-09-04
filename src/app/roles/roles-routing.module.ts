import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guard/auth.guard';
import { NoRoleGuard } from '../core/guard/no-role.guard';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    canActivate: [AuthGuard, NoRoleGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
