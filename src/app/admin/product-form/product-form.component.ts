import { Component } from '@angular/core';
import {ProductService} from '../../shared/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  products$;

  constructor(private productService: ProductService) {
    this.products$ = productService.getProducts();
  }

  saveProductToDatabase(product) {
    console.log(product);
    this.productService.create(product);
  }

}
