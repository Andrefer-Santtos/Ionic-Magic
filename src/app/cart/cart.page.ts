import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CartItem } from 'src/models/cart-item';
import { ProdutoDTO } from 'src/models/produto.dto';
import { CartService } from 'src/services/domain/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {

  items: CartItem[];

  constructor(
    public cartService: CartService,
    public navCtrl: NavController) { }

  ionViewDidEnter() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    console.log(this.items)
  }

  removeItem(produto: ProdutoDTO) {
    this.items = this.cartService.removeProduto(produto).items;
  }

  increaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  total() : number {
    return this.cartService.total();
  }

  goBuy() {
    this.navCtrl.navigateRoot('categorias');
  }
}
