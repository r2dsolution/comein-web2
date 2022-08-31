import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymouseGuard } from '../core/guard/anonymouse.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AnonymouseGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
