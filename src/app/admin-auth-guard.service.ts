import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import { Observable, observable } from 'rxjs';
import { AppUser } from './models/app-user';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth : AuthService, private userService : UserService) { }
   
  canActivate() : Observable<boolean>{
       
    return this.auth.user$
    .switchMap(user => this.userService.get(user.uid))
     .map(appuser => appuser.isAdmin);     
      
    }
     
       
     
  }
