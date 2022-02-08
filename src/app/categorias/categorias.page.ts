import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CategoriaDTO } from '../../models/categoria.dto';
import { CategoriaService } from '../../services/domain/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  items: CategoriaDTO[];

  constructor(
    public categoriaService: CategoriaService,
    public navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.categoriaService.findAll().subscribe(response => {
      this.items = response;
    },
      error => {});
  }

  showProdutos(){
    this.navCtrl.navigateRoot('produtos');
  }
}