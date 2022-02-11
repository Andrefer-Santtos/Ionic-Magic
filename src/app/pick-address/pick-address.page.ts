import { Component } from '@angular/core';
import { EnderecoDTO } from 'src/models/endereco.dto';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage {

  items: EnderecoDTO[];

  constructor() { }

  ionViewDidEnter() {
    this.items = [
      {
        id: "1",
        logradouro: "Hogwarts",
        numero: "934",
        complemento: "Apto Boladao",
        bairro: "Magia pura",
        cep: "48293822",
        cidade: {
          id: "1",
          nome: "MagicCity",
          estado: {
            id: "1",
            nome: "Floresta dos duendes"
          }
        }
      }
    ]
  }

}
