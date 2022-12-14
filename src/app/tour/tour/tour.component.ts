import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { TourService } from '../tour.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  form: UntypedFormGroup;

  displayedColumns: string[] = [
    'no',
    'name',
    'startDate',
    'endDate',
    // 'payment',
    // 'inventory',
    'action'
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private tourService: TourService,
    private matSnackBar: MatSnackBar
    // private hotelAdminService: HotelAdminService
  ) {
    this.form = new UntypedFormGroup({
      tourName: new UntypedFormControl(),
    })
  }

  ngOnInit(): void {
    this.getList({});
  }

  getList(filter) {
    this.tourService.getTours(filter).subscribe({
      next: (response) => {
        console.log(response);
        this.dataSource.data = response.datas;
        this.paginator.pageIndex = response.pagging.pageNumber;
        this.paginator.pageSize = response.pagging.pageSize;
      },
      error: (error)=>{
        this.dataSource.data = [];
        this.matSnackBar.open(error.error.message);
      }
    });
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

  dateArray(date: any): string {
    return date.join('-');
  }

  onPageChange(page: PageEvent) {
    console.log(page);
    this.getList({ ...this.form.value, size: page.pageSize, page: page.pageIndex })
  }
}
