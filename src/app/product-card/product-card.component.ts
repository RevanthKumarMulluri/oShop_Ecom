import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../shopping-cart/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('show-actions') showActions=true;
  @Input('shopping-cart') shoppingCart : ShoppingCart;
  constructor(private cartService : ShoppingCartService) { }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

  }
