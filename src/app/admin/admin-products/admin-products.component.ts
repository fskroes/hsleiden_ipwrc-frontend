import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {Observable} from 'rxjs/Observable';
import {ProductModel} from '../../shared/models/product.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  private products$: Observable<ProductModel>;

  constructor(
    private producService: ProductService
  ) {
    this.products$ = this.producService.getProducts();
  }

  ngOnInit() {
  }

}
