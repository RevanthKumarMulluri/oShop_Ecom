import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import 'rxjs/operator/switchMap';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { SubscribeOnObservable } from 'rxjs/internal-compatibility';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
products : Product[]=[];
product$;
subscription : Subscription;
filteredProducts : Product[]=[];
cart : any;
category : string;
  constructor(private productservice : ProductService, private route : ActivatedRoute, 
              private cartService : ShoppingCartService) { 
          
       this.productservice.getproducts().subscribe(products =>{
            this.products=products;
           
           
           this.route.queryParamMap.subscribe(params => {
                        this.category = params.get('category');
                        this.filteredProducts = (this.category) ? this.products.filter(p => p.category===this.category) : 
                                                       this.products;
            });
          });
           
  }

  async ngOnInit() {
           this.subscription = (await this.cartService.getCart()).subscribe(cart => this.cart = cart);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
