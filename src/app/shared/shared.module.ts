import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatCommonModule, MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';  
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { NoticDialogComponent } from './notic-dialog/notic-dialog.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
// import { NgApexchartsModule } from 'ng-apexcharts';
// import { TranslateModule } from '@ngx-translate/core';
// import { SplineComponent } from './chart/area/spline/spline.component';
// import { PolarComponent } from './chart/area/polar/polar.component';
// import { DonutComponent } from './chart/pie/donut/donut.component';
// import { GradientComponent } from './chart/radial/gradient/gradient.component';
// import { BarCompareComponent } from './chart/bar/bar-compare/bar-compare.component';
// import { InputFileComponent } from './input/input-file/input-file.component';
// import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
// import { InputDropFileComponent } from './input/input-drop-file/input-drop-file.component';
import { CalendarModule } from 'angular-calendar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PersonalDialogComponent } from './personal-dialog/personal-dialog.component';
import { CommonFormDialogComponent } from './common-form-dialog/common-form-dialog.component';
import { QuillModule } from 'ngx-quill';
import { CalendarHeaderComponent } from './calendar/mwl-calendar-header.component';
import { DatePickerDialogComponent } from './date-picker-dialog/date-picker-dialog.component';
import { OnlyNumberDirective } from './only-number-directive/only-number.directive';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { TermAndConditionComponent } from './term-and-condition/term-and-condition.component';
import { OtaRematchDialogComponent } from '../ota/ota-rematch-dialog/ota-rematch-dialog.component';
import { NgApexchartsModule } from 'ng-apexcharts';


const materialModules = [
  MatCheckboxModule,
  MatCommonModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatMenuModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatBadgeModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatPaginatorModule,
  MatTableModule,
  MatDialogModule,
  MatChipsModule,
  MatListModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatCardModule,
  MatNativeDateModule,
  MatExpansionModule,
  DragDropModule,
  MatTabsModule
];

const angularModule = [
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
  NgxPermissionsModule,
  CalendarModule,
  QuillModule,
  NgApexchartsModule
]

const angularComponent = [
  NoticDialogComponent,
  AlertDialogComponent,
  ConfirmDialogComponent,
  PersonalDialogComponent,
  CommonFormDialogComponent,
  OtaRematchDialogComponent,
  CalendarHeaderComponent,
  OnlyNumberDirective
]

@NgModule({
  declarations: [
    ...angularComponent,
    DatePickerDialogComponent,
    ChangePasswordDialogComponent,
    TermAndConditionComponent,
    OtaRematchDialogComponent,
  ],
  entryComponents: [
    NoticDialogComponent,
    AlertDialogComponent,
    ConfirmDialogComponent,
    OtaRematchDialogComponent
  ],
  imports: [
    CommonModule,
    ...materialModules,
    ...angularModule
  ],
  exports: [
    ...materialModules,
    ...angularModule,
    ...angularComponent
  ]
})
export class SharedModule { }
