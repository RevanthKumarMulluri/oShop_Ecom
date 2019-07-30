import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';


@Component({
  selector: 'products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {
  categorie$;
  @Input('category') category;
  constructor(private categories : CategoryService) { 
    this.categorie$ = this.categories.getCategories();
  }

  ngOnInit() {
  }

}
