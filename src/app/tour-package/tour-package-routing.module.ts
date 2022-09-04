import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourPackageComponent } from './tour-package/tour-package.component';

const routes: Routes = [
  {
    path: '',
    component: TourPackageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourPackageRoutingModule { }
