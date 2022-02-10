import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage {

  item: ProdutoDTO;
  currency

  constructor(
    public produtoService: ProdutoService,
    public router: ActivatedRoute,
    public navParams: NavParams) { }

  ionViewDidEnter(){
    this.router.queryParams.subscribe(params => {
      this.currency = JSON.parse(params['categoria_id'])
    })
    this.produtoService.findById(this.currency)
      .subscribe(response => {
        this.item = response;
      },
        error => { });
  }
}