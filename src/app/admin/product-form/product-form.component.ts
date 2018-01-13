import {Component, OnDestroy} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {Observable} from 'rxjs/Observable';
import {ProductModel} from '../../shared/models/product.model';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  products$: Observable<ProductModel>;
  product: ProductModel;
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService) {

    this.products$ = productService.getProducts();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService
        .getProduct(this.id)
        .subscribe(p => {
          console.log(p);
          this.product = p;
        });
    }
  }

  saveProductToDatabase(product) {
    if (this.id) {
      this.productService.updateProduct(this.id, product);
    } else {
      console.log(product);
      this.productService.createProduct(product);
    }

    this.router.navigate(['admin/products']);
  }

  deleteProduct() {
    if (confirm('are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.id);
    }

    this.router.navigate(['admin/products']);
  }
}
