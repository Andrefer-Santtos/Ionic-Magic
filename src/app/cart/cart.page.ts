import { Component } from '@angular/core';
import { CartItem } from 'src/models/cart-item';
import { CartService } from 'src/services/domain/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {

  items: CartItem[];

  constructor(public cartService: CartService) { }

  ionViewDidEnter() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    console.log(this.items)
  }
}
