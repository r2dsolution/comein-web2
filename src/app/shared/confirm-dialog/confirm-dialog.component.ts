import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  content: string;
  accept: string = 'Yes';
  denie: string = 'No';

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
  }
  ngOnInit(): void {
  }

}
