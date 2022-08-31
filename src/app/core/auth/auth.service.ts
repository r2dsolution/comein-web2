import { Injectable } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import Amplify, { Auth } from 'aws-amplify';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgxPermissionsService } from 'ngx-permissions';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private selectedRole = new BehaviorSubject<boolean>(false);
  userToken = null;
  comein_auth = null;
  
  users = [
    {
      username: 'admin@comein.com',
      password: 'password',
      token: 'asfsadfpoijwerknkln345pfiojknldn',
      permissions: []
    },
    {
      username: 'general.suites-bangkok@oakwood.com',
      password: 'password',
      token: 'asfsadfpoijwerknkln345hoteladmin',
      permissions: []
    },
    {
      username: 'staff@oakwood.com',
      password: 'password',
      token: 'asfsadfpoijwerknkln345hotelstaff',
      permissions: []
    }
  ];

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  get isSelectedRole() {
    return this.selectedRole.asObservable();
  }

  constructor(
    private router: Router,
    private permissionService: NgxPermissionsService,
    private http: HttpClient
  ) {
    if (sessionStorage.getItem('token')) {
      this.loggedIn.next(true);
    }
    if (sessionStorage.getItem('selectedRole')) {
      this.selectedRole.next(true);
    }
  }

  // signIn(username, password, key): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const user = this.users.findIndex((user) => {
  //       return user.username === username && user.password === password;
  //     });
  //     if (this.users[user]) {
  //       // this.users[user].permissions.push(key);
  //       sessionStorage.removeItem('permissions');
  //       sessionStorage.setItem('permissions', key);
  //       this.permissionService.loadPermissions(sessionStorage.getItem('permissions').split(','));

  //       this.storeSessionLogin(this.users[user].token);
  //       this.loggedIn.next(true);
  //       this.getPermissions();
  //       this.router.navigate(['/']);
  //       resolve(this.users[user]);
  //     } else {
  //       reject(false);
  //     }
  //   });
  // }

  setupAfterSignin(amplify) {
    console.log(amplify.signInUserSession.accessToken.jwtToken);
    this.loggedIn.next(true);
    // sessionStorage.removeItem('permissions');
    // sessionStorage.setItem('permissions', key);
    // this.permissionService.loadPermissions(sessionStorage.getItem('permissions').split(','));

    this.storeSessionLogin(amplify.signInUserSession.accessToken.jwtToken);
    this.router.navigate(['/login-role']);
  }

  signOut() {
    if (this.loggedIn.value) {
      Auth.currentAuthenticatedUser().then((response) => {
        Auth.signOut({ global: true });
      }).catch((error) => {
        console.log(error);
      });
    }
    sessionStorage.removeItem('selectedRole');
    this.userToken = null;
    this.comein_auth = null;
    this.selectedRole.next(false);
    this.removeSessionLogin();
    this.loggedIn.next(false);
  }

  storeSessionLogin(token) {
    sessionStorage.setItem('token', token);
  }
  removeSessionLogin() {
    sessionStorage.removeItem('token');
  }

  getRoleName(): string | null {
    return sessionStorage.getItem('selectedRole');
  }

  storeRole(roleName) {
    sessionStorage.setItem('selectedRole', roleName);
    this.selectedRole.next(true);
    this.getPermissions();
  }
  
  removeRole() {
    sessionStorage.removeItem('selectedRole');
    this.selectedRole.next(false);
    this.getPermissions();
    this.router.navigateByUrl('/login-role');
  }

  getMyRoles(){
    return new Promise((resolve, reject) => {
      if (this.loggedIn.value) {
        Auth.currentAuthenticatedUser().then((response) => {
          this.userToken = response.username;
          this.comein_auth = response.username;
          this.http.post<string[]>(`${environment.host}/users/roles`, { userToken: response.username }).subscribe({
            next: (response) => {
              // this.permissionService.loadPermissions(response);
              resolve(response);
            },
            error: (error) => {
              reject([]);
              this.signOut();
            }
          });
        }).catch((error) => {
          reject([]);
          this.signOut();
        });
        // const user = sessionStorage.getItem('token');
        // if(user){
        //   // resolve(user.permissions);
        //   // console.log(sessionStorage.getItem('permissions'));
        //   resolve(sessionStorage.getItem('permissions').split(','));
        // }else{
        //   reject([]);
        //   this.signOut();
        // }
      } else {
        resolve([]);
        this.signOut();
      }
    });
  }

  getPermissions(role: string = null): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.loggedIn.value) {
        Auth.currentAuthenticatedUser().then((response) => {
          this.userToken = response.username;
          this.comein_auth = response.username;
          if(this.getRoleName() || role){
            this.permissionService.flushPermissions();
            this.http.post<string[]>(`${environment.host}/users/permissions`, { role: role || this.getRoleName(), userToken: response.username }).subscribe({
              next: (response) => {
                this.permissionService.loadPermissions(response);
                resolve(response);
              },
              error: (error) => {
                reject([]);
                this.signOut();
              }
            });
          }else{
            resolve([]);
          }
        }).catch((error) => {
          resolve([]);
          // this.signOut();
        });
        // const user = sessionStorage.getItem('token');
        // if(user){
        //   // resolve(user.permissions);
        //   // console.log(sessionStorage.getItem('permissions'));
        //   resolve(sessionStorage.getItem('permissions').split(','));
        // }else{
        //   reject([]);
        //   this.signOut();
        // }
      } else {
        resolve([]);
        // this.signOut();
      }
    });
  }

  changePassword(email:string, oldPassword: string, newPassword: string):Observable<any>{
    return this.http.post(`${environment.host}/users/change-password`,{
      email,
      oldPassword,
      newPassword
    })
  }
}
