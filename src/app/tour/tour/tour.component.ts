import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
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
  form: FormGroup;

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
    private tourService: TourService
    // private hotelAdminService: HotelAdminService
  ) {
    this.form = new FormGroup({
      tourName: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.getList({});
  }

  getList(filter) {
    this.tourService.getTours(filter).subscribe((response) => {
      console.log(response);
      this.dataSource.data = response.datas;
      this.paginator.pageIndex = response.pagging.pageNumber;
      this.paginator.pageSize = response.pagging.pageSize;
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

  dateArray(date: any): string{
    return date.join('-');
  }
}
