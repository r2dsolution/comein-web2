import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PersonalDialogComponent } from 'src/app/shared/personal-dialog/personal-dialog.component';
import { TourAdminService } from '../tour-admin.service';

@Component({
  selector: 'app-tour-admin',
  templateUrl: './tour-admin.component.html',
  styleUrls: ['./tour-admin.component.scss']
})
export class TourAdminComponent implements OnInit {
  form: UntypedFormGroup;

  displayedColumns: string[] = [
    'position',
    'tourName',
    // 'referenceName',
    'email',
    'phone',
    'status',
    'action'
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private tourAdminService: TourAdminService,
    private matSnackBar: MatSnackBar
  ) {
    this.form = new UntypedFormGroup({
      email: new UntypedFormControl(),
      tourName: new UntypedFormControl()
    })
  }

  ngOnInit(): void {
    this.getList({ page: 0, size: 10 });
  }

  getList(filter) {
    // this.dataSource.data = response.datas;
    // this.dataSource.data = [
    //   {
    //     'id': 1,
    //     'position': '',
    //     'tourName': 'กัสโต้ เวิล์ด ทัวร์',
    //     'contactName': 'บริษัท กัสโต้ เวิล์ด ทัวร์ จำกัด',
    //     'email': 'www.gustotour.com',
    //     'phone': '02-542-4040',
    //     'status': 'Disabled',
    //     'action': ''
    //   }
    // ];
    this.tourAdminService.getTourAdmins(filter).subscribe({
      next: (response) => {
        console.log(response);
        this.dataSource.data = response.datas;
        this.paginator.pageIndex = response.pagging.pageNumber;
        this.paginator.pageSize = response.pagging.pageSize;
        this.paginator.length = response.pagging.total;
      },
      error: (error)=>{
        this.dataSource.data = [];
        this.matSnackBar.open(error.error.message);
      }
    });
  }

  onSearch() {
    this.getList({ page: 0, size: 10, ...this.form.value });
  }

  onClickRow(row: any) {
    this.router.navigate(['tour-admin', row.id, 'edit']);
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
