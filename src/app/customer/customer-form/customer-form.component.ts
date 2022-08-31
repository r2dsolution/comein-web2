import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  id: string;
  data: any = {};

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private matDialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if(this.id == 'create') { 
      this.id = null;
      this.data = {name: null, surname: null, email: null, point: null}
    } else {
      this.data = {name: 'Steve', surname: 'Alpha', email: 'customer1@gmail.com', address: 'Bangkok\n10120', point: 1000}
    }

    
  }

  back(){
    this.location.back()
  }

  openSaveDialog(){
    this.matDialog.open(ConfirmDialogComponent,{
      data: {
        title: 'Do you want to save',
        content: '',
        accept: 'Yes',
        denie: 'No'
      }
    }).afterClosed().subscribe((answer)=>{
      console.log(answer);

      if(answer){
        this.router.navigate(['customer']);
      }
    });
  }
}
