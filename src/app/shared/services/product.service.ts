import {ApiService} from './api.service';
import {Injectable, OnInit} from '@angular/core';
import {ProductModel} from '../models/product.model';

@Injectable()
export class ProductService {

  constructor(private api: ApiService) {

  }

  getProducts() {
    return this.api
      .get('product/products');
  }

  create(product: ProductModel) {
    this.api
      .post<void>('product/new', product)
      .subscribe(response => console.log('response' + response), error2 => {
        console.log(error2);
      });
  }
}
