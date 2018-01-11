import {Injectable} from '@angular/core';
import {CartModel} from '../models/cart.model';

@Injectable()
export class CartService {

  private authenticatorCart: CartModel = null;

  constructor() {
    // this.restoreAuthenticatorCart();
  }

  public storeAuthorizationCart(authenticatorCart: CartModel): void {
    this.authenticatorCart = authenticatorCart;

    const authorizationCartString = JSON.stringify(this.authenticatorCart);
    const storage = localStorage;

    storage.setItem('authorizationCart', authorizationCartString);
    console.log('store cart auth ' + storage.getItem('authorizationCart'));
  }

  public restoreAuthenticatorCart(): void {
    let authenticatorCartString = sessionStorage.getItem('authorizationCart');

    if (authenticatorCartString  === null) {
      authenticatorCartString  = localStorage.getItem('authorizationCart');
    }

    if (authenticatorCartString  !== null) {
      let authorizationCartModel: CartModel = JSON.parse(authenticatorCartString);
      this.authenticatorCart = authorizationCartModel;
    } else {
      this.authenticatorCart = new CartModel();
    }
  }

  public getAuthenticatorCart(): CartModel {
    this.restoreAuthenticatorCart();
    return this.authenticatorCart;
    // return this.authenticatorCart;
  }

}
