import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
 
  categories$;
  product={};
  constructor(
    private categoryService : CategoryService, 
    private productService : ProductService,
    private route : ActivatedRoute,
    private router : Router) {
      this.categories$=categoryService.getCategories();
      let id = this.route.snapshot.paramMap.get('id');
       this.productService.get(id).take(1).subscribe(p=>{
        this.product=p;
       });
          
   }
    
   save(product){
      this.productService.create(product);
      this.router.navigate(['/admin/products']);
   }
  
   ngOnInit() {
  }

}
