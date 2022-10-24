import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ReceivableNoteDialogComponent } from '../receivable-note-dialog/receivable-note-dialog.component';

@Component({
  selector: 'app-recievable',
  templateUrl: './recievable.component.html',
  styleUrls: ['./recievable.component.scss']
})
export class RecievableComponent implements OnInit {

  displayedColumns: string[] = [
    'bookindId',
    'tourDate',
    'status',
    'paymentDate',
    'total',
    'action',
  ];

  dataSource = new MatTableDataSource();
  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.openReceiveNote(1);
  }

  openReceiveNote(index) {
    console.log('open receive dialof', index);
    this.matDialog.open(ReceivableNoteDialogComponent,{
      width: '450px'
    }).afterClosed().subscribe({
      next: (answer) => {

      }
    })
  }

}
