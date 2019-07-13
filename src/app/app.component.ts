import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private userservice : UserService ,private auth : AuthService, router: Router){
    auth.user$.subscribe(user => {
        if(user){
           userservice.save(user);
          let returnUrl=localStorage.getItem('returnUrl');
          router.navigate([returnUrl]);
        }
    });
  }
  
}
