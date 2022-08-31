import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-personal-dialog',
  templateUrl: './personal-dialog.component.html',
  styleUrls: ['./personal-dialog.component.scss']
})
export class PersonalDialogComponent implements OnInit {
  personalInfo: any;
  constructor(
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit(): void {
    this.sharedService.getPersonalInfo(this.data.comeinId).subscribe((response)=>{
      this.personalInfo = response;
    })
  }

}
