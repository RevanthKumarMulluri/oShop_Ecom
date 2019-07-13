import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './services/user.service';
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
       
    return this.auth.appUser$
        .map(appuser => appuser.isAdmin);     
      
    }
     
       
     
  }
