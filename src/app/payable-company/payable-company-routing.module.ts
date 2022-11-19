import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayableCompanyComponent } from './payable-company/payable-company.component';

const routes: Routes = [
  {
    path:'',
    component: PayableCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayableCompanyRoutingModule { }
