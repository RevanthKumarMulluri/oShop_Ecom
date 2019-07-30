import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'; 
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit,OnDestroy {

 appUser : AppUser;
 cart$ : Observable<ShoppingCart>;
 itemsCount : number;
 subscription : Subscription;
  constructor(private auth : AuthService, private cartService : ShoppingCartService) { }

  async ngOnInit(){
    
    this.auth.appUser$.subscribe(appUser=>this.appUser=appUser);
    this.cart$ = await this.cartService.getCart();
    this.subscription = this.cart$.subscribe(c => {
        this.itemsCount = c.totalItemsCount;
    });
    
  }

  ngOnDestroy(){
           this.subscription.unsubscribe();
  }

  logout(){
    this.auth.logout();
  }
  

}
