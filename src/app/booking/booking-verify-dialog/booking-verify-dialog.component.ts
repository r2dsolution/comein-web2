import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-verify-dialog',
  templateUrl: './booking-verify-dialog.component.html',
  styleUrls: ['./booking-verify-dialog.component.scss']
})
export class BookingVerifyDialogComponent implements OnInit {
  title: string;
  content: string;
  accept: string;
  denie: string;
  email: UntypedFormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BookingVerifyDialogComponent>
  ) {

    this.email = new UntypedFormControl('',[ Validators.required, Validators.email]);
    if (this.data.title) {
      this.title = this.data.title;
    }
    if (this.data.email) {
      this.email.setValue(this.data.email);
    }
    if (this.data.content) {
      this.content = this.data.content;
    }
    if (this.data.accept) {
      this.accept = this.data.accept;
    }
    if (this.data.denie) {
      this.denie = this.data.denie;
    }
  }
  ngOnInit(): void {
  }

  confirm(){
    this.dialogRef.close(this.email.value);
  }

}
