import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'; 
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../shopping-cart/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

 appUser : AppUser;
 cart$ : Observable<ShoppingCart>;
  constructor(private auth : AuthService, private cartService : ShoppingCartService) { }

  async ngOnInit(){
    
    this.auth.appUser$.subscribe(appUser=>this.appUser=appUser);
    this.cart$ = await this.cartService.getCart();
    
  }

  logout(){
    this.auth.logout();
  }
  

}
