import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  roles: string[] = [];

  constructor(
    private router: Router,
    private ngxPermissionService: NgxPermissionsService,
    private auth:AuthService
  ) { }

  ngOnInit(): void {
    // console.log(this.ngxPermissionService.getPermissions());
    this.auth.getMyRoles().then((roles: string[])=>{
      this.roles = roles;
    });
  }

  hasRole(role: string): boolean{
    return this.roles.includes(role);
  }

  goTo(key){
    this.auth.getPermissions(key).then(()=>{
      this.auth.storeRole(key);
      this.router.navigateByUrl('/');
    });
  }

}
