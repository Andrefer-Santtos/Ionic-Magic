import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage {

  items: ProdutoDTO[];
  currency

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public router: ActivatedRoute) { }

  ionViewDidEnter(){
    this.router.queryParams.subscribe(params => {
      this.currency = JSON.parse(params['categoria_id'])
    })
    this.produtoService.findByCategoria(this.currency)
      .subscribe(response => {
        this.items = response['content'];
      },
        error => { });
  }

  showDetail(){
    this.navCtrl.navigateRoot('produto-detail')
  }
}

