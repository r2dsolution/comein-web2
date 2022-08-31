import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourComponent } from './tour/tour.component';
import { TourRoutingModule } from './tour-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TourFormComponent } from './tour-form/tour-form.component';
import { NgxImageCompressService } from 'ngx-image-compress';


@NgModule({
  declarations: [
    TourComponent,
    TourFormComponent
  ],
  providers: [
    NgxImageCompressService
  ],
  imports: [
    CommonModule,
    TourRoutingModule,
    SharedModule,
  ]
})
export class TourModule { }
