import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    // 'name',
    'referenceName',
    'email',
    'point'
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  onClickRow(row :PeriodicElement){
    this.router.navigate(['customer', '1','edit']);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  position: number;
  name: string;
  referenceName: string;
  email: string;
  point: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Steve', referenceName: 'Alpha' , email: 'customer1@gmail.com', point: 1000 },
  { position: 2, name: 'Stop', referenceName: 'Keeper' , email: 'customer2@gmail.com', point: 500 }
];


