import { Injectable } from '@angular/core';
import { CanActivate,Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth : AuthService, private router : Router) { }
user : any;
  canActivate() : boolean{
     this.auth.user$.map(user => {
        this.user= user;
     });
     if (this.user) return true; 
     else{
          this.router.navigate(['/login']);
          return false;
     } 
  }
}
