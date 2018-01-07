import { Component } from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {Observable} from 'rxjs/Observable';
import {ProductModel} from '../../shared/models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  products$: Observable<ProductModel>;

  constructor(private productService: ProductService) {
    this.products$ = productService.getProducts();
  }

  saveProductToDatabase(product) {
    console.log(product);
    this.productService.create(product);
  }

}
