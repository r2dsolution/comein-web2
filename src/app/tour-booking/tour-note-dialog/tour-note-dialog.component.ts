import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPeriodDialogComponent } from '../add-period-dialog/add-period-dialog.component';

@Component({
  selector: 'app-tour-note-dialog',
  templateUrl: './tour-note-dialog.component.html',
  styleUrls: ['./tour-note-dialog.component.scss']
})
export class TourNoteDialogComponent implements OnInit {

  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  addPeriod(){
    console.log('addPeriod()');
    this.matDialog.open(AddPeriodDialogComponent,{
      width: '450px'
    }).afterClosed().subscribe((answer)=>{
      console.log(answer);
    })
  }

}
