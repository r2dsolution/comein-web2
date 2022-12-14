import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PersonalDialogComponent } from 'src/app/shared/personal-dialog/personal-dialog.component';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  form: UntypedFormGroup;

  displayedColumns: string[] = [
    'position',
    'bookingNo',
    'room',
    'referenceName',
    // 'customerSurname',
    // 'email',
    'checkin',
    'status',
    'action'
  ];
  dataSource = new MatTableDataSource<any>();

  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private bookingService: BookingService,
    private matDialog: MatDialog
  ) {
    this.form = new UntypedFormGroup({
      bookingNo: new UntypedFormControl(),
      referenceName: new UntypedFormControl(),
      // customerName: new FormControl(),
      // customerSurname: new FormControl()
    })
  }

  ngOnInit(): void {
    this.getList({size: 10});
  }

  getList(filter){
    this.bookingService.getHotelBookings(filter).subscribe((response)=>{
      console.log(response);
      let data = response.datas.map((d, i)=>{
        d.row = (response.pagging.pageSize * response.pagging.pageNumber) + (i+1);
        return d;
      })
      this.dataSource.data = data;
      this.paginator.pageIndex = response.pagging.pageNumber;
      this.paginator.pageSize = response.pagging.pageSize;
      this.paginator.length = response.pagging.total;
    })
  }

  onPageChange(page: PageEvent){
    console.log(page);
    this.getList({...this.form.value, size: page.pageSize, page: page.pageIndex})
  }

  onSearch(){
    this.getList({...this.form.value, size: this.paginator.pageSize, page: this.paginator.pageIndex});
  }

  onClickRow(row){
    this.router.navigate(['booking', row.id ,'edit']);
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  viewPersonalInfomation(row: any) {
    // alert('View personal infomation');
    if(row.ownerId){
      this.matDialog.open(PersonalDialogComponent, {
        minWidth: '380px',
        data:{
          comeinId: row.ownerId
        }
      }).afterClosed().subscribe(() => {
  
      })
    }

  }
}

export interface PeriodicElement {
  position: number;
  bookingNo: string;
  room: string;
  customerName: string;
  customerSurname: string;
  email: string;
  checkin: Date;
  status: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, bookingNo: 'T1BDAS', room: 'Two-BedroomDeluxe Apartment', customerName: 'Steve', customerSurname: 'Alpha', email: 'customer1@gmail.com', checkin: new Date(), status: null },
//   { position: 2, bookingNo: 'STGHJU', room: 'Two-BedroomSuperior Apartment', customerName: 'Robert', customerSurname: 'Hang', email: 'customer2@yahoo.com', checkin: new Date(), status: null },
//   { position: 3, bookingNo: 'DGHTCB', room: 'Studio Deluxe', customerName: 'Jojo', customerSurname: 'Haha', email: 'customer@hotmail.com', checkin: new Date(), status: 'Confirm' },
//   { position: 4, bookingNo: 'KUYEDW', room: 'Two-BedroomDeluxe Apartment1', customerName: 'Xxxxx', customerSurname: 'Yyyyy', email: 'Be@abc.com', checkin: new Date(), status: 'Confirm' },
//   { position: 5, bookingNo: 'BFSWRF', room: 'Studio Deluxe Twin', customerName: 'Xxxxx', customerSurname: 'Yyyyy', email: 'B@abc.com', checkin: new Date(), status: null },
//   { position: 6, bookingNo: 'VDFTHY', room: 'Two-BedroomDeluxe Apartment', customerName: 'Xxxxx', customerSurname: 'Yyyyy', email: 'C@abc.com', checkin: new Date(), status: 'Confirm' },
//   { position: 7, bookingNo: 'SFETGD', room: 'Studio Executive', customerName: 'Xxxxx', customerSurname: 'Yyyyy', email: 'N@abc.com', checkin: new Date(), status: 'Confirm' },
//   { position: 8, bookingNo: 'XXXXXX', room: 'Two-BedroomDeluxe Apartment', customerName: 'Xxxxx', customerSurname: 'Yyyyy', email: 'O@abc.com', checkin: new Date(), status: 'Confirm' },
//   { position: 9, bookingNo: 'XXXXXX', room: 'Two-BedroomDeluxe Apartment', customerName: 'Xxxxx', customerSurname: 'Yyyyy', email: 'F@abc.com', checkin: new Date(), status: 'Confirm' },
//   { position: 10, bookingNo: 'XXXXXX', room: 'Two-BedroomSuperior Apartment', customerName: 'Xxxxx', customerSurname: 'Yyyyy', email: 'Ne@abc.com', checkin: new Date(), status: null },
//   { position: 11, bookingNo: 'XXXXXX', room: 'Studio Deluxe', customerName: 'Xxxxx', customerSurname: 'Yyyyy', email: 'Na@abc.com', checkin: new Date(), status: null },
//   { position: 12, bookingNo: 'XXXXXX', room: 'Two-BedroomDeluxe Apartment', customerName: 'Xxxxx', customerSurname: 'Yyyyy', email: 'Mg@abc.com', checkin: new Date(), status: null },
//   { position: 13, bookingNo: 'XXXXXX', room: 'Two-BedroomSuperior Apartment', customerName: 'Xxxxx', customerSurname: 'Yyyyy', email: 'Al@abc.com', checkin: new Date(), status: 'Confirm' },
//   { position: 14, bookingNo: 'XXXXXX', room: 'Studio Deluxe Twin', customerName: 'Xxxxx', customerSurname: 'Yyyyy', email: 'Si@abc.com', checkin: new Date(), status: 'Confirm' },
//   { position: 15, bookingNo: 'XXXXXX', room: 'Studio Executive', customerName: 'Xxxxx', customerSurname: 'Yyyyy', email: 'P@abc.com', checkin: new Date(), status: 'Confirm' },
//   { position: 16, bookingNo: 'XXXXXX', room: 'Room 6', customerName: 'Xxxxx', customerSurname: 'Yyyyy', email: 'S@abc.com', checkin: new Date(), status: null },
//   { position: 17, bookingNo: 'XXXXXX', room: 'Studio Deluxe', customerName: 'Xxxxx', customerSurname: 'Yyyyy', email: 'Cl@abc.com', checkin: new Date(), status: 'Confirm' },
//   { position: 18, bookingNo: 'XXXXXX', room: 'Room 8', customerName: 'Xxxxx', customerSurname: 'Yyyyy', email: 'Ar@abc.com', checkin: new Date(), status: 'Confirm' },
//   { position: 19, bookingNo: 'XXXXXX', room: 'Room 7', customerName: 'Xxxxx', customerSurname: 'Yyyyy', email: 'K@abc.com', checkin: new Date(), status: 'Confirm' },
//   { position: 20, bookingNo: 'XXXXXX', room: 'Two-BedroomDeluxe Apartment', customerName: 'Xxxxx', customerSurname: 'Yyyyy', email: 'Ca@abc.com', checkin: new Date(), status: 'Confirm' },
// ];

