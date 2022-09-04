import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-common-form-dialog',
  templateUrl: './common-form-dialog.component.html',
  styleUrls: ['./common-form-dialog.component.scss']
})
export class CommonFormDialogComponent implements OnInit {
  form: FormGroup;
  title: string;
  content: string;
  accept: string;
  denie: string;
  scope: string[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {


    if(this.data.title){
      this.title = this.data.title;
    }
    if(this.data.content){  
      this.content = this.data.content;
    }
    if(this.data.scope){  
      this.scope = this.data.scope;
    }
    if(this.data.accept){
      this.accept = this.data.accept;
    }
    if(this.data.denie){
      this.denie = this.data.denie;
    }

    this.form = new FormGroup({
      email: new FormControl()
    })
  }

  ngOnInit(): void {
  }

}
