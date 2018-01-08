import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {ProductModel} from '../../shared/models/product.model';
import {DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: ProductModel[];
  tableResouce: DataTableResource<ProductModel>;
  items: ProductModel[] = [];
  itemCount: number;

  constructor(
    private producService: ProductService) {
    this.producService
      .getProducts()
      .subscribe(response => {
        this.products = response;
        this.initTable(response);
      });
  }

  private initTable(products: ProductModel[]) {
    this.tableResouce = new DataTableResource<ProductModel>(this.products);
    this.tableResouce.query({offset: 0})
      .then(items => this.items = items);
    this.tableResouce.count()
      .then(count => this.itemCount = count);
  }

  filter(query: string) {
    console.log(query);
    let filteredProducts = (query) ?
      this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.products;


    this.initTable(filteredProducts);
  }

  reloadItems(params) {
    if (!this.tableResouce) {
      return;
    }

    this.tableResouce.query(params)
      .then(items => this.items = items);
  }

  ngOnInit() {
  }
}
