import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PersonalDialogComponent } from 'src/app/shared/personal-dialog/personal-dialog.component';
import { HotelAdminService } from '../hotel-admin.service';

@Component({
  selector: 'app-hotel-admin',
  templateUrl: './hotel-admin.component.html',
  styleUrls: ['./hotel-admin.component.scss']
})
export class HotelAdminComponent implements OnInit {
  form: UntypedFormGroup;

  displayedColumns: string[] = [
    'position',
    'hotelName',
    // 'referenceName',
    'email',
    'status',
    'action'
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private hotelAdminService: HotelAdminService,
    private matDialog: MatDialog,
    private matSnackbar: MatSnackBar
  ) {
    this.form = new UntypedFormGroup({
      email: new UntypedFormControl(),
      hotelName: new UntypedFormControl()
    })
  }

  ngOnInit(): void {
    this.getList({});
  }

  getList(filter) {
    this.hotelAdminService.getHotelAdmins(filter).subscribe({
      next: (response) => {
        console.log(response);
        this.dataSource.data = response.datas;
        this.paginator.pageIndex = response.pagging.pageNumber;
        this.paginator.pageSize = response.pagging.pageSize;
      },
      error: (error) => {
        console.log(error);
        this.dataSource.data = [];
        this.matSnackbar.open(error.error.message);
      }
    });
  }

  onSearch() {
    this.getList(this.form.value);
  }

  onClickRow(row: any) {
    this.router.navigate(['hotel-admin', row.id, 'edit']);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  viewPersonalInfomation(row: any) {
    // alert('View personal infomation');
    if (row.ownerId) {
      this.matDialog.open(PersonalDialogComponent, {
        minWidth: '380px',
        data: {
          comeinId: row.ownerId
        }
      }).afterClosed().subscribe(() => {

      })
    }

  }

  onPageChange(page: PageEvent) {
    console.log(page);
    this.getList({ ...this.form.value, size: page.pageSize, page: page.pageIndex })
  }



}

export interface PeriodicElement {
  position: number;
  hotelName: string;
  contactName: string;
  email: string;
  status: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, hotelName: 'Oakwood Suites Bangkok', contactName: 'General Suites', email: 'general.suites-bangkok@oakwood.com', status: null },
//   { position: 2, hotelName: 'Avani Sukhumvit Bangkok', contactName: 'Helium', email: 'reserveavani@avanihotels.com', status: null },
//   { position: 3, hotelName: 'SKYVIEW Hotel Bangkok', contactName: 'Lithium', email: 'enquiry@skyviewhotel.com', status: 'Enable' },
//   { position: 4, hotelName: 'Hotel 4', contactName: 'Beryllium', email: 'Be@abc.com', status: 'Enable' },
//   { position: 5, hotelName: 'Hotel 5', contactName: 'Boron', email: 'B@abc.com', status: null },
//   { position: 6, hotelName: 'Hotel 6', contactName: 'Carbon', email: 'C@abc.com', status: 'Enable' },
//   { position: 7, hotelName: 'Hotel 7', contactName: 'Nitrogen', email: 'N@abc.com', status: 'Enable' },
//   { position: 8, hotelName: 'Hotel 8', contactName: 'Oxygen', email: 'O@abc.com', status: 'Enable' },
//   { position: 9, hotelName: 'Hotel 9', contactName: 'Fluorine', email: 'F@abc.com', status: 'Enable' },
//   { position: 10, hotelName: 'Hotel 10', contactName: 'Neon', email: 'Ne@abc.com', status: null },
//   { position: 11, hotelName: 'Hotel 11', contactName: 'Sodium', email: 'Na@abc.com', status: null },
//   { position: 12, hotelName: 'Hotel 12', contactName: 'Magnesium', email: 'Mg@abc.com', status: null },
//   { position: 13, hotelName: 'Hotel 13', contactName: 'Aluminum', email: 'Al@abc.com', status: 'Enable' },
//   { position: 14, hotelName: 'Hotel 14', contactName: 'Silicon', email: 'Si@abc.com', status: 'Enable' },
//   { position: 15, hotelName: 'Hotel 15', contactName: 'Phosphorus', email: 'P@abc.com', status: 'Enable' },
//   { position: 16, hotelName: 'Hotel 16', contactName: 'Sulfur', email: 'S@abc.com', status: null },
//   { position: 17, hotelName: 'Hotel 17', contactName: 'Chlorine', email: 'Cl@abc.com', status: 'Enable' },
//   { position: 18, hotelName: 'Hotel 18', contactName: 'Argon', email: 'Ar@abc.com', status: 'Enable' },
//   { position: 19, hotelName: 'Hotel 19', contactName: 'Potassium', email: 'K@abc.com', status: 'Enable' },
//   { position: 20, hotelName: 'Hotel 20', contactName: 'Calcium', email: 'Ca@abc.com', status: 'Enable' },
// ];


