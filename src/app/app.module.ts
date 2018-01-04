import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    AdminProductsComponent,
    LoginComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductsComponent},
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'login', component: LoginComponent },
      { path: 'admin/products', component: AdminProductsComponent },
      { path: 'admin/products/new', component: ProductFormComponent },
    ])
  ],
  providers: [
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
