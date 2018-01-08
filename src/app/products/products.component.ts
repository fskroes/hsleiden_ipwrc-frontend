import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {Observable} from 'rxjs/Observable';
import {ProductModel} from '../shared/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products$: Observable<ProductModel>;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getProducts();
  }

}
