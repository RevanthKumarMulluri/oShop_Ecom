import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Subscription } from 'rxjs/Subscription';
import { Order } from 'shared/models/order';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {

  shipping = {};
  userSubscription : Subscription;
  userId:string;
  @Input ("cart") cart;
  constructor(private orderService : OrderService, private router :Router,
    private auth : AuthService) { }

  ngOnInit() {
    this.userSubscription = this.auth.user$.subscribe(user=>this.userId =user.uid)
  }
  ngOnDestroy()
  {
     this.userSubscription.unsubscribe();
  }  

  async placeOrder() {

    let order = new Order(this.userId,this.shipping,this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success',result.key]);
  }  
}
