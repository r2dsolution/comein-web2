import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-add-period-dialog',
  templateUrl: './add-period-dialog.component.html',
  styleUrls: ['./add-period-dialog.component.scss']
})
export class AddPeriodDialogComponent implements OnInit {

  periodForm: UntypedFormGroup;

  constructor(
    private matDialogRef: MatDialogRef<AddPeriodDialogComponent>
  ) {
    this.periodForm = new UntypedFormGroup({
      from: new UntypedFormControl(''),
      to: new UntypedFormControl(''),
    })
  }

  ngOnInit(): void {
  }

  onSave(){
    this.matDialogRef.close({
      from: moment(this.periodForm.get('from').value).format('YYYY-MM-DD'),
      to: moment(this.periodForm.get('to').value).format('YYYY-MM-DD'),
    });
  }

}
