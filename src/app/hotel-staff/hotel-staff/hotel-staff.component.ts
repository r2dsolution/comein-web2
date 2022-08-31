import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PersonalDialogComponent } from 'src/app/shared/personal-dialog/personal-dialog.component';
import { HotelStaffService } from '../hotel-staff.service';

@Component({
  selector: 'app-hotel-staff',
  templateUrl: './hotel-staff.component.html',
  styleUrls: ['./hotel-staff.component.scss']
})
export class HotelStaffComponent implements OnInit {

  form: FormGroup;

  displayedColumns: string[] = [
    'position',
    'referenceName',
    // 'email',
    'status',
    'action'
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private hotelStaffService: HotelStaffService,
    private matDialog: MatDialog
  ) {
    this.form = new FormGroup({
      email: new FormControl(),
      referenceName: new FormControl()
    })
  }

  ngOnInit(): void {
    this.getList({ page: 0, size: 10});
  }

  getList(filter){
    this.hotelStaffService.getHotelStaffs(filter).subscribe((response)=>{
      this.dataSource.data = response.datas;
      this.paginator.pageIndex = response.pagging.pageNumber;
      this.paginator.pageSize = response.pagging.pageSize;
      this.paginator.length = response.pagging.total;

    });
  }

  onSearch(){
    this.getList({ page: 0, size: 10, ...this.form.value});
  }

  onClickRow(row :any){
    this.router.navigate(['hotel-staff', row.id,'edit']);
  }

  onPageChange(page: PageEvent){
    this.getList({ page: page.pageIndex, size: page.pageSize });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
  
  viewPersonalInfomation(row: any){
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

// export interface PeriodicElement {
// position: number;
// staffName: string;
//   email: string;
//   status: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, staffName: 'Staff Name', email: 'staff@oakwood.com', status: null },
//   { position: 2, staffName: 'Helium', email: 'H@oakwood.com', status: null },
//   { position: 3, staffName: 'Lithium', email: 'Li@oakwood.com', status: 'Enable' },
//   { position: 4, staffName: 'Beryllium', email: 'Be@oakwood.com', status: 'Enable' },
//   { position: 5, staffName: 'Boron', email: 'B@oakwood.com', status: null },
//   { position: 6, staffName: 'Carbon', email: 'C@oakwood.com', status: 'Enable' },
//   { position: 7, staffName: 'Nitrogen', email: 'N@oakwood.com', status: 'Enable' },
//   { position: 8, staffName: 'Oxygen', email: 'O@oakwood.com', status: 'Enable' },
//   { position: 9, staffName: 'Fluorine', email: 'F@oakwood.com', status: 'Enable' },
//   { position: 10, staffName: 'Neon', email: 'Ne@oakwood.com', status: null },
//   { position: 11, staffName: 'Sodium', email: 'Na@oakwood.com', status: null },
//   { position: 12, staffName: 'Magnesium', email: 'Mg@oakwood.com', status: null },
//   { position: 13, staffName: 'Aluminum', email: 'Al@oakwood.com', status: 'Enable' },
//   { position: 14, staffName: 'Silicon', email: 'Si@oakwood.com', status: 'Enable' },
//   { position: 15, staffName: 'Phosphorus', email: 'P@oakwood.com', status: 'Enable' },
//   { position: 16, staffName: 'Sulfur', email: 'S@oakwood.com', status: null },
//   { position: 17, staffName: 'Chlorine', email: 'Cl@oakwood.com', status: 'Enable' },
//   { position: 18, staffName: 'Argon', email: 'Ar@oakwood.com', status: 'Enable' },
//   { position: 19, staffName: 'Potassium', email: 'K@oakwood.com', status: 'Enable' },
//   { position: 20, staffName: 'Calcium', email: 'Ca@oakwood.com', status: 'Enable' },
// ];

