import { Component, OnInit } from '@angular/core';
import {CartService} from '../shared/services/cart.service';
import {CartModel} from '../shared/models/cart.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private cart: CartModel;

  constructor(private cartService: CartService) { }

  get productIds() {
    return Object.keys(this.cart.products);
  }

  ngOnInit() {
    this.cart = this.cartService.getAuthenticatorCart();
  }

  checkoutCart() {
    this.cartService.deleteCart();
  }
}
