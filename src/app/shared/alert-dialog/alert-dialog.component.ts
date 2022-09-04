import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {
  title: string;
  content: string;
  button: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(this.data.title){
      this.title = this.data.title;
    }
    if(this.data.content){  
      this.content = this.data.content;
    }
    if(this.data.button){
      this.button = this.data.button;
    }
  }

  ngOnInit(): void {
  }

}
