import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TourPackageRoutingModule } from './tour-package-routing.module';
import { TourPackageComponent } from './tour-package/tour-package.component';
import { SharedModule } from '../shared/shared.module';
import { TourPackageDialogComponent } from './tour-package-dialog/tour-package-dialog.component';


@NgModule({
  declarations: [
    TourPackageComponent,
    TourPackageDialogComponent
  ],
  imports: [
    CommonModule,
    TourPackageRoutingModule,
    SharedModule
  ]
})
export class TourPackageModule { }
