import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-date-picker-dialog',
  templateUrl: './date-picker-dialog.component.html',
  styleUrls: ['./date-picker-dialog.component.scss']
})
export class DatePickerDialogComponent implements OnInit {
  title: string;
  content: string;
  accept: string;
  denie: string;
  date: any;
  default: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(this.data.title){
      this.title = this.data.title;
    }
    if(this.data.content){  
      this.content = this.data.content;
    }
    if(this.data.accept){
      this.accept = this.data.accept;
    }
    if(this.data.denie){
      this.denie = this.data.denie;
    }
    if(this.data.default){
      // this.default = new Date(this.data.default);
      this.date = new Date(this.data.default);
    }
  }

  ngOnInit(): void {
    
  }


}
