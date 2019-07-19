import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import 'rxjs/operator/switchMap';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products : Product[]=[];
product$;
filteredProducts : Product[]=[];
categorie$;
category : string;
  constructor(private productservice : ProductService,private categories : CategoryService, 
    private route : ActivatedRoute) { 
      this.productservice.getproducts().switchMap(products =>{
            this.products=products;
            this.categorie$ = this.categories.getCategories();
             return route.queryParamMap;
          }).subscribe(params => {
                        this.category = params.get('category');
                        this.filteredProducts = (this.category) ? this.products.filter(p => p.category===this.category) : 
                                                       this.products;
                });
           
  }

  ngOnInit() {
  }

}
