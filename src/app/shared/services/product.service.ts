import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';

@Injectable()
export class ProductService {

  constructor(private api: ApiService) {

  }

  getProducts() {
    return this.api
      .get('product/products');
  }

  createProduct(product: ProductModel) {
    this.api
      .post('product/new', product)
      .subscribe(response => console.log('response' + response));
  }

  getProduct(productid) {
    return this.api
      .get('product/' + productid);
  }

  updateProduct(productid, product) {
    return this.api
      .put('product/edit/' + <string>productid, product)
      .subscribe(r => console.log(r));
  }

  deleteProduct(productid) {
    return this.api.delete('product/delete/' + <string>productid)
      .subscribe(r => console.log(r));
  }
}
