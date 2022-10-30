import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPeriodDialogComponent } from '../add-period-dialog/add-period-dialog.component';

@Component({
  selector: 'app-hotel-note-dialog',
  templateUrl: './hotel-note-dialog.component.html',
  styleUrls: ['./hotel-note-dialog.component.scss']
})
export class HotelNoteDialogComponent implements OnInit {

  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  addPeriod(e) {

    console.log('addPeriod()');
    e.stopPropagation();
    this.matDialog.open(AddPeriodDialogComponent, {
    width: '450px'
    }).afterClosed().subscribe((answer) => {
      console.log(answer);
    })
  }

}
