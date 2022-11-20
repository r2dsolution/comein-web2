import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TourPackageDialogComponent } from '../tour-package-dialog/tour-package-dialog.component';

@Component({
  selector: 'app-tour-package',
  templateUrl: './tour-package.component.html',
  styleUrls: ['./tour-package.component.scss']
})
export class TourPackageComponent implements OnInit {
  form: UntypedFormGroup;

  displayedColumns: string[] = [
    'no',
    'name',
    'status',
    'action'
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private matDialog: MatDialog
    // private hotelAdminService: HotelAdminService
  ) {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(),
    })
  }

  ngOnInit(): void {
    this.getList({});
  }

  onAdd() {
    this.matDialog.open(TourPackageDialogComponent).afterClosed().subscribe(() => {
      
    });
  }

  getList(filter) {
    // this.hotelAdminService.getHotelAdmins(filter).subscribe((response) => {
    //   console.log(response);
    //   this.dataSource.data = response.datas;
    //   this.paginator.pageIndex = response.pagging.pageNumber;
    //   this.paginator.pageSize = response.pagging.pageSize;
    // });
  }

  onSearch() {
    this.getList(this.form.value);
  }

  onClickRow(row: any) {
    this.router.navigate(['tour', row.id, 'edit']);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
