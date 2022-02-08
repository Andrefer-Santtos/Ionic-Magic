import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProdutoDTO } from 'src/models/produto.dto';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[];

  constructor(public navCtrl: NavController,) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.items = [
      {
        id: "1",
        nome: 'Cartola',
        preco: 80.99
      },
      {
        id: "2",
        nome: 'Cartola Especial',
        preco: 100.00
      },
    ]
  }
}
