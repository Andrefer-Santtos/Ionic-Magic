import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { CidadeDTO } from 'src/models/cidade.dto';
import { EstadoDTO } from 'src/models/estado.dto';
import { CidadeService } from 'src/services/domain/cidade.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { EstadoService } from 'src/services/domain/estado.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController,
    public navCtrl: NavController) {

    this.formGroup = this.formBuilder.group({
      nome: ['Andrezin',[Validators.required, Validators.minLength(5),Validators.maxLength(120)]],
      email: ['andrezin@gmail.com',[Validators.required, Validators.email]],
      tipo: ['1',[Validators.required]],
      cpfOuCnpj: ['27261458090',[Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['123',[Validators.required]],
      logradouro: ['Rua hardcore',[Validators.required]],
      numero: ['007',[Validators.required]],
      complemento: ['Z',[Validators.required]],
      bairro: ['Suavidade',[Validators.required]],
      cep: ['10828333',[Validators.required]],
      telefone1: ['977261827',[Validators.required]],
      telefone2: ['',[]],
      telefone3: ['',[]],
      estadoId: [null,[Validators.required]],
      cidadeId: [null,[Validators.required]]
    });
  }

  ionViewDidEnter() {
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error =>{})
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    if(estado_id){
      this.cidadeService.findAll(estado_id)
      .subscribe(response =>{
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error =>{})
    }
  }

  signupUser() {
    this.clienteService.insert(this.formGroup.value)
    .subscribe(response =>{
      this.showInsertOK();
    },
    error=>{});
  }

  async showInsertOK(){
    const alert = await this.alertCtrl.create({
      header: 'Sucesso!',
      message: 'Cadastro Efetuado com Sucesso',
      buttons: [
        {
          text: 'ok',
          handler: () => {
            this.navCtrl.back();
          }
        }
      ]
    });
    await alert.present();
  }
}
