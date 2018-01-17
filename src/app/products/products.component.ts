import {Component, Input} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {Observable} from 'rxjs/Observable';
import {ProductModel} from '../shared/models/product.model';
import {CartService} from '../shared/services/cart.service';
import {CartModel} from '../shared/models/cart.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products$: Observable<ProductModel>;

  @Input('show-actions') showActions = true;

  constructor(
    private productService: ProductService) {
    this.products$ = this.productService.getProducts();
  }
}
